/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * 参数模型 * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

import { extend } from './tools.js';
import {
    RULE_NO_LIMIT, RULE_NUMBER,
    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, TYPE_BASIC_SCORE, TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE,TYPE_BASIC_ATTACHMENT,
    ROLE_GROUP_INTERVIEW,TYPE_GROUP_INTERVIEW_ONESELF,
    PARAM_SELECT_OPTION_CODE, PARAM_SELECT_OPTION_INFORMATION_CODE,
    PARAM_GROUP_INTERVIEW_STAFF_CODE, PARAM_GROUP_INTERVIEW_TIME_CODE, PARAM_GROUP_INTERVIEW_ADVICE_CODE,
    TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION, TYPE_GROUP_INTERVIEW_ASSESSMENT,
    TYPE_GROUP_INTERVIEW_CUSTOM, TYPE_ELSE_EVALUATION, PARAM_GROUP_INTERVIEW_SUGGEST_CODE, PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE, TYPE_GROUP_INTERVIEW_TARGET
} from './const.js';
import { isNull } from '@/utils/util';
import { commonConfig } from '@noah/tools';
const {  EVALUATE_DATE_LABEL_MAP }  = commonConfig.interview;
import { targetValidate } from '../components/layout/group/interview/target-info/config.js';

let cacheConfiglist = null;
let cacheParamList = null;

export default class ValidatorModel {
    interviewType = 0
    constructor( { configList = {}, paramList = {}, interviewType} ){
        cacheConfiglist = configList;
        cacheParamList = paramList;

        this.interviewType = interviewType;
    }
    validate(targetId){
        const valueConfig =  cacheParamList[ targetId ];
        // 如果没有生成valueConfig 则默认为校验成功 （这种情况再假删除的时候会出现）
        if (!valueConfig) {
            return Promise.resolve({
                id: targetId,
                success: 1
            });
        }
        else {
            const { value } = valueConfig;
            const config = cacheConfiglist[ targetId ];
            return new Promise(resolve => {
                const item = extend({}, config, { value });
                const result = validator( item, this.interviewType );
                resolve( result );
            });
        }

    }
    validateAll(filterIds = []){
        // 需要过滤掉无用
        const resultArr = Object.keys( cacheParamList ).filter(targetId => {
            const { parentId, hidden } = cacheConfiglist[ targetId ] || {};
            const { hidden: parentHidden } = parentId ? cacheConfiglist[parentId] : {};
            let isInView = true;
            if (filterIds.length) {
                isInView = filterIds.includes(targetId);
            }
            return !hidden && !parentHidden && isInView;
        }).map(targetId => {
            return this.validate( targetId );
        });
        return Promise.all( resultArr );
    }
};

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */


function validator( config, interviewType ) {
    const { role, type } = config;
    Function.prototype.after = function( fn ){
        let self = this;
        return function(){
            let result = self.apply(this, arguments);
            if( result.success === 1 && fn ){ // 校验成功
                return fn.apply(this, arguments);
            }
            return result;
        };
    };

    const validateStrategy = {
        [TYPE_BASIC_RADIO]: validateRadio,
        [TYPE_BASIC_CHECKBOX]: validateCheckbox,
        [TYPE_BASIC_FILL]: validateFill
    };
    const afterFn = validateStrategy[type];
    const validateFunc = validateRequired.after( afterFn );
    const result = validateFunc(config, interviewType);

    Function.prototype.after = null;

    return result;
}

// 验证必填
function validateRequired( config, interviewType ){
    const {
        type, id, role, value, parentId,
        labelName, labelTime, required, selectedMax, selectedMin
    } = config;
    const textStrategy = {
        [TYPE_BASIC_FILL]: '请输入内容',
        [TYPE_BASIC_SCORE]: '请进行打分',
        [TYPE_BASIC_DATE]: '请选择日期',
        [TYPE_BASIC_DATE_RANGE]: '请选择日期',
        [TYPE_BASIC_ATTACHMENT]: '请上传附件'
    };
    const result = { id, success: 1 };
    if( required && type === TYPE_BASIC_RADIO && value[PARAM_SELECT_OPTION_CODE].length === 0 ){
        extend(result, { success: 0, message: '请选择选项' });
    }else if( type === TYPE_BASIC_CHECKBOX  ){
        if ( required && value.length === 0 ) {
            extend(result, { success: 0, message: '请选择选项' });
        }
        if (selectedMax !== -1 && value.length > selectedMax) {
            extend(result, {
                success: 0, message: `最多选择${selectedMax}项`
            });
        }
        if (selectedMin !== -1 && value.length < selectedMin ) {
            extend(result, {
                success: 0, message: `最少选择${selectedMin}项`
            });
        }
    }else if( role === ROLE_GROUP_INTERVIEW ){
        const res = [];
        // TYPE_GROUP_INTERVIEW_ASSESSMENT TYPE_ELSE_EVALUATION
        const roleTypeList = [TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION,  TYPE_GROUP_INTERVIEW_CUSTOM];
        // 普通人员类型
        if (roleTypeList.includes(type) ) {
            if( !value[PARAM_GROUP_INTERVIEW_STAFF_CODE] ){
                res.push( labelName );
            }
            if( !value[PARAM_GROUP_INTERVIEW_TIME_CODE] ){
                res.push( labelTime );
            }
        }
        // 评估建议
        else if( type === TYPE_ELSE_EVALUATION && !value[PARAM_GROUP_INTERVIEW_ADVICE_CODE] ){ // 非本人角色
            res.push( '评估建议' );
        }
        // 评估建议里的时间
        else if(
            type === TYPE_ELSE_EVALUATION && value[PARAM_GROUP_INTERVIEW_ADVICE_CODE]
            && parentId?.startsWith('group-interview_assessment')
            && EVALUATE_DATE_LABEL_MAP[value[PARAM_GROUP_INTERVIEW_ADVICE_CODE]]
            && !value[PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE] ){
            const advice = value[PARAM_GROUP_INTERVIEW_ADVICE_CODE];
            let label = EVALUATE_DATE_LABEL_MAP[advice].label;

            // 见习访谈，提前转正=> 见习结束
            if(advice === 2 && label === '转正日期') {
                label = [4,5].includes(interviewType)? '见习结束日期': '转正日期';
            }
            res.push(label);
        }
        if( res.length > 0 ){
            extend(result, { success: 0, message: `请选择${ res.toString() }` });
        }

        // 访谈目标校验
        if (type === TYPE_GROUP_INTERVIEW_TARGET && required) {
            const validateMsg = targetValidate(value);
            if (validateMsg) {
                extend(result, { success: 0, message: validateMsg });
            }
        }


    }else if(required && (isNull(value) || Array.isArray(value) && value.length === 0)){
        extend(result, { success: 0, message: textStrategy[type] });
    }
    return result;
}
// 验证单选 - 选项 + 文字/格式
function validateRadio( config ){
    const { id, value, options } = config;

    const optionId = value[PARAM_SELECT_OPTION_CODE];
    const information = value[PARAM_SELECT_OPTION_INFORMATION_CODE];
    const { hasExtra, extraRequired, extraRule, ruleName, extraLimit } = options.find(item => item.code === optionId ) || {};
    const result = { id, success: 1 };

    if( hasExtra ){
        if( extraRequired && information.length === 0 ){
            extend(result, { success: 0, message: '请输入填空项内容' });
        }else if( information && information.length > extraLimit ){
            extend(result, {
                success: 0, message: `字数超出限制，请输入${extraLimit}字以内`
            });
        }else if( extraRule !== RULE_NO_LIMIT && information && !new RegExp(extraRule).test(information) ){
            extend(result, {
                success: 0, message: `格式错误，请输入${ruleName}`
            });
        }
    }

    return result;
}
// 验证多选 - 选项 + 格式 + 选项个数
function validateCheckbox( config ){
    const { id, value, options } = config;
    const result = { id, success: 1 };
    let optionLength = value.length-1;
    while( optionLength > -1 ){
        const item = value[optionLength];
        const optionId = item[PARAM_SELECT_OPTION_CODE];
        const information = item[PARAM_SELECT_OPTION_INFORMATION_CODE];
        const { hasExtra, extraRequired, extraRule, ruleName, extraLimit} = options.find(item => item.code === optionId )  || {};

        if( hasExtra ){
            if( extraRequired && information.length === 0 ){
                extend(result, { success: 0, message: '请输入填空项内容' }); break;
            }else if( information && information.length > extraLimit ){
                extend(result, {
                    success: 0, message: `字数超出限制，请输入${extraLimit}字以内`
                });
            }else if( extraRule !== RULE_NO_LIMIT && information && !new RegExp(extraRule).test(information) ){
                extend(result, {
                    success: 0, message: `格式错误，请输入${ruleName}`
                });
                break;
            }
        }

        optionLength--;
    }
    return result;
}
// 验证填空 - 格式 + 个数
function validateFill( config ){
    const { id, value, lengthMin, lengthMax, fillRule, ruleName } = config;
    const result = { id, success: 1 };
    if( lengthMin &&  isNull(lengthMax) && value.length < lengthMin){
        extend(result, {
            success: 0, message: `请输入至少${lengthMin}个字`
        });
    }else if( lengthMax && isNull(lengthMin) && value.length > lengthMax){
        extend(result, {
            success: 0, message: `请输入${lengthMax}个字之内`
        });
    }else if( lengthMax && lengthMin && (value.length < lengthMin || value.length > lengthMax) ){
        extend(result, {
            success: 0, message: `请输入${lengthMin}~${lengthMax}个字`
        });
    }
    // 数字类型单独处理
    else if( fillRule === RULE_NUMBER ){
        // numberFormat: '数字格式', // integer=整数/decimal=小数
        // decimal: '小数点后几位', // 数字
        // numberMax: '最大值', // 整数
        // numberMin: '最小值', // 整数
        const { numberFormat, decimal = '0', numberMax, numberMin, readOnly } = config;
        // ^\\d+$
        let message = '';
        let typeStr = '';
        // 输入了值 进行格式校验
        if (!isNull(value) && !readOnly) {
            let warningStr = (!isNull(numberMax) || !isNull(numberMin)) ? `范围限制在[${isNull(numberMin) ? '不限' : numberMin }，${isNull(numberMax) ? '不限' : numberMax}]` : '范围不限';

            // 默认按整数处理
            if (numberFormat === 'decimal') {
                typeStr = decimal === '0' ? '' : `支持${decimal}位小数`;
                const regexString = '^-?\\d+(\\.\\d{0,' + decimal + '})?$';

                if (!new RegExp(regexString).test(value)) {
                    message = `请输入${decimal}位小数，${warningStr}`;
                }
            } else {
                if (!new RegExp('^\\d+$').test(value)) {
                    message = `请输入整数，${warningStr}`;
                }
            }
            // 大于最大值或者小于最小值
            if (
                (!isNull(numberMax) && (+value > +numberMax)
            || !isNull(numberMin) && (+value < +numberMin))) {
                message = `请输入${numberFormat === 'decimal' ? `${decimal}位小数` : '整数'}，${warningStr}`;
                // message = `请输入最小值${numberMin}~最大值${numberMax}之间的数字${typeStr ? '，' + typeStr : '' }`;
                // if (!isNull(numberMax) && !isNull(numberMax)) {
                //     message = `请输入最小值${numberMin}~最大值${numberMax}之间的数字${typeStr ? '，' + typeStr : '' }`;
                // }
                // else if (!isNull(numberMax)) {
                //     message = `请输入最大值${numberMax}的数字${typeStr ? '，' + typeStr : '' }`;
                // }
                // else {
                //     message = `请输入最小值${numberMin}的数字${typeStr ? '，' + typeStr : '' }`;
                // }
            }

            if (message) {
                extend(result, {
                    success: 0, message
                });
            }
        }
    }
    else if( fillRule !== RULE_NO_LIMIT && !new RegExp(fillRule).test(value) ){
        extend(result, {
            success: 0, message: `格式错误，请输入${ruleName}`
        });
    }
    return result;
}
