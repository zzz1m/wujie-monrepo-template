import { get, post } from '@/services/http';
const formHeader =  {'Content-Type': 'application/x-www-form-urlencoded'};

/////
export const _careList = (params = {}) => {
    return get('/api/user/care/getList.json', params);
};
export const _careSendEmail = (params = {}) => {
    return post('/api/user/care/sendEmail.json', params, {headers: formHeader});
};

//查询离职关怀列表
export const _listUserCareLeave = (params = {}) => {
    return get('/api/userCareLeave/listUserCareLeave.json', params);
};
export const _setSmsCollectState = (params = {}) => {
    return get('/api/userCareLeave/setSmsCollectState.json', params);
};
export const _listCollect = (params = {}) => {
    return get('/api/userCareLeave/listCollect.json', params);
};
export const _getSmsCollectState = (params = {}) => {
    return get('/api/userCareLeave/getSmsCollectState.json', params);
};
export const _operateUserCareLeave = (params = {}) => {
    return get('/api/userCareLeave/operateUserCareLeave.json', params);
};
export const _batchOperateUserCareLeave = (params = {}) => {
    return post('/api/userCareLeave/batchOperateUserCareLeave.json', params);
};
export const _updateCollect = (params = {}) => {
    return post('/api/userCareLeave/updateCollect.json', params);
};
