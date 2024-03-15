import {
    get,
    post
} from '@/services/http';

/**
 * @description 获取合同预警列表
 * @param {Object} params 
 */
export const getWarningList = (params = {}) => {
    return get('/api/contract/warning/get/contractWarningList.json', params);
};
/**
 * @description 更新合同预警状态
 * @param {Object} params 
 */
export const updateState = (params = {}) => {
    return post('/api/contract/warning/update/updateState.json', params);
};

/**
 * @description 导出合同预警
 * @param {Object} params 
 */
export const exportContract = (params = {}) => {
    return post('/api/contract/warning/export/updateContractWarning.json', params);
};

/**
 * @description 发起合同续签
 * @param {Object} params 
 */
export const renewContract = (params = {}) => {
    return post('/api/contract/warning/renewContract.json', params);
};

/**
 * @description 终止合同
 * @param {Object} params 
 */
export const _stopContract = (params = {}) => {
    return post('/api/contract/warning/stopContract.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

/**
 * @description 获取合同参考信息
 * @param {Object} params 
 */
export const _warningReference = (params = {}) => {
    return get('/api/contract/warning/reference.json', params);
};
