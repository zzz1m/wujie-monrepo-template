<template>
<div class="page-content flex-list-ui-page approval-process">
    <!-- 查询区域 -->
    <div class="search-panel">
        <ui-form inline>
            <form-item class="search-item">
                <ui-input v-model.trim="queryData.searchQuery" placeholder="编号/审批单/发起人" clearable
                    @on-enter.prevent="onSearch()"
                >
                </ui-input>
            </form-item>
            <form-item class="search-item width-220">
                <ui-select
                    v-model="queryData.processTypeList"
                    placeholder="审批类型" collapse-tags
                    clearable filterable multiple
                >
                    <template>
                        <ui-option v-for="item in processTypeList"
                            :key="item.processTypeId" :value="item.processTypeId"
                        >{{ item.processTypeName }}</ui-option>
                    </template>
                </ui-select>
            </form-item>
            <form-item class="search-item">
                <!-- multiple -->
                <ui-select
                    v-model="queryData.auditUserEmail"
                    filterable clearable
                    placeholder="审批者"
                    @on-query-change="queryUser"
                >
                    <ui-option v-for="item in userList" :key="item.value" :value="item.value">{{ item.label }}</ui-option>
                </ui-select>
            </form-item>
            <form-item class="search-item">
                <ui-date-picker
                    v-model="queryData.date"
                    type="daterange" :unlink-panels="true" range-separator="~"
                    value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                    start-placeholder="开始时间" end-placeholder="结束时间"
                >
                </ui-date-picker>
            </form-item>
            <form-item class="search-item process-status">
                <ui-select
                    :key="queryData.tabType"
                    v-model="queryData.processStatus"
                    placeholder="状态"
                    clearable filterable
                >
                    <template>
                        <ui-option v-for="item in approvalStatus"
                            :key="item.processStatusId" :value="item.processStatusId"
                        >{{ item.processStatusName }}</ui-option>
                    </template>
                </ui-select>
            </form-item>
            <form-item class="search-item">
                <button type="button" class="btn btn-primary" @click="onSearch()">查询</button>
            </form-item>
            <form-item class="search-item">
                <button type="button" class="btn btn-primary btn-outline btn-small" @click="onReset()">重置</button>
            </form-item>
        </ui-form>
    </div>

    <!-- 表格区域 -->
    <div class="data-list">
        <ui-table-pro
            :key="queryData.tabType"
            :data="tableData"
            tooltip-effect="dark" tooltip-max-width="200px"
            empty-text="暂无数据" height="100%"
        >
            <template slot="empty">
                <table-empty-tip :tip-type="tableDataType"></table-empty-tip>
            </template>
            <ui-table-column prop="processInstanceId" label="编号" min-width="180" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="processTypeName" label="审批类型" min-width="116" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="processName" label="审批单" min-width="160" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="launchTime" label="发起时间" min-width="144" show-overflow-tooltip></ui-table-column>
            <ui-table-column class-name="col-process" label="审批流程" width="180">
                <template slot-scope="{row}">
                    <ui-tooltip placement="left" :open-delay="300">
                        <div slot="content" class="approval-process-tip-content">
                            <approval-process :process-data="row.processAuditInfoVOList" title="审批流程" />
                        </div>
                        <span class="fill-table-td approval-process-content-text" @mouseenter="showProcess(row)">{{ row.currentNodeName }}</span>
                    </ui-tooltip>
                </template>
            </ui-table-column>
            <ui-table-column prop="submitName" label="发起人" min-width="88" show-overflow-tooltip></ui-table-column>
            <ui-table-column
                fixed="right" class-name="operate"
                label="操作" width="158"
            >
                <template slot-scope="{row}">
                    <!-- 待审批状态叫审批 其他叫详情-->
                    <router-link
                        class="text-primary column-operate-btn"
                        :to="`/dashboard/audit/audit-center/process-detail-admin?processId=${row.processInstanceId}&processName=${row.processName}&processTypeCode=${row.processTypeCode}&type=look`"
                    >
                        详情
                    </router-link>
                </template>
            </ui-table-column>
        </ui-table-pro>
        <ui-pager
            v-show="tableData.length && !showLoadError"
            class="fasion-pager" text-align="center"
            show-total
            show-elevator
            :total="pageData.total" :current="pageData.current"
            :page-size="pageData.pageSize" :page-size-opts="[15, 30, 50, 100]"
            @update:page="onCurrentPageChange" @update:pageSize="onPageSizeChange"
        >
        </ui-pager>
    </div>
</div>
</template>
<script>
import { _getAdminDataList, _getTypeList, _contractAuditProgress, _getStatusList } from '@/services/dashboard/audit/index.js';
import ApprovalProcess from '../components/approval-process';
import { TableEmptyTip } from '@noah/components';
import { _searchInfo } from '@/services/dashboard/meeting';
import { util } from '@noah/tools';
const { _getValue, debounce  } = util
// 导航类型map

export default {
    components: {
        ApprovalProcess,
        TableEmptyTip
    },
    data() {
        return {
            processTypeList: [],                // 审批类型列表
            queryData: {
                processTypeList: [],                // 审批类型
                date: [],                       // 时间数组
                searchQuery: '',                // 查询条件

                processStatus: -1,              // 审批状态
                auditUserEmail: ''               // 审批者

            },
            pageData: {                         // 分页配置
                total: 0,
                current: 1,
                pageSize: 30
            },
            isLoading: false,                   // 显示加载中
            showLoadError: false,               // 显示报错模块
            tableData: [],
            getListTimeStamp: '',               // 列表请求时的时间戳
            userList: [],                       // 人员列表
            queryUserTimeout: null,             // 人员选择timer
            approvalStatus: []                 // 审批状态列表
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
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.meta.keepAlive) {
                vm.onSearch(vm.pageData.current);
            }
        });
    },
    mounted() {
        this.init();
    },
    activated() {
        this.onSearch(this.pageData.current);
    },
    methods: {
        init() {
            this.getTypeList();
            this.getStatusList();
        },
        /**
         * @description 页面搜索方法
         * @param {Number} page 需要查询的页数
         */
        async onSearch(page = 1) {
            let getListTimeStamp = '';
            try {
                this.pageData.current = page;
                const { current, pageSize } = this.pageData;
                const {
                    processTypeList,
                    searchQuery,
                    processStatus,
                    auditUserEmail
                } =  this.queryData;
                const startTimeStr = _getValue(this.queryData, 'date[0]', '');
                const endTimeStr = _getValue(this.queryData, 'date[1]', '');
                this.isLoading = true;
                this.tableData = [];
                this.showLoadError = false;
                this.getListTimeStamp = getListTimeStamp = new Date().getTime();
                const { success, root} = await _getAdminDataList({
                    processTypeList,
                    searchQuery,
                    startTimeStr,
                    processStatus: processStatus? Number(processStatus): -1,
                    auditUserEmail,
                    endTimeStr,
                    page: current
                    // pageSize: pageSize
                });
                if (success && root) {
                    // 防止点击搜索过快 导致显示的数据不是本tab页下的数据
                    if (getListTimeStamp !== this.getListTimeStamp) {
                        return;
                    }
                    this.tableData = root.list || [];
                    this.pageData.total = root.count;
                    // 防止列表数据减少 keepAlive导致pagesize不更新 导致页面由于pagesize大于实际pagesize 引起的表格没数据
                    if ((!root.list || root.list.length === 0) && this.pageData.current !== 1) {  // 列表没有数据 并且不是第一页
                        this.onSearch();
                    } else {
                        this.tableData = root.list || [];
                        this.pageData.total = root.count;
                    }
                } else {
                    this.showLoadError = true;
                }
            } catch (e) {
                console.log(e);
                this.showLoadError = true;
            } finally {
                // 不是最后触发的查询 不改变loading状态
                if (getListTimeStamp !== this.getListTimeStamp) {
                    return;
                }
                this.isLoading = false;
            }

        },

        // 获取审批类型列表
        async getTypeList() {
            try {
                const { success, root } = await _getTypeList({
                    type: 4
                });
                if (success && root) {
                    this.processTypeList = root.map(item => {
                        item.processTypeId = item.processTypeId + '';
                        return item;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        // 获取审批状态
        async getStatusList() {
            try {
                const { success, root } = await _getStatusList();
                if (success && root) {
                    this.approvalStatus = root;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async showProcess(item) {
            try {
                if (item.processAuditInfoVOList) return;
                const { success, root } = await _contractAuditProgress({
                    processInstanceId: item.processInstanceId
                });
                if (success && root) {
                    this.$set(item, 'processAuditInfoVOList', root);
                }
            } catch (error) {
                console.log(error);
            }

        },

        // 页面重置方法
        onReset() {
            const tabType = this.queryData.tabType;
            // this.$refs.processTypeRef && this.$refs.processTypeRef.clearSingleSelect();
            this.queryData = {
                processTypeList: [],            // 审批类型
                tabType,                        // tab切换类型
                date: [],                       // 时间数组
                searchQuery: '',                // 查询条件
                processStatus: -1,              // 审批状态
                auditUserEmail: ''             // 审批者
            };
            this.onSearch();
        },

        /**
         * @description 修改分页组件page
         * @param {String} page 页面数字
         */
        onCurrentPageChange(page) {
            this.onSearch(+page);
        },

        /**
         * @description 修改分页组件pageSize
         * @param {String} pageSize 每页显示条数
         */
        onPageSizeChange: debounce(100, function(pageSize) {
            this.pageData.pageSize = +pageSize;
            this.onSearch();
        }),
        // 查找部门
        queryUser: debounce(500, async function(key) {
            try {
                const {success,root } = await _searchInfo({ key });
                if (success && root && root.length ) {
                    this.userList = root.map(n => {
                        return {
                            label: `${n.name}-${n.email}`,
                            value: n.email
                        };
                    });
                }
            } catch (err) {
                console.error(err);
            }
        })
    }
};
</script>
