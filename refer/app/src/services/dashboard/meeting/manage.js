import { get, post } from '@/services/http';


/**
 * 会议室管理
 */

//会议室管理：获取办公区域树形结构数据
export const _getMenu = (params = {}) => {
    return get('/api/floor/admin/listRoomFloorTree.json', params);
};

//会议室管理：办公区域新增/编辑
export const _addOrUpdateFloor = (params = {}) => {
    return post('/api/floor/admin/addOrUpdateFloor.json', params);
};

//会议室管理：根据办公地点code查询办公区域列表
export const _getListByWorkplaceCode = (params = {}) => {
    return get('/api/floor/admin/listByWorkplaceCode.json', params);
};

//会议室管理：办公区域排序
export const _floorSort = (params = {}) => {
    return post('/api/floor/admin/sort.json', params);
};

//会议室管理：办公区域删除
export const _floorDelete = (params = {}) => {
    return post('/api/floor/admin/delete.json', params);
};

//会议室管理：会议室管理：会议室列表查询
export const _getStartOrEndRoom = (params = {}) => {
    return get('/api/room/user/getStartOrEndRoom.json', params);
};

//会议室管理：创建/编辑会议室
export const _addOrUpdateRoom = (params = {}) => {
    return post('/api/room/admin/addOrUpdateRoom.json', params);
};

//会议室管理：查询会议室信息
export const _getMeetingRoomDetail = (params = {}) => {
    return get('/api/room/admin/meetingRoomDetail.json', params);
};

//会议室管理：上下线会议室
export const _updateRoomStatus = (params = {}) => {
    return post('/api/room/admin/updateRoomStatus.json', params);
};

//会议室管理：锁定会议室
export const _lockMeetingRoom = (params = {}) => {
    return post('/api/room/admin/lockMeetingRoom.json', params);
};

//会议室管理：会议室管理：取消锁定会议室
export const _cancelLockMeetingRoom = (params = {}) => {
    return post('/api/room/admin/lockMeetingRoom/cancel.json', params);
};

//会议室管理：会议室管理：删除会议室
export const _roomDel = (params = {}) => {
    return post('/api/room/admin/delete.json', params);
};

//会议室管理：根据区域id获取会议室列表(包含已禁用会议室列表，会议室排序调该接口)
export const _roomList = (params = {}) => {
    return get('/api/room/admin/list/room.json', params);
};

//会议室管理：排序会议室
export const _roomSort = (params = {}) => {
    return post('/api/room/admin/sort.json', params);
};

//会议室管理：获取会议室二维码
export const _getQRCode = (params = {}) => {
    return get(`/api/room/admin/${params.action}/QRCode.json`, params);
};

//会议室管理：会议室预约导出明细
export const _exportMeeting = (params = {}) => {
    return get('/api/position/meeting/export.json', params);
};

//会议室管理：权限配置
export const _roomAuth = (params = {}) => {
    return post('/api/floor/admin/auth.json', params);
};

//会议室管理：权限配置回显
export const _roomAuthDetail = (params = {}) => {
    return get('/api/floor/admin/authDetail.json', params);
};


/**
 * 会议室权限
 */

//会议室权限：获取会议室地点权限接口列表
export const _getWorkplaceList = (params = {}) => {
    return get('/api/meeting/reserveAuth/workplace/list.json', params);
};

//会议室权限：获取会议室时长权限接口列表
export const _getDurationList = (params = {}) => {
    return get('/api/meeting/reserveAuth/duration/list.json', params);
};

//会议室权限：根据ID获取会议室地点权限信息
export const _meetingFloorInfoById = (params = {}) => {
    return get('/api/meeting/reserveAuth/workplace/info.json', params);
};

//会议室权限：根据ID获取会议室时长权限信息
export const _meetingDurationInfoById = (params = {}) => {
    return get('/api/meeting/reserveAuth/duration/info.json', params);
};

//会议室权限：保存/更新时长权限
export const _updateWorkplace = (params = {}) => {
    return post('/api/meeting/reserveAuth/workplace.json', params);
};

//会议室权限：保存/更新时长权限
export const _updateDuration = (params = {}) => {
    return post('/api/meeting/reserveAuth/duration.json', params);
};

// 根据用户id获取时长权限信息
export const _getDurationByUser = (params = {}) => {
    return get('/api/meeting/reserveAuth/duration.json', params);
};

//会议室权限：删除地点权限
export const _delWorkplace = (params = {}) => {
    return post('/api/meeting/reserveAuth/workplace/delete.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

//会议室权限：删除时长权限
export const _deleteDuration = (params = {}) => {
    return post('/api/meeting/reserveAuth/duration/delete.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 根据人员ID获取人员的工作地点信息
export const _getWorkplaceByUserId = (params = {}) => {
    return get('/api/meeting/reserveAuth/workplace.json', params);
};

//级联查询实验室信息
export const _getDropDownValueByCascade = (params = {}) => {
    return get('/api/room/admin/getDropDownValueByCascade.json', params);
};



// 我的预定
export const _getMyReservation = (params = {}) => {
    return get('/api/reservation/user/myReservation.json', params);
};

// 编辑预定
export const _updateReservation = (params = {}) => {
    return post('/api/reservation/update/reservation.json', params);
};

// 取消预定
export const _cancelReservation = (params = {}) => {
    return get('/api/reservation/user/cancelReservation.json', params);
};

// 获取锁定详情title
export const _meetingLockTitle = (params = {}) => {
    return get('/api/room/admin/meetingLockTitle.json', params);
};

// 获取锁定详情列表
export const _getMeetingLockInfoList = (params = {}) => {
    return post('/api/room/admin/getMeetingLockInfoList.json', params);
};

// 添加锁定
export const _addLockRecord = (params = {}) => {
    return post('/api/room/admin/addLockRecord.json', params);
};

// 删除锁定
export const _deleteLockInfo = (params = {}) => {
    return post('/api/room/admin/deleteLockInfo.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 锁定会议室校验
export const _checkLockTimeIsConflict = (params = {}) => {
    return post('/api/room/admin/checkLockTimeIsConflict.json', params,  {
        quiet: true
    });
};

// 直播间权限列表
export const _broadcastList = (params = {}) => {
    return get('/api/meeting/reserveAuth/broadcast/list.json', params);
};

// 直播间编辑回显
export const _broadcastInfo = (params = {}) => {
    return get('/api/meeting/reserveAuth/broadcast/info.json', params);
};

// 保存、修改直播间权限
export const _saveBroadcast = (params = {}) => {
    return post('/api/meeting/reserveAuth/broadcast.json', params);
};

// 删除直播间权限
export const _deleteBroadcast = (params = {}) => {
    return post('/api/meeting/reserveAuth/broadcast/delete.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 根据用户ID查询直播间权限
export const _userBroadcast = (params = {}) => {
    return get('/api/meeting/reserveAuth/broadcast.json', params);
};






