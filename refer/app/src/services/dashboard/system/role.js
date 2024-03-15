import { get, post } from '@/services/http';

// [角色] 获取角色列表
export const _roleList = (params = {}) => {
    return post('/api/sys/role/roleList.json', params);
};

// [角色] 创建角色
export const _createRole = (params = {}) => {
    return post('/api/sys/role/createRole.json', params);
};

// [角色] 编辑角色
export const _updateRole = (params = {}) => {
    return post('/api/sys/role/updateRole.json', params);
};

// [用户] 用户下的角色列表
export const _getUserRoleList = (params = {}) => {
    return post('/api/sys/user/getUserRoleList.json', params);
};

// [角色] 授权取消
export const _roleEmpowerCancel = (params = {}) => {
    return post('/api/sys/role/roleEmpowerCancel.json', params);
};

// [角色] 角色授权
export const _roleEmpower = (params = {}) => {
    return post('/api/sys/role/roleEmpower.json', params);
};

// [角色] 删除角色
export const _deleteRole = (params = {}) => {
    return post('/api/sys/role/deleteRole.json', params);
};

// [角色] 字段所有权限列表
export const _getFieldList = (params = {}) => {
    return post('/api/sys/role/getFieldList.json', params);
};

// [角色] 角色的字段权限
export const _getFieldPower = (params = {}) => {
    return post('/api/sys/role/getFieldPower.json', params);
};

// [角色] 字段权限设置
export const _setFieldPower = (params = {}) => {
    return post('/api/sys/role/setFieldPower.json', params);
};

// [角色] 创建角色重名校验
export const _checkRole = (params = {}) => {
    return post('/api/sys/role/checkRole.json', params);
};

// [角色] 角色下用户列表
export const _roleUserList = (params = {}) => {
    return post('/api/sys/role/roleUserList.json', params);
};
