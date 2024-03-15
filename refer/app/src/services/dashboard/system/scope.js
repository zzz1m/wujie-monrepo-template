import { get, post } from '@/services/http';

//获取管理范围
export const _getManaArea = (params = {}) => {
    return post('/api/sys/user/getManaArea.json', params);
};
//管理范围设置
export const _manaAreaSet = (params = {}) => {
    return post('/api/sys/user/manaAreaSet.json', params);
};
