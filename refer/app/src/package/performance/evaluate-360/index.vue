<template>
<div class="page-content flex-list-page mine-page kpi-page">
    <!-- 表格区域 -->
    <EmptyPage v-if="!kpiKey"></EmptyPage>
    <div v-show="kpiKey" class="data-list kpi-content">
        <div class="m-b-20">
            <kpiListTab :node-key="4" @tab-init="init" @tab-change="handleTabChange" @time-change="onTimeChange" />
            <PageTitle>360° 评价</PageTitle>
            <TimeRange>{{ timeRange }}</TimeRange>
        </div>

        <div class="kpi-table-content">
            <ui-table-pro
                :data="tableData"
                class="table-pro-reset-ui"
                tooltip-effect="dark" tooltip-max-width="200px"
                empty-text="暂无数据" height="100%"
            >
                <template slot="empty">
                    <table-empty-tip :tip-type="tableDataType"></table-empty-tip>
                </template>
                <ui-table-column label="姓名" show-overflow-tooltip min-width="80">
                    <template slot-scope="{row:item}">
                        <span>{{ item.userName }}</span>
                    </template>
                </ui-table-column>
                <ui-table-column label="邮箱" show-overflow-tooltip min-width="100">
                    <template slot-scope="{row:item}">
                        {{ item.email }}
                    </template>
                </ui-table-column>
                <!-- <ui-table-column label="所属部门" show-overflow-tooltip min-width="90">
                    <template slot-scope="{row:item}">
                        {{ item.deptName }}
                    </template>
                </ui-table-column> -->
                <!-- <ui-table-column label="专业序列" show-overflow-tooltip min-width="90">
                    <template slot-scope="{row:item}">
                        {{ item.seq }}
                    </template>
                </ui-table-column> -->
                <ui-table-column label="任务" show-overflow-tooltip min-width="90">
                    <template slot-scope="{row:item}">
                        {{ item.commitRoleName }}
                    </template>
                </ui-table-column>
                <ui-table-column label="完成状态" show-overflow-tooltip min-width="90">
                    <template slot-scope="{row:item}">
                        {{ item.completeState ? '已完成' : '未完成' }}
                    </template>
                </ui-table-column>
                <ui-table-column
                    class-name="operate"
                    label="操作" width="150"
                >
                    <template slot-scope="{row:item}">
                        <router-link v-if="item.editor == 1"
                            :to="`/dashboard/performance/evaluate-fill-entry?userId=${item.userId}&twType=${item.twType}&id=${item.id}&kpiKey=${item.kpiKey}&type=cooperation&target=/dashboard/performance/evaluate-360`"
                        >
                            <span>评价</span>
                        </router-link>
                        <!-- 周期结束 -->
                        <router-link
                            v-else-if="item.editor == 2"
                            :to="`/dashboard/performance/evaluate-view-entry?userId=${item.userId}&kpiKey=${item.kpiKey}&id=${item.id}&twType=${item.twType}&type=cooperation&target=/dashboard/performance/evaluate-360`"
                        >
                            <span>查看</span>
                        </router-link>
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
    </div>
</div>
</template>
<script>
import { TableEmptyTip } from '@noah/components';
import kpiListTab from '../components/kpi-list-tab';
import { debounce } from '@/utils/common';
import { _getValue, getNameByCode } from '@/utils/util.js';
import { getKpiTw, _getKpiInfoList, _getSchemeByTwType } from '@/services/dashboard/performance';
import { getDeptInfo } from '@/services/dashboard/attendance';
import kipDate from '@/package/performance/utils/kpi-date.mixin.js';
import PageTitle from '../components/page-title.vue';
import TimeRange from '../components/time-range.vue';
import EmptyPage from '../components/empty-page.vue';
export default {
    name: 'Evaluate360',
    mixins: [kipDate],
    components: {
        TableEmptyTip,
        kpiListTab,
        PageTitle,
        TimeRange,
        EmptyPage
    },
    data() {
        return {
            pageData: {                         // 分页配置
                total: 0,
                current: 1,
                pageSize: 30
            },
            kpiKey: '',
            kpiName: '',
            isLoading: true,                   // 显示加载中
            showLoadError: false,               // 显示报错模块
            tableData: [],
            currentOrder: {},                   // 当前选中行
            timeRange: ''
        };
    },
    computed: {
        tableDataType() {                       // 数据为空报错加载中时的组件类型
            if (this.isLoading) {
                return 'loading';
            } else if (this.showLoadError) {
                return 'error';
            } else if (this.tableData && !this.tableData.length) {
                return 'noData';
            } else {
                return null;
            }
        }
    },
    created() {
        this.getNameByCode = getNameByCode;
    },
    mounted() {
    },
    methods: {
        init(kpiKey) {
            if (!kpiKey) {
                this.isLoading = false;
                return;
            }
            this.kpiKey = kpiKey;
            this.onSearch();
            this.getDeptInfo();
        },
        handleTabChange(kpiKey, time) {
            if (!kpiKey) {
                this.isLoading = false;
                return;
            }
            this.kpiKey = kpiKey;
            this.getKpiDate();
            this.onSearch();
        },
        onTimeChange(timeRange) {
            this.timeRange = timeRange || '';
        },
        async getDeptInfo() {
            try {
                const { success, root } = await getDeptInfo(); // 获取用户部门
                if (success && root) {
                    this.deptName = root.deptName || '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 获取kpi title
        async getKpiKeyList() {
            try {
                const { success, root } = await _getKpiInfoList();
                if (success && root && root.length) {
                    console.log(root);
                    this.kpiName = root[0].name;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 页面搜索方法
         * @param {Number} page 需要查询的页数
         */
        onSearch: debounce(300, async function(page = 1) {
            try {
                this.pageData.current = page;
                const { current, pageSize } = this.pageData;
                this.isLoading = true;
                this.tableData = [];
                this.showLoadError = false;

                const { success, root } = await getKpiTw({
                    kpiKey: this.kpiKey
                });
                if (success) {
                    this.tableData =  root || [];
                } else {
                    this.showLoadError = true;
                }
            } catch (e) {
                console.log(e);
                this.showLoadError = true;
            } finally {
                this.isLoading = false;
            }

        })
    }
};
</script>
