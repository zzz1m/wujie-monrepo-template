<template>
<div v-if="showKpi" class="block-evaluation-list">
    <div class="block-evaluation-list-label">2021月度绩效</div>
    <div class="block-evaluation-list-content performance-table-warp">
        <ui-table border>
            <tbody slot="body">
                <tr>
                    <td v-for="item in performanceList" :key="item.title">{{ item.title }}</td>
                </tr>
                <tr>
                    <td v-for="item in performanceList" :key="item.title">{{ item.value }}</td>
                </tr>
            </tbody>
        </ui-table>
    </div>
</div>
</template>
<script>
import { _getMonthKpi, _getMonthKpiSort } from '@/services/dashboard/performance';
const MONTH_MAP = {
    january: '一月',
    february: '二月',
    march: '三月',
    april: '四月',
    may: '五月',
    june: '六月',
    july: '七月',
    august: '八月',
    september: '九月',
    october: '十月',
    november: '十一月',
    december: '十二月'
};
export default {
    props: {
        kpiKey: String,
        userId: String
    },
    data() {
        return {
            monthKpiObj: {},
            showKpi: false,
            sortArr: []
        };
    },
    created() {
        this.getInitData();
        this.getMonthKpiSort();
    },
    computed: {
        performanceList() {
            console.log('this.sortArr', this.sortArr);
            return this.sortArr.map(item => {
                return {
                    title: MONTH_MAP[item],
                    value: this.monthKpiObj[item] || ''
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
                this.showKpi = true;
            }
        },
        async getMonthKpiSort() {
            const { success, root } = await _getMonthKpiSort();
            if (success && root ) {
                this.sortArr = root;
            }
        }
    }
};
</script>