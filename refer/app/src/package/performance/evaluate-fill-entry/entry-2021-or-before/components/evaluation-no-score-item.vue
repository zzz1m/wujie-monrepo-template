<template>
<div class="block-evaluation-item">
    <div class="block-evaluation-item-label">{{ data.item }}</div>
    <ui-form ref="form" :label-width="120">
        <form-item label="思考感悟：" :class="moreThanLimit && 'form-item-error'" required>
            <div class="block-evaluation-item-actiontip">1.思考与总结：今年在工作中总结了哪些经验与方法？2.成长与感悟：今年在个人上收获了哪些成长与感悟？</div>
            <ui-input v-model.trim="data.comment"
                placeholder="请输入思考感悟" type="textarea" 
                counter :rows="4" :disabled="readonly"
                :maxlength="2000" :autosize="{minRows: 4}"
                @on-change="changeCommen"
            ></ui-input>
            <!-- <div v-show="data.commenStatus>0 && !this.data.commen" class="text-danger error-txt" >请输入行为描述</div> -->
            <!-- <div v-show="moreThanLimit" class="text-danger error-txt" >不能超过2000个字节</div> -->
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
export default {
    name: 'EvaluationNoScoreItem',
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
        readonly() {
            return this.$route.query.readonly === 'true' || !this.allowEdit;
        },
        moreThanLimit() {
            const limit = 1000;
            let str = this.data.comment || '';
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
        changeCommen() {
            this.data.commenStatus = (this.data.comment && !this.moreThanLimit) ? 0 : 1;
            this.$emit('change-val');
        }
    }
};
</script>