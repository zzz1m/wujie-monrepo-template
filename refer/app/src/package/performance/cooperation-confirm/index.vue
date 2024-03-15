<template>
<div class="page-content flex-page-content flex-list-ui-page team-result page-performance" style="padding:20px;background:#F7F8FA">
    <div class="jixiao-bg"></div>
    <EmptyPage v-if="kpiTabs.length == 0"></EmptyPage>
    <div v-else class="jixiao-content">
        <TabSelect :tabs="kpiTabs" :active.sync="kpiActive" @change="onTabChange"></TabSelect>
        <div class="page-title no-preline" style="display:flex;align-items:center;padding-bottom:8px;margin-top:0px">
            <PageTitle>下级协作方确认</PageTitle>
            <TimeRange>{{ timeRange }}</TimeRange>
        </div>
        <p class="page-new-info">TPU序列确认两名协作方，非TPU序列确认一名协作方。</p>
        <div style="height:100%;margin-top:20px;position:relative">
            <div>
                <div class="fix-table-content">
                    <ui-table-pro ref="dataTable" :height="100" :data="listData|| []" class="table-pro-reset-ui"
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
                        <ui-table-column label="邮箱" show-overflow-tooltip min-width="100">
                            <template slot-scope="{row:item}">
                                {{ item.email }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="所属部门" show-overflow-tooltip min-width="90">
                            <template slot-scope="{row:item}">
                                {{ item.deptName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="专业序列" show-overflow-tooltip min-width="90">
                            <template slot-scope="{row:item}">
                                {{ item.seqName }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="提报协作方" class-name="choose-user" min-width="150">
                            <template slot-scope="{row:item}">
                                {{ item.submitTwUserShow }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="上级确认协作方" class-name="choose-user" min-width="150">
                            <template slot-scope="{row:item}">
                                {{ item.chooseTwUserShow }}
                            </template>
                        </ui-table-column>
                        <ui-table-column label="操作">
                            <template slot-scope="{row:item}">
                                <a v-if="canEdit" href="javascript:;" @click="openDialog(item)">确认</a>
                            </template>
                        </ui-table-column>
                    </ui-table-pro>
                </div>
            </div>
        </div>
    </div>
    <Dialog ref="confirmDialog" :kpi-key="kpiActive"></Dialog>
</div>
</template>

<script type="text/javascript">
import { getTeamApply, _getSchemeByTwType, getDeptInfo } from '@/services/dashboard/performance';
import kipDate from '../utils/kpi-date.mixin.js';
import { TableEmptyTip } from '@noah/components';
import Dialog from './components/dialog.vue';
import TimeRange from '../components/time-range.vue';
import PageTitle from '../components/page-title.vue';
import TabSelect from '../components/tab-select.vue';
import EmptyPage from '../components/empty-page.vue';
export default {
    mixins: [kipDate],
    components: { TableEmptyTip, Dialog, TimeRange, PageTitle, TabSelect, EmptyPage },
    data() {
        return {
            isLoading: false,
            showLoadError: false,
            listData: [],
            deptInfo: {},
            dataList: [],
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
        timeRange() {
            const item = this.kpiTabs.find(kpi => kpi.kpiKey == this.kpiActive);
            if (item) {
                return item.startDate.slice(5).replace('-', '.') + ' - ' + item.endDate.slice(5).replace('-', '.');
            } else {
                return '';
            }
        },
        canEdit() {
            try {
                const time = Date.now();
                const item = this.kpiTabs.find(kpi => kpi.kpiKey == this.kpiActive);
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
        }
    },
    activated() {
        this.getTeamApply();
    },
    methods: {
        async getSchemeByTwType() {
            const { success, root } = await _getSchemeByTwType({
                nodeKey: 2
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
        openDialog(row) {
            this.$refs.confirmDialog.open(row);
        },
        onTabChange() {
            this.tabActive = '';
            this.onSearch();
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
        onSearch(e) {
            this.getTeamApply();
        },
        async getTeamApply() {
            if (!this.kpiActive) return;
            try {
                this.showLoadError = false;
                this.isLoading = true;
                const res = await getTeamApply({
                    kpiKey: this.kpiActive
                });
                if (res.success) {
                    this.listData = res?.root || [];
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
.page-new-info {
    font-size: 14px;
    font-weight: 400;
    color: #86909C;
    line-height: 20px;
}
</style>
