<template>
<div class="page-work-summary comprehensive-evaluation m-t--10">
    <div class="block-">
        <h4 class="required">综合评价</h4>
        <div class="work-summary-content" :class="readonly && 'evaluation-readonly'">
            <ui-form ref="form" :model="advantage" :label-width="0" :rules="ruleData">
                <form-item prop="comment">
                    <p class="content-title required">优点：</p>
                    <ui-input v-model="advantage.comment" :placeholder="placeholderMap[evaluationType] ? placeholderMap[evaluationType].advantage : ''" type="textarea" 
                        counter :rows="4" :readonly="readonly"
                        :maxlength="5000" :autosize="{minRows: 4}"
                        @on-change="changeCommen"
                    ></ui-input>
                </form-item>
            </ui-form>
            <ui-form ref="form" :model="shortage" :rules="ruleData">
                <form-item prop="comment">
                    <p class="content-title required">不足：</p>
                    <ui-input v-model="shortage.comment" :placeholder="placeholderMap[evaluationType] ? placeholderMap[evaluationType].shortage : ''" type="textarea" 
                        counter :rows="4" :readonly="readonly"
                        :maxlength="5000" :autosize="{minRows: 4}"
                        @on-change="changeCommen"
                    ></ui-input>
                </form-item>
            </ui-form>
            <ui-form ref="form" :model="proposal" :rules="ruleData">
                <form-item prop="comment">
                    <p class="content-title required">发展规划/建议：</p>
                    <ui-input v-model="proposal.comment" :placeholder="placeholderMap[evaluationType] ? placeholderMap[evaluationType].proposal : ''" type="textarea" 
                        counter :rows="4" :readonly="readonly"
                        :maxlength="5000" :autosize="{minRows: 4}"
                        @on-change="changeCommen"
                    ></ui-input>
                </form-item>
            </ui-form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'WorkSummary',
    props: {
        allowEdit: {// 是否允许继续修改
            type: Boolean,
            default: true 
        },
        scoreCommentList: {
            type: Array,
            required: true,
            default: () => []
        },
        evaluationType: {// 类型
            type: Number,
            default: 1 
        }
    },
    data () {
        return {
            formData: {
                advantage: '',
                shortcoming: '',
                proposal: ''
            },
            ruleData: {
                comment: [
                    { max: 5000, message: '最长为5000字', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        readonly() {
            return this.$route.query.readonly === 'true' || !this.allowEdit;
        },
        // 优点
        advantage() {
            return (this.scoreCommentList || []).find(item => item.type === 'advantage') || {};
        },
        // 不足
        shortage() {
            return (this.scoreCommentList || []).find(item => item.type === 'shortage') || {};
        },
        // 发展规划/建议
        proposal() {
            return (this.scoreCommentList || []).find(item => item.type === 'proposal') || {};
        },
        placeholderMap() {
            return {
                1: {
                    advantage: '如果您在解决问题、规则意识、投入度任何一项评价，高于中间档，则此处应有对应的具体评价理由',
                    shortage: '如果您在解决问题、规则意识、投入度任何一项评价，低于中间档，则此处应有对应的具体评价理由',
                    proposal: '对于下一阶段的发展规划/建议'
                },
                2: {
                    advantage: '如果您在业绩、价值观任何一项评价，高于中间档，则此处应有对应的具体评价理由',
                    shortage: '如果您在业绩、价值观任何一项评价，低于中间档，则此处应有对应的具体评价理由',
                    proposal: '对于下一阶段的发展规划/建议'
                }
            };
        }
    },
    created () {
        
    },

    methods: {
        changeCommen() {
            this.$emit('change-val');
        }
    }
};
</script>