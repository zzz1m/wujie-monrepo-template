import { get, post } from '@/services/http';

// 【字典管理】新增字典
export const _addDict = (params = {}) => {
    return post('/api/office_supply/config/dict/add.json', params);
};

// 【字典管理】编辑字典
export const _editDict = (params = {}) => {
    return post('/api/office_supply/config/dict/edit.json', params);
};

// 【字典管理】启用字典
export const _dictEnable = (params = {}) => {
    return post('/api/office_supply/config/dict/enable.json', params);
};

// 【字典管理】停用字典
export const _dictDisable = (params = {}) => {
    return post('/api/office_supply/config/dict/disable.json', params);
};

// 【字典管理】删除字典
export const _delDict = (params = {}) => {
    return post('/api/office_supply/config/dict/delete.json', params);
};

// 【字典管理】字典排序
export const _dictSort = (params = {}) => {
    return post('/api/office_supply/config/dict/sort.json', params);
};


// 【办公物品种类管理】种类列表
export const _specialsListPage = (params = {}) => {
    return post('/api/office_supply/config/species/listPage.json', params);
};

// 【办公物品种类管理】创建编辑商品
export const _speciesAddOrEdit = (params = {}) => {
    return post(`/api/office_supply/config/species/${params.id ? 'edit' : 'add'}.json`, params);
};

// 【办公物品种类管理】删除商品
export const _speciesDelete = (params = {}) => {
    return post(`/api/office_supply/config/species/delete.json`, params);
};


// 【授权管理】授权列表
export const _authListPage = (params = {}) => {
    return post('/api/office_supply/config/auth/listPage.json', params);
};

// 【授权管理】获取授权信息
export const _getById = (params = {}) => {
    return post('/api/office_supply/config/auth/getById.json', params);
};

// 【授权管理】编辑授权信息
export const _authAddOrEdit = (params = {}) => {
    return post(`/api/office_supply/config/auth/${params.id ? 'edit' : 'add'}.json`, params);
};

//【入职包管理】获取入职包列表
export const _entryPackageListPage = (params = {}) => {
    return post(`/api/office_supply/config/entry_package/listPage.json`, params);
};

//【入职包管理】添加编辑入职包
export const _entryPackageAddOrEdit = (params = {}) => {
    return post(`/api/office_supply/config/entry_package/${params.id ? 'edit' : 'add'}.json`, params);
};

//【入职包管理】上架/下架
export const _entryPackageUpdateState = (params = {}) => {
    return post(`/api/office_supply/config/entry_package/updateState.json`, params);
};

//【办公物品种类管理】获取商品详情
export const _speciesGetById = (params = {}) => {
    return post(`/api/office_supply/config/species/getById.json`, params);
};


//【字典管理】字典列表
export const _getDictEditList = (params = {}) => {
    return post(`/api/office_supply/config/dict/list.json`, params);
};

//【字典管理】字典类型列表
export const _dicTypeList = (params = {}) => {
    return get(`/api/office_supply/config/dict/typeList.json`, params);
};


//【入职包管理】根据id获取入职包详情
export const _getEntryPackageById = (params = {}) => {
    return post(`/api/office_supply/config/entry_package/getById.json`, params);
};

