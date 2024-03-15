import { get, post, paramsQuery } from '@/services/http';
import { encrypt } from '@/utils/crypto';
// 生成链接
export const createUrl = (params = {}) => {
    return post('/api/unjoinedRecord/hr/createUrl.json', params);
};
// 查看待入职人员信息
export const getUnjoinedRecord = (params = {}) => {
    return get('/api/unjoinedRecord/hr/getUnjoinedRecord.json', params);
};
// 修改入职时间
export const updateEntryDate = (params = {}) => {
    return get('/api/unjoinedRecord/hr/updateEntryDate.json', params);
};
// 展示入职统计/人才库页面
export const unjoinedList = (params = {}) => {
    return get('/api/unjoinedRecord/hr/unjoinedList.json', params);
};
// 移入人才库
export const remove = (params = {}) => {
    return post('/api/unjoinedRecord/hr/remove.json', params);
};

// 基本信息
export const getinfo = (params = {}) => {
    return get('/api/unjoinedRecord/hr/getinfo.json', params);
};

// 工作经历
export const getworkingexp = (params = {}) => {
    return get('/api/unjoinedRecord/hr/getworkingexp.json', params);
};
// 教育经历
export const educationexp = (params = {}) => {
    return get('/api/unjoinedRecord/hr/educationexp.json', params);
};
// 家庭成员
export const familyNumber = (params = {}) => {
    return get('/api/unjoinedRecord/hr/familyNumber.json', params);
};
// 证书信息
export const _getCertificate = (params = {}) => {
    return get('/api/unjoinedRecord/hr/getCertificate.json', params);
};
// 政治面貌
export const getPolitics = (params = {}) => {
    return get('/api/unjoinedRecord/hr/getPolitics.json', params);
};
// 同步ehr
export const saveEhr = (params = {}) => {
    return get('/api/unjoinedRecord/hr/saveEhr.json', params);
};
// 获取ehrbp列表
export const getEhrBp = (params = {}) => {
    return get('/api/ehrbp/hr/getEhrBp.json', params);
};
// 还原人才
export const reback = (params = {}) => {
    return get('/api/unjoinedRecord/hr/reback.json', params);
};

/**
 * 待发、已发offer列表
 * 默认是待发offer（unsent）
 * @param params
 * @returns {*}
 */
export const getOffer = (params = {}, type = 'unsent') => {
    return get(`/api/offer/user/get/${type}OfferList.json`, params);
};

/**
 * offer详情
 * @param params
 */
export function offerDetails(params) {
    return get('/api/offer/user/get/offerDetail.json', params);
}
/**
 * offer详情-从待发offer-点击详情进入的弹窗
 * @param params
 */
export function offerDetails_pendingOffer(params) {
    return get('/api/offer/admin/get/offerApproveDetail.json',  params);
}
/**
 * offer详情-从【我的审批】-点击名字-进入的那个页面 需要的数据
 * @param params
 */
export function offerDetails_myApproval(params) {
    return get('/api/offer/admin/get/offerApproveDetail.json',  params);
}

/**
 * 更新offer资料
 * @param type 必填，类型（user.候选人信息 officeholding.任职信息 practice.实习信息 salary.薪资信息 entry.入职信息 offer.offer信息 other.其他信息）
 * @param params
 * @returns {*}
 */
export function setOfferDetail(type, params) {
    return post(`/api/offer/user/edit/offerDetail.json?type=${type}`, encrypt(params));
}

/**
 * 新增offer
 * @param params
 * @returns {*}
 */
export function insert(params) {
    return post('/api/offer/user/insert.json', encrypt(params));
}

/**
 * 拒绝、接受 、 删除 offer，默认删除
 * @param action(  denied / accepted / deleted )
 * @param params
 * @returns {*}
 */
export function changeOfferStatus(params, action = 'deleted') {
    return get(`/api/offer/user/offerStatus/${action}.json`, params);
}

/**
 * 修改审批状态
 * @param params
 * @param action（submit、提交审批  approve、审批同意  reject、审批拒绝）
 * @returns {*}
 */
export function changeApproveStatus(params, action = 'submit') {
    let enParams = action === 'submit' ? encrypt(params) : params;
    if (action == 'submit') {
        return post(`/api/offer/user/approveStatus/${action}.json`, enParams);
    }
    return get(`/api/offer/admin/approveStatus/${action}.json`, enParams);
}

/**
 * 审批列表
 * @param params
 * @param type（toDoList-待审批（默认）  allList-全部）
 * @returns {*}
 */
export function approveList(params, type = 'toDoList') {
    return get(`/api/offer/admin/myApprove/${type}.json`, params);
}

/**
 * 获取拼音
 * @param params
 * @returns {*}
 */
export function pinyin(params) {
    return get('/api/offer/user/pinyin.json', params);
}

/**
 * 校验二次入职
 * @param params
 * @returns {*}
 */
export function employ(params) {
    return get('/api/offer/user/second/employ.json', params);
}

/**入职管理 */
// 获取入职列表
export const getEntryList = (params = {}) => {
    return get('/api/entry/get/entryList.json', params);
};
// 调整入职日期
export const adjustEntryDate = (params = {}) => {
    return get('/api/entry/edit/entryDate.json', params);
};
// 新增入职
export const addEntry = (params = {}) => {
    return post('/api/entry/er/getUrl.json', params);
};
// 编辑入职
export const editEntry = (params = {}) => {
    return post('/api/entry/er/updateUrl.json', params);
};
// 取消入职
export const cancelEntry = (params = {}) => {
    return get('/api/entry/cancelEntry.json', params);
};
// 确认入职
export const confirmEntry = (params = {}) => {
    return get('/api/entry/confirmEntry.json', params);
};
// 删除入职数据
export const delEntry = (params = {}) => {
    return get('/api/entry/delete/entry.json', params);
};
// 发送待开邮箱
export const sendEmail = (params = {}) => {
    return get('/api/entry/sendEmail.json', params);
};
// 采集信息
export const collectMsg = (params = {}) => {
    return get('/api/entry/msgCollect.json', params);
};
// 获取账号信息
export const getAccountMsg = (params = {}) => {
    return get('/api/entry/getAccountMsg.json', params);
};
// 设置账号
export const setAccountMsg = (params = {}) => {
    return post('/api/entry/setAccountMsg.json', params);
};
// 待入职详情
export function entryDetails(params) {
    return get('/api/entry/user/get/entryDetail.json', params);
}
// 修改拒绝原因
export function offerReasonUpdate(params) {
    return get('/api/offer/user/offerReason/update.json', params);
}

// 流程中心 待办数量 
export function offerRemindTaskCount(params) {
    return get('/api/offer/user/remindTaskCount.json', params);
}
// 根据名称精确查找部门
export const _findDeptByName = (params = {}) => {
    return post('/api/offer/findDeptByName.json', params);
};



// 获取入职登记详情
export const _getUserRegisterMsg = (params = {}) => {
    return get('/api/entry/getUserRegisterMsg.json', params);
};

// 保存入职登记信息
export const _saveRegisterMsg = (params = {}) => {
    return post('/api/entry/saveRegisterMsg.json', params);
};

// 保存教育经历信息
export const _updateEdu = (params = {}) => {
    return post('/api/entry/user/updateEdu.json', params);
};

// 校验候选人是否有招聘流程
export const _checkRecruitCandidate = (params = {}) => {
    return get('/api/offer/user/checkRecruitCandidate.json', params);
};

// 根据sourceSign获取详情
export const _getOfferTemp = (params = {}) => {
    return get('/api/offer/user/get/offerTempInfo.json', params);
};

// 【招聘背景调查表】发起背调表单
export const _backCheckApply = (params = {}) => {
    return get('/api/recruit/backCheck/backCheckSyncInfo.json', params);
};

// 信息采集退回编辑
export const _backEdit = (params = {}) => {
    return post('/api/entry/backEdit.json', params);
};

// 信息采集核算完成
export const _accountingFinish = (params = {}) => {
    return post('/api/entry/accountingFinish.json', params);
};

// 获取取消入职通知人 4.5.13
export const _getCancelEntryNoticeEmail = (params = {}) => {
    return get('/api/entry/cancelEntryNoticeEmail.json', params);
};

// 获取已发offer通知人
export const _offerDeniedCCEmails = (params = {}) => {
    return get('/api/offer/offerDeniedCCEmails.json', {
        offerId: params.id
    });
};

// 聘用通知预览
export const _offerEmail = (params = {}) => {
    return get('/api/offer/preview/offerEmail.json', params);
};

// 【工作地点】通过大厦获取楼层
export const _getFloorByWorkplace = (params = {}) => {
    return get('/api/seat/place/getFloorByWorkplace.json', params);
};