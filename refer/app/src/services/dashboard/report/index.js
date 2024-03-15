import { get, post } from '@/services/http';

const config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
};
/**
 * 日报
 */
export const _getMyDaily = (params = {}) => {
    return post('/api/daily/my.json', params, config);
};
export const _saveMyDaily = (params = {}) => {
    return post('/api/daily/saveMyDaily.json', params, config);
};
export const _getTeamDaily = (params = {}) => {
    return post('/api/daily/team.json', params, config);
};
export const _getDirectlyDaily = (params = {}) => {
    return post('/api/daily/directly.json', params, config);
};
// 查看员工日报列表
export const _getDetailList = (params = {}) => {
    return get('/api/daily/team/detailList.json', params, config);
};

/**
 * 周报
 */
export const _getMyWeekly = (params = {}) => {
    return post('/api/weekly/my.json', params, config);
};
export const _saveMyWeekly = (params = {}) => {
    return post('/api/weekly/saveMyWeekly.json', params, config);
};
export const _getTeamWeekly = (params = {}) => {
    return post('/api/weekly/team.json', params, config);
};
export const _getDirectlyWeekly = (params = {}) => {
    return post('/api/weekly/directly.json', params, config);
};
export const _getWeeklyComment = (params = {}) => {
    return get('/api/daily/comment/list.json', params, config);
};
export const _addWeeklyComment = (params = {}) => {
    return post('/api/daily/comment/add.json', params);
};
export const _deleteWeeklyComment = (params = {}) => {
    return post('/api/daily/comment/del.json', params, config);
};
// export const announcementStatus = (params = {}) => {
//     return get('/api/old/phcc/admin/announcement/status.json', params);
// };
// export const upload = (params = {}) => {
//     return post('/api/ueditor/call.json', params);
// };
// 获取当前时间节点
export const _getTimeNodeList = (params = {}) => {
    return get('/api/weekly/getTimeNodeList.json', params);
};

/**
 * 月报
 */
export const _getMyMonth = (params = {}) => {
    return post('/api/monthly/my.json', params, config);
};
export const _saveMyMonth = (params = {}) => {
    return post('/api/monthly/saveMyMonthly.json', params, config);
};
export const _getTeamMonth = (params = {}) => {
    return post('/api/monthly/team.json', params, config);
};
export const _getDirectlyMonth = (params = {}) => {
    return post('/api/monthly/directly.json', params, config);
};

export const _getMonthTimeNodeList = (params = {}) => {
    return get('/api/monthly/getTimeNodeList.json', params);
};


/**
 * 删除设置
 * @param params
 * @returns {*}
 */
export const deleteSetting = (params = {}) => {
    return get('/api/old/phcc/admin/config/edit/delete.json', params);
};

// 图片上传
export const upload = (params = {}) => {
    return post('/api/ueditor/call.json', params);
};



/////// 日报提醒 
export const _getReportNotice = (params = {}) => {
    return get('/api/daily/remind/get.json', params);
};
export const _setReportNotice = (params = {}) => {
    return post('/api/daily/remind/setting.json', params, config);
};
export const _delReportNotice = (params = {}) => {
    return get('/api/daily/remind/cancel.json', params);
};

// 鹰眼相关
// 判断是否开通鹰眼
export const _isInYe = (params = {}) => {
    return get('/api/daily/ye.json', params, {
        quiet: true
    });
};
export const _getYeDaily = (params = {}) => {
    return post('/api/daily/getYeDaily.json', params);
};

/**
 * 最近联系人
 * @param params
 * @returns {*}
 */
export const _getLatestCopierList = (params = {}) => {
    return get('/api/daily/getLatestCopierList.json', params, config);
};

// 458.10 评论
// 获取评论树
export const _getCmtTree = (module,params = {}) => {
    return get(`/api/comment/${module}/tree.json`, params);
};
// 保存评论
export const _saveCmt = (module,params = {}) => {
    return post(`/api/comment/${module}/save.json`, params);
};
// 删除评论
export const _delCmt = (module,params = {}) => {
    return post(`/api/comment/${module}/delete.json`, params);
};