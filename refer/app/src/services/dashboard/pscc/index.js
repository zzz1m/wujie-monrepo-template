import { get, post } from '@/services/http';
const formHeader =  {'Content-Type': 'application/x-www-form-urlencoded'};

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
// 签到列表
export const _getSignList = (params = {}) => {
    return post('/api/pscc/sign/list.json', params);
};
// 员工签到
export const _staffSign = (params = {}) => {
    return post('/api/pscc/sign/sign.json', params);
};
// 取消签到
export const _staffCancel = (params = {}) => {
    return post('/api/pscc/sign/cancel.json', params);
};
// 排班列表
export const _scheduleList = (params = {}) => {
    return post('/api/pscc/schedule/list.json', params);
};

// 添加排班
export const _addSchedule = (params = {}) => {
    return post('/api/pscc/schedule/add.json', params);
};

// 修改排班
export const _updateSchedule = (params = {}) => {
    return post('/api/pscc/schedule/update.json', params);
};

// 删除排班
export const _deleteSchedule = (params = {}) => {
    return post('/api/pscc/schedule/delete.json', params);
};


// 员工预定列表
export const _getBookList = (params = {}) => {
    return post('/api/pscc/book/list.json', params);
};

export const _getUserByKeyWord = (params = {}) => {
    return get('/api/pscc/user/getByKeyWord.json', params,  {
        quiet: true
    });
};

// 员工预定列表
export const _bookPscc = (params = {}) => {
    return post('/api/pscc/book/book.json', params);
};

// 获取预约列表
export const _bookUserList = (params = {}) => {
    return post('/api/pscc/book/user/list.json', params);
};

// 获取预约列表
export const _getWeekDayBookRecordInfo = (params = {}) => {
    return get('/api/pscc/book/getWeekDayBookRecordInfo.json', params);
};

// 取消预定
export const _bookCancel = (params = {}) => {
    return post('/api/pscc/book/cancel.json', params);
};

// 删除预定
export const _bookDelete = (params = {}) => {
    return post('/api/pscc/book/delete.json', params);
};

// 编辑预定
export const _bookUpdate = (params = {}) => {
    return post('/api/pscc/book/update.json', params);
};

// 查看测评
export const _getTestReport = (params = {}) => {
    return post('/api/pscc/user/getTestReport.json', params);
};

// 获取当前用户信息-改
export const _getPsccUserInfo = (params = {}) => {
    return get('/api/pscc/user/info.json', params);
};

// 新增咨询室
export const _roomAdd = (params = {}) => {
    return post('/api/pscc/room/add.json', params);
};

// 咨询室分页列表
export const _roomPageList = (params = {}) => {
    return post('/api/pscc/room/pageList.json', params);
};

// 咨询室列表
export const _roomList = (params = {}) => {
    return post('/api/pscc/room/list.json', params);
};

// 咨询室删除
export const _roomDelete = (params = {}) => {
    return post('/api/pscc/room/delete.json', params);
};

// 咨询师列表
export const _consultantList = (params = {}) => {
    return post('/api/pscc/consultant/list.json', params);
};

// 单周排班列表
export const _singleScheduleList = (params = {}) => {
    return post('/api/pscc/schedule/scheduleList.json', params);
};

// 单周添加(更新)排班
export const _scheduleAddOrUpdate = (params = {}) => {
    return post('/api/pscc/schedule/addOrUpdate.json', params);
};

// 修改标记状态
export const _updateMarkStatus = (params = {}) => {
    return post('/api/pscc/book/updateMarkStatus.json', params);
};

// 新-添加(更新)团队排班
export const _addOrUpdate = (params = {}) => {
    return post('/api/pscc/schedule/group/addOrUpdate.json', params);
};

// 删除团课排班
export const _groupDelete = (params = {}) => {
    return post('/api/pscc/schedule/group/delete.json', params);
};
// 团课列表查询
export const _groupList = (params = {}) => {
    return post('/api/pscc/schedule/group/scheduleList.json', params);
};

// 团课报名信息表
export const _infoGroupList = (params = {}) => {
    return post('/api/pscc/info/group/list.json', params);
};

// 老师维度统计表
export const _infoConsultantList = (params = {}) => {
    return get('/api/pscc/info/consultant/list.json', params);
};


// 预约类型统计表
export const _infoTypeList = (params = {}) => {
    return get('/api/pscc/info/type/list.json', params);
};

// 获取所有团课名称
export const _getCourseList = (params = {}) => {
    return get('/api/pscc/schedule/group/courseList.json', params);
};

// 个体信息统计表
export const _infoReserveList = (params = {}) => {
    return post('/api/pscc/info/reserve/list.json', params);
};

// 团课发布
export const _groupPublish = (params = {}) => {
    return get('/api/pscc/schedule/group/publish.json', params);
};

// 咨询排期表
export const _infoScheduleList= (params = {}) => {
    return get('/api/pscc/info/schedule/list.json', params);
};

// 个人信息编辑
export const _reserveAddOrUpdate = (params = {}) => {
    return post('/api/pscc/info/reserve/addOrUpdate.json', params);
};

// 个人咨询信息查询
export const _reserveInfo = (params = {}) => {
    return get('/api/pscc/info/reserve/info.json', params);
};

// 管理后台-咨询师列表
export const _consultantAdminList = (params = {}) => {
    return get('/api/pscc/consultant/admin/list.json', params);
};

// 管理后台-新增/编辑咨询师
export const _adminAddOrUpdate = (params = {}) => {
    if (params.id) {
        return post('/api/pscc/consultant/admin/update.json', params);
    } else {
        return post('/api/pscc/consultant/admin/add.json', params);
    }
};

// 管理后台-启用/停用
export const _adminEnable = (params = {}) => {
    return post('/api/pscc/consultant/admin/enable.json', params);
};

// 管理后台-人员查询
export const _adminUserSearch = (params = {}) => {
    return get('/api/pscc/consultant/admin/userSearch.json', params);
};

// 管理后台-人员查询
export const _adminPreview = (params = {}) => {
    return get('/api/pscc/consultant/admin/preview.json', params);
};

// 管理后台-管理后台-停用
export const _adminDisable = (params = {}) => {
    return post('/api/pscc/consultant/admin/disable.json', params);
}; 


// 管理后台-人员查询
export const _reserveHistory = (params = {}) => {
    return get('/api/pscc/info/reserve/history.json', params);
};








// 信息统计

// 个体咨询列表
export const _individualList = (params = {}) => {
    return get('/api/pscc/statistics/consult/user/list.json', params);
};


// 个体咨询列表 导出检查
export const _individualExportCheck = (params = {}) => {
    return get('/api/pscc/statistics/consult/user/exportCheck.json', params);
};



// 个体咨询详情列表 
export const _individualDetail = (params = {}) => {
    return get('/api/pscc/statistics/consult/user/detail/list.json', params);
};

// 个体咨询详情列表 导出检查
export const _individualDetailCheck = (params = {}) => {
    return get('/api/pscc/statistics/consult/user/detail/exportCheck.json', params);
};


// 团辅导列表 
export const _groupCourseList = (params = {}) => {
    return get('/api/pscc/statistics/group/course/list.json', params);
};

// 团辅导列表 导出检查
export const _groupCourseCheck = (params = {}) => {
    return get('/api/pscc/statistics/group/course/exportCheck.json', params);
};

// 团辅导 详情列表 
export const _groupCourseDetail = (params = {}) => {
    return get('/api/pscc/statistics/group/course/detail/list.json', params);
};

// 团辅导 详情列表  导出检查
export const _groupCourseDetailCheck = (params = {}) => {
    return get('/api/pscc/statistics/group/course/detail/exportCheck.json', params);
};


// 团辅导 签到详情列表 
export const _groupSign = (params = {}) => {
    return get('/api/pscc/statistics/group/course/detail/sign/list.json', params);
};

// 团辅导 详情列表  导出检查
export const _groupSignCheck = (params = {}) => {
    return get('/api/pscc/statistics/group/course/detail/sign/exportCheck.json', params);
};


//部门专课列表 
export const _departmentCourseList = (params = {}) => {
    return get('/api/pscc/statistics/special/course/list.json', params);
};

//部门专课列表  导出检查
export const _departmentCheck = (params = {}) => {
    return get('/api/pscc/statistics/special/course/exportCheck.json', params);
};


//部门 详情专课列表 
export const _departmentDetail = (params = {}) => {
    return get('/api/pscc/statistics/special/course/detail/list.json', params);
};

//部门详情专课列表  导出检查
export const _departmentDetailCheck = (params = {}) => {
    return get('/api/pscc/statistics/special/course/detail/exportCheck.json', params);
};
























// 管理后台-部门专课列表
export const _departmentList = (params = {}) => {
    return get('/api/pscc/special/admin/list.json', params);
};

// 管理后台-部门专课安排
export const _departmentSet = (params = {}) => {
    return post('/api/pscc/special/admin/arrange.json', params);
};

// 管理后台-部门专课取消
export const _departmentCancel = (params = {}) => {
    return post('/api/pscc/special/admin/cancel.json', params,{headers});
};

// 管理后台-部门专课签到
export const _departmentSign = (params = {}) => {
    return post('/api/pscc/special/user/sign.json', params);
};
























//课程管理，保存
export const _courseSave = (params = {}) => {
    return post('/api/pscc/course/save.json', params);
};

//课程管理，获取详情
export const _getDetail = (params = {}) => {
    return get('/api/pscc/course/detail.json', params);
};

//课程管理，获取列表
export const _getList = (params = {}) => {
    return get('/api/pscc/course/list.json', params);
};

//课程管理，下线
export const _offLine = (params = {}) => {
    return post('/api/pscc/course/state/disable.json', params, {headers: formHeader});
};

//课程管理，上线
export const _onLine = (params = {}) => {
    return post('/api/pscc/course/state/enable.json', params,{headers: formHeader});
};
// 咨询师师排序
export const _consultantSort = (params = {}) => {
    return post('/api/pscc/consultant/admin/sort.json', params);
};


// 启用咨询室
export const _roomStatusEnable = (params = {}) => {
    return post('/api/pscc/room/state/enable.json', params, {headers});
};

// 停用咨询室
export const _roomStatusDisable = (params = {}) => {
    return post('/api/pscc/room/state/disable.json', params, {headers});
};

// 【PSCC改造】部门专课取消预定
export const _specialCancelBook = (params = {}) => {
    return post('/api/pscc/book/user/special/cancelBook.json', params, {headers});
};


// 【PSCC改造】部门专课 修改时间
export const _specialUpdateBook = (params = {}) => {
    return post('/api/pscc/book/user/special/updateBook.json', params);
};



// 【PSCC改造】部门专课  详情
export const _specialDetail= (params = {}) => {
    return get('/api/pscc/book/user/special/info.json', params);
};

// 排期表
export const _consultScheduleList = (params = {}) => {
    return get('/api/pscc/statistics/consult/schedule/list.json', params);
};

// 评论审核列表接口
export const _auditPsccList = (params = {}) => {
    return get('/api/comment/audit/pscc/list.json', params);
};

// 评论审核通过
export const _auditPsccPass = (params = {},) => {
    return post(`/api/comment/audit/pscc/pass.json`, params, {headers});
};

// 评论审核驳回
export const _auditPsccReject = (params = {}) => {
    return post('/api/comment/audit/pscc/reject.json', params);
};

// 评论审核删除
export const _auditPsccDelete = (params = {}) => {
    return post('/api/comment/audit/pscc/delete.json', params, {headers});
};

// 管理端获取评论树
export const _commenttree = (params = {}) => {
    return get('/api/comment/admin/pscc/tree.json', params);
};
// 删除
export const _commentdelete = (params = {}) => {
    return post(`/api/comment/admin/pscc/delete.json?id=${params.id}&keywords=${params.keywords}`, params);
};
// 置顶
export const _top = (params = {}) => {
    return post('/api/comment/admin/pscc/top.json?id='+ params.id, params);
};
// 取消置顶
export const _unTop = (params = {}) => {
    return post('/api/comment/admin/pscc/unTop.json?id='+ params.id, params);
};

// 获取课程下拉视频
export const _dropdown = (params = {}) => {
    return get('/api/pscc/course/video/dropdown.json', params);
};

