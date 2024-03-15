<template>
<div class="relation-config-group">
    <slot name="delete-operate" />
    <!-- 关联组逻辑 -->
    <div class="relation-config-strategy">
        <ui-select v-model="data.strategy">
            <ui-option v-for="(strategy, strategyIndex) in strategyList" :key="strategyIndex"
                :value="strategy.value"
            >
                {{ strategy.label || '' }}
            </ui-option>
        </ui-select>
    </div>
    <!-- 条件 -->
    <div class="relation-config-condition">
        <div class="config-condition-list">
            <relation-condition-item v-for="(condition, conditionIndex) in data.conditions" :key="conditionIndex"
                :condition="condition" :question-list="conditionQuestionList"
            >
                <div slot="operate" class="add-reduce-wrapper">
                    <a href="javascript:;" class="add-btn" @click="handleAction('add-condition')">
                        <i class="ui-icon-circle-plus-outline"></i>
                    </a>
                    <a v-if="(data.conditions || []).length > 1" href="javascript:;" class="remove-btn" @click="handleAction('remove-condition', { condition })">
                        <i class="ui-icon-remove-outline"></i>
                    </a>
                </div>
            </relation-condition-item>
        </div>
    </div>

    <!-- 分割线 -->
    <div class="relation-config-line"></div>

    <!-- 结果 -->
    <div class="relation-config-result">
        <div class="config-result-list">
            <relation-result-item v-for="(result, resultIndex) in data.showList" :key="resultIndex"
                :result="result" :question-list="resultQuestionList"
            >
                <div slot="operate" class="add-reduce-wrapper">
                    <a href="javascript:;" class="add-btn" @click="handleAction('add-result')">
                        <i class="ui-icon-circle-plus-outline"></i>
                    </a>
                    <a v-if="(data.showList || []).length > 1" href="javascript:;" class="remove-btn" @click="handleAction('remove-result', { result })">
                        <i class="ui-icon-remove-outline"></i>
                    </a>
                </div>
            </relation-result-item>
        </div>
    </div>
</div>
</template>
<script>
import { createNewRelationGroup } from '../../model/relation';

import {
    ROLE_CHOOSE,
    STRATEGY_RELATION_OPTIONS
} from '../../model/const';

import RelationConditionItem from './relation-condition-item.vue';
import RelationResultItem from './relation-result-item.vue';

export default {
    name: 'RelationGroup',
    components: {
        RelationConditionItem,
        RelationResultItem
    },
    inject: ['relation'],
    props: {
        // 全部问题列表
        questionList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        data: {
            type: Object,
            default: function() {
                return createNewRelationGroup();
            }
        }
    },
    computed: {
        // 关联组逻辑列表
        strategyList() {
            return STRATEGY_RELATION_OPTIONS;
        },
        // 所有问题id列表
        questionIdList() {
            return this.questionList.map(ele => ele.id);
        },
        // 条件可选的问题列表  【逻辑条件暂只支持选择、未选择，所以过滤出选择控件】
        conditionQuestionList() {
            const roleList = [ROLE_CHOOSE];
            // 已选择的结果列表
            const { showList } = this.data || {};
            const list = (showList || []).filter(show => !!show.showItemId);
            const minIndex = list.length ? Math.min.apply(
                null,
                list.map(show => this.questionIdList.indexOf(show.showItemId))
            ) : (this.questionList || []).length;
            // 过滤出选择控件
            return (this.questionList || []).slice(0, minIndex)
                .filter(config => roleList.includes(config.role));
        },
        // 结果可选的问题列表
        resultQuestionList() {
            // 已选择的条件列表
            const { conditions } = this.data || {};
            const list = (conditions || []).filter(condition => !!condition.conditionId);
            const maxIndex = list.length ? Math.max.apply(
                null,
                list.map(condition => this.questionIdList.indexOf(condition.conditionId))
            ) : -1;
            return (this.questionList || []).slice(maxIndex + 1);
        }
    },
    data() {
        return {};
    },
    methods: {
        handleAction(operateType = '', options = { }) {
            const { condition, result }  = options || {};
            switch(operateType) {
                case 'add-condition': // 添加条件
                    this.addCondition();
                    break;
                case 'remove-condition': // 删除条件
                    this.removeCondition(condition);
                    break;
                case 'add-result': // 添加结果
                    this.addResult();
                    break;
                case 'remove-result': // 删除结果
                    this.removeResult(result);
                    break;

            }
        },
        // 添加条件
        addCondition() {
            this.relation && this.relation.addCondition(this.data);
        },
        // 删除条件
        removeCondition({ id }) {
            this.relation && this.relation.removeCondition(id, this.data);
        },
        // 添加结果
        addResult() {
            this.relation && this.relation.addShowItem(this.data);
        },
        // 删除结果
        removeResult({ id }) {
            this.relation && this.relation.removeShowItem(id, this.data);
        }
    }
};
</script>