<template>
<div class="batch-approval-page">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(effectDateStr, 'effectDateStr', true)]">
                <span>生效日期</span>
                <div>{{ effectDateStr ? $dayjs(effectDateStr).format('YYYY-MM-DD') : '-' }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container approval-no-border">
        <h2 class="title">异动信息</h2>
        <!-- 异动信息 -->
        <ui-table-pro :data="listInTable" class="table-pro-reset-ui"
            tooltip-effect="dark" tooltip-max-width="200px" :cell-class-name="getCellClassName"
            stripe :border="false" empty-text="暂无数据"
        >
            <ui-table-column show-overflow-tooltip prop="name" fixed="left" label="员工姓名" min-width="94px">
                <talentIcon :id="row.encryptUserId" slot-scope="{row}" :name="row.name" :blank="true" :no-tip="true" />
            </ui-table-column>
            <ui-table-column show-overflow-tooltip prop="number" fixed="left" label="员工编号" min-width="84px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="beforeDeptName" fixed="left" label="部门" min-width="140"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="remark" label="异动说明" min-width="140px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="changeTypeStr" label="异动类型" width="320px"> 
                <template slot-scope="{row}">
                    <ui-select v-if="canOperate && currentNodeName==='商业HR' && row.isBusiness" v-model="row.changeType"
                        placeholder="请选择异动类型" collapse-tags multiple-tags-disabled
                        transfer multiple
                    >
                        <template>
                            <ui-option v-for="item in dictInfo.change_type" :key="item.dictCode" class="change-approval-option"
                                :disabled="item.remark === 'notBusiness'"  :value="item.dictCode"
                            >{{ item.dictName }}</ui-option>
                        </template>
                    </ui-select>
                    <span v-else>{{ row.changeTypeStr }}</span>
                </template>
            </ui-table-column>
            <ui-table-column show-overflow-tooltip prop="changeForStr" label="异动变化" min-width="180px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="upOrDownName" label="是否升级/降级" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterDeptName" label="异动后部门" min-width="140px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterPosition" label="异动后岗位" min-width="140px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterReporterName" label="异动后汇报人" min-width="110px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterReporterName2" label="异动后汇报人2" min-width="120px"></ui-table-column>

            <ui-table-column show-overflow-tooltip prop="afterManageSeqStr" label="异动后管理序列" min-width="130px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterManageSeqLevelStr" label="异动后管理职级" min-width="130px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterManageSeqSubStr" label="异动后管理子序列" min-width="140px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterManageStdPositionStr" label="异动后管理标准岗位" min-width="150px"></ui-table-column>

            <ui-table-column show-overflow-tooltip prop="afterSeqStr" label="异动后专业序列" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterSeqLevelStr" label="异动后专业职级" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterSeqSubStr" label="异动后专业子序列" min-width="140px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterStdPositionStr" label="异动后专业标准岗位" min-width="150px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="afterWorkplaceStr" label="异动后工作地点" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="isProbation" label="是否设置见习期" min-width="120px">
                <template slot-scope="{row}">
                    {{ booleanStr(row.isProbation) }}
                </template>
            </ui-table-column>
            <ui-table-column show-overflow-tooltip prop="probationStartDateStr" label="见习开始日期" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="probationDuration" label="见习期限（月）" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="probationEndDateStr" label="见习应结束日期" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="probationPosition" label="见习岗位" min-width="140px"></ui-table-column>
            <!-- <ui-table-column show-overflow-tooltip prop="probationRemark" label="特殊情况说明" min-width="140px"></ui-table-column> -->
            <ui-table-column show-overflow-tooltip prop="isTl" label="是否部门负责人" min-width="120px">
                <template slot-scope="{row}">
                    {{ booleanStr(row.isTl) }}
                </template>
            </ui-table-column>
            <ui-table-column show-overflow-tooltip prop="isChangeEmailGroup" label="是否退出/加入邮箱群组" min-width="180px">
                <template slot-scope="{row}">
                    {{ booleanStr(row.isChangeEmailGroup) }}
                </template>
            </ui-table-column>
        </ui-table-pro>
        <ui-pager
            v-show="tableData.length"
            class="center" text-align="center"
            show-total show-elevator show-sizer
            :total="pageData.total" :current="pageData.current"
            :page-size="pageData.pageSize" :page-size-opts="[15, 30, 50, 100]"
            @update:page="onCurrentPageChange" @update:pageSize="onPageSizeChange"
        >
        </ui-pager>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { getNameByCode } from '@/utils/util.js';
import { _getSpecialDictTypes } from '@/services/dashboard/system/common';
import { _batchEditChangeType, _getAuditNodeStatusByProcessInstanceId } from '@/services/dashboard/audit';
import { _batchGetDictInfo } from '@/services/dashboard/common';
import talentIcon from '@/components/talent-entry-icon/index.vue';
export default {
    name: 'ChangeApproval',
    components: { talentIcon },
    props: {
        canOperate: Boolean
    },
    mixins: [commonMixin],
    data() {
        return {
            effectDateStr: '',
            pageData: {                         // 分页配置
                total: 0,
                current: 1,
                pageSize: 30
            },
            currentNodeName: '',
            isLoad: false,
            tableData: [],
            dictInfo: {
                change_type: []
            }
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        // 前端做分页处理
        listInTable() {
            const { current, pageSize } = this.pageData;
            let startNum =  (current - 1) * pageSize;
            this.isLoad = false;
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.isLoad = true;
            },100);
            return this.tableData.slice(startNum, startNum + pageSize);
        },
        // 据BPM传给Noah的审批节点名称，判断字段是否可见
        operateNode() {
            let role = '';
            if (['商业HR'].indexOf(this.currentNodeName) > -1) {   
                role = 'businessHR';
            }
            return role;
        }
    },
    watch: {
        // listInTable: {
        //     deep: true,
        //     handler() {
        //         const { current, pageSize } = this.pageData;
        //         let startNum =  (current - 1) * pageSize;
        //         this.isLoad = false;
        //         clearTimeout(this.timer);
        //         this.timer = setTimeout(()=>{
        //             this.isLoad = true;
        //         },100);
        //     }
        // },
        tableData(value){
            this.pageData.total = value ? value.length : 0;
        },
        canOperate: {
            handler (data) {
                this.isLoad = false;
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this.isLoad = true;
                },100);
            },
            immediate: true,
            deep: true
        }
    },
    async created() {
        await this.getAuditNodeStatusByProcessInstanceId();
        this.getProgressInfo();
        this.getNameByCode = getNameByCode;
        this.getDictInfo();
    },
    methods: {
        // 获取审批详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.tableData = (root.detail || []);
            
            this.effectDateStr = this.tableData[0] ? this.tableData[0].effectDateStr : '';
        },
        async getAuditNodeStatusByProcessInstanceId() {
            const { success, root } = await _getAuditNodeStatusByProcessInstanceId({
                processInstanceId: this.processId
            });
            if(!(success && root && root.length)) return;
            const current = root.find(item => item.last === 1);
            this.currentNodeName = current ? current.nodeName : '';
        },
        /**
         * @description 修改分页组件page
         * @param {String} page 页面数字
         */
        onCurrentPageChange(page) {
            this.pageData.current = +page;
        },
        /**
         * @description 修改分页组件pageSize
         * @param {String} pageSize 页面每页显示数量
         */
        onPageSizeChange(pageSize) {
            this.pageData.current = 1;
            this.pageData.pageSize = +pageSize;
        },
        booleanStr(value) {
            if (value === true) {
                return '是';
            } else if (value === false) {
                return '否';
            } else {
                return value || '';
            }
        },
        /**
         * @description 给列表操作列特殊class用于控制样式
         */
        getCellClassName({ row, column }) {
            if (row.changedFieldList && row.changedFieldList.includes(column.property)) {
                return 'table-highlight-cell';
            }
        },
        // 获取下拉列表数据
        async getDictInfo() {
            try {
                const { success, root } = await _batchGetDictInfo({
                    typeList: Object.keys(this.dictInfo)
                });
                if(!success) return;
                this.dictInfo = root || {};
                this.changeType = this.dictInfo.changeType || [];
            } catch (error) {
                console.log(error);
            }
        },
        async beforeAgree() {
            try {
                if (!['businessHR'].includes(this.operateNode)) {
                    return true;
                }
                const changeTypeNull = this.tableData.find(item => {
                    return !item.changeType || !item.changeType.length;
                });
                
                if (changeTypeNull) {
                    this.$toast('异动类型不能为空', 'warning');
                    return;
                }

                const { success, root } = await _batchEditChangeType({
                    processInstanceId: this.processId,
                    list: (this.tableData || []).map(item => {
                        return {
                            encryptUserId: item.encryptUserId,
                            changeType: item.changeType || []
                        };
                    })
                });
                if(success) {
                    return {
                        postData: {}
                    };
                };
                return false;
            } catch(error) {
                console.log(error);
            }
        }
    }
};
</script>