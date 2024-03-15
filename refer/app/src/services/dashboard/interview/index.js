import { get, post } from '@/services/http';
const formHeader =  {'Content-Type': 'application/x-www-form-urlencoded'};

/////访谈工单
// 列表
export const _interviewerList = (params = {}) => {
    return get('/api/interview/admin/get/interviewList.json', params);
};
// 新增-管理员
export const _interviewAminAdd = (params = {}) => {
    return post('/api/interview/admin/add/interview.json', params);
};
// 创建工单-获取被访谈人信息（离职、在职）
export const _intervieweeInfo = (params = {}) => {
    return get('/api/interview/user/get/intervieweeInfo.json', params);
};
// 更新访谈负责人
export const _interviewerUpdate = (params = {}) => {
    return post('/api/interview/admin/update/interviewer.json', params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
// 自动获取访谈负责人
export const _interviewerGet = (params = {}) => {
    return post('/api/interview/admin/dispatch/interviewer.json', params);
};
// 处理
export const _interviewerAdminDeal = (params = {}) => {
    return post('/api/interview/admin/handle/result.json', params);
};

// 我的工单
// 处理
export const _interviewerDeal = (params = {}) => {
    return post('/api/interview/user/handle/result.json', params);
};
// 列表
export const _myInterviewerList = (params = {}) => {
    return get('/api/interview/user/get/MyinterviewList.json', params);
};
// 新增-访谈负责人
export const _interviewUserAdd = (params = {}) => {
    return post('/api/interview/user/add/interview.json', params);
};
// 访谈人设置
export const _interviewSet = (params = {}) => {
    return post('/api/interview/user/add/interviewee.json', params);
};
// 邮件提醒-模板列表
export const _interviewEmailTempList = (params = {}) => {
    return get('/api/interview/template/option.json', params);
};
// 邮件提醒-模板信息
export const _interviewEmailTempInfo = (params = {}) => {
    return get('/api/interview/template/choose.json', params);
};
// 邮件提醒-发送
export const _interviewEmailSend = (id,params = {}) => {
    return post(`/api/interview/template/send.json?id=${id}`, params);
};
// 超期工单列表-我的工单
export const _interviewUserDelayList = (params = {}) => {
    return get('/api/interview/user/get/delay/interviewList.json', params);
};
// 超期工单列表-管理员
export const _interviewAminDelayList = (params = {}) => {
    return get('/api/interview/admin/get/delay/interviewList.json', params);
};




// 工单详情
export const _interviewerDetail = (params = {}) => {
    return get('/api/interview/user/get/detailInfo.json', params);
};

//邮件模版列表
export const _templateList = (params = {}) => {
    return get('/api/interview/template/list.json', params);
};
//选择模版后获取模版信息
export const _templateOption = (params = {}) => {
    return get('/api/interview/template/option.json', params);
};
//新增邮件模版
export const _templateAdd = (params = {}) => {
    return post('/api/interview/template/add.json', params);
};
//删除邮件模版
export const _templateDelete = (params = {}) => {
    return get('/api/interview/template/delete.json', params);
};
//编辑邮件模版
export const _templateUpdate = (params = {}) => {
    return post('/api/interview/template/update.json', params);
};




/////// 2.0
// 获取模板列表
export const _interviewerTempList = (params = {}) => {
    return get('/api/interview/admin/getFormList.json', params);
};
// 获取模板详情
export const _interviewerTempDetail = (params = {}) => {
    return get('/api/interview/admin/getFormDetail.json', params);
};
// 更新模板
export const _interviewerTempUpdate = (params = {}) => {
    return post('/api/interview/admin/addOrUpdateForm.json', params);
};
// 获取员工字段信息
export const _interviewUserFields = (params = {}) => {
    return get('/api/interview/admin/getUserFields.json', params);
};
// 保存报告
export const _interviewSaveEvaluate = (params = {}) => {
    return post('/api/interview/evaluate/user/saveEvaluate.json', params);
};
// 获取模报告详情
export const _interviewerReportDetail = (params = {}) => {
    return get('/api/interview/evaluate/user/getEvaluate.json', params);
};
// 获取被访谈人角色信息
export const _interviewerRealation = (params = {}) => {
    return get('/api/interview/user/getInterviewerRealation.json', params);
};
// 报告 获取系统字段值
export const _interviewerReportValue = (params = {}) => {
    return get('/api/interview/user/getFieldValues.json', params);
};
// 报告 同步访谈模板
export const _syncInterviewReport = (params = {}) => {
    return get('/api/interview/user/syncInterviewReport.json', params);
};


// 访谈工单 访谈报告邮件
// 获取访谈报告邮件详情
export const _interviewReportEmail = (params = {}) => {
    return post('/api/interview/user/selectReportEmail.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
// 访谈报告邮件 审批
export const _interviewApproveReport = (params = {}) => {
    return post('/api/interview/user/approveReport.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
// 访谈报告邮件 修改
export const _interviewUpdateReportEmail = (params = {}) => {
    return post('/api/interview/user/updateReportEmail.json', params);
};

// 导出访谈报告
export const _exportInterviewReportList = (params = {}) => {
    return get('/api/interview/admin/get/exportInterviewReportList.json', params);
};


// 发送访谈报告邮件
export const _interviewSendEvaluate = (params = {}) => {
    return post('/api/interview/user/send/evaluate.json', params);
};

// 访谈报告-获取被访谈人收件人, 发送人信息
export const _getReceiverAndCopyUser = (params = {}) => {
    return get('/api/interview/evaluate/user/getReceiverAndCopyUser.json', params);
};


/**
 * 访谈3.0
 *  */

//  根据流程id获取访谈详情
export const _getInterviewProcessInfo = (params = {}) => {
    return get('/api/interview/user/process/getInterviewProcessInfo.json', params);
};
// 访谈报告-完成访谈报告
export const _interviewHandleComplete = (params = {}) => {
    return post('/api/interview/user/handle/complete.json', params);
};
// 访谈报告-提交审批
export const _interviewHandleSubmit = (params = {}) => {
    return post('/api/interview/user/submitInterview.json', params, {headers: formHeader});
};
// 访谈报告-评估意见默认日期
export const _interviewEvaluateDate = (params = {}) => {
    return get('/api/interview/user/getEvaluateDate.json', params);
};

// 访谈模板-获取报告模板表
export const _getTemplateList = (params = {}) => {
    return get('/api/interview/template/config/list.json', params);
};

// 访谈模板-获取报告模板排序列表
export const _getTemplateSortList = (params = {}) => {
    return get('/api/interview/template/config/sortList.json', params);
};

//访谈模板-添加/编辑
export const _addTemplate = (params = {}) => {
    if (params.id) {
        return post('/api/interview/template/config/addOrUpdate.json', params, {quiet:true});
    } else {
        return post('/api/interview/template/config/addOrUpdate.json', params, {quiet:true});
    }
};

// 访谈模板-排序
export const _moveTemplate = (params = {}) => {
    return post('/api/interview/template/config/sort.json', params);
};

// 访谈模板-导出
export const _exportTemplate = (params = {}) => {
    return get('/api/interview/template/config/export.json', params);
};
// 访谈模板-删除
export const _deleteTemplate = (params = {}) => {
    return get('/api/interview/template/config/delete.json', params);
};

// 访谈模板-启用停用
export const _switchTemplate = (params = {}) => {
    if (!params.status) {
        return get('/api/interview/template/config/enable.json', {id: params.id});
    } else {
        return get('/api/interview/template/config/disable.json', {id: params.id});
    }
};

// 访谈模板-复制
export const _copyTemplate = (params = {}) => {
    return post('/api/interview/template/config/copy.json', params, {quiet:true});
};

// 关联数据-查询
export const _queryFormDataList = (params = {}) => {
    return get(`/api/form/dataRelation/list.json`, params);
};

// 关联数据-添加/编辑
export const _addInterviewRelation = (params = {}) => {
    if (params.strId) {
        return post('/api/form/dataRelation/modify.json', params);
    } else {
        return post('/api/form/dataRelation/addFormRelation.json', params);
    }
};

//关联数据-对象下拉
export const _getInterviewRelationGroupVOList = (params = {}) => {
    return get(`/api/form/dataRelation/getFormRelationGroupVOList.json`, params);
};

// 关联数据-删除
export const _deleteInterviewRelation = (params = {}) => {
    return post('/api/form/dataRelation/delete.json', params);
};

// 关联数据-排序
export const _moveInterviewRelation = (params = {}) => {
    return post('/api/form/dataRelation/sort.json', params);
};


// 套件列表
export const _getInterviewTemplateKitList = (params = {}) => {
    return get(`/api/interview/template/config/kit/list.json`, params);
};

// 关联数据列表
export const _getInterviewTemplateRelationList = (params = {}) => {
    return get(`/api/form/dataRelation/queryFormDataList.json`, params);
};

// 数据过滤字段筛选
export const _getInterviewTemplateRelationFieldVOList = (params = {}) => {
    return get(`/api/form/dataRelation/getSysDynamicFieldVOList.json`, params);
};

// 模板配置详情显示
export const _getTemplateConfig = (params = {}) => {
    return get('/api/interview/template/config/detail.json', params);
};

// 派发规则-获取报告模板表
export const _getRuleList = (params = {}) => {
    return get('/api/interview/dispatch/list.json', params);
};

// 派发规则-获取报告模板排序列表
export const _getRuleSortList = (params = {}) => {
    return get('/api/interview/dispatch/list.json', params);
};

//派发规则-添加/编辑
export const _addRule = (params = {}) => {
    if (params.id) {
        return post('/api/interview/dispatch/addOrUpdate.json', params, {quiet:true});
    } else {
        return post('/api/interview/dispatch/addOrUpdate.json', params, {quiet:true});
    }
};

// 派发规则-排序
export const _moveRule = (params = {}) => {
    return post('/api/interview/dispatch/sort.json', params);
};

// 派发规则-删除
export const _deleteRule = (params = {}) => {
    return post('/api/interview/dispatch/delete.json', params);
};

// 派发规则-启用停用
export const _switchRule = (params = {}) => {
    if (!params.status) {
        return get('/api/interview/dispatch/enable.json', {id: params.id});
    } else {
        return get('/api/interview/dispatch/disable.json', {id: params.id});
    }
};

// 派发规则-复制
export const _copyRule = (params = {}) => {
    return get('/api/interview/dispatch/copy.json', params, {quiet:true});
};

// 模板配置详情显示
export const _getInterviewRelationData = (params = {}) => {
    return get('/api/interview/user/getInterviewRelationData.json', params);
};

// 访谈套件数据查询V4.31
export const _interviewUserKitData = (params = {}) => {
    return get('/api/interview/user/kit/data.json', params);
};

