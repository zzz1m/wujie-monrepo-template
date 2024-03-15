import { get, post } from '@/services/http';

/**
 * 获取个人档案详情
 * @param {Object} params 
 */
export const getUserRecordInfo = (params = {}) => {
    return get('/api/sys/user_record/getUserRecordInfo.json', params);
};

/**
 * 更新用户头像
 * @param {Object} params 
 */
export const updateHeadImage = (params = {}) => {
    const { headImage } = params;
    return post(`/api/sys/user_record/updateHeadImage.json?headImage=${headImage}`, );
};

/**
 * 获取用户详细信息
 * @param {Object} params 
 */
export const getUserInfoDetail = (params = {}) => {
    return get('/api/user/getUserInfoDetail.json', params);
};

/**
 * 获取用户详细信息-管理层看板
 * @param {Object} params 
 */
export const getUserInfoDetailKanban = (params = {}) => {
    return get('/api/talentatlas/getUserInfoDetail.json', params);
};

/**
 * 新增员工
 * @param {Object} params 
 */
export const addUser = (params = {}) => {
    return post('/api/user/addUser.json', params);
};

/**
 * 编辑员工
 * @param {Object} params 
 */
export const editUser = (params = {}) => {
    return post('/api/user/editUser.json', params);
};

/**
 * 查询员工
 * @param {Object} params 
 */
export const searchUser = (params = {}) => {
    return post('/api/user/searchUser.json', params);
};

/**
 * 员工划转
 * @param {Object} params 
 */
export const _transferUser = (params = {}) => {
    return post('/api/user/transfer.json', params);
};

/**
 * 批量员工划转
 * @param {Object} params 
 */
export const _batchTransferUser = (params = {}) => {
    return post('/api/user/batchTransferUserInfo.json', params);
};

/**
 * 员工删除
 * @param {Object} params 
 */
export const _deleteUser = (params = {}) => {
    return post('/api/user/delete.json', params);
};

/**
 * 获取用户常用查询列表
 * @param {Object} params 
 */
export const _getRecentQueryList = (params = {}) => {
    return get('/api/user/getRecentQueryList.json', params);
};
/**
 * 删除用户常用查询接口
 * @param {Object} params 
 */
export const _deleteAdvanceQuery = (params = {}) => {
    return post('/api/user/deleteAdvanceQuery.json', params);
};
/**
 * 保存用户常用查询
 * @param {Object} params 
 */
export const _saveAdvanceQuery = (params = {}) => {
    return post('/api/user/saveAdvanceQuery.json', params);
};
/**
 * 员工搜索
 * @param {Object} params 
 */
export const _searchUser = (params = {}) => {
    return post('/api/user/searchUser.json', params);
};
/* 个人档案提交
 * 个人档案提交
 * @param {Object} params 
 */
export const submitUserRecord = (params = {}) => {
    return post('/api/sys/user_record/submitUserRecord.json', params);
};

/**
 * 员工查询获取下载文件key
 * @param {String} deptId 
 * @param {Object} params 
 */
export const _getExportUserKey = (params = {}) => {
    return post('/api/user/exportExcel.json', params);
};

/**
 * 员工管理获取下载文件key
 * @param {String} deptId 
 * @param {Object} params 
 */
export const _getManageExportUserKey = (params = {}) => {
    return post('/api/user/export/template.json', params);
};

/**
 * [员工管理]导出修改模板
 * @param {Object} params 
 */
export const _exportTemplateAlready = (params = {}) => {
    return post('/api/user/export/template/already.json', params);
};

/**
 * 根据用户获取字段权限
 * @param {Object} params 
 */
export const getFieldGroupByUser = (params = {}) => {
    return post('/api/sys/role/getFieldGroupByUser.json', params);
};

/**
 * 新增员工基本信息
 * @param {Object} params 
 */
export const addUserInfo = (params = {}) => {
    return post('/api/user/addUserInfo.json', params);
};

/**
 * 更新员工信息
 * @param {Object} params 
 */
export const updateUserInfo = (params = {}) => {
    return post('/api/user/updateUserInfo.json', params);
};

/**
 * 保存员工明细行
 * @param {Object} params 
 */
export const saveUserInfoModule = (params = {}) => {
    return post('/api/user/saveUserInfoModule.json', params);
};

/**
 * 删除员工明细行
 * @param {Object} params 
 */
export const deleteUserInfoModule = (params = {}) => {
    return post('/api/user/deleteUserInfoModule.json', params);
};

/**
 * 合同改动前校验
 * @param {Object} params 
 */
export const checkContractChange = (params = {}) => {
    return get('/api/user/checkContractChangePre.json', params);
};

/**
 * 批量更新用户信息
 * @param {Object} params 
 */
export const _batchUpdateUserInfo = (params = {}) => {
    return post('/api/user/batchUpdateUserInfo.json', params);
};

/**
 * 根据用户权限获取部门树
 * @param {Object} params 
 */
export const getDeptTreeByUser = (params = {}) => {
    return post('/api/sys/role/getDeptTreeByUser.json', params);
};

/**
 * 获取异动详情
 * @param {Object} params 
 */
export const _getChangeInfoByUser = (params = {}) => {
    return get('/api/user/change/applyInfo.json', params);
};
/**
 * 获取异动所有详情
 * @param {Object} params 
 */
export const _getChangeApprovalInfoByUser = (params = {}) => {
    return get('/api/user/change/approvalInfo.json', params);
};
/**
 * 提交异动信息
 * @param {Object} params 
 */
export const _saveChangeInfoApproval = (params = {}) => {
    return post('/api/user/change/approval.json', params);
};
/**
 * 重新提交异动信息
 * @param {Object} params 
 */
export const _saveChangeReapproval = (params = {}) => {
    return post('/api/user/change/reapproval.json', params);
};
/**
 * 获取员工离职详情
 * @param {Object} params
 */
export const _getLeaveProgressByUser = (params = {}) => {
    return get('/api/user/leave/info.json', params);
};

/**
 * 获取真实离职类型
 * @param {Object} params
 */
export const _getActualLeaveTypeList = (params = {}) => {
    return get('/api/common/dict/get/actual_leave_type/list.json', params);
};
/**
 * 获取折算天数
 * @param {Object} params
 */
export const _getConvertDay = (params = {}) => {
    return get('/api/user/leave/getConvertDay.json', params);
};
/**
 * 提交离职申请
 * @param {Object} params
 */
export const _leaveSubmit = (params = {}) => {
    return post('/api/user/leave/submit.json', params);
};

/**
 * 根据名称精确查找部门
 * @param {Object} params
 */
export const _findDeptByName = (params = {}) => {
    return post('/api/dept/findDeptByName.json', params);
};

/**
 * 获取人员基本和职位信息详情
 * @param {Object} params
 */
export const _getDynamicInfoBeforeAdd = (params = {}) => {
    return get('/api/user/dynamicInfoBeforeAdd.json', params);
};

/**
 * 根据按人员查询部门
 * @param {Object} params
 */
export const _getUserByName = (params = {}) => {
    return post('/api/user/change/batch/getUserByName.json', params);
};

/**
 * 批量异动提交
 * @param {Object} params
 */
export const _batchApprovalUser = (params = {}) => {
    return post('/api/user/change/batch/batchApprovalUser.json', params);
};

/**
 * 批量异动重新发起
 * @param {Object} params
 */
export const _reBatchApprovalUser = (params = {}) => {
    return post('/api/user/change/batch/reBatchApprovalUser.json', params);
};


/**
 * 根据部门获取人员
 * @param {Object} params
 */
export const _getUsersByDept = (params = {}) => {
    return post('/api/user/change/batch/getUsersByDept.json', params);
};

/**
 * 提交批量职级调整审批
 * @param {Object} params
 */
export const _batchApprovalSeq = (params = {}) => {
    return post('/api/user/change/batch/batchApprovalSeq.json', params);
};

/**
 * 批量职级调整重新发起
 * @param {Object} params
 */
export const _reBatchApprovalSeq = (params = {}) => {
    return post('/api/user/change/batch/reBatchApprovalSeq.json', params);
};


/**
 * [个人档案]获取验证码
 * @param {Object} params
 */
export const _getCode = (params = {}) => {
    return get('/api/sys/user_record/getCode.json', params);
};

/**
 * [个人档案]修改手机号
 * @param {Object} params
 */
export const _modifyMobile = (params = {}) => {
    return get('/api/sys/user_record/modifyMobile.json', params);
};

/**
 * 根据审批id获取职级审批详情
 * @param {Object} params
 */
export const _getBatchSeqApprovalInfo = (params = {}, admin) => {
    return get(`/api/user/change${admin ? '/admin' : '/batch'}/getBatchSeqApprovalInfo.json`, params);
};

/**
 * [个人档案]徽章点亮提醒
 * @param {Object} params
 */
export const _hasLightingBadge = (params = {}) => {
    return get('/api/sys/user_record/hasLightingBadge.json', params);
};

/**
 * [个人档案]徽章列表
 * @param {Object} params
 */
export const _getUserInfoBadgeList = (params = {}) => {
    return get('/api/sys/user_record/getUserInfoBadgeList.json', params);
};

/**
 * [个人档案]徽章点亮
 * @param {Object} params
 */
export const _lightBadge = (params = {}) => {
    return post('/api/sys/user_record/lightBadge.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

/**
 * [同袍档案]查询相关类型
 * @param {Object} params
 */
export const _associationType = (params = {}) => {
    return get('/api/user/brother/associationType.json', params);
};

/**
 * [同袍档案]删除附件
 * @param {Object} params
 */
export const _deleteAttachment = (params = {}) => {
    return post('/api/user/brother/deleteAttachment.json', params);
};

/**
 * [同袍档案]访谈删除
 * @param {Object} params
 */
export const _deleteInterview = (params = {}) => {
    return post('/api/user/brother/deleteInterview.json', params);
};

/**
 * [同袍档案]保存访谈附件
 * @param {Object} params
 */
export const _saveInterviewFile = (params = {}) => {
    return post('/api/user/brother/saveInterviewFile.json', params);
};

/**
 * [同袍档案]保存附件
 * @param {Object} params
 */
export const _saveAttachmentFile = (params = {}) => {
    return post('/api/user/brother/saveAttachmentFile.json', params);
};

/**
 * [同袍档案]附件批量下载检查
 * @param {Object} params
 */
export const _downloadInBulkCheck = (params = {}) => {
    return get('/api/user/brother/downloadInBulkCheck.json', params);
};

/**
 * 员工管理批量异动、批量职级调整所选人员提示
 * @param {Object} params
 */
export const _sameWorkPlace = (params = {}) => {
    return post('/api/user/sameCityManagerCheck.json', params);
};

/**
 * 【人员实习信息】获取人员申请表单信息
 * @param {Object} params
 */
export const _internshipApprovalInfo = (params = {}) => {
    return get('/api/user/internship/approvalInfo.json', params);
};

/**
 * 【人员实习信息】提交审批
 * @param {Object} params
 */
export const _internshipSubmitApproval = (params = {}) => {
    return post('/api/user/internship/submitApproval.json', params);
};
/*
 * 信息核查-人员列表
 * @param {Object} params
 */
export const _checkList = (params = {}) => {
    return get('/api/user/check/list.json', params);
};

/**
 * 信息核查-人员详情
 * @param {Object} params
 */
export const _checkDetail = (params = {}) => {
    return get('/api/user/check/detail.json', params);
};

/**
 * 信息核查-教育经历保存
 * @param {Object} params
 */
export const _checkEduSave = (params = {}) => {
    return post('/api/user/check/editEdu.json', params);
};

/**
 * 信息核查-教育经历删除
 * @param {Object} params
 */
export const _deleteEdu = (params = {}) => {
    return get('/api/user/check/deleteEdu.json', params);
};

/**
 * 信息核查-工作经历保存
 * @param {Object} params
 */
export const _checkWorkSave = (params = {}) => {
    return post('/api/user/check/editWork.json', params);
};

/**
 * 信息核查-工作经历删除
 * @param {Object} params
 */
export const _deleteWork = (params = {}) => {
    return get('/api/user/check/deleteWork.json', params);
};

/**
 * 信息核查-完成
 * @param {Object} params
 */
export const _checkFinish = (params = {}) => {
    return get('/api/user/check/finish.json', params);
};

/**
 * 计算异动类型及异动变化结果
 * @param {Object} params
 */
export const _getChangeResult = (params = {}) => {
    return post('/api/user/change/getResult.json', params);
};

/**
 * 【员工详情】岗位胜任力-详情
 * @param {Object} params
 */
export const _competenceResult = (params = {}) => {
    return get('/api/user/competence/result.json', params);
};


/**
 * 【员工详情】岗位胜任力-编辑结果
 * @param {Object} params
 */
export const _competenceEdit = (params = {}) => {
    return post('/api/user/competence/edit.json', params);
};

/**
 * 【员工详情】获取标准岗位
 * @param {Object} params
 */
export const _positionList = (params = {}) => {
    return get('/api/user/competence/positionList.json', params);
};

/**
 * 【员工详情】获取职级
 * @param {Object} params
 */
export const _seqLevel = (params = {}) => {
    return get('/api/user/competence/seqLevel.json', params);
};

/**
 * 【员工详情】获取人员职级和岗位信息
 * @param {Object} params
 */
export const _competenceUserInfo = (params = {}) => {
    return get('/api/user/competence/userInfo.json', params);
};

/**
 * 【员工详情】获取人员职级和岗位信息
 * @param {Object} params
 */
export const _competenceList = (params = {}) => {
    return get('/api/user/competence/list.json', params);
};


/**
 * 【员工详情】获取工作地列表
 * @param {Object} params
 */
export const _addressList = (params = {}) => {
    return get('/api/user/address/list.json', params);
};

/**
 * 【员工详情】获取工作地列表
 * @param {Object} params
 */
export const _checkAddressList = (params = {}) => {
    return get('/api/user/address/list.json', params, {
        quiet: true
    });
};

/**
 * 根据地址输入搜索相关地点
 * @param {Object} params
 */
export const _dropdownSearch = (params = {}) => {
    return get('/api/user/address/dropdownSearch.json', params);
};


/*
 * [员工查询]校验用户常用查询名称
 * @param {Object} params
 */
export const _checkAdvanceQuery = (params = {}) => {
    return post('/api/user/checkAdvanceQuery.json', params);
};

/*
 * 【人员实习信息】获取转正offer
 * @param {Object} params
 */
export const _getUserOfferInfo = (params = {}) => {
    return get('/api/user/internship/getUserOfferInfo.json', params);
};

// 离职列表
export const _getLeaveList = (params = {}) => {
    return get('/api/user/leave/list.json', params);
};

// 离职资料列表
export const _getLeaveDocList = (params = {}) => {
    return post('/api/user/leave/docList.json', params);
};

// 系统列表
export const _getSystemList = (params = {}) => {
    return get('/api/user/leave/systemList.json', params);
};


// 离职详情
export const _leaveDetail = (params = {}) => {
    return get('/api/user/leave/detail.json', params);
};

