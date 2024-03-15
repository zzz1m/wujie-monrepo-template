
import { get, post } from '@/services/http';
import { encrypt } from '@/utils/crypto';
const headerConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};


// 员工提交休假,公出 申请预览
export const _previewProgress = (params = {}) => {
    return post('/api/apply/user/submit/previewProgress.json', params, { quiet: true });
};


// 【特殊考勤】预览审批流
export const _attendanceSpecialUserPreviewProgress = (params = {}) => {
    return post('/api/attendanceSpecialUser/previewProgress.json', params);
};

// 审批中心	-【人员实习信息】审批预览）Noah默认角色
export const _previewProgressInternship = (params = {}) => {
    return post('/api/user/internship/approval/previewProgress.json', params);
};
// (线下培训管理 - 培训审批预览) 培训超级管理员 培训管理员 讲师
export const _previewProgressTrain = (params = {}) => {
    return post('/api/learning/train/previewProgress.json', params);
};


// 访谈工单流程预览
export const _previewProgressInterview = (params = {}) => {
    return post('/api/interview/user/previewProgress.json', params, headerConfig);
};

// 合同管理 - 合同续签流程预览
export const _previewProgressContractWarning = (params = {}) => {
    return post('/api/contract/warning/previewProgress.json', params);
};

// 资产管理 - 资产转移流程预览
export const _previewProgressAsset = (params = {}) => {
    return post('/api/asset/previewProgress.json', params);
};
export const _previewProgressUserRecord = (params = {}) => {
    return post('/api/sys/user_record/previewProgress.json', params);
};
// 人员异动管理 - 人员异动审批预览 
export const _previewProgressEntry = (params = {}) => {
    return post('/api/entry/previewProgress.json', params);
};


// 人员异动管理 - 人员异动审批预览 
export const _previewProgressStaffChange = (params = {}) => {
    return post('/api/user/change/previewProgress.json', params);
};
// 人员离职管理 - 离职流程预览
export const _previewProgressLeave = (params = {}) => {
    return post('/api/user/leave/previewProgress.json', params);
};
// 人员异动管理 - 批量人员异动信息流程预览
export const _previewProgressStaffChangeBatch = (params = {}) => {
    return post('/api/user/change/batch/previewProgress.json', params);
};
// 人员异动管理 - 批量职级调整流程预览
export const _previewProgressStaffSeqBatch = (params = {}) => {
    return post('/api/user/change/batch/seq/previewProgress.json', params);
};
// 成长中心 - 课程审批流程预览
export const _previewProgressCourse = (params = {}) => {
    return post('/api/learning/course/previewProgress.json', params);
};
// 成长中心 - 课程审批流程预览
export const _previewProgressOffer = (params = {}) => {
    return get('/api/offer/user/approveStatus/previewProgress.json', params);
};
// 月度绩效 - 月度绩效流程预览）月度绩效上传人员
export const _previewProgressKpi = (params = {}) => {
    return post('/api/month/kpi_upload/previewProgress.json', params);
}; 
// IT管理 - 申请开通公共邮箱流程
export const _previewProgressEmail = (params = {}) => {
    return post('/api/it/bpm/publicEmail/previewProgress.json', params);
}; 
// 申请重置密码流程预览
export const _previewProgressPassword = (params = {}) => {
    return post('/api/it/bpm/resetPassword/previewProgress.json', params);
}; 

// IT管理 - 申请回收邮箱流程预览
export const _previewProgressRecycleEmail = (params = {}) => {
    return post('/api/it/bpm/recycleEmail/previewProgress.json', params);
}; 
// IT管理 - 申请邮箱群组流程预览
export const _previewProgressEmailGroup = (params = {}) => {
    return post('/api/it/bpm/emailGroup/previewProgress.json', params);
}; 
// IT管理 - 申请调整发件人权限预览
export const _previewProgressEmailSender = (params = {}) => {
    return post('/api/it/bpm/emailSender/previewProgress.json', params);
}; 
// IT管理 - 申请开通VPN流程预览
export const _previewProgressOpenVpn = (params = {}) => {
    return post('/api/it/bpm/openVpn/previewProgress.json', params);
}; 
// IT管理 - 申请开通远程权限流程预览
export const _previewProgressOpenRemote = (params = {}) => {
    return post('/api/it/bpm/openRemote/previewProgress.json', params);
}; 
// IT管理 - 申请开通Vpn资源流程预览
export const _previewProgressVpnResource = (params = {}) => {
    return post('/api/it/bpm/vpnResource/previewProgress.json', params);
}; 
// IT管理 - 申请设备维修流程预览
export const _previewProgressRepairDevice = (params = {}) => {
    return post('/api/it/bpm/repairDevice/previewProgress.json', params);
}; 

// IT工单-其他问题 预览接口 
export const _previewProgressItOther = (params = {}) => {
    return post('/api/it/bpm/other/previewProgress.json', params);
};



//申请育儿假-流程预览 -v4.9.9
export const _previewProgressChildHoliday = (params = {}) => {
    return post('/api/apply/childHoliday/previewProgress.json', params);
};

