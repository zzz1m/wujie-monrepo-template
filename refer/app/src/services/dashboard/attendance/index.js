import {
    get,
    post
} from '@/services/http';

// 获取本月所有我的考勤数据
export const _getMyList = (params = {}) => {
    return get('/api/attendance/user/list.json', params);
};
// 获取本月查看人员的考勤数据
export const _getHrList = (params = {}) => {
    return get('/api/attendance/hr/list.json', params);
};
// 获取组员的考勤数据
export const _getTeamList = (params = {}) => {
    return get('/api/attendance/team/list.json', params);
};
// 获取组员的考勤数据-详情
export const _getTeamListDetail = (params = {}) => {
    return get('/api/attendance/leader/list.json', params);
};
// 员工提交考勤申诉
export const _postApply = (params = {}) => {
    return post('/api/apply/submit.json', params);
};
// 获取"全员"考勤排名列表
export const _getAllCount = (params = {}) => {
    return get('/api/counts/user/counts.json', params);
};
// 获取"组长"排名列表
export const _getLeaderCount = (params = {}) => {
    return get('/api/counts/team/leaderCount.json', params);
};
// 获取"组"排名列表
export const _getDeptCount = (params = {}) => {
    return get('/api/counts/team/deptCount.json', params);
};
// "全员"导出
export const _getAllExport = (params = {}) => {
    return get('/api/counts/user/export/url.json', params);
};
// "组"导出
export const _getDeptExport = (params = {}) => {
    return get('/api/counts/user/deptExport/url.json', params);
};
// "组长"导出
export const _getLeaderExport = (params = {}) => {
    return get('/api/counts/user/leaderExport/url.json', params);
};
// 导出全员明细
export const _getDetailExport = (params = {}) => {
    return get('/api/attendance/export/url.json', params);
};
// 导出全员明细
export const _getDetailExportPlus = (params = {}) => {
    return get('/api/attendance/export/export.json', params);
};
// 查看年假
export const _getAnnualleave = (params = {}) => {
    return get('/api/annual/user/annualleave.json', params);
};
// 添加假期
export const _postAddLeave = (params = {}) => {
    return post('/api/leave/hr/insertLeave.json', params);
};
// 审批列表
export const _getApplyList = (params = {}) => {
    return get('/api/apply/team/apply.json', params);
};
// 审批列表-操作
export const _postApplyStatus = (params = {}) => {
    return post('/api/apply/team/check.json', params);
};
// 导入考勤数据
export const _postImport = (params = {}) => {
    return post('/api/leave/hr/import.json', params);
};

//查询班次
export const getShift = (params = {}) => {
    return get('/api/attendance/schedule/config/query.json', params);
};
//查询班次详情
export const getShiftDetail = (params = {}) => {
    return get('/api/attendance/schedule/config/querynoe.json', params);
};
//新增班次
export const addShift = (params = {}) => {
    return post('/api/attendance/schedule/config/add.json', params);
};
//删除班次
export const deleteShift = (params = {}) => {
    return get('/api/attendance/schedule/config/delete.json', params);
};
//修改班次
export const editShift = (params = {}) => {
    return post('/api/attendance/schedule/config/edit.json', params);
};
//获取leader
export const getLeader = (params = {}) => {
    return get('/api/user/allLeaderinfo.json', params);
};

//新增排班
export const addScheduling = (params = {}) => {
    return post('/api/attendance/scheduling/add.json', params);
};
//查询排班
export const getScheduling = (params = {}) => {
    return get('/api/attendance/scheduling/query.json', params);
};
//查询下拉列表班次
export const getListShift = (params = {}) => {
    return get('/api/attendance/scheduling/queryConfig.json', params);
};
//查询下拉列表班次
export const getSchedulingDetail = (params = {}) => {
    return get('/api/attendance/scheduling/queryone.json', params);
};
//修改排班
export const editScheduling = (params = {}) => {
    return post('/api/attendance/scheduling/edit.json', params);
};
//修改排班结束日期
export const editSchedulingEndDate = (params = {}) => {
    return post('/api/attendance/scheduling/editEndTime.json', params);
};
//获取leader组员信息
export const getLeaderDown = (params = {}) => {
    return get('/api/user/allLeaderUserinfo.json', params);
};

//获取部门信息
export const getDeptInfo = (params = {}) => {
    return get('/api/apply/user/dept/info.json', params);
};
//申请请假公出信息
export const editKq = (params = {}) => {
    return post('/api/apply/user/submit/apply.json', params);
};
//获取考勤申请
export const getApply = (params = {}) => {
    return get('/api/apply/user/apply.json', params);
};
//我的申请列表
export const getApplyList = (params = {}) => {
    return get('/api/apply/user/myapply.json', params);
};
//我的审批列表
export const getApproveList = (params = {}) => {
    return get('/api/apply/admin/myapprove.json', params);
};
//审批
export const doApprove = (params = {}) => {
    return get('/api/apply/admin/approve.json', params);
};
//获取请假时长
export const getTotalTime = (params = {}) => {
    return post('/api/apply/user/calculate/apply.json', params);
};
//删除请假申请
export const deleteApply = (params = {}) => {
    return get('/api/apply/user/apply/delete.json', params);
};
//团队考勤
export const getTeamAttendance = (params = {}) => {
    return get('/api/attendance/leader/team/attendance.json', params);
};
//区域考勤
export const getRegionalAttendance = (params = {}) => {
    return get('/api/attendance/special/attendance.json', params);
};
//团队考勤导出
export const _exportTeamAttendance = (params = {}) => {
    return get('/api/attendance/export/leader/team/attendance.json', params);
};
//销假
export const resumption = (params = {}) => {
    return get('/api/apply/user/resumption/list.json', params);
};
//撤回
export const revoke = (params = {}) => {
    return get('/api/apply/user/revoke.json', params);
};
//已审批
export const alreadyapprove = (params = {}) => {
    return get('/api/apply/admin/alreadyapprove.json', params);
};
//获取审批进度列表
export const getListener = (params = {}) => {
    return get('/api/apply/admin/listener.json', params);
};

//获取审批进度详情
export const getListenerDetail = (params = {}) => {
    return get('/api/apply/admin/listener/apply.json', params);
};

//导入考勤日志
export const getlogList = (params = {}) => {
    return post('/api/attendance/import/log.json', params);
};
//
export const getlogDetail = (params = {}) => {
    return post('/api/attendance/import/detail.json', params);
};
//假期余额--列表
export const holidayList = (params = {}) => {
    return get('/api/attendance/holiday/list.json', params);
};

//刷某人的考勤数据
export const refresWorkingHours = (params = {}) => {
    return get('/api/test/refresh/userWorkingHours.json', params);
};

/**
 * 考勤提醒
 */
//校验是否有绑定关系
export const _remindCheckBind = (params = {}) => {
    return get('/api/attendance/remind/checkBind.json', params);
};
//获取提醒设置
export const _remindGet = (params = {}) => {
    return get('/api/attendance/remind/get.json', params);
};
//设置提醒
export const _remindSetting = (params = {}) => {
    return post('/api/attendance/remind/setting.json', params);
};

//获取特殊考勤人员列表
export const _getSpecialUserList = (params = {}) => {
    return get('/api/attendanceSpecialUser/list.json', params);
};

// 新增特殊考勤人员
export const _insertOrUpdate = (params = {}) => {
    return post('/api/attendanceSpecialUser/insertOrUpdate.json', params);
};

// 特殊考勤申请
export const _specRequire = (params = {}) => {
    return post('/api/attendanceSpecialUser/submit.json', params);
};


//获取班次列表
export const _getCLass = (params = {}) => {
    return post('/api/attendance/v2/shift/getListPage.json', params);
};

// 启用班次
export const _startClass = (params = {}) => {
    return post('/api/attendance/v2/shift/enableById.json', params);
};

// 停用班次
export const _stopClass = (params = {}) => {
    return post('/api/attendance/v2/shift/disableById.json', params);
};

// 停用班次
export const _deleteClass = (params = {}) => {
    return post('/api/attendance/v2/shift/deleteById.json', params);
};

// 根据id获取班次信息
export const _getClassById = (params = {}) => {
    return post('/api/attendance/v2/shift/getById.json', params);
};

// 根据code获取班次信息
export const _getShiftByCode = (params = {}) => {
    return post('/api/attendance/v2/shift/getByCode.json', params);
};

//【考勤组】获取code考勤组信息
export const _getGroupByCode = (params) => {
    return post('/api/attendance/v2/group/getByCode.json', params);
};

// 新增班次
export const _addClass = (params = {}) => {
    return post('/api/attendance/v2/shift/add.json', params);
};

// 编辑班次
export const _editClass = (params = {}) => {
    return post('/api/attendance/v2/shift/edit.json', params);
};

// 节假日列表
export const _holidayList = (params = {}) => {
    return get('/api/attendance/v2/holiday/getListPage.json', params);
};

// 新增节假日
export const _addHoliday = (params = {}) => {
    return post('/api/attendance/v2/holiday/add.json', params);
};

// 编辑节假日
export const _editHoliday = (params = {}) => {
    return post('/api/attendance/v2/holiday/edit.json', params);
};

// 编辑节假日回显
export const _getDetail = (params = {}) => {
    return post('/api/attendance/v2/holiday/getById.json', params);
};

// 异常匹配列表
export const _abnormalList = (params = {}) => {
    return post('/api/attendance/v2/abnormalRule/getListPage.json', params);
};

// 新增异常匹配
export const _addAbnormal = (params = {}) => {
    return post('/api/attendance/v2/abnormalRule/add.json', params);
};

// 编辑异常匹配
export const _editAbnormal = (params = {}) => {
    return post('/api/attendance/v2/abnormalRule/edit.json', params);
};

// 删除异常匹配
export const _deleteAbnormal = (params = {}) => {
    return post('/api/attendance/v2/abnormalRule/delete.json', params);
};
// 获取优兰达地区 
export const _getYoldandaArea = (params = {}) => {
    return get('/api/apply/youlanda/areaV2.json', params);
};

// 根据code查询city
export const _searchYoldanda = (params = {}) => {
    return post('/api/apply/youlanda/areaCodeV2.json', params);
}; 

//【班次】获取特殊考勤班次列表
export const _getSpecialShiftList = (params = {}) => {
    return post('/api/attendance/v2/shift/getSpecialShiftList.json', params);
};

//部分销假提交接口
export const _partApply = (params = {}) => {
    return post('/api/apply/user/submit/partApply.json', params);
};

// 休假公出-获取假期类型列表
export const _getLeaveType = (params = {}) => {
    return get('/api/apply/list/leaveType.json', params);
};

// 考勤报表-获取月份范围
export const _getMonth = (params = {}) => {
    return get('/api/attendance/report/month.json', params);
};

// 考勤报表-列表
export const _getReportList = (params = {}) => {
    return get('/api/attendance/report/list.json', params);
};

// 考勤报表-导出
export const _getReportExport = (params = {}) => {
    return get('/api/attendance/report/export.json', params);
};

// 【考勤看板】首页-今日出勤【4.5.6】
export const _boardCurrent = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/current.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

// 【考勤看板】首页-月度出勤信息统计【4.5.6】
export const _monthAttendance = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/monthAttendance.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

// 【考勤看板】首页-已休假期【4.5.6】
export const _usedLeave = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/usedLeave.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

// 【考勤看板】首页-月度考核占比统计【4.5.6】
export const _monthAssess = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/monthAssess.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】首页-考核趋势【4.5.6】
export const _assessTrend = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/assessTrend.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】个人考勤-头部信息【4.5.6】
export const _personalHeader = (params = {}) => {
    return post(`/api/attendance/board/personal/header.json?userId=${params.userId}`, params);
};

//【考勤看板】个人考勤-日历信息【4.5.6】
export const _personalCalendar = (params = {}) => {
    return post('/api/attendance/board/personal/calendar.json', {}, {
        params: params
    });
};

//【考勤看板】个人考勤-考勤统计信息【4.5.6】
export const _atdStatistics = (params = {}) => {
    return post('/api/attendance/board/personal/atdStatistics.json', {}, {
        params: params
    });
};

//【考勤看板】个人考勤-假期余额信息【4.5.6】
export const _remainedLeave = (params = {}) => {
    return post('/api/attendance/board/personal/remainedLeave.json', {}, {
        params: params
    });
};

//【考勤看板】详情-出勤详情【4.5.6】
export const _detailAttendance = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/attendance.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】详情-晚补详情【4.5.6】
export const _detailLateSubsidy = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/lateSubsidy.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】详情-异常考勤详情【4.5.6】
export const _detailAbnormal = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/abnormal.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】详情-异常考勤详情-统计【4.5.6】
export const _abnormalStatistics = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/abnormalStatistics.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】详情-考核指标详情【4.5.6】
export const _detailAssess = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/assess.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】详情-请假/公出/防疫-居家详情【4.5.6】
export const _detailApply = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/apply.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】详情-请假/公出/防疫-居家详情-统计【4.5.6】
export const _applyStatistics = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/detail/applyStatistics.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};

//【考勤看板】首页-考核趋势【4.5.6】
export const _boardAssessTrend = (params = {}, isDataDoard) => {
    return post(`/api/attendance/board/assessTrend.json?source=${isDataDoard ? 'databoard' : ''}`, params);
};
//【考勤看板】考勤统计范围-增加/编辑排除人员【4.5.6】
export const _excludeUserAdd = (params = {}) => {
    return post('/api/attendance/v2/excludeConfig/addOrEdit.json', params);
};

//【考勤看板】考勤统计范围-获取排除人员【4.5.6】
export const _excludeUser = (params = {}) => {
    return post('/api/attendance/v2/excludeConfig/get.json', params);
};

//【考勤看板】个人考勤-考核趋势【4.5.6】
export const _personalAssessTrend = (params = {}) => {
    return post('/api/attendance/board/personal/assessTrend.json', {}, {
        params: params
    });
};

// 丧假明细
// export const _getMourningList = (params = {}) => {
//     return get('/api/attendance/report/mourning/list.json', params);
// };
export const _getMourningList = (params = {}) => {
    return post('/api/attendance/report/mourning/list.json', params);
};

// 导出丧假明细
export const _exportMourningList = (params = {}) => {
    return post('/api/attendance/report/mourning/export.json', params);
};
// 考勤报表-导出
export const _offerSyncInfo = (params = {}) => {
    return get('/api/recruit/backCheck/offerSyncInfo.json', params);
};

// 【考勤看板】人员搜索
export const _userSearch = (params = {}) => {
    return get('/api/attendance/board/userSearch.json', params);
};

// 【考勤看板】部门搜索
export const _scopeDictList = (params = {}) => {
    return get('/api/attendance/board/scopeDictList.json', params);
};

// 【考勤看板-数据看板】部门搜索
export const _scopeDictBoardList = (params = {}) => {
    return get('/api/attendance/board/getBoardScopeDeptList.json', params);
};

// // 【节假日设置】获取节假日列表
// export const _getHolidayListPage = (params = {}) => {
//     return get('/api/attendance/v2/holiday/getListPage.json', params);
// };

// // 【节假日设置】获取单个节日日期详情
// export const _getHolidayById = (params = {}) => {
//     return get('/api/attendance/v2/holiday/getById.json', params);
// };

// // 【节假日设置】编辑节假日
// export const _editHolidayById = (params = {}) => {
//     return post('/api/attendance/v2/holiday/edit.json', params);
// };
export const _getNodePrevilege = (params = {}) => {
    return get('/api/process/center/nodePrivilege.json', params);
};

export const _getHolidayDetail= (params = {}) => {
    return get('/api/attendance/holiday/detail.json', params);
};




// 删除政策配置 -v4.9.9
export const _policyDelete = (id) => {
    return post(`/api/attendance/policy/delete.json?id=${id}`);
};
// 分页查询 -v4.9.9
export const _getPolicyPageList= (params = {}) => {
    return get('/api/attendance/policy/pageList.json', params);
};
// 获取基础信息 -v4.9.9
export const _childHolidayGetBaseInfo= (params = {}) => {
    return get('/api/apply/childHoliday/getBaseInfo.json', params);
};
// 根据生日计算预计发放情况 -v4.9.9
export const _getExpectResult= (params = {}) => {
    return get('/api/apply/childHoliday/getExpectResult.json', params);
};
export const _submitAtdChildHolidayApply = (params = {}) => {
    return post('/api/apply/childHoliday/submitAtdChildHolidayApply.json', params);
};
// 添加政策配置 -v4.9.9
export const _attendancePolicySave = (params = {}) => {
    return post('/api/attendance/policy/save.json', params);
};
export const _attendancePolicyEdit = (params = {}) => {
    return post('/api/attendance/policy/edit.json', params);
};

export const _listTeamApplyType = (params = {}) => {
    return get('/api/attendance/board/listTeamApplyType.json', params);
};

export const _getTeamUserAuth = (params = {}) => {
    return get('/api/attendance/board/getTeamUserAuth.json', params);
};


