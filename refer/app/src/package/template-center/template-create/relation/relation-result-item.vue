<template>
<div class="config-result-item">
    <div class="config-result-logic">
        <ui-select v-model="result.logic" @on-query-change="changeLogic">
            <ui-option v-for="(item, logicIndex) in resultLogicList" :key="logicIndex"
                :value="item.value"
            >
                {{ item.label }}
            </ui-option>
        </ui-select>
    </div>
    <div class="config-result-question">
        <ui-select v-model="result.showItemId">
            <ui-option v-for="(item, questionIndex) in questionList" :key="questionIndex"
                :value="item.id"
            >
                {{ item.title || '' }}
            </ui-option>
        </ui-select>
    </div>
    <span class="result-end-text">{{ (resultLogicList.find(logic => logic.value == result.logic) || {}).tip || '' }}</span>
    <slot name="operate" />
</div>
</template>
<script>
import {
    STRATEGY_SHOW_OPTIONS
} from '../../model/const';

import { createNewShowItem } from '../../model/relation';

export default {
    name: 'RelationResultItem',
    props: {
        result: {
            type: Object,
            default: function() {
                return createNewShowItem();
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
        // 结果逻辑列表
        resultLogicList() {
            return STRATEGY_SHOW_OPTIONS;
        }
    },
    methods: {
        // 改变逻辑
        changeLogic() {
            this.$set(this.result, 'showItemId', '');
        }
    }
};
</script>