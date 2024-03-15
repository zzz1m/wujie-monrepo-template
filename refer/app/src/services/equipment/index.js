import {get, post, paramsQuery} from '@/services/http';

// 获取资产列表
export const _getEquipmentList = (params = {}) => {
    return get(`/api/asset/manage/list.json`, params);
};
// 获取资产合同编号检索合同详情
export const _getCompactSearch = (params = {}) => {
    return get(`/api/asset/manage/compactSearch.json`, params);
};
// 获取资产合同编号获取资产明细下拉数据
export const _getcompactDetailSelect = (params = {}) => {
    return get(`/api/asset/manage/compactDetailSelect.json`, params);
};
// 新建资产 timeout:0 不限超时时间
export const _contractDetailSignForSave = (params = {},config ={timeout:0}) => {
    return post(`/api/asset/manage/contractDetailSignForSave.json`, params,config);
};
// 获取资产详情
export const _getManageDetail = (params = {}) => {
    return get(`/api/asset/manage/detail.json`, params);
};
// 编辑资产信息
export const _updateManageInfo = (params = {}) => {
    return post(`/api/asset/manage/update.json`, params);
};
// 资产领用
export const _manageUse = (params = {}) => {
    return post(`/api/asset/manage/use.json`, params);
};
// 资产归还
export const _manageRevert = (params = {}) => {
    return post(`/api/asset/manage/revert.json`, params);
};
// 资产变更使用人
export const _manageUpdateUse = (params = {}) => {
    return post(`/api/asset/manage/changeUse.json`, params);
};
// 资产维修
export const _manageRepair = (params = {}) => {
    return post(`/api/asset/manage/repair.json`, params);
};
// 资产完成维修
export const _manageRepairFinish = (params = {}) => {
    return post(`/api/asset/manage/repairFinish.json`, params);
};
// 资产报废
export const _manageScrap = (params = {}) => {
    return post(`/api/asset/manage/scrap.json`, params);
};
// 资产还原
export const _manageRestore = (params = {}) => {
    return post(`/api/asset/manage/restore.json`, params);
};
// 资产格式化
export const _manageFormat = (params = {}) => {
    return post(`/api/asset/manage/format.json`, params);
};
// 资产格式化完成
export const _manageFormatFinish = (params = {}) => {
    return post(`/api/asset/manage/formatFinish.json`, params);
};
// 资产删除
export const _manageDelete = (params = {}) => {
    return post(`/api/asset/manage/delete.json`, params);
};


// 申请归库列表
export const _getUseRevertList = (params = {}) => {
    return post(`/api/asset/useRevert/list.json`, params);
};
// 维修记录列表
export const _getRepairList = (params = {}) => {
    return post(`/api/asset/repair/list.json`, params);
};


// 资产盘点列表
export const _getCheckList = (params = {}) => {
    return get(`/api/asset/check/list.json`, params);
};
// 资产盘点详情列表
export const _getCheckDetailList = (params = {}) => {
    return get(`/api/asset/check/detailList.json`, params);
};
// 资产盘点详情调整盘点状态 
export const _updateCheckStatus = (params = {}) => {
    return post(`/api/asset/check/setStatus.json`, params);
};
// 资产盘点新建
export const _checkListAdd = (params = {}) => {
    return post(`/api/asset/check/add.json`, params);
};
// 资产盘点编辑
export const _checkListUpdate = (params = {}) => {
    return post(`/api/asset/check/update.json`, params);
};
// 资产盘点编辑时获取详情
export const _checkListGetDetail = (params = {}) => {
    return get(`/api/asset/check/get.json`, params);
};
// 根据城市获取人员信息 支持根据关键词搜索
export const _getPrincipalList = (params = {}) => {
    return get('/api/asset/check/getPrincipalList.json', params);
};
// 新建盘点的校验接口
export const _addCheck = (params = {}) => {
    return post('/api/asset/check/addCheck.json', params);
};

// 资产合同列表
export const _getCompactList = (params = {}) => {
    return get(`/api/asset/compact/list.json`, params);
};
// 修改资产合同
export const _updateCompactInfo = (params = {}) => {
    return post(`/api/asset/compact/update.json`, params);
};
// 计算资产增值税
export const _manageGetVat = (params = {}) => {
    return post(`/api/asset/compact/getVat.json`, params);
};
// 新建、保存资产合同（明细）
export const _compactSave = (params = {}) => {
    return post(`/api/asset/manage/compactSave.json`, params);
};

// 资产类别（树）
export const _categoryTree = (params = {}) => {
    return post(`/api/asset/category/tree.json`, params);
};
// 资产类别（列表）
export const _categoryList = (params = {}) => {
    return post(`/api/asset/category/list.json`, params);
};
//新增资产类别
export const _categoryAdd = (params = {}) => {
    return post(`/api/asset/category/add.json`, params);
};
//修改资产类别
export const _categoryUpdate = (params = {}) => {
    return post(`/api/asset/category/update.json`, params);
};
//删除资产类别
export const _categoryDelete = (params = {}) => {
    return post(`/api/asset/category/delete.json`, params);
};

/**
 * 打印标签
 * @param params(数组，用","分割)
 * @returns {*}
 * @private
 */
export const _print = (params = {ids: ''}) => {
    return post('/api/asset/manage/print.json', params);
};

// 员工模糊搜索
export const _userSearchInfo = (params = {}) => {
    return get(`/api/reservation/user/searchInfo.json`, params);
};


// 获取城市列表
export const _getCityList = (params = {}) => {
    return get(`/api/asset/workplace/list.json`, params);
};

// 转移城市
export const _transferCity = (params = {}) => {
    return post('/api/asset/manage/transferCity.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 资产批量操作
export const _batchOperate = (params = {}) => {
    return post(`/api/asset/manage/batchOperate.json`, params);
};

// 启用合同
export const _compactEnable = (params = {}) => {
    return post('/api/asset/manage/compactEnable.json', params);
};

// 根据合同id获取合同详情
export const _getContractDetail = (params = {}) => {
    return post('/api/asset/manage/getContractDetail.json', params);
};

// 删除合同
export const _compactDelete = (params = {}) => {
    return post('/api/asset/compact/delete.json', params);
};

// 获取资产报表列表
export const _getReportList = (params = {}) => {
    return post('/api/asset/getReportList.json', params, {
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    });
};

// 获取我的资产
export const _myAsset = (params = {}) => {
    return post('/api/asset/myAsset.json', params);
};

// 获取报错列表
export const _errorList = (params = {}) => {
    return post('/api/asset/errorList.json', params);
};

// 报错反馈
export const _dealWidthError = (params) => {
    return post('/api/asset/dealWithError.json', params);
};

// 资产报错反馈
export const _assetToReport = (params = {}) => {
    return post('/api/asset/assetToReport.json', params);
};

// 获取资产详情
export const _assetDetail = (params = {}) => {
    const url = params.isMySelf + '' === '0' ? '/api/asset/error/assetDetail.json' : '/api/asset/assetDetail.json';
    return post(url, params);
};

// 设置资产盘亏状态
export const _updateLossStatus = (params = {}) => {
    return post('/api/asset/manage/setCheckStatus.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 资产详情批量操作
export const _batchOperateCheckActivity = (params = {}) => {
    return post('/api/asset/check/batchOperateCheckActivity.json', params);
};

/**
 * 获取资产的MAC地址列表
 * @param {Object} params 
 */
export const _macList = (params = {}) => {
    return get('/api/asset/mac/list.json', params);
};

/**
 * 资产MAC地址更新保存
 * @param {Object} params 
 */
export const _macUpdate = (params = {}) => {
    return post('/api/asset/mac/update.json', params);
};

/**
 * 获取财务推送列表
 * @param {Object} params 
 */
export const _getFinancialList = (params = {}) => {
    return get('/api/asset/event/list.json', params);
};

/**
 * 财务推送
 * @param {Object} params 
 */
export const _batchPush = (params = {}) => {
    return post('/api/asset/event/pushToEBSPart.json', params);
};

/**
 * 获取残值计算
 * @param {Object} params 
 */
export const _getScrapValue = (params = {}) => {
    return post('/api/asset//manage/getScrapValue.json', params);
};

/**
 * 获取现价值
 * @param {Object} params 
 */
export const _getPresentValue = (params = {}) => {
    return post('/api/asset//manage/getPresentValue.json', params);
};

/**
 * 资产列表异步导出
 * @param {Object} params 
 */
export const _equipmentExport = (params = {}) => {
    return get('/api/asset/manage/export.json', params);
};

/**
 * 资产详情异步导出
 * @param {Object} params 
 */
export const _detailExport = (params = {}) => {
    return get('/api/asset/detail/export.json', params);
};

/**
 * 供应商名称字典
 * @param {Object} params 
 */
export const _supplierList = (params = {}) => {
    return get('/api/asset/compact/supplierList.json', params);
};

/**
 * 修改供应商名称
 * @param {Object} params 
 */
export const _editSupplier = (params = {}) => {
    return post('/api/asset/compact/editSupplier.json', params);
};

/**
 * 财务推送导出
 * @param {Object} params 
 */
export const _financialExport = (params = {}) => {
    return get('/api/asset/event/export.json', params);
};

/**
 * 资产盘点城市下拉选项 4.5.12
 * @param {Object} params 
 */
export const _checkCity = (params = {}) => {
    return get('/api/asset/check/city.json', params);
};

/**
 * 修改供应商名称
 * @param {Object} params 
 */
export const _applyTransfer = (params = {}) => {
    return post('/api/asset/applyTransfer.json', params);
};

/**
 * 申请转移前获取详情 4.5.12
 * @param {Object} params 
 */
export const _assetTransferDetail = (params = {}) => {
    return get('/api/asset/detail.json', params);
};
// 新建/保存-资产合同前的校验 4.5.12
export const _manageCheck = (params = {}) => {
    return post('/api/asset/manage/check.json', params);
};

export const _getAssetStatusList= (params = {}) => {
    return get('/api/asset/check/statusCount.json', params);
};
export const _getAssetCheckCityList= (params = {}) => {
    return get('/api/asset/check/edit/city.json', params);
};
