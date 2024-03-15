import { get, post } from '@/services/http';

//获取用户列表
export const _bpList = (params = {}) => {
    return post('/api/sys/user/bpList.json', params);
};
//添加账号
export const _addBp = (params = {}) => {
    return post('/api/sys/user/addBp.json', params);
};
//删除账号
export const _deleteBp = (params = {}) => {
    return post('/api/sys/user/deleteBp.json', params);
};
//账号设置
export const _bpSet = (params = {}) => {
    return post('/api/sys/user/bpSet.json', params);
};
//分配角色 
export const _allocateRole = (params = {}) => {
    return post('/api/sys/user/allocateRole.json', params);
};
//用户下的角色列表  
export const _getUserRoleList = (params = {}) => {
    return post('/api/sys/user/getUserRoleList.json', params);
};