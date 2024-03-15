import { get, post } from '@/services/http';
const formHeader =  {'Content-Type': 'application/x-www-form-urlencoded'};

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
// 渠道管理列表
export const _getChannelList = (params = {}) => {
    return get('/api/mall/channel/getMallChannelList.json', params);
};

// 创建渠道
export const _createOrEditMallChannel = (params = {}) => {
    return post(`/api/mall/channel/${params.id ? 'updateMallChannel' : 'createMallChannel' }.json`, params);
};

// 删除渠道
export const _deleteMallChannel = (params = {}) => {
    return post('/api/mall/channel/deleteMallChannel.json', params, {headers});
};

// 获取渠道详情
export const _getMallChannelById = (params = {}) => {
    return get('/api/mall/channel/getMallChannelById.json', params);
};

// 启用禁用渠道
export const _enableOrDisableChannel = (params = {}) => {
    return post(`/api/mall/channel/${params.type}.json`, {
        id: params.id
    }, {headers});
};

// 积分管理列表
export const _getPointList = (params = {}) => {
    return get('/api/mall/point/list.json', params);
};

// 【积分流水表】发放/回收积分[4.6.1]
export const _modifyPointFlow = (params = {}) => {
    return post('/api/mall/pointsFlow/modifyPointFlow.json', params);
};

// 积分变更列表
export const _getPointsFlowList = (params = {}) => {
    return get('/api/mall/pointsFlow/list.json', params);
};

// 商品列表查询
export const _getProductList = (params = {}) => {
    return post('/api/mall/product/pageList.json', params);
};

// 创建编辑商品
export const _createOrUpdateProduct = (params = {}) => {
    return post(`/api/mall/product/${params.id ? 'updateMallProduct' : 'createMallProduct'}.json`, params);
};

// 删除商品
export const _deleteMallProduct = (params = {}) => {
    return post('/api/mall/product/deleteMallProduct.json', params, {headers});
};

// 更新商品状态（上架、下架等）
export const _updateMallProductStatus = (params = {}) => {
    return post('/api/mall/product/updateMallProductStatus.json', params, {headers});
};

// 查询商品详情
export const _getMallProductDetail = (params = {}) => {
    return get('/api/mall/product/getMallProductDetail.json', params);
};

// 自提点列表
export const _getAddressList = (params = {}) => {
    return get('/api/mall/pickup/address/getList.json', params);
};

// 创建编辑自提点
export const _createOrEditMallPickupAddress = (params = {}) => {
    return post(`/api/mall/pickup/address/${params.id ? 'editMallPickupAddress' : 'createMallPickupAddress'}.json`, params);
};

// 启用和停用渠道 
export const _enableOrDisable = (params = {}) => {
    return post(`/api/mall/pickup/address/${params.type}.json`, {
        id: params.id
    }, {headers});
};
// 根据id查询自提点
export const _getPickAddrVOById = (params = {}) => {
    return get('/api/mall/pickup/address/getPickAddrVOById.json', params);
};


// 根据ID查询自提规则
export const _getPickupLimitAddrVOById = (params = {}) => {
    return get('/api/mall/pickup/limit/getPickupLimitAddrVOById.json', params);
};
// 自提点规则列表
export const _limitList = (params = {}) => {
    return get('/api/mall/pickup/limit/getList.json', params);
};

// 创建编辑自提点规则
export const _createOrEditMallPickupRule = (params = {}) => {
    return post(`/api/mall/pickup/limit/${params.id ? 'editMallPickupLimit' : 'createMallPickupLimit'}.json`, params);
};

// 获取订单列表
export const _getOrderList = (params= {}) => {
    return post('/api/mall/order/listPage.json', params);
};

// 获取订单详情
export const _orderGetById = (params = {}) => {
    return get('/api/mall/order/getById.json', params);
};

// 获取订单列表
export const _updateExpressStatus = (params= {}) => {
    return post('/api/mall/order/updateExpressStatus.json', params);
};

// 获取角色列表
export const _getRoleList = (params= {}) => {
    return get('/api/mall/role/list.json', params);
};


// 获取角色列表
export const _roleSave = (params= {}) => {
    return post('/api/mall/role/save.json', params);
};

// 角色删除
export const _roleDel = (params= {}) => {
    return post('/api/mall/role/delete.json', params);
};

// 获取活动列表
export const _activityListPage = (params= {}) => {
    return post('/api/mall/activity/listPage.json', params);
};

// 获取活动详情
export const _activityGetById = (params= {}) => {
    return get('/api/mall/activity/getById.json', params);
};


// 创建编辑活动
export const _addOrEditActivity = (params = {}) => {
    return post(`/api/mall/activity/${params.id ? 'edit' : 'add'}.json`, params);
};

// 发布下线
export const _activityPublish = (params= {}) => {
    return post(`/api/mall/activity/${params.type}.json`, {
        id: params.id
    });
};

// 删除活动
export const _delActivity = (params= {}) => {
    return post('/api/mall/activity/delete.json', params);
};

// 获取活动详情
export const _updateTags = (params= {}) => {
    return post('/api/mall/activity/updateTags.json', params);
};

// 列表查询 
export const _getTagList = (params= {}) => {
    return post('/api/mall/tag/listPage.json', params);
};

// 根据id获取标签详情
export const _tagGetById = (params= {}) => {
    return get('/api/mall/tag/getById.json', params);
};

// 新增修改详情
export const _tagAddOrUpdate = (params= {}) => {
    return get(`/api/mall/tag/${params.id ? 'edit' : 'add'}.json`, params);
};

// 删除标签  
export const _tagDeleteById = (params= {}) => {
    return post('/api/mall/tag/deleteById.json', params);
};

// 获取订单状态列表
export const _getStatusList = (params= {}) => {
    return post('/api/mall/order/getStatusList.json', params);
};

// 编辑快递地址
export const _editDeliveryAddr = (params= {}) => {
    return post('/api/mall/order/editDeliveryAddr.json', params);
};

// 编辑tag地址
export const _addOrEditTag = (params= {}) => {
    return post(`/api/mall/tag/${params.id ? 'edit' : 'add'}.json`, params);
};

// 编辑tag地址
export const _activityUpdateTags = (params= {}) => {
    return post(`/api/mall/activity/updateTags.json`, params);
};

// 编辑tag地址
export const _getListByChannelId = (params= {}) => {
    return get(`/api/mall/pickup/address/getListByChannelId.json`, params);
};

// 编辑二维码
export const _getPreviewQrCode = (params= {}) => {
    return post(`/api/mall/activity/getPreviewQrCode.json`, params);
};

// 角色删除
export const _deleteMallPickupLimit = (params= {}) => {
    return post(`/api/mall/pickup/limit/deleteMallPickupLimit.json?id=${params.id}`);
};

// 补库存
export const _addInventory = (params= {}) => {
    return post(`/api/mall/product/addInventory.json`, params);
};

// 【积分规则-列表】
export const _ruleList = (params= {}) => {
    return post(`/api/mall/point/rule/list.json`, params);
};

// 【积分规则-获取详情】
export const _getRuleInfo = (params= {}) => {
    return get(`/api/mall/point/rule/getInfo.json`, params);
};

// 【积分规则-删除规则
export const _ruleDelete = (params= {}) => {
    return post(`/api/mall/point/rule/delete.json`, params);
};

// 【积分规则-创建编辑规则】
export const _ruleInsertOrUpdate = (params= {}) => {
    return post(`/api/mall/point/rule/${params.id ? 'update' : 'insert'}.json`, params);
};

// 【积分规则-启停用】
// /api/mall/point/rule/enable.json
export const _ruleState = (params= {}, state) => {
    return post(`/api/mall/point/rule/${state === '1' ? 'enable' : 'disable'}.json`, params);
};


export const _configMallChannel = (params= {}, state) => {
    return post(`/api/mall/channel/configMallChannel.json`, params);
};

export const _getPreviewQrCode1 = (params= {}, state) => {
    return post(`/api/mall/channel/getPreviewQrCode.json`, params);
};


