<template>
<div>
    <ui-dialog
        v-model="showRenewDialog"
        prevent-cancel prevent-close
        prevent-confirm
        prevent-layer :show-footer="false"
        :title="renewCompInfo.renewName" wrap-class="dialog-audit-renew bossui-new"
        @on-cancel="onRenewDialogClose"
        @on-close="onRenewDialogClose"
    >
        <template slot="content">
            <component
                :is="renewCompInfo.listRenew"
                v-if="showRenewDialog" :audit-data="auditData"
                :show-modal.sync="showRenewDialog" @on-confirm="onRenewSubmit"
            />
        </template>
    </ui-dialog>
    <component :is="renewCompInfo.listRenew" v-if="showRenewDialogIndependent" ref="reportDialog" @on-confirm="onRenewSubmit" />
    <ApplyDialog ref="applyDialog" @refresh="refresh" />
    <ItOrderDialog ref="itOrderDialog" @refresh="refresh" />
</div>
</template>
<script>
import * as RenewComps from './index.js';
import { COMP_MAP } from '../model/data';
import { _getValue } from '@/utils/util.js';
import { AttendanceDialog as ApplyDialog } from '@noah/components';
import { _getLeaveType } from '@/services/dashboard/attendance';
import { _getDetailByProcessInstanceId } from '@/services/dashboard/audit';
import {ItOrderDialog} from '@noah/components';

export default {
    components: {
        ...RenewComps,
        ApplyDialog,
        ItOrderDialog
    },
    props: {
        auditData: {
            type: Object,
            default: () => ({})
        },
        'onConfirm': {
            type: Function,
            default: function () {}
        }
    },
    data() {
        return {
            showRenewDialog: false,
            leaveTypes: [],
            pathMap: {
                'transaction': '/dashboard/audit/audit-center/transaction',
                'departure': '/dashboard/audit/audit-center/departure',
                'batchRank': '/dashboard/staff/batch-rank',
                'batchTransaction': '/dashboard/staff/batch-transaction',
                'specialAttendance':'/dashboard/attendance/apply-attendance',       // 特殊考勤
                'itEmailApproval': '/dashboard/it-order/public-email',              // 公共邮箱审批
                'itPasswordApproval': '/dashboard/it-order/reset-password',         // 重置密码审批
                'itRecycleEmailApproval': '/dashboard/it-order/recycle-email',      // 回收邮箱审批
                'itEmailGroupApproval': '/dashboard/it-order/email-group',          // 邮箱群组审批
                'itSendEmailApproval': '/dashboard/it-order/send-email',            // 发件权限审批
                'itVpnApproval': '/dashboard/it-order/vpn',                         // VPN权限审批
                'itRemoteApproval': '/dashboard/it-order/remote',                   // 远程权限审批
                'itVpnSourceApproval': '/dashboard/it-order/vpn-source',            // VPN访问资源审批
                'itMaintenanceApproval': '/dashboard/it-order/maintenance',         // 设备维修审批
                'itOtherApproval':'/dashboard/it-order/other',                      // 其他IT工单审批
                'internshipRegularApproval':'/dashboard/staff/internship-regular',  // 实习转正式
                'CommonRenew': '/dashboard/contract/warning-edit',                  //  合同续签
                'assetTransferApproval': '/dashboard/equipment/asset-transfer'     // 资产转移
            }
        };
    },
    computed: {
        renewCompMap() {                        // 续签组件 Map
            return COMP_MAP;
        },
        renewCompInfo() {                       // 续签组件数据
            const processTypeCode = _getValue(this.auditData, 'processTypeCode');
            return this.renewCompMap[processTypeCode] || {};
        },
        // 用来判断显示那种弹窗组件
        showRenewDialogIndependent() {
            return ['SJT010006', 'SJT010011', 'SJT010007', 'SJT010008', 'SJT010001', 'SJT010010', 'SJT010015'].includes(this.auditData.processTypeCode);
        },
        // IT服务里的弹窗
        itDialogComp() {
            return [
                'ITS010001', 'SJT010020',
                'ITS010002', 'ITS010003', 'ITS010004',
                'ITS010005', 'ITS010006', 'ITS010007',
                'ITS010008', 'ITS010009', 'ITS010010'
            ].includes(this.auditData.processTypeCode);
        },
        showNoComp() {
            return [
                'SJT010003', 'SJT010009', 'SJT010012',
                'SJT010013', 'SJT010016',
                'SJT010019', 'SJT010005', 'SJT010020',
                'SJT010004', 'SJT010017', 'SJT010025',
                'SJT010026', 'SJT010027'
            ].includes(this.auditData.processTypeCode);
        }
    },
    methods: {
        onRenewDialogClose() {
            this.showRenewDialog = false;
        },
        onRenewSubmit(data) {
            this.$emit('on-confirm', data);
        },
        refresh() {
            this.$emit('on-confirm');
        },
        async open() {
            if (this.showRenewDialogIndependent) {  // 弹窗一体的组件
                switch (this.renewCompInfo.listRenew) {
                    case 'interview-report':        // 访谈
                    case 'approve-offer':           // offer的
                        this.$refs.reportDialog.open({id: this.auditData.processInstanceId}, 'audit_center');
                        break;
                    case 'information-regist':       // 个人档案
                    case 'train':       // 培训
                        this.$refs.reportDialog.open({ processInstanceId: this.auditData.processInstanceId });
                        break;
                    default:
                        break;
                }
            }
            else if(this.itDialogComp) {
                this.$refs.itOrderDialog.open(this.renewCompInfo.listRenew,  this.auditData.processInstanceId);
            }
            else if (this.showNoComp) {
                if (this.renewCompInfo.listRenew) {
                    if(['specialAttendance', 'AttendanceRenew'].includes(this.renewCompInfo.listRenew)) {
                        this.handleAtt();
                    } else {
                        let path = this.pathMap[this.renewCompInfo.listRenew];
                        const query = {
                            processInstanceId: this.auditData.processInstanceId,
                            type: 'audit',
                            target: '/dashboard/audit/audit-center/list'
                        };
                        if(this.$route.name === 'auditCenterDetail') {
                            query.isDetail = 1;
                        }

                        this.$router.push({
                            path: path,
                            query
                        });
                    }
                }
            }
            else {   // 没有弹窗的组件
                this.showRenewDialog = true;
            }
        },
        async handleAtt() {
            const data = this.auditData;
            let id = '';
            let detail;
            const { root: _root, success: _suc } = await _getDetailByProcessInstanceId({
                processInstanceId: data.processInstanceId
            });
            if(_suc) {
                id = _root?.detail?.processInstanceId || _root?.detail?.id;
                detail = _root?.detail;
            } else {
                return;
            }

            // console.log(detail);

            // 退回重新发起
            if( detail.resumptionStatus ) {
                // console.log('退回重新发起');
                if(detail.resumptionStatus !== 1 && [4, 5].includes(+detail.status)) {
                    this.$router.push({
                        path: '/dashboard/attendance/application-detail',
                        query: {
                            id,
                            type: 'salesleave',
                            // target: currentPath,
                            sourceFrom: 'detail',
                            from: 'audit',
                            fromPath: encodeURIComponent(this.$route.fullPath)
                        }
                    });
                    return;

                } else if(detail.resumptionStatus === 1) {
                    const length = detail.partResumptionLeaveList?.length;
                    const last = length ? detail.partResumptionLeaveList[length - 1] : {};
                    if([4, 5].includes(+last.status)) {
                        this.$router.push({
                            path: '/dashboard/attendance/application-detail',
                            query: {
                                id,
                                type: 'salesleave',
                                // target: currentPath,
                                sourceFrom: 'detail',
                                from: 'audit',
                                fromPath: encodeURIComponent(this.$route.fullPath)
                            }
                        });
                        return;
                    }
                }
            }

            // 特殊考勤
            if(this.renewCompInfo.listRenew === 'specialAttendance') {
                this.$refs.applyDialog?.open({
                    id,
                    pageType: 'special'
                });
                return;
            }

            // 申诉
            const isAppeal = [3, 4].includes(+(detail.appealType || 0));
            if(isAppeal) {
                this.$refs.applyDialog?.open({
                    id,
                    pageType: 'appeal',
                    appealType: detail.appealType,
                    attendanceId: detail.attendanceId,
                    attendanceStatus: detail.attendanceStatus
                });
                return;
            }

            // 请假/公出
            let pageType = '';
            if(data.leaveType === 20) {
                pageType = 'stay-home';
            } else {
                // 获取请假类型
                if(!this.leaveTypes.length)  {
                    try {
                        const { root, success } = await _getLeaveType();
                        if(success) {
                            this.leaveTypes = root?.map(t => t.type);
                        }
                    } catch (error) {

                    }
                }
                // console.log( this.leaveTypes,data, data.leaveType, '===');
                pageType = this.leaveTypes.includes(detail.leaveType)? 'vacation': 'publicout';
            }
            console.log(pageType, id);
            this.$refs.applyDialog?.open({
                pageType,
                id
            });
        }
    }
};
</script>
