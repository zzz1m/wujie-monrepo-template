import { get, post } from '@/services/http';

// [日志] 日志列表
export const _logList = (params = {}) => {
    return post('/api/sys/log/list.json', params);
};
// [日志] 日志导出
export const _logExport = (params = {}) => {
    return get('/api/sys/log/export.json', params);
};
// 【学校管理】获取学校列表
export const _schoolList = (params = {}) => {
    return get('/api/talentatlas/school/list.json', params);
};
// 【学校管理】新增或编辑
export const _schoolUpdate = (params = {}) => {
    return post('/api/talentatlas/school/addOrEdit.json', params);
};
// 【学校管理】删除
export const _schoolDel = (params = {}) => {
    return post('/api/talentatlas/school/delete.json', params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【公司管理】获取公司列表
export const _companyList = (params = {}) => {
    return get('/api/talentatlas/company/list.json', params);
};
// 【公司档案】通过别名模糊搜索公司名称
export const _searchCompanyByAlias = (params = {}) => {
    return get('/api/talentatlas/company/searchByAlias.json', params);
};
// 【公司管理】新增或编辑
export const _companyUpdate = (params = {}) => {
    return post('/api/talentatlas/company/addOrEdit.json', params);
};
// 【公司管理】删除
export const _companyDel = (params = {}) => {
    return post('/api/talentatlas/company/delete.json', params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};


