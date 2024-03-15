<template>
<div class="data-list-content">
    <div class="data-search-box">
        <div class="data-search">
            <div class="search-item">
                <label>绩效名称： </label>
                <ui-select v-model="kpiKey" class="search-item-select" placeholder="请选择年份" style="width:350px">
                    <ui-option v-for="item in kpiKeyList" :key="item.kpiKey" :value="item.kpiKey">{{ item.name }}</ui-option>
                </ui-select>
            </div>
            <div class="search-item">
                <span class="search-label">任务：</span>
                <ui-select v-model="twType" clearable class="search-item-select" placeholder="请选择任务">
                    <ui-option v-for="item in twList" :key="item.value" :value="item.value" @change="onSearch()">{{ item.label }}</ui-option>
                </ui-select>
            </div>
            <div class="search-item">
                <span class="search-label">部门：</span>
                <ui-select-last ref="depart" v-model="deptId" placeholder="请选择部门" class="depart-tree">
                    <template slot="options">
                        <ul>
                            <partment-tree
                                v-for="(item, index) in partmentData"
                                :key="index"
                                :tree-data="item"
                                :current-id="deptId"
                                @update:select="onToggle"
                            ></partment-tree>
                        </ul>
                    </template>
                    <span v-if="deptId" slot="partment-tree-suffix-label" @click="clearDept">
                        <i class="ui-icon-circle-close"></i>
                    </span>
                </ui-select-last>
            </div>
            <div class="search-item user-name">
                <span class="search-label">姓名：</span>
                <ui-input v-model="name" placeholder="姓名" :clearable="true"></ui-input>
            </div>
            <div class="search-item">
                <button class="btn btn-primary" @click="onFromSearch()">搜索</button>
            </div>
            <div class="search-item" style="float: right;">
                <button type="button" class="btn  btn-primary" :disabled="loading" :class="{ disabled: loading }" @click="sendEmailMul()">
                    <i v-if="loading" class="ui-icon-loading"></i> 发送提醒
                </button>
                <button type="button" class="btn btn-primary" @click="exportFile()">
                    导出名单
                </button>
            </div>
            <a id="exportLink" href="javascrips:;"></a>
        </div>
        <div class="clear"></div>
    </div>
    <div class="data-list">
        <div class="fix-table-warp">
            <div class="fix-table-content">
                <ui-table-pro ref="dataTable" :height="100" :data="historyRecord|| []"
                    tooltip-effect="dark" tooltip-max-width="200px"
                >
                    <template slot="empty">
                        <ui-pagetip style="max-height:300px;" type="nodata"></ui-pagetip>
                    </template>
                    <ui-table-column width="40px" label="" show-overflow-tooltip fixed>
                        <template #header>
                            <ui-checkbox-last v-if="refresh" v-model="all" @change="checkAll"> </ui-checkbox-last>
                        </template>
                        <template slot-scope="{row:item}">
                            <ui-checkbox-last v-if="refresh" v-model="item.checked" @change.native="toggleCheck(item)"> </ui-checkbox-last>
                        </template>
                    </ui-table-column>
                    <ui-table-column prop="userName" label="被评人" show-overflow-tooltip fixed>
                    </ui-table-column>
                    <ui-table-column prop="userEmail" label="被评人Email" show-overflow-tooltip fixed>
                    </ui-table-column>
                    <ui-table-column prop="deptName" label="被评人部门" show-overflow-tooltip fixed>
                    </ui-table-column>
                    <ui-table-column prop="commentUserName" label="评价方" show-overflow-tooltip fixed>
                    </ui-table-column>
                    <ui-table-column prop="commentUserEmail" label="评价人Email" show-overflow-tooltip fixed>
                    </ui-table-column>
                    <ui-table-column label="类型" show-overflow-tooltip fixed>
                        <template slot-scope="{row:item}">
                            {{ getTwType(item.twType) }}
                        </template>
                    </ui-table-column>
                    <ui-table-column label="操作" fixed>
                        <template slot-scope="{row:item}">
                            <button type="button" class="btn btn-small" @click="sendEmail(item)">发送提醒</button>
                        </template>
                    </ui-table-column>
                </ui-table-pro>
            </div>
        </div>
           
        <ui-pager
            v-show="current.totalCount > 30"
            :total="current.totalCount"
            :current="current.page"
            :page-size="30"
            text-align="center"
            show-elevator
            class="fasion-pager"
            @update:page="onSearch"
        ></ui-pager>
    </div>
</div>
</template>
<script>
import { getUndoneKpi, sendEmail, _getKpiInfoList } from '@/services/dashboard/performance';
import { _getDeptLeaderKpiTree } from '@/services/dashboard/common';
import partmentTree from '@/components/partment-tree';
import { debounce } from '@/utils/common';
export default {
    components: {
        partmentTree
    },
    created() {
    },
    async mounted() {
        await this.getKpiKeyList();
        this.rawGetUndoneKpi();
        this.getDeptList();
    },
    data() {
        return {
            loading: false,
            all: false,
            refresh: true,
            hasSelected: [],
            partmentData: [],
            deptId: '',
            kpiKey: '',
            kpiKeyList: [],                 // 绩效名称列表
            name: '',
            twType: '',
            twList: [
                { value: 'SELF', label: '自评' },
                { value: 'COOPERATE', label: '协作方' },
                // { value: 'COOPERATE2', label: '协作方二' },
                { value: 'LEADER', label: '直接上级' },
                { value: 'SUBORDINATE', label: '下级' },
                { value: 'LEADER_PRO', label: '专业上级' }
            ],
            newTwList: [
                { value: 'SELF', label: '自评' },
                { value: 'COOPERATE', label: '协作方评价' },
                { value: 'LEADER', label: '下级评价' },
                { value: 'SUBORDINATE', label: '专业上级评价' },
                { value: 'LEADER_PRO', label: '直接上级评价' }
            ],
            general: {
                sortFiled: ['entry_date', 'user_name', 'phone'],
                sortType: ['asc', 'desc']
            },
            current: {
                sortFiled: '',
                sortType: '',
                totalCount: 0,
                page: 1
            },
            historyRecord: [],
            table: {},
            form: {},
            rule: {},
            onEnter: {}
        };
    },
    watch: {
        historyRecord: {
            handler(value) {
                var all = true;
                value.forEach(n => {
                    if (!n.checked) {
                        all = false;
                    }
                });
                if (!value || value.length === 0) {
                    all = false;
                }

                this.all = all;
                this.refreshCheckbox();
            },
            deep: true
        }
    },
    methods: {
        // 获取kpi信息列表 用于查询区域
        async getKpiKeyList() {
            try {
                const { success, root } = await _getKpiInfoList();
                if (success && root && root.length) {
                    this.kpiKeyList = root;
                    this.kpiKey = root[0].kpiKey;
                }
            } catch (error) {
                console.log(error);
            }
        },
        clearDept() {
            this.deptId = '';
            const select = this.$refs.depart;
            select.setCurrentLabel('');
            select.isOpen = false;
            this.current.page = 1;
            this.onSearch();
        },
        exportFile() {
            const post = {
                deptId: this.deptId,
                userName: this.name || '',
                twType: this.twType || '',
                kpiKey: this.kpiKey || ''
            };
            let url = `/api/kpi/admin/email/exportUndoneKpi.json?deptId=${post.deptId}&userName=${post.userName}&twType=${post.twType}&kpiKey=${post.kpiKey}`;
            document.getElementById('exportLink').href = url;
            document.getElementById('exportLink').click();
        },
        refreshCheckbox() {
            this.refresh = false;
            this.$nextTick(_ => {
                this.refresh = true;
            });
        },
        toggleCheck(item) {
            if (item.checked) {
                this.hasSelected.push(item);
            } else {
                this.hasSelected.forEach((n, i) => {
                    const a = n.userEmail + n.commentUserEmail + n.twType;
                    const b = item.userEmail + item.commentUserEmail + item.twType;
                    if (a === b) this.hasSelected.splice(i, 1);
                });
            }
        },
        checkAll(value) {
            this.historyRecord.forEach(n => {
                if (n.checked !== value) {
                    if (value) {
                        this.hasSelected.push(n);
                    } else {
                        this.hasSelected.forEach((nn, i) => {
                            const a = n.userEmail + n.commentUserEmail + n.twType;
                            const b = nn.userEmail + nn.commentUserEmail + nn.twType;
                            if (a === b) this.hasSelected.splice(i, 1);
                        });
                    }
                }
                this.$set(n, 'checked', value);
                this.refreshCheckbox();
            });
        },
        getTwType(type) {
            const typeList = [
                { value: 'COOPERATE2', label: '协作方' },
                ...this.twList
            ];
            const twObj = typeList.find(item => item.value === type);
            return twObj?.label || '';
        },
        onToggle(data) {
            const select = this.$refs.depart;
            select.isOpen = false;
            this.deptId = data.id;
            this.current.page = 1;
            this.onSearch();
            select.setCurrentLabel(data.name);
        },
        async getDeptList() {
            try {
                this.isLoading = true;
                const res = await _getDeptLeaderKpiTree();
                if (res.success) {
                    this.partmentData = res.root || [];
                    this.partmentData.unshift({ name: '全部' });
                } else {
                    this.partmentData = [];
                }
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
            }
        },

        onSearch(page) {
            this.getUndoneKpi(page);
        },
        getUndoneKpi: debounce(300, function(...p) {
            this.rawGetUndoneKpi(...p);
        }),
        onFromSearch() {
            this.hasSelected = [];
            this.all = false;
            this.refreshCheckbox();
            this.rawGetUndoneKpi();
        },
        async rawGetUndoneKpi(page) {
            this.current.page = page || 1;
           
            try {
                const res = await getUndoneKpi({
                    page: this.current.page,
                    pageSize: 30,
                    deptId: this.deptId,
                    userName: this.name,
                    twType: this.twType,
                    kpiKey: this.kpiKey
                });

                if (res.success && res.root) {
                    this.historyRecord = res.root.data || [];
                    this.current.page = res.root.page;
                    this.current.totalCount = res.root.totalCount;

                    this.historyRecord.forEach(n => {
                        this.hasSelected.forEach(nn => {
                            const a = n.userEmail + n.commentUserEmail + n.twType;
                            const b = nn.userEmail + nn.commentUserEmail + nn.twType;
                            if (a === b) {
                                this.$set(n, 'checked', true);
                                this.refreshCheckbox();
                            }
                        });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async sendEmail(item) {
            try {
                const res = await sendEmail([item],'',this.kpiKey);
                if (res.success) {
                    // this.getUndoneKpi();
                    this.$toast({ content: '发送成功', type: 'success' });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async sendEmailMul() {
            this.loading = true;
            try {
                if (!this.hasSelected || !this.hasSelected.length) {
                    const _this = this;
                    this.$dialog({
                        title: '是否发送所有未自评他评人员',
                        wrapClass: 'dialog-primary-default',
                        onConfirm(){
                            _this.realSendEmailMul();
                        },
                        onClose() {
                            _this.loading = false;
                        },
                        onCancel() {
                            _this.loading = false;
                        },
                        onLayer() {
                            _this.loading = false;
                        }
                    });
                    return;
                }
                this.realSendEmailMul();
            } catch (e) {
                console.log(e);
            }
        },
        async realSendEmailMul() {
            try {
                const res = await sendEmail(this.hasSelected,this.twType,this.kpiKey);
                if (res.success) {
                    // this.getUndoneKpi();
                    this.$toast({ content: '发送成功', type: 'success' });
                }
                this.loading = false;
            } catch (e) {
                console.log(e);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.data-list ::v-deep table {
    word-break: break-all;
    th:first-of-type {
        width: 35px;
    }
}
.ui-icon-loading {
    top: -1px;
    position: relative;
}
.user-name ::v-deep {
    .input {
        width: 130px;
    }
}
.checkbox ::v-deep {
    .checkbox-input:checked ~ i {
        background-color: #5dd5c8;
        border-color: #5dd5c8;
    }
    .checkbox-shape i {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 12px;
        height: 12px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        background-color: #fff;
        &::after {
            transform: rotate(45deg);
            position: absolute;
            left: 3px;
            top: 0;
            display: table;
            width: 4px;
            height: 8px;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            content: '';
        }
    }
}
</style>
