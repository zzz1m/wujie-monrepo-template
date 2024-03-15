//排班管理相关api

import {
    get,
    post
} from '@/services/http';

// 【排班】获取排班日历
export const _getScheduleCalendar = (params) => {
    return post('/api/attendance/v2/schedule/getCalendar.json', params);
};

// 【排班】获取排班信息
export const _getScheduleResult = (params) => {
    return post('/api/attendance/v2/schedule/getScheduleResult.json', params);
};

// 【排班】保存排班信息
export const _saveResult = (params) => {
    return post('/api/attendance/v2/schedule/saveResult.json', params);
};

// 【排班】获取排班统计
export const _getScheduleSummary = (params) => {
    return post('/api/attendance/v2/schedule/getSummary.json', params);
};

// 【排班】获取班次统计
export const _getScheduleResultSummary = (params) => {
    return post('/api/attendance/v2/schedule/getScheduleResultSummary.json', params);
};

// 【排班】自动排班
export const _autoSchedule = (params) => {
    return post('/api/attendance/v2/schedule/autoSchedule.json', params);
};


//【排班】锁定排班日期【4.1.8新增】
export const _lockScheduleDate = (params = {}) => {
    return post('/api/attendance/v2/schedule/lockScheduleDate.json', params);
};

// 获取指定日期范围内的排班人员
export const _getScheduleUserListByDate = (params = {}) => {
    return post('/api/attendance/v2/schedule/getScheduleUserListByDate.json', params);
};

// 【排班】获取组织架构反查树【4.1.8】
export const _getDeptTreeByGroupCode = (params = {}) => {
    return post('/api/attendance/v2/schedule/getDeptTreeByGroupCode.json', params);
};

// 【排班】获取末级部门列表【4.1.8】
export const _getDeptListByGroupCode = (params = {}) => {
    return post('/api/attendance/v2/schedule/getDeptListByGroupCode.json', params);
};

// 人员班次统计保存【4.1.8】
export const _saveScheduleSummary = (params = {}) => {
    return post('/api/attendance/v2/schedule/saveScheduleSummary.json', params);
};

// 获取已有排班人数
export const _getScheduleUserCount = (params = {}) => {
    return post('/api/attendance/v2/schedule/getScheduleUserCount.json', params);
};