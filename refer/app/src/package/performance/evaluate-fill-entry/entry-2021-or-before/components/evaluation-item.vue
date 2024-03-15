<template>
<div class="block-evaluation-item">
    <div class="block-evaluation-item-label">{{ data.item }}</div>

    <template v-if="data.description">
        <div class="block-evaluation-item-sublabel">考评项</div>
        <div class="block-evaluation-item-case" v-html="data.description"></div>
    </template>

    <template v-if="standardList && standardList.length">
        <div class="block-evaluation-item-sublabel">评价标准</div>
        <!-- <ui-table border>
                <tbody slot="body">
                    <tr v-for="item in standardList" :key="item.value">
                        <td width="100"><div>{{item.value}}</div></td>
                        <td><div>{{item.label}}</div></td>
                    </tr>
                </tbody>
            </ui-table> -->
        <ui-table-pro :data="standardList" class="performance-fill-talbe"
            stripe :border="true" :show-header="false" empty-text="暂无数据"
        >
            <ui-table-column prop="value" label="" width="100" align="center"></ui-table-column>
            <ui-table-column prop="label" label="" width=""></ui-table-column>
        </ui-table-pro>
    </template>
        
    <ui-form ref="form" :label-width="120">
        <form-item label="评分：" required>
            <ui-select v-model="data.itemScore"
                :disabled="readonly"
                @on-query-change="selectScore"
            >
                <ui-option v-for="item in scoreList" 
                    :key="item.value" :value="item.value"
                >{{ item.label }}</ui-option>
            </ui-select>
            <!-- <div v-show="data.scoreStatus>0" class="text-danger error-txt">请选择评分</div> -->
        </form-item>
        <form-item label="行为描述：" :class="moreThanLimit && 'form-item-error'" required>
            <div class="block-evaluation-item-actiontip">{{ data.behaviorDesc }}</div>
            <ui-input v-model.trim="data.commen"
                placeholder="请输入行为描述" type="textarea" 
                counter :rows="4" :disabled="readonly"
                :maxlength="2000" :autosize="{minRows: 4}"
                @on-change="changeCommen"
            ></ui-input>
            <!-- <div v-show="data.commenStatus>0 && !this.data.commen" class="text-danger error-txt" >请输入行为描述</div> -->
            <!-- <div v-show="moreThanLimit" class="text-danger error-txt" >不能超过2000个字</div> -->
        </form-item>
    </ui-form>
</div>
</template>

<script>
const calcStandard = function(str) {
    str = str.replace(/<br\/>/g, 'brbrbr');
    const result = str.split('brbrbr').map(item => {
        const [value, label] = item.split('|');
        return {
            value, label
        };
    });
    return result;
};
const scoreList = [
    { label: '5级', value: 5 },
    { label: '4级', value: 4 },
    { label: '3级', value: 3 },
    { label: '2级', value: 2 },
    { label: '1级', value: 1 }
];
export default {
    name: 'EvaluationItem',
    props: {
        data: {
            type: Object,
            required: true
        },
        allowEdit: {// 是否允许继续修改
            type: Boolean,
            default: true 
        }
    },
    computed: {
        standardList() {
            return calcStandard( this.data.standard ).filter(item => item.value || item.label);
        },
        scoreList() {
            return scoreList;
        },
        readonly() {
            return this.$route.query.readonly === 'true' || !this.allowEdit;
        },
        moreThanLimit() {
            const limit = 1000;
            let str = this.data.commen || '';
            return this.$validate.getLength(str) > limit;
        }

    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.$set(this.data, 'scoreStatus', 0);
            this.$set(this.data, 'commenStatus', 0);
        },
        selectScore() {
            this.data.scoreStatus = 0;
            this.$emit('change-score');
            this.$emit('change-val');
        },
        changeCommen() {
            this.data.commenStatus = (this.data.commen && !this.moreThanLimit) ? 0 : 1;
            this.$emit('change-val');
        }
    }
};
</script>