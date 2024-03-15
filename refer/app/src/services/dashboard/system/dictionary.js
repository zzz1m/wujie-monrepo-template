import { get, post } from '@/services/http';

/**
 * 获取所有字典类型列表
 * @param {Object} params 
 */
export const _dicTypeList = (params = {}) => {
    return get('/api/common/dict/type/list.json', params);
};

/**
 * 字典值排序
 * @param {Object} params 
 */
export const _dictSort = (params = {}) => {
    return post('/api/common/dict/dictSort.json', params);
};

/**
 * 内推字典值排序
 * @param {Object} params 
 */
export const _dictRecSort = (params = {}) => {
    return post('/api/job/dict/dictSort.json', params);
};

/**
 * 禁用字典数据
 * @param {Object} params 
 */
export const _dictDisable = (params = {}) => {
    return get('/api/common/dict/disable.json', params);
};

/**
 * 内推禁用字典数据
 * @param {Object} params 
 */
export const _dictRecDisable = (params = {}) => {
    return get('/api/job/dict/disable.json', params);
};

/**
 * 启用字典数据
 * @param {Object} params 
 */
export const _dictEnable = (params = {}) => {
    return get('/api/common/dict/enable.json', params);
};

/**
 * 内推启用字典数据
 * @param {Object} params 
 */
export const _dictRecEnable = (params = {}) => {
    return get('/api/job/dict/enable.json', params);
};

/**
 * 根据字典类型获取字典列表数据
 * @param {String} dictType 
 */
export const _getDictList = (dictType) => {
    return get(`/api/common/dict/get/${dictType}/list.json`);
};

/**
 * 根据字典类型获取字典编辑列表数据
 * @param {Object} params 
 */
export const _getDictEditList = (params = {}) => {
    const { dictType, ...restParams } = params;
    return get(`/api/common/dict/get/${dictType}/editList.json`, restParams);
};

/**
 * 增加数据字典
 * @param {Object} params 
 */
export const _addDict = (params = {}) => {
    return post('/api/common/dict/addDict.json', params);
};

/**
 * 编辑数据字典
 * @param {Object} params 
 */
export const _editDict = (params = {}) => {
    return post('/api/common/dict/editDict.json', params);
};

/**
 * 删除数据字典
 * @param {Object} params 
 */
export const _delDict = (params = {}) => {
    return get('/api/common/dict/delDict.json', params);
};

/**
 * 生成字典 code
 */
export const _generateCode = () => {
    return get(`/api/common/dict/gen/code.json`);
};

/**
 * 根据某 code/name 反显字典 数据
 * @param {Object} params 
 */
export const _getDictDetail = (params = {}) => {
    const { param, dictType, ...restParam } = params;
    return get(`/api/common/dict/${dictType}/getDictBy${param}.json`, restParam);
};