<template>
<div class="page-work-summary">
    <div class="block-">
        <h4 class="required">
            工作总结
            <ui-tooltip placement="right" :open-delay="400" class="evaluate-fill-help-content" popper-class="evaluate-fill-rules-popover" max-width="400">
                <div><svg-icon icon-class="meet-help" /></div>
                <div slot="content" class="evaluate-fill-wrapper" >
                    <p class="evaluate-fill-rule">如何写好工作总结</p>
                    <p><b>1.业务思考</b></p>
                    <p class="text-level3">向内看：思考所在业务及个人岗位的定位和对公司产生的价值。</p>
                    <p class="text-level3">向外看（可选）：提供值得参考的行业信息，设定一个标杆，思考清楚我们处于什么阶段，什么位置。</p>
                    <p><b>2.工作回顾</b></p>
                    <p><b>模板1：适用于管理者</b></p>
                    <p>（1）拿结果：在“活儿”方面，“能选马，分得出去，收得回来” 。</p> 
                    <p class="text-level3">策略制定：聚焦关键问题，洞察问题本质，选择有效策略解决问题。</p>
                    <p class="text-level3">过程管理：有效拆解目标、安排分工、跟进过程、及时解决困难/突发情况。</p>
                    <p class="text-level3">结果产出：团队切实解决高水平的问题，贡献突出。</p>
                    <p>（2）带团队：在“队伍”方面，“能招人、能带人、能开人”。</p> 
                    <p class="text-level3">团队搭建：吸引优秀人才加入、淘汰不合适的人员。</p>
                    <p class="text-level3">团队激励：通过考核奖惩、氛围建设、人才配置、流程优化等，提升团队凝聚。</p>
                    <p class="text-level3">团队培养：对团队成员有指导、有培养，让团队有成长。</p>
                    <p>（3）作风正：指在“公私”方面，做到“60%的屁股坐在公司，40%坐在自己个人”。</p> 
                    <p class="text-level3">以身作则：践行公司价值观，起到示范带头作用。</p>
                    <p class="text-level3">管理担当：正确认识管理者角色，履行管理者职责。</p>
                    <p class="text-level3">自我突破：不断提升能力和格局。</p>
                    <p><b>模板2：适用于非管理者</b></p>
                    <p class="text-level3">重点工作：结论先行，一句话总结重点工作是什么。</p> 
                    <p class="text-level3">工作进展：量化的结果，数据展示 。</p>
                    <p class="text-level3">认知迭代：对当前业务相对之前有哪些新的思考。</p>

                    <p>建议可以用SCQA的结构来描述重点工作（Situation情景/Complication冲突/Question疑问/Answer回答）。</p>
                    
                    <p><b>3.问题与挑战</b></p>
                    <p>对于任何一个团队来说，问题都是无穷多的。建议可以以终为始，从取得更好的成绩来讨论，讨论影响取得更好成绩的障碍。建议这些障碍可以从三个维度来考虑：</p>
                    <p class="text-level3">非常大的障碍：如，业务漏洞、技术漏洞。</p>
                    <p class="text-level3">外部障碍：如，跨部门协作中的问题、外部供应商问题。</p>
                    <p class="text-level3">需要别人解决的障碍：如，需要资源支持，需要上级或同事的协助。</p>

                    <p><b>4.下个阶段计划</b></p>
                    <p class="text-level3">业务目标：接下来的业务目标是什么，要求是定性的、有挑战的，建议不多于5条。</p>
                    <p class="text-level3">关键路径：你打算如何做，采取哪些手段和方法来实现业务目标。</p>
                </div>
            </ui-tooltip>
        </h4>
        <div class="work-summary-content" :class="readonly && 'evaluation-readonly'">
            <ui-form ref="form" :model="data" :label-width="0" :rules="ruleData">
                <form-item prop="comment">
                    <ui-input v-model="data.comment" placeholder="请输入个人工作总结" type="textarea" 
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
        scoreCommentList: {
            type: Array,
            required: true,
            default: () => []
        },
        allowEdit: {// 是否允许继续修改
            type: Boolean,
            default: true 
        }
    },
    data () {
        return {
            formData: {
                comment: ''
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
        data() {
            return (this.scoreCommentList || []).find(item => item.type === 'workSummary') || {};
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