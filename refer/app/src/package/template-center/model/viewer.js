/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 视图/配置模型 * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */

import { createModel } from './model.js';
import createSort from '../tools/sort.js';
import { guid } from '../model/tools.js';
import { deepCopy } from '@/utils/object';
import { createCopiedInterviewGroup } from '../tools/group-copy-handler.js';
import TemplateCreateValidator from './template-create-validator';
import {
    TYPE_BASIC_COLUMNS, ROLE_GROUP_INTERVIEW, TYPE_ELSE_EVALUATION, TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_ASSESSMENT,
    allowSameTypes, ROLE_GROUP_PROMOTION,
    TYPE_GROUP_INTERVIEW_TARGET
} from './const.js';
import Vue from 'vue';

let copyCallback = null;

export class ViewerModel {
    viewerList = []
    configList = {}
    typeSet = new Set();
    constructor( options = {} ) {
        this.viewerList = options.viewerList || [];
        this.configList = options.configList || {};
        this.tplValidator = new TemplateCreateValidator();
        this.resetSort();
    }
    initTypeset(types) {
        types.forEach(i => this.typeSet.add(i));
    }
    async add( config = {}, preIndex/*当前插入位置的前一个索引*/ ){
        console.log(config,'==');
        const { viewerList, configList } = this;
        // 校验当前控件是否允许加到视图里
        const { success, err } = await this.check( config );
        if( success === 0 ) return { success, err };

        const { type, role, parentId } = config;
        if( !role.startsWith('basic-') ){
            this.typeSet.add( type );
        }
        const modelConfig = createModel( Object.assign({}, config, { type: type || role }) );
        // console.log( modelConfig, type || role);
        const currentId = modelConfig.id;
        const item = { id: currentId };
        if( type ===  TYPE_BASIC_COLUMNS ){ // 分栏
            item.children = [];
        }else if( role === ROLE_GROUP_INTERVIEW && type !== TYPE_GROUP_INTERVIEW_TARGET){ // 套件-访谈
            const interviewType = config.interviewType + '';
            // 本人角色没有评估建议 或者是晋升访谈 并且不是评估建议套件
            if(TYPE_GROUP_INTERVIEW_ONESELF === type  || (interviewType === '8' && type !== TYPE_GROUP_INTERVIEW_ASSESSMENT)) {
                item.children = [];
            } else {
                const evaluationConfig = { 
                    id: item.id + '-evaluation',
                    type: TYPE_ELSE_EVALUATION,
                    role: ROLE_GROUP_INTERVIEW,
                    parentId: item.id,
                    hidden: false
                }; 
                // 评估意见
                item.children = [
                    { id: evaluationConfig.id }
                ];
                Vue.prototype.$set(configList, evaluationConfig.id, evaluationConfig);
            }
        } else if( role === ROLE_GROUP_PROMOTION) {
            item.children = [];
        }
        console.log(role, type);
        if( parentId ){
            // 这里要考虑深层嵌套的问题
            const targetViewlist = searchCurSubViewlist( parentId, viewerList );
            const parentIsColumn = configList[parentId].type === TYPE_BASIC_COLUMNS;
            console.log( targetViewlist);
            targetViewlist.splice(preIndex + 1, 0, Object.assign(item, parentIsColumn && { splits: 50 }));
        }else {
            // preIndex = preIndex || this.viewerList.length;
            preIndex = preIndex < 0 ? -1 : preIndex;
            viewerList.splice(preIndex + 1, 0, item );
        }
        Vue.prototype.$set(configList, currentId, modelConfig);

        console.log(viewerList, configList);

        this.tplValidator.add( modelConfig, item );
        this.resetSort();

        return currentId;
    }
    /**
     * @description: 删除视图方法
     * @param {Object} curViewItem 当前要删除的vm信息
     * @param {Array} parentList 当前信息所在的视图集合，【可不传】   
     * @param {Boolean} onlyRemoveView 是否值删除视图 不处理config copy的套件不需要删除配置
     */
    remove( curViewItem, parentList, onlyRemoveView = false ){ // 需要递归删除子组件配置
        const { configList, viewerList, tplValidator, typeSet } = this;
        const curId = curViewItem.id;
        const curViewlist = parentList || searchCurViewlist( curId, configList, viewerList );
        const curViewItemIdx = curViewlist.findIndex(item => item.id === curId);
        // 删除配置，同时递归删除子配置
        if (!onlyRemoveView) removeConfig( curViewItem );

        curViewItemIdx > -1 && curViewlist.splice(curViewItemIdx, 1);

        this.resetSort();

        function removeConfig ( configInfo = {} ) {
            const { id, children } = configInfo;
            const { type, role } =  configList[ id ];

            if( !role.startsWith('basic-') ){
                typeSet.delete( type );
            }
            Vue.delete(configList, id);
            tplValidator.remove( id );
            if( children && children.length > 0 ){
                children.forEach( removeConfig );
            }
        }
    }
    /**
     * 相同视图内的组件排序
     * @param { 来源控件id } id 
     * @param { 新的目标位置控件的前一个索引 } newPreIndex 
     * @param { 来源控件当前的索引 } oldIndex 
     */
    move( id, newPreIndex, oldIndex){
        const { configList, viewerList } = this;
        const curViewlist = searchCurViewlist( id, configList, viewerList );

        const curIdx = oldIndex || curViewlist.findIndex(item => item.id === id );
        curViewlist.splice(newPreIndex, 0, curViewlist.splice(curIdx, 1)[0]);

        this.resetSort();
    }
    /**
     * 不同视图内的组件排序
     * @param { 来源控件id } id 
     * @param { 新的目标位置控件的前一个索引。小于0时：代表放置在最前面 } newPreIndex 
     * @param { 新的位置所归属的parentId。为空时：代表移到最外层 } newParentId 
     * @param { 来源控件当前的索引 } oldIndex
     */
    moveIntoOrOut( id, newPreIndex, newParentId = null, oldIndex){
        const { configList, viewerList } = this;
        const { type } = configList[ id ];

        // 评估建议不能拖进或者拖出
        if( type === TYPE_ELSE_EVALUATION) {
            return;
        }

        // 删除历史配置
        const oldViewlist = searchCurViewlist( id, configList, viewerList );
        const currentView = oldViewlist.find(item => item.id === id );
        const oldIdx = oldIndex || oldViewlist.findIndex(item => item.id === id );
        oldIdx > -1 && oldViewlist.splice(oldIdx, 1);

        // 追加到新的视图
        const newViewlist = searchCurSubViewlist( newParentId, viewerList );
        console.log(newParentId, newViewlist);
        configList[id].parentId = newParentId || null;
        newPreIndex = newPreIndex < 0 ? -1 : newPreIndex;
        // 判断新视图是否是分栏
        const splits = newParentId && configList[newParentId].type === TYPE_BASIC_COLUMNS && { splits: 50 };
        // 如果来源目标是分栏，则也需要把他们的子控件移进来
        const children = type === TYPE_BASIC_COLUMNS && { children: currentView.children };
        newViewlist.splice(newPreIndex + 1, 0, Object.assign({ id }, splits, children));

        this.resetSort();
        
    }
    /**
     * 
     * @param { 当前要复制的vm信息 } viewitem 
     * @param { 当前信息所在的视图集合，【可不传】 } curviewlist 
     */
    copy( viewitem = {}, curviewlist = null, cb ){
        const { viewerList, configList } = this;
        curviewlist = curviewlist || searchCurViewlist(viewitem.id, configList, viewerList );
        copyCallback = cb; // 记录复制后的回掉函数
        const newItem = copyView( viewitem, curviewlist, configList);
        this.resetSort(); 
        return  newItem.id;
    }
    check( config = {} ){
        let result = null;
        return new Promise((resolve) => {
            if( !config.type ) result = { success: 0, errMsg: '缺少必要的控件type' };
            result = todoCheck( config, this.typeSet );
            resolve( result );
        });
    }
    resetSort( deep = true ){
        const { viewerList, configList } = this;
        createSort( viewerList, configList, deep );
    }
    // 主要是在填写或者预览阶段，结合param来进行viewlist填充
    createCopiedInterviewGroup( params = {} ) {
        const { viewerList, configList } = this;
        createCopiedInterviewGroup(params, viewerList, configList );
    }
};




/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
function todoCheck( config = {}, typeSet )  {
    const { type, role } = config;
    if( !role.startsWith('basic-') && typeSet.has(type) && !allowSameTypes.includes(type) ){ // 非基础控件
        return { success: 0, errMsg: '当前组件不允许重复追加' };
    }
    return { success: 1 };  
}
/**
 * 对视图进行拷贝
 * @param { 要拷贝的视图对象 } viewitem 
 * 需要注意下边的场景：
 * 1、对于单选/多选：控件id、选项id都要保持唯一性
 * 2、parentid 要对应起来
 * 3、子控件的复制，要区分分栏或者套件
 */
function copyView( viewitem, viewerList, configList, newParentId = '' ) {
    const { id, copyId, children, splits } = viewitem;
    const idx = viewerList.findIndex(item => item.id === id );
    const copyConfig = deepCopy( configList[ id ] );
    const { parentId, type, role } = copyConfig;
    const newId = guid(`copy_${role}_${type}_`);

    // 拷贝视图
    const newViewItem = {
        id: newId,
        splits,
        parentId: newParentId || parentId
    };
    if(copyConfig.role === ROLE_GROUP_INTERVIEW || copyConfig.type === TYPE_BASIC_COLUMNS || copyConfig.role === ROLE_GROUP_PROMOTION) {
        newViewItem.children = copyChildren( newId );
    }

    newViewItem.copyId = copyId || id;

    copyConfig.id = newId;
    copyConfig.parentId = newParentId || parentId;
    Vue.set(configList, newId, copyConfig );

    if( !newParentId ){ // 只在最外层追加视图
        viewerList.splice( idx+1, 0, newViewItem );
    }

    callback( newViewItem, viewitem );

    function copyChildren( newParentId ){
        if( !children || children.length === 0 ) return [];
        let copyChildren = deepCopy( children );
        return copyChildren.map(item => {
            return copyView( item, copyChildren, configList, newParentId );
        });
    }

    function callback(...args){
        copyCallback && copyCallback( ...args );
    }

    return newViewItem;
}
// 获取当前id所在的viewlist
export function searchCurViewlist(id, configlist, wrapView) {
    if( !id ) return wrapView;

    const parentIdLinks = [];
    searchParents( id );

    let linksLength = parentIdLinks.length;
    if( linksLength === 0 ){
        return wrapView;
    }

    let curViewlist = wrapView;
    getCurViewlist();

    return curViewlist;

    // 找寻父级链路信息
    function searchParents( curId ){
        const { parentId } = configlist[ curId ];
        if( parentId ){
            parentIdLinks.unshift( parentId );
            searchParents( parentId );
        }
    }

    function getCurViewlist() {
        let start = 0;
        while( start < linksLength ){
            const curId = parentIdLinks[ start ];
            curViewlist = curViewlist.find(item => item.id === curId ).children || [];
            start++;
        }
    }

}

// 获取当前parentId 下的 子级viewlist
export function searchCurSubViewlist(parentId, viewlist) {
    if( !parentId ) return viewlist;
    if( !viewlist ) return null;

    let target = viewlist.find(item => item.id === parentId);
    if(target) return target.children || [];


    for(let i = 0; i < viewlist.length; i++) {
        const { children } = viewlist[i];

        target = searchCurSubViewlist(parentId, children );
        if(target) break;
    }

    return target;
}

