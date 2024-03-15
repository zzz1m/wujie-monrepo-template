/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 模版配置阶段的验证模型 * * * * * * *  * * * * * * * * * * * * 
 * 需要校验以下信息： 
 *  1、基础控件
        1.1 单选/多选：选项名重复
        1.2 分栏： 子视图不能为空
 *  2、套件
        2.1 访谈相关：子视图不能为空
    3、关联数据
        3.1 访谈-员工信息-多子集：数据过滤 不能为空
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
import Vue from 'vue';
import {
    TYPE_BASIC_COLUMNS, TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_ELSE_EVALUATION, TYPE_GROUP_INTERVIEW_TARGET,
    ROLE_GROUP_INTERVIEW, ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, TYPE_GROUP_INTERVIEW_ASSESSMENT
} from './const.js';
import { extend } from './tools';

const whiteValidatorList = [
    TYPE_BASIC_COLUMNS, TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX,
    ROLE_GROUP_INTERVIEW, ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE
];

export default class TemplateCreateValidator {
    childrenlist = {}
    config /*需要进行业务校验的*/= {}
    constructor( options = {} ) { }
    add( config = {}, viewmodel = {} ){
        const { type, role, id } = config;
        if( !whiteValidatorList.includes(type) && !whiteValidatorList.includes(role)) return;
        this.config[id] = config;
        if( viewmodel.children && !this.childrenlist[viewmodel.id] ){
            this.childrenlist[viewmodel.id] = viewmodel.children;
        }
    }
    remove( id ){ 
        if( !this.config[id] ) return;
        Vue.delete(this.config, id);
        if( this.childrenlist[id] ){
            Vue.delete(this.childrenlist, id);
        }
    }
    validate( config ){
        return new Promise((resolve) => {
            const result = gotoValidate( config );
            resolve( result );
        });
    }
    validateAll(){
        const result = Object.keys( this.config ).map(async key => {
            const config = this.config[key];
            const children = this.childrenlist[key];
            const newCfg = extend({ children }, config);
            return await this.validate( newCfg );
        });
        return Promise.all( result );
    }
}


/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
function gotoValidate( config ) {
    const { type, role } = config;
    let validateStrategy = {
        [ TYPE_BASIC_COLUMNS ]: function() {
            return checkHasSubViews( config );
        },
        [ TYPE_BASIC_RADIO ]: function() {
            return checkHasRepeatOptions( config );
        },
        [ TYPE_BASIC_CHECKBOX ]: function() {
            return checkHasRepeatOptions( config );
        },
        [ ROLE_GROUP_INTERVIEW ]: function() {
            return checkHasSubViewsInGroupInterview( config );
        },
        [ ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE ]: function() {
            return checkMultipleInterview(config);
        }
    };
    return type ? validate() : { success: 1 };
    function validate() {
        const fn = role.startsWith('basic-') ? validateStrategy[ type ] : validateStrategy[ role ];
        return fn();
    };
}

// 校验指定key是否为空
function checkIsEmptyKey( config, key, keyName = '' ){
    const { title, id } = config;
    const value = config[ key ];
    return {
        id,
        success: value ? 1 : 0,
        message: value ? '' : `【${title}】${keyName}不能为空`
    };
};

// 校验多子级
function checkMultipleInterview( config ) {
    const { title, id } = config;
    // { label: '数据过滤', key: 'dataFilter' }, 数据过滤暂不做必填校验
    const checklist = [
        { label: '关联字段', key: 'fieldsList' }
    ];
    let obj = {
        id, success: 1, message: ''
    };
    const errArr = [];
    checklist.forEach(({ label, key }) => {
        const value = config[ key ];
        if( !value || value.length < 1 ) errArr.push( label );
    });
    if( errArr.length > 0 ) {
        const message = errArr.toString();
        obj.success = 0;
        obj.message = `【${title}】${message}不能为空`;
    }
    return obj;
}

// 校验是否有子视图元素
function checkHasSubViews( config = {} ){
    const { children = [], title, id } = config;
    const isOk = children.length > 0;
    return {
        id,
        success: isOk ? 1 : 0,
        message: isOk ? '' : `【${title}】没有配置相应控件`
    };
} 

// 校验选项是否重复
function checkHasRepeatOptions( config = {} ) {
    const { options = [], title,  id } = config;
    return options.length > 0 ? checkRepeat() : { success: 1 };
    function checkRepeat(){
        const labels = options.slice(0).map(item => item.label );
        const newLabels = [...new Set(labels)];
        const isOk = options.length === newLabels.length;
        return {
            id,
            success: isOk ? 1 : 0,
            message: isOk ? '' : `【${title}】存在重复的选项名称`
        };
    }
}

/*****************************************以下为业务控件校验*****************************************/ 
// 校验访谈套件是否配置了子控件
function checkHasSubViewsInGroupInterview(config = {}) {
    let { children = [], title, id } = config;
    // 评估意见/目标信息 不校验是否配置了子组件
    if ([TYPE_GROUP_INTERVIEW_TARGET,  TYPE_GROUP_INTERVIEW_ASSESSMENT].includes(config.type)) {
        return {
            id,
            success: 1,
            message: ''
        };
    }
    const arr = children.filter(item => 
        item.type !== TYPE_ELSE_EVALUATION && !item.id.includes('-evaluation')
    );
    return checkHasSubViews({ id, title, children: arr });
}
