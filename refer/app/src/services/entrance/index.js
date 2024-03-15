import {get, post, paramsQuery} from '@/services/http';
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
export const _getOfferList = (params = {}, type = 'unsent') => {
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
    return post(`/api/offer/user/edit/offerDetail.json?type=${type}`, params(params));
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
export function _changeOfferStatus(params, action = 'deleted') {
    return get(`/api/offer/user/offerStatus/${action}.json`, params);
}

// 接受 offer
export function _acceptOffer(params) {
    return get(`/api/offer/user/offerStatus/accepted.json`, params);
}
// 拒绝 offer
export function _denyOffer(params) {
    return get(`/api/offer/user/offerStatus/denied.json`, params);
}
// 删除 offer
export function _deleteOffer(params) {
    return get(`/api/offer/user/offerStatus/deleted.json`, params);
}



/**
 * 修改审批状态
 * @param params
 * @param action（submit、提交审批  approve、审批同意  reject、审批拒绝）
 * @returns {*}
 */
export function changeApproveStatus (params, action = 'submit') {
    if (action == 'submit') {
        return get(`/api/offer/user/approveStatus/${action}.json`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    return get(`/api/offer/admin/approveStatus/${action}.json`, params);
}

/**
 * 审批列表
 * @param params
 * @param type（toDoList-待审批（默认）  allList-全部）
 * @returns {*}
 */
export function approveList (params, type = 'toDoList') {
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

// 来源渠道
export const _getSourcePath = (params = {}) => {
    return get('/api/common/dict/get/source/list.json', params);
};
// 入职报表
export const _getOfferSheet = (params = {}) => {
    return get('/api/offer/report/list/offer.json', params);
};




