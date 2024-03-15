import { get, post } from '@/services/http';

/**
 *  iuc
 */
// 获取iuc系统列表
export const _getListSystem = (params = {}) => {
    return get('/api/auth/iuc/listSystem.json', params);
};
// 查询iuc角色列表
export const _getListRole = (params = {}) => {
    return get('/api/auth/iuc/listRole.json', params);
};
// 发起角色权限申请
export const _iucApply = (params = {}) => {
    return post('/api/auth/iuc/apply.json', params);
};