/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 配置模型 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */

import { extend, guid } from './tools.js';

import {
    ROLE_LAYOUT, TYPE_BASIC_COLUMNS,
    ROLE_CHOOSE, TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX,
    ROLE_WRITE, TYPE_BASIC_FILL, 
    ROLE_SCORE, TYPE_BASIC_SCORE, 
    ROLE_DATE, TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE,
    ROLE_UNCLASSIFIED, TYPE_BASIC_REMARK, TYPE_BASIC_ATTACHMENT,
    ROLE_GROUP_INTERVIEW, TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION, TYPE_GROUP_INTERVIEW_ASSESSMENT, TYPE_GROUP_INTERVIEW_CUSTOM,
    ROLE_RELATION_INTERVIEW_BASIC_SINGLE, ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, ROLE_RELATION_INTERVIEW_ORDER, ROLE_RELATION_INTERVIEW_APPROVAL,
    ROLE_GROUP_PROMOTION,
    SIZE_LARGE, RULE_NO_LIMIT, RULE_FILE_SUFFIX,
    STYLE_FILL_TABLE, STYLE_PRINT_HORIZONTAL,
    TYPE_ELSE_EVALUATION,
    TYPE_GROUP_INTERVIEW_TARGET,
    TYPE_GROUP_PROMOTION_ESTIMATE,
    ROLE_RELATION_PROMOTION_INFO
} from './const.js';
 
/**
  * 创建基础的数据模型
  * return {...}
  */
export const createBaseModel = function() {
    return {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        parentId: '',
        code: '', 
        role: '', 
        roleName: '',  
        type: '',
        title: '',
        titleLimit: 1000, 
        hasInstructions: false, 
        instructions: '请输入题干说明',
        instructionsLimit: 1000, 
        showSerial: false, 
        serialStrategy: 1,
        hidden: false,
        required: false,
        readOnly: false
    };
};
/**
  * 创建指定控件类型的数据模型
  * return {...}
  */
export const createModel = function( config = {} ) {
    const { type, role, parentId } = config;
    const baseModel = extend(createBaseModel(), { parentId });
    
    const createStrategy = {
        // 基础控件
        [ TYPE_BASIC_COLUMNS ] : function(){
            return extend( baseModel, createColumnsModel(config) );
        },
        [ TYPE_BASIC_RADIO ] : function(){
            return extend( baseModel, createRadioModel(config) );
        },
        [ TYPE_BASIC_CHECKBOX ] : function(){
            return extend( baseModel, createCheckModel(config) );
        },
        [ TYPE_BASIC_FILL ] : function(){
            return extend( baseModel, createFillModel(config) );
        },
        [ TYPE_BASIC_SCORE ] : function(){
            return extend( baseModel, createScoreModel(config) );
        },
        [ TYPE_BASIC_DATE ] : function(){
            config.type = TYPE_BASIC_DATE;
            return extend( baseModel, createDateModel( config ) );
        },
        [ TYPE_BASIC_DATE_RANGE ] : function(){
            config.type = TYPE_BASIC_DATE_RANGE;
            return extend( baseModel, createDateModel(config) );
        },
        [ TYPE_BASIC_REMARK ] : function(){
            return extend( baseModel, createRemarkModel(config) );
        },
        [ TYPE_BASIC_ATTACHMENT ] : function(){
            return extend( baseModel, createAttachmentModel(config) );
        },
        // 套件-访谈
        [ ROLE_GROUP_INTERVIEW ] : function(){
            return extend( baseModel, createGroupInterviewModel(config) );
        },
        // 套件-晋升
        [ ROLE_GROUP_PROMOTION ] : function(){
            return extend( baseModel, createGroupPromotionModel(config) );
        },
        // 关联数据 - 根据角色来
        [ ROLE_RELATION_INTERVIEW_BASIC_SINGLE ] : function(){
            return extend( baseModel, createRelationInterviewSingleModel(config) );
        }, 
        [ ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE ] : function(){
            return extend( baseModel, createRelationInterviewMultipleModel(config) );
        }, 
        [ ROLE_RELATION_INTERVIEW_ORDER ] : function(){
            return extend( baseModel, createRelationInterviewSingleModel(config) );
        }, 
        [ ROLE_RELATION_INTERVIEW_APPROVAL ] : function(){
            return extend( baseModel, createRelationInterviewSingleModel(config) );
        },
        [ROLE_RELATION_PROMOTION_INFO]: function(){
            return extend( baseModel, createRelationInterviewSingleModel(config) );
        }
    };
    function createModel() {
        const fn = role.startsWith('basic-') ? createStrategy[ type ] : createStrategy[ role ];
        return fn ? fn() : baseModel;
    };
    return type ? createModel() : baseModel;
};
 
/**
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  */
// 创建 【分栏】模型
function createColumnsModel( config = {} ) {
    const { code = '', roleName = '' } = config;
    return {
        id: guid(`basic_${TYPE_BASIC_COLUMNS}_`),
        code, roleName, title: '分栏',
        role: ROLE_LAYOUT,
        type: TYPE_BASIC_COLUMNS
    };
}
// 创建 【单选】模型
function createRadioModel( config = {} ) {
    const { code = '', roleName = '' } = config;
    return {
        id: guid(`basic_${TYPE_BASIC_RADIO}_`),
        code, roleName, title: '请选择一个选项',
        role: ROLE_CHOOSE,
        type: TYPE_BASIC_RADIO, 
        options: createOptions()
    };
    function createOptions(){
        let i = 1;
        const arr = [];
        while( i<3 ){
            const item = createOptionModel( i );
            arr.push( item );
            i++;
        }
        return arr;
    }
}
// 创建 options 选项模型
function createOptionModel(i) {
    return {
        code: guid('options_'), 
        label: `选项${i}`,
        hasExplain: false, 
        explain: '请输入选项说明', 
        explainLimit: 1000, 
        hasExtra: false, 
        extra: '',
        hasExtraLimit: false,
        extraRequired: true,
        extraLimit: 9999,
        extraRule: RULE_NO_LIMIT,
        ruleName: ''
    };
}
 
// 创建 【多选】模型
function createCheckModel( config = {} ) {
    const result = createRadioModel( config );
    return extend( result, {
        id: guid(`basic_${TYPE_BASIC_CHECKBOX}_`),
        title: '请选择以下选项（多选）', type: TYPE_BASIC_CHECKBOX, 
        selectedMin: RULE_NO_LIMIT,  selectedMax: RULE_NO_LIMIT
    } );
}
 
// 创建 【填空题】模型
function createFillModel(config = {}) {
    const { code = '', roleName = '' } = config;
    return {
        id: guid(`basic_${TYPE_BASIC_FILL}_`),
        code, roleName, title: '请填写本项内容',
        role: ROLE_WRITE,
        type: TYPE_BASIC_FILL, 
        size: SIZE_LARGE, fillRule: RULE_NO_LIMIT, ruleName: '',
        lengthMin: null, lengthMax: null,
        placeholder: '', placeholderLimit: 1000,

        numberFormat: '', // decimal
        decimal: 2,
        numberMax: null,
        numberMin: null
    };
}
 
// 创建 【打分】模型
function createScoreModel(config = {}) {
    const { code = '', roleName = '' } = config;
    return {
        id: guid(`basic_${TYPE_BASIC_SCORE}_`),
        code, roleName,
        role: ROLE_SCORE,
        type: TYPE_BASIC_SCORE, 
        title: '请给本项打分',
        scoreMin: 0, scoreMax: 5, 
        // scoreTipsLimit: 10, // 暂时没限制
        scoreTipsLeft: '', scoreTipsCenter: '', scoreTipsRight: ''
    };
}
 
// 创建 【日期】模型
function createDateModel(config = {}) {
    const { code = '', roleName = '', type } = config;
    return {
        id: guid(`basic_${type}_`),
        code, roleName,
        role: ROLE_DATE,
        type, 
        title: type === TYPE_BASIC_DATE ? '日期' : '日期范围',
        format: 'yyyy-MM-dd'
    };
}
// 创建 【标题/备注】模型
function createRemarkModel(config = {}) {
    const { code = '', roleName = '' } = config;
    return {
        id: guid(`basic_${TYPE_BASIC_REMARK}_`),
        code, roleName, title: '备注说明',
        role: ROLE_UNCLASSIFIED,
        type: TYPE_BASIC_REMARK 
    };
}
// 创建 【附件】模型
function createAttachmentModel(config = {}) {
    const { code = '', roleName = '' } = config;
    return {
        id: guid(`basic_${TYPE_BASIC_ATTACHMENT}_`),
        code, roleName, title: '请上传附件',
        role: ROLE_UNCLASSIFIED,
        type: TYPE_BASIC_ATTACHMENT, 
        suffix: RULE_FILE_SUFFIX(),
        singleSizeLimit: 50, // 10 * 1024 * 1024
        totalLimit: 10
    };
}
 
 
// 创建 套件-访谈 模型
function createGroupInterviewModel( config = {} ) {
    const { code, role, roleName, type, name } = config;
    const dataMap = {
        [ TYPE_GROUP_INTERVIEW_ONESELF ]: {
            labelName: '员工姓名',
            title: '本人角色'
        },
        [ TYPE_GROUP_INTERVIEW_SUPERIOR ]: {
            labelName: '直属上级',
            title: '直属上级'
        },
        [ TYPE_GROUP_INTERVIEW_JUNIOR ]: {
            labelName: '下级',
            title: '下级角色'
        },
        [ TYPE_GROUP_INTERVIEW_COLLABORATION ]: {
            labelName: '协作人员',
            title: '协作方角色'
        },
        [ TYPE_GROUP_INTERVIEW_ASSESSMENT ]: {
            labelName: '其他',
            title: '评估意见'
        },
        [ TYPE_GROUP_INTERVIEW_CUSTOM ]: {
            labelName: '其他',
            title: '自定义角色'
        },
        [ TYPE_GROUP_INTERVIEW_TARGET]: {
            title: '目标信息'
        }
    };
    const { labelName, title } = dataMap[type] || {};
    return {
        id: guid(`${role}_${type}_`),
        code, title, type, role, roleName,
        multiple: false,
        labelName, labelTime: '访谈时间'
    };
}
// 创建 套件-晋升 模型
function createGroupPromotionModel(config = {}) {
    const { code, role, roleName, type, name } = config;
    const dataMap = {
        judge: { // 临时
            title: '评委评估'
        },
        [ TYPE_GROUP_PROMOTION_ESTIMATE ]: {
            title: '评委评估'
        }
    };
    const { labelName, title } = dataMap[type] || {};
    return {
        id: guid(`${role}_${type}_`),
        code, title, type, role, roleName,
        multiple: false,
        labelName
    };
}

// 创建 关联数据-访谈-单子集 模型
function createRelationInterviewSingleModel(config = {} ) {
    const { code, role, roleName, type, name, idRole } = config;
    console.log(config, 'xx');
    return {
        id: guid(`${idRole || role}_`) + `|${type}`, type,
        code, role, roleName, title: name
    };
}
// 创建 关联数据-访谈-多子集 模型
function createRelationInterviewMultipleModel( config = {} ) {
    const singleModel = createRelationInterviewSingleModel( config );
    return extend( singleModel, {
        multiple: true, dataFilter: [], fieldsList: [],
        fillStyle: STYLE_FILL_TABLE, printStyle: STYLE_PRINT_HORIZONTAL
    });
}
