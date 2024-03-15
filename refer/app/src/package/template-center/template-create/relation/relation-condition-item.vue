<template>
<div class="config-condition-item">
    <div class="config-condition-question">
        <ui-select v-model="condition.conditionId" @on-change="changeCondition">
            <ui-option v-for="(item, questionIndex) in questionList" :key="questionIndex"
                :value="item.id"
            >
                {{ item.title || '' }}
            </ui-option>
        </ui-select>
    </div>
    <div class="config-condition-logic">
        <ui-select v-model="condition.logic" @on-change="changeLogic">
            <ui-option v-for="(item, logicIndex) in logicList" :key="logicIndex"
                :value="item.value"
            >
                {{ item.label }}
            </ui-option>
        </ui-select>
    </div>
    <!-- 选择、未选择 -->
    <div v-if="showSelect" class="config-condition-option">
        <template v-if="isMultipleSelect">
            <ui-select key="multiple-select" v-model="condition.optionId" multiple collapse-tags>
                <ui-option v-for="(item, optionIndex) in optionList" :key="optionIndex"
                    :value="item.code"
                >
                    {{ item.label || '' }}
                </ui-option>
            </ui-select>
        </template>
        <template v-else>
            <ui-select key="single-select" v-model="condition.optionId">
                <ui-option v-for="(item, optionIndex) in optionList" :key="optionIndex"
                    :value="item.code"
                >
                    {{ item.label || '' }}
                </ui-option>
            </ui-select>
        </template>
    </div>
    <slot name="operate" />
</div>
</template>
<script>
import {
    STRATEGY_CONDITION_OPTIONS,
    TYPE_BASIC_CHECKBOX,
    STRATEGY_CONDITION_SELECT,
    STRATEGY_CONDITION_UNSELECT
} from '../../model/const';

import { createNewCondition } from '../../model/relation';

export default {
    name: 'RelationConditionItem',
    props: {
        condition: {
            type: Object,
            default: function() {
                return createNewCondition();
            }
        },
        questionList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    computed: {
        // 是否多选
        isMultipleSelect() {
            const { conditionId } = this.condition || {};
            if(!conditionId) return false;
            const question = this.questionList.find(question => question.id === conditionId) || {};
            return [TYPE_BASIC_CHECKBOX].includes(question.type);
        },
        // 逻辑列表
        logicList() {
            const { conditionId } = this.condition || {};
            if(!conditionId) return [];
            const question = this.questionList.find(question => question.id === conditionId) || {};
            return STRATEGY_CONDITION_OPTIONS.filter(strategy => (strategy.types || []).includes(question.type));
        },
        // 选项列表
        optionList() {
            const { conditionId } = this.condition || {};
            if(!conditionId) return [];
            const question = this.questionList.find(question => question.id === conditionId) || {};
            return question.options || [];
        },
        // 是否显示选项选择器
        showSelect() {
            const { logic } = this.condition || {};
            return [STRATEGY_CONDITION_SELECT, STRATEGY_CONDITION_UNSELECT].includes(Number(logic));
        }
    },
    methods: {
        // 改变条件
        changeCondition() {
            this.$set(this.condition, 'logic', '');
            this.$set(this.condition, 'optionId', '');
        },
        // 改变逻辑
        changeLogic() {
            this.$set(this.condition, 'optionId', '');
        }
    }
};
</script>