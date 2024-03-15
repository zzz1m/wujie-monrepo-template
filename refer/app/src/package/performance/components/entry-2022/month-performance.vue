<template>
<div v-if="sortArr.length" class="month-performance">
    <h4 class="month-performance-label">月度绩效：</h4>
    <div class="month-performance-content">
        <div v-for="item in performanceList" :key="item.title">
            <div class="month-performance-title">{{ item.title }}</div>
            <div class="month-performance-value" :class="(item.value < 60) && 'flunk'">{{ item.value }}</div>
        </div>
    </div>
</div>
</template>
<script>
import { _getMonthKpi, _getMonthKpiSort } from '@/services/dashboard/performance';
import { isNull } from '@/utils/util';
const MONTH_MAP = {
    january: '1月',
    february: '2月',
    march: '3月',
    april: '4月',
    may: '5月',
    june: '6月',
    july: '7月',
    august: '8月',
    september: '9月',
    october: '10月',
    november: '11月',
    december: '12月'
};
export default {
    props: {
        kpiKey: String,
        userId: String
    },
    data() {
        return {
            monthKpiObj: {},
            sortArr: []
        };
    },
    created() {
        this.getInitData();
        this.getMonthKpiSort();
    },
    computed: {
        performanceList() {
            return this.sortArr.map(item => {
                return {
                    title: MONTH_MAP[item],
                    value: isNull(this.monthKpiObj[item]) ? '-' : this.monthKpiObj[item]
                };
            });
        }
    },
    methods: {
        async getInitData() {
            const { success, root } = await _getMonthKpi({
                userId: this.userId,
                kpiKey: this.kpiKey
            });
            if (success && root ) {
                this.monthKpiObj = root;
            }
        },
        async getMonthKpiSort() {
            const { success, root } = await _getMonthKpiSort({
                userId: this.userId
            });
            if (success && root ) {
                this.sortArr = root;
            }
        }
    }
};
</script>