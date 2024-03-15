<template>
<div class="page-content flex-page-content flex-list-ui-page team-result page-performance" style="padding:20px;background:#F7F8FA">
    <div class="jixiao-bg"></div>
    <EmptyPage v-if="kpiKeyList.length == 0"></EmptyPage>
    <div v-else class="jixiao-content">
        <div class="page-title no-preline" style="display: flex;align-items: center;padding-bottom:0;margin-top:0px">
            <div style="position:absolute;top:24px;z-index:2;background:#fff;width:500px;height:32px;pointer-events: none;white-space: nowrap;">
                <PageTitle>{{ pageTitle }}</PageTitle>
                <svg-icon icon-class="jixiao-down" style="width:8px;margin-left:-6px"></svg-icon>
            </div>

            <div style="position:absolute;top:24px;z-index:1">
                <ui-select v-model="kpiKey" class="search-item-select" style="width:500px" transfer @on-change="onTabChange">
                    <ui-option v-for="item in kpiKeyList" :key="item.kpiKey" :value="item.kpiKey">{{ item.name }}</ui-option>
                </ui-select>
            </div>
            <div style="flex:1;display:flex;justify-content: end;-webkit-justify-content: flex-end;">
                <span class="total-people">总计：{{ total.teamCount || 0 }}人</span>
                <TypeSelect :tabs="tabs" :active.sync="tabActive" @change="onSearch()"></TypeSelect>
            </div>
        </div>
        <ClassDashboard style="margin-top:20px;margin-bottom:24px" :total="total" @onClassChange="handleClassClick"></ClassDashboard>
        <div class="search-panel">
            <ui-form inline @submit.native.prevent="onSearch()">
                <form-item class="search-item">
                    <ui-select-last ref="depart" v-model="deptId" placeholder="请选择部门" class="depart-tree peformance-depart">
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
                </form-item>
                <form-item class="search-item width-120">
                    <ui-select v-model="calss"
                        placeholder="请选择级别"
                        clearable
                        @on-change="onSearch()"
                    >
                        <ui-option v-for="item in classList"
                            :key="item.code" :value="item.code"
                        >{{ item.name }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item class="search-item">
                    <ui-input
                        v-model.trim="userName"
                        placeholder="请输入员工姓名"
                        clearable
                        @on-enter.prevent="onSearch()"
                        @clear="onSearch()"
                    ></ui-input>
                </form-item>
                <form-item class="search-item">
                    <button type="button" class="btn btn-primary" @click="onSearch()">查询</button>
                <!-- <button type="button" class="btn btn-primary btn-outline" @click="onReset()">重置</button> -->
                </form-item>
                <form-item style="float:right" class="search-item">
                    <a
                        class="btn btn-primary"
                        :href="`/api/kpi/admin/exportUserKpiResult.json?deptId=${deptId}&userName=${userName}&kpiKey=${kpiKey}`"
                    >
                        导出绩效级别
                    </a>
                    <a
                        class="btn btn-primary btn-outline"
                        :href="`/api/kpi/admin/export/teamKpiDetail.json?deptId=${deptId}&userName=${userName}&kpiKey=${kpiKey}`"
                    >
                        导出评价明细
                    </a>
                </form-item>
            </ui-form>
        </div>
        <div class="data-list">
            <div class="fix-table-warp">
                <div class="fix-table-content">
                    <ui-table-pro ref="dataTable" height="100%" :data="listData|| []" class="table-pro-reset-ui"
                        tooltip-effect="dark" tooltip-max-width="200px"
                    >
                        <template slot="empty">
                            <table-empty-tip :tip-type="tableDataType"></table-empty-tip>
                        </template>
                        <ui-table-column min-width="100" label="姓名" show-overflow-tooltip>
                            <template slot-scope="{row:item}">
                                {{ item.userName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column min-width="100" show-overflow-tooltip>
                            <template #header>
                                <div style="cursor:pointer">
                                    部门
                                </div>
                            </template>
                            <template slot-scope="{row:item}">
                                {{ item.deptName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column min-width="150" label="邮箱" show-overflow-tooltip>
                            <template slot-scope="{row:item}">
                                {{ item.email }}
                            </template>
                        </ui-table-column>
                        <ui-table-column prop="roleName" min-width="100" label="类型" show-overflow-tooltip></ui-table-column>
                        <ui-table-column prop="calss" min-width="100" label="上级评价类别" show-overflow-tooltip></ui-table-column>
                        <ui-table-column prop="resultCalss" min-width="100" label="校准后级别" show-overflow-tooltip></ui-table-column>
                        <ui-table-column width="200" label="操作">
                            <template v-if="userInfo.id !== item.userId" slot-scope="{row:item}">
                                <router-link
                                    class="text-primary column-operate-btn"
                                    :to="`/dashboard/performance/evaluate-view-entry?&id=${item.kpiId}&userId=${item.userId}&kpiKey=${item.kpiKey}&twType=LEADER&showCheck=2&type=admin&target=/dashboard/performance/result-setting`"
                                >
                                    查看评价
                                </router-link>
                                <router-link
                                    class="text-primary column-operate-btn"
                                    :to="`/dashboard/performance/evaluate-fill-entry?userId=${item.userId}&id=${item.kpiId}&twType=LEADER&kpiKey=${item.kpiKey}&type=admin&target=/dashboard/performance/result-setting`"
                                >
                                    编辑
                                </router-link>
                                <a class="text-primary column-operate-btn" href="javascript:;" @click="handleClickDetail(item)">校准</a>
                            </template>
                        </ui-table-column>
                    </ui-table-pro>
                </div>
            </div>
        </div>
        <ui-pager
            v-if="current.totalCount !== 0"
            v-show="listData.length"
            :current="current.page"
            :total="current.totalCount"
            :page-size="15"
            text-align="center"
            show-elevator
            class="jixiao-pager"
            style="margin:10px auto -10px"
            @update:page="onSearch"
        ></ui-pager>
    </div>
    <jiaozhunDailog ref="jiaozhunDailogRef" :kpi-key="kpiKey" @refresh="adjustKpi"></jiaozhunDailog>
</div>
</template>

<script type="text/javascript">
import { teamkpi, _getKpiInfoList, _getDeptLeaderKpiTreeHistory } from '@/services/dashboard/performance';
import partmentTree from '@/components/partment-tree';
import kipDate from '../utils/kpi-date.mixin.js';
import { tabs2022 } from '../utils/config.js';
import { debounce } from '@/utils/common';
import { _getResouces } from '@/services/dashboard/common';
import { TableEmptyTip } from '@noah/components';
import ClassDashboard from '../components/class-dashboard.vue';
import TypeSelect from '../components/type-select.vue';
import PageTitle from '../components/page-title.vue';
import jiaozhunDailog from './components/dialog.vue';
import {mapState } from 'vuex';
import EmptyPage from '../components/empty-page.vue';
import { CLASS_LIST } from '../utils/config.js';
export default {
    mixins: [kipDate],
    components: { partmentTree, TableEmptyTip, ClassDashboard, TypeSelect, PageTitle, jiaozhunDailog, EmptyPage },
    data() {
        return {
            alter: true,
            refresh: true,
            partmentData: [],
            deptId: this.$route.query.deptId || '-1',
            deptName: this.$route.query.deptName || '全部',
            userName: '',
            listData: [],
            total: {},
            isload: false,
            calss: '',
            current: {
                sortFiled: '',
                sortType: '',
                totalCount: 0,
                page: 1
            },
            kpiName: '',
            authorityList: [],
            isLoading: false,
            showLoadError: false,
            kpiKey: '',
            kpiKeyList: [],
            tabs: [...tabs2022],
            tabActive: '',
            classList: CLASS_LIST
        };
    },
    activated() {
        this.rawAdjustKpi();
    },
    async created() {
        await this.getKpiKeyList();
        this.deptId && this.onToggle({id: this.deptId, name: this.deptName});
    },
    computed: {
        ...mapState(['userInfo']),
        pageTitle () {
            return this.kpiKeyList.find(item => item.kpiKey === this.kpiKey)?.name || '';
        },
        tableDataType() {                       // 数据为空报错加载中时的组件类型
            if (this.isLoading) {
                return 'loading';
            } else if (this.showLoadError) {
                return 'error';
            } else if (this.listData && !this.listData.length) {
                return 'noData';
            } else {
                return null;
            }
        }
    },
    methods: {
        onTabChange() {
            this.tabActive = '';
            this.getDeptList();
            this.onSearch();
        },
        handleClickDetail(row) {
            this.$refs.jiaozhunDailogRef.open(row);
        },
        handleClassClick(classKpi) {
            this.calss = classKpi;
            this.onSearch();
        },
        async getKpiKeyList() {
            try {
                const { success, root } = await _getKpiInfoList();
                if (success && root && root.length) {
                    this.kpiKeyList = root;
                    this.kpiKey = root[0]?.kpiKey || '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        onToggle(data) {
            this.$nextTick(()=>{
                const select = this.$refs.depart;
                if(!select) return;
                select.isOpen = false;
                select.setCurrentLabel(data.name);
            });
            this.deptId = data.id;
            this.current.page = 1;
            this.deptName = data.name;
            this.onSearch();
        },
        clearDept() {
            this.deptId = '';
            this.deptName = '';
            const select = this.$refs.depart;
            select.setCurrentLabel('');
            select.isOpen = false;
            this.page = 1;
            this.onSearch();
        },
        getIsActiveClass(filedIndex, sort) {
            const { sortFiled, sortType } = this.current;
            return sortFiled === filedIndex && sortType === sort ? 'active' : '';
        },
        onSearch(page) {
            this.current.page = page || 1;
            this.adjustKpi(page);
        },
        sort(filedIndex) {
            this.current.sortType = this.current.sortFiled === filedIndex ? +!this.current.sortType : 0;
            this.current.sortFiled = filedIndex;
            this.adjustKpi();
        },
        adjustKpi: debounce(300, function(){
            this.rawAdjustKpi();
        }),
        async rawAdjustKpi() {
            if (!this.kpiKey) return;
            try {
                this.isLoading = true;
                const res = await teamkpi({
                    pageSource: 'admin',
                    userName: this.userName,
                    deptId: this.deptId,
                    page: this.current.page,
                    kpiKey: this.kpiKey,
                    roleKey: this.tabActive,
                    calss: this.calss
                });
                if (res.success) {
                    this.listData = res.root.data || [];
                    this.total = res.root?.kpiClass || {};
                    this.current.page = res.root.page;
                    this.current.totalCount = res.root.totalCount;
                    this.alter = res.root.alter;
                } else {
                    this.listData = [];
                }
                this.isload = true;
                this.$nextTick(_ => {
                    this.isload = false;
                });
            } catch (error) {
                this.showLoadError = true;
            } finally {
                this.isLoading = false;
            }
        },
        async getDeptList() {
            if (!this.kpiKey) return;
            try {
                const res = await _getDeptLeaderKpiTreeHistory({
                    pageSource: 'admin',
                    kpiKey: this.kpiKey
                });
                if (res.success) {
                    this.partmentData = res.root || [];
                    this.partmentData.unshift({ name: '全部', id: '-1'});
                } else {
                    this.partmentData = [];
                }
            } catch (error) {
            }
        }
    },
    async mounted() {
        await this.getKpiKeyList();
        this.getDeptList();
        this.rawAdjustKpi();
    }
};
</script>

<style lang="less" scoped>
::v-deep .ui-table {
    th {
        cursor: pointer;
    }
    td {
        word-break: break-all;
    }
}
.data-list ::v-deep input {
    min-width: 70px;
    width: 50px;
}
::v-deep .dropdown-select:after {
    right: 5px;
    top: 3px;
}
::v-deep .dropdown-select .input {
    background-color: #f6f7fb;
    border-color: #f6f7fb;
    color: #151B26 !important;
    &[readonly] {
        cursor: pointer;
    }
}
::v-deep .dropdown-select:hover {
    .ui-icon-circle-close {
        background-color: #E5E6EB;
    }
    .input {
        border-color: #f6f7fb;;
        background-color: #E5E6EB;
    }
}
::v-deep .dropdown-select .ui-icon-circle-close {
    z-index: 3;
}
::v-deep .dropdown-select .ui-icon-circle-close {
    background-color: #f6f7fb;
    top: 2px;
    transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
</style>
