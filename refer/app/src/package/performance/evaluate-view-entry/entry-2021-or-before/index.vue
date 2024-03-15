<template>
<!-- 此页面为绩效评价详情页面 -->
<div class="page-content page-evaluation-detail page-evaluation-fill">
    <!-- 绩效 head -->
    <evaluation-header :title="title" :user-data="userData"></evaluation-header>

    <div class="evaluation-tabs">
        <div v-if="result.calss" class="block-title">考评结果： <span class="result">{{ result.calss }}</span></div>
        <ui-tab v-model="param.twType" @tab-click="selectTab">
            <template v-for="tab in EVALUATION_TABS">
                <ui-tab-pane v-if="result.map && result.map[tab.value]"
                    :key="tab.value" :label="tab.label" :name="tab.value"
                ></ui-tab-pane>
            </template>
        </ui-tab>
    </div>

    <!-- 绩效 content -->
    <div ref="container" class="block-evaluation-content">
        <div class="block-evaluation-content-viewer">
            <!-- 月度绩效 只有上级才有 -->
            <month-performance v-if="isDirectLeaderType" :user-id="userId" :kpi-key="kpiKey"></month-performance>
            <template v-for="(item, idx) in descList">
                <evaluation-desc :key="idx"
                    :label="item.label" :is-old="item.isOld" :list="item.list"
                ></evaluation-desc>
            </template>
        </div>
    </div>

    <!-- 绩效 foot -->
    <div class="block-evaluation-footer">
        <button class="btn btn-primary btn-outline" @click="goback">返回</button>
    </div>
</div>
</template>

<script>
import EvaluationHeader from './components/evaluation-header';
import EvaluationDesc   from './components/evaluation-desc';
import MonthPerformance from './components/month-performance';

import { myResult, getResult, _getUserBaseInfo } from '@/services/dashboard/performance';
import { mapState } from 'vuex';
const EVALUATION_TABS = [
    { value: 'SELF', label: '本人自评' },
    { value: 'COOPERATE', label: '协作方评价' },
    { value: 'COOPERATE2', label: '协作方二评价' },
    { value: 'SUBORDINATE', label: '下级评价' },
    { value: 'LEADER', label: '上级评价' },
    { value: 'LEADER_PRO', label: '专业上级评价' },
    { value: 'LEADER_PRO', label: '结果校准' }
];

const calcDesc = function(data, isOld){
    const arr = new Array(2);
    // 没有数据直接返回空数组
    if (!Object.keys(data).length) { return []; }
    Object.entries(data).forEach(([label, list]) => {
        const sort = label === '价值观' ? 0 : 1;
        arr[sort] = { label, isOld, list };
    });
    return arr;
};

export default {
    name: 'EvaluationDetail',
    components: {
        EvaluationHeader,EvaluationDesc,MonthPerformance
    },
    computed: {
        ...mapState(['userInfo']),
        EVALUATION_TABS() {
            return EVALUATION_TABS;
        },
        userId() {
            return this.$route.query.userId;
        },
        descList() {
            if( this.result.map ){
                const data = this.result.map[ this.param.twType ] || {};
                return calcDesc( data, this.result.commonItemConfig === 'big_item' );
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
            userData: {},
            scrollCache: {      // 切换标签记录scrollTop

            }
        };
    },
    created() {
        this.getUserInfo();
        this.getEvaluationResult();
        this.selectTab();
    },
    methods: {
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
            // 本人和管理员不传twType
            if (twType && !this.isAdmin && !this.isSelf) {
                params.twType = twType;
                this.$set(this.param, 'twType', twType);
            }
            const { success, root, host } = !isMyResult ? (await getResult(params)) : ( await myResult(params));
            if( success && root ){
                this.result = root;
                this.title = root.title || host || '';
            }
        },
        goback() {
            this.$router.back();
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
                    this.userData = root;
                }
            } catch (e) {
                console.error(e);
            }
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
