import { get, post } from '@/services/http';


//【工单】选人接口
export const _itSearchUser = (params = {}) => {
    return get('/api/it/bpm/searchUser.json', params);
};


//【工单】申请开通公共邮箱
export const _submitOpenPublicEmail = (params = {}) => {
    return post('/api/it/bpm/submitOpenPublicEmail.json', params);
};

//【通用】【邮箱用户】根据邮箱获取邮箱用户
export const _getByEmail = (params = {}) => {
    return post('/api/it/email/user/getByEmail.json', params);
};

//【工单】申请重置密码
export const _submitResetPassword = (params = {}) => {
    return post('/api/it/bpm/submitResetPassword.json', params);
};

//【通用】【邮箱用户】获取邮箱用户列表
export const _emailUserList = (params = {}) => {
    return post('/api/it/email/user/list.json', params);
};


//【工单】申请回收邮箱
export const _submitRecyclePublicEmail = (params = {}) => {
    return post('/api/it/bpm/submitRecyclePublicEmail.json', params);
};

//【工单】申请邮箱群组
export const _submitOpenEmailGroup = (params = {}) => {
    return post('/api/it/bpm/submitOpenEmailGroup.json', params);
};

//【【工单】申请调整发件人权限
export const _submitEmailSender = (params = {}) => {
    return post('/api/it/my/submitEmailSender.json', params);
};


//【通用】【邮箱群组】根据邮箱获取邮箱群组信息
export const _getGroupByEmail = (params = {}) => {
    return post('/api/it/email/group/getByEmail.json', params);
};


//【【通用】【邮箱用户】获取我负责的公共邮箱列表
export const _getOwnedPublicList = (params = {}) => {
    return get('/api/it/my/email/resp/publicList.json', params);
};

//【通用】【邮箱群组】查找我负责的邮箱群组列表
export const _getOwnedList = (params = {}) => {
    return post('/api/it/email/group/getOwnedList.json', params);
};

//【我的信息】【邮箱群组】获取发件权限列表
export const _groupInfo = (params = {}) => {
    return get('/api/it/my/email/resp/groupInfo.json', params);
};
//【我的信息】【邮箱群组】获取发件权限列表
export const _groupListSender = (params = {}) => {
    return post('/api/it/email/group/listSender.json', params);
};
//【【工单】申请开通VPN
export const _submitOpenVpn = (params = {}) => {
    return post('/api/it/bpm/submitOpenVpn.json', params);
};

//【【工单】申请开通远程权限
export const _submitOpenRemote = (params = {}) => {
    return post('/api/it/bpm/submitOpenRemote.json', params);
};

//【工单】申请开通Vpn资源
export const _submitOpenVpnResource = (params = {}) => {
    return post('/api/it/bpm/submitOpenVpnResource.json', params);
};

//【工单】申请其他
export const _submitOther = (params = {}) => {
    return post('/api/it/bpm/submitOther.json', params);
};

//【工单】申请设备维修
export const _submitRepairDevice = (params = {}) => {
    return post('/api/it/bpm/submitRepairDevice.json', params);
};

//【工单】设备信息
export const _assetInfo = (params = {}) => {
    return get('/api/it/my/assetInfo.json', params);
};

//【工单】申请开通VPN-保存
export const _saveOpenVpn = (params = {}) => {
    return post('/api/it/bpm/updateOpenVpn.json', params);
};

//【工单】申请设备维修-保存
export const _updateRepairDevice = (params = {}) => {
    return post('/api/it/bpm/updateRepairDevice.json', params);
};

//【工单】保存重置密码信息
export const _updateResetPassword = (params = {}) => {
    return post('/api/it/bpm/updateResetPassword.json', params);
};

//【通用】校验邮箱名是否存在
export const _checkExist = (params = {}) => {
    return post('/api/it/email/checkExist.json', params);
};

// 【工单】获取序列和在职天数
export const _getUserInfo = (params = {})=>{
    return post('/api/it/bpm/getUserInfo.json', params);
};