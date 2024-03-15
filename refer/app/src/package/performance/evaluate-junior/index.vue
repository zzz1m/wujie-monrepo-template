<template>
<div class="page-content flex-page-content flex-list-ui-page team-result page-performance" style="padding:20px;background:#F7F8FA">
    <div class="jixiao-bg"></div>
    <EmptyPage v-if="kpiTabs.length == 0"></EmptyPage>
    <div v-else class="jixiao-content">
        <TabSelect :tabs="kpiTabs" :active.sync="kpiActive" @change="onTabChange"></TabSelect>
        <div class="page-title no-preline" style="display: flex;align-items: center;padding-bottom:0;margin-top:0">
            <PageTitle>下级绩效评价</PageTitle>
            <TimeRange>{{ timeRange }}</TimeRange>
            <div style="flex:1;display:flex;justify-content: end;-webkit-justify-content: flex-end;">
                <TypeSelect :tabs="tabs" :active.sync="tabActive" @change="onSearch()"></TypeSelect>
            </div>
        </div>
        <div class="no-pager" style="flex:1;margin-top:20px">
            <div style="height:100%;position:relative">
                <div class="fix-table-content">
                    <ui-table-pro ref="dataTable" height="100%" :data="listData|| []" class="table-pro-reset-ui"
                        tooltip-effect="dark" tooltip-max-width="200px"
                    >
                        <template slot="empty">
                            <table-empty-tip :tip-type="tableDataType"></table-empty-tip>
                        </template>
                        <ui-table-column label="姓名" show-overflow-tooltip min-width="80">
                            <template slot-scope="{row:item}">
                                {{ item.userName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="部门" show-overflow-tooltip min-width="90">
                            <template slot-scope="{row:item}">
                                {{ item.deptName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="邮箱" show-overflow-tooltip min-width="100">
                            <template slot-scope="{row:item}">
                                {{ item.email }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="类型" show-overflow-tooltip min-width="100">
                            <template slot-scope="{row:item}">
                                {{ item.roleName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="上级评价级别" class-name="choose-user" min-width="150">
                            <template slot-scope="{row:item}">
                                {{ item.calss }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="完成状态" show-overflow-tooltip min-width="90">
                            <template slot-scope="{row:item}">
                                {{ item.completeState ? '已完成' : '未完成' }}
                            </template>
                        </ui-table-column>
                        <ui-table-column width="100px" label="操作">
                            <template slot-scope="{row:item}">
                                <template v-if="canEdit">
                                    <router-link
                                        class="text-primary column-operate-btn"
                                        :to="`/dashboard/performance/evaluate-fill-entry?id=${item.id}&userId=${item.userId}&twType=LEADER&kpiKey=${item.kpiKey}&target=/dashboard/performance/evaluate-junior`"
                                    >
                                        评价
                                    </router-link>
                                </template>
                                <router-link v-else
                                    class="text-primary column-operate-btn"
                                    :to="`/dashboard/performance/evaluate-view-entry?id=${item.id}&userId=${item.userId}&kpiKey=${kpiActive}&twType=LEADER&showCheck=0&target=/dashboard/performance/evaluate-junior`"
                                >
                                    查看
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
    </div>
</div>
</template>

<script type="text/javascript">
import { getDeptInfo, _xiajiList, _getKpiInfoList, _getSchemeByTwType } from '@/services/dashboard/performance';
import kipDate from '../utils/kpi-date.mixin.js';
import { TableEmptyTip } from '@noah/components';
import TypeSelect from '../components/type-select.vue';
import TabSelect from '../components/tab-select.vue';
import TimeRange from '../components/time-range.vue';
import PageTitle from '../components/page-title.vue';
import { tabs2022 } from '../utils/config.js';
import EmptyPage from '../components/empty-page.vue';
export default {
    mixins: [kipDate],
    components: { TableEmptyTip, TypeSelect, TimeRange, PageTitle, TabSelect, EmptyPage },
    data() {
        return {
            isLoading: false,
            showLoadError: false,
            current: {
                totalCount: 0,
                page: 1
            },
            listData: [],
            deptInfo: {},
            dataList: [],
            tabs: [...tabs2022],
            tabActive: '',
            kpiActive: '',
            kpiTabs: []
        };
    },
    computed: {
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
        canEdit() {
            try {
                const time = Date.now();
                const item = this.kpiTabs.find(kpi => kpi.kpiKey === this.kpiActive);
                if (time < item.startTime) {
                    return false;
                }
                if (time > item.endTime) {
                    return false;
                }
                return true;
            } catch(e) {
                return false;
            }
        },
        timeRange() {
            const item = this.kpiTabs.find(kpi => kpi.kpiKey === this.kpiActive);
            if (item) {
                return item.startDate.slice(5).replace('-', '.') + ' - ' + item.endDate.slice(5).replace('-', '.');
            } else {
                return '';
            }
        }
    },
    activated() {
        this.getTeamApply();
    },
    methods: {
        onTabChange() {
            this.tabActive = '';
            this.onSearch();
        },
        async getSchemeByTwType() {
            const { success, root } = await _getSchemeByTwType({
                nodeKey: 5
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
            }
        },
        async getDeptInfo() {
            try {
                const res = await getDeptInfo();
                if (res.success && res.root) {
                    this.deptInfo = res.root;
                }
            } catch (e) {
                console.log(e);
            }
        },
        onSearch(page) {
            this.current.page = page || 1;
            this.getTeamApply();
        },
        async getTeamApply() {
            if (!this.kpiActive) return;
            try {
                this.showLoadError = false;
                this.listData = [];
                this.isLoading = true;
                const res = await _xiajiList({
                    kpiKey: this.kpiActive,
                    page: this.current.page,
                    pageSize: 15,
                    roleKey: this.tabActive
                });
                if (res.success) {
                    this.listData = res.root?.list || [];
                    this.current.totalCount = res.root?.count || 0;
                } else {
                    this.listData = [];
                }
            } catch (error) {
                this.showLoadError = true;
            } finally {
                this.isLoading = false;
            }
        }
    },
    async mounted() {
        this.getDeptInfo();
        await this.getSchemeByTwType();
        this.getTeamApply();
    }
};
</script>
<style lang="less" scoped>
.radio-group {
    display: inline;
}
::v-deep .ui-suggest .ui-dropmenu-list {
    width: auto;
}
</style>
