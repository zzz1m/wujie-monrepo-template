import { get, post } from '@/services/http';

// 组织管理-部门枚举
export const _getDeptEnumInfo = (params = {}) => {
    return get('/api/sys_dept/getDeptEnumInfo.json', params);
};

// 组织管理-工作地点
export const _workplaceList = (params = {}) => {
    return get('/api/common/dict/get/workplace/list.json', params);
};