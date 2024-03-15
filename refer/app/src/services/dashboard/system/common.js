import { get, post } from '@/services/http';

/**
 * 获取城市列表
 * @param {Object} params 
 */
export const _getCitys = (params = {}) => {
    return get('/api/sys/field/getCitys.json', params);
};

/**
 * 获取字段组列表
 * @param {Object} params 
 */
export const _getFieldGroupList = (params = {}) => {
    // return get('/api/sys/field/getFieldGroupList.json', params);
    return post('/api/sys/role/getFieldGroupByUser.json', params);
};

/**
 * 字段列表
 * @param {Object} params 
 */
export const _getFieldList = (params = {}) => {
    // return get('/api/sys/field/getFieldList.json', params);
    return post('/api/sys/role/getFieldByGroup.json', params);
};
/**
 * 获取字典枚举值列表
 * @param {Object} params 
 */
export const _getDictTypes = (params = {}) => {
    const { dictType, ...param } = params;
    return get(`/api/common/dict/get/${dictType}/list.json`, param);
};

/**
 * 获取字典枚举值列表 （特殊）
 * @param {Object} params 
 */
export const _getSpecialDictTypes = (params = {}) => {
    const {url, ...param} = params;
    return get(url, param);
};

/**
 * 根据某 code/name 反显字典 数据
 * @param {Object} params 
 */
export const _getDictDetail = (params = {}) => {
    const { param, dictType, ...restParam } = params;
    return get(`/api/common/dict/${dictType}/getDictBy${param}.json`, restParam);
};

/**
 * 合同主体映射列表
 * @param {Object} params 
 */
 export const _getRemarkList = (params = {}) => {
    return get(`/api/common/dict/remark/list.json`, params);
};

/**
 * 更改合同主体映射
 * @param {Object} params 
 */
 export const _setRemarkList = (params = {}) => {
    return post(`/api/common/dict/remark/edit.json`, params);
};