import { get, post } from '@/services/http';
import { encrypt } from '@/utils/crypto';

const config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
};

// 获取手机验证码
export const _getVerificationCode = (params = {}) => {
    return get('/api/salary/common/getVerificationCode.json', params);
};
// 校验验证码
export const _doVerificationCode = (params = {}) => {
    return post(`/api/salary/common/doVerificationCode.json?code=${params.code}`);
};

/**
 * 定调薪管理
 */
// 查询定调薪
export const _salaryList = (params = {}) => {
    return post('/api/salary/confirm/list.json', params);
};

// 定调薪类型列表
export const _salaryConfirmInfo = (params = {}) => {
    return get('/api/salary/confirm/info.json', params);
};

// 删除定调薪
export const _salaryDelete = (params = {}) => {
    return post('/api/salary/confirm/delete.json', params);
};

// 失效定调薪
export const _salaryFailure = (params = {}) => {
    return post('/api/salary/confirm/failure.json', params);
};

// 作废定调薪
export const _salaryInvalid = (params = {}) => {
    return post('/api/salary/confirm/invalid.json', params);
};

// 新增 更新 定调薪
export const _salaryInsert = (params = {}) => {
    const api = params.id ? '/api/salary/confirm/update.json' : '/api/salary/confirm/insert.json';
    return post(api, encrypt(params));
};

// 获取定调薪用户状态数量
export const _salaryCountByUserState = (params = {}) => {
    return get('/api/salary/confirm/countByUserState.json', params);
};


// 定调薪类型列表
export const _salaryConfirmType = (params = {}) => {
    return get('/api/salary/confirm/type.json', params);
};

// 定调薪状态列表
export const _salaryConfirmState = (params = {}) => {
    return get('/api/salary/confirm/state.json', params);
};

// 参保记录列表
export const _insureRecordList = (params = {}) => {
    return post('/api/salary/insure/record/list.json', params);
};

// 参保记录列表
export const _insureRecordDateRange = (params = {}) => {
    return get('/api/salary/insure/record/getDateRange.json', params);
};

// 【4.5.11】根据id获取参保记录详情
export const _insureRecordGetById = (params = {}) => {
    return get('/api/salary/insure/record/getById.json', params);
};

// 【4.5.11】编辑参保记录
export const _insureRecordEditById = (params = {}) => {
    return post('/api/salary/insure/record/editById.json', encrypt(params));
};

// 【4.5.11】删除参保记录详情
export const _insureRecordDeleteById = (params = {}) => {
    return post('/api/salary/insure/record/deleteById.json', params);
};

// 专项附加扣除
export const _specialList = (params = {}) => {
    return post('/api/salary/book/specialDeduct/list.json', params);
};
// 年终奖列表
export const _yearBonusList = (params = {}) => {
    return post('/api/salary/book/yearBonus/list.json', params);
};

// 年终奖获取时间
export const _getYearRange = (params = {}) => {
    return get('/api/salary/book/yearBonus/getYearRange.json', params);
};

// 年终奖获取时间
export const _yearBonusDeleteById = (params = {}) => {
    return post('/api/salary/book/yearBonus/deleteById.json', params);
};

//【年终奖台账】编辑台账数据
export const _yearBonusEditById = (params = {}) => {
    return post('/api/salary/book/yearBonus/editById.json', params);
};

//【年终奖台账】编辑台账数据
export const _yearBonusGetById = (params = {}) => {
    return get('/api/salary/book/yearBonus/getById.json', params);
};


//【年终奖台账】计算台账数据
export const _yearBonusCalcData = (params = {}) => {
    return post('/api/salary/book/yearBonus/calcData.json', params);
};

// 获取台账月份列表
export const _specialDeductDateRange = (params = {}) => {
    return get('/api/salary/book/specialDeduct/getDateRange.json', params);
};


/**
 * 竞业信息
 */
// 获取竞业信息列表
export const _competitionList = (params = {}) => {
    return post('/api/salary/competition/listPage.json', params);
};

// 新增编辑竞业信息
export const _competitionAddOrUpdate = (params = {}) => {
    const api = params.id ? '/api/salary/competition/edit.json' : '/api/salary/competition/add.json';
    return post(api, encrypt(params));
};

// 获取竞业信息详情
export const _getCompetitionById = (params = {}) => {
    return get('/api/salary/competition/getById.json', params);
};

// 删除竞业信息
export const _competitionDeleteById = (params = {}) => {
    return post(`/api/salary/competition/deleteById.json?id=${params.id}`, params);
};

// 获取用户最新竞业限制信息
export const _getCompetitionByUserId = (params = {}) => {
    return get('/api/salary/competition/getByUserId.json', params);
};

/**
 * 外部人员信息
 */
//【外部人员信息】列表查询
export const _externalUserList = (params = {}) => {
    return post('/api/salary/externalUser/list.json', params);
};

//【外部人员信息】保存
export const _externalUserSave = (params = {}) => {
    return post(`/api/salary/externalUser/${params.id ? 'save' : 'add'}.json`, params);
};

//【外部人员信息】删除
export const _externalUserDelete = (params = {}) => {
    return post('/api/salary/externalUser/delete.json', params);
};

//【外部人员信息】导出检查
export const _externalUserExportCheck = (params = {}) => {
    return get('/api/salary/externalUser/export/check.json', params);
};

//【外部人员信息】获取工资组下拉
export const _groupDropDown = (params = {}) => {
    return get('/api/salary/externalUser/groupDropDown.json', params);
};

//【外部人员信息】详情查询
export const _externalUserDetail = (params = {}) => {
    return get('/api/salary/externalUser/detail.json', params);
};

//【外部人员信息】获取相关字典
export const _externalAboutDict = (params = {}) => {
    return get('/api/salary/externalUser/aboutDict.json', params);
};

//【外部人员信息】导出检查
export const _externalExportCheck = (params = {}) => {
    return get('/api/salary/externalUser/export/check.json', params);
};

/**
 * 工资组
 */
// 工资组列表
export const _salaryGroupList = (params = {}) => {
    return get('/api/salary/group/list.json', params);
};

// 校验工资组
export const _salaryGroupCheckChanged = (params = {}) => {
    return post('/api/salary/group/checkChanged.json', params);
};

// 创建更新工资组
export const _salaryGroupAddOrUpdate = (params = {}) => {
    const api = params.id ? '/api/salary/group/edit.json' : '/api/salary/group/add.json';
    return post(api, params, {
        quiet: true
    });
};

// 启用工资组
export const _salaryGroupEnable = (params = {}) => {
    return post('/api/salary/group/enable.json', params,  {
        quiet: true
    });
};

// 停用工资组
export const _salaryGroupDisable = (params = {}) => {
    return post('/api/salary/group/disable.json', params);
};

// 获取工资组详情
export const _getSalaryGroupInfoById = (params = {}) => {
    return get('/api/salary/group/getById.json', params);
};

// 获取导入当前月和前一个月
export const _getImportMonth = (params = {}) => {
    return get('/api/salary/common/getImportMonth.json', params);
};


/**
 * 工资条
 */
 
// 工资条列表
export const _salarySheetInfoSyncCal = (params = {}) => {
    return post('/api/salary/sheetInfo/syncCal.json', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};


// 工资条列表
export const _salarySlipList = (params = {}) => {
    return get('/api/salary/slip/list.json', params);
};

// 获取工资表下拉
export const _salarySlipTableList = (params = {}) => {
    return get('/api/salary/slip/sheetDropDown.json', params);
};

// 创建工资条
export const _salarySlipCreate = (params = {}) => {
    return post('/api/salary/slip/createPhaseOne.json', params);
};

// 获取模板
export const _salarySlipTemplate = (params = {}) => {
    return get('/api/salary/slip/template.json', params);
};

// 获取员工下拉
export const _salarySlipTemplatePeople = (params = {}) => {
    return get('/api/salary/slip/userDropDown.json', params);
};

// 获取员工工资条信息
export const _salarySlipDetail = (params = {}) => {
    return get('/api/salary/slip/userSalarySlip.json', params);
};

// 保存工资条模板信息
export const _salarySlipTemplateSave = (params = {}) => {
    return post('/api/salary/slip/createPhaseTwo.json', params);
};

// 删除工资条
export const _salarySlipDelete = (params = {}) => {
    return post('/api/salary/slip/delete.json', params);
};

// 获取工资条明细列表
export const _salarySlipDetailList = (params = {}) => {
    return get('/api/salary/slip/detail/list.json', params);
};

// 获取发送列表
export const _salarySlipSendList = (params = {}) => {
    return get('/api/salary/slip/detail/send/list.json', params);
};

// 工资条发送
export const _salarySlipSend = (params = {}) => {
    return post('/api/salary/slip/detail/send.json', params);
};

// 工资条撤回
export const _salarySlipReject = (params = {}) => {
    return post('/api/salary/slip/detail/recall.json', params);
};

// 工资条获取员工发送类型
export const _salarySlipSendType = (params = {}) => {
    return get('/api/salary/slip/detail/sendType.json', params);
};

// 工资条导出
export const _salarySlipExport = (params = {}) => {
    return get('/api/salary/slip/detail/export.json', params, {responseType: 'blob'});
};

// 工资条预览
export const _salarySlipPreview = (params = {}) => {
    return get('/api/salary/slip/detail/preview.json', params);
};

/**
 * 工资表
 */
// 我管理的工资组
export const _getMyGroupList = (params = {}) => {
    return get('/api/salary/group/getMyGroupList.json', params);
};

// 创建
export const _createSalarySheet = (params = {}) => {
    return post('/api/salary/sheetInfo/createSalarySheet.json', params);
};

// 归档
export const _archiveSalarySheet = (params = {}) => {
    return post(`/api/salary/sheetInfo/archiveSalarySheet.json?bookDate=${params.bookDate}`);
};

// 工资表月份
export const _getSalaryMonth = (params = {}) => {
    return get(`/api/salary/sheetInfo/getSalaryDateList.json`);
};

// 删除
export const _deleteSalarySheet = (params = {}) => {
    return post(`/api/salary/sheetInfo/deleteSalarySheet.json?sheetId=${params.sheetId}`);
};

// 导入
export const _importSalarySheet = (params = {}) => {
    return post(`/api/salary/sheetInfo/init/import.json`, params);
};

// 汇总表

export const _salarySheetSummary = (params = {}) => {
    return get('/api/salary/sheetInfo/getSalarySheetInfo.json', params);
};
// 明细
export const _salarSheetInfo = (params = {}) => {
    return post('/api/salary/sheetInfo/pageList.json', params);
};
// 明细导出
export const _salarSheetExporDetail = (params = {}, bookDate) => {
    return post(`/api/salary/sheetInfo/exportTab.json?bookDate=${bookDate}`, params, {
        responseType: 'blob'
    });
};

/**
 * 台账
 */
// 津补贴计算
export const _accountBookCalSubsidy = (params = {}, type) => {
    const apiMap = {
        other: '/api/salary/book/other/calcData.json',
        subsidy: '/api/salary/book/subsidy/calcData.json',
        kpi: '/api/salary/book/kpi/calcData.json',
        bonus: '/api/salary/book/bonus/calcData.json'
    };

    return post(apiMap[type], params);
};
// 台账月份

export const _accountBookMonthList = (params = {}, bookType) => {
    return get(`/api/salary/book/${bookType}/getDateRange.json`, params);
};
// 同步竞业台账
export const _accountBookSyncCompetition = (params = {}) => {
    return post('/api/salary/book/competition/sync.json', params);
};

// 【4.5.11】根据id获取考勤台账详情
export const _accountBookGetById = (params = {}, bookType) => {
    return get(`/api/salary/book/${bookType}/getById.json`, params);
};

// 【4.5.11】编辑考勤台账
export const _accountBookEditById = (params = {}, type) => {
    return post(`/api/salary/book/${type}/editById.json`, params);
};

// 查询列表
export const _accountBookPageList = (params = {}, bookType) => {
    return post(`/api/salary/book/${bookType}/list.json`, params);
};
// 导入
export const _accountBookImport = (params = {}, bookType) => {
    return post(`/api/salary/book/${bookType}/importExcel.json`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
// 导出
export const _accountBookExport = (params = {}, bookType) => {
    return get(`/api/salary/book/${bookType}/exportExcel.json`, params);
};
// 获取失败数据
export const _accountBookExportFail = (params = {}, bookType) => {
    return get(`/api/salary/book/${bookType}/exportError.json`, params);
};
// 删除数据
export const _accountBookDelData = (params = {}, bookType) => {
    return post(`/api/salary/book/${bookType}/deleteById.json`, params);
};

// 同步离职信息
export const _accountSyncUserInfo = (params = {}) => {
    return post(`/api/salary/book/userInfo/syncUserInfo.json`, params);
};

// 城市最低工资列表
export const _salaryCityList = (params = {}) => {
    return get('/api/salary/city/list.json', params);
};

// 更新城市最低工资
export const _updateCityList = (params = {}) => {
    return post('/api/salary/city/update.json', params);
};

// 添加城市最低工资列表
export const _insertCityList = (params = {}) => {
    return post('/api/salary/city/insert.json', params);
};

// 删除城市最低工资列表
export const _deleteCityList = (params = {}) => {
    return post('/api/salary/city/delete.json', params);
};

// 工资结构管理
// 工资结构列表
export const _salaryStructureList = (params = {}) => {
    return get('/api/salary/category/list.json', params);
};

// 创建更新工资结构
export const _addSalaryStructure = (params = {}) => {
    if (params.id) {
        return post('/api/salary/category/edit.json', params);
    }
    return post('/api/salary/category/add.json', params);
};

// 排序工资结构
export const _sortSalaryStructure = (params = {}) => {
    return post('/api/salary/category/sort.json', params);
};

// 启用停用工资结构
export const _enableSalaryStructure = (params = {}) => {
    const status = params.status;
    delete params.status;
    if (status) {
        return post('/api/salary/category/disable.json', params); 
    }
    return post('/api/salary/category/enable.json', params);
};

// 工资项目列表
export const _salaryProjectList = (params = {}) => {
    return get('/api/salary/project/list.json', params);
};

// 创建更新工资项目
export const _addSalaryProject = (params = {}) => {
    if (params.id) {
        return post('/api/salary/project/edit.json', params);
    }
    return post('/api/salary/project/add.json', params);
};

// 排序工资项目
export const _sortSalaryProject = (params = {}) => {
    return post('/api/salary/project/sort.json', params);
};

// 启用停用工资项目
export const _enableSalaryProject = (params = {}) => {
    const status = params.status;
    delete params.status;
    if (status) {
        return post('/api/salary/project/disable.json', params); 
    }
    return post('/api/salary/project/enable.json', params);
};

// 工资方案列表
export const _salaryPlanList = (params = {}) => {
    return get('/api/salary/plan/list.json', params);
};

// 创建更新工资方案
export const _addSalaryPlan = (params = {}) => {
    if (params.id) {
        return post('/api/salary/plan/edit.json', params);
    }
    return post('/api/salary/plan/add.json', params);
};

// 排序工资方案
export const _sortSalaryPlan = (params = {}) => {
    return post('/api/salary/plan/sort.json', params);
};

// 启用停用工资方案
export const _enableSalaryPlan = (params = {}) => {
    const status = params.status;
    delete params.status;
    if (status) {
        return post('/api/salary/plan/disable.json', params); 
    }
    return post('/api/salary/plan/enable.json', params);
};
// 查找工资组人员列表
export const _searchGroupUser = (params = {}) => {
    return get('/api/salary/group/searchGroupUser.json', params);
};

// 标签管理
// 获取标签类型列表
export const _labelList = (params = {}) => { 
    return get('/api/salary/label/type/list.json', params);
};

export const _addLabel = (params = {}) => {
    return post('/api/salary/label/type/add.json', params);
};

export const _updateLabel = (params = {}) => {
    return post('/api/salary/label/type/edit.json', params);
};

export const _switchLabel = (params = {}) => {
    let status = params.status;
    delete params.status;
    if (!status) {
        return post('/api/salary/label/type/enable.json', params);
    }
    return post('/api/salary/label/type/disable.json', params);
};

export const _sortLabel = (params = {}) => {
    return post('/api/salary/label/type/sort.json', params);
};

export const _labelValueList = (params = {}) => {
    return get('/api/salary/label/list.json', params);
};

export const _addLabelValue = (params = {}) => {
    return post('/api/salary/label/add.json', params);
};

export const _updateLabelValue = (params = {}) => {
    return post('/api/salary/label/edit.json', params);
};

export const _switchLabelValue = (params = {}) => {
    let status = params.status;
    delete params.status;
    if (!status) {
        return post('/api/salary/label/enable.json', params);
    }
    return post('/api/salary/label/disable.json', params);
};

export const _sortLabelValue = (params = {}) => {
    return post('/api/salary/label/sort.json', params);
};

export const _createSalaryLabel = (params = {}) => {
    return post('/api/salary/sheetInfo/createSalaryLabel.json', params, {quiet:true});
};

export const _deleteSalaryLabel = (params = {}) => {
    return post(`/api/salary/sheetInfo/deleteSalaryLabel.json?id=${params.id}`, params);
};

export const _updateSalaryLabel = (params = {}) => {
    return post('/api/salary/sheetInfo/updateSalaryLabel.json', params, {quiet:true});
};

export const _getSalarySheetLabelPageList = (params = {}) => {
    return post('/api/salary/sheetInfo/getSalarySheetLabelPageList.json', params);
};

export const _getSalaryLabelTypeCountList = (params = {}) => {
    return get('/api/salary/sheetInfo/getSalaryLabelTypeCountList.json', params);
};
// 4510年终奖
// 查找工资组人员列表
export const _getSalaryYearBonusDateRange = (params = {}) => {
    return get('/api/salary/sheetInfo/getSalaryYearBonusDateRange.json', params);
};
// 年终奖信息查看
export const _getBonusSheetInfo = (params = {}) => {
    return get('/api/salary/sheetInfo/getBonusSheetInfo.json', params);
};
// 年终奖归档
export const _archiveBonus = (params = {}) => {
    return post(`/api/salary/sheetInfo/archiveBonus.json?year=${params.year}`);
};
// 创建工资表
export const _createBonus = (params = {}) => {
    return post('/api/salary/sheetInfo/createBonus.json', params);
};
// 年终奖同步并计算
export const _syncCalYearBonus = (params = {}) => {
    return post('/api/salary/sheetInfo/syncCalYearBonus.json', params, config);
};


// 【工资条】编辑工资条-4.5.9
export const _editSalarySlip = (params = {}) => {
    return post('/api/salary/slip/editSalarySlip.json', params);
};

export const _calTotalItems = (params = {}) => {
    return get('/api/salary/sheetInfo/calTotalItems.json', params);
};

// 【工资条】实时同步
export const _slipSyncRT = (params = {}) => {
    return get('/api/salary/slip/syncRT.json', params);
};


export const _changeTaxTypeSingle = (params = {}) => {
    return post('/api/salary/sheetInfo/tax/save.json', params);
};
export const _adjustComputeInfo = (params = {}) => {
    return post('/api/salary/sheetInfo/adjust/save.json', params);
};

// 【4.5.11】【不算薪人员】列表查询
export const _getIgnoreUserList = (params = {}) => {
    return post('/api/salary/book/ignoreUser/list.json', params);
};
// 【4.5.11】【不算薪人员】创建不算薪人员接口
export const _addIgnoreUser = (params = {}) => {
    return post('/api/salary/book/ignoreUser/batchAdd.json', params);
};
// 【4.5.11】【不算薪人员】删除接口
export const _delIgnoreUser = (params = {}) => {
    return post('/api/salary/book/ignoreUser/deleteById.json', params);
};
export const _getIgnoreUserDataRange = (params = {}) => {
    return get('/api/salary/book/ignoreUser/getDateRange.json', params);
};
// 获取员工薪酬档案
export const _getArchiveInfo = (params = {}) => {
    return get('/api/salary/confirm/getArchiveInfo.json', params);
};

// 获取高级筛选表列表
export const _getSalaryMetadataTableList = (params = {}) => {
    return post('/api/salary/metadata/table/list.json', params);
};
// 获取高级筛选字段列表
export const _getSalaryMetadataFieldList = (params = {}) => {
    return post('/api/salary/metadata/field/list.json', params);
};

export const _getSalaryFormulaList = (params = {}) => {
    return get('/api/salary/formula/list.json', params);
};


// 【社保公积金减员待办】列表查询
export const _socialSecurityReduceUserList = (params = {}) => {
    return get('/api/salary/socialSecurityReduceUser/list.json', params);
};
// 【社保公积金减员待办】删除
export const _socialSecurityReduceUserDelete = (params = {}) => {
    return post('/api/salary/socialSecurityReduceUser/delete.json', params);
};
// 【社保减员待办】减员
export const _socialSecurityReduceUserReduce = (params = {}) => {
    return post('/api/salary/socialSecurityReduceUser/state/reduce.json', params, config);
};


// 工资表导入默认展示月份 -v4.9.2
export const _getToImportSalaryDate = (params = {}) => {
    return get('/api/salary/sheetInfo/getToImportSalaryDate.json', params);
};
// 年终奖导入默认展示年 -v4.9.2
export const _getToImportYear = (params = {}) => {
    return get('/api/salary/sheetInfo/getToImportYear.json', params);
};
// 年终奖错误数据导出 -v4.9.2
export const _exportYearBonusErrorData = (params = {}) => {
    return get('/api/salary/sheetInfo/exportYearBonusErrorData.json', params);
};
// 年终奖导入 -v4.9.2
export const _importYearBonus = (params = {}) => {
    return post('/api/salary/sheetInfo/importYearBonus.json', params, config);
};
// 年终奖模板导出 -v4.9.2
export const _exportYearBonusTemplate = (params = {}) => {
    return get('/api/salary/sheetInfo/exportYearBonusTemplate.json', params);
};
// 工资表错误数据导出 -v4.9.2
export const _exportSalarySheetErrorData = (params = {}) => {
    return get('/api/salary/sheetInfo/exportSalarySheetErrorData.json', params);
};
// 工资表导入 -v4.9.2
export const _importSalarySheetResult = (params = {}) => {
    return post('/api/salary/sheetInfo/importSalarySheet.json', params, config);
};
// 工资表模板导出 -v4.9.2
export const _exportSalarySheetTemplate = (params = {}) => {
    return get('/api/salary/sheetInfo/exportSalarySheetTemplate.json', params);
};

// 列表查询 -4.10.8
export const _getContractBodyLocationList = (params = {}) => {
    return get('/api/salary/contractionLocation/getContractBodyLocationList.json', params);
};

// 保存合同主体所在地 -4.10.8
export const _saveContractBodyLocation = (params = {}) => {
    return post('/api/salary/contractionLocation/saveContractBodyLocation.json', params);
};


// 城市平均工资列表-4.10.8
export const _cityAvgWagePageList = (params = {}) => {
    return post('/api/salary/cityAvgWage/pageList.json', params);
};


// 删除城市平均工资 - 4.10.8
export const _cityAvgWageDeleteById = (params = {}) => {
    return post('/api/salary/cityAvgWage/deleteById.json', params, config);
};
// 保存城市平均工资-4.10.8
export const _saveSalaryCityAvgWage = (params = {}) => {
    return post('/api/salary/cityAvgWage/saveSalaryCityAvgWage.json', params);
};
// 更新城市平均工资-4.10.8
export const _updateSalaryCityAvgWage = (params = {}) => {
    return post('/api/salary/cityAvgWage/updateSalaryCityAvgWage.json', params);
};

// 离职补偿信息列表查询 -v4.10.8
export const _leaveInfoPageList = (params = {}) => {
    return post('/api/salary/leaveInfo/pageList.json', params);
};

// 删除离职补偿信息 -v4.10.8
export const _deleteSalaryLeveInfo = (params = {}) => {
    return post('/api/salary/leaveInfo/deleteSalaryLeveInfo.json', params, config);
};

// 根据ID查看详情 -v4.10.8
export const _getLeaveInfoById = (params = {}) => {
    return get('/api/salary/leaveInfo/getById.json', params);
};

// 创建离职补偿信息 -v4.10.8
export const _insertSalaryLeveInfo = (params = {}) => {
    return post('/api/salary/leaveInfo/insertSalaryLeveInfo.json', encrypt(params));
};
// 更新离职补偿信息 -v4.10.8
export const _updateSalaryLeveInfo = (params = {}) => {
    return post('/api/salary/leaveInfo/updateSalaryLeveInfo.json', encrypt(params));
};

// 离职证明开具列表查询 -v4.10.8
export const _leaveCertifyPageList = (params = {}) => {
    return post('/api/salary/leaveCertify/pageList.json', params);
};

// 删除离职证明 -v4.10.8
export const _deleteLeaveCertify = (params = {}) => {
    return post('/api/salary/leaveCertify/deleteLeaveCertify.json', params, config);
};

// 竞业补偿信息-签署 -v4.10.8
export const _signLeaverRestrictionCertify = (params = {}) => {
    return post('/api/salary/leaveCertify/signLeaverRestrictionCertify.json', params, config);
};

// 离职补偿签署-v4.10.8
export const _signLeaveCertify = (params = {}) => {
    return post('/api/salary/leaveCertify/signLeaveCertify.json', params, config);
};

// 离职补偿开具-详情 -v4.10.8
export const _getSalaryLeaveCertifyDetail = (params = {}) => {
    return get('/api/salary/leaveCertify/getSalaryLeaveCertifyDetail.json', params);
};
// 竞业补偿信息-详情 -v4.10.8
export const _getSalaryLeaveRestrictionCertifyDetail = (params = {}) => {
    return get('/api/salary/leaveCertify/getSalaryLeaveRestrictionCertifyDetail.json', params);
};
// 竞业补偿信息-实时计算 -v4.10.8
export const _getSalaryLeaveRestrictionCertifyDetailCalc = (params = {}) => {
    return post('/api/salary/leaveCertify/getSalaryLeaveRestrictionCertifyDetail.json', encrypt(params));
};

// 竞业补偿信息-开具 -v4.10.8
export const _issueLeaverRestrictionCertify = (params = {}) => {
    return post('/api/salary/leaveCertify/issueLeaverRestrictionCertify.json', encrypt(params));
};

// 离职补偿开具-实时计算 -v4.10.8
export const _getSalaryLeaveCertifyDetailCalc = (params = {}) => {
    return post('/api/salary/leaveCertify/getSalaryLeaveCertifyDetail.json', encrypt(params));
};

// 离职补偿开具-v4.10.8
export const _issueLeaveCertify = (params = {}) => {
    return post('/api/salary/leaveCertify/issueLeaveCertify.json', encrypt(params));
};

// 【在离职台账】同步离职信息 -v4.10.8
export const _bookSeveranceSync = (params = {}) => {
    return post('/api/salary/book/severance/sync.json', params);
};

