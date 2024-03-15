<template>
<div class="page-content flex-page-content flex-list-ui-page team-result page-performance" style="padding:20px;background:#F7F8FA">
    <div class="jixiao-bg"></div>
    <EmptyPage v-if="kpiTabs.length == 0"></EmptyPage>
    <div v-else class="jixiao-content">
        <TabSelect :tabs="kpiTabs" :active.sync="kpiActive" @change="onTabChange"></TabSelect>
        <div class="page-title no-preline" style="display: flex;align-items: center;padding-bottom:0;margin-top:0">
            <PageTitle>绩效校准</PageTitle>
            <TimeRange>{{ timeRange }}</TimeRange>
            <div v-if="hasResult" style="flex:1;display:flex;justify-content: end;-webkit-justify-content: flex-end;">
                <span class="total-people">总计：{{ total.teamCount || 0 }}人</span>
                <TypeSelect :tabs="tabs" :active.sync="tabActive" @change="typeChange"></TypeSelect>
            </div>
        </div>
        <template v-if="hasResult">
            <div style="color: #86909C;margin: 10px 0 18px;">公司比例要求：A≤5%，A/A-合计≤10%，A/A-/B+合计≤15%，B/C+/C合计≥85%。</div>
            <ClassDashboard :total="total" @onClassChange="handleClassClick"></ClassDashboard>
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
                            <ui-table-column min-width="15%" label="姓名" prop="userName" show-overflow-tooltip></ui-table-column>
                            <ui-table-column min-width="15%" label="部门" prop="deptName" show-overflow-tooltip></ui-table-column>
                            <ui-table-column min-width="25%" label="邮箱" prop="email" show-overflow-tooltip></ui-table-column>
                            <ui-table-column min-width="10%" label="类型" show-overflow-tooltip>
                                <template slot-scope="{row:item}">
                                    {{ item.roleName }}
                                </template>
                            </ui-table-column>
                            <ui-table-column min-width="20%" label="上级评价级别" show-overflow-tooltip>
                                <template slot-scope="{row:item}">
                                    {{ item.calss }}
                                </template>
                            </ui-table-column>
                            <ui-table-column min-width="15%" label="校准后级别" show-overflow-tooltip>
                                <template slot-scope="{row:item}">
                                    {{ item.resultCalss }}
                                </template>
                            </ui-table-column>
                            <ui-table-column width="160" label="操作">
                                <template slot-scope="{row:item}">
                                    <a class="text-primary column-operate-btn" href="javascript:;" @click="handleClickDetail(item)">校准</a>
                                    <router-link
                                        class="text-primary column-operate-btn"
                                        :to="`/dashboard/performance/evaluate-view-entry?twType=LEADER&id=${item.id}&userId=${item.userId}&deptName=${item.deptName}&userName=${item.userName}&kpiKey=${item.kpiKey}&showCheck=${showCheck}&type=admin&target=/dashboard/performance/result-check`"
                                    >
                                        查看评价
                                    </router-link>
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
                style="margin:10px auto -10px"
                @update:page="onSearch"
            ></ui-pager>
        </template>
        <ui-pagetip v-else type="nodata" style="background: transparent">
            <p slot="text" class="gray">考核阶段未开始</p>
        </ui-pagetip>
    </div>
    <jiaozhunDailog ref="jiaozhunDailogRef" :kpi-key="kpiActive" @refresh="rawAdjustKpi"></jiaozhunDailog>
</div>
</template>

<script type="text/javascript">
import { adjustKpi, _getDeptLeaderKpiTreeHistory, _getSchemeByTwType, _getStateByKpi } from '@/services/dashboard/performance';
import partmentTree from '@/components/partment-tree';
import kipDate from '../utils/kpi-date.mixin.js';
import { debounce } from '@/utils/common';
import { _getResouces } from '@/services/dashboard/common';
import { TableEmptyTip } from '@noah/components';
import jiaozhunDailog from './components/dialog.vue';
import ClassDashboard from '../components/class-dashboard.vue';
import TypeSelect from '../components/type-select.vue';
import TimeRange from '../components/time-range.vue';
import PageTitle from '../components/page-title.vue';
import { tabs2022 } from '../utils/config.js';
import TabSelect from '../components/tab-select.vue';
import EmptyPage from '../components/empty-page.vue';
import { CLASS_LIST } from '../utils/config.js';

export default {
    mixins: [kipDate],
    components: { partmentTree, TableEmptyTip, jiaozhunDailog, ClassDashboard, TypeSelect, TimeRange, PageTitle, TabSelect, EmptyPage },
    data() {
        return {
            hasResult: true,
            partmentData: [],
            deptId: this.$route.query.deptId || '-1',
            deptName: this.$route.query.deptName || '全部',
            userName: '',
            listData: [],
            total: {},
            isload: false,
            current: {
                totalCount: 0,
                page: 1
            },
            authorityList: [],
            isLoading: false,
            showLoadError: false,
            tabs: [...tabs2022],
            tabActive: '',
            totalPeople: 0,
            kpiActive: '',
            kpiTabs: [],
            calss: '',
            classList: CLASS_LIST
        };
    },
    activated() {
        this.rawAdjustKpi();
    },
    created() {
        this.deptId && this.onToggle({id: this.deptId, name: this.deptName});
    },
    computed: {
        showEdit() {
            return this.authorityList.includes('/api/kpi/admin/detail.json');
        },
        tableDataType() {
            if (this.isLoading) {
                return 'loading';
            } else if (this.showLoadError) {
                return 'error';
            } else if (this.listData && !this.listData.length) {
                return 'noData';
            } else {
                return null;
            }
        },
        timeRange() {
            const item = this.kpiTabs.find(kpi => kpi.kpiKey == this.kpiActive);
            if (item) {
                return item.startDate.slice(5).replace('-', '.') + ' - ' + item.endDate.slice(5).replace('-', '.');
            } else {
                return '';
            }
        },
        showCheck() {
            const time = Date.now();
            const item = this.kpiTabs.find(kpi => kpi.kpiKey === this.kpiActive);
            if (!item) return 0;
            if (time < item.startTime) {
                return 0;
            }
            if (time > item.endTime) {
                return 0;
            }
            return 1;
        }
    },
    methods: {
        onTabChange() {
            this.tabActive = '';
            this.onSearch();
        },
        handleClassClick(classKpi) {
            this.calss = classKpi;
            this.onSearch();
        },
        async getSchemeByTwType() {
            const { success, root } = await _getSchemeByTwType({
                nodeKey: 6
            });
            if (success) {
                this.kpiTabs = root.map(v => ({
                    ...v,
                    value: v.kpiKey,
                    startDate: this.$dayjs(v.startDate).format('YYYY-MM-DD'),
                    endDate: this.$dayjs(v.endDate).format('YYYY-MM-DD'),
                    startTime: v.startDate,
                    endTime: v.endDate
                }));
                if(root.find(t => t.kpiKey === this.$route.query.kpiKey)) {
                    this.kpiActive = this.$route.query.kpiKey;
                } else {
                    this.kpiActive = root[0]?.kpiKey || '';
                }
                this.rawAdjustKpi();
            }
        },
        handleClickDetail(row) {
            const time = Date.now();
            const item = this.kpiTabs.find(kpi => kpi.kpiKey === this.kpiActive);
            if (time < item.startTime) {
                this.$toast('您的绩效校准尚未开始，请耐心等候。', 'warning');
                return;
            }
            if (time > item.endTime) {
                this.$toast('您的绩效校准已结束。', 'warning');
                return;
            }
            this.$refs.jiaozhunDailogRef.open(row);
        },
        typeChange() {
            this.current.page = 1;
            this.rawAdjustKpi();
        },
        onToggle(data) {
            this.$nextTick(()=>{
                const select = this.$refs.depart;
                if (select) {
                    select.isOpen = false;
                    select.setCurrentLabel(data.name);
                }
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
        onSearch(page) {
            this.current.page = page || 1;
            this.rawAdjustKpi(page);
        },
        adjustKpi: debounce(300, function(){
            this.rawAdjustKpi();
        }),
        async rawAdjustKpi() {
            if (!this.kpiActive) return;
            try {
                this.isLoading = true;
                this.listData = [];
                const res = await adjustKpi({
                    pageSource: 'leader',
                    userName: this.userName,
                    deptId: this.deptId,
                    kpiKey: this.kpiActive,
                    page: this.current.page,
                    roleKey: this.tabActive,
                    calss: this.calss
                });
                if (res.success) {
                    this.listData = res.root.data || [];
                    this.total = res.root.kpiClass || {};
                    this.current.page = res.root.page;
                    this.current.totalCount = res.root.totalCount;
                } else {
                    this.listData = [];
                }
                this.isload = true;
                this.$nextTick(_ => {
                    this.isload = false;
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        async getDeptList() {
            if (!this.kpiActive) return;
            try {
                const res = await _getDeptLeaderKpiTreeHistory({
                    pageSource: 'leader',
                    kpiKey: this.kpiActive
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
        await this.getSchemeByTwType();
        this.getDeptList();
        this.deptId && this.onToggle({id: this.deptId, name: this.deptName});
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
