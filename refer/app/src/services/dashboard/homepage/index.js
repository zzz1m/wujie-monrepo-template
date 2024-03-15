import { get, post } from '@/services/http';
const formHeader =  {'Content-Type': 'application/x-www-form-urlencoded'};

/////广播管理
// 
export const _broadcastList = (params = {}) => {
    return get('/api/homepage/broadcast/admin/get/list.json', params);
};
export const _broadcastUpdate = (params = {}) => {
    return post('/api/homepage/broadcast/admin/addOrUpdate.json', params);
};
export const _broadcastReleaseStatus = (params = {}) => {
    return post('/api/homepage/broadcast/admin/update/releaseStatus.json', params,{headers: formHeader});
};
export const _broadcastDel = (params = {}) => {
    return post('/api/homepage/broadcast/admin/delete.json', params,{headers: formHeader});
};

/////规章制度
export const _ruleList = (params = {}) => {
    return get('/api/homepage/rule/admin/get/list.json', params);
};
export const _ruleUpdate = (params = {}) => {
    return post('/api/homepage/rule/admin/addOrUpdate.json', params);
};
export const _ruleReleaseStatus = (params = {}) => {
    return post('/api/homepage/rule/admin/update/releaseStatus.json', params,{headers: formHeader});
};
export const _ruleEffectiveStatus = (params = {}) => {
    return post('/api/homepage/rule/admin/update/effectiveStatus.json', params,{headers: formHeader});
};
export const _ruleDel = (params = {}) => {
    return post('/api/homepage/rule/admin/delete.json', params,{headers: formHeader});
};

//////公告管理
export const _announcementList = (params = {}) => {
    return get('/api/homepage/announcement/admin/get/list.json', params);
};
export const _announcementUpdate = (params = {}) => {
    return post('/api/homepage/announcement/admin/addOrUpdate.json', params);
};
export const _announcementReleaseStatus = (params = {}) => {
    return post('/api/homepage/announcement/admin/update/releaseStatus.json', params,{headers: formHeader});
};
export const _announcementDel = (params = {}) => {
    return post('/api/homepage/announcement/admin/delete.json', params,{headers: formHeader});
};

//////常见问题
export const _questionList = (params = {}) => {
    return get('/api/homepage/question/admin/get/list.json', params);
};
export const _questionUpdate = (params = {}) => {
    return post('/api/homepage/question/admin/addOrUpdate.json', params);
};
export const _questionReleaseStatus = (params = {}) => {
    return post('/api/homepage/question/admin/update/releaseStatus.json', params,{headers: formHeader});
};
export const _questionDel = (params = {}) => {
    return post('/api/homepage/question/admin/delete.json', params,{headers: formHeader});
};
export const _questionSticky = (params = {}) => {
    return post('/api/homepage/question/admin/sticky.json', params,{headers: formHeader});
};


//////安全专区
export const _securityList = (params = {}) => {
    return get('/api/homepage/security/admin/get/list.json', params);
};
export const _securityUpdate = (params = {}) => {
    return post('/api/homepage/security/admin/addOrUpdate.json', params);
};
export const _securityReleaseStatus = (params = {}) => {
    return post('/api/homepage/security/admin/update/releaseStatus.json', params,{headers: formHeader});
};
export const _securityDel = (params = {}) => {
    return post('/api/homepage/security/admin/delete.json', params,{headers: formHeader});
};
export const _securitySticky = (params = {}) => {
    return post('/api/homepage/security/admin/sticky.json', params,{headers: formHeader});
};
export const _securitySortList = (params = {}) => {
    return get('/api/homepage/security/admin/sortView.json', params);
};
export const _securitySortUpdate = (params = {}) => {
    return post('/api/homepage/security/admin/updateSort.json', params);
};


/////权限设置
export const _authorityList = (params = {}) => {
    return get('/api/homepage/authority/admin/list.json', params);
};
export const _authorityAddOrUpdate = (params = {}) => {
    return post('/api/homepage/authority/admin/addOrUpdate.json', params);
};
export const _authorityDel = (params = {}) => {
    return post('/api/homepage/authority/admin/delete.json', params,{headers: formHeader});
};
// 所有文章分类
export const _articleCategoryList = (params = {}) => {
    return get('/api/homepage/authority/admin/articleCategory.json', params);
};

/////万花筒
export const _companyNewsList = (params = {}) => {
    return get('/api/homepage/companyNews/admin/get/list.json', params);
};
export const _companyNewsAddOrUpdate = (params = {}) => {
    return post('/api/homepage/companyNews/admin/addOrUpdate.json', params);
};
export const _companyNewsDel = (params = {}) => {
    return post('/api/homepage/companyNews/admin/delete.json', params,{headers: formHeader});
};
export const _companyNewsReleaseStatus = (params = {}) => {
    return post('/api/homepage/companyNews/admin/update/releaseStatus.json', params,{headers: formHeader});
};


/////单点登录
export const _ssoList = (params = {}) => {
    return get('/api/homepage/sso/admin/list.json', params);
};
export const _ssoAddOrUpdate = (params = {}) => {
    return post('/api/homepage/sso/admin/addOrUpdate.json', params);
};

export const _ssoGetDetail = (params = {}) => {
    return get('/api/homepage/sso/admin/detail.json', params);
};

export const _ssoDel = (params = {}) => {
    return post('/api/homepage/sso/admin/delete.json', params,{headers: formHeader});
};

// 获取模块下可编辑的文章分类
export const _articleList = (params = {}) => {
    return get('/api/homepage/authority/admin/article.json', params);
};

// 单点登录排序
export const _ssoListSort = (params = {}) => {
    return post('/api/homepage/sso/admin/updateSort.json', params);
};

/////////员工

// 首页
export const _userHomepageInfo = (params = {}) => {
    return get('/api/homepage/user/get/homepage.json', params);
};
//万花筒列表
export const _userCompanyNewsList = (params = {}) => {
    return get('/api/homepage/companyNews/user/get/list.json', params);
};
//规章制度列表
export const _userRuleList = (params = {}) => {
    return get('/api/homepage/rule/user/get/list.json', params);
};
//公告列表
export const _userAnnouncementList = (params = {}) => {
    return get('/api/homepage/announcement/user/get/list.json', params);
};
// 获取文章详情
export const _getArticleDetail = (modelType, params = {}) => {
    return get(`/api/homepage/${modelType}/user/get/detail.json`,params);
};

// 获取文章详情
export const _getArticleAdminDetail = (modelType, params = {}) => {
    return get(`/api/homepage/${modelType}/admin/get/detail.json`,params);
};

///////2.1
// 标签管理 分页
export const _tagList = (params = {}) => {
    return get('/api/homepage/label/admin/list.json', params);
};
// 标签管理 全部
export const _tagListAll = (params = {}) => {
    return get('/api/homepage/label/admin/getAll.json', params);
};
export const _tagAddOrUpdate = (params = {}) => {
    return post('/api/homepage/label/admin/addOrUpdate.json', params);
};

// 规章制度 置顶
export const _ruleSticky = (id,params = {}) => {
    return post(`/api/homepage/rule/admin/sticky.json?id=${id}`, params, {headers: formHeader});
};
// 公告 置顶
export const _announcementSticky = (id,params = {}) => {
    return post(`/api/homepage/announcement/admin/sticky.json?id=${id}`, params, {headers: formHeader});
};


// 排序
export const _ruleSortList = (params = {}) => {
    return get('/api/homepage/rule/admin/sortView.json', params);
};
export const _ruleSortUpdate = (params = {}) => {
    return post('/api/homepage/rule/admin/updateSort.json', params);
};

export const _announcementSortList = (params = {}) => {
    return get('/api/homepage/announcement/admin/sortView.json', params);
};
export const _announcementSortUpdate = (params = {}) => {
    return post('/api/homepage/announcement/admin/updateSort.json', params);
};

export const _companyNewsSortList = (params = {}) => {
    return get('/api/homepage/companyNews/admin/sortView.json', params);
};
export const _companyNewsSortUpdate = (params = {}) => {
    return post('/api/homepage/companyNews/admin/updateSort.json', params);
};

export const _questionSortList = (params = {}) => {
    return get('/api/homepage/question/admin/sortView.json', params);
};
export const _questionSortUpdate = (params = {}) => {
    return post('/api/homepage/question/admin/updateSort.json', params);
};
//常见问题-文章分类-排序
export const _updateArticleSort = (params = {}) => {
    return post('/api/homepage/authority/admin/updateArticleSort.json', params);
};
//万花筒-标签下拉列表
export const _getLabelList = (params = {}) => {
    return get('/api/homepage/companyNews/user/get/getLabelList.json', params);
};
//获取腾讯云点播上传签名
export const _getUploadSign = (params = {}) => {
    return get('/api/common/vod/getUploadSign.json', params);
};
//获取腾讯云点播播放签名
export const _getPlaySign = (params = {}) => {
    return post('/api/common/vod/'+params.fileId+'/getPlaySign.json', params);
};
// 获取首页人员查看视频的进度
export const _getVideoProgress = (params = {}) => {
    return get('/api/homepageUser/info.json', params);
};
// 更新人员查看视频进度
export const _updateVideoProgress = (params = {}) => {
    return post('/api/homepageUser/addOrUpdate.json', params);
};


// 我的日历-待办
export const _calendarAgent = (params = {}) => {
    return get('/api/homepage/v2/calendar/agent.json', params);
};
// 常见问题-已解决
export const _resolve = (params = {}) => {
    return post('/api/homepage/v2/user/solve.json', params, {headers: formHeader});
};
// 常见问题-未解决
export const _unsolve = (params = {}) => {
    return post('/api/homepage/v2/user/unsolve.json', params, {headers: formHeader});
};
// 常见问题-收藏
export const _collect = (params = {}) => {
    return post('/api/homepage/v2/user/collect.json', params, {headers: formHeader});
};
// 常见问题-取消收藏
export const _cancelCollect = (params = {}) => {
    return post('/api/homepage/v2/user/cancelCollect.json', params, {headers: formHeader});
};
// 常见问题-帮助中心列表
export const _getListByHot = (params = {}) => {
    return get('/api/homepage/v2/getListByHot.json', params, {headers: formHeader});
};
export const _searchQuestion = (params = {}) => {
    return post('/api/homepage/v2/searchQuestion.json', params);
};
// 常见问题-帮助中心搜索结果
export const _searchQuestionv2 = (params = {}) => {
    return get('/api/homepage/v2/question/category/list.json', params);
};
// 常见问题-收藏列表
export const _getCollection = (params = {}) => {
    return get('/api/homepage/v2/getCollection.json', params);
};
// 常见问题-分类列表
export const _getListByType = (params = {}) => {
    return get('/api/homepage/v2/getListByType.json', params, {headers: formHeader});
};
// 常见问题-分类下拉
export const _searchCategory = (params = {}) => {
    return post('/api/homepage/v2/searchCategory.json', params);
};
// 常见问题-标签下拉
export const _searchLabel = (params = {}) => {
    return post('/api/homepage/v2/searchLabel.json', params);
};
// 【常用导航】导航列表（点击编辑或添加导航）
export const _getCommonNavList = (params = {}) => {
    return get('/api/homepage/v2/nav/my.json', params);
};
// 【常用导航】添加导航及排序
export const _commonNavSort = (params = {}) => {
    return post('/api/homepage/v2/nav/sort.json', params);
};
// 【banner配置】列表
export const _bannerList = (params = {}) => {
    return get('/api/homepage/v2/banner/list.json', params);
};
// 【banner配置】编辑回显
export const _bannerDetail = (params = {}) => {
    return get('/api/homepage/v2/banner/detail.json', params);
};
// 【banner配置】添加
export const _addBanner = (params = {}) => {
    return post('/api/homepage/v2/banner/add.json', params);
};
// 【banner配置】更新
export const _updateBanner = (params = {}) => {
    return post('/api/homepage/v2/banner/edit.json', params);
};
// 【banner配置】排序
export const _bannerSort = (params = {}) => {
    return post('/api/homepage/v2/banner/sort.json', params);
};
// banner配置】发布
export const _bannerPublish = (params = {}) => {
    return get('/api/homepage/v2/banner/publish.json', params, {headers: formHeader});
};
// 【banner配置】下线
export const _bannerOffline = (params = {}) => {
    return get('/api/homepage/v2/banner/offline.json', params, {headers: formHeader});
};
// 【banner配置】删除
export const _bannerDel = (params = {}) => {
    return get('/api/homepage/v2/banner/del.json', params, {headers: formHeader});
};

// 导航搜索
export const _globalSearch= (params = {}) => {
    return get('/api/homepage/v2/global/search.json', params);
};
// 【业务咨询配置】列表
export const _consultList = (params = {}) => {
    return get('/api/homepage/v2/business_consult/admin/list.json', params);
};
// 【业务咨询配置】编辑回显
export const _consultDetail = (params = {}) => {
    return get('/api/homepage/v2/business_consult/admin/detail.json', params);
};
// 【业务咨询配置】排序
export const _consultSort = (params = {}) => {
    return post('/api/homepage/v2/business_consult/admin/sort.json', params);
};
// 【业务咨询配置】添加
export const _consultAdd = (params = {}) => {
    return post('/api/homepage/v2/business_consult/admin/add.json', params);
};
// 【业务咨询配置】更新
export const _consultUpdate = (params = {}) => {
    return post('/api/homepage/v2/business_consult/admin/update.json', params);
};
// 【业务咨询配置】删除
export const _consultDel = (params = {}) => {
    return post('/api/homepage/v2/business_consult/admin/delete.json', params);
};

//  首页获取基本信息
export const _getHomepageInfo= (params = {}) => {
    return get('/api/homepage/v2/user/get/homepage.json', params);
};

//  常见问题-搜索结果记录接口
export const _getRecord= (params = {}) => {
    return get('/api/homepage/v2/global/record.json', params);
};

// 获取点赞总数
export const _getShowInfo = (params = {}) => {
    return get('/api/activity/getShowInfo.json', params, {quiet:true});
};

// 获取点赞总数
export const _saveGiveLike = (params = {}) => {
    return post('/api/activity/saveGiveLike.json', params, {quiet:true});
};

// 获取全局搜索记录
export const _lastSearchKeywords = (params = {}) => {
    return get('/api/homepage/v2/global/lastSearchKeywords.json', params);
};

// 全局搜索有权限菜单
export const _menuSearch = (params = {}) => {
    return get('/api/homepage/v2/menu/search.json', params);
};

// 我的日历-代办标识
export const _calendarMonth = (params = {}) => {
    return get('/api/homepage/v2/calendar/month.json', params);
};


/**
 * [个人档案]待点亮徽章提示
 * @param {Object} params
 */
export const _hasLightingBadge = (params = {}) => {
    return get('/api/sys/user_record/lightingPrompted.json', params);
};

// 添加自定义导航 -v4.9.9
export const _navAddOrUpdate = (params = {}) => {
    return post(`/api/homepage/v2/nav/${params.id ? 'update' : 'add'}.json`, params);
};

// 删除自定义导航 -v4.9.9
export const _navDelete = (params = {}) => {
    return post('/api/homepage/v2/nav/delete.json', params, {headers: formHeader});
};

// 获取用户导航 -v4.9.9
export const _navMy = (params = {}) => {
    return get('/api/homepage/v2/nav/my.json', params);
};

// 导航排序 -v4.9.9
export const _navSort = (params = {}) => {
    return post('/api/homepage/v2/nav/sort.json', params);
};
