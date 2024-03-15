import { get, post } from '@/services/http';

// 分片上传
export const _uploadChunk = (params = {}, type) => {
    return post(`/api/public/file/${type}/upload/chunk.json`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// 分片合并
export const _uploadChunkMerge = (params = {}, type) => {
    return post(`/api/public/file/${type}/upload/chunkMerge.json`, params);
};

// uploadId查询
export const _getInfo = (params = {}, type) => {
    return get(`/api/public/file/${type}/upload/getInfo.json`, params);
};

// 邮箱群组-列表
export const _groupList = (params = {}) => {
    return post('/api/it/email/group/list.json', params);
};

// 邮箱群组-保存群组规则
export const _saveRule = (params = {}) => {
    return post('/api/it/email/group/saveRule.json', params);
};

// 邮箱群组-群组规则回显
export const _getDetail = (params = {}) => {
    return post('/api/it/email/group/getById.json', params);
};

// 邮箱群组-打开或关闭默认发件权限
export const _openOrClose = (params = {}, flag) => {
    if(flag === 1) {
        return post('/api/it/email/group/disallowAllSenders.json', params);
    }else {
        return post('/api/it/email/group/allowAllSenders.json', params);
    }
};

// 邮箱群组-触发群组规则
export const _executeRules = (params = {}) => {
    return post('/api/it/email/group/executeRules.json', params);
};

//选人接口
export const _itSearchUser = (params = {}) => {
    return get('/api/common/userSearch.json', params);
};

// 邮箱群组-获取群组成员
export const _listReceiver = (params = {}) => {
    return post('/api/it/email/group/listReceiver.json', params);
};

// 邮箱群组-获取发件权限
export const _listSender = (params = {}) => {
    return post('/api/it/email/group/listSender.json', params);
};

// 获取IT人员列表
export const _itUserList = (params = {}) => {
    return post('/api/it/manager/list.json', params);
};

// 待处理列表
export const _pendList = (params = {}) => {
    return post('/api/it/email/process/list.json', params);
};

// vpn角色组-列表
export const _roleGroupList = (params = {}) => {
    return get('/api/it/vpn/roleGroup/list.json', params);
};

// vpn角色组-添加
export const _roleGroupAdd = (params = {}) => {
    return post('/api/it/vpn/roleGroup/add.json', params);
};

// vpn角色组-编辑
export const _roleGroupEdit = (params = {}) => {
    return post('/api/it/vpn/roleGroup/edit.json', params);
};

// vpn角色组-删除
export const _roleGroupDel = (params = {}) => {
    return post('/api/it/vpn/roleGroup/delete.json', params);
};

// vpn角色组-编辑回显
export const _roleGroupDetail = (params = {}) => {
    return get('/api/it/vpn/roleGroup/detail.json', params);
};

// 软件管理-操作系统获取
export const _getPlatform = (params = {}) => {
    return get('/api/common/dict/get/ops_platform/list.json', params);
};

// 软件管理-列表
export const _softwareList = (params = {}) => {
    return get('/api/it/software/listPage.json', params);
};

// 软件管理-编辑回显
export const _softwareDetail = (params = {}) => {
    return get('/api/it/software/detail.json', params);
};

// 软件管理-新增
export const _softwareAdd = (params = {}) => {
    return post('/api/it/software/add.json', params);
};

// 软件管理-编辑
export const _softwareEdit = (params = {}) => {
    return post('/api/it/software/edit.json', params);
};

// 软件管理-删除
export const _softwareDel = (params = {}) => {
    return post('/api/it/software/delete.json', params);
};

// 软件管理-排序
export const _softwareSort = (params = {}) => {
    return post('/api/it/software/sort.json', params);
};

// 软件管理-排序列表展示
export const _softwareSortList = (params = {}) => {
    return get('/api/it/software/downloadPage.json', params);
};

// 人员原理-保存
export const _userSave = (params = {}) => {
    return post('/api/it/manager/save.json', params);
};

// 公共邮箱-列表
export const _publicList = (params = {}) => {
    return post('/api/it/email/public/list.json', params);
};

// 公共邮箱-回收
export const _publicRecycle = (params = {}) => {
    return post('/api/it/email/public/recycle.json', params);
};

// 公共邮箱-新增
export const _publicAdd = (params = {}) => {
    return post('/api/it/email/public/add.json', params);
};

// 公共邮箱-启用
export const _publicEnable = (params = {}) => {
    return post('/api/it/email/public/enable.json', params);
};

// 邮箱群组-回收
export const _emailRecycle = (params = {}) => {
    return post('/api/it/email/group/recycle.json', params);
};