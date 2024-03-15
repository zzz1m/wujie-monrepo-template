<template>
<!-- 此页面为绩效评价详情页面 -->
<div class="page-content page-evaluation-fill kpi-page page-evaluate-view-2022">
    <div class="page-evaluation-fill-content">
        <!-- 绩效 head -->
        <evaluation-header :title="title" :evaluation-type="evaluationType" :kpi-result="result.calss" :user-data="userData" :show-all="isDirectLeader || isAdmin">
            <!-- 月度绩效 只有上级和管理员才有 -->
            <month-performance v-if="isDirectLeader || isAdmin" :user-id="userId" :kpi-key="kpiKey"></month-performance>
        </evaluation-header>
        <div class="page-evaluation-wrapper">
            <div v-if="result && result.map" class="page-evaluate-tabs">
                <ui-tab v-model="param.twType" show-bar @tab-click="selectTab">
                    <template v-for="tab in EVALUATION_TABS">
                        <ui-tab-pane v-if="result.map && result.map[tab.value]" 
                            :key="tab.value" :label="tab.label" :name="tab.value"
                        >
                            <div slot="label" class="tab-text-wrapper">{{ tab.label }}</div>
                        </ui-tab-pane>
                    </template>
                    <ui-tab-pane v-if="showCheck == 1 || showCheck == 2" name="result_check">
                        <div slot="label" class="tab-text-wrapper">结果校准</div>
                    </ui-tab-pane>
                </ui-tab>
            </div>

            <!-- 绩效 content -->
            <div ref="container" class="block-evaluation-content">
                <div class="block-evaluation-content-viewer">
                    <!-- 月度绩效 只有上级才有 -->
                    <template v-if="param.twType !== 'result_check'">
                        <template v-for="(item, idx) in descList">
                            <evaluation-desc :key="idx"
                                :label="item.label" :list="item.list"
                            ></evaluation-desc>
                        </template>
                    </template>
                    <EvaluationJiaozhun v-else :is-admin="showCheck" :user="userData" :kpi-key="kpiKey" @refresh="reRender"></EvaluationJiaozhun>
                </div>
            </div>

            <!-- 绩效 foot -->
            <div class="block-evaluation-footer">
                <button class="btn btn-primary btn-outline" @click="goBack">返回</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import EvaluationHeader from '@/package/performance/components/entry-2022/evaluation-header';
import EvaluationDesc   from './components/evaluation-desc';
import MonthPerformance from '@/package/performance/components/entry-2022/month-performance';

import { myResult, getResult, _getUserBaseInfo } from '@/services/dashboard/performance';
import { mapState } from 'vuex';
import EvaluationJiaozhun from './components/evaluation-jiaozhun.vue';

const EVALUATION_TABS = [
    { value: 'SELF', label: '本人自评' },
    { value: 'COOPERATE', label: '协作方评价' },
    { value: 'COOPERATE2', label: '协作方评价' },
    { value: 'SUBORDINATE', label: '下级评价' },
    { value: 'LEADER', label: '上级评价' },
    { value: 'LEADER_PRO', label: '专业上级评价' }
];

const calcDesc = function(data){
    const arr = [];
    // 没有数据直接返回空数组
    if (!Object.keys(data).length) { return []; }
    Object.entries(data).forEach(([label, list]) => {

        if (label === '工作总结') {
            arr.unshift({ label, list });
        } else {
            arr.push({ label, list });
        }
    });
    return arr;
};

export default {
    name: 'EvaluationDetail',
    components: {
        EvaluationHeader,EvaluationDesc,MonthPerformance, EvaluationJiaozhun
    },
    computed: {
        ...mapState(['userInfo']),
        EVALUATION_TABS() {
            return EVALUATION_TABS;
        },
        userId() {
            return this.$route.query.userId;
        },
        showCheck() {
            return this.$route.query.showCheck;
        },
        descList() {
            if( this.result.map ){
                const data = this.result.map[ this.param.twType ] || {};
                return calcDesc( data );
            }else {
                return [];
            }
        },
        originTwType() {
            return this.$route.query.twType;
        },
        isDirectLeader() { // 直接领导
            return this.originTwType === 'LEADER';
        },
        isDirectLeaderType() { // 领导标签
            return this.isDirectLeader && this.param.twType === 'LEADER';
        },
        kpiKey() {
            return this.$route.query.kpiKey;
        },
        evaluationType() {
            return this.userData?.roleKey === 'role_one' ? 1 : 2;
        },
        isSelf() { // 自己
            return this.originTwType === 'SELF';
        },
        isAdmin() {
            return this.$route.query.type === 'admin';
        }
    },
    data() {
        return {
            param: {
                twType: 'SELF'
            },
            // 测评结果
            result: {},
            title: '',
            lastTabType: '',
            scrollCache: {      // 切换标签记录scrollTop

            },
            userData: {}
        };
    },
    created() {
        this.reRender();
    },
    methods: {
        reRender() {
            this.getEvaluationResult();
            this.selectTab();
            this.getUserInfo();
        },
        // 获取测评结果
        async getEvaluationResult() {
            // 我的绩效和绩效协作 走myResult
            const isMyResult = ['cooperation', 'myself'].includes(this.$route.query.type);
            const userId = this.userId;
            const kpiKey = this.$route.query.kpiKey;
            const twType = this.$route.query.twType;
            let params = {kpiKey};
            if (userId) {
                params.userId = userId;
            }
            if (twType) {
                params.twType = twType;
                this.$set(this.param, 'twType', twType);
            }
            const { success, root, host } = !isMyResult ? (await getResult(params)) : ( await myResult(params));
            if( success && root ){
                this.result = root;
                this.title = root.schemeName || host || '';
            }
        },
        // 获取人员信息
        async getUserInfo(){
            try {

                const userId = this.isSelf ? this.userInfo.id : this.userId;
                const kpiKey = this.$route.query.kpiKey;
                const twType = this.$route.query.twType;
                const { success, root } = await _getUserBaseInfo({
                    kpiKey,
                    userId,
                    twType: this.isAdmin ? 'LEADER' : twType
                });
                if ( success && root ) {
                    this.userData = {...root, userId: this.$route.query.userId};
                    console.log(this.userData);
                }
            } catch (e) {
                console.error(e);
            }
        },
        goBack() {
            this.$router.back();
        },
        // 选择tab  切换的时候 scroll 到上次滚动位置
        selectTab() {
            if (this.$refs.container && this.lastTabType) {  // 缓存滚动的高度
                this.scrollCache[this.lastTabType] = this.$refs.container.scrollTop;
            }
            this.lastTabType = this.param.twType;
            this.$nextTick(() => {                           // 设置滚动的高度 渲染完设置不然scrollTop可能无法到正常高度
                if (this.scrollCache[this.param.twType]) {      
                    this.$refs.container.scrollTop = this.scrollCache[this.param.twType];
                } else {
                    this.$refs.container.scrollTop = 0;
                } 
            });
        }
    }
};
</script>
