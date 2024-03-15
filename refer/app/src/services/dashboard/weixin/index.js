import { get, post } from '@/services/http';

// 获取权限下的员工统计
export const _getStaffStatistics = (params = {}) => {
    return get('/fabio/statistic.json', params);
};

// 获取权限下的员工列表
export const _getStaffList = (params = {}) => {
    return get('/fabio/staffList.json', params);
};


// 获取聊天记录
export const _getHistory = (params = {}) => {
    return get('/fabio/dialog.json', params);
};


// 获取群聊信息
export const _getGroupInfo = (params = {}) => {
    return get('/fabio/chatroom.json', params);
};


// 获取联系人列表
export const _getUserList = (params = {}) => {
    return get('/fabio/contactList.json', params);
};