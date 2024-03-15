import { get, post } from '@/services/http';
const headerConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// 绩效组-列表查询-4.6.0
export const _groupList = (params = {}) => {
    return post('/api/month/kpi_group/pageList.json', params);
};

// 绩效组-新增-编辑-4.6.0
export const _addOrEditKpiGroup = (params = {}) => {
    return post(`/api/month/kpi_group/${params.id ? 'editKpiGroup' : 'addKpiGroup'}.json`, params);
};

// 绩效组-详情-4.6.0
export const _getGroupById = (params = {}) => {
    return get('/api/month/kpi_group/getById.json', params);
};

// 绩效组-启用-4.6.0 type: enable 启用 | disable 停用
export const _groupEnableOrDisable = (params = {}, type) => {
    return post(`/api/month/kpi_group/${type}.json`, params, headerConfig);
};

// 绩效组-删除-4.6.0
export const _groupDelete = (params = {}) => {
    return post(`/api/month/kpi_group/delete.json`, params, headerConfig);
};

// 月度绩效列表-管理员-4.6.0
export const _adminPageList = (params = {}) => {
    return post(`/api/month/kpi_upload/adminPageList.json`, params);
};

// 绩效上传列表-绩效上传人员-4.6.0
export const _userPageList = (params = {}) => {
    return post(`/api/month/kpi_upload/pageList.json`, params);
};

// 绩效上传-4.6.0
export const _submitKpi = (params = {}) => {
    return post(`/api/month/kpi_upload/submitKpi.json`, params);
};
// 查询已提交的绩效申请-4.6.0
export const _getSubmitKpi = (params = {}) => {
    return get(`/api/month/kpi_upload/getSubmitKpi.json`, params);
};

// 绩效组-权限下的绩效组-4.6.0
export const _getPrivilegedKpiGroupList = (params = {}) => {
    return get(`/api/month/kpi_group/getPrivilegedKpiGroupList.json`, params);
};

// 绩效上传详情-4.6.0
export const _getKpiById = (params = {}) => {
    return get(`/api/month/kpi_upload/getById.json`, params);
};

// 绩效附件上传校验-4.6.0
export const _uploadKpi = (params = {}) => {
    return post(`/api/month/kpi_upload/uploadKpi.json`, params);
};

// 我的绩效单列表-4.6.0
export const _getKpiUserDetail = (params = {}) => {
    return get(`/api/month/kpi_upload/getKpiUserDetail.json`, params);
};

// 分页获取团队月度绩效列表
export const _kpiTeamPageList = (params = {}) => {
    return post(`/api/month/kpi_team/pageList.json`, params);
};

// 分页获取团队月度绩效列表
export const _getScopeKpiGroup = (params = {}) => {
    return post(`/api/month/kpi_team/getScopeKpiGroup.json`, params);
};

// 获取HRBP管理范围内的部门列表
export const _getScopeDeptTree = (params = {}) => {
    return get(`/api/month/kpi_team/getScopeDeptTree.json`, params);
};


// 我的绩效单列表-4.8.6
export const _getKpiTeamUserDetail = (params = {}) => {
    return get(`/api/month/kpi_team/getKpiUserDetail.json`, params);
};


