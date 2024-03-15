<template>
<!-- 此页面为绩效评价页面 -->
<div class="page-content page-evaluation-fill">
    <!-- 绩效 head -->
    <evaluation-header></evaluation-header>

    <div v-if="isLeaderRole && EVALUATION_TABS.length" class="evaluation-tabs">
        <ui-tab v-model="param.twType" 
            @tab-click="selectTab"
        >
            <ui-tab-pane v-for="tab in EVALUATION_TABS"
                :key="tab.value" :label="tab.label" :name="tab.value"
            ></ui-tab-pane>
        </ui-tab>
    </div>
    <div v-else class="block-title">{{ evaluationTypeName }}</div>

    <!-- 绩效 content -->
    <div ref="container" class="block-evaluation-content">
        <div class="block-evaluation-content-viewer">
            <template v-if="kpiList && kpiList.length">
                <!-- 月度绩效 只有上级才有 -->
                <month-performance v-if="isDirectLeaderType && !isAdmin" :user-id="userId" :kpi-key="kpiKey"></month-performance>
                <evaluation-list v-for="(arr,idx) in kpiList" 
                    :key="idx" :label="arr[0].bigItem"
                >
                    <evaluation-item v-for="item in arr" 
                        :key="item.itemId" :data="item" :allow-edit="!readonly"
                        @change-score="calculation()" @change-val="changeVal()"
                    ></evaluation-item>
                    <template v-if="scoreCommentList && arr[0].bigItem === '关键业绩'">
                        <evaluation-no-score-item v-for="item in scoreCommentList" 
                            :key="item.itemId" :data="item" :allow-edit="!readonly"
                            @change-val="changeVal()"
                        ></evaluation-no-score-item>
                    </template>
                        
                    <!-- 绩效等级 只有上级才有 -->
                    <div v-if="isDirectLeaderType" class="evaluation-list-result">
                        【{{ arr[0].bigItem }}】等级： 
                        <span>{{ arr[0].bigItem === '价值观' ? KPI.Value.describe : KPI.KeyPerformance.describe }}</span>
                    </div>
                </evaluation-list>
            </template>

            <!-- 绩效等级 只有上级标签才有 -->
            <evaluation-list v-if="isDirectLeaderType" label="绩效等级">
                <div v-show="KPI.result" class="kpi-result">{{ KPI.result }} Class</div>
            </evaluation-list>
        </div>
        <div class="block-evaluation-content-desc">
            <div class="block-evaluation-content-tip">
                <dl>
                    <dt>注：</dt>
                    <dd>1、{{ kpiDateInfo.nodeName }}：{{ getDateRangeStr(originTwType, 'M月D日') }}</dd>
                    <dd>2、提交后，{{ getDateStr([originTwType, 'endDateStr']) }}前均可修改</dd>
                </dl>
            </div>
        </div>
    </div>

    <!-- 绩效 foot -->
    <div v-if="!readonly" class="block-evaluation-footer">
        <button class="btn btn-primary" :disabled="isLoading" @click="checkKPI">保存</button>
    </div>
</div>
</template>

<script>
import { 
    getKpiInfo, getDeptInfo, editKpiInfo, editKpiInfoAdmin, _calculation, _calculationClass, _getTwTypes
} from '@/services/dashboard/performance';

import EvaluationHeader from './components/evaluation-header';
import EvaluationList   from './components/evaluation-list';
import EvaluationItem   from './components/evaluation-item';
import EvaluationNoScoreItem   from './components/evaluation-no-score-item'; 
import MonthPerformance from './components/month-performance';

import DateMixin from '@/package/performance/utils/kpi-date.mixin';
import { scrollToFormError } from '@/utils/util.js';
import browerCtrl from '@/mixins/brower-ctrl';


const EVALUATION_TYPES = {
    'SELF': '本人自评',
    'SUBORDINATE': '下级评价',
    'COOPERATE': '协作方评价',
    'COOPERATE2': '协作方评价'
};

const EVALUATION_TABS = [
    { value: 'SELF', label: '本人自评' },
    { value: 'COOPERATE', label: '协作方评价' },
    { value: 'COOPERATE2', label: '协作方二评价' },
    { value: 'SUBORDINATE', label: '下级评价' }
];

export default {
    name: 'EvaluationFill',
    mixins: [ DateMixin, browerCtrl ],
    components: {
        EvaluationHeader,EvaluationList, 
        EvaluationItem, MonthPerformance,
        EvaluationNoScoreItem
    },
    data() {
        return {
            kpiList: [], // kpi信息
            EVALUATION_TABS: [], // tab
            param: {}, // 参数
            KPI: { // kpi考核结果
                result: '',
                Value: {},
                KeyPerformance: {}
            },
            evaluationDate: {
                start: '',
                end: ''
            },
            detailCache: {      // 用于做切换tab缓存数据

            },
            lastTabType: '',
            scrollCache: {      // 切换标签记录scrollTop

            },
            scoreCommentList: null,
            isLoading: false,       // 提交中
            notForbid: false                   // 后退浏览器拦截使用
        };
    },
    computed: {
        evaluationTypeName() {
            const twType = this.$route.query.twType;
            return EVALUATION_TYPES[twType] || '';
        },
        originTwType() {
            return this.$route.query.twType;
        },
        isLeaderRole() {// 是否是上线 / 上级产品线
            return ['LEADER', 'LEADER_PRO'].includes( this.originTwType );
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
            return readonly || (twType !== this.param.twType && !this.isAdmin);
        },
        kpiDateInfo() {
            return this.kpiNodeDateMap[ this.originTwType ] || {};
        },
        userId() {
            return this.$route.query.userId;
        },
        kpiKey() {
            return this.$route.query.kpiKey;
        },
        isAdmin() {
            return this.$route.query.type === 'admin';
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const { id, kpiKey, twType, userId } = this.$route.query;
            this.param.id = id;
            this.param.kpiKey = kpiKey;
            this.param.userId = userId;
            this.$set(this.param, 'twType', twType);
            if( this.isLeaderRole ){
                this.initTabs();
            }
            if( this.isSelf ) {
                this.getDeptInfo();
            }else {
                this.getKpiInfo();
            }
        },
        // 初始化tab
        async initTabs() {
            const twType = this.originTwType;
            let labs = [ ...EVALUATION_TABS ];
            const { id, userId } = this.$route.query;
            if ( twType === 'LEADER' ) {
                labs.unshift({ value: 'LEADER', label: '上级评价' });
                labs.push({ value: 'LEADER_PRO', label: '专业上级评价' });
            } else if ( twType === 'LEADER_PRO' ) {
                labs = [
                    { value: 'LEADER_PRO', label: '专业上级评价' },
                    { value: 'SELF', label: '本人自评' }
                ];
            }
            
            try {
                const { success, root } = await _getTwTypes({
                    kpiId: id,
                    userId
                });
                if (success && root) {
                    this.EVALUATION_TABS = labs.filter(lab => {
                        return root.includes(lab.value);
                    });
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
        // 获取部门信息
        async getDeptInfo(){
            try {
                const { success, root } = await getDeptInfo();
                if ( success && root ) {
                    this.param.userId = root.currentUserId;
                    this.getKpiInfo();
                }
            } catch (e) {
                console.error(e);
            }
        },
        // 获取kpi信息
        async getKpiInfo() {
            try {
                let result = this.detailCache[this.param.twType];
                if (result) {       // 有缓存的不请求接口
                    this.kpiList = result.scoreCommentDetailInfo;
                    this.scoreCommentList = result.noScoreCommentDetailInfo;
                    if( this.isDirectLeaderType ){ // 计算绩效
                        this.calculation();
                    }
                } else {
                    const { success, root } = await getKpiInfo( this.param, this.isAdmin );

                    if (success && root) {
                        this.kpiList = root.scoreCommentDetailInfo;
                        if (root.noScoreCommentDetailInfo && !root.noScoreCommentDetailInfo.length) {
                            root.noScoreCommentDetailInfo = [{
                                commentId: '',
                                type: 'ThinkingAndPerception',
                                item: '今年的思考与感悟',
                                comment: '',
                                twType: this.param.twType
                            }];
                        }
                        this.scoreCommentList = root.noScoreCommentDetailInfo;
                        this.detailCache[this.param.twType] = root;
                        if( this.isDirectLeaderType ){ // 计算绩效
                            this.calculation();
                        }
                    }
                }
                this.lastTabType = this.param.twType;
            } catch (e) {
                console.error(e);
            }
        },
        // 浏览器拦截
        changeVal() {
            this.setEditing(1);
        },
        // 根据类型计算绩效的结果  -- 只有直接领导才参与计算
        async calculation() {
            if( !this.isDirectLeaderType ) return; // 只有直接领导才参与计算
            const [ valueList, keyPerformanceList ] = this.kpiList;
            const valueScoreArr = valueList.filter(item => item.itemScore).map(item => item.itemScore);
            const keyPerformanceScoreArr = keyPerformanceList.filter(item => item.itemScore).map(item => item.itemScore);
            if( valueScoreArr.length === valueList.length ) {
                const { success, root } = await _calculation({
                    type: 'Value',
                    valueList: valueScoreArr,
                    userId: this.param.userId
                });
                this.KPI.Value = root;
            } 
            if( keyPerformanceScoreArr.length === keyPerformanceList.length ) {
                const { success, root } = await _calculation({
                    type: 'KeyPerformance',
                    valueList: keyPerformanceScoreArr,
                    userId: this.param.userId
                });
                this.KPI.KeyPerformance = root;
            } 
            // 以下校验是不是计算整体的评级

            if( this.KPI.Value.value && this.KPI.KeyPerformance.value){
                this.calculationClass();
            }
        },
        // 根据价值观和关键业绩值计算绩效结果 
        async calculationClass() {
            const value = this.KPI.Value.value;
            const keyPerformance = this.KPI.KeyPerformance.value;
            const { success, root } = await _calculationClass({ value, keyPerformance });
            if( success && root ){
                this.KPI.result = root;
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
                const limit = 2000;  // 字数限制
                this.kpiList.forEach(list => {
                    list.forEach(item => {
                        item.scoreStatus = item.itemScore ? 0 : 1;
                        item.commenStatus = (!item.commen || (item.commen.length <= limit)) ? 0 : 1;
            
                        
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
                        item.commenStatus = (!item.comment || (item.comment.length <= limit)) ? 0 : 1;
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
                
                let params = {
                    scoreCommentDetailInfo: postScoreData
                };
                if (this.scoreCommentList) {
                    params.noScoreCommentDetailInfo = postNoScoreData;
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


