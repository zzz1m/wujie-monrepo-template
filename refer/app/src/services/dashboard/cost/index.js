import { get, post } from '@/services/http';

// 成本中心树
export const _getCostTree = (params = {}) => {
    return get('/api/cost/center/deptTree.json', params);
};

// 成本中心子树
export const _getCostChildTree = (params = {}) => {
    return get('/api/cost/center/getChildDept.json', params);
};

// 成本中心编辑
export const _editCost = (params = {}) => {
    return post('/api/cost/center/save.json', params);
};

// 成本中心列表
export const _getCostList = (params = {}) => {
    return get('/api/cost/center/centerType.json', params);
};

// 【订单】获取快递订单列表
export const _orderList = (params = {}) => {
    return post('/api/express/order/list.json', params);
};

// 获取下拉查询信息
export const _orderDropDown = (params = {}) => {
    return get('/api/express/order/dropDown.json', params);
};


