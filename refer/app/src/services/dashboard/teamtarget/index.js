import { get, post } from '@/services/http';

// 【目标表】列表查询
export const _teamlist = (params = {}) => {
    return get('/api/objectives/team/list.json', params);
};
// 【目标表】手动创建
export const _teamsave = (params = {}) => {
    return post(`/api/objectives/team/save.json`, params);
};
// 【目标表】终止
export const _teamterminate = (params = {}) => {
    return post(`/api/objectives/team/state/terminate.json`, params);
};
// 【目标表】获取目标详情
export const _teamdetail = (params = {}) => {
    let isTeam = params.isTeam;
    delete params.isTeam;
    if (isTeam) {
        return get('/api/objectives/team/detail.json', params);
    } else {
        return get('/api/objectives/personal/detail.json', params);
    }
    
};
// 【目标表】确认
export const _teamconfirm = (params = {}) => {
    return post(`/api/objectives/personal/state/confirm.json`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};
// 【目标表】退回
export const _teamreject = (params = {}) => {
    return post(`/api/objectives/team/state/reject.json`, params);
};

// 【目标表】个人列表
export const _personallist = (params = {}) => {
    return get('/api/objectives/personal/list.json', params);
};

// 【目标表】个人目标详情
export const _personaldetail = (params = {}) => {
    return get('/api/objectives/personal/detail.json', params);
};

// 【目标表】实时获取用户详情
export const _userInfo = (params = {}) => {
    return get('/api/objectives/personal/userInfo.json', params);
};

// 【目标表】保存目标详情
export const _saveDetail = (params = {}) => {
    return post(`/api/objectives/team/saveDetail.json`, params);
};

// 【目标表】提交目标详情
export const _commitDetail = (params = {}) => {
    return post(`/api/objectives/team/commitDetail.json`, params);
};

// 【目标表】提交目标详情
export const _checkUpdate = (params = {}) => {
    return get(`/api/objectives/team/checkUpdate.json`, params);
};

// 【目标管理适用范围配置表】列表查询
export const _getScopeConfigList = (params = {}) => {
    return get(`/api/objectives/scopeConfig/list.json`, params);
};
// 【目标管理适用范围配置表】保存
export const _saveScopeConfig = (params = {}) => {
    return post(`/api/objectives/scopeConfig/save.json`, params);
};

// 获取管理范围内的部门列表
export const _getScopeDeptTree = (params = {}) => {
    return get(`/api/objectives/team/getScopeDeptTree.json`, params);
};
// 获取最近一条见习异动 -v4.9.9
export const _getLatestUserInfoChangeVO = (params = {}) => {
    return get(`/api/objectives/team/getLatestUserInfoChangeVO.json`, params);
};

// 【目标模板】获取个人模板列表
export const _templateList = (params = {}) => {
    return get(`/api/objectives/template/list.json`, params);
};

// 【目标模板】获取指定类型下个人模板列表
export const _listByType = (params = {}) => {
    return get(`/api/objectives/template/listByType.json`, params);
};

// 【目标模板】获取模板详情
export const _getById = (params = {}) => {
    return get(`/api/objectives/template/getById.json`, params);
};

// 【目标模板】创建模板
export const _update = (params = {}) => {
    if (params.id) {
        return post(`/api/objectives/template/update.json`, params);
    }
    return post(`/api/objectives/template/create.json`, params);
};

// 【目标模板】更新模板规则
export const _updateRule = (params = {}) => {
    return post(`/api/objectives/template/updateRule.json`, params);
};

// 【目标模板】删除模板
export const _deleteRule = (params = {}) => {
    return post(`/api/objectives/template/delete.json`, params);
};

