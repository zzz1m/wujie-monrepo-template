/**
 * @description 序列管理相关接口
 */
import { get, post } from '@/services/http';

/**
 * 获取职级列表
 * @param {Object} params 
 */
export const _seqLevelList = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/level/list.json`, params);
};

/**
 * 获取职级类别
 * @param {Object} params 
 */
export const _seqTypeList = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/type/list.json`, params);
};

/**
 * 删除职级
 * @param {Object} params 
 */
export const _seqLevelDelete = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/level/delete.json`, params);
};

/**
 * 删除序列
 * @param {Object} params 
 */
export const _seqTypeDelete = (params = {}, admin = false) => {
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/type/delete.json`, params);
};

/**
 * 创建序列
 * @param {Object} params 
 */
export const _seqTypeAdd = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/type/add.json`, params);
};

/**
 * 创建职级
 * @param {Object} params 
 */
export const _seqLevelAdd = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/level/add.json`, params);
};

/**
 * 职级编辑
 * @param {Object} params 
 */
export const _seqLevelUpdate = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/level/update.json`, params);
};

/**
 * 序列编辑
 * @param {Object} params 
 */
export const _seqTypeUpdate = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/type/update.json`, params);
};

/**
 * 序列排序
 * @param {Object} params 
 */
export const _seqTypeSort = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/type/sort.json`, params);
};

/**
 * 职级排序
 * @param {Object} params 
 */
export const _seqLevelSort = (params = {}, admin = false) => {
    return post(`/api/sys/${admin ? 'manageSeq' : 'seq'}/level/sort.json`, params);
};

/**
 * 序列（停用or启用）
 * @param {Object} params 
 */
export const _seqTypeStatus = (params = { statusType: 'disable' }, admin = false) => {
    const { statusType, ...restParams } = params;
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/type/${statusType}.json`, restParams);
};

/**
 * 职级（停用or启用）
 * @param {Object} params 
 */
export const _seqLevelStatus = (params = { statusType: 'disable' }, admin = false) => {
    const { statusType, ...restParams } = params;
    return get(`/api/sys/${admin ? 'manageSeq' : 'seq'}/level/${statusType}.json`, restParams);
};