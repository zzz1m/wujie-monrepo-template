import { get, post, postForm } from '@/services/http';

// [花名册] 创建花名册
export const _addRoster = (params = {}) => {
    return post('/api/sys/roster/addRoster.json', params);
};

// 编辑花名册
export const _rosterUpdate = (params = {}) => {
    return post('/api/sys/roster/update.json', params);
};
//复制花名册
export const _rosterCopy = (params = {}) => {
    return post('/api/sys/roster/copyRoster.json', params);
};

// [花名册] 删除花名册
export const _deleteRoster = (params = {}) => {
    return post('/api/sys/roster/deleteRoster.json', params);
};

// [花名册] 更新花名册
export const _rosterTypeUpdate = (params = {}) => {
    return post('/api/sys/roster_type/update.json', params);
};

// [花名册] 创建分类
export const _rosterTypeCreate = (params = {}) => {
    return post('/api/sys/roster_type/create.json', params);
};

// [花名册] 查询分类
export const _rosterTypeList = (params = {}) => {
    return get('/api/sys/roster_type/list.json', params);
};

// [花名册] 删除分类
export const _rosterTypeDelete = (params = {}) => {
    return postForm('/api/sys/roster_type/delete.json', params);
};

// 分类排序
export const _rosterTypeSort = (params = {}) => {
    return post('/api/sys/roster_type/sort.json', params);
};

// [花名册] 获取子节点
export const _rosterList = (params = {}) => {
    return post('/api/sys/roster/list.json', params);
};

// [花名册] 共享子节点
export const _rosterShare = (params = {}) => {
    return post('/api/sys/roster/share.json', params);
};

// [花名册] 设置表头字段
export const _rosterSetHeaders = (params = {}) => {
    return post('/api/sys/roster/setHeaders.json', params);
};

// 根据用户获取字段权限
export const _getFieldGroupByUser = (params = {}) => {
    return post('/api/sys/role/getFieldGroupByUser.json', params);
};

// 查询花名册内容
export const _rosterSearch = (params = {}) => {
    return post('/api/sys/roster/rosterSearch.json', params);
};

// 查询花名册详情
export const _rosterGetById = (params = {}) => {
    return post('/api/sys/roster/getById.json', params);
};

// 排序设置
export const _rosterSetSort = (params = {}) => {
    return post('/api/sys/roster/setSort.json', params);
};

// [花名册] 条件设置
export const _rosterManaSet = (params = {}) => {
    return post('/api/sys/roster/manaSet.json', params);
};

export const _exportRoster = (url, params = {}) => {
    return post(url || '/api/sys/roster/exportExcel.json', params);
};