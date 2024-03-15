<template>
<!-- 此页面为绩效评价页面 -->
<div class="page-content page-evaluation-fill kpi-page page-evaluate-fill-2022" :class="`evaluation-type-${evaluationType}`">
    <div class="page-evaluation-fill-content">
        <!-- 绩效 head -->
        <evaluation-header :title="schemeName" :evaluation-type="evaluationType" :user-data="userData" :kpi-result="detailResult" :show-all="isDirectLeader || isAdmin">
            <!-- 月度绩效 只有上级才有 -->
            <month-performance v-if="isDirectLeader || isAdmin" :user-id="userId" :kpi-key="kpiKey"></month-performance>
        </evaluation-header>
        <div v-if="pageInit" class="evaluate-fill-from-content">
            <div v-if="showTab && EVALUATION_TABS.length > 1" class="page-evaluate-tabs">
                <ui-tab v-model="param.twType" show-bar
                    @tab-click="selectTab"
                >
                    <ui-tab-pane v-for="tab in EVALUATION_TABS"
                        :key="tab.value" :label="tab.label" :name="tab.value"
                    >
                        <div slot="label" class="tab-text-wrapper">{{ tab.label }}</div>
                    </ui-tab-pane>
                    <ui-tab-pane v-if="showCheck == 0 || showCheck == 1 || showCheck == 2" name="result_check">
                        <div slot="label" class="tab-text-wrapper">绩效校准</div>
                    </ui-tab-pane>
                </ui-tab>
            </div>
            <!-- 绩效 content -->
            <div ref="container" class="block-evaluation-content">
                <div class="block-evaluation-content-viewer">
                    <template v-if="param.twType !== 'result_check'">
                        <template v-if="pageInit">
                            <!-- 自己评价或者标签选中了个人自评 -->
                            <WorkSummary v-if="(isSelf && param.twType !== 'LEADER') || param.twType === 'SELF'" :score-comment-list="scoreCommentList" :allow-edit="!readonly" @change-val="changeVal()" />
                            <template v-if="kpiList && kpiList.length">
                                <evaluation-list v-for="(arr,idx) in kpiList" 
                                    :key="idx" :evaluation-type="evaluationType" :label="arr[0].bigItem" :description="arr[0].description"
                                >
                                    <evaluation-item v-for="item in arr" 
                                        :key="item.itemId" :data="item" :allow-edit="!readonly"
                                        :evaluation-type="evaluationType" :hidden-title="arr.length === 1"
                                        @change-score="calculation()" @change-val="changeVal()"
                                    ></evaluation-item>
                                </evaluation-list>
                            </template>
                            <ComprehensiveEvaluation :score-comment-list="scoreCommentList" :allow-edit="!readonly" :evaluation-type="evaluationType" @change-val="changeVal()" />
                        </template>

                        <!-- 绩效等级 只有上级标签才有 -->
                        <!-- v-if="isDirectLeaderType" -->
                        <performance-level v-if="isDirectLeader || isAdmin" :show-select="param.twType === 'LEADER'" :allow-edit="!readonly" :kpi-result="kpiResult" :evaluation-type="evaluationType" :kpi-class-list="kpiClassList" :kpi-info="KPI" />
                    </template>
                    <EvaluationJiaozhun v-show="param.twType == 'result_check'" :tw-type="param.twType" :is-admin="showCheck" :user="userData" :kpi-key="kpiKey" @refresh="reRender"></EvaluationJiaozhun>
                </div>
            </div>
        </div>
   
        <!-- 绩效 foot -->
        <div v-if="pageInit" class="block-evaluation-footer">
            <button class="btn btn-primary btn-outline" @click="goBack">返回</button>
            <button v-if="!readonly" class="btn btn-primary" :disabled="isLoading" @click="checkKPI">保存</button>
        </div>
    </div>
</div>
</template>

<script>
import { 
    getKpiInfo, editKpiInfo, editKpiInfoAdmin, _calculation, _calculationClass, _getTwTypes, _getDetailListTab, _getUserBaseInfo, _listKpiClass, _getKpiClassResult
} from '@/services/dashboard/performance';  

import EvaluationHeader from '@/package/performance/components/entry-2022/evaluation-header';
import EvaluationList   from './components/evaluation-list';
import EvaluationItem   from './components/evaluation-item';
import MonthPerformance from '@/package/performance/components/entry-2022/month-performance';
import WorkSummary from './components/work-summary';
import ComprehensiveEvaluation from './components/comprehensive-evaluation';
import PerformanceLevel from './components/performance-level';

import EvaluationJiaozhun from './components/evaluation-jiaozhun.vue';
import DateMixin from '@/package/performance/utils/kpi-date.mixin';
import { scrollToFormError, isNull } from '@/utils/util.js';
import browerCtrl from '@/mixins/brower-controller';
import { mapState } from 'vuex';
import { INIT_FILL_LIST } from '@/package/performance/utils/config.js';
const EVALUATION_TABS = [
    { value: 'SELF', label: '本人自评' },
    { value: 'COOPERATE', label: '协作方评价' },
    { value: 'COOPERATE2', label: '协作方评价' },
    { value: 'SUBORDINATE', label: '下级评价' }
];

export default {
    name: 'EvaluationFill',
    props: {
        detailPage: Boolean
    },
    mixins: [ DateMixin, browerCtrl ],
    components: {
        EvaluationHeader,EvaluationList, 
        EvaluationItem, MonthPerformance,
        PerformanceLevel, WorkSummary, ComprehensiveEvaluation, EvaluationJiaozhun
    },
    data() {
        return {
            userData: {},
            kpiList: [], // kpi信息
            EVALUATION_TABS: [], // tab
            param: {}, // 参数
            KPI: { // kpi考核结果
                bigItemResultList: [],
                kpiScore: '',
                calss: ''
            },
            detailCache: {      // 用于做切换tab缓存数据

            },
            lastTabType: '',
            scrollCache: {      // 切换标签记录scrollTop

            },
            scoreCommentList: null,
            isLoading: false,       // 提交中
            notForbid: false,                   // 后退浏览器拦截使用
            KPILevel: '',
            kpiResult: {
                calss: ''
            },
            schemeName: '',
            pageInit: false,
            checkNotForbid: false,
            kpiClassList: [],
            detailResult: ''
        };
    },
    computed: {
        ...mapState(['userInfo']),
        originTwType() {
            return this.$route.query.twType;
        },
        isLeaderRole() {// 是否是上线 / 上级产品线L
            return ['LEADER', 'LEADER_PRO'].includes( this.originTwType );
        },
        showTab() {
            return this.isLeaderRole || (this.detailPage && this.isSelf);
        },
        isDirectLeader() { // 直接领导
            return this.originTwType === 'LEADER';
        },
        isDirectLeaderType() { // 领导标签
            return this.isDirectLeader && this.param.twType === 'LEADER';
        },
        isSelf() { // 自己
            return this.originTwType === 'SELF';
        },
        readonly() {
            const { readonly, twType } = this.$route.query;
            return readonly || (twType !== this.param.twType && !this.isAdmin) || this.detailPage;
        },
        userId() {
            return this.$route.query.userId;
        },
        kpiKey() {
            return this.$route.query.kpiKey;
        },
        isAdmin() {
            return this.$route.query.type === 'admin';
        },
        evaluationType() {
            return this.userData?.roleKey === 'role_one' ? 1 : 2;
        },
        showCheck() {
            return this.$route.query.showCheck;
        }
    },
    created() {
        this.init();
    },
    methods: {
        reRender() {
            const { id, kpiKey, twType, userId } = this.$route.query;
            this.param.id = id;
            this.param.kpiKey = kpiKey;
            this.param.userId = this.isSelf ? this.userInfo.id :  userId;
            this.$set(this.param, 'twType', 'result_check');
         
            if( this.showTab ){
                this.initTabs();
            }
            this.getUserInfo();
            this.getKpiInfo();
            this.getKpiClass();
            this.etKpiClassResult();
        },
        async init() {
            const { id, kpiKey, twType, userId } = this.$route.query;
            this.param.id = id;
            this.param.kpiKey = kpiKey;
            this.param.userId = this.isSelf ? this.userInfo.id :  userId;
            this.$set(this.param, 'twType', twType);
         
            if( this.showTab ){
                await this.initTabs();
            }
            this.getUserInfo();
            this.getKpiInfo();
            this.getKpiClass();
            this.etKpiClassResult();
        },
        goBack() {
            this.$router.back();
        },
        // 获取人员信息最终结果
        async etKpiClassResult(){
            try {
                const pageSource = this.$route.query.type;
                // 只有我的绩效详情  绩效调整 和 绩效校准请求
                if (['admin'].includes(pageSource) || ['myself'].includes(pageSource) && this.detailPage) {
                    const userId = this.isSelf ? this.userInfo.id : this.userId;
                    const kpiKey = this.$route.query.kpiKey;
                    const { success, root } = await _getKpiClassResult({
                        kpiKey,
                        userId,
                        pageSource: pageSource === 'admin' ? 'leader' : 'self'
                    });
                    if ( success && root ) {
                        this.detailResult = root.calss || '';
                    }
                }
               
            } catch (e) {
                console.error(e);
            }
        },
        
        // 初始化tab
        async initTabs() {
            const twType = this.originTwType;
            let labs = [ ...EVALUATION_TABS ];
            const { id, userId, kpiKey } = this.$route.query;
            if ( twType === 'SELF' && this.detailPage ) {
                labs.push({ value: 'LEADER', label: '直接上级评价' });
            }
            if ( twType === 'LEADER' ) {
                labs.unshift({ value: 'LEADER', label: '直接上级评价' });
                labs.push({ value: 'LEADER_PRO', label: '专业上级评价' });
            } else if ( twType === 'LEADER_PRO' ) {
                labs = [
                    { value: 'LEADER_PRO', label: '专业上级评价' },
                    { value: 'SELF', label: '本人自评' }
                ];
            }
            try {
                let params = {
                    userId: this.isSelf ? this.userInfo.id : userId,
                    twType: twType,
                    kpiKey: kpiKey
                };
                const queryUrl = this.detailPage ? _getDetailListTab : _getTwTypes;
                const { success, root } = await queryUrl({
                    ...params
                });
                
                if (success && root) {
                    this.EVALUATION_TABS = labs.filter(lab => {
                        return root.includes(lab.value);
                    });
                    if (this.isAdmin && this.EVALUATION_TABS && this.EVALUATION_TABS[0]) {
                        this.param.twType = this.EVALUATION_TABS[0].value;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 选择tab  切换的时候 scroll 到顶部
        selectTab() {
            if (this.$refs.container && this.lastTabType) {  // 缓存滚动的高度
                this.scrollCache[this.lastTabType] = this.$refs.container.scrollTop;
            }
            this.getKpiInfo();

            this.$nextTick(() => {                           // 设置滚动的高度 渲染完设置不然scrollTop可能无法到正常高度
                if (this.scrollCache[this.param.twType]) {      
                    this.$refs.container.scrollTop = this.scrollCache[this.param.twType];
                } else {
                    this.$refs.container.scrollTop = 0;
                } 
            });
        },
        // 获取人员信息
        async getUserInfo(){
            try {
                const { kpiKey, userId, twType } = this.param;
                const { success, root } = await _getUserBaseInfo({
                    kpiKey,
                    userId,
                    twType: this.isAdmin ? 'LEADER' : twType
                });
                if ( success && root ) {
                    this.userData = {...root, userId: this.$route.query.userId};
                }
            } catch (e) {
                console.error(e);
            }
        },
        // 获取绩效下拉list
        async getKpiClass(){
            try {
                const { kpiKey } = this.param;
                const { success, root } = await _listKpiClass({
                    kpiKey
                });
                if ( success && root ) {
                    this.kpiClassList = root;
                }
            } catch (e) {
                console.error(e);
            }
        },
        // 获取kpi信息
        async getKpiInfo() {
            try {
                this.$store.commit('updateLoading', true);
                let result = this.detailCache[this.param.twType];
                if (result) {       // 有缓存的不请求接口
                    this.kpiList = result.scoreCommentDetailInfo;
                    this.scoreCommentList = result.noScoreCommentDetailInfo;
                    this.calculation();
                } else {
                    const { success, root } = await getKpiInfo( this.param );
                    
                    if (success && root) {
                        this.schemeName = root.schemeName;
                        this.kpiList = root.scoreCommentDetailInfo;
                        this.kpiResult.calss = root.calss || '';
                        if (!root.noScoreCommentDetailInfo || !root.noScoreCommentDetailInfo.length) {
                            const copyArr = JSON.parse(JSON.stringify(INIT_FILL_LIST));
                            const fillList = this.param.twType === 'SELF' ? copyArr : copyArr.slice(1);
                            root.noScoreCommentDetailInfo = fillList.map(item => {
                                item.twType = this.param.twType;
                                return item;
                            });
                        }
                        this.scoreCommentList = root.noScoreCommentDetailInfo;
                        this.detailCache[this.param.twType] = root;
                        this.calculation();
                    }
                }
                this.lastTabType = this.param.twType;
            } catch (e) {
                console.error(e);
            } finally {
                this.pageInit = true;
                this.$store.commit('updateLoading', false);
            }
        },
        // 浏览器拦截
        changeVal() {
            this.setEditing(1);
        },
        // 根据类型计算绩效的结果  -- 只有直接领导才参与计算
        async calculation() {
            if( !(this.isDirectLeader || this.isAdmin) ) return; // 直接领导和管理员才参与计算
            if (!this.kpiList) return;
            const calculateKpiFormList = this.kpiList.flat().filter(item => !isNull(item.itemScore)).map(item => {
                return {
                    itemScore: item.itemScore,
                    id: item.id
                };
            });
            if( calculateKpiFormList.length === this.kpiList.flat().length ) {
                const { userId, kpiKey } = this.param;
                const { success, root } = await _calculation({
                    calculateKpiFormList: calculateKpiFormList,
                    userId,
                    kpiKey
                });
                this.KPI = root;
            } else {
                this.KPI = { // kpi考核结果
                    bigItemResultList: [],
                    kpiScore: '',
                    calss: ''
                };
            }
        },
        // 提交api
        async checkKPI() {
            try {
                if (this.isLoading === true) {
                    return;
                }
                this.isLoading = true;
                let success = true;
                const postScoreData = [];
                const postNoScoreData = [];
                const limit = 5000;  // 字数限制
                this.kpiList.forEach(list => {
                    list.forEach(item => {
                        item.commenStatus = !isNull(item.itemScore) ? 0 : 1;
   
                        const { id, itemScore, twType, commenId, commen } = item;
                        postScoreData.push({
                            id, itemScore, twType, commenId, commen
                        });
                        if( success && item.commenStatus > 0 ){
                            success = false;
                        }
                    });
                });
                if (this.scoreCommentList) {
                    this.scoreCommentList.forEach(item => {
                        item.commenStatus = 0;
                        if (item.type === 'workSummary' && !item.comment) {
                            item.commenStatus = 1;
                        }
                        const { commentId, comment, twType, type } = item;
                        postNoScoreData.push({
                            commentId, comment, twType, type
                        });
                        if( success && item.commenStatus > 0 ){
                            success = false;
                        }
                    });
                }
                
                // if( !success ) {
                //     scrollToFormError();
                //     return;
                // };
                if (this.evaluationType === 2 && this.param.twType === 'LEADER' && isNull(this.kpiResult.calss)) {
                    success = false;
                }   
                let params = {
                    scoreCommentDetailInfo: postScoreData
                };
                if (this.scoreCommentList) {
                    params.noScoreCommentDetailInfo = postNoScoreData;
                }
                if (this.kpiResult.calss) {
                    params.calss = this.kpiResult.calss;
                }
                const res = this.isAdmin ? await editKpiInfoAdmin(params, success) : await editKpiInfo(params, success);
                if (res.success) {
                    this.$toast({ content: '提交成功', type: 'success' });
                    this.setEditing(0);
                    this.$router.back();
                }
            } catch (error) {
                console.log('error');
            } finally {
                this.isLoading = false;
            }
        }
    }

};

</script>


