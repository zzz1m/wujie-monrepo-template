<template>
<div class="page-content flex-list-page evalutation-home-page kpi-page">
    <div v-if="inited" class="dashboard-content">
        <!-- 进行中的绩效考核 -->
        <div class="kpi-plan-progress" :class="{ 'bg-white': !tabList.length }">
            <template v-if="tabList.length">
                <!-- 方案名称，点击后打开新页面，展示对应考核方案的附件 -->
                <div class="plan-tab">
                    <div class="schema-tab-list-wrap">
                        <div class="schema-tab-list">
                            <div v-for="(item, index) in tabList" :key="item.kpiKey + index" class="tab-item" :class="{ active: item.kpiKey===tabCode }">
                                <span class="plan-name" @click="changePlanItem(item)">{{ handleName(item.name) }}</span>
                                <div v-if="item.attachmentPath" class="plan-detail-link" @click="gotoFile(item.attachmentPath || '')">
                                    <svg-icon icon-class="preview-file"></svg-icon>
                                    <span>考核方案</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 点击左右↔️，切换绩效考核方案/某人同时参与总部和商业 -->
                <div class="progress-wrap">
                    <ui-pagetip v-if="loading" class="small" type="loading">
                    </ui-pagetip>
                    <template v-else-if="progress.length">
                        <div v-for="item in progress" :key="item.id" :class="{active: item.state === 2}" class="node">
                            <div class="node-point"></div>
                            <div class="node-name">{{ item.nodeName }}</div>
                            <div class="node-time">{{ getDateStr(item) }}</div>
                        </div>
                    </template>
                    <ui-pagetip v-else class="small" type="nodata">
                        <svg-icon slot="icon" style=" width: 100px; height: 100px;" icon-class="config-empty"></svg-icon>
                        <p slot="text" class="gray">暂无</p>
                    </ui-pagetip>
                </div>
                <img class="deco-bg" src="@/assets/images/performance/big-abc-bg.png" alt="">
            </template>
            <ui-pagetip v-else class="small" type="nodata">
                <svg-icon slot="icon" style=" width: 100px; height: 100px;" icon-class="config-empty"></svg-icon>
                <p slot="text" class="gray">暂无进行中的绩效考核</p>
            </ui-pagetip>
        </div>

        <div class="result-task-wrap">
            <div class="task-list-wrap">
                <ui-pagetip v-if="loading" class="small" type="loading" style="min-height: 530px;">
                </ui-pagetip>
                <template v-else-if="assessmentPeriod">
                    <div class="task-options">
                        <span class="title">我的事项</span>
                        <div class="state-list-tab">
                            <div v-for="(item, index) in stateList" :key="item.state" :class="{ active: index === activeStateIndex}" class="state-item" @click="changeState(index)">
                                {{ item.name }}
                            </div>
                            <div class="bg" :style="`transform: translateX(${ activeStateIndex * 69}px)`"></div>
                        </div>
                    </div>
                    <div class="task-list">
                        <ui-pagetip v-if="detailLoading" type="loading">
                            <p class="gray">加载中...</p>
                        </ui-pagetip>
                        <template v-else-if="detailList.length">
                            <div v-for="(item, index) in detailList" :key="item.nodeKey + '-'+ index" class="task-item">
                                <div class="task-item-content" :class="`task-${item.nodeKey}`">
                                    <svg-icon :icon-class="`task-${item.nodeKey}`"></svg-icon>
                                    <div class="task-info">
                                        <div class="task-title">
                                            {{ item.taskName }} 
                                            <template v-if="item.showCount">({{ `${item.finishCount}/${item.total}` }})</template>
                                        </div>
                                        <div class="sub-info">截止时间：{{ formatDate(item.endDate) }}</div>
                                    </div>
                                </div>
                                <button v-if="getBtnText(item)" class="btn btn-primary btn-outline" @click="onLink(item)">{{ getBtnText(item) }}</button>
                            </div>
                        </template>
                        <ui-pagetip v-else type="nodata">
                            <svg-icon slot="icon" style=" width: 140px; height: 140px;" icon-class="config-empty"></svg-icon>
                            <p slot="text" class="gray">暂无事项</p>
                        </ui-pagetip>
                    </div>
                </template>
                <ui-pagetip v-else type="nodata" style="min-height: 530px;">
                    <svg-icon slot="icon" style=" width: 140px; height: 140px;" icon-class="config-empty"></svg-icon>
                    <p slot="text" class="gray">暂无事项</p>
                </ui-pagetip>
            </div>
            <div class="result-wrap">
                <div class="result my" :class="[resultImgs[score], showMyResult && score && 'hasResult']">
                    <img v-show="showMyResult && score" class="avatar" :src="headImg" alt="">
                    <div v-show="showMyResult" class="info-wrap">
                        <div v-if="score" class="underline gold">
                            <div class="info-text">个人绩效等级为<span class="stress">{{ score }}</span>等级</div>
                        </div>
                        <router-link 
                            v-if="score"
                            class="detail-link"
                            :to="selfViewPage"
                        >
                            立即查看<i class="ui-icon-arrow-right"></i>
                        </router-link>
                    </div>
                    
                    <ui-pagetip v-if="loading" class="small" type="loading">
                    </ui-pagetip>
                    <template v-else-if="!assessmentPeriod || !hasResult || onlyJudgeOthers || !score">
                        <span class="title">我的绩效结果</span>

                        <ui-pagetip type="nodata">
                            <svg-icon slot="icon" style=" width: 100px; height: 100px;" icon-class="config-empty"></svg-icon>
                            <p v-if="onlyJudgeOthers" slot="text" class="gray">{{ onlyJudgeOthers_tips }}</p>
                            <p v-else slot="text" class="gray">暂无绩效结果</p>
                        </ui-pagetip>
                    </template>
                </div>
                <div v-show="hasTeam" class="result team" :class="!loading && priodHasResult && 'hasResult'">
                    <img v-show="!loading && priodHasResult" class="avatar gray" src="@/assets/images/performance/team-avatar.png" alt="">
                    <div v-show="!loading && priodHasResult" class="info-wrap">
                        <div class="underline gray">
                            <div class="info-text">团队绩效</div>
                        </div>
                        <router-link 
                            class="detail-link"
                            :to="resultTeam"
                        >
                            立即查看<i class="ui-icon-arrow-right"></i>
                        </router-link>
                    </div>
                    <ui-pagetip v-if="loading" class="small" type="loading">
                    </ui-pagetip>
                    <template v-else-if="!hasResult || !priodHasResult">
                        <span class="title">我的团队绩效</span>
                        <ui-pagetip type="nodata">
                            <svg-icon slot="icon" style=" width: 100px; height: 100px;" icon-class="config-empty"></svg-icon>
                            <p slot="text" class="gray">暂无团队绩效</p>
                        </ui-pagetip>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <!-- <ui-pagetip v-else-if="showNoData" type="nodata" style="background: transparent">
        <p slot="text" class="gray">暂无进行中的绩效考核</p>
    </ui-pagetip> -->
    <EmptyPage v-else-if="showNoData"></EmptyPage>
    <ui-pagetip v-else type="loading" style="background: transparent">
        <p slot="text" class="gray">加载中...</p>
    </ui-pagetip>
</div>
</template>

<script>
import { _getKpiDateList, _getScheme, _getTaskList, _getResult, _getStateByKpi } from '@/services/dashboard/performance';
import { mapState } from 'vuex';
import EmptyPage from '../components/empty-page.vue';

export default {
    components: {EmptyPage},
    data() {
        return {
            score: '',
            tabCode: '',
            tabList: [],
            activeStateIndex: 0, // 0待完成，1已完成，2超期 
            stateList: Object.freeze([
                { name: '待完成', state: 0 },
                { name: '已完成', state: 1 },
                { name: '已超期', state: 2 }
            ]),
            resultImgs: Object.freeze({
                'A': 'result-a',
                'A-': 'result-am',
                'B+': 'result-bp',
                'B': 'result-b',
                'C+': 'result-cp',
                'C': 'result-c'
            }),
            progress: [],
            detailList: [],
            inited: false,
            showNoData: false,
            loading: false,
            detailLoading: false,
            assessmentPeriod: false, //是否考核期
            hasResult: false, //是否结果已公布
            hasTeam: false, //是否展示团队绩效
            onlyJudgeOthers: false, //当前方案是否只评价别人
            onlyJudgeOthers_tips: '重要提示：您不是此考核方案的被评价人，但是作为上级或者360°评价方，请在截止时间之前完成对其他人的考核评价'
        };
    },
    computed: {
        ...mapState(['userInfo']),
        headImg() {
            return this.userInfo?.headImage || [];
        },
        activeCodeIndex() {
            return  this.tabList.length &&  this.tabList.findIndex(t => t.kpiKey === this.tabCode);
        },
        activeName() {
            return this.tabCode && this.tabList.length && this.tabList.find(t => t.kpiKey === this.tabCode)?.name || '';
        },
        priodHasResult() {
            return this.hasResult && this.assessmentPeriod;
        },
        showMyResult() {
            return this.priodHasResult && !this.onlyJudgeOthers && !this.loading;
        },
        activeSchemaId() {
            const item =  this.tabList.length &&  this.tabList.find(t => t.kpiKey === this.tabCode);
            return item?.kpiId;
        },
        selfViewPage() {
            return `/dashboard/performance/evaluate-view-entry?twType=SELF&kpiKey=${this.tabCode}&type=myself&target=%2Fdashboard%2Fperformance%2Fhome`;
        },
        resultTeam() {
            return `/dashboard/performance/result-team?kpiKey=${this.tabCode}`;
        }
    },
    async created() {
        await this.getScheme();
        this.init();
    },
    methods: {
        gotoFile(file) {
            if (file.indexOf('http') !== -1) {
                window.open(file);
            } else {
                window.open(`/api/common/file/preview.json?ossPath=${file}`);
            }
        },
        onLink(item) {
            // ('协作方提报', '1');     
            // ('下级协作确认', '2');    
            // ('自评', '3');        
            // ('360评价', '4');     
            // ('下级绩效评价', '5');    
            // ('非大组长结果校准', '6');  
            // ('大组长结果校准', '7');   
            // ('结果公布', '8');
            const selfFill = `/dashboard/performance/evaluate-${item.overdue ? 'view' : 'fill'}-entry?twType=SELF&kpiKey=${this.tabCode}&type=myself&target=%2Fdashboard%2Fperformance%2Fhome`;
            const method = {
                '1': `/dashboard/performance/cooperation-select?kpiKey=${this.tabCode}`,
                '2': `/dashboard/performance/cooperation-confirm?kpiKey=${this.tabCode}`,
                '3':  selfFill,
                '4': `/dashboard/performance/evaluate-360?kpiKey=${this.tabCode}`,
                '5': `/dashboard/performance/evaluate-junior?kpiKey=${this.tabCode}`,
                '6': `/dashboard/performance/result-check?kpiKey=${this.tabCode}`,
                '7': `/dashboard/performance/result-check?kpiKey=${this.tabCode}`,
                '8': this.selfViewPage
            };
            
            this.$router.push(method[item.nodeKey]);
        },
        getBtnText(item) {
            // 只能评价他人、结果公布后不可以看
            if(this.onlyJudgeOthers && item.nodeKey === '8') {
                return '';
            }
            if(this.activeStateIndex === 0) {
                return '去完成';
            } else if(this.activeStateIndex === 1) {
                if(item.overdue) {
                    return '去查看';
                } else {
                    return '去更新';
                }
            } else if(this.activeStateIndex === 2) {
                return '去查看';
            }
        },
        formatDate(t) {
            return this.$dayjs(t).format('YYYY-MM-DD HH:mm');
        },
        getDateStr(item) {
            return [item.startDateStr, item.endDateStr].map(t => this.$dayjs(t).format('MM.DD')).join('-');
        },
        // 通过阶段任务获取方案列表
        async getScheme() {
            try {
                const { success, root } = await _getScheme();
                if (success && root) {
                    this.tabList = root || [];
                    this.tabCode = this.tabList[0] ? this.tabList[0].kpiKey : '';
                }
            } catch (error) {}
        },
        changePlan(e) {
            const next = e + this.activeCodeIndex;
            if(next < this.tabList.length) {
                this.tabCode = this.tabList[next].kpiKey;
                this.activeStateIndex = 0;
                this.init();
            }
        },
        changePlanItem(item) {
            this.tabCode = item.kpiKey;
            this.activeStateIndex = 0;
            this.init();
        },
        async init() {
            if(!this.tabList?.length) {
                this.showNoData = true;
                return;
            }
            this.loading = true;
            await Promise.all([
                this.getState(),
                this.getDetail(),
                this.getProgress(),
                this.getResult()
            ]);

            this.inited = true;
            this.loading = false;
        },
        changeState(index) {
            if(this.detailLoading) {
                this.$toast('正在加载中，请稍后重试', 'warning');
                return;
            }
            this.detailLoading = true;

            this.activeStateIndex = index;
            this.getDetail();
        },
        async getDetail() {
            const state = this.stateList[this.activeStateIndex]?.state;
            try {
                const { success, root } = await _getTaskList({
                    kpiKey: this.tabCode,
                    state
                });
                if (success && root) {
                    this.detailList = root;
                }
            } catch (error) {} finally {
                this.detailLoading = false;
            }
        },
        async getProgress() {
            try {
                const { success, root } = await _getKpiDateList({
                    kpiKey: this.tabCode
                });
                if (success && root) {
                    this.progress = root;
                }
            } catch (error) {
                
            }
        },
        async getResult() {
            try {
                const { success, root } = await _getResult({
                    kpiKey: this.tabCode
                });
                if (success && root) {
                    this.score = root;
                }  else {
                    this.score = '';
                }
            } catch (error) {
                this.score = '';
            }
                
        },
        async getState() {
            try {
                const { success, root } = await _getStateByKpi({
                    kpiKey: this.tabCode
                });
                if (success && root) {
                    const { assessmentPeriod, hasResult, hasTeam, onlyJudgeOthers } = root;
                    Object.assign(this, {
                        assessmentPeriod, //是否考核期
                        hasResult, //是否结果已公布
                        hasTeam, //是否展示团队绩效
                        onlyJudgeOthers //当前方案是否只评价别人
                    });
                    
                }  else {
                    
                }
            } catch (error) {
                
            }
        },
        handleName(name) {
            return name.replace('【', '[').replace('】', ']').replace('（', '(').replace('）', ')');

        }
    }
};
</script>