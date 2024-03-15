<template>
<div class="kpi-list-tab-wrapper">
    <ui-tab v-if="tabList.length" v-model="tabCode" show-bar @tab-click="handleSelect">
        <ui-tab-pane v-for="tab in tabList" :key="tab.kpiKey"
            :label="tab.name" :name="tab.kpiKey"
        >
            <div slot="label" class="tab-text-wrapper">{{ tab.name }}</div>
        </ui-tab-pane>
    </ui-tab>
    <!-- <span v-if="timeRange" class="kpi-time-range">起止时间：{{ timeRange }} </span> -->
</div>
</template>

<script>
import { _getSchemeByTwType } from '@/services/dashboard/performance';
import kipDate from '@/package/performance/utils/kpi-date.mixin.js';
export default {
    name: 'KpiListTab',
    mixins: [kipDate],
    props: {
        nodeKey: {
            type: [String, Number],
            required: true
        }
    },
    data () {
        return {
            tabList: [],
            tabCode: ''
        };
    },
    computed: {
        timeRange() {
            return this.getTimeRange();
        }  
    },
    created () {
        this.getSchemeByTwType();
    },
    methods: {
        handleSelect() {
            this.$router.replace({
                path:this.$route.path,
                query: {
                    kpiKey: this.tabCode
                }
            });
            this.$emit('tab-change', this.tabCode);
            this.$emit('time-change', this.getTimeRange());
        },
        getTimeRange() {
            const active = this.tabList.find(item => item.kpiKey === this.tabCode);
            if (!active) {
                return '';
            }
            return ['startDate', 'endDate'].map(key => this.$dayjs(active[key]).format('MM.DD')).join(' - ');
        },
        // 通过阶段任务获取方案列表
        async getSchemeByTwType() {
            try {
                const { success, root } = await _getSchemeByTwType({
                    nodeKey: this.nodeKey
                });
                if (success && root) {
                    this.tabList = root || [];
                    if(this.$route.query.kpiKey) {
                        const item =  this.tabList.find(t => t.kpiKey === this.$route.query.kpiKey);
                        
                        if(item) {
                            this.tabCode = this.$route.query.kpiKey;
                            this.$emit('tab-init', this.tabCode, this.getTimeRange());
                            this.$emit('time-change', this.getTimeRange());
                            return;
                        }
                    }
                    this.tabCode = this.tabList[0] ? this.tabList[0].kpiKey : '';
                    this.$emit('tab-init', this.tabCode, this.getTimeRange());
                    this.$emit('time-change', this.getTimeRange());
                }
            } catch (error) {
                // console.log(error);
            }
        }
    }
};
</script>