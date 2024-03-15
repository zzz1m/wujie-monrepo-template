/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * 观察模型 * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import { RelationModel } from './relation.js';
import ParamModel from './param.js';
import { getType } from './tools';
// import Validator from './validator.js';

import {
    PARAM_SELECT_OPTION_CODE,
    STRATEGY_CONDITION_SELECT, STRATEGY_CONDITION_UNSELECT,
    STRATEGY_RELATION_ANY, STRATEGY_RELATION_ALL
} from './const.js';

// 比对值的策略  value用户传入的值 defaultValue关联设置配置的值
const compareStrategy = {
    [STRATEGY_CONDITION_SELECT]: (value, defaultValue) => {
        const realValue = getType(value) === 'object'
            ? value[PARAM_SELECT_OPTION_CODE]
            : getType(value) === 'array'
                ? value.map(item => item[PARAM_SELECT_OPTION_CODE])
                : value;
        // 处理值为数组
        const dealDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        return getType(realValue) === 'string'
            ? dealDefaultValue.includes(realValue)
            : dealDefaultValue.every(item => realValue.includes(item));
    },
    [STRATEGY_CONDITION_UNSELECT]: (value, defaultValue) => {
        const realValue = getType(value) === 'object'
            ? value[PARAM_SELECT_OPTION_CODE]
            : getType(value) === 'array'
                ? value.map(item => item[PARAM_SELECT_OPTION_CODE])
                : value;
        // 处理值为数组
        const dealDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        return getType(realValue) === 'string'
            ? !dealDefaultValue.includes(realValue)
            : dealDefaultValue.every(item => !realValue.includes(item));
    }
};
export default class WatchModel {
    constructor(options = {}){
        this.$param = new ParamModel({
            paramList: options.paramList,
            configList: options.configList,
            init: options.init
        });
        this.$relation = new RelationModel({
            relationGroupList: options.relationGroupList,
            viewerList: options.viewerList,
            configList: options.configList,
            defaultHidden: true
        }, () => {
            this.init();
        });
    }
    init() {
        const conditionIdList = (this.$relation.relationGroupList || []).reduce((result, { conditions }) => {
            return result.concat(
                conditions.map(condition => condition.conditionId)
                    .filter(conditionId => !result.includes(conditionId))
            );
        }, []);
        conditionIdList.forEach(conditionId => this.trigger(conditionId, true));
    }
    trigger(conditionId, init = false){
        const showList = this.$relation.getShowListByCondition(conditionId);
        const { RTools } = this.$relation;
        showList.forEach(showItemId => {
            // 根据结果获取关联组
            const relationGroupList = this.$relation.getRelationGroupByResult(showItemId);
            const flag = relationGroupList.some(relationGroup => {
                // 条件是显示的 bug
                // const { conditions } = relationGroup || {};
                // const conditionExist = (conditions || []).every(condition => !RTools.configList[condition.conditionId].hidden);
                // return conditionExist && this.handle(relationGroup);

                return this.handle(relationGroup);
            });
            // 显示结果时，初始化控件的值
            if(flag) {
                if(init) {
                    // 显示结果时，初始化控件的值
                    // 用户选择的值
                    const value = this.$param.getValue(conditionId);
                    [null, undefined].includes(value)
                        && this.$param.addParam({...RTools.configList[showItemId], copyId: RTools.flatViewerList.find(item => item.id === showItemId).copyId});
                } else {
                    // 如果是隐藏状态 重新初始化值
                    if (RTools.configList[showItemId].hidden) {
                        this.$param.addParam({...RTools.configList[showItemId], copyId: RTools.flatViewerList.find(item => item.id === showItemId).copyId});
                    }
                }
            }
            this.notify(showItemId, !flag);
        });
    }
    // 根据关联组设置进行处理
    handle({ strategy, conditions }) {
        if(Number(strategy) === STRATEGY_RELATION_ANY) { // 匹配任何
            return this.handleAny(conditions);
        } else if(Number(strategy) === STRATEGY_RELATION_ALL) { // 匹配所有
            return this.handleAll(conditions);
        }
        return false;
    }
    // 匹配任何
    handleAny(conditions) {
        const { RTools } = this.$relation;
        // 任何一个条件符合
        return conditions.some(condition => !RTools.configList[condition.conditionId].hidden && this.calcRule(condition) );
    }
    // 匹配所有
    handleAll(conditions) {
        const { RTools } = this.$relation;
        // 所有条件符合
        return conditions.every(condition => !RTools.configList[condition.conditionId].hidden && this.calcRule(condition));
    }
    // 根据不同的规则计算
    calcRule(condition) {
        const { conditionId, logic, optionId } = condition || {};
        // 用户选择的值
        const value = this.$param.getValue(conditionId);
        // 分发不同的值比较策略
        return compareStrategy[Number(logic)](value, optionId);
    }
    notify(targetId, hidden){
        this.$relation.RTools.setShowItemHidden(targetId, hidden);
        // 当做为条件的控件隐藏时，作为结果的控件也需要同步隐藏 bug     
        if( hidden ){
            this.trigger( targetId );
        }
    }
};