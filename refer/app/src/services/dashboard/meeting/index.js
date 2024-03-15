import { get, post } from '@/services/http';

// 按楼层展示每个会议室预定详情以及空闲时间段
export const _getRoom = (params = {}) => {
    return get('/api/room/list/room.json', params);
};
// 展示所有楼层（维护用）
export const _getFloors = (params = {}) => {
    return get('/api/floor/user/getStartOrEndFloor.json', params);
};
// 展示所有楼层（展示用）
export const _getFloorsByLogin = (params = {}) => {
    return get('/api/floor/user/getFloorList.json', params);
};
// 页面数据展示(按楼层展示每个会议室预定详情)
export const _getReservationData = (params = {}) => {
    return get('/api/reservation/list/reservation.json', params);
};
// 提交会议室预定
export const _postReservationData = (params = {}) => {
    return post('/api/reservation/add/reservation.json', params);
};
// 提交修改会议室预定
export const _updateReservationData = (params = {}) => {
    return post('/api/reservation/update/reservation.json', params);
};
// 取消会议室预定
export const _getCanelReservation = (params = {}) => {
    return get('/api/reservation/user/cancelReservation.json', params);
};
// 获取启用/禁用状态会议室
export const _getStartOrEndRoom = (params = {}) => {
    return get('/api/room/user/getStartOrEndRoom.json', params);
};
// 得到所有工作地点
export const _getPositions = (params = {}) => {
    return get('/api/position/user/getPositions.json', params);
};
// 添加/修改会议室
export const _postAddOrUpdateRoom = (params = {}) => {
    return post('/api/room/admin/addOrUpdateRoom.json', params);
};
// 新增/修改区域信息
export const _postAddOrUpdateFloor = (params = {}) => {
    return post('/api/floor/admin/addOrUpdateFloor.json', params);
};
// 当前登录人的工作地点
export const _getPositionName = (params = {}) => {
    return get('/api/position/user/getPositionName.json', params);
};
// 当前登录人的工作地点
export const _postAddOrUpdateWorkPosition = (params = {}) => {
    return post('/api/position/admin/addOrUpdateWorkPosition.json', params);
};
// 获取全部工作地点
export const _getAllPosition = (params = {}) => {
    return get('/api/position/user/getAllPosition.json', params);
};
// 获取全部楼层区域
export const _getAllFloor = (params = {}) => {
    return get('/api/floor/user/getAllFloor.json', params);
};
//获取举报数据
export const _getAcclist = (params = {}) => {
    return get('/api/accusation/safe/acclist.json', params);
};
//举报
export const _getInform = (params = {}) => {
    return get('/api/reservation/safe/inform.json', params);
};
//举报审批
export const _getCheck = (params = {}) => {
    return get('/api/accusation/safe/check.json', params);
};
//修改预约
export const _postUpdateReservation = (params = {}) => {
    return post('/api/reservation/user/updateReservation.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
//当前用户事都被冻结以及解冻时间
export const _getFreeze = (params = {}) => {
    return get('/api/accusation/user/is_freeze.json', params);
};
//校验会议结束时间
export const _getCheckMsg = (params = {}) => {
    return get('/api/reservation/safe/checkMsg.json', params);
};
//我的预定页面
export const _getMy = (params = {}) => {
    return get('/api/reservation/user/myReservation.json', params);
};
// 根据预定id获取预定详情
export const _getReservationDetail = (params = {}) => {
    return get('/api/reservation/detail/reservation.json', params);
};
//模糊搜索匹配
export const _searchInfo = (params = {}) => {
    return get('/api/reservation/user/searchInfo.json', params);
};
//会议室用途列表
export const _meetingRoomUseList = (params = {}) => {
    return get('/api/common/dict/get/meeting_room_use/list.json', params);
};

// 会议室预定：获取当前登录人拥有权限的办公地点列表
export const _userListWorkplace = (params = {}) => {
    return get('/api/position/user/listWorkplace.json', params);
};

// 会议室签退
export const _signOutReservation = (params = {}) => {
    return get('/api/reservation/signOut/reservation.json', params);
};

// 会议室人员变更
export const _changeAttendees = (params = {}) => {
    return post('/api/reservation/changeAttendees/reservation.json', params);
};

// 获取组内成员
export const _getGroupMembers = (params = {}) => {
    return get('/api/reservation/get/groupMembers.json', params);
};

// 查询会议室
export const _findMeeting = (params = {}) => {
    return get('/api/reservation/find.json', params);
};

// 获取可选设备
export const _getOptionalDevices = (params = {}) => {
    return get('/api/room/get/optionalDevices.json', params);
};

// 查询会议室初始化接口
export const _findMeetingInit = (params = {}) => {
    return get('/api/reservation/find/init.json', params);
};

// 通过日期获取时长
export const _getReservationPeriod = (params = {}) => {
    return get('/api/reservation/getReservationPeriod.json', params);
};

// 会议室预定权限校验
export const _checkReservation = (params = {}) => {
    return post('/api/reservation/check/reservation.json', params,  {
        quiet: true
    });
};

// 【设备字典管理】-新增设备字典
export const _equipmentAddDict = (params = {}) => {
    return post('/api/meeting/dict/equipment/addDict.json', params);
};

// 【设备字典管理】-修改设备字典
export const _equipmentEditDict= (params = {}) => {
    return post('/api/meeting/dict/equipment/editDict.json', params);
};

// 【设备字典管理】-查询设备字典列表
export const _equipmentList = (params = {}) => {
    return get('/api/meeting/dict/equipment/list.json', params);
};

// 【设备字典管理】-启用设备字典
export const _equipmentEnable = (params = {}) => {
    return get('/api/meeting/dict/equipment/enable.json', params);
};

// 【设备字典管理】-停用设备字典
export const _equipmentDisable = (params = {}) => {
    return get('/api/meeting/dict/equipment/disable.json', params);
};

// 【设备字典管理】-设备字典排序
export const _equipmentDictSort = (params = {}) => {
    return post('/api/meeting/dict/equipment/dictSort.json', params);
};

// 【设备字典管理】-删除设备字典
export const _equipmentDelDict = (params = {}) => {
    return post('/api/meeting/dict/equipment/delDict.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 模糊查询boss hi群组
export const _meetingGroups = (params = {}) => {
    return get('/api/reservation/get/groups.json', params);
};

// 会议室预定-获取可续定的时间段
export const _getCanRenewTime = (params = {}) => {
    return get('/api/reservation/renew/getCanRenewTime.json', params);
};

// 会议室预定-续定会议
export const _renew = (params = {}) => {
    return post('/api/reservation/renew.json', params);
};