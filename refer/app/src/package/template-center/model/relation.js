/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * 关联模型 * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

import {
    STRATEGY_RELATION_ANY,
    STRATEGY_CONDITION_SELECT, STRATEGY_CONDITION_UNSELECT,
    STRATEGY_SHOW_VISIBLE, TYPE_BASIC_COLUMNS, ROLE_GROUP_INTERVIEW
} from './const.js';

import { guid } from './tools';

const copyValueStrategy = {
    // 复制选项的值 按值索引
    copyOptionValue: (viewer, originOptionId, originCondition, configList) => {
        // 多选复制值
        if(Array.isArray(originOptionId)) {
            return (configList[viewer.id].options || []).filter((item, index) => {
                originOptionId.map(
                    id => (configList[originCondition.conditionId].options || []).findIndex(item => item.code === id)
                ).includes(index);
            }).map(item => item.code);
        } else { // 单选复制值
            const originIndex = (configList[originCondition.conditionId].options || []).findIndex(item => item.code === originOptionId);
            return ((configList[viewer.id].options || [])[originIndex] || {}).code || '';
        }
    }
};

class RelationTools {
    sortIdList/* 关联模型格式化过程中记录各组件的索引信息，用于排序时候的依赖关系判断 */ = {}
    showItemMap /*记录显示单元与规则的映射关系*/ = {}
    defaultHidden = false // 默认是否隐藏所有控件
    constructor(options = {}){
        this.viewerList = options.viewerList || [];
        this.configList = options.configList || [];
        this.defaultHidden = options.defaultHidden;
        // 拍平的viewList
        this.flatViewerList = [];
    }
    flatViewer() {
        this.flatViewerList = this.viewerList.reduce(function compute(result, current) {
            if((current.children || []).length) {
                return result.concat(current, current.children.reduce(compute, []));
            } else {
                return result.concat(current);
            }
        }, []);
    }
    addSortIdList(condition, relationGroupId, showList = []) {
        const { sortIdList, flatViewerList } = this;
        const { conditionId, optionId } = condition || {};
        let sortItem = sortIdList[conditionId];
        if(!sortItem){
            sortItem = sortIdList[conditionId] = { showList: [], optionIdList: [], relationGroupList: [] };
        }
        !sortItem.optionIdList.includes(optionId) && sortItem.optionIdList.push(optionId);
        !(sortItem.relationGroupList || []).includes(relationGroupId) && sortItem.relationGroupList.push(relationGroupId);
        const newShowList = Array.from(new Set(sortItem.showList.concat(showList.map(showItem => showItem.showItemId))));
        // 保证控件的顺序
        sortItem.showList = flatViewerList.filter(viewer => newShowList.includes(viewer.id)).map(viewer => viewer.id);
    }
    // 更新显示单元与规则的映射关系
    addShowItemMap(showItemId, relationGroupId) {
        let ruleList = this.showItemMap[showItemId];
        if(!ruleList){
            ruleList = this.showItemMap[showItemId] = [];
        }
        if(!ruleList.includes(relationGroupId)){
            ruleList.push(relationGroupId);
        }
    }
    setShowItemHidden(id, hidden){
        this.configList[id] && (this.configList[id].hidden = hidden);
    }
    reset(){
        this.sortIdList = {};
        this.showItemMap = {};
        Object.values(this.configList).forEach(item => {
            item.hidden = false; // 默认都设置为显示
        });
    }
    // 关联组转换
    translateRelationGroup(relationGroupList = []) {
        // 拍平视图
        this.flatViewer();
        (relationGroupList || []).forEach(({ conditions, showList, id }) => {
            // 隐藏所有结果控件
            showList.forEach(({ showItemId }) => {
                this.defaultHidden && this.setShowItemHidden(showItemId, true);
            });
            conditions.forEach(condition => {
                // 记录所有条件关联结果的集合
                this.addSortIdList(condition, id, showList);
                showList.forEach(({ showItemId }) => {
                    this.addShowItemMap(showItemId, id);
                });
            });
        });
    }
    // 执行组件排序判断
    startSort(id, targetId, tarParentId){
        return new Promise(resolve => {
            const { configList } = this;

            let result = { success: 1, message: 'success' };
            // 拖拽的是分栏，分栏下存在关联设置也不允许拖拽
            if(configList[id].type === TYPE_BASIC_COLUMNS) {
                const sourceIdList = [id].concat(((this.flatViewerList.find(viewer => viewer.id === id) || {}).children || [])
                    .map(ele => ele.id));
                for(let i = 0; i < sourceIdList.length; i++) {
                    result = goToSort(sourceIdList[i], targetId, tarParentId, this);
                    if(result.success === 0) break;
                }
            } else {
                result = goToSort(id, targetId, tarParentId, this);
            }
            resolve( result );
        });
    }
};
export class RelationModel {
    relationGroupList /*关联组合*/ = []
    activeRelateGroup = /* 当前选中的关联组id  */ null
    constructor(options = {}, cb) {
        options = options || {};
        this.relationGroupList = options.relationGroupList || [];
        this.RTools = new RelationTools({
            viewerList: options.viewerList || [],
            configList: options.configList || [],
            defaultHidden: options.defaultHidden
        });
        this.formatRelation(cb);
    }
    // 添加关联组
    addRelationGroup(relationGroup, active = true) {
        const newRelationGroup = relationGroup || createNewRelationGroup();
        this.relationGroupList && this.relationGroupList.push(newRelationGroup);
        active && this.setActiveRelationGroup(newRelationGroup);
    }
    // 删除关联组
    removeRelationGroup(id) {
        if(!id) return;
        this.relationGroupList = (this.relationGroupList || []).filter(relationGroup => relationGroup.id != id);
        if(this.activeRelateGroup?.id === id) {
            this.setActiveRelationGroup(null);
        }
    }
    // 获取当前关联组
    getActiveRelationGroup() {
        return this.activeRelateGroup;
    }
    // 设置当前关联组
    setActiveRelationGroup(relationGroup) {
        if(!relationGroup) return;
        this.activeRelateGroup = relationGroup;
    }
    // 添加条件
    addCondition(relationGroup) {
        if(!relationGroup) return;
        this.setActiveRelationGroup(relationGroup);
        const newCondition = createNewCondition();
        const { conditions } = this.activeRelateGroup;
        if((conditions || []).length) {
            this.activeRelateGroup.conditions.push(newCondition);
        } else {
            this.activeRelateGroup.conditions = [newCondition];
        }
    }
    // 删除条件
    removeCondition(conditionId, relationGroup) {
        if(!relationGroup || !conditionId) return;
        this.setActiveRelationGroup(relationGroup);
        this.activeRelateGroup.conditions = (this.activeRelateGroup.conditions || [])
            .filter(condition => condition.id !== conditionId);
    }
    // 添加结果
    addShowItem(relationGroup) {
        if(!relationGroup) return;
        this.setActiveRelationGroup(relationGroup);
        const newShowItem = createNewShowItem();
        const { showList } = this.activeRelateGroup;
        if((showList || []).length) {
            this.activeRelateGroup.showList.push(newShowItem);
        } else {
            this.activeRelateGroup.showList = [newShowItem];
        }
    }
    // 删除结果
    removeShowItem(resultId, relationGroup){
        if(!resultId || !relationGroup) return;
        this.setActiveRelationGroup(relationGroup);
        this.activeRelateGroup.showList = (this.activeRelateGroup.showList || [])
            .filter(show => show.id !== resultId);
    }
    // 关联关系变形为指定可用的 条件/显示 模型
    async formatRelation(cb) {
        const validateArr = await this.validateAll();
        const hasError = validateArr.some(item => item.success === 0);
        return new Promise((resolve) => {
            let result = { success: 0, message: '请将关联逻辑配置完整' };
            if( hasError ){
                resolve( result );
            } else {
                this.RTools.reset();
                // 把关联模型格式化为实际在页面交互中的模型
                this.RTools.translateRelationGroup(this.relationGroupList || []);
                result.success = 1;
                result.message = '关联逻辑配置成功';
                resolve(result);
            }
            cb && cb(result);
        });
    }
    validate(relationGroup = {}){
        const { conditions, showList } = relationGroup;
        let status = conditions.length === 0
            || showList.length === 0
            || conditions.some(({ conditionId, logic, optionId = '' }) => {
                return !conditionId || (
                    [STRATEGY_CONDITION_SELECT, STRATEGY_CONDITION_UNSELECT].includes(Number(logic)) && optionId.length < 1
                );
            })
            || showList.some(({ showItemId }) => {
                return !showItemId;
            });
        return new Promise((resolve) => {
            resolve({
                success: status ? 0 : 1
            });
        });
    }
    validateAll(){
        const promiseArr = (this.relationGroupList || []).map(relation => {
            return this.validate(relation);
        });
        return Promise.all(promiseArr);
    }

    /*
    * 以下为关联的一些业务处理逻辑
    */
    /**
     * 校验目标控件是否已经作为关联条件或者结果存在
     * 1、有作为条件或者结果存在，不允许删除
     * 2、当前控件独立存在，既不做条件，也不作为结果
     *  - 当前控件作为分栏，关注子控件是否同时符合条件1
     */
    checkRelation(viewItem = {}){
        const { RTools } = this;
        const { showItemMap, sortIdList, configList } = RTools;
        let result = { success: 1, message: '删除成功' };
        const { type } = configList[ viewItem.id ];
        if( checkIsCondition(viewItem.id) || checkIsShowItem(viewItem.id)  ){
            result.success = 0;
        } else if( type === TYPE_BASIC_COLUMNS ){
            const children = viewItem.children || [];
            const flag = children.some(item => {
                return checkIsCondition(item.id) || checkIsShowItem(item.id);
            });
            result.success = flag ? 0 : 1;
        }

        function checkIsShowItem(showItemId){
            return showItemMap.hasOwnProperty(showItemId);
        }
        function checkIsCondition(conditionId){
            return sortIdList.hasOwnProperty(conditionId);
        }
        return new Promise((resolve) => {
            result.success === 0 && (result.message = '该控件已参与逻辑设置，不能删除！');
            resolve(result);
        });
    }
    // 校验选项是否已经作为关联条件存在
    async checkOption(option) {
        const { optionId } = option || {};
        const flag = Object.values(this.RTools.sortIdList).some(({ optionIdList }) => {
            return optionIdList.includes(optionId);
        });
        return flag ? { success: 0, message: '该选项已参与逻辑设置，不能删除！' } : { success: 1, message: '删除成功' };
    }
    // 根据条件获取相关的结果列表
    getShowListByCondition(conditionId) {
        const { RTools } = this;
        if(!RTools.sortIdList[conditionId]) return [];
        return RTools.sortIdList[conditionId].showList || [];
    }
    // 根据结果获取关联组设置
    getRelationGroupByResult(showItemId) {
        const { RTools, relationGroupList } = this;
        if(!RTools.showItemMap[showItemId]) return [];
        const relationGroupIdList = RTools.showItemMap[showItemId] || [];
        return (relationGroupList || []).filter(relationGroup => relationGroupIdList.includes(relationGroup.id));
    }
    // 复制关联组配置
    copyRelationGroup(viewItem = {}) {
        const { relationGroupList, RTools } = this;
        // 找到源关联组配置
        const originRelationGroupList = (relationGroupList || []).filter(relationGroup => relationGroup.widgetType == viewItem.copyId);
        if(!originRelationGroupList.length) return;
        // 拍平视图
        const flatViewerList = (viewItem.children || []).reduce(function compute(result, current) {
            if((current.children || []).length) {
                return result.concat(current, current.children.reduce(compute, []));
            } else {
                return result.concat(current);
            }
        }, []);
        originRelationGroupList.forEach(({ strategy, conditions, showList }) => {
            // 创建一个新的关联组配置
            const newRelationGroup = createNewRelationGroup();
            newRelationGroup.widgetType = viewItem.id;
            newRelationGroup.strategy = strategy;
            newRelationGroup.conditions = conditions.map(({ conditionId, logic, optionId }) => {
                const currentView = flatViewerList.find(item => item.copyId === conditionId);
                if(!currentView) return;
                const newCondition = createNewCondition();
                newCondition.logic = logic;
                newCondition.conditionId = currentView.id;
                switch(Number(logic)) {
                    case STRATEGY_CONDITION_SELECT:
                    case STRATEGY_CONDITION_UNSELECT:
                        newCondition.optionId = copyValueStrategy.copyOptionValue(
                            currentView, optionId, { conditionId }, RTools.configList
                        );
                        break;
                }
                return newCondition;
            });
            newRelationGroup.showList = showList.map(({ showItemId, logic }) => {
                const newShowItem = createNewShowItem();
                newShowItem.logic = logic;
                newShowItem.showItemId = (flatViewerList.find(item => item.copyId === showItemId) || {}).id;
                return newShowItem;
            });
            this.addRelationGroup(newRelationGroup, false);
            // 把关联模型格式化为实际在页面交互中的模型
            RTools.translateRelationGroup([newRelationGroup]);
        });
    }
};

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
// 生成新的关联组
export function createNewRelationGroup() {
    const newCondition = createNewCondition();
    const newShowItem = createNewShowItem();
    return {
        id: guid(`relation_group_`),
        widgetType: -1, // 套件id -1 通用控件
        strategy: STRATEGY_RELATION_ANY,
        conditions: [ newCondition ],
        showList: [ newShowItem ]
    };
}
// 生成新的条件
export function createNewCondition(){
    return {
        id: guid(`relation_condition_`),
        conditionId: '',
        logic: '',
        optionId /*多选题为数组*/: ''
    };
}
// 生成新的显示控件
export function createNewShowItem(){
    return {
        id: guid(`relation_result_`),
        logic: STRATEGY_SHOW_VISIBLE,
        showItemId: ''
    };
}

/*
* 寻找组件的根parentId
* - 最外层元素到 ''
* - 套件元素到 套件id
*/
function searchRootId( id, config ){
    const { parentId } = id ? config[ id ] : {};
    if( parentId ){
        const { role } = config[ parentId ];
        return role === ROLE_GROUP_INTERVIEW ? parentId : searchRootId( parentId, config );
    }
    return parentId || '';
}

function goToSort(sourceId, targetId, tarParentId, ctx = {}) {
    const { sortIdList, showItemMap, configList, viewerList, flatViewerList } = ctx;

    const sourceIdIsCondition = sortIdList[sourceId]; // sourceId是否作为条件
    const sourceIdIsShowItem = showItemMap[sourceId]; // sourceId是否作为结果

    if(!sourceIdIsCondition && !sourceIdIsShowItem){  // 当前控件既没有作为条件，也不作为结果
        return { success: 1, message: '允许拖拽' };
    }

    let sourceIdx = flatViewerList.findIndex(item => item.id === sourceId);
    let targetIdx = Infinity;
    if(targetId) {
        targetIdx = flatViewerList.findIndex(item => item.id === targetId);
    } else if(tarParentId) {
        const nextViewId = (viewerList[viewerList.findIndex(item => item.id === tarParentId) + 1] || {}).id;
        if(nextViewId) {
            targetIdx = flatViewerList.findIndex(item => item.id === nextViewId);
        }
    }
    let sourceRootId = searchRootId(sourceId, configList);
    let targetRootId = '';
    if(targetId) {
        targetRootId = searchRootId(targetId, configList);
    } else { // 控件拖拽到末尾，无下一个控件
        if(tarParentId) { // 拖拽到分栏or套件末尾 tarParentId即为分栏or套件id
            targetRootId = configList[tarParentId].role === ROLE_GROUP_INTERVIEW
                ? tarParentId : searchRootId(tarParentId, configList);
        } else { // 拖拽到视图末尾
            targetRootId = '';
        }
    }
    let showList = [];
    let conditionList = [];
    // 作为条件，找到与之关联的结果列表
    if(sourceIdIsCondition) {
        showList = sortIdList[sourceId]?.showList || [];
    }
    // 作为结果，找到与之关联的条件
    if(sourceIdIsShowItem) {
        conditionList = Object.entries(sortIdList).filter(([conditionId, relationGroup]) => (relationGroup.showList || []).includes(sourceId))
            .map(([conditionId, relationGroup]) => conditionId);
    }
    let flag = true;
    if(sourceRootId !== targetRootId){ // 设置了逻辑不能跨层级【主要针对套件内外拖拽】
        flag = false;
    } else if(sourceIdIsCondition && !sourceIdIsShowItem){ // 仅作为条件
        // sourceIdx > targetIdx 前移
        flag = sourceIdx > targetIdx ? true : !hasShowInSpace(showList, sourceIdx, targetIdx);
    } else if(!sourceIdIsCondition && sourceIdIsShowItem){ // 仅作为结果
        // targetIdx > sourceIdx 后移
        flag = targetIdx > sourceIdx ? true : !hasConditions(conditionList, targetIdx, sourceIdx);
    } else { // 既作为条件也作为结果
        flag = sourceIdx > targetIdx
            ? !hasConditions(conditionList, targetIdx, sourceIdx)
            : !hasShowInSpace(showList, sourceIdx, targetIdx);
    }

    return { success: flag ? 1 : 0, message: computeErrMessage() };

    // 计算错误信息
    function computeErrMessage() {
        let message = 'success';
        switch(!flag) {
            case sourceRootId !== targetRootId:
                message = '该题已设置关联逻辑，套件内外的题目不可拖拽';
                break;
            default:
                message = '该题已设置关联逻辑，不可将逻辑结果移到逻辑条件之前';
        }
        return message;
    }

    function hasShowInSpace(showList, startIdx, endIdx) {
        if(!showList.length) return false;
        return showList.some(showItemId => {
            const idx = flatViewerList.findIndex(item => item.id === showItemId);
            return idx > startIdx && idx < endIdx;
        });
    }

    function hasConditions(conditionList, startIdx, endIdx) {
        if(!conditionList.length) return false;
        return conditionList.some(conditionId => {
            const idx = flatViewerList.findIndex(item => item.id === conditionId);
            return idx >= startIdx && idx < endIdx;
        });
    }
}