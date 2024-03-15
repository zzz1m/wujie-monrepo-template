import {
    get,
    post
} from '@/services/http';

// 获取员工列表
export const _getStaffList = (params = {}) => {
    return get('/api/user/userinfos.json', params);
};
// 编辑员工
export const _postStaffEdit = (params = {}) => {
    return post('/api/user/edit/save.json', params);
};
//更新部门信息
export const _postDeptUpdate = (params = {}) => {
    return post('/api/dept/updateDept.json', params);
};
// 获取全员（修改部门leader）
export const _getAllUserinfo = (params = {}) => {
    return get('/api/user/allUserinfo.json', params);
};

/**
 * 获取所有数据字典列表
 * @param params (page, pageSize)
 * @returns {*}
 * @private
 */
export const _getAllDictList = (params = {}) => {
    return get('/api/common/dict/getAllDictList.json', params);
};

/**
 * 增加 数据字典
 * @param params
 * @returns {*}
 * @private
 */
export const _setAddDict = (params = {}) => {
    return post('/api/job/dict/addDict.json', params);
};

/**
 * 编辑 数据字典
 * @param params
 * @returns {*}
 * @private
 */
export const _setEditDict = (params = {}) => {
    return post('/api/job/dict/editDict.json', params);
};

/**
 * 删除数据字典
 * @param params
 * @returns {*}
 * @private
 */
export const _setDelDict = (params = {}) => {
    return get('/api/job/dict/delDict.json', params);
};



//管理规则列表
export const _getSpecialList=(params = {})=>{
    return get('/api/special/list.json', params);
};
//增加管理规则
export const _postSpecialAdd=(params = {})=>{
    return post('/api/special/add.json', params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
//管理规则
export const _postSpecialModify=(params = {})=>{
    return post('/api/special/modify.json', params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
//删除管理规则
export const _getSpecialDelete=(params = {})=>{
    return get('/api/special/delete.json', params);
};
// 获取 部门列表(管理组织)
export const _getDepartmentList = (params = {}) => {
    return get('/api/dept/baseDeptTree.json', params);
};
//获取 管理员/管理人员/剔除人员
export const _getUserSearch=(params = {})=>{
    return get('/api/user/search.json', params);
};

// 通用 全局通用人员搜索
export const _commonUserSearch = (params = {})=>{
    return get('/api/common/userSearch.json', params);
};
