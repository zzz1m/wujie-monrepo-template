import { get, post } from '@/services/http';

const config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
};

// 【工位管理】获取了楼层的整个地图信息
export const _getSeatGgraphMap = (params = {}) => {
    return get('/api/seat/graph/map.json', params);
};

// 【工位管理】获取版本列表
export const _getVersionList = (params = {}) => {
    return get('/api/seat/graph/versionList.json', params);
};

// 【工位管理】添加平面图
export const _addGraph = (params = {}) => {
    return post('/api/seat/graph/add.json', params);
};
// 【工位管理】删除平面图
export const _delGraph = ({id}) => {
    return post(`/api/seat/graph/delete.json?id=${id}`);
};

// 【工位管理】批量删除区域
export const _delArea = (params = {}) => {
    return post(`/api/seat/area/delete.json`, params);
};
// 【工位管理】批量删除工位
export const _delSeats = (params = {}) => {
    return post('/api/seat/delete.json', params);
};

// 【工位管理】批量更新工位
export const _batchUpdateSeats = (params = {}, options = {}) => {
    return post('/api/seat/update.json', params, options);
};

// 【工位管理】发布平面图
export const _pubGraph = ({id}) => {
    return post(`/api/seat/graph/publish.json?id=${id}`);
};

// 【工位管理】生成工位编号
export const _genSeatCode = (params = {}) => {
    return get('/api/seat/genCode.json', params);
};
// 【工位管理】批量添加工位
export const _addSeat = (params = {}) => {
    return post(`/api/seat/add.json`, params);
};

// 【工位管理】增加区域
export const _addArea = (params = {}) => {
    return post(`/api/seat/area/add.json`, params);
};

// 【工位管理】更新区域
export const _updateArea = (params = {}) => {
    return post(`/api/seat/area/update.json`, params);
};

// 【工位管理】获取工作地点下拉列表
export const _getGraphWorkplaceList = (params = {}) => {
    return get('/api/seat/graph/workplaceList.json', params);
};

// 【工位管理】获取楼层工位管理列表
export const _getGraphList = (params = {}) => {
    return get('/api/seat/graph/list.json', params);
};


// 【工位分配】获取工作地点下拉列表
export const _getUserWorkplaceList = (params = {}) => {
    return get('/api/seat/user/workplaceList.json', params);
};

// 【工位分配】解绑人员和工位
export const _seatUnbind = (params = {}) => {
    return post(`/api/seat/user/unbind.json`, params);
};

// 【工位分配】锁定工位
export const _seatLock = ({code}) => {
    return post(`/api/seat/user/lock.json?code=${code}`);
};

// 【工位分配】更换工位使用人
export const _changeSeatUser = (params = {}) => {
    return post(`/api/seat/user/change.json`, params);
};

// 【工位分配】绑定人员校验
export const _bindingCheck = (params = {}) => {
    return get('/api/seat/user/bindCheck.json', params, {quiet: true});
};

// 【工位分配】绑定人员和工位
export const _seatBinding = (params = {}) => {
    return post(`/api/seat/user/bind.json`, params);
};



// 【工位分配】解锁工位
export const _seatUnlock = ({code}) => {
    return post(`/api/seat/user/unlock.json?code=${code}`);
};

// 【工位分配】获取工位分配列表
export const _getUserSeatList = (params = {}) => {
    return get('/api/seat/user/list.json', params);
};
// 【工位分配】获取工位状态数量展示
export const _getSingleCount = (params = {}) => {
    return get('/api/seat/user/count.json', params);
};

// 【工作地点】工作地点树
export const _getWorkplaceTree = (params = {}) => {
    return get('/api/seat/place/getWorkplaceTree.json', params);
};

//【工作地点】创建/编辑工作地点
export const _saveWorkplace = (params = {}) => {
    return post('/api/seat/place/saveWorkplace.json', params);
};

//【工作地点】删除工作地点
export const _delWorkplace = (params = {}) => {
    return post('/api/seat/place/delWorkplace.json', params);
};

//【工作地点】启停用工作地点
export const _updateEnable = (params = {}) => {
    return post('/api/seat/place/updateEnable.json', params);
};

//【工作地点】排序
export const _sortWorkplace = (params = {}) => {
    return post('/api/seat/place/sortWorkplace.json', params);
};
// 【工位角色配置】工作地点角色树
export const _getWorkplaceRoleTree = (params = {}) => {
    return get('/api/seat/workplace/role/getWorkplaceRoleTree.json', params);
};

// 【工位角色配置】工位统计场所树
export const _getStatisticsPlaceTree = (params = {}) => {
    return get('/api/seat/workplace/role/getStatisticsPlaceTree.json', params);
};

// 【工位角色配置】编辑工位角色
export const _saveWorkplaceRole = (params = {}) => {
    return post('/api/seat/workplace/role/saveWorkplaceRole.json', params);
};

// 【工位角色配置】工作地点角色树
export const _getInfo = (params = {}) => {
    return get('/api/seat/workplace/role/getInfo.json', params);
};

// 【工位角色配置】工位统计列表和汇总数据
export const _getStatisticsArea = (params = {}) => {
    return get('/api/seat/workplace/role/getStatisticsArea.json', params);
};

// 【工位分配】员工搜索
export const _searchUser = (params = {}) => {
    return get('/api/seat/user/search.json', params);
};

// 待分配
export const _getWaitPageList = (params = {}) => {
    return post('/api/seat/user/waitPageList.json', params);
};

// 员工工位列表查询
export const _graphUserList = (params = {}) => {
    return get('/api/seat/graph/user/list.json', params);
};