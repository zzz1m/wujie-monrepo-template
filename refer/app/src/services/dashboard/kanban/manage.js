import { get, post } from '@/services/http';

/**
 * 管理层看板
 */

// 团队概览
export const _teamOverview = (params = {}) => {
    return post('/api/databoard/teamOverview.json', params);
};
// 逐月增减情况
export const _periodChange = (params = {}) => {
    return post('/api/databoard/periodChange.json', params);
};
// 离职分布
export const _leaveDistribute = (params = {}) => {
    return post('/api/databoard/leaveDistribute.json', params);
};
// 职级分布
export const _seqDistribute = (params = {}) => {
    return post('/api/databoard/seqDistribute.json', params);
};
// 性别分布
export const _genderDistribute = (params = {}) => {
    return post('/api/databoard/genderDistribute.json', params);
};
// 年龄分布
export const _ageDistribute = (params = {}) => {
    return post('/api/databoard/ageDistribute.json', params);
};
// 司龄分布
export const _workDaysDistribute = (params = {}) => {
    return post('/api/databoard/workDaysDistribute.json', params);
};
// 学历分布
export const _academicDistribute = (params = {}) => {
    return post('/api/databoard/academicDistribute.json', params);
};
// 获取下拉列表
export const _scopeDictList = (params = {}) => {
    return get('/api/databoard/scopeDictList.json', params);
};
// 数据下钻
export const _getDetail = (params = {}) => {
    return post('/api/databoard/getDetail.json', params);
};
// 获取用户详情
export const _getUserInfoDetail = (params = {}) => {
    return post('/api/talentatlas/getUserInfoDetail.json', params);
};
// 获取离职原因分布
export const _leaveReasonDetailDistribute = (params = {}) => {
    return post('/api/databoard/leaveReasonDetailDistribute.json', params);
};

// 管理看板 V2


// 获取模块列表
export const _moduleList = (params = {}) => {
    return get('/api/databoard/v2/moduleList.json', params);
};

// 保存模块列表
export const _saveModuleList = (params = {}) => {
    return post('/api/databoard/v2/saveModuleList.json', params);
};


// 团队概览V2
export const _teamOverviewBoard = (params = {}) => {
    return post('/api/databoard/v2/teamOverview.json', params);
};

// 团队概览V2
export const _scopeDictListBoard = (params = {}) => {
    return get('/api/databoard/v2/scopeDictList.json', params);
};



// 获取组织架构图

export const _getDepartmentTree = (params = {}) => {
    return post('/api/databoard/v2/departmentTree.json', params);
};

// 搜索组织架构图

export const _getScopeDeptList = (params = {}) => {
    return post('/api/databoard/v2/scopeDeptList.json', params);
};



// 获取重点关注信息
export const _concernInfoBoard = (params = {}) => {
    return post('/api/databoard/v2/concernInfo.json', params);
};

// 获取团队考勤信息
export const _attendanceInfoBoard = (params = {}) => {
    return post('/api/databoard/v2/attendanceInfo.json', params);
};

// 获取B+占比趋势
export const _assessTrendBoard = (params = {}) => {
    return post('/api/databoard/v2/assessTrend.json', params);
};

// 绩优人员统计
export const _highPerfUserInfo = (params = {}) => {
    return post('/api/databoard/v2/highPerfUserInfo.json', params);
};

export const _recommendInfoBoard = (params = {}) => {
    return post('/api/databoard/v2/recommendInfo.json', params);
};

// 获取专业序列职级分布
export const _seqDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/seqDistribute.json', params);
};

// 获取职务分布
export const _positionDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/positionDistribute.json', params);
};

// 获取学历分布
export const _academicDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/academicDistribute.json', params);
};

// 获取性别分布
export const _genderDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/genderDistribute.json', params);
};

// 获取年龄分布
export const _ageDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/ageDistribute.json', params);
};

// 获取司龄分布
export const _workDaysDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/workDaysDistribute.json', params);
};

// 获取高级人才信息
export const _talentLeaveTrendBoard = (params = {}) => {
    return post('/api/databoard/v2/talentLeaveTrend.json', params);
};

// 获取其他统计信息（guide/内训师/面试官）
export const _otherInfoBoard = (params = {}) => {
    return post('/api/databoard/v2/otherInfo.json', params);
};

// 获取人员流动情况
export const _periodChangeBoard = (params = {}) => {
    return post('/api/databoard/v2/periodChange.json', params);
};

//获取离职分布
export const _leaveDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/leaveDistribute.json', params);
};

// 获取离职原因分布
export const _leaveReasonDetailDistributeBoard = (params = {}) => {
    return post('/api/databoard/v2/leaveReasonDetailDistribute.json', params);
};

// 绩优人员流失趋势
export const _highPerfUserLeaveTrendBoard = (params = {}) => {
    return post('/api/databoard/v2/highPerfUserLeaveTrend.json', params);
};

// 获取本月流动情况
export const _monthChangeBoard = (params = {}) => {
    return post('/api/databoard/v2/monthChange.json', params);
};

// 获取下钻详情列表
export const _boardDetailList = (params = {}) => {
    return post('/api/databoard/v2/detailList.json', params);
};

// 获取高学历人员
export const _curHighLevelStatistics = (params = {}) => {
    return post('/api/databoard/v2/talentCountTrend.json', params);
};


