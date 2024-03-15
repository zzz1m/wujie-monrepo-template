<template>
<div class="page-content flex-list-ui-page page-audit-center">
    <!-- tab 切换区域 -->
    <div class="audit-list-header">
        <div ref="star" class="header-star"></div>
        <div class="top-anmiation-css">
            <img class="page-header-img" src="https://img.bosszhipin.com/static/file/2023/055tmcs2um1689305907806.png" alt="">
        </div>
        <div class="title-row">
            <div class="title-name">审批中心</div>
            <div class="tab-group-wrap">
                <div v-for="item in tabList" :key="item.key" class="tab" :class="{ active: queryData.tabType === item.key}" @click="handleTabChange(item)">
                    {{ item.name }}
                    <div
                        v-if="item.key === 'pending' && tabCount.pendingApproval"
                        class="tab-tag"
                        :class="{
                            t20:  tabCount.pendingApproval < 10,
                            t24: tabCount.pendingApproval >= 10 && tabCount.pendingApproval <= 99,
                            t30: tabCount.pendingApproval> 99
                        }"
                    >
                        <span>{{ tabCount.pendingApproval | tabCountNum }}</span>
                    </div>
                    <div
                        v-if="item.key === 'refer' && tabCount.consult"
                        class="tab-tag"
                        :class="{
                            t20:  tabCount.consult < 10,
                            t24: tabCount.consult >= 10 && tabCount.consult <= 99,
                            t30: tabCount.consult> 99
                        }"
                    >
                        <span>{{ tabCount.consult | tabCountNum }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 查询区域 -->
    <div class="search-panel">
        <ui-form inline @submit.native.prevent="onSearch()">
            <form-item class="search-item">
                <ui-input v-model.trim="queryData.searchQuery" :placeholder="`编号/审批单${queryData.tabType !== 'myApproval' ? '/发起人' : ''}`" clearable
                    @on-enter.prevent="onSearch()"
                >
                </ui-input>
            </form-item>
            <form-item class="search-item">
                <ui-select
                    ref="processTypeRef"
                    :key="queryData.tabType"
                    v-model="queryData.processType"
                    placeholder="审批类型"
                    clearable filterable
                    @on-change="onSearch()"
                >
                    <template>
                        <ui-option v-for="item in processTypeList"
                            :key="item.processTypeId" :value="item.processTypeId"
                        >{{ item.processTypeName }}</ui-option>
                    </template>
                </ui-select>
            </form-item>
            <form-item class="search-item">
                <ui-date-picker
                    v-model="queryData.date"
                    type="daterange" :unlink-panels="true" range-separator="-"
                    value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                    start-placeholder="开始时间" end-placeholder="结束时间"
                >
                </ui-date-picker>
            </form-item>
            <form-item v-if="!['pending'].includes(queryData.tabType)" class="search-item process-status">
                <ui-select
                    :key="queryData.tabType"
                    v-model="queryData.processStatus"
                    placeholder="状态"
                    clearable filterable
                    @on-change="onSearch()"
                >
                    <template>
                        <ui-option v-for="item in approvalStatus"
                            :key="item.processStatusId" :value="item.processStatusId"
                        >{{ item.processStatusName }}</ui-option>
                    </template>
                </ui-select>
            </form-item>
            <form-item class="search-item">
                <button type="submit" class="btn btn-primary">查询</button>
            </form-item>
            <form-item class="search-item">
                <button type="button" class="btn btn-primary btn-outline btn-small" @click="onReset()">重置</button>
            </form-item>
            <form-item v-if="queryData.tabType === 'refer'" class="search-item float-right">
                <button type="button" class="btn btn-primary btn-small" :class="{disabled: seeAllLoading}" @click="handleSeeAll">
                    <i v-if="seeAllLoading" class="ui-icon-loading"></i>
                    全部查阅
                </button>
            </form-item>
            <form-item v-if="isBatch" class="search-item float-right">
                <button type="button" class="btn btn-primary btn-small" @click="handleShowBatchApproavl">一键审批</button>
            </form-item>
        </ui-form>
    </div>
    <!-- 表格区域 -->
    <div class="data-list">
        <ui-table-pro
            ref="dataTable"
            :key="queryData.tabType"
            class="table-pro-reset-ui"
            :data="tableData"
            :row-key="getRowKeys"
            tooltip-effect="dark"
            tooltip-max-width="200px"
            empty-text="暂无数据"
            height="100%" @selection-change="handleSelectionChange"
            @select-all="handleSelectionAllChange"
        >
            <template slot="empty">
                <table-empty-tip :tip-type="tableDataType"></table-empty-tip>
            </template>
            <ui-table-column v-if="isBatch" fixed="left" type="selection" :selectable="checkboxInit" :reserve-selection="true" width="40"> </ui-table-column>
            <ui-table-column prop="processName" label="审批单" min-width="200" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{ row.processName }}</span>
                    <div v-if="isBatch" class="approval-grey">{{ _getValue(row, 'processDetail.explain') }} {{ _getValue(row, 'processDetail.totalTimeStr') }}</div>
                </template>
            </ui-table-column>
            <ui-table-column prop="processTypeName" label="审批类型" min-width="140" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="launchTime" label="发起时间" min-width="140" show-overflow-tooltip></ui-table-column>
            <ui-table-column v-if="queryData.tabType !== 'myApproval'" prop="submitName" label="发起人" min-width="100" show-overflow-tooltip></ui-table-column>
            <ui-table-column class-name="col-process" label="审批流程" min-width="160">
                <template slot-scope="{row}">
                    <ui-tooltip placement="left" :open-delay="300" popper-class="audit-process-wrap">
                        <div slot="content" class="approval-process-tip-content approval-process-tip-content-reset">
                            <approval-process :process-data="row.processAuditInfoVOList" title="审批流程" />
                        </div>
                        <span class="fill-table-td approval-process-content-text" @mouseenter="showProcess(row)">
                            <div v-if="isInProgress(row)" class="indicator"></div>
                            {{ row.currentNodeName }}
                        </span>
                    </ui-tooltip>
                </template>
            </ui-table-column>
            <ui-table-column prop="processInstanceId" label="编号" width="230" show-overflow-tooltip></ui-table-column>
            <ui-table-column
                class-name="operate"
                label="操作" min-width="120"
            >
                <template slot-scope="{row}">
                    <!-- 待审批状态叫审批 其他叫详情-->
                    <router-link
                        class="text-primary column-operate-btn"
                        :to="`/dashboard/audit/audit-center/detail?processId=${row.processInstanceId}&processTypeCode=${row.processTypeCode}&tabType=${ queryData.tabType }&type=${ queryData.tabType === 'pending' ? 'operate' : 'look' }&processType=${queryData.processType || ''}&searchQuery=${queryData.searchQuery}&startTime=${startTime}&endTime=${endTime}`"
                    >
                        {{ queryData.tabType === 'pending' ? '审批' : ( row.status === 0 ? '查阅' : '详情' ) }}
                    </router-link>
                    <!-- 我发起的 && 状态为退回发起人 && 已经有对应的重新发起组件 显示重新发起按钮 -->
                    <template
                        v-if="queryData.tabType === 'myApproval'
                            && approveResultMap.returnOriginator === row.currentNodeName
                            && renewCompMap[row.processTypeCode]
                            && renewCompMap[row.processTypeCode].listRenew"
                    >
                        <span
                            class="text-primary column-operate-btn"
                            @click="handleShowRenewDialog(row)"
                        >
                            重新发起
                        </span>
                    </template>
                </template>
            </ui-table-column>
        </ui-table-pro>
    </div>
    <div v-show="tableData.length && !showLoadError" class="push-pager">
        <div v-if="isBatch" class="total-select">
            最多可选<em>50</em>条 已选择<em> {{ selectList.length || 0 }} </em>条
        </div>
        <ui-pager
            text-align="center"
            show-total
            show-elevator
            :total="pageData.total" :current="pageData.current"
            :page-size="pageData.pageSize" :page-size-opts="[15, 30, 50, 100]"
            @update:page="onCurrentPageChange"
        >
        </ui-pager>
    </div>
    <!-- 续签弹窗 -->
    <renew-dialog ref="renewDialog" :audit-data="currentContract" @on-confirm="onRenewSubmit"></renew-dialog>
    <batch-approval-dialog ref="batchApprovalDialog" @on-confirm="onSearch()"></batch-approval-dialog>
</div>
</template>
<script>
import { _getAuditList, _getTypeList, _contractAuditProgress, _getStatusList, _viewAll } from '@/services/dashboard/audit/index.js';
import { COMP_MAP, APPROVE_RESULT_MAP } from './model/data';
import RenewDialog from './renew-component/renew-dialog';
import ApprovalProcess from '../components/approval-process';
import { TableEmptyTip } from '@noah/components';
import { util } from '@noah/tools';
const { debounce, isNull, _getValue, getNameByCode } = util;
import BatchApprovalDialog from './components/batch-approval-dialog.vue';

// 导航类型map
const TAB_TYPE_MAP = {
    pending: 0,
    approved: 1,
    myApproval: -1,
    refer: 2
};

export default {
    components: {
        ApprovalProcess,
        RenewDialog,
        TableEmptyTip,
        BatchApprovalDialog
    },
    data() {
        return {
            debounce,
            tabList: [
                { name: '待审批', key: 'pending' },
                { name: '已审批', key: 'approved' },
                { name: '查阅', key: 'refer' },
                { name: '我发起的', key: 'myApproval' }
            ],
            approvalStatus: [],                 // 审批状态列表
            processTypeListMap: {},             // 审批类型列表Map 不同的tab有不同的审批类型列表
            queryData: {
                processType: '',                // 审批类型
                tabType: 'pending',             // tab切换类型
                date: [],                       // 时间数组
                searchQuery: '',                 // 查询条件
                processStatus: ''
            },
            pageData: {                         // 分页配置
                total: 0,
                current: 1,
                pageSize: 30
            },
            isLoading: false,                   // 显示加载中
            showLoadError: false,               // 显示报错模块
            currentContract: {},                // 弹窗出现时 所选中的合同对象
            tabCount: {                         // 每个tab的飘数
                'pendingApproval': 0,           // 待审批
                'consult': 0                    // 查阅
            },
            seeAllLoading: false,
            tableData: [],
            getListTimeStamp: '',               // 列表请求时的时间戳
            selectList: [],                     // 选中id list
            checkNumber: 50                     // 设置选中的条数
        };
    },
    filters: {
        tabCountNum: function (value) {
            if (value > 99){
                return '99+';
            }
            return value;
        }
    },
    computed: {
        renewCompMap() {                        // 续签组件 Map
            return COMP_MAP;
        },
        isBatch() {
            let batch = getNameByCode(this.queryData.processType, this.processTypeList, '', {
                codeKey: 'processTypeId',
                labelKey: 'batch'
            });
            if (this.queryData.tabType === 'pending' && batch) {
                return true;
            }
            return false;
        },

        approveResultMap() {                    // 审批类型 Map
            return APPROVE_RESULT_MAP;
        },

        processTypeList() {                     // 审批类型列表
            const type = this.queryData.tabType;
            return this.processTypeListMap[type] || [];
        },
        tableDataType() {                       // 数据为空报错加载中时的组件类型
            if (this.isLoading) {
                return 'loading';
            } else if (this.showLoadError) {
                return 'error';
            } else if (this.tableData && !this.tableData.length && this.queryData.tabType === 'pending') {
                return 'noTodo';
            } else if (this.tableData && !this.tableData.length) {
                return 'noData';
            } else {
                return null;
            }
        },
        startTime() {
            return _getValue(this.queryData, 'date[0]', '');
        },
        endTime() {
            return _getValue(this.queryData, 'date[1]', '');
        }
    },
    created () {
        this._getValue = _getValue;
        this.getQuery();
    },
    mounted() {
        this.init();
        this.onSearch(this.pageData.current);
    },
    methods: {
        getQuery() {
            const query = this.$route.query;
            Object.keys(this.queryData).forEach(key => {
                if (!isNull(query[key])) {
                    this.queryData[key] = query[key];
                }
            });
            const { page, pageSize, startTime, endTime } =  query;
            if(startTime && endTime) {
                this.queryData.date = [startTime, endTime];
            }

            if (!page && !pageSize) {
                return;
            }
            this.pageData.current = +page;
            this.pageData.pageSize = +pageSize;
        },
        isInProgress(row) {
            return row.processStatus === 1;
        },
        async handleSeeAll() {
            if(this.seeAllLoading) return;
            this.seeAllLoading = true;
            try {
                const { success, root} = await _viewAll();
                if(success) {
                    this.tabCount.consult = 0;
                    this.$toast(root || '查阅全部成功', 'success');
                    this.onSearch();
                }
            } catch (error) {

            } finally {
                this.seeAllLoading = false;
            }
        },
        // 获取审批状态
        async getStatusList() {
            try {
                const { success, root } = await _getStatusList();
                if (success && root) {
                    this.approvalStatus = Object.freeze(root.filter(t => ['进行中', '结束', '驳回', '异常结束'].includes(t.processStatusName)));
                }
            } catch (error) {
                // console.log(error);
            }
        },
        getRowKeys(row){
            return row.processInstanceId;
        },
        init() {
            const { tabType } = this.$route.query;
            if (tabType) {
                this.queryData.tabType = tabType;
            }
            this.getTypeList();
            this.getStatusList();
        },
        rawOnSearch: async function(page = 1, clearSelect=true) {
            if (clearSelect) {
                this.clearSelect();
            }
            let getListTimeStamp = '';
            try {
                this.pageData.current = page;
                const { current, pageSize } = this.pageData;
                const { tabType, processType, searchQuery, processStatus } =  this.queryData;
                const startTime = this.startTime;
                const endTime = this.endTime;
                this.isLoading = true;
                this.tableData = [];
                this.showLoadError = false;
                this.getListTimeStamp = getListTimeStamp = new Date().getTime();
                // 向地址栏添加tabType
                const params = {
                    processType,
                    searchQuery,
                    startTime,
                    processStatus: processStatus && Number(processStatus),
                    endTime,
                    tabType: TAB_TYPE_MAP[tabType],
                    page: current,
                    pageSize: pageSize
                };
                this.setQuery({ ...params, tabType  });
                const { success, root} = await _getAuditList(params);
                if (success && root) {
                    // 防止快速切换tab 导致显示的数据不是本tab页下的数据
                    if (getListTimeStamp !== this.getListTimeStamp) {
                        return;
                    }
                    // 防止列表数据减少 keepAlive导致pagesize不更新 导致页面由于pagesize大于实际pagesize 引起的表格没数据
                    if ((!root.list || root.list.length === 0) && this.pageData.current !== 1) {  // 列表没有数据 并且不是第一页
                        this.onSearch();
                    } else {
                        this.tableData = root.list || [];
                        this.pageData.total = root.count;
                        this.tabCount = root.tabCount || {};
                        this.$store.commit('updateAuditCount', this.tabCount.pendingApproval);  // 更新全局待办数量 用于头部右上角显示
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
        /**
         * @description 页面搜索方法
         * @param {Number} page 需要查询的页数
         */
        onSearch(...p) {
            this.isLoading = true;
            this.tableData = [];
            this.debounceSearch(...p);
        },

        debounceSearch: debounce(500, function(...p){
            this.rawOnSearch(...p);
        }),

        // 获取审批类型列表
        async getTypeList() {
            if (this.processTypeList.length) {
                return;
            }
            const keyMap = {
                'myApproval': 1,
                'refer': 3,
                'pending': 2,
                'approved': 2
            };

            try {
                const { success, root } = await _getTypeList({
                    type: keyMap[this.queryData.tabType]
                });
                if (success && root) {
                    this.$set(this.processTypeListMap, this.queryData.tabType, root && Object.freeze(root));
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
                    this.$set(item, 'processAuditInfoVOList',root && Object.freeze(root));
                }
            } catch (error) {
                console.log(error);
            }

        },

        // 页面重置方法
        onReset() {
            const tabType = this.queryData.tabType;
            this.$refs.processTypeRef && this.$refs.processTypeRef.clearSingleSelect();
            this.queryData = {
                processType: '',
                searchQuery: '',
                processStatus: '',
                tabType,
                date: []
            };
            this.onSearch();
        },

        /**
         * @description 查询区域tab改变
         */
        handleTabChange: debounce(300,function(item){
            this.queryData.tabType = item.key;
            this.getTypeList();
            this.onReset();
        }),

        /**
         * @description 修改分页组件page
         * @param {String} page 页面数字
         */
        onCurrentPageChange(page) {
            this.onSearch(+page, false);
        },
        /**
         * @description 显示续签弹窗
         * @param {Object} contractData 合同data
         */
        async handleShowRenewDialog(contractData) {
            this.currentContract = contractData;
            this.$nextTick(() => {
                this.$refs.renewDialog.open(contractData);
            });
        },

        /**
         * @description 续签弹窗提交方法 如果需要跟弹窗通信 则在子组件中调用此方法
         * @param {Object} data 续签弹窗返回的数据
         */
        onRenewSubmit(data) {
            // 每种弹窗 可以根据 data里的参数 或者renewCompInfo.listRenew 做组件区分
            // if (this.renewCompInfo.listRenew === 'CommonRenew') {}
            this.onSearch(this.pageData.current);
        },
        /**
         * @description 向地址栏塞值用来做缓存
         * @param {Object} data 要缓存的数据
         */
        setQuery(data) {
            let query = {};
            Object.entries(data).forEach(([key, value]) => {
                if (isNull(value)) {
                    return;
                }
                query[key] = value;
            });

            this.$router.replace({
                path:this.$route.path,
                query
            });
        },
        handleSelectionChange(selectList) {
            this.selectList = selectList;
        },
        handleSelectionAllChange(data) {
            // 过滤当前表格数据
            let isMoreThan = false;
            for (let i = this.tableData.length - 1; i>= 0; i--) {
                if (this.selectList.length > this.checkNumber) {
                    // 大于设置的条数，取消选择
                    isMoreThan = true;
                    this.$refs.dataTable.toggleRowSelection(this.tableData[i], false);
                }
            }
            isMoreThan &&  this.$toast(`最多可选${this.checkNumber}条！`, 'warning');
        },
        checkboxInit(row) {
            // 设置checkbox，选中状态，是否可选
            const check = this.selectList.find((item) => {return item.processInstanceId === row.processInstanceId; });
            if (!check && this.selectList.length === this.checkNumber) {
                return 0;
            } else {
                return 1;
            }
        },
        clearSelect() {
            this.$refs.dataTable && this.$refs.dataTable.clearSelection();
            this.selectList = [];
        },
        // 批量发起审批
        handleShowBatchApproavl() {
            if (!this.selectList.length) {
                this.$toast('请勾选审批流程后，进行一键审批', 'warning');
                return;
            }
            this.$refs.batchApprovalDialog.open(this.selectList);
        }
    }
};
</script>
