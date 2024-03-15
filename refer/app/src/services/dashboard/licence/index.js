import { get, post } from '@/services/http';

// 证照管理-编辑证照
export const _updateLicense = (params = {}) => {
    return post('/api/license/updateLicense.json', params);
};

// 证照管理-新增证照
export const _insertLicense = (params = {}) => {
    return post('/api/license/insertLicense.json', params);
};

// 证照管理-获取详情
export const _getLicenseById = (params = {}) => {
    return post('/api/license/getLicenseById.json', params);
};

// 证照管理-获取列表
export const _listLicense = (params = {}) => {
    return post('/api/license/listLicense.json', params);
};

// 证照管理-注销证照
export const _cancelLicense = (params = {}) => {
    return post('/api/license/cancelLicense.json', params);
};
// 证照管理-恢复证照
export const _restoreLicense = (params = {}) => {
    return post('/api/license/restoreLicense.json', params);
};

// 证照管理-删除证照
export const _deleteLicense = (params = {}) => {
    return post('/api/license/deleteLicense.json', params);
};

// 证照管理-借阅证照
export const _borrowLicense = (params = {}) => {
    return post('/api/license/borrowLicense.json', params);
};

// 证照管理-借阅证照
export const _borrowGetById = (params = {}) => {
    return post('/api/license/borrow/getById.json', params);
};


// 证照管理-证照借阅登记
export const _registBorrow = (params = {}) => {
    return post('/api/license/registBorrow.json', params);
};

// 证照管理-获取借阅列表
export const _borrowList = (params = {}) => {
    return post('/api/license/borrow/list.json', params);
};

// 公司管理-下拉列表
export const _relationList = (params = {}) => {
    return post('/api/license/company/relationList.json', params);
};

// 证照管理-根据公司获取证照列表
export const _listByCompany = (params = {}) => {
    return post('/api/license/listByCompany.json', params);
};

// 公司管理-列表
export const _companyList = (params = {}) => {
    return post('/api/license/company/list.json', params);
};

// 公司管理-启用
export const _enable = (params = {}) => {
    return post('/api/license/company/enable.json', params);
};

// 公司管理-注销
export const _cancel = (params = {}) => {
    return post('/api/license/company/cancel.json', params);
};

// 公司管理-删除
export const _delete = (params = {}) => {
    return post('/api/license/company/delete.json', params);
};

// 公司管理-创建
export const _add = (params = {}) => {
    return post('/api/license/company/add.json', params);
};

// 公司管理-编辑回显
export const _detail = (params = {}) => {
    return post('/api/license/company/detail.json', params);
};

// 公司管理-编辑-保存
export const _update = (params = {}) => {
    return post('/api/license/company/edit.json', params);
};

// 公司管理-总公司-下拉列表
export const _relationHeadList = (params = {}) => {
    return post('/api/license/company/relationHeadList.json', params);
};

// 账户管理-列表
export const _accountList = (params = {}) => {
    return post('/api/license/account/list.json', params);
};

// 账户管理-删除
export const _accountDelete = (params = {}) => {
    return post('/api/license/account/delete.json', params);
};

// 账户管理-编辑-回显
export const _accountDetail = (params = {}) => {
    return post('/api/license/account/detail.json', params);
};

// 账户管理-新增-保存
export const _accountAdd = (params = {}) => {
    return post('/api/license/account/add.json', params);
};

// 账户管理-编辑-保存
export const _accountEdit = (params = {}) => {
    return post('/api/license/account/edit.json', params);
};

// 证照借阅-借出
export const _borrowLend = (params = {}) => {
    return post('/api/license/borrow/lend.json', params);
};

// 证照借阅-签收
export const _signIn = (params = {}) => {
    return post('/api/license/borrow/signIn.json', params);
};

// 证照借阅-归还
export const _giveBack = (params = {}) => {
    return post('/api/license/borrow/giveback.json', params);
};

// 证照借阅-作废
export const _invalid = (params = {}) => {
    return post('/api/license/borrow/invalid.json', params);
};

// 获取授权列表
export const _licenseAuthPageList = (params = {}) => {
    return post('/api/license/auth/pageList.json', params);
};
// 新增授权
export const _licenseAuthInsertAuth = (params = {}) => {
    return post('/api/license/auth/insertAuth.json', params);
};

// 更新授权
export const _licenseAuthUpdateAuth = (params = {}) => {
    return post('/api/license/auth/updateAuth.json', params);
};

// 删除授权
export const _licenseAuthDeleteById = (params = {}) => {
    return post('/api/license/auth/deleteById.json', params);
};


export const _licenseAuthGetById = (params = {}) => {
    return get('/api/license/auth/getById.json', params);
};