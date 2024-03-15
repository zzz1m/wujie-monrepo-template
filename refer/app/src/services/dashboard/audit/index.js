import { get, post } from '@/services/http';
import { encrypt } from '@/utils/crypto';

/**
 * 当前审批节点操作权限
 * @param {*} params 
 * @returns 
 */
export const _getNodePrevilege = (params = {}) => {
    return get('/api/process/center/nodePrivilege.json', params);
};

/**
 * 获取当前审批节点操作权限
 * @param {Object} params 
 */
export const _nodePrivilege = (params = {}) => {
    return get('/api/process/center/nodePrivilege.json', params);
};

/**
 * 流程审批
 * @param {Object} params
 */
export const _progressApprove = (params = {}) => {
    return post('/api/process/center/approve.json', params);
};

/**
 * 合同征询
 * @param {Object} params 
 */
export const _contractConsult = (params = {}) => {
    return post('/api/contract/warning/consult.json', params);
};

/**
 * 流程征询
 * @param {Object} params
 */
export const _progressConsult = (params = {}) => {
    return post('/api/process/center/consult.json', params);
};

/**
 * 访谈征询
 * @param {Object} params
 */
export const _interviewConsult = (params = {}) => {
    return post('/api/interview/user/consult.json', params);
};

/**
 * 员工异动征询
 * @param {Object} params
 */
export const _changeConsult = (params = {}) => {
    return post('/api/user/change/consult.json', params);
};

/**
 * 离职征询
 * @param {Object} params
 */
export const _leaveConsult = (params = {}) => {
    return post('/api/user/leave/consult.json', params);
};

/**
 * 录用审批征询
 * @param {Object} params
 */
export const _entryConsult = (params = {}) => {
    return post('/api/entry/consult.json', params);
};

/**
 * 合同回复征询
 * @param {Object} params
 */
export const _contractReplyConsult = (params = {}) => {
    return post('/api/contract/warning/replyConsult.json', params);
};

/**
 * 流程回复征询
 * @param {Object} params
 */
export const _progressReplyConsult = (params = {}) => {
    return post('/api/process/center/replyConsult.json', params);
};

/**
 * offer流程回复征询
 * @param {Object} params
 */
export const _replyConsultOffer = (params = {}) => {
    return post('/api/offer/admin/replyConsultOffer.json', params);
};

/**
 * 获取审批流程数据
 * @param {Object} params
 */
export const _contractAuditProgress = (params = {}) => {
    return post('/api/process/center/getAuditProgress.json', params);
};

// export const _getAuditListByProcessInstanceId = (params = {}) => {
//     return  post('/api/process/center/getAuditListByProcessInstanceId.json', params);
// }

/**
* offer获取审批流程数据
* @param {Object} params
*/
export const _getAuditProgress = (params = {}) => {
    return get('/api/offer/getAuditProgress.json', params);
};

/**
 * 获取审批流程列表
 * @param {Object} params 
 */
export const _getAuditList = (params = {}) => {
    return post('/api/process/center/dataList.json', params);
};
/**
 * 获取审批类型列表
 * @param {Object} params 
 */
export const _getTypeList = (params = {}) => {
    return get('/api/process/center/typeList.json', params);
};

/**
 * 获取续签合同审批详情
 * @param {Object} params 
 */
export const _contractAuditDetail = (params = {}) => {
    return post(`/api/contract/warning/getAuditDetail.json?processInstanceId=${params.processInstanceId}`);
};

/**
 * 获取当前节点的审批进度
 * @param {Object} params
 */
export const _contractCurrentAudit = (params = {}) => {
    return post('/api/process/center/currentAudit.json', params);
};

/**
 * 获取详情页操作权限
 * @param {Object} params 
 */
export const _dataPrivilege = (params = {}) => {
    return get('/api/process/center/dataPrivilege.json', params);
};

/**
 * offer流程的征询
 * @param {Object} params
 */
export const _consultOffer = (params = {}) => {
    return post('/api/offer/admin/consultOffer.json', params);
};

/**
 * 审批保存薪酬数据
 * @param {Object} params
 */
export const _updateOfferSalary = (params = {}) => {
    return post('/api/offer/admin/updateOfferSalary.json', encrypt(params));
};

/**
 * 获取审批状态
 * @param {Object} params
 */
export const _getStatusList = (params = {}) => {
    return get('/api/process/center/statusList.json', params);
};


/**
 * 获取审批中心列表
 * @param {Object} params
 */
export const _getAdminDataList = (params = {}) => {
    return post('/api/process/center/admin/dataList.json', params);
};

/**
 * 获取上一个或下一个审批流程id
 * @param {Object} params
 */
export const _getPageTurnList = (params = {}) => {
    return post('/api/process/center/pageTurnList.json', params);
};

/**
 * 批量职级调整征询
 * @param {Object} params
 */
export const _batchSeqconsult = (params = {}) => {
    return post('/api/user/change/batch/batchSeqconsult.json', params);
};

/**
 * 批量异动征询
 * @param {Object} params
 */
export const _batchUserconsult = (params = {}) => {
    return post('/api/user/change/batch/batchUserconsult.json', params);
};

/**
 * 通过审批流程id获取审批详情
 * @param {Object} params
 */
export const _getDetailByProcessInstanceId = (params = {}) => {
    return get('/api/process/center/getDetailByProcessInstanceId.json', params);
};

/**
 * 通过审批流程id获取管理员审批详情
 * @param {Object} params
 */
export const _getAdminDetailByProcessInstanceId = (params = {}) => {
    return get('/api/process/center/getDetailByProcessInstanceId/admin.json', params);
};

/**
 * 流程信息
 * @param {Object} params
 */
export const _getProcessInstanceInfo = (params = {}) => {
    return get('/api/process/center/getProcessInstanceInfo.json', params);
};

/**
 * 流程信息
 * @param {Object} params
 */
export const _getAuditNodeStatusByProcessInstanceId = (params = {}) => {
    return get('/api/process/center/getAuditNodeStatusByProcessInstanceId.json', params);
};


/**
 * 配置动态审批人
 * @param {Object} params
 */
export const _principalSave = (params = {}) => {
    return post('/api/user/leave/principal/save.json', params);
};

/**
 * 待审批数量
 * @param {Object} params
 */
export const _getAuditCount = (params = {}) => {
    return get('/api/process/center/count.json', params);
};

/**
 * 获取审批提示
 * @param {Object} params
 */
export const _approveTips = (params = {}) => {
    return post('/api/process/center/approveTips.json', params);
};


/**
 * 合同预警保存 评价信息
 * @param {Object} params
 */
export const _contractWarningSaveAppraise = (params = {}) => {
    return post('/api/contract/warning/saveAppraise.json', params);
};

/**
 * 保存人员异动类型
 * @param {Object} params
 */
export const _editChangeType = (params = {}) => {
    return post('/api/user/change/editChangeType.json', params);
};

/**
 * 批量保存人员异动类型
 * @param {Object} params
 */
export const _batchEditChangeType = (params = {}) => {
    return post('/api/user/change/batch/editChangeType.json', params);
};

// 查阅全部
export const _viewAll = (params = {}) => {
    return post('/api/process/center/viewAll.json', params);
};

// 【4.5.21】审批保存背调信息
export const _updateOfferBackCheckInfo = (params = {}) => {
    return post('/api/offer/admin/updateOfferBackCheckInfo.json', encrypt(params));
};

// 保存请假附件
export const _uploadApplyFile = (params = {}) => {
    return post('/api/apply/uploadFile.json', params);
};

// 备注说明
export const _updateRemark = (params = {}) => {
    return post('/api/user/leave/updateRemark.json', params);
};

// 更新回收状态
export const _updateRecycleState = (params = {}) => {
    return post('/api/user/leave/updateRecycleState.json', params);
};

// 审批取回操作
export const _auditFetchBack = (params = {}) => {
    return post('/api/process/center/fetchBack.json', params);
};
