/**
 * @description 子序列管理相关接口
 */
import { get, post } from '@/services/http';

/**
 * 获取某子序列下的标准岗位列表
 * @param {Object} params 
 */
export const _seqPositionList = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/position/list.json`, params);
};

/**
 * 获取某序列下的子序列列表
 * @param {Object} params 
 */
export const _seqSubList = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/sub/list.json`, params);
};

/**
 * 子序列 (停用 or 启用)
 * @param {Object} params 
 */
export const _seqSubStatus = (params = { statusType: 'disable' }, admin = false) => {
    const { statusType, ...restParams } = params;
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/sub/${statusType}.json`, restParams);
};

/**
 * 标准岗位 (停用 or 启用)
 * @param {Object} params 
 */
export const _seqPositionStatus = (params = { statusType: 'disable' }, admin = false) => {
    const { statusType, ...restParams } = params;
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/position/${statusType}.json`, restParams);
};

/**
 * 删除子序列
 * @param {Object} params 
 */
export const _seqSubDelete = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/sub/delete.json`, params);
};

/**
 * 删除标准岗位
 * @param {Object} params 
 */
export const _seqPositionDelete = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/position/delete.json`, params);
};

/**
 * 子序列排序
 * @param {Object} params 
 */
export const _seqSubSort = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/sub/sort.json`, params);
};

/**
 * 标准岗位排序
 * @param {Object} params 
 */
export const _seqPositionSort = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/position/sort.json`, params);
};

/**
 * 子序列编辑
 * @param {Object} params 
 */
export const _seqSubUpdate = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/sub/update.json`, params);
};

/**
 * 标准岗位编辑
 * @param {Object} params 
 */
export const _seqPositionUpdate = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/position/update.json`, params);
};

/**
 * 创建子序列
 * @param {Object} params 
 */
export const _seqSubAdd = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/sub/add.json`, params);
};

/**
 * 创建标准岗位
 * @param {Object} params 
 */
export const _seqPositionAdd = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/position/add.json`, params);
};

// 撤销列表查询
export const _revokeDeptInfo = (params = {}) => {
    return post('/api/sys_dept/revokeDeptInfo.json', params);
};

// 部门枚举 （类型-级别）
export const _getDeptLabel = (params = {}) => {
    return get('/api/common/dict/get/dept_level/list.json', params);
};
export const _getDeptRank = (params = {}) => {
    return get('/api/common/dict/get/department_label/list.json', params);
};
// 工作地点枚举 
export const _workplaceList = (params = {}) => {
    console.log('hhh');
    return get('/api/common/dict/get/workplace/list.json', params);
};

export const _deptTree = (params = {}) => {
    return post('/api/sys_dept/deptTreeInfo.json', params);
};

// 部门启用
export const _enableDept = (params = {}) => {
    return post('/api/sys_dept/enableDept.json', params);
};

