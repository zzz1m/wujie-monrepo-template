import { get, post } from '@/services/http';

/**
 * 资料待办
 */
// 列表查询
export const _getUserDocTodoList = (params = {}) => {
    return get('/api/user/doc/process/list.json', params);
};
// 详情
export const _getUserDocTodoDetail = (params = {}) => {
    return get('/api/user/doc/process/detail.json', params);
};
// 获取默认日期
export const _getUserDocDefaultDate = (params = {}) => {
    return get('/api/user/doc/process/defaultDate.json', params);
};
// 忽略
export const _userDocIgnore = (id) => {
    return post(`/api/user/doc/process/ignore.json?id=${id}`);
};
// 提交
export const _userDocCommit = (params = {}) => {
    return post('/api/user/doc/process/commit.json', params);
};
// 拆分pdf
export const _userDocSplit = (params = {}) => {
    return post('/api/user/doc/process/splitPdf.json', params);
};


/**
 * 资料管理
 */
// 列表查询
export const _getUserDocList = (params = {}) => {
    return get('/api/user/doc/list.json', params);
};
// 资料上传
export const _userDocUpload = (params = {}) => {
    return post('/api/user/doc/upload.json', params);
};
// 详情接口
export const _getUserDocDetail = (params = {}) => {
    return get('/api/user/doc/detail.json', params);
};
// 删除文件
export const _userDocDelete = (params = {}) => {
    return post(`/api/user/doc/deleteDetail.json?id=${params.id}`, params);
};
export const _getUserDocDetailIds = (params = {}) => {
    return get('/api/user/doc/detailList.json', params);
};