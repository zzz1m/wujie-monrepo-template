import { get, post } from '@/services/http';

// 组织管理-创建部门
export const _createDept = (params = {}) => {
    return post('/api/sys_dept/createDept.json', params);
};

// 组织管理-修改部门
export const _updateDept = (params = {}) => {
    return post('/api/sys_dept/updateDept.json', params);
};

/**
 * 获取部门列表(树)
 * @param {Object} params
 */
export const _deptTreeInfo = (params = {}) => {
    return post('/api/sys_dept/deptTreeInfo.json', params);
};

/**
 * 更新部门排序
 * @param {Object} params
 */
export const _deptUpdateSort = (params = {}) => {
    return post('/api/sys_dept/updateSort.json', params);
};

// 组织管理-部门档案查询
export const _getArchiveList = (params = {}) => {
    return get('/api/sys_dept/getArchiveList.json', params);
};

// 组织管理-部门重复性校验
export const _repeatNameCheck = (params, config) => {
    return get('/api/sys_dept/repeatNameCheck.json', params, config);
};

// [部门] 删除
export const _deleteDept = (params = {}) => {
    return post('/api/sys_dept/deleteDept.json', params);
};

// 组织管理-查询部门信息
export const _getDeptInfoByDeptId = (params = {}) => {
    return get('/api/sys_dept/getDeptInfoByDeptId.json', params);
};

// 组织管理-部门划转
export const _transferDep = (params = {}) => {
    return post('/api/sys_dept/transfer.json', params);
};

// [部门] 更名
export const _renameDept = (params = {}) => {
    return post('/api/sys_dept/renameDept.json', params);
};

// 组织管理-负责人变更
export const _changeLeader = (params = {}) => {
    return post('/api/sys_dept/changeLeader.json', params);
};

// 组织管理-查询部门下员工和汇报人关系
export const _getUserReporterListByDeptId = (params = {}) => {
    return get('/api/sys_dept/getUserReporterListByDeptId.json', params);
};

// 获取部门所有子节点
export const _getAllDeptListByParentId = (params = {}) => {
    return get('/api/sys_dept/getAllDeptListByParentId.json', params);
};

// 组织管理-查询部门及子部门下用户信息
export const _sysDeptUserInfo = (params = {}) => {
    return get('/api/sys_dept/sysDeptUserInfo.json', params);
};

// [部门] 撤销
export const _revokeDept = (params = {}) => {
    return post('/api/sys_dept/revokeDept.json', params);
};

// 组织管理-人员划转
export const _transferUser = (params = {}) => {
    return post('/api/sys_dept/transferUser.json', params);
};

// 组织管理-部门合并
export const _combineDep = (params = {}) => {
    return post('/api/sys_dept/combine.json', params);
};

/**
 * 获取组织管理相关条件的枚举
 * @param {Object} params
 */
export const _deptEnumInfo = (params = {}) => {
    return get('/api/sys_dept/getDeptEnumInfo.json', params);
};

/**
 * 组织管理-获取快照时间节点
 * @param {Object} params
 */
export const _deptSnapshot = (params = {}) => {
    return get('/api/sys_dept/deptSnapshot.json', params);
};

/**
 * 素质要素-列表
 * @param {Object} params
 */
export const _qualityList = (params = {}) => {
    return get('/api/sys/quality/list.json', params);
};

/**
 * 素质要素-保存
 * @param {Object} params
 */
export const _qualitySave = (params = {}) => {
    return post('/api/sys/quality/insertOrUpdate.json', params);
};

/**
 * 素质要素-启用、停用
 * @param {Object} params
 */
export const _qualityStatus = (params = {}) => {
    return get('/api/sys/quality/status.json', params);
};

/**
 * 素质要素-删除
 * @param {Object} params
 */
export const _qualityDel = (params = {}) => {
    return get('/api/sys/quality/delete.json', params);
};

/**
 * 素质要素-下拉列表
 * @param {Object} params
 */
export const _qualityEnableList = (params = {}) => {
    return get('/api/sys/quality/enable/list.json', params);
};

/**
 * 岗位胜任力模型-列表
 * @param {Object} params
 */
export const _modelList = (params = {}) => {
    return get('/api/sys/position/competence/model.json', params);
};

/**
 * 岗位胜任力模型-保存
 * @param {Object} params
 */
export const _modelSave = (params = {}) => {
    return post('/api/sys/position/competence/edit.json', params);
};

/**
 * 岗位胜任力模型-获取职级
 * @param {Object} params
 */
export const _seqLevel = (params = {}) => {
    return get('/api/user/competence/seqLevel.json', params);
};

/**
 * 岗位胜任力模型-雷达编辑回显
 * @param {Object} params
 */
export const _requireInfo = (params = {}) => {
    return get('/api/sys/position/competence/require/info.json', params);
};

/**
 * 岗位胜任力模型-雷达编辑保存
 * @param {Object} params
 */
export const _requireSave = (params = {}) => {
    return post('/api/sys/position/competence/require/edit.json', params);
};

/**
 * 岗位胜任力模型-获取序列
 * @param {Object} params
 */
export const _getAllTypeList = (params = {}) => {
    return get('/api/sys/position/competence/seq/list.json', params);
};

/**
 * 岗位胜任力模型-获取子序列
 * @param {Object} params
 */
export const _seqSubList = (params = {}) => {
    return get('/api/sys/position/competence/sub/list.json', params);
};

/**
 * 岗位胜任力模型-标准岗位
 * @param {Object} params
 */
export const _seqPositionList = (params = {}) => {
    return get('/api/sys/position/competence/position/list.json', params);
};