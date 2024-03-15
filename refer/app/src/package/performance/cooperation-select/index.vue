<template>
<div class="page-content flex-list-page cooperation-select-page kpi-page">
    <div v-if="tabList.length" class="jixiao-bg-content">
        <div class="content-inner">
            <TabSelect v-show="tabList.length" :tabs="tabList" :active.sync="tabCode" @change="onSearch"></TabSelect>
            <div class="title-area">
                <div>
                    <div class="page-title no-preline" style="display:flex;align-items:center;padding-bottom:8px;margin-top:0px">
                        <PageTitle>协作方提报</PageTitle>
                        <TimeRange v-show="dateStr">{{ dateStr }}</TimeRange>
                    </div>
                    <p class="page-new-info">请每人最多提报三名协作方。协作方需实际在岗工作满3个月，且与被评价人的工作协作较多，首选跨组的上下游，其次跨组非上下游的合作人，最后同组协作方。</p>
                </div>
            </div>
            <div v-if="!hiddenOperation && !isOverdue" class="input-select-area">
                <ui-suggest
                    v-model.trim="searchEmail"
                    :list="dataList"
                    class="list"
                    placeholder="请输入姓名或企业邮箱"
                    @on-query="kpiUser"
                    @on-select="handleSelect"
                >
                    <template #item="{ item }">
                        <div v-html="item.label"></div>
                    </template>
                </ui-suggest>
            
                <button type="button" class="btn btn-primary margin-left-10" @click="onSelect">确认</button>
            </div>
            <div class="main-area">
                <div v-if="isInit">
                    <ui-pagetip type="loading">
                        <p slot="text" class="gray">加载中...</p>
                    </ui-pagetip>
                </div>
                <div v-else-if="!chooseList.length" class="row-nodata">
                    <ui-pagetip type="nodata">
                        <p slot="text" class="gray">暂无协作方</p>
                    </ui-pagetip>
                </div>
                <div v-else class="user-list-wrap">
                    <div class="user-list">
                        <div v-for="(item, index) in chooseList" :key="item.userId" class="user-card">
                            <div class="deptName" :title="item.deptName">{{ item.deptName }}</div>
                            <div class="userName" :title="item.userName">{{ item.userName }}</div>
                            <div class="email" :title="item.email">{{ item.email }}</div>
                            <div v-if="!hiddenOperation && !isOverdue" class="close-btn" @click="del(index)">
                                <i class="ui-icon-close"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="chooseList.length && !hiddenOperation && !isOverdue && hasChanged" class="submit-footer">
                    <button type="button" class="btn btn-primary" @click="confirm">提交</button>
                </div>
            </div>
        </div>
    </div>
    <ui-pagetip v-else type="nodata" style="background: transparent">
        <p slot="text" class="gray">考核阶段未开始</p>
    </ui-pagetip>
</div>
</template>

<script>
import { newkpiUser, saveTwUser, getTwUser, getKpiTw, _getKpiInfoList } from '@/services/dashboard/performance';

import kipDate from '../utils/kpi-date.mixin.js';
import TimeRange from '../components/time-range.vue';
import PageTitle from '../components/page-title.vue';
import TabSelect from '../components/tab-select.vue';
import { _getSchemeByTwType } from '@/services/dashboard/performance';
import { _getValue } from '@/utils/util.js';

export default {
    components: {
        TimeRange,
        PageTitle,
        TabSelect
    },
    mixins: [kipDate ],
    data() {
        return {
            searchEmail: '',
            curUser: {},
            dataList: [],
            dataListT: [],
            chooseList: [],
            timer: null,
            hiddenOperation: false,
            tabCode: 0,
            tabList: [],
            isInit: true,
            oldIdList: []
        };
    },
    computed: {
        dateStr() {
            return this.getDateRangeStr('CHOOSE_COOPERATE', 'MM.DD', '-');
        },
        curSchema() {
            return this.tabList.find(t => t.kpiKey === this.tabCode);
        },
        isOverdue() {
            return this.curSchema?.isOverdue;
        },
        chooseListIds() {
            return this.chooseList?.map(t => t.userId);
        },
        hasChanged() {
            if(!this.oldIdList.length) return true;
            if(this.chooseList.find(t => !this.oldIdList.includes(t.userId))) return true;
            if(this.oldIdList.length !== this.chooseList.length) return true;
            return false;
        }
    },
    async created() {
        await this.getSchemeByTwType();
        if(!this.tabList?.length) return;
        this.getTwUser();
    },
    methods: {
        async confirm() {
            if (this.chooseList.length > 3) {
                this.$toast({ content: '最多选择3个协作方', type: 'warning' });
                return;
            }

            if (this.chooseList.length == 0) {
                this.$toast({ content: '请选择协作方员', type: 'warning' });
                return;
            }


            this.$dialog({
                // title: '协作方提交确认',
                // content: '上级确认后不可修改，请确认后提交。',
                content: '',
                title: '协作方提交确认',
                wrapClass: 'dialog-primary-default',
                onConfirm: async () => {
                    try {
                        const res = await saveTwUser({
                            commentUserIds: this.chooseList.map(n => n.userId),
                            kpiKey: this.tabCode
                        });
                        if (res.success) {
                            this.$toast({ content: '操作成功', type: 'success' });
                            this.oldIdList = this.chooseList.map(t => t.userId);
                        }
                    } catch (error) {
                        // console.log(error);
                    }
                }
            });
        },
        // 通过阶段任务获取方案列表
        async getSchemeByTwType() {
            try {
                const { success, root } = await _getSchemeByTwType({
                    nodeKey: 1
                });
                if (success && root) {
                    this.tabList = (root || []).map(v => ({
                        ...v,
                        value: v.kpiKey,
                        startDate: this.$dayjs(v.startDate).format('YYYY-MM-DD'),
                        endDate: this.$dayjs(v.endDate).format('YYYY-MM-DD'),
                        isOverdue: v.nowDate > v.endDate
                    }));
                    this.tabCode = this.tabList[0] ? this.tabList[0].kpiKey : '';
                }
            } catch (error) {
                // console.log(error);
            }
        },
        onSelect(){
            const value = this.curUser;
            if (!this.searchEmail || !value.userId) return;
            let isRepeat = this.chooseList.some(item => item.userId === value.userId);
            if (isRepeat) {
                this.$toast({ content: '不得选择重复人员', type: 'warning' });
                return;
            };
            if (this.chooseList.length >= 3) {
                this.$toast({ content: '最多选择3个协作方', type: 'warning' });
                return;
            }
            this.chooseList.push(value);
            this.curUser = {};
            this.searchEmail = '';
        },
        handleSelect(value) {
            this.curUser = value || {};
            this.searchEmail = value.label;
        },
        onSearch(e) {
            this.getTwUser();
        },
        del(index) {
            this.$dialog({
                title: '提示',
                type: 'warning',
                content: '确定删除该协作方?',
                onConfirm: () => {
                    this.chooseList.splice(index, 1);
                }
            });
            
        },
        async getTwUser() {
            try {
                const res = await getTwUser({
                    kpiKey: this.tabCode
                });
                if (res.success) {
                    this.chooseList = _getValue(res, 'root.data', []) || [];
                    if (this.chooseList) {
                        this.chooseList.forEach(n => {
                            n.userName = n.commentUserName;
                            n.userId = n.commentUserId;
                        });
                        this.oldIdList = this.chooseList.map(t => t.userId);
                        this.hiddenOperation =  _getValue(res, 'root.choose', false);
                    }
                }
            } catch (error) {
                
            } finally {
                this.isInit = false;
            }
            
        },
        // async getTwUser() {
        //     const res = await getKpiTw();
        //     if (res.success) {
        //         this.chooseList = _getValue(res, 'root.data', []) || [];
        //         if (this.chooseList) {
        //             this.chooseList.forEach(n => {
        //                 n.userName = n.userName;
        //                 n.userId = n.userId;
        //             });
        //             this.hiddenOperation = _getValue(res, 'root.isChoose', false);
        //         }
        //     }

        // },
        async kpiUser() {
            clearTimeout(this.timer);
            this.timer = setTimeout(async () => {
                if (!this.searchEmail) return;
                const res = await newkpiUser({ keyWork: this.searchEmail });
                if (res.success) {
                    this.dataListT = res.root || [];
                    this.dataList = this.dataListT.map(n => {
                        return { label: n.userName + `(${n.email})`, value: n.userId, ...n };
                    });
                }
            }, 300);
        }
    }
};
</script>