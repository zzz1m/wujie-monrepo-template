import { get, post } from '@/services/http';
const headerConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};
/**
 *  预定
 */
// 预定---预定页面
export const book = (params = {}) => {
    return get('/api/old/phcc/user/book.json', params);
};
// 预定--预定弹窗
export const bookDay = (params = {}) => {
    return get('/api/old/phcc/user/book/day.json', params);
};
// 预定---预定
export const doBook = (params = {}) => {
    return get('/api/old/phcc/user/book/doBook.json', params);
};

// 获取场馆列表
export const _getWorkplaceList = (params = {}) => {
    return get('/api/old/phcc/admin/workplace/list.json', params);
};


// 获取场馆启用/关闭
export const _editWorkplace = (params = {}) => {
    return post('/api/old/phcc/admin/workplace/edit.json', params);
};

// 新增场馆列
export const _addWorkplace = (params = {}) => {
    return post('/api/old/phcc/admin/workplace/add.json', params);
};




/**
 * 我的预定
 */
// 我的预定---取消预定
export const cancel = (params = {}) => {
    return get('/api/old/phcc/user/book/cancel/day.json', params);
};
// 我的预定---获取当前登陆人的所有预约
export const my = (params = {}) => {
    return get('/api/old/phcc/user/booked/my.json', params);
};

/**
 * 预定明细
 */
// 预定明细---获取预定明细列表(分页)
export const detail = (params = {}) => {
    return get('/api/old/phcc/admin/booked/detail.json', params);
};
// 预定明细---获取预定明细列表(分页)
export const exportFile = (params = {}, status) => {

    return get('/api/old/phcc/admin/booked/detail/export/' + status + '.json', params, { responseType: 'blob' });
};

/**
 * 预定设置
 */
export const config = (params = {}) => {
    return get('/api/old/phcc/admin/config.json', params);
};
export const configEdit = (params = {}) => {
    return post('/api/old/phcc/admin/config/edit/save.json', params);
};
/**
 * 签到
 */
export const sign = (params = {}) => {
    return get('/api/old/phcc/admin/sign.json', params);
};
export const doSign = (params = {}) => {
    return get('/api/old/phcc/admin/sign/sign.json', params);
};
export const doSignOut = (params = {}) => {
    return get('/api/old/phcc/admin/sign/signOut.json', params);
};

/**
 * 公告管理
 */
export const announcement = (params = {}) => {
    return get('/api/old/phcc/admin/announcement.json', params);
};
export const announcementEdit = (params = {}) => {
    return post('/api/old/phcc/admin/announcement/edit.json', params);
};
export const announcementStatus = (params = {}) => {
    return get('/api/old/phcc/admin/announcement/status.json', params);
};
export const upload = (params = {}) => {
    return post('/api/ueditor/call.json', params);
};

/**
 * 健康知识
 */
export const health = (params = {}) => {
    return get('/api/old/phcc/user/health.json', params);
};

/**
 * 删除设置
 * @param params
 * @returns {*}
 */
export const deleteSetting = (params = {}) => {
    return get('/api/old/phcc/admin/config/edit/delete.json', params);
};

/**
 * 黑名单列表&添加&删除黑名单
 */
export const _getBlackList = (params = {}) => {
    return post('/api/old/phcc/admin/blacklist/list.json', params);
};
export const _addBlackList = (params = {}) => {
    return post('/api/old/phcc/admin/blacklist/add.json', params);
};
export const _removeBlackList = (params = {}) => {
    return post('/api/old/phcc/admin/blacklist/remove.json', params);
};

export const _getHealthDetail = (params = {}) => {
    return get('/api/old/phcc/user/health/detail.json', params);
};


/**
 * 获取场馆列表
 */
export const _workplaceList = (params = {}) => {
    return get('/api/old/phcc/user/workplace/list.json', params);
};

/**
 * 获取所有场馆列表
 */
export const _adminWorkplaceList = (params = {}) => {
    return get('/api/old/phcc/admin/workplace/list.json', params);
};

/**
 * 教练列表查询
 */
export const _guideList = (params = {}) => {
    return get('/api/phcc/guide/list.json', params);
};

/**
 * 教练详情
 */
export const _guideDetail = (params = {}) => {
    return get('/api/phcc/guide/detail.json', params);
};

/**
 * 教练保存
 */
export const _guideSave = (params = {}) => {
    return post('/api/phcc/guide/save.json', params);
};

/**
 * 教练删除
 */
export const _guideDelete = (params = {}) => {
    return post('/api/phcc/guide/delete.json', params);
};

/**
 * 教练启用禁用 enable | disable
 */
export const _guideEnableOrDisable = (params = {}, type) => {
    return post(`/api/phcc/guide/state/${type}.json`, params, headerConfig);
};

/**
 * 教练排序
 */
export const _guideSort = (params = {}) => {
    return post(`/api/phcc/guide/sort.json`, params);
};

/**
 * 团体课程排期列表
 */
export const _scheduleList = (params = {}) => {
    return get(`/api/phcc/groupCourse/schedule/list.json`, params);
};

/**
 * 团体课程排期保存
 */
export const _scheduleSave = (params = {}) => {
    return post(`/api/phcc/groupCourse/schedule/save.json`, params);
};

/**
 * 团体课程排期复制
 */
export const _scheduleCopy = (params = {}) => {
    return post(`/api/phcc/groupCourse/schedule/copy.json`, params);
};

/**
 * 是否存在排期数据
 */
export const _scheduleExist = (params = {}) => {
    return get(`/api/phcc/groupCourse/schedule/exist.json`, params);
};


/**
 * 团体课程排期删除
 */
export const _scheduleDelete = (params = {}) => {
    return post(`/api/phcc/groupCourse/schedule/delete.json?id=${params.id}`, params);
};

/**
 * 预定排期列表
 */
export const _bookScheduleList = (params = {}) => {
    return get(`/api/phcc/groupCourse/book/schedule/list.json`, params);
};

/**
 * 员工团课明细列表
 */
export const _scheduleBookList = (params = {}) => {
    return get(`/api/phcc/groupCourse/book/scheduleBookList.json`, params);
};


/**
 * 排期签到列表查询
 */
export const _bookList = (params = {}) => {
    return get(`/api/phcc/groupCourse/book/list.json`, params);
};

/**
 * 系统配置列表查询
 */
export const _settingList = (params = {}) => {
    return get(`/api/phcc/setting/list.json`, params);
};

/**
 * 系统配置列表保存
 */
export const _settingSave = (params = {}) => {
    return post(`/api/phcc/setting/save.json`, params);
};

/**
 * 训练签到表列表查询
 */
export const _userTrainList = (params = {}) => {
    return get(`/api/phcc/userTrain/list.json`, params);
};

/**
 * 训练签到
 */
export const _userTrainSignIn = (params = {}) => {
    return post(`/api/phcc/userTrain/signIn.json`, params);
};

/**
 * 训练签退
 */
export const _userTrainSignOut = (params = {}) => {
    return post(`/api/phcc/userTrain/signOut.json`, params, headerConfig);
};

/**
 * 课程列表查询
 */
export const _courseList = (params = {}) => {
    return get(`/api/phcc/course/list.json`, params);
};

/**
 * 课程详情
 */
export const _courseDetail = (params = {}) => {
    return get(`/api/phcc/course/detail.json`, params);
};

/**
 * 课程保存
 */
export const _courseSave = (params = {}) => {
    return post(`/api/phcc/course/save.json`, params);
};

/**
 * 课程删除
 */
export const _courseDelete = (params = {}) => {
    return post(`/api/phcc/course/delete.json`, params);
};

/**
 * 课程启用 禁用 enable | disable
 */
export const _courseEnableOrDisable = (params = {}, type) => {
    return post(`/api/phcc/course/state/${type}.json`, params, headerConfig);
};

/**
 * 课程排序
 */
export const _courseSort = (params = {}) => {
    return post(`/api/phcc/course/sort.json`, params);
};

/**
 * 查询课程标签
 */
export const _courseLabels = (params = {}) => {
    return get(`/api/phcc/course/labels.json`, params);
};

/**
 * 视频列表查询
 */
export const _videoList = (params = {}) => {
    return get(`/api/phcc/video/list.json`, params);
};

/**
 * 视频详情
 */
export const _videoDetail = (params = {}) => {
    return get(`/api/phcc/video/detail.json`, params);
};

/**
 * 视频保存
 */
export const _videoSave = (params = {}) => {
    return post(`/api/phcc/video/save.json`, params);
};

/**
 * 视频启用 禁用 enable | disable
 */
export const _videoEnableOrDisable = (params = {}, type) => {
    return post(`/api/phcc/video/state/${type}.json`, params, headerConfig);
};

/**
 * 视频排序
 */
export const _videoSort = (params = {}) => {
    return post(`/api/phcc/video/sort.json`, params);
};

/**
 * 视频详情
 */
export const _videoLabels = (params = {}) => {
    return get(`/api/phcc/video/labels.json`, params);
};


/**
 * 场馆列表查询
 */
export const _stadiumList = (params = {}) => {
    return get(`/api/phcc/stadium/list.json`, params);
};

/**
 * 场馆保存
 */
export const _stadiumSave = (params = {}) => {
    return post(`/api/phcc/stadium/save.json`, params);
};

/**
 * 场馆启用 禁用 enable | disable
 */
export const _stadiumEnableOrDisable = (params = {}, type) => {
    return post(`/api/phcc/stadium/state/${type}.json`, params, headerConfig);
};

/**
 * 区域列表查询
 */
export const _stadiumAreaList = (params = {}) => {
    return get(`/api/phcc/stadiumArea/list.json`, params);
};

/**
 * 场馆区域保存
 */
export const _stadiumAreaSave = (params = {}) => {
    return post(`/api/phcc/stadiumArea/save.json`, params);
};

/**
 * 场馆启用 禁用 enable | disable
 */
export const _stadiumAreaEnableOrDisable = (params = {}, type) => {
    return post(`/api/phcc/stadiumArea/state/${type}.json`, params, headerConfig);
};

/**
 * 场馆区域排序
 */
export const _stadiumAreaSort = (params = {}) => {
    return post(`/api/phcc/stadiumArea/sort.json`, params);
};

/**
 * 审核通过
 */
export const _approvePass = (params = {}) => {
    return post(`/api/phcc/groupCourse/book/approve/pass.json`, params, headerConfig);
};

/**
 * 审核驳回
 */
export const _approveReject = (params = {}) => {
    return post(`/api/phcc/groupCourse/book/approve/reject.json`, params, headerConfig);
};

