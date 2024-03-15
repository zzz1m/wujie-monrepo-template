// 考勤组相关api
import {
    get,
    post
} from '@/services/http';

//【考勤组】获取考勤组列表
export const _groupListPage = (params) => {
    return post('/api/attendance/v2/group/getListPage.json', params);
};

//【考勤组】获取id考勤组信息
export const _getGroupById = (params) => {
    return post('/api/attendance/v2/group/getById.json', params);
};

// 【考勤组】新增考勤组
export const _addGroup = (params = {}) => {
    return post('/api/attendance/v2/group/add.json', params);
};

// 【考勤组】编辑考勤组
export const _editGroup = (params = {}) => {
    return post('/api/attendance/v2/group/edit.json', params);
};

//【考勤组】删除考勤组
export const _deleteGroupById = (params = {}) => {
    return post('/api/attendance/v2/group/deleteById.json', params);
};

// 【考勤组】启用考勤组
export const _enableGroupById = (params = {}) => {
    return post('/api/attendance/v2/group/enableById.json', params);
};

// 【考勤组】停用考勤组
export const _disableGroupById = (params = {}) => {
    return post('/api/attendance/v2/group/disableById.json', params);
};

// 获取班次列表
export const _getShiftListPage = (params = {}) => {
    return post('/api/attendance/v2/shift/getListPage.json', params);
};

// 获取考勤默认参数
export const _getGroupDefaultConfig = (params = {}) => {
    return get('/api/attendance/v2/getDefaultInfo.json', params);
};

// 【班次】根据id获取班次信息
export const _getShiftById = (params = {}) => {
    return post('/api/attendance/v2/shift/getById.json', params);
};

// 【班次】根据code获取班次信息
export const _getShiftByCode = (params = {}) => {
    return post('/api/attendance/v2/shift/getByCode.json', params);
};