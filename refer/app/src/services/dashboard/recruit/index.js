import { get, post } from '@/services/http';
import axios from 'axios';
import qs from 'qs';
const headerConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// 【招聘面试】列表
export const _interviewList = (params = {}) => {
    return post('/api/recruit/interview/listPage.json', params);
};

// 【招聘过程】日程安排
export const _getUserSchedule = (params = {}) => {
    return get('/api/recruit/interview/getUserSchedule.json', params);
};

// 【同事推荐】列表查询
export const _recommendList = (params = {}) => {
    return get('/api/recruit/recommend/pageList.json', params);
};

// 【招聘过程】加入候选
export const _addCandidate = (params = {}) => {
    return post('/api/recruit/candidate/joinCandidate.json', params);
};

// 【招聘面试】我的面试列表
export const _myInterviewList = (params = {}) => {
    return post('/api/recruit/interview/myList.json', params);
};

// 【人才】查询
export const _checkExist = (params = {}) => {
    return post('/api/recruit/candidate/checkExist.json', params);
};

// 【招聘面试】取消签到
export const _interviewCancel = (params = {}) => {
    return post('/api/recruit/interview/cancel.json', params);
};

// 【人才库】下载简历
export const _downloadResume = (params = {}) => {
    return get('/api/recruit/candidate/downloadResume.json', params);
};

// 【人才库】列表
export const _candidateListPage = (params = {}) => {
    return post('/api/recruit/candidate/listPage.json', params);
};

// 【面试管理】修改面试结果
export const _updateInterviewResult = (params = {}) => {
    return post('/api/recruit/interview/updateInterviewResult.json', params);
};
// 【我的评估】评估列表
export const _evaluateListPage = (params = {}) => {
    return post('/api/recruit/evaluate/listPage.json', params);
};

// 招聘职位-职位列表
export const _positionList = (params = {}) => {
    return post('/api/recruit/job/inner/list.json', params);
};

// 招聘职位-新增职位
export const _addPosition = (params = {}) => {
    return post('/api/recruit/job/inner/add.json', params);
};

// 招聘职位-职位详情
export const _positionDetail = (params = {}) => {
    return post('/api/recruit/job/inner/detail.json', params);
};

// 招聘职位-更新职位
export const _updatePosition= (params = {}) => {
    return post('/api/recruit/job/inner/update.json', params);
};

// 招聘职位-删除职位
export const _deletePosition = (params = {}) => {
    return post('/api/recruit/job/inner/delete.json', params);
};

// 招聘职位-职位下拉列表
export const _selectList = (params = {}) => {
    return post('/api/recruit/job/select/list.json', params);
};

// 招聘中-列表
export const _listPage = (params = {}) => {
    return post('/api/recruit/filter/listPage.json', params);
};

// 招聘中-候选人搜索
export const _findCandidate = (params = {}) => {
    return post('/api/recruit/filter/findCandidate.json', params);
};

// 人才库是否锁定的判断
export const _isLocked = (params = {}) => {
    return get('/api/recruit/candidate/checkLockByCandidate.json', params);
};

// 流程中是否锁定的判断
export const _isProcessLocked = (params = {}) => {
    return post('/api/recruit/filter/checkLocked.json', params);
};

// 安排评估
export const _arrangeEvaluate = (params = {}) => {
    return post('/api/recruit/evaluate/arrangeEvaluate.json', params);
};

//简历详情页来源区分
export const _queryResumeDetail = (params = {}, opSource) => {
    if (['candidate', 'candidate_activation_log'].includes(opSource)) { // 候选人
        return get('/api/recruit/candidate/getCandidateDetailInfo.json', params);
    } else if(opSource === 'talentPool') { // 人才库
        return get('/api/recruit/interview/getInterviewRecordDetailByCandidateId.json', params);
    } else {
        return get('/api/recruit/filter/getProcessDetailInfo.json', params);
    }
};

// 推荐给同事
export const _recommendWorkmate = (params = {}) => {
    return post('/api/recruit/recommend/recommendWorkmate.json', params);
};

//【简历筛选】筛选通过
export const _accept = (params = {}) => {
    return post('/api/recruit/filter/accept.json', params);
};

//【简历筛选】筛选淘汰
export const _reject = (params = {}) => {
    return post('/api/recruit/filter/reject.json', params);
};

// 简历解析
export const _resumeAnalysis = (params = {}) => {
    return post('/api/recruit/resume/analysis.json', params);
};

// 添加候选人
export const _addCandidatePerson = (params = {}) => {
    return post('/api/recruit/candidate/add.json', params);
};

// 添加候选人-职位查找
export const _jobFindPosition = (params = {}) => {
    return post('/api/recruit/job/findPosition.json', params);
};

// 添加协作人
export const _addCooperation = (params = {}) => {
    return post('/api/recruit/filter/addCooperation.json', params);
};

// 修改协作人
export const _updateCooperation = (params = {}) => {
    return post('/api/recruit/filter/updateCooperation.json', params);
};

// 安排面试
export const _arrangeInterview = (params = {}) => {
    return post('/api/recruit/interview/arrangeInterview.json', params);
};

// 变更面试安排
export const _changeInterview = (params = {}) => {
    return post('/api/recruit/interview/change.json', params);
};

// 查询日程是否冲突
export const _isScheduleConflict = (params = {}) => {
    return get('/api/recruit/interview/isScheduleConflict.json', params);
};

// 【人才库】人员查找
export const _candidatefindCandidate = (params = {}) => {
    return post('/api/recruit/candidate/findCandidate.json', params);
};

// 【招聘过程】更改候选人状态
export const _changeProcedureStatus = (params = {}) => {
    return post('/api/recruit/filter/changeProcedureStatus.json', params);
};

// 【已淘汰】恢复流程
export const _recoverRejectedRecruit = (params = {}) => {
    return post('/api/recruit/filter/recoverRejectedRecruit.json', params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 获取签到详情
export const _getInterviewById = (params = {}) => {
    return post('/api/recruit/interview/getInterviewById.json', params);
};
// 面试安排回显
export const _getInterviewByProcessId = (params = {}) => {
    return get('/api/recruit/interview/getInterviewByProcessId.json', params);
};

// 【面试】-简历详情页-面试评价回显
export const _getInterviewDetail = (params = {}) => {
    return get('/api/recruit/interview/getInterviewDetail.json', params);
};

// 简历详情-编辑回显
export const _getCandidateById = (params = {}) => {
    return get('/api/recruit/candidate/getCandidateById.json', params);
};

// 简历详情-编辑保存
export const _updateCandidate = (params = {}) => {
    return post('/api/recruit/candidate/updateCandidate.json', params);
};
//【招聘面试】通过流程id取消面试
export const _cancelByProcessId = (params = {}) => {
    return post('/api/recruit/interview/cancelByProcessId.json', params);
};

//【招聘过程】创建offer信息
export const _createMsgForOffer = (params = {}) => {
    return post('/api/recruit/interview/createMsgForOffer.json', params);
};

//【招聘过程】更改职位
export const _changeJob = (params = {}) => {
    return post('/api/recruit/filter/changeJob.json', params);
};

//【招聘职位】BOSS直聘渠道绑定
export const _bindBossInfo = (params = {}) => {
    return get('/api/recruit/job/bindBossInfo.json', params, {
        quiet: true
    });
};

//【bossHi日程链接】是否为面试官
export const _isInterviewer = (params = {}) => {
    return get('/api/recruit/interview/isInterviewer.json', params);
};

// 删除候选人评价
export const _candidateRemark= (params = {}) => {
    return get('/api/recruit/candidate/remark/list.json', params);
};

//【获取候选人评价列表
export const _candidateRemarkDel= (params = {}) => {
    return get('/api/recruit/candidate/remark/del.json', params);
};

//【招聘过程】新增评价
export const _candidateRemarkAdd = (params = {}) => {
    return post('/api/recruit/candidate/remark/add.json', params);
};

//获取候选人标签列表
export const _getLabelList= (params = {}) => {
    return get('/api/recruit/candidate/label/list.json', params);
};

//获取某人创建的所有标签列表
export const _getAllLabelList= (params = {}) => {
    return get('/api/recruit/candidate/label/listAll.json', params);
};

//【414】新增标签
export const _addLabel = (params = {}) => {
    return post('/api/recruit/candidate/label/addLabel.json', params);
};

//【414】删除标签
export const _delLabel = (params = {}) => {
    return get('/api/recruit/candidate/label/delLabel.json', params);
};

//【414】批量新增候选人标签关联关系
export const _addLabelRel = (params = {}) => {
    return post('/api/recruit/candidate/label/changeRel.json', params);
};

//【414】删除某候选人的标签关联关系
export const _delLabelRel = (params = {}) => {
    return get('/api/recruit/candidate/label/delRel.json', params);
};

//【414】获取可用的会议室列表
export const _availableRoom = (params = {}) => {
    return post('/api/reservation/list/availableRoom.json', params);
};


//获取可用的会议室列表_4.5.3
export const _interviewAvailableRoom= (params = {}) => {
    return post('/api/recruit/interview/list/availableRoom.json', params);
};

//获取办公地点列表_4.5.3
export const _interviewWorkPlace = (params = {}) => {
    return post('/api/recruit/interview/list/workplace.json', params);
};

//【414】获取工作地点
export const _workPlace = (params = {}) => {
    return get('/api/position/user/listWorkplace.json', params);
};

//【招聘过程】数据统计
export const _getRecruitStatistic = (params = {}) => {
    return post('/api/recruit/filter/getRecruitStatistic.json', params);
};

//【招聘过程】更改职位
export const _arrangeList = (params = {}) => {
    return post('/api/recruit/interview/arrange/list.json', params);
};

//【招聘流程】管理员列表
export const _adminListPage = (params = {}) => {
    return post('/api/recruit/filter/adminListPage.json', params);
};

//【招聘职位】是否已经绑定BOSS身份
export const _hasBindBossId = (params = {}) => {
    return get('/api/recruit/job/hasBindBossId.json', params);
};

// 招聘需求-列表
export const _listDemandPage = (params = {}) => {
    return post('/api/recruit/demand/listPage.json', params);
};

// 招聘需求-修改内容
export const _editDemand = (params = {}) => {
    if (params.id) { // 修改
        return post('/api/recruit/demand/edit.json', params);
    } else { // 新增
        return post('/api/recruit/demand/add.json', params);
    }
};

// 【招聘需求】需求下拉列表
export const _getDemandList = (params = {}) => {
    return get('/api/recruit/demand/listAll.json', params);
};

//【候选人】投递记录
export const _getDeliveryRecordList = (params = {}) => {
    return get('/api/recruit/filter/getDeliveryRecordList.json', params);
};

//【候选人】附件简历
export const _getDeliveryResumeRecordList = (params = {}) => {
    return get('/api/recruit/filter/getDeliveryResumeRecordList.json', params);
};

//【招聘过程】变更职位回显
export const _showJob = (params = {}) => {
    return get('/api/recruit/filter/showJob.json', params);
};

// 招聘需求-通知候选人
export const _interviewNotice = (params = {}) => {
    return get('/api/recruit/interview/notice.json', params);
};

// 招聘需求-获取详情
export const _demandDetail = (params = {}) => {
    return post('/api/recruit/demand/detail.json', params);
}; 

// 招聘需求-切换状态
export const _switchDemandStatus = (params = {}) => {
    return post('/api/recruit/demand/switchState.json', params);
};

// 招聘需求-删除内容
export const _delDemand = (params = {}) => {
    return post('/api/recruit/demand/delete.json', params);
};

// 招聘需求-搜索部门
export const _findDeptByName = (params = {}) => {
    return post('/api/dept/findDeptByName.json', params);
};

//【简历详情】分享简历
export const _shareResume = (params = {}) => {
    return get('/api/recruit/interview/shareResume.json', params);
};

//【简历详情】催面评
export const _urge = (params = {}) => {
    return get('/api/recruit/interview/urge.json', params);
};

// 候选人列表查找
export const _getMyCandidatePageList = (params = {}) => {
    return post('/api/recruit/candidate/getMyCandidatePageList.json', params);
};

// 收藏或取消收藏
export const _collectStatus = (params = {}) => {
    return post('/api/recruit/candidate/collect/status.json', params);
};

// 不合适或取消不合适
export const _switchStatus = (params = {}) => {
    return post('/api/recruit/candidate/switchStatus.json', params);
};

//【候选人详情】-操作按钮-V4.19
export const _getCandidateDetailBtnList = (params = {}) => {
    return get('/api/recruit/candidate/getCandidateDetailBtnList.json', params);
};

// 不合适或取消不合适
export const _updateResume = (params = {}) => {
    return post('/api/recruit/filter/updateResume.json', params);
};

//【面试题库】-列表-V4.36
export const _interviewReferenceQuestion = (params = {}) => {
    return get('/api/recruit/interviewReferenceQuestion/list.json', params);
};

//【面试题库】-保存-V4.36
export const _saveQuestion = (params = {}) => {
    return post('/api/recruit/interviewReferenceQuestion/save.json', params);
};

//【面试题库】-删除-V4.36
export const _deleteQuestion = (params = {}) => {
    return post('/api/recruit/interviewReferenceQuestion/delete.json', params);
};

//【面试题库】-关联考察项下拉选择-V4.36
export const _searchQuestionQuality = (params = {}) => {
    return get('/api/recruit/interviewReferenceQuestion/quality/element/dropDown.json', params);
};

//【面试题库】-变更状态-V4.36
export const _switchQuestion = (params = {}) => {
    if (params.state) {
        return post(`/api/recruit/interviewReferenceQuestion/state/enable.json?id=${params.id}`);
    }
    return post(`/api/recruit/interviewReferenceQuestion/state/disable.json?id=${params.id}`);
};

//【面试题库】-导出检查-V4.36
export const _questionExportCheck = (params = {}) => {
    return get('/api/recruit/interviewReferenceQuestion/export/check.json', params);
};

//【考察项】-列表-V4.36
export const _qualityList = (params = {}) => {
    return post('/api/recruit/quality/element/listPage.json', params);
};

export const _queryQualityList = (params = {}) => {
    return post('/api/recruit/quality/element/listByQuery.json', params);
};

//【考察项】-保存-V4.36
export const _saveQuality = (params = {}) => {
    if (params.id) {
        return post('/api/recruit/quality/element/update.json', params);
    }
    return post('/api/recruit/quality/element/insert.json', params);
};

//【考察项】-删除-V4.36
export const _deleteQuality = (params = {}) => {
    return post('/api/recruit/quality/element/delete.json', params);
};

//【考察项】-变更状态-V4.36
export const _switchQuality = (params = {}) => {
    return post('/api/recruit/quality/element/modifyState.json', params);
};

//【考察项】-获取单个考察项详情-V4.36
export const _qualityInfo = (params = {}) => {
    return get('/api/recruit/quality/element/info.json', params);
};

//【考察项】-考察项关联的题列表-V4.36
export const _qualityQuestion = (params = {}) => {
    return get('/api/recruit/quality/element/listQuestion.json', params);
};

//【面评模板】-模板列表-V4.36
export const _templateList = (params = {}) => {
    return post('/api/recruit/template/element/listTemplate.json', params);
};

//【面评模板】-开关-V4.36
export const _findTemplate = (params = {}) => {
    return get('/api/recruit/template/element/findSwitch.json', params);
};

//【面评模板】-开关-V4.36
export const _switchTemplate = (params = {}) => {
    return post('/api/recruit/template/element/saveSwitch.json', params);
};

//【面评模板】-保存-V4.36
export const _saveTemplate = (params = {}) => {
    return post('/api/recruit/template/element/saveTemplate.json', params);
};

//【面评模板】-复制-V4.36
export const _copyTemplate = (params = {}) => {
    return post('/api/recruit/template/element/copyTemplate.json', params);
};

// 校招管理列表
export const _campusList = (params = {}) => {
    return get('/api/recruit/campus/list.json', params);
};

// 项目保存
export const _campusSave = (params = {}) => {
    return post('/api/recruit/campus/save.json', params);
};

// 查询职位
export const _campusJob = (params = {}) => {
    return get('/api/recruit/campus/job/dropDown.json', params);
};

// 关联职位列表
export const _campusJobList = (params = {}) => {
    return get('/api/recruit/campus/job/list.json', params);
};

// 关联候选人列表
export const _campusCandidateList = (params = {}) => {
    return get('/api/recruit/campus/candidate/list.json', params);
};

// 项目删除
export const _campusDelete = (params = {}) => {
    return post('/api/recruit/campus/delete.json', params);
};

// 候选人导出检查
export const _exportCheck = (params = {}) => {
    return get('/api/recruit/campus/export/candidate/check.json', params);
};

// 职位与候选人统计
export const _campusCount = (params = {}) => {
    return get('/api/recruit/campus/count.json', params);
};

// 需求候选人统计
export const _candidateCount = (params = {}) => {
    return get('/api/recruit/demand/detail/candidate/count.json', params);
};

// 需求候选人列表
export const _candidateList = (params = {}) => {
    return get('/api/recruit/demand/detail/candidate/list.json', params);
};
// 检查招聘情况权限
export const _candidateCheck = (params = {}) => {
    return get('/api/recruit/demand/detail/candidate/check.json', params);
};
// 附件信息删除
export const _fileDelete = (params = {}) => {
    return post('/api/recruit/candidate/portfolio/delete.json', params);
};
// 附件信息上传和删除按钮权限
export const _getOpCandidateBtnList = (params = {}) => {
    return get('/api/recruit/candidate/getOpCandidateBtnList.json', params);
};
// 【招聘背景调查表】发起背调表单
export const _backCheckApply = (params = {}) => {
    return post('/api/recruit/backCheck/apply.json', params);
};

// 【招聘背景调查表】获取人员信息
export const _backUserInfo = (params = {}) => {
    return get('/api/recruit/backCheck/userInfo.json', params);
};

// 【招聘背景调查表】列表查询
export const _backCheckList = (params = {}) => {
    return get('/api/recruit/backCheck/list.json', params);
};

// 【招聘背景调查表】详情查询
export const _backCheckDetail = (params = {}) => {
    return get('/api/recruit/backCheck/detail.json', params);
};

// 【招聘背景调查表】受理
export const _backCheckReceive = (params = {}) => {
    return post(`/api/recruit/backCheck/receive.json?id=${params.id}`);
};

// 【招聘背景调查表】终止背调
export const _backCheckTerminate = (params = {}) => {
    return post(`/api/recruit/backCheck/terminate.json?id=${params.id}`);
};

// 【招聘背景调查表 重新分配
export const _backCheckResend = (params = {}) => {
    return post(`/api/recruit/backCheck/reSend.json?id=${params.id}&reSendId=${params.reSendId}`, params);
};

// 【招聘背景调查表 修改授权地址
export const _backCheckUrl = (params = {}) => {
    return post(`/api/recruit/backCheck/updateAuthUrl.json?id=${params.id}&overTime=${params.overTime}`);
};

// 【招聘背景调查表 上传报告
export const _backCheckUpload = (params = {}) => {
    return post('/api/recruit/backCheck/uploadReport.json', params);
};

// 【招聘背景调查表 恢复背调
export const _backCheckRecover = (params = {}) => {
    return post(`/api/recruit/backCheck/recover.json?id=${params.id}`);
};

export const _offerSyncInfo = (params = {}) => {
    return get('/api/recruit/backCheck/offerSyncInfo.json', params);
};

// 【招聘背景调查表 恢复背调
export const _backCheckEdit = (params = {}) => {
    return post(`/api/recruit/backCheck/edit.json`, params);
};

// 【校招】添加候选人-4.5.13
export const _addCandidateCampus = (params = {}) => {
    return post(`/api/recruit/campus/candidate/add.json`, params);
};

// 【校招】加入候选-4.5.13
export const _joinCandidateCampus = (params = {}) => {
    return post(`/api/recruit/campus/candidate/join.json`, params);
};

// 【校招】批量加入候选-4.5.13
export const _batchJoinCandidateCampus = (params = {}) => {
    return post(`/api/recruit/campus/candidate/batchJoin.json`, params);
};


// 【校招】查询项目参与人-4.5.13
export const _getCampusJobUser = (params = {}) => {
    return get(`/api/recruit/campus/job/user/dropDown.json`, params);
};

// 推进至offer-4.5.22
export const _pushToOffer = (params = {}) => {
    return post(`/api/recruit/filter/pushToOffer.json`, params, headerConfig);
};

// 回退至面试-4.5.22
export const _backToInterviewed = (params = {}) => {
    return post(`/api/recruit/filter/backToInterviewed.json`, params, headerConfig);
};

// 终止流程-4.5.22
export const _terminateProcess = (params = {}) => {
    return post(`/api/recruit/filter/terminateProcess.json`, params);
};

// 招聘查询条件-4.5.22
export const _getRecruitSummarizeQueryCond = (params = {}) => {
    return get(`/api/recruit/report/getRecruitSummarizeQueryCond.json`, params);
};

// 招聘总览-4.5.22
export const _getRecruitSummarizeInfo = (params = {}) => {
    return post(`/api/recruit/report/getRecruitSummarizeInfo.json`, params);
};

// 招聘行为-4.5.22
export const _getRecruitAnalysisInfo = (params = {}) => {
    return post(`/api/recruit/report/getRecruitAnalysisInfo.json`, params);
};

// 导出总览明细
export const _exportRecruitSummarizeInfo = (params = {}) => {
    return post(`/api/recruit/report/exportRecruitSummarizeInfo.json`, params);
};


// 导出行为明细
export const _exportRecruitActInfo = (params = {}) => {
    return post(`/api/recruit/report/exportRecruitActInfo.json`, params);
};

export const _getRecruitPrincipleList = (params = {}) => {
    return get(`/api/recruit/report/getRecruitPrincipleList.json`, params);
};

// 招聘职位-职位详情 4.8.3
export const _recruitPositionDetail = (params = {}) => {
    return get('/api/recruit/job/inner/detail.json', params);
};

// 【猎头/RPO职位】RPO-职位列表-4.8.3
export const _jobInnerList = (params = {}, isRpo) => {
    let urlType = isRpo ? '7' : '6';
    return get(`/api/recruit/job/inner/${urlType}/list.json`, params);
};

// 【猎头/RPO职位】RPO-职位详情-4.8.3
export const _jobInnerDetail = (params = {}, isRpo) => {
    let urlType = isRpo ? '7' : '6';
    return get(`/api/recruit/job/inner/${urlType}/detail.json`, params);
};

// 【猎头/RPO职位】RPO-新增更新职位-4.8.3
export const _jobInnerAddOrUpdate = (params = {}, isRpo) => {
    let urlType = isRpo ? '7' : '6';
    let updateType = params.id ? 'update' : 'add';
    return post(`/api/recruit/job/inner/${urlType}/${updateType}.json?srcType=${params.srcType}`, params);
};

// 【猎头/RPO职位】RPO-删除职位-4.8.3
export const _jobInnerDelete = (params = {}, isRpo) => {
    let urlType = isRpo ? '7' : '6';
    return post(`/api/recruit/job/inner/${urlType}/delete.json`, params, headerConfig);
};

// 【猎头/RPO职位】猎头-获取职位的投递记录-4.8.3
export const _getJobDeliveryRecord = (params = {}, isRpo) => {
    let urlType = isRpo ? '7' : '6';
    let queryData = {...params};
    if (!queryData.startDate) {
        delete queryData.startDate;
    }
    if (!queryData.endDate) {
        delete queryData.endDate;
    }
    return get(`/api/recruit/filter/${urlType}/getJobDeliveryRecord.json`, queryData);
};


export const _getActivationLog = (params = {}) => {
    let queryData = {...params};
    if (!queryData.startDate) {
        delete queryData.startDate;
    }
    if (!queryData.endDate) {
        delete queryData.endDate;
    }
    return get(`/api/recruit/activationLog/list.json`, queryData);
};

// 【个人职位】获取职位的投递记录-4.8.3
export const _getFilterJobDeliveryRecord = (params = {}) => {
    let queryData = {...params};
    if (!queryData.startDate) {
        delete queryData.startDate;
    }
    if (!queryData.endDate) {
        delete queryData.endDate;
    }
    return get(`/api/recruit/filter/0/getJobDeliveryRecord.json`, queryData);
};


// 【供应商】获取供应商列表-4.8.3
export const _supplierList= (params = {}) => {
    return get(`/api/recruit/supplier/list.json`, params);
};

// 【猎头/RPO职位】猎头-更新职位状态-4.8.3
export const _jobInnerUpdateStatus = (params = {}, type) => {
    let urlType = type === 'rpo' ? '7' : '6';
    return post(`/api/recruit/job/inner/${urlType}/updateStatus.json`, params);
};

// 【供应商】获取供应商信息-4.8.3
export const _supplierInfo = (params = {}) => {
    return get(`/api/recruit/supplier/info.json`, params);
};

// 【供应商】插入/编辑供应商-4.8.3
export const _supplierInsertOrEdit = (params = {}) => {
    return post(`/api/recruit/supplier/insertOrEdit.json`, params);
};

// 【供应商】插入/编辑供应商-4.8.3
export const _supplierDelete = (params = {}) => {
    return post(`/api/recruit/supplier/delete.json?id=${params.id}`, params);
};

// 【供应商】发送通知-4.8.3
export const _emailNotify = (params = {}) => {
    return post(`/api/recruit/supplier/emailNotify.json?id=${params.id}`, params);
};

// 【账号】获取账号列表-4.8.3
export const _accountList = (params = {}) => {
    return get(`/api/recruit/supplier/account/list.json`, params);
};

// 【账号】获取账号信息-4.8.3
export const _accountInfo = (params = {}) => {
    return get(`/api/recruit/supplier/account/info.json`, params);
};

// 【账号】新增/编辑账号-4.8.3
export const _accountInsertOrEdit = (params = {}) => {
    return post(`/api/recruit/supplier/account/insertOrEdit.json`, params);
};

// 【账号】修改账号状态-4.8.3
export const _accountState = (params = {}) => {
    return post(`/api/recruit/supplier/account/state.json?state=${params.state}&id=${params.id}`, params);
};

// 【账号】删除账号-4.8.3
export const _accountDelete = (params = {}) => {
    return post(`/api/recruit/supplier/account/delete.json?id=${params.id}`, params);
};

// 获取招聘总揽详情
export const _getRecruitDetailList = (params = {}) => {
    return post(`/api/recruit/report/getRecruitDetailList.json`, params);
};

// 获取招聘行为详情
export const _getRecruitActDetailList = (params = {}) => {
    return post(`/api/recruit/report/getRecruitActDetailList.json`, params);
};


// 根据需求id获取需求业务负责人
export const _getBusinessPrincipalInfo = (params = {}) => {
    return get(`/api/recruit/demand/getBusinessPrincipalInfo.json`, params);
};

// 获取筛选淘汰通知候选人内容 
export const _getRejectNoticeContent = (params = {}) => {
    return post(`/api/recruit/filter/getRejectNoticeContent.json`, params);
};

// 导出明细
export const _exportJobDeliveryRecord = (params = {}, isRpo) => {
    return get(`/api/recruit/filter/${isRpo ? '7' : '6'}/exportJobDeliveryRecord.json`, params);
};

// 导出明细
export const _exportActivationLog = (params = {}, isRpo) => {
    return get(`/api/recruit/activationLog/listExport.json`, params);
};
