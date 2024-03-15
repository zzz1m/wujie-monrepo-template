import { get, post } from '@/services/http';
const headerConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// 晋级人员列表
export const _promotionUserPageList = (params = {}) => {
    return post('/api/talent/promotion/user/pageList.json', params);
};
// 下拉列表
export const _planSelectDropdownList = (params = {}) => {
    return get('/api/talent/promotion/plan/selectDropdownList.json', params);
};

// 创建方案
export const _addPromotionPlan = (params = {}) => {
    return post('/api/talent/promotion/plan/addPromotionPlan.json', params);
};

// 编辑方案
export const _updatePromotionPlan = (params = {}) => {
    return post('/api/talent/promotion/plan/updatePromotionPlan.json', params);
};

// 根据id查询方案
export const _getPromotionPlanById = (params = {}) => {
    return get('/api/talent/promotion/plan/getPromotionPlanById.json', params);
};

// 晋级报名-人员列表（部门负责人查看）
export const _getPromotionApplyList = (params = {}) => {
    return post('/api/talent/promotion/apply/list.json', params);
};


// 完成方案
export const _completePromotionPlan = (params = {}) => {
    return post('/api/talent/promotion/plan/completePromotionPlan.json', params, headerConfig);
};
// 列表查询
export const _getPlanPageList = (params = {}) => {
    return post('/api/talent/promotion/plan/pageList.json', params);
};
// 删除方案
export const _deletePromotionPlan = (params = {}) => {
    return post('/api/talent/promotion/plan/deletePromotionPlan.json', params, headerConfig);
};
// 编辑评估模板
export const _updatePromotionEvaluateTemplate = (params = {}) => {
    return post('/api/talent/promotion/plan/updatePromotionEvaluateTemplate.json', params);
};

// 晋级报名-方案列表
export const _getApplyPageList = (params = {}) => {
    return post('/api/talent/promotion/apply/getPlanList.json', params);
};

// 晋级报名-人员列表
export const _getApplyPageListUser = (params = {}) => {
    return post('/api/talent/promotion/apply/pageList.json', params);
};

// 晋级报名-详情查询
export const _getPromotionApplyById = (params = {}) => {
    return post('/api/talent/promotion/apply/getPromotionApplyById.json', params, headerConfig);
};

// 晋级报名-更新报名
export const _updatePromotionApply = (params = {}) => {
    return post('/api/talent/promotion/apply/updatePromotionApply.json', params);
};
// 添加报名
export const _addPromotionApply = (params = {}) => {
    return post('/api/talent/promotion/apply/addPromotionApply.json', params);
};

// 取消报名
export const _cancelPromotionApply = (params = {}) => {
    return post('/api/talent/promotion/apply/cancelPromotionApply.json?opSource=apply', params, headerConfig);
};

// 报名人员基本信息
export const _getPromotionApplyUser = (params = {}) => {
    return get('/api/talent/promotion/apply/getPromotionApplyUser.json', params);
};

// 报名人员管理-分页查询
export const _getApplyManagePageList = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/pageList.json', params);
};
//报名人员管理-审核列表
export const _getApplyManagePageListApprove = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/approvePageList.json', params);
};
// 报名人员管理-导出
// export const _exportUserManageTab = (params = {}) => {
//     return post('/api/talent/promotion/apply_manage/exportUserManageTab.json', params, { export: true });
// };
// 报名人员管理-发送报名结果
export const _sendApplyResult = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/sendApplyResult.json', params);
};
// 安排答辩
export const _arrangeReply = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/arrangeReply.json', params);
};
// 报名人员管理-发送安排答辩结果
export const _sendArrangeReplyResult = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/sendArrangeReplyResult.json', params);
};
// 报名人员管理-更新审核结果
export const _updateApproveResult = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/updateApproveResult.json', params);
};

// 获取方案列表
export const _groupGetPlanList = (params = {}) => {
    return post('/api/talent/promotion/group/getPlanList.json', params);
};

// 获取方案列表
export const _groupGetUserPlanList = (params = {}) => {
    return post('/api/talent/promotion/user/getPlanList.json', params);
};

// 晋级方案列表
export const _promotionPlanPageList = (params = {}) => {
    return post('/api/talent/promotion/plan/pageList.json', params);
};

// 编辑晋升结果
export const _editPromotionResult = (params = {}) => {
    return post('/api/talent/promotion/user/editPromotionResult.json', params);
};

// 晋级人员列表
export const _promotionGetGroupList = (params = {}) => {
    return post('/api/talent/promotion/evaluate/getGroupList.json', params);
};

// 获取评估详情
export const _promotionGetEvaluate = (params = {}) => {
    return get('/api/talent/promotion/evaluate/getEvaluate.json', params);
};

// 保存评估结果
export const _promotionSaveEvaluate = (params = {}) => {
    return post('/api/talent/promotion/evaluate/saveEvaluate.json', params);
};

// 报名人员管理-分页查询
export const _promotionApplyManagePageList = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/pageList.json', params);
};

// 晋级人员列表
export const _promotionApplyPageList = (params = {}) => {
    return post('/api/talent/promotion/apply/pageList.json', params);
};

// 晋级跟组列表
export const _promotionFollowGroupList = (params = {}) => {
    return post('/api/talent/promotion/follow/getGroupList.json', params);
};

// 答辩材料上传列表
export const _myPromotionApplyList = (params = {}) => {
    return get('/api/talent/promotion/my/myPromotionApplyList.json', params);
};
// 上传答辩材料
export const _uploadFile = (params = {}) => {
    return post('/api/talent/promotion/my/upload.json', params);
};

// 获取评委评估列表
export const _followGetJudgeEvaluateList = (params = {}, isAdmin) => {
    const url = isAdmin ? '/api/talent/promotion/user/getJudgeEvaluateList.json' : '/api/talent/promotion/follow/getJudgeEvaluateList.json';
    return get(url, params);
};
// 获取评委评估进度
export const _getJudgeEvaluateProcess = (params = {}) => {
    return get('/api/talent/promotion/user/getJudgeEvaluateProcess.json', params);
};

// 获取HR评估
export const _followGetHrEvaluateDetail = (params = {}, isAdmin) => {
    const url = isAdmin ? ' /api/talent/promotion/user/getHrEvaluateDetail.json' : '/api/talent/promotion/follow/getHrEvaluateDetail.json';
    return get(url, params);
};

// 获取关联数据
export const _getRelationData = (params = {}) => {
    return get('/api/promotion/evaluate/getRelationData.json', params);
};

// 获取表头
export const _getEvaluateHeader = (params = {}) => {
    return get('/api/talent/promotion/user/getEvaluateHeader.json', params);
};

// 获取分组人员列表
export const _followGetApplyList = (params = {}) => {
    return post('/api/talent/promotion/follow/getApplyList.json', params);
};
// 分页查询分组
export const _groupPageList = (params = {}) => {
    return post('/api/talent/promotion/group/pageList.json', params);
};
// 获取分组人员统计
export const _getUserCount = (params = {}) => {
    return get('/api/talent/promotion/group/getUserCount.json', params);
};
// 查询有权限的用户信息
export const _getSubUserList = (params = {}) => {
    return get('/api/user/getSubUserList.json', params);
};
// 添加分
export const _addGroup = (params = {}) => {
    return post('/api/talent/promotion/group/addGroup.json', params);
};
export const _sendJudgeArrange = (params = {}) => {
    return post('/api/talent/promotion/group/sendJudgeArrange.json', params);
};
export const _getGroupDetail = (params = {}) => {
    return get('/api/talent/promotion/group/getDetail.json', params, { quiet: true });
};
// 删除分组
export const _delGroup = (params = {}) => {
    return post('/api/talent/promotion/group/deleteGroup.json', params);
};
// 编辑分组
export const _editGroup = (params = {}) => {
    return post('/api/talent/promotion/group/updateGroup.json', params);
};

// 批量安排答辩
export const _batchArrangeReply = (params = {}) => {
    return post('/api/talent/promotion/apply_manage/batchArrangeReply.json', params);
};

// 保存时间粒度
export const _saveTimeInterval = (params = {}) => {
    return post('/api/talent/promotion/group/saveInterval.json', params);
};

// 保存时间粒度
export const _checkUserGroup = (params = {}) => {
    return post('/api/talent/promotion/group/checkUserGroup.json', params, { quiet: true });
};


// 添加分组
export const _sendAdvice = (params = {}) => {
    return post('/api/talent/promotion/user/sendAdvice.json', params);
};
// 方案是否被使用过
export const _isPlanUsed = (params = {}) => {
    return get('/api/talent/promotion/plan/isPlanUsed.json', params);
};
// 校验用户是否有评估信息
export const _checkUserEvaluate = (params = {}) => {
    return post('/api/talent/promotion/group/checkUserEvaluate.json', params);
};

// 保存HR评估列表
export const _saveHrEvaluateDetail = (params = {}) => {
    return post('/api/talent/promotion/user/saveHrEvaluateDetail.json', params);
};

// 获取晋级管理可视部门树
export const _findTalentDept = (params = {}) => {
    return get('/api/sys_dept/findTalentDept.json', params);
};