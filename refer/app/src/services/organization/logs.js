import { get, post } from '@/services/http';

/**
 * 字典模块列表
 * @param {Object} params 
 */
// 日志列表
export const _logList = (params = {}) => {
    return get('/api/sys/log/list.json', params);
};
