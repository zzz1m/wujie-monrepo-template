import { get, post } from '@/services/http';
const headerConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};


// 发起流程前校验
export const _checkBeforeStartProcess = (params = {}) => {
    return post('/api/residencePermit/process/user/checkBeforeStartProcess.json', params);
};

// 发起流程
export const _startProcess = (params = {}) => {
    return post('/api/residencePermit/process/user/startProcess.json', params);
};


// 我的业务-列表查询
export const _listMyProcess = (params = {}) => {
    return get('/api/residencePermit/process/user/listMyProcess.json', params);
};

// 我的业务-取消办理
export const _cancelProcess = (params = {}) => {
    return post('/api/residencePermit/process/user/cancelProcess.json', params);
};

// 指标列表查询
export const _indicatorsList = (params = {}) => {
    return get('/api/residencePermit/indicators/list.json', params);
};


// 新增/更新指标
export const _indicatorsEdit = (params = {}) => {
    return post('/api/residencePermit/indicators/edit.json', params);
};

// 指标持证人列表查询
export const _listIndicatorsUser = (params = {}) => {
    return get('/api/residencePermit/indicators/listIndicatorsUser.json', params);
};


// 证件列表查询
export const _listCredential = (params = {}) => {
    return get('/api/residencePermit/credential/listCredential.json', params);
};

// 更新证件信息
export const _updateCredential = (params = {}) => {
    return post('/api/residencePermit/credential/updateCredential.json', params);
};

// 证件办理记录
export const _listCredentialProcess = (params = {}) => {
    return get('/api/residencePermit/credential/listCredentialProcess.json', params);
};

// 管理员发起流程前校验
export const _adminCheckBeforeStartProcess = (params = {}) => {
    return post('/api/residencePermit/credential/checkBeforeStartProcess.json', params);
};

// 管理员发起流程
export const _adminStartProcess = (params = {}) => {
    return post('/api/residencePermit/credential/startProcess.json', params);
};

// 工作居住证-业务办理
export const _listBusinessProcessing = (params = {}) => {
    return get('/api/residencePermit/process/admin/listBusinessProcessing.json', params);
};


// 管理员发起流程
export const _handleBusiness = (params = {}) => {
    return post('/api/residencePermit/process/admin/handleBusiness.json', params);
};


// 管理员发起流程
export const _opLogList = (params = {}) => {
    return get('/api/residencePermit/opLog/list.json', params);
};



