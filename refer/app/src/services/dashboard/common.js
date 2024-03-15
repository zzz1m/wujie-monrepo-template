import {
    get,
    post
} from '@/services/http';

// 获取菜单
export const _getMenuList = (params = {}) => {
    return get('/api/menu/my.json', params);
};
// 退出登录
export const _getLogout = (params = {}) => {
    return get('/api/user/logout.json', params);
};
// 获取用户信息
export const _getUserInfo = (params = {}) => {
    return get('/api/user/info.json', params);
};
// 获取 部门列表
export const _getDeptList = (params = {}) => {
    return get('/api/dept/deptTree.json', params);
};
// 获取 部门列表
export const _getDepartmentList = (params = {}) => {
    return get('/api/dept/allDeptTree.json', params);
};

// 获取部门列表 id为加密的
export const _getAllDeptTree = (params = {}) => {
    return post('/api/sys_dept/deptTreeInfo.json', params);
};

// 获取产品线部门列表
export const _getLineDeptList = (params = {}) => {
    return get('/api/dept/getProductLines.json', params);
};

/**
 * 根据用户权限获取部门树
 * @param {Object} params 
 */
export const _getDeptTreeByUser = (params = {}) => {
    return post('/api/sys/role/getDeptTreeByUser.json', params);
};

// 获取 部门列表
export const _getPartDepartmentList = (params = {}) => {
    return get('/api/dept/deptLeaderTree.json', params);
};
// 获取团队考勤页面列表------
export const _getRegionalDepartmentList = (params = {}) => {
    return get('/api/dept/ruleDeptTree.json', params);
};
// 获取 绩效部门列表
export const _getDeptLeaderKpiTree = (params = {}) => {
    return get('/api/dept/deptLeaderKpiTree.json', params);
};

/**
 * 指定条件获取数据字典列表数据
 * @param params
 * @returns {*}
 */

export const dictList = (dictType, params) => {
    return get(`/api/common/dict/get/${dictType}/list.json`, params);
};

/**
 * 内推字典列表数据
 * @param params
 * @returns {*}
 */

export const _dictList = (dictType, params) => {
    return get(`/api/job/dict/get/${dictType}/list.json`, params);
};


/*
 * 批量获取字典列表
 * @param {Object} params
 */
export const _batchGetDictInfo = (params) => {
    return post('/api/common/dict/batchGetDictInfo.json', params);
};

/**
 * 批量获取某一类型下的字典列表
 * @param {Object} params
 */
export const _getDictListByType = (params = {}) => {
    return get('/api/common/dict/getDictListByType.json', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};

/**
 * 根据部门获取产品线
 * @param {Object} params
 */
export const _findProductLineByDept = (params = {}) => {
    return post('/api/sys_dept/findProductLineByDept.json', params);
};

/**
 * @description 根据关键词搜索获取用户指定字段列表
 * @param {Object} params
 * @param {String} params.keyWord 输入关键字
 * @param {String} params.fieldList 展示字段，为空只返回 id、name、email 
 */
export const _fuzzySearch = (params = {}) => {
    return get('/api/user/fuzzySearch.json', params);
};


// 根据关键字搜索
export const _dictSearchByKeyword = (params = {}) => {
    return get('/api/common/dict/search.json', params);
};
/**
 * @description 获取模块更新提醒
 */
export const _getModulePoster = (params = {}) => {
    return get('/api/module/poster/getModulePoster.json', params);
};
/**
 * @description 模块更新关闭
 */
export const _viewModulePoster = (params = {}) => {
    return get('/api/module/poster/viewModulePoster.json', params);
};

/**
 * @description 获取用户资源
 */
export const _getResouces = (params = {}) => {
    return get('/api/menu/resouces.json', params);
};

/**
 * @description 导航排序
 */
export const _toolNavSort = (params = {}) => {
    return post('/api/homepage/v2/menu/sort.json', params);
};

// 获取菜单导航
export const _getNavlist = (params = {}) => {
    return get('/api/homepage/v2/menu/my.json', params);
};
// 更新菜单new状态
export const _updateNew = (params = {}) => {
    return post('/api/homepage/v2/menu/updateNew.json', params);
};

// 获取在线预览URL
export const _generatePreviewUrl = (params = {}) => {
    return get('/api/common/generatePreviewUrl', params);
};

//【工作地点】获取前两层
export const _getShowWorkplaceList = (params = {}) => {
    return get('/api/seat/place/getShowWorkplaceList.json', params);
};

//根据模块获取状态列表 - 4.6.0  // module
export const _getSysModuleStatusMap = (params = {}) => {
    return get('/api/common/module/getSysModuleStatusMap.json', params);
};

//根据模块和业务类型获取状态列表 - 4.6.0  // module  businessType
export const _getSysModuleStatusVO = (params = {}) => {
    return get('/api/common/module/getSysModuleStatusVO.json', params);
};

/**
 * 根据名称精确查找部门
 * @param {Object} params
 */
export const _findDeptByName = (params = {}) => {
    return post('/api/dept/findDeptByName.json', params);
};

// 获取城市列表 -4.9.9
export const _getCityList = (params = {}) => {
    return get('/api/common/dict/getCityList.json', params);
};
