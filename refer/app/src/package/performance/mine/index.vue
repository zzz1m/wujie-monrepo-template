<template>
<div class="page-content flex-list-page mine-page kpi-page">
    <!-- 表格区域 -->
    <div class="data-list kpi-content">
        <h4 class="kpi-page-title">我的绩效</h4>
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
                <ui-table-column label="考评期间" show-overflow-tooltip>
                    <template slot-scope="{row:item}">
                        {{ $dayjs(item.startDate).format('YYYY-MM-DD') }} ~ {{ $dayjs(item.endDate).format('YYYY-MM-DD') }}
                    </template>
                </ui-table-column>
                <ui-table-column label="考评名称" show-overflow-tooltip>
                    <template slot-scope="{row:item}">
                        {{ item.name }}
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
                            class="text-primary column-operate-btn"
                            :to="`/dashboard/performance/evaluate-fill-entry?twType=SELF&id=${item.id}&kpiKey=${item.kpiKey}&type=myself&target=/dashboard/performance/mine`"
                        >
                            <span>自评</span>
                        </router-link>
                        <router-link
                            v-else-if="item.editor == 2 || item.editor == 3"
                            class="text-primary column-operate-btn"
                            :to="`/dashboard/performance/evaluate-view-entry?twType=SELF&id=${item.id}&kpiKey=${item.kpiKey}&type=myself&target=/dashboard/performance/mine`"
                        >
                            <span>查看</span>
                        </router-link>
                        <!-- <router-link
                            v-else-if="item.editor == 2 || item.editor == 3"
                            class="text-primary column-operate-btn"
                            :to="`/dashboard/performance/evaluate-view-entry?twType=SELF&kpiKey=${item.kpiKey}&type=myself&target=/dashboard/performance/mine`"
                        >
                            <span>查看</span>
                        </router-link> -->
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
    </div>
</div>
</template>
<script>
import { TableEmptyTip } from '@noah/components';
import { debounce } from '@/utils/common';
import { _getValue, getNameByCode } from '@/utils/util.js';

import { getKpiList, _getKpiDateList } from '@/services/dashboard/performance';
import { getDeptInfo } from '@/services/dashboard/attendance';

export default {
    name: 'Mine',
    components: {
        TableEmptyTip
    },
    data() {
        return {
            queryData: {
                keyword: ''                       // 姓名
            },
            pageData: {                         // 分页配置
                total: 0,
                current: 1,
                pageSize: 30
            },
            isLoading: true,                   // 显示加载中
            showLoadError: false,               // 显示报错模块
            tableData: [],
            currentOrder: {}                   // 当前选中行
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
        this.init();
    },
    methods: {
        init() {
            this.onSearch(this.pageData.current);
            this.getDeptInfo();
        },
        async getKpiList() {
            try {
                const res = await getKpiList({ nodeKey: 1 }); //自评 1
                if (res.success && res.root && res.root.length) {
                    this.listData = res.root;
                } else {
                    this.listData = [];
                }
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
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

                const { success, root } = await getKpiList({ nodeKey: 1 });
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
