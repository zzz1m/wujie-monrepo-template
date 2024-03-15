import { get, post, postFileForm } from '@/services/http';

// it服务-我的信息-vpn
export const _myVpn = (params = {}) => {
    return get('/api/it/my/vpnInfo.json', params);
};

// it服务-我的信息-我负责的公共邮箱
export const _myEmail = (params = {}) => {
    return get('/api/it/my/email/resp/publicList.json', params);
};

// it服务-我的信息-我所在的邮箱群组
export const _myEmailIn = (params = {}) => {
    return get('/api/it/my/email/groupList.json', params);
};

// it服务-我的信息-我负责的邮箱群组
export const _myGroup = (params = {}) => {
    return get('/api/it/my/email/resp/groupList.json', params);
};

// it服务-我的信息-公共邮箱变更负责人
export const _itServiceMail = (params = {}, type) => {
    if(type === 0) {
        return post('/api/it/my/email/resp/publicEdit.json', params);
    }else if (type === 1) {
        return post('/api/it/my/email/resp/groupEdit.json', params);
    }else if (type === 2) {
        return post('/api/it/email/public/changeOwner.json', params);
    } else if (type === 3) {
        return post('/api/it/email/group/setOwner.json', params);
    }
};

// it服务-我的信息-群组成员列表
export const _listItServiceGroup = (params = {}) => {
    return post('/api/it/email/group/listReceiver.json', params);
};

// it服务-我的信息-获取成员列表
export const _getUser = (params = {}) => {
    return get('/api/common/userSearch.json', params);
};

// it服务-我的信息-群组成员列表
export const _getGroupUser = (params = {}) => {
    return post('/api/it/email/user/list.json', params);
};

// it服务-我的信息-群组成员列表-新增
export const _addGroupUser = (params = {}) => {
    return post('/api/it/email/group/addReceiver.json', params);
};

// it服务-我的信息-群组成员列表-删除
export const _delGroupUser = (params = {}) => {
    return post('/api/it/email/group/removeReceiver.json', params);
};

// it服务-我的信息-群组成员列表-删除
export const _delAllGroupUser = (params = {}) => {
    return post('/api/it/email/group/clearReceiver.json', params);
};

// it服务-我的信息-群组成员列表-导入
export const _importGroupUser = (params = {}) => {
    return postFileForm('/api/it/email/group/importReceiver.json', params);
};

// it服务-我的信息-群组成员列表-变更负责人
export const _changeGroupUser = (params = {}) => {
    return post('/api/it/my/email/resp/groupEdit.json', params);
};

// it服务-我的信息-群组成员列表-回收群组
export const _delGroup = (params = {}) => {
    return post('/api/it/my/email/resp/groupRecover.json', params);
};

export const _recyclePublicEmail = (params = {}) => {
    return post('/api/it/my/recyclePublicEmail.json', params);
};

// it服务-软件下载
export const _listItSoftware = (params = {}) => {
    return get('/api/it/software/downloadPage.json', params);
};

// it服务-软件下载次数
export const _recordDownloadTimes = (params = {}) => {
    return post('/api/it/software/record.json', params);
};

// it服务-软件下载平台
export const _getPlatform = (params = {}) => {
    return get('/api/common/dict/get/ops_platform/list.json', params);
};

// 【我的信息】负责的公共邮箱-管理使用人-列表
export const _manageUserList = (params = {}) => {
    return get('/api/it/my/email/resp/manageUserList.json', params);
};

// 【我的信息】负责的公共邮箱-管理使用人-删除使用人
export const _deleteManageUser = (params = {}) => {
    return post('/api/it/my/email/resp/deleteManageUser.json', params);
};

//【我的信息】负责的公共邮箱-管理使用人-新增使用人
export const _insertManageUser = (params = {}) => {
    return post('/api/it/my/email/resp/insertManageUser.json', params);
};