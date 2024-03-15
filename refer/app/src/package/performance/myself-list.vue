<template>
<div class="page-content cooperation-list">
    <div class="page-module-container margin-top-40">
        <h3 class="page-module-title">BZL【2021全年】ABC Class考核</h3>
        <div class="page-module-content performance-explain">
            <div class="explain-item">
                <div class="explain-item-title">考核方案：</div>
                <div class="explain-item-content">
                    <router-link class="announcement" :to="`/dashboard/performance/myself/announcement`">
                        <span>BZL【2021全年】ABC Class考核方案</span>
                    </router-link>
                </div>
            </div>
            <div class="explain-item">
                <div class="explain-item-title">考核范围：</div>
                <div class="explain-item-content">2021年10月01日（含）以后入职的同学不参加本次绩效考核</div>
            </div>
            <div class="explain-item">
                <div class="explain-item-title">起止时间：</div>
                <div class="explain-item-content">{{ kpiDateList.length ? `${$dayjs(kpiDateList[0].startDateStr).format('YYYY-MM-DD')} ~ ${$dayjs(kpiDateList[kpiDateList.length-1].endDateStr).format('YYYY-MM-DD')}` : '' }}</div>
            </div>
            <div class="explain-item">
                <div class="explain-item-title">考核进度：</div>
            </div>
            <div class="explain-item explain-process-talbe">
                <ui-table-pro :data="kpiDateList"
                    stripe :border="true" empty-text="暂无数据"
                >
                    <ui-table-column prop="nodeName" label="考评阶段" width=""></ui-table-column>
                    <ui-table-column prop="period" label="考评期间" width="">
                        <template slot-scope="{row}">
                            {{ getPerformanceDate(row) }}
                        </template>
                    </ui-table-column>
                    <ui-table-column prop="state" label="状态" width="">
                        <template slot-scope="{row}">
                            <span :class="['status', classMap[row.state] && classMap[row.state].class]">{{ classMap[row.state] && classMap[row.state].title }}</span>
                        </template>
                    </ui-table-column>
                </ui-table-pro>
            </div>
        </div>
    </div>

    <div class="data-list no-pager page-module-container">
        <h3 class="page-module-title">我的绩效</h3>
        <div>
            <ui-table-pro ref="dataTable" :data="listData || []"
                tooltip-effect="dark" tooltip-max-width="200px"
            >
                <template slot="empty">
                    <ui-pagetip style="max-height:300px;" type="nodata"></ui-pagetip>
                </template>
                <ui-table-column label="考评期间" show-overflow-tooltip fixed>
                    <template slot-scope="{row:item}">
                        {{ $dayjs(item.startDate).format('YYYY-MM-DD') }} ~ {{ $dayjs(item.endDate).format('YYYY-MM-DD') }}
                    </template>
                </ui-table-column>
                <ui-table-column label="考评名称" show-overflow-tooltip fixed>
                    <template slot-scope="{row:item}">
                        {{ item.name }}
                    </template>
                </ui-table-column>
                <ui-table-column label="完成情况" show-overflow-tooltip fixed>
                    <template slot-scope="{row:item}">
                        {{ getTypeStr(item) }}
                    </template>
                </ui-table-column>
                <ui-table-column label="操作" fixed>
                    <template slot-scope="{row:item}">
                        <router-link v-if="item.editor == 1"
                            :to="`/dashboard/performance/evaluate-fill-entry?twType=SELF&id=${item.id}&kpiKey=${item.kpiKey}&type=myself&target=/dashboard/performance/mine`"
                        >
                            <span>开始考评</span>
                        </router-link>
                        <router-link
                            v-else-if="item.editor == 2"
                            :to="`/dashboard/performance/evaluate-fill-entry?twType=SELF&readonly=true&id=${item.id}&kpiKey=${item.kpiKey}&type=myself&target=/dashboard/performance/mine`"
                        >
                            <span>查看</span>
                        </router-link>
                        <router-link
                            v-else-if="item.editor == 3"
                            :to="`/dashboard/performance/evaluate-view-entry?twType=SELF&kpiKey=${item.kpiKey}&type=myself&target=/dashboard/performance/mine`"
                        >
                            <span>查看</span>
                        </router-link>
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
    </div>


    <!-- 请在{{ selfEndDate }}前，选择自己的协作方以便组长确认。<router-link v-if="showChoose == '1'" :to="`/dashboard/performance/choose`"
            ><span :style="{ color: '#18c3b1' }">选择协作方</span>
        </router-link> -->
</div>
</template>

<script type="text/javascript">
import { getKpiList, getTwDate, _getKpiDateList } from '@/services/dashboard/performance';
import { getDeptInfo } from '@/services/dashboard/attendance';
export default {
    data() {
        return {
            showChoose: '',
            listData: [],
            endDate: '',
            isExpire: false,
            year: '',
            classMap: {
                1: {
                    title: '未开始',
                    class: 'notStarted'
                },
                2: {
                    title: '进行中',
                    class: 'inHand'
                },
                3: {
                    title: '已结束',
                    class: 'completed'
                }
            },
            kpiDateList: [],
            deptName: ''
        };
    },
    created() {
        this.getKpiDate();
    },
    computed: {
    },
    mounted() {
        this.getKpiList();
        this.getTwDate();
        this.getDeptInfo();
    },
    methods: {
        // 获取kpiDate数据
        async getKpiDate() {
            try {
                const { success, root } = await _getKpiDateList();
                if (success && root && root.length) {
                    // 只保留有必要属性 节点名称 和 起止时间
                    this.kpiDateList = root;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getKpiList() {
            try {
                const res = await getKpiList({ nodeKey: 1 }); //自评 1
                if (res.success && res.root && res.root.length) {
                    this.listData = res.root;
                } else {
                    this.listData = [];
                }
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async getTwDate() {
            try {
                const res = await getTwDate(); //自评 1
                if (res.success) {
                    this.endDate = res.root.endDate;
                    this.showChoose = res.root.showChoose;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getDeptInfo() {
            try {
                const { success, root } = await getDeptInfo(); // 获取用户部门
                if (success && root) {
                    this.deptName = root.deptName || '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        getTypeStr(item) {
            if (item.editor == 0) {
                return '未开始';
            } else {
                return item.end ? '进行中' : '已结束';
            }
        },
        getPerformanceDate(performance) {
            let startDate = this.$dayjs(performance.startDateStr).format('YYYY-MM-DD');
            let endDate = this.$dayjs(performance.endDateStr).format('YYYY-MM-DD');
            if (startDate === endDate) {
                return startDate;
            } else {

            }
            return `${startDate} ~  ${endDate}`;
        }
    }
};
</script>