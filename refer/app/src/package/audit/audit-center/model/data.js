
// 续签组件名称 Map
export const COMP_MAP = {
    'SJT010030': { // 办公物品领取申请
        renewName: '',
        listRenew: '',
        detailRenew: 'equipment-apply',
        billType: 'office_supply_long_term'
    },
    'SJT010005': {      // 续签审批
        renewName: '发起续签',
        listRenew: 'CommonRenew',
        detailRenew: 'ContractRenew',
        billType: 'contract'
    },
    'SJT010004': {      // 考勤审批流
        renewName: '',
        listRenew: 'AttendanceRenew',
        detailRenew: 'attendance-approval',
        billType: 'apply'
    },
    'SJT010025': {      // 公出审批流程
        renewName: '',
        listRenew: 'AttendanceRenew',
        detailRenew: 'attendance-approval',
        billType: 'apply_business_local'
    },
    'SJT010026': {      // 出差审批流程
        renewName: '',
        listRenew: 'AttendanceRenew',
        detailRenew: 'attendance-approval',
        billType: 'apply_business_out'
    },
    'SJT010027': {      // 补卡申诉审批
        renewName: '',
        listRenew: 'AttendanceRenew',
        detailRenew: 'attendance-approval',
        billType: 'apply_appeal'
    },
    'SJT010017': {      // 防疫居家审批流
        renewName: '',
        listRenew: 'AttendanceRenew',
        detailRenew: 'attendance-approval',
        billType: 'apply_business_home'
    },
    'SJT010016': {      // 特殊考勤审批流
        renewName: '',
        listRenew: 'specialAttendance',
        detailRenew: 'special-attendance-approval',  
        billType: 'special_attd_user'
    },
    'SJT010001': {      // offer 审批流
        renewName: 'offer编辑',
        listRenew: 'approve-offer',
        detailRenew: 'offer-approval',
        billType: 'offer'
    },
    'SJT010002': {      // 个人档案审批流
        renewName: '',
        listRenew: '',
        detailRenew: 'staff-record',
        billType: 'user_record'
    },
    'SJT010006': {      // 转正访谈审批
        renewName: '',
        listRenew: 'interview-report',
        detailRenew: 'interview-report',
        billType: 'interview_turn_right'
    },
    'SJT010011': {      // 首月转正访谈
        renewName: '',
        listRenew: 'interview-report',
        detailRenew: 'interview-report',
        billType: 'interview_first'
    },
    'SJT010007': {      // 见习3月/6月访谈
        renewName: '',
        listRenew: 'interview-report',
        detailRenew: 'interview-report',
        billType: 'probation'
    },
    'SJT010008': {      // 晋升访谈
        renewName: '',
        listRenew: 'interview-report',
        detailRenew: 'interview-report',
        billType: 'promotion'
    },
    'SJT010003': {      // 员工异动
        renewName: '异动',
        listRenew: 'transaction',
        detailRenew: 'change-approval',
        billType: 'user_shift'
    },
    'SJT010009': {      // 员工离职
        renewName: '离职',
        listRenew: 'departure',
        detailRenew: 'leave-approval',
        billType: 'user_leave'
    },
    'SJT010010': {      // 录用审批
        renewName: '录用审批',
        listRenew: 'information-regist',
        detailRenew: 'employ-approval',
        billType: 'entry_record'
    },
    'SJT010012': {      // 批量职级调整
        renewName: '批量职级调整',
        listRenew: 'batchRank',
        detailRenew: 'batch-rank-approval',
        billType: 'user_batch_seq'
    },
    'SJT010013': {      // 批量移动异动
        renewName: '批量异动',
        listRenew: 'batchTransaction',
        detailRenew: 'batch-change-approval',
        billType: 'user_batch_change'
    },
    'SJT010014': {      // 员工合同续签确认
        renewName: '合同续签确认',
        listRenew: '',
        detailRenew: 'ContractRenew',
        billType: 'user_confirm'
    },

    'SJT010015': {      // 课程审批
        renewName: '',
        listRenew: 'train',
        detailRenew: 'train-approval',
        billType: 'learning'
    },

    
    'ITS010002': {      // 公共邮箱审批
        renewName: '公共邮箱',
        listRenew: 'public-email',
        detailRenew: 'it-email-approval',
        billType: 'it_open_mail'
    },
    'ITS010004': {      // 重置密码审批
        renewName: '重置密码',
        listRenew: 'itPasswordApproval',
        detailRenew: 'it-password-approval',
        billType: 'it_reset_mail_pwd'
    },
    'ITS010010': {      // 回收邮箱审批
        renewName: '回收邮箱',
        listRenew: 'itRecycleEmailApproval',
        detailRenew: 'it-recycle-email-approval',
        billType: 'it_recycle_mail'
    }, 
    'ITS010003': {      // 邮箱群组审批 
        renewName: '邮箱群组',
        listRenew: 'email-group',
        detailRenew: 'it-email-group-approval',
        billType: 'it_open_mail_group'
    },

    'ITS010005': {      // 发件权限审批
        renewName: '发件权限',
        listRenew: 'itSendEmailApproval',
        detailRenew: 'it-send-email-approval',
        billType: 'it_mail_sender'
    },
    'ITS010001': {      // VPN权限审批
        renewName: 'VPN权限',
        listRenew: 'vpn',
        detailRenew: 'it-vpn-approval',
        billType: 'it_open_vpn'
    },
    'ITS010006': {      // 远程权限审批
        renewName: '远程权限',
        listRenew: 'remote',
        detailRenew: 'it-remote-approval',
        billType: 'it_open_remote'
    },
    'ITS010007': {      // VPN访问资源审批 
        renewName: 'VPN访问资源',
        listRenew: 'vpn-source',
        detailRenew: 'it-vpn-source-approval',
        billType: 'it_open_vpn_resource' 
    },
    'ITS010008': {      // 设备维修审批
        renewName: '设备维修',
        listRenew: 'maintenance',
        detailRenew: 'it-maintenance-approval',
        billType: 'it_repair_device'
    },
    'ITS010009': {      // 其他IT工单审批
        renewName: '其他IT工单',
        listRenew: 'other',
        detailRenew: 'it-other-approval',
        billType: 'it_other'
    },

    'SJT010018': {      // 离开工作地报备
        renewName: '',
        listRenew: '',
        detailRenew: 'leave-filing',
        billType: 'leave_workplace_report'
    },
    'SJT010019': {      // 实习转正式审批
        renewName: '实习转正式审批',
        listRenew: 'internshipRegularApproval',
        detailRenew: 'internship-regular-approval',
        billType: 'user_internship'
    },
    'SJT010020': {      // 资产转移审批
        renewName: '资产转移审批',
        listRenew: 'asset-transfer',
        detailRenew: 'asset-transfer-approval',
        billType: 'asset_apply_transfer'
    },
    // 月度绩效审批
    'SJT010021': {
        // renewName: '月度绩效申请',
        // listRenew: 'monthPerformance',
        renewName: '',
        listRenew: '',
        detailRenew: 'month-performance',
        billType: 'month_performance'
    },
    'SJT010022': {      // 在职证明审批
        renewName: '',
        listRenew: '',
        detailRenew: 'certificate',
        billType: 'on_job_certify'
    },
    'SJT010023': {      // 收入证明审批
        renewName: '',
        listRenew: '',
        detailRenew: 'certificate',
        billType: 'salary_certify'
    },
    'SJT010024': {      // 育儿假发放申请
        renewName: '',
        listRenew: '',
        detailRenew: 'parenting',
        billType: 'child_holiday'
    }

    
};


// 审批类型map
export const APPROVE_RESULT_MAP = {
    returnOriginator: '[填写表单]'     // 用来判断续签审批 是否显示重新发起按钮
};