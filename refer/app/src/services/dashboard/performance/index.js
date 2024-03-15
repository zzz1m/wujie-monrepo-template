import { get, post } from '@/services/http';

// 获取我的绩效信息
export const _getKpiMyEdit = (params = {}) => {
    return get('/api/kpi/my/edit.json', params);
};
// 提交我的绩效信息
export const _postKpiMySave = (params = {}) => {
    return post('/api/kpi/my/save.json', params);
};
// 获取协作方列表
export const _getTeamworkList = (params = {}) => {
    return get('/api/kpi/my/teamwork.json', params);
};
// 获取协作方信息
export const _getTeamworkEdit = (params = {}) => {
    return get('/api/kpi/my/teamwork/edit.json', params);
};
// 提交协作方评价
export const _postTeamworkSave = (params = {}) => {
    return post('/api/kpi/my/teamwork/save.json', params);
};
// 获取 团队绩效列表
export const _getKpiTeam = (params = {}) => {
    return get('/api/kpi/team.json', params);
};
// 获取 绩效调整列表
export const _getKpiTeamNext = (params = {}) => {
    return get('/api/kpi/team/next.json', params);
};
// 获取 绩效调整保存
export const _postKpiTeamEdit = (params = {}) => {
    return post('/api/kpi/team/edit.json', params);
};
// 团队绩效 导出
export const _getTeamExport = (params = {}) => {
    return get('/api/kpi/team/export/url.json', params);
};
// 团队绩效 评价详情
export const _getTeamView = (params = {}) => {
    return get('/api/kpi/team/view.json', params);
};
// 我的绩效-最终结果
export const _getKpiInfo = (params = {}) => {
    return get('/api/kpi/my/info.json', params);
};
//------------2019----------------------
//kpi,考评项列表
export const getKpiInfoAdmin = (params = {}) => {
    return get('/api/kpi/leader/user/detail.json', params);
};
export const getKpiInfo = (params = {}, admin) => {
    return get(`/api/kpi/${admin ? 'admin' : 'user'}/detail.json`, params);
};
export const getKpiList = (params = {}) => {
    return get('/api/kpi/user/my.json', params);
};
export const editKpiInfo = (params = {}, completeState = false) => {
    return post(`/api/kpi/user/saveKpiDetail.json?completeState=${completeState}`, params);
};
export const editKpiInfoAdmin = (params = {}, completeState = false) => {
    return post(`/api/kpi/admin/saveKpiDetail.json?completeState=${completeState}`, params);
};

export const myResult = (params = {}) => {
    return get('/api/kpi/user/myResult.json', params);
};
export const saveTwUser = (params = {}) => {
    return post('/api/kpi/user/saveTwUser.json', params);
};
export const getTwUser = (params = {}) => {
    return get('/api/kpi/user/getTwUser.json', params);
};
export const kpiUser = (params = {}) => {
    return get('/api/kpi/common/kpiUser.json', params);
};
export const newkpiUser = (params = {}) => {
    return get('/api/kpi/user/getUser.json', params);
};
export const getKpiTw = (params = {}) => {
    return get('/api/kpi/user/getKpiTw.json', params);
};
export const getTeamApply = (params = {}) => {
    return get('/api/kpi/leader/getTeamApply.json', params);
};
export const updateTwUser = (params = {}) => {
    return post('/api/kpi/leader/updateTwUser.json', params, {
        quiet: true
    });
};
//获取部门信息
export const getDeptInfo = (params = {}) => {
    return get('/api/kpi/user/dept/info.json', params);
};
export const teamkpi = (params = {}) => {
    return get('/api/kpi/leader/team/kpi.json', params);
};
export const adjustKpi = (params = {}) => {
    return get('/api/kpi/leader/team/adjustKpi.json', params);
};
export const doAdjust = (params = {}) => {
    return get('/api/kpi/leader/team/doAdjust.json', params);
};
export const getResult = (params = {}) => {
    return get('/api/kpi/leader/getResult.json', params);
};
export const getTwDate = (params = {}) => {
    return get('/api/kpi/user/getTwDate.json', params);
};
export const getUndoneKpi = (params = {}) => {
    return get('/api/kpi/admin/email/getUndoneKpi.json', params);
};
export const sendEmail = (params = {}, type, kpiKey) => {
    return post(`/api/kpi/admin/email/sendEmail.json?type=${type||''}&kpiKey=${kpiKey||''}`, params, {
        timeout: 5 * 60 * 1000
    });
};
export const getUnsaveTwUser = (params = {}) => {
    return get('/api/kpi/admin/email/getUnsaveTwUser.json', params);
};
export const unSaveTwUserEmail = (params = {}, type, kpiKey) => {
    return post(`/api/kpi/admin/email/unSaveTwUserEmail.json?type=${type||''}&kpiKey=${kpiKey||''}`, params, {
        timeout: 5 * 60 * 1000
    });
};
// 【kpi通用接口】通过阶段任务获取方案列表
export const _getSchemeByTwType = (params = {}) => {
    return get('/api/kpi/common/getSchemeByNodeKey.json', params);
};
// 获取人员信息
export const _getUserBaseInfo = (params = {}) => {
    return get('/api/kpi/common/getUserBaseInfo.json', params);
};
// 根据类型计算绩效的结果
export const _calculation = (params = {}) => {
    return post('/api/kpi/user/calculation.json', params);
};
// 【kpi通用接口】获取kpi绩效级别列表
export const _listKpiClass = (params = {}) => {
    return get('/api/kpi/common/listKpiClass.json', params);
};
// 根据价值观和关键业绩值计算绩效结果
export const _calculationClass = (params = {}) => {
    return post('/api/kpi/user/class/calculation.json', params);
};
// 获取绩效时间列表
export const _getKpiDateList = (params = {}) => {
    return get('/api/kpi/user/init/getKpiDateList.json', params);
};

// 获取绩效列表
export const _getKpiInfoList = (params = {}) => {
    return get('/api/kpi/admin/init/getKpiInfoList.json', params);
};

// 更新kpi阶段时间
export const _updateKpiDate = (params = {}) => {
    return get('/api/kpi/admin/init/dateKpiDate.json', params);
};

// 获取评价关系
export const _getChangeRelation = (params = {}) => {
    return get('/api/kpi/admin/getChangeRelation.json', params);
};

// 评价关系管理_更改协作类型人员
export const _UserChangeRelations = (params = {}) => {
    return post('/api/kpi/admin/import/userChangeRelation.json', params);
};

// 获取编辑页上面的tabs列表
export const _getTwTypes = (params = {}) => {
    return get('/api/kpi/user/getTwTypes.json', params);
};

// 获取人员月度绩效
export const _getMonthKpi = (params = {}) => {
    return get('/api/kpi/user/getMonthKpi.json', params);
};

// 获取月度绩效顺序
export const _getMonthKpiSort = (params = {}) => {
    return get('/api/kpi/user/getMonthKpiSort.json', params);
};

// 获取登录员工的身份
export const _identity = (params = {}) => {
    return get('/api/kpi/user/identity.json', params);
};

// 获取 绩效部门列表
export const _getDeptLeaderKpiTreeHistory = (params = {}) => {
    return get('/api/dept/snapshot/deptLeaderKpiTree.json', params);
};

// 修改人员是否参加绩效考核
export const _updateJoinKpi = (params = {}) => {
    return post('/api/kpi/admin/updateJoinKpi.json', params);
};
// 修改考核角色
export const _updateUserKpiRole = (params = {}) => {
    return post('/api/kpi/admin/updateUserKpiRole.json', params);
};

// 绩效调整历史查询
export const _jixiaoRecord = (params = {}) => {
    return get('/api/kpi/leader/adjustKpiHistory/list.json', params);
};

// 下级绩效评价列表查询
export const _xiajiList = (params = {}) => {
    return get('/api/kpi/leader/subordinate/kpi.json', params);
};


export const _getScheme = (params = {}) => {
    return get('/api/kpi/user/getScheme.json', params);
};
// 【用户绩效】查看个人绩效列表
export const _getTaskList = (params = {}) => {
    return get('/api/kpi/user/getNodeList.json', params);
};
export const _getResult = (params = {}) => {
    return get('/api/kpi/user/getClassResult.json', params);
};
export const _getStateByKpi = (params = {}) => {
    return get('/api/kpi/user/getStateByKpi.json', params);
};
export const _getKpiClassResult = (params = {}) => {
    return get('/api/kpi/user/getKpiClassResult.json', params);
};
export const _getDetailListTab= (params = {}) => {
    return get('/api/kpi/user/detail/listTab.json', params);
};
