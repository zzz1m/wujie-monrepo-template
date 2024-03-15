import { get, post } from '@/services/http';
const formHeader =  {'Content-Type': 'application/x-www-form-urlencoded'};

//职位列表-管理员
export const _getJobList = (params = {}) => {
    return get('/api/job/user/get/jobList.json', params);
};
//获取公示详情
export const _getBanner = (params = {}) => {
    return get('/api/jobAnnounce/user/get/announce.json', params);
};
//获取职位详情
export const _getJobDetail = (params = {}) => {
    return get('/api/job/user/get/job/detail.json', params);
};
//获取我的推荐
export const _getMyList = (params = {}) => {
    return get('/api/jobRecommend/user/get/myJobRecommend/list.json', params);
};
//新增推荐
export const _addRecommend = (params = {}) => {
    return post('/api/jobRecommend/user/addOrUpdate/recommend.json', params);
};
//新增线索
export const _addClue = (params = {}) => {
    return post('/api/jobRecommend/user/addOrUpdate/clue.json', params);
};
//推荐列表
export const _getRecommendList = (params = {}) => {
    return get('/api/jobRecommend/admin/get/jobRecommend/list.json', params);
};
//更新进度状态
export const _updateProcess = (params = {}) => {
    return get('/api/jobRecommend/admin/update/process/status.json', params);
};
//更新奖励发放状态
export const _updateReward = (params = {}) => {
    return get('/api/jobRecommend/admin/update/reward/status.json', params);
};
//更新奖励发放状态
export const _getRecommendDetail = (params = {}) => {
    return get('/api/jobRecommend/user/get/jobRecommend/detail.json', params);
};

// 获取职位列表-管理员
export const _getAdminJobList = (params = {}) => {
    return get('/api/job/admin/get/allJobList.json', params);
};
// 新增职位
export const _addJob = (params = {}) => {
    return post('/api/job/admin/add/job.json', params);
};
// 更新职位
export const _updateJob = (params = {}) => {
    return post('/api/job/admin/update/job.json', params);
};
// 发布职位
export const _releaseJob = (params = {}) => {
    return get('/api/job/admin/release/job.json', params);
};
// 下线职位
export const _offlineJob = (params = {}) => {
    return get('/api/job/admin/offline/job.json', params);
};
// 删除职位
export const _deleteJob = (params = {}) => {
    return get('/api/job/admin/delete/job.json', params);
};
// 新增公示
export const _addAnnounce = (params = {}) => {
    return post('/api/jobAnnounce/admin/add.json', params);
};
// 更新公示
export const _updateAnnounce = (params = {}) => {
    return post('/api/jobAnnounce/admin/update.json', params);
};
// 推荐列表-导出带简历
export const _exportResume = (params = {}) => {
    return get('/api/jobRecommend/admin/export/recommend/resume.json', params);
};




///////2.0

// 邮件模板列表
export const _getEmailTemplateList = (params = {}) => {
    return get('/api/job/template/list.json', params);
};
// 新增邮件模板
export const _addEmailTemplate = (params = {}) => {
    return post('/api/job/template/add.json', params);
};
// 更新邮件模板
export const _updateEmailTemplate = (params = {}) => {
    return post('/api/job/template/update.json', params);
};
// 删除邮件模板
export const _delEmailTemplate = (params = {}) => {
    return get('/api/job/template/delete.json', params);
};
// 邮件提醒时可选择的邮件模版列表
export const _getEmailTemplateOpts = (params = {}) => {
    return get('/api/job/template/option.json', params);
};
// 选择模版后获取模版信息
export const _getEmailTemplateDetail = (params = {}) => {
    return get('/api/job/template/choose.json', params);
};
// 发送邮件提醒
export const _sendEmailNotice = (id, params = {}) => {
    return post(`/api/job/template/send.json?id=${id}`, params);
};


// 数据统计 汇总
export const _getMyGeneralizeStat = (params = {}) => {
    return get('/api/myGeneralize/stat.json', params);
};
// 数据统计 列表
export const _getMyGeneralizeList = (params = {}) => {
    return get('/api/myGeneralize/list.json', params);
};


// 运营统计
export const _getMyGeneralizeDataList = (params = {}) => {
    return get('/api/jobGeneralizeStat/list.json', params);
};
// 运营统计 明细
export const _getMyGeneralizeDataDetail = (params = {}) => {
    return get('/api/jobGeneralizeStat/detail/list.json', params);
};


// 设置BP
export const _sendRecommnedBP = (params = {}) => {
    return post('/api/jobRecommend/admin/update/reward/bp.json', params,{headers: formHeader});
};

// 对外文案设置
export const _sendRecommnedExternal = (params = {}) => {
    return post('/api/job/config/setting.json', params);
};
// 获取对外文案
export const _getRecommnedExternal = (params = {}) => {
    return get('/api/job/config/get.json', params);
};

/* 工作城市管理 */
// 添加工作城市
export const _addJobCity = (params = {}) => {
    return post('/api/job/city/add.json', params);
};
// 更新工作城市
export const _updateJobCity = (params = {}) => {
    return post('/api/job/city/update.json', params);
};
// 删除工作城市
export const _deleteJobCity = (params = {}) => {
    return post('/api/job/city/delete.json', params,{headers: formHeader});
};
// 查询工作城市
export const _getJobCityList = (params = {}) => {
    return get('/api/job/city/list.json', params);
};
// 操作备注
export const _addRemark = (params = {}) => {
    return post('/api/jobRecommend/admin/update/remark/bp.json', params);
};



