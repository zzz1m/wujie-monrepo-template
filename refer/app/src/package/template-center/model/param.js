/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 参数模型 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
import Vue from 'vue';
import { extend } from './tools';
import { deepCopy } from '@/utils/object';
import {
    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_DATE_RANGE, TYPE_BASIC_ATTACHMENT,
    TYPE_BASIC_COLUMNS, TYPE_BASIC_REMARK, ROLE_GROUP_INTERVIEW,
    PARAM_COMMON_VALUE_CODE, PARAM_SELECT_OPTION_CODE, PARAM_SELECT_OPTION_INFORMATION_CODE,
    ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, TYPE_GROUP_INTERVIEW_TARGET,
    PARAM_GROUP_INTERVIEW_STAFF_CODE, PARAM_GROUP_INTERVIEW_TIME_CODE, PARAM_GROUP_INTERVIEW_ADVICE_CODE, 
    PARAM_GROUP_INTERVIEW_SUGGEST_CODE, PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE, PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE
} from './const.js';
import { TARGET_INFO_VALUE } from '../components/layout/group/interview/target-info/config.js';


// let cacheParamList/*所有参与页面渲染和请求的信息集合*/ = {};
// let cacheConfigList = {};
const blackTypeList = [TYPE_BASIC_COLUMNS, TYPE_BASIC_REMARK];
const blackRoleStartsList = ['relation-'];

export default class ParamModel {
    cacheParamList/*所有参与页面渲染和请求的信息集合*/ = {};
    cacheConfigList = {};
    constructor( { paramList = {}, configList = {}, init = true } ){
        this.cacheParamList = paramList;
        this.cacheConfigList = configList;
        // 对于编辑阶段没必要进行初始化
        init && this.init();
    }
    /**
     * 初始化页面最初的参数，以下情况不参与参数模型构建：
     *  1、控件type或者role的开头 命中黑名单
     *  2、控件处于隐藏的 hidden= true
     *  3、控件本身没有隐藏，但是父级控件处于隐藏
     */
    init(){
        const configList = Object.values(  this.cacheConfigList )
            .filter(item => {
                return filterParam( item, this.cacheConfigList );
            });
        configList.forEach( this.addParam.bind(this) );
    }

    // 控件显示的时候追加参数
    addParam( config ) {
        const { id } = config;
        const configInfo = extend({}, config, this.cacheConfigList[id] );
        const param = createParam( configInfo );

        Vue.set(this.cacheParamList, id, param);
    }
    // 控件隐藏的时候，移除参数
    removeParam(id){
        if( !this.cacheParamList.hasOwnProperty(id) ) return;
        deepRemoveParam.call(this, id );

        function deepRemoveParam( curId ){
            Vue.delete( this.cacheParamList, curId );
            const children = Object.keys( this.cacheParamList ).filter( key => {
                const paramInfo = this.cacheParamList[key];
                return paramInfo.parentId === curId;
            });
            if( children && children.length > 0 ){
                children.forEach( deepRemoveParam.bind(this) );
            }
        }
    }
    // 必要的时候再使用
    refreshParam(filterIds = []){
        // 把隐藏 或者 父级控件隐藏的相关组件对应的参数清除
        Object.keys( this.cacheParamList ).forEach(targetId => {
            const { parentId, hidden } = this.cacheConfigList[ targetId ] || {};
            const { hidden: parentHidden } = parentId ?  this.cacheConfigList[parentId] : {};
            let isInView = true;
            if (filterIds.length) {
                isInView = filterIds.includes(targetId);
            }
            if( hidden || parentHidden || !isInView || !this.cacheConfigList[ targetId ] ){
                Vue.delete( this.cacheParamList, targetId );
            }
        });
    }
    // 获取参数对应的值
    getValue( id ) {
        if( !this.cacheParamList.hasOwnProperty(id) ) return '';
        return this.cacheParamList[id][PARAM_COMMON_VALUE_CODE];
    }
};

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
function filterParam( config = {}, cacheConfigList ){
    const { hidden, type, role, parentId } = config;
    return !hidden
        &&  !blackTypeList.includes(type)
        && parentIsShow( parentId );
    // && !(
    //     blackRoleStartsList.some(item => role.startsWith(item) )
    // );

    function parentIsShow( parId ){
        if( !parId ) return true;
        let parentConfig = cacheConfigList[parId];
        if( parentConfig.hidden ) return false; // 如果父元素已经隐藏，则不可见
        if( parentConfig.parentId ){ // 如果还有上级id
            return parentIsShow( parentConfig.parentId );
        }
        return true;
    }
}

export function createParam( config ) {
    const { type, role, parentId, copyId, sort } = config;
    let param = null;
    const multipleTypes = [TYPE_BASIC_DATE_RANGE, TYPE_BASIC_ATTACHMENT];
    switch( true ){
        case type === TYPE_BASIC_RADIO:
            param = createRadioParam(); break;
        case type === TYPE_BASIC_CHECKBOX:
            param = createCheckboxParam(); break;
        case multipleTypes.includes(type):
            param = createBaseParam(true); break;
        case role === ROLE_GROUP_INTERVIEW:
            param = createGroupInterviewParam(config); break;
        case role === ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE:
            param = createGroupInterviewMultipleParam(); break;
        default:
            param = createBaseParam();
    }
    return extend(param, { parentId, copyId, sort });

    function createBaseParam(multiple = false){
        return {
            [PARAM_COMMON_VALUE_CODE]: multiple ? [] : ''
        };
    }
    function createRadioParam(){
        return {
            [PARAM_COMMON_VALUE_CODE]: {
                [PARAM_SELECT_OPTION_CODE]: '',
                [PARAM_SELECT_OPTION_INFORMATION_CODE]: ''
            }
        };
    }
    function createCheckboxParam(){
        return {
            [PARAM_COMMON_VALUE_CODE]:[]
        };
    }
    function createGroupInterviewParam (config){
        if (config.type === TYPE_GROUP_INTERVIEW_TARGET) {
            return {
                [PARAM_COMMON_VALUE_CODE]: JSON.parse(JSON.stringify(TARGET_INFO_VALUE))
            };
        }
        return {
            [PARAM_COMMON_VALUE_CODE]: {
                [PARAM_GROUP_INTERVIEW_STAFF_CODE]: '',
                [PARAM_GROUP_INTERVIEW_TIME_CODE]: '',
                [PARAM_GROUP_INTERVIEW_ADVICE_CODE]: '',
                [PARAM_GROUP_INTERVIEW_SUGGEST_CODE]: '',          
                [PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE]: '',     // 访谈结果时间
                [PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE]: []        // 评估建议列表
            }
        };
    }
    function createGroupInterviewMultipleParam() {
        return {
            [PARAM_COMMON_VALUE_CODE]:[]
        };
    }
}