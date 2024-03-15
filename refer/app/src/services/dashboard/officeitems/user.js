import { get, post } from '@/services/http';
// 办公物品

// 获取工作地点下拉
export const _workplace = (params = {}) => {
    return get('/api/common/dict/get/workplace/listForUser.json', params);
};

// 获取领取类型下的物品
export const _getList = (params = {}) => {
    return get('/api/office_supply/species/acquireType/getList.json', params);
};

// 获取物品详情
export const _getDetail = (params = {}) => { 
    return get('/api/office_supply/species/acquireType/getDetail.json', params);
};

// 校验库存
export const _checkInventory = (params = {}) => {
    return get('/api/office_supply/species/acquireType/checkInventory.json', params, { quiet: true });
};

// 领用
export const _acquire = (params = {}) => {
    return post('/api/office_supply/species/acquireType/acquire.json', params);
};

// 批量领用
export const _batchAcquire = (params = {}) => {
    return post('/api/office_supply/species/acquireType/batchAcquire.json', params);
};

// 获取我的（数量）
export const _count = (params = {}) => {
    return get('/api/office_supply/species/my/count.json', params);
};

// 我的-获取领取记录[全部、待领取，审批中，已领取]
export const _recordacquire = (params = {}) => {
    return post('/api/office_supply/species/my/record/acquireList.json', params);
};

// 获取领取二维码
export const _qr = (params = {}) => {
    return get('/api/office_supply/species/my/acquire/qr.json', params);
};

// 获取领取详情（给核销人员展示）
export const _acquireinfo = (params = {}) => {
    return get('/api/office_supply/species/my/acquire/info.json', params);
};

// 取消领用
export const _cancel = (params = {}) => {
    return post('/api/office_supply/species/my/acquire/cancel.json', params);
};

// 核销
export const _verify = (params = {}) => {
    return post('/api/office_supply/species/my/acquire/verify.json', params);
};

// 获取损坏记录列表
export const _listPage = (params = {}) => {
    return get('/api/office_supply/species/my/destroy/listPage.json', params);
};

// 获取归还记录列表
export const _returnlistPage = (params = {}) => {
    return get('/api/office_supply/species/my/return/listPage.json', params);
};

// 归还
export const _return = (params = {}) => {
    return get('/api/office_supply/species/my/return.json', params);
};

// 获取待归还记录列表
export const _occupied = (params = {}) => {
    return get('/api/office_supply/species/my/return/occupied.json', params);
};

// 获取【全部】归还，待归还记录列表
export const _allList = (params = {}) => {
    return get('/api/office_supply/species/my/return/allList.json', params);
};

// 领取扫码回调
export const _swapCall = (params = {}) => {
    return get('/api/office_supply/species/swapCall.json', params);
};

// 归还扫码回调
export const _myswapCall = (params = {}) => {
    return get('/api/office_supply/species/my/return/swapCall.json', params);
};

// 领取获取扫码结果
export const _swapResult = (params = {}) => {
    return get('/api/office_supply/species/my/acquire/swapResult.json', params);
};

// 归还获取扫码结果
export const _myswapResult = (params = {}) => {
    return get('/api/office_supply/species/my/return/swapResult.json', params);
};
