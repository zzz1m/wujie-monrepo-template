import { get, post } from '@/services/http';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};


// 获取领取记录列表
export const _takeListPage = (params = {}) => {
    return post('/api/office_supply/record/take/listPage.json', params);
};

// 获取工作地点下拉
export const _workplace = (params = {}) => {
    return get('/api/office_supply/common/take/workplace.json', params);
    // return get('/api/office_supply/record/take/workplace.json', params);
};

// 通用-工作地点
export const _allWorkplaceList = (params = {}) => {
    return get('/api/common/dict/get/workplace/list.json', params);
};


// 获取工作地点下的入职包
export const _entryPackage = (params = {}) => {
    return get('/api/office_supply/record/take/entryPackage.json', params);
};

// 添加领用记录
export const _recordTakeAdd = (params = {}) => {
    return post('/api/office_supply/record/take/add.json', params);
};

// 获取领取类型下的物品
export const _acquireTypeList = (params = {}) => {
    return get('/api/office_supply/species/acquireType/getList.json', params);
};

// 发送领用通知(长期借用)
export const _sendNotice = (params = {}) => {
    return post('/api/office_supply/record/take/sendNotice.json', params);
};

// 获取归还记录列表
export const _returnListPage = (params = {}) => {
    return post('/api/office_supply/record/return/listPage.json', params);
};

// 添加归还记录
export const _returnAdd = (params = {}) => {
    return post('/api/office_supply/record/return/add.json', params);
};

// 获取损坏记录列表
export const _destroyListPage = (params = {}) => {
    return post('/api/office_supply/record/destroy/listPage.json', params);
};

// 添加损坏记录
export const _destroyAdd = (params = {}) => {
    return post('/api/office_supply/record/destroy/add.json', params);
};

// 获取待归还列表
export const _occupiedListPage = (params = {}) => {
    return post('/api/office_supply/record/occupied/listPage.json', params);
};

// 待归还列表---发送归还提醒
export const _occupiedSendNotice = (params = {}) => {
    return post('/api/office_supply/record/occupied/sendNotice.json', params);
};

// 获取归还、损坏下拉 待归还物品 & 数量
export const _occupiedCount = (params = {}) => {
    return get('/api/office_supply/record/occupied/count.json', params);
};

/****
 * 库存管理
 */
// 库存列表
export const _inventoryListPage = (params = {}) => {
    return post('/api/office_supply/inventory/listPage.json', params);
};

// 添加领用记录检查
export const _takeAddCheck = (params = {}) => {
    return post('/api/office_supply/record/take/addCheck.json', params);
};

// 上架/下架
export const _inventoryUpdateState = (params = {}) => {
    return post('/api/office_supply/inventory/updateState.json', params);
};

// 保存
export const _inventoryEdit = (params = {}) => {
    return post('/api/office_supply/inventory/edit.json', params);
};

// 保存预警
export const _inventoryEditAlarm = (params = {}) => {
    return post('/api/office_supply/inventory/editAlarm.json', params);
};



// 获取库存详情
export const _getInventoryById = (params = {}) => {
    return get('/api/office_supply/inventory/getById.json', params);
};

// 获取工作地点库存列表
export const _getListByWorkplace = (params = {}) => {
    return post('/api/office_supply/inventory/getListByWorkplace.json', params);
};

// 获取工作地点库存列表
export const _inventoryTransfer = (params = {}) => {
    return post('/api/office_supply/inventory/transfer.json', params);
};

/**
 * 我的盘点
 */
// 【我的盘点】
export const _checkMyListPage = (params = {}) => {
    return post('/api/office_supply/check/my/listPage.json', params);
};

// 【我的盘点】获取盘点明细
export const _checkMyDetail = (params = {}) => {
    return post('/api/office_supply/check/my/getDetail.json', params);
};

// 【我的盘点】保存或提交 盘点明细
export const _checkMySave = (params = {}, isSubmit) => {
    return post(`/api/office_supply/check/my/${isSubmit ? 'submit' : 'save'}.json`, params);
};


// 【盘点管理】盘点列表
export const _checkListPage = (params = {}) => {
    return post(`/api/office_supply/check/listPage.json`, params);
};


// 【盘点管理】获取盘点详情
export const _checkDetailList = (params = {}) => {
    return post(`/api/office_supply/check/detailList.json`, params);
};

// 【盘点管理】创建编辑盘点
export const _checkAddOrEdit = (params = {}) => {
    return post(`/api/office_supply/check/${params.id ? 'edit' : 'add'}.json`, params);
};

// 【盘点管理】删除盘点
export const _checkDelete = (params = {}) => {
    return post(`/api/office_supply/check/delete.json`, params);
};

// 【盘点管理】结束盘点
export const _checkComplete = (params = {}) => {
    return post(`/api/office_supply/check/complete.json`, params);
};

// 入职人员列表
export const _entryListPage = (params = {}) => {
    return post(`/api/office_supply/entry/listPage.json`, params);
};

// 入职包准备
export const _entryPrepare = (params = {}) => {
    return post(`/api/office_supply/entry/prepare.json`, params);
};

// 入职包忽略
export const _entryIgnore = (params = {}) => {
    return post(`/api/office_supply/entry/ignore.json`, params);
};

// 入职包取消领取
export const _entryCancel = (params = {}) => {
    return post(`/api/office_supply/entry/cancel.json`, params);
};

// 获取台帐列表
export const _summaryListPage = (params = {}) => {
    return post(`/api/office_supply/summary/listPage.json`, params);
};

// 【授权管理】根据工作地点获取授权信息
export const _getByWorkplace = (params = {}) => {
    return post(`/api/office_supply/config/auth/getByWorkplace.json`, params);
};

// 库存详情
export const _getInventoryDetail = (params = {}) => {
    return post(`/api/office_supply/inventory/getDetail.json`, params);
};

//【通用】获取物品列表下拉
export const _getSpeciesList = (params = {}) => {
    return post(`/api/office_supply/common/species/list.json`, params);
};

// 获取工作地址下的入职包 (入职包准备)
export const _getEntryPackageByWorkplace = (params = {}) => {
    return post(`/api/office_supply/entry/getEntryPackageByWorkplace.json`, params);
};


// 获取入库记录
export const _getInboundList = (params = {}) => {
    return post(`/api/office_supply/inventory/getInboundList.json`, params);
};

// 获取出库记录
export const _getOutboundList = (params = {}) => {
    return post(`/api/office_supply/inventory/getOutboundList.json`, params);
};

// 获取盘点记录
export const _getCheckList = (params = {}) => {
    return post(`/api/office_supply/inventory/getCheckList.json`, params);
};

// 获取损坏记录
export const _getDestroyList= (params = {}) => {
    return post(`/api/office_supply/inventory/getDestroyList.json`, params);
};

// 获取归还记录
export const _getReturnList = (params = {}) => {
    return post(`/api/office_supply/inventory/getReturnList.json`, params);
};


// 【盘点管理】根据id获取盘点信息
export const _getCheckDetailList = (params = {}) => {
    return get(`/api/office_supply/check/getById.json`, params);
};

// 【盘点管理】获取盘点明细
export const _getCheckRecordList= (params = {}) => {
    return post(`/api/office_supply/check/recordList.json`, params);
};

// 【通用】获取办公用品管理员授权的工作地点下拉
export const _authWorkplaceList = (params = {}) => {
    return get(`/api/office_supply/common/auth/workplaceList.json`, params);
};




