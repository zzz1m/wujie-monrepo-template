<template>
<div class="page-content flex-page-content team-result page-performance">
    <div class="page-title no-preline">
        <h2>
            <div v-show="listData.length" v-if="showResult" class="statistics">
                <span v-for="item in Object.keys(currentRating)" :key="item">
                    <i>{{ item }}：</i>{{ total[currentRating[item]] || 0 }} <em>(人)</em>/ {{ percentRate(total[currentRating[item]]) }} <em>(%)</em>
                </span>
                <span><i>总计：</i>{{ rateTotalCount }} <em>(人)</em></span>
            </div>
        </h2>
    </div>

    <div class="data-search">
        <form method="get">
            <div class="form-row">
                <span class="t">筛选</span>
                <!-- <ui-select v-model="kpiKey" class="search-year"  placeholder="请选择年份">
                        <ui-option v-for="item in kpiKeyList" :value="item.kpiKey" :key="item.kpiKey">{{ item.name }}</ui-option>
                    </ui-select> -->
                <ui-select-last ref="depart" v-model="deptId" :clearable="true" placeholder="请选择部门" class="depart-tree search-ipt">
                    <template slot="options">
                        <ul>
                            <partment-tree
                                v-for="(item, index) in partmentData"
                                :key="index"
                                :tree-data="item"
                                :current-id="deptId"
                                @update:select="onToggle"
                            ></partment-tree>
                        </ul>
                    </template>
                    <span v-if="deptId" slot="partment-tree-suffix-label" @click="clearDept">
                        <i class="ui-icon-circle-close"></i>
                    </span>
                </ui-select-last>
                <div class="search-item">
                    <ui-input
                        v-model.trim="userName"
                        placeholder="请输入员工姓名"
                        class="search-ipt"
                        clearable
                        @clear="onSearch()"
                    ></ui-input>
                </div>
                <div class="search-item">
                    <button type="button" class="btn team-result-btn btn-primary" @click="onSearch()">搜索</button>
                </div>
                <div v-if="showExportBtn" class="search-item">
                    <a 
                        class="btn team-result-btn btn-primary" 
                        :href="`/api/kpi/admin/export/teamKpiDetail.json?deptId=${deptId}&userName=${userName}&kpiKey=${kpiKey}`"
                    >
                        导出
                    </a>
                </div>
            </div>
        </form>
    </div>
    <div v-if="!isload" class="data-list">
        <div class="fix-table-warp">
            <div class="fix-table-content">
                <ui-table-pro ref="dataTable" :height="100" :data="listData|| []"
                    tooltip-effect="dark" tooltip-max-width="200px"
                >
                    <template slot="empty">
                        <ui-pagetip style="max-height:300px;" type="nodata"></ui-pagetip>
                    </template>
                    <ui-table-column min-width="15%" label="被考评人" show-overflow-tooltip>
                        <template slot-scope="{row:item}">
                            {{ item.userName }}
                        </template>
                    </ui-table-column>
                    <ui-table-column min-width="15%" show-overflow-tooltip>
                        <template #header>
                            <div style="cursor:pointer" @click="sort(0)">
                                所属部门<span class="caret-wrapper">
                                    <i class="sort-caret ascending" :class="getIsActiveClass(0, 0)"></i>
                                    <i class="sort-caret descending" :class="getIsActiveClass(0, 1)"></i>
                                </span>
                            </div>
                        </template>
                        <template slot-scope="{row:item}">
                            {{ item.deptName }}
                        </template>
                    </ui-table-column>
                    <ui-table-column min-width="40%" label="邮箱" show-overflow-tooltip>
                        <template slot-scope="{row:item}">
                            {{ item.email }}
                        </template>
                    </ui-table-column>
                    <ui-table-column min-width="10%" show-overflow-tooltip>
                        <template #header>
                            <div style="cursor:pointer" width="10%" @click="sort(1)">
                                Class<span class="caret-wrapper">
                                    <i class="sort-caret ascending" :class="getIsActiveClass(1, 0)"></i>
                                    <i class="sort-caret descending" :class="getIsActiveClass(1, 1)"></i>
                                </span>
                            </div>
                        </template>
                        <template slot-scope="{row:item}">
                            {{ item.rltCalss }}
                        </template>
                    </ui-table-column>
                    <ui-table-column v-if="isOldData" show-overflow-tooltip min-width="10%">
                        <template #header>
                            <div style="cursor:pointer" @click="sort(2)">
                                分数<span class="caret-wrapper">
                                    <i class="sort-caret ascending" :class="getIsActiveClass(2, 0)"></i>
                                    <i class="sort-caret descending" :class="getIsActiveClass(2, 1)"></i>
                                </span>
                            </div>
                        </template>
                        <template slot-scope="{row:item}">
                            {{ item.score }}
                        </template>
                    </ui-table-column>
                    <ui-table-column min-width="10%" label="操作">
                        <template slot-scope="{row:item}">
                            <router-link 
                                :to="`/dashboard/performance/evaluate-view-entry?userId=${item.userId}&deptName=${item.deptName}&userName=${item.userName}&kpiKey=${item.kpiKey}&type=team&target=/dashboard/performance/team`"
                            >
                                <span>查看评价</span>
                            </router-link>
                        </template>
                    </ui-table-column>
                </ui-table-pro>
            </div>
        </div>
        <ui-pager
            v-if="current.totalCount !== 0"
            v-show="listData.length"
            :current="current.page"
            :total="current.totalCount"
            :page-size="15"
            text-align="center"
            show-elevator
            class="fasion-pager"
            @update:page="onSearch"
        ></ui-pager>
    </div>
</div>
</template>

<script type="text/javascript">
import { teamkpi, _getKpiInfoList, _getDeptLeaderKpiTreeHistory } from '@/services/dashboard/performance';
import partmentTree from '@/components/partment-tree';
import { debounce } from '@/utils/common';
import { _getResouces } from '@/services/dashboard/common';
export default {
    components: { partmentTree },
    data() {
        return {
            year: '',
            yearList: [2019, 2018],
            partmentData: [],
            deptId: '',
            userName: '',
            kpiKey: '',
            showResult: false,
            kpiKeyList: [],
            listData: [],
            total: {},
            isload: false,
            general: {
                sortFiled: ['deptName', 'calss', 'score'],
                sortType: ['asc', 'desc']
            },
            current: {
                sortFiled: '',
                sortType: '',
                totalCount: 0,
                page: 1
            },
            authorityList: []  // 权限列表
        };
    }, 
    computed: {
        isOldData() {
            return ['2019_ONE', '2019_TWO'].includes(this.kpiKey);
        },
        currentRating() {
            const ratingMap = {
                'A': 'classA',
                'A-': 'classAr',
                'B+': 'classBp',
                'B': 'classB',
                'C+': 'classCp',
                'C': 'classC'
            };
            const oldRatingMap = {
                'A': 'classA',
                'B+': 'classBp',
                'B': 'classB',
                'C': 'classC'
            };
            return this.isOldData ? oldRatingMap : ratingMap;
        },
        rateTotalCount() {
            const { classA = 0, classAr = 0, classBp = 0, classB = 0, classCp = 0, classC = 0 } = this.total;
            return classA + classAr + classBp + classB + classCp + classC;
        },
        showExportBtn() {
            return this.authorityList.includes('/api/kpi/admin/export/teamKpiDetail.json');
        }
    },
    watch: {
        'kpiKey': function() {
            this.onSearch();
        }
    },
    methods: {
        clearDept() {
            this.deptId = '';
            const select = this.$refs.depart;
            select.setCurrentLabel('');
            select.isOpen = false;
            this.current.page = 1;
            this.onSearch();
        },
        onToggle(data) {
            const select = this.$refs.depart;
            select.isOpen = false;
            this.deptId = data.id;
            this.current.page = 1;
            this.onSearch();
            select.setCurrentLabel(data.name);
        },
        percentRate(numerator) {
            if (!numerator || this.rateTotalCount === 0) {
                return '0';
            }
            return Math.round(numerator/this.rateTotalCount * 10000) / 100;
        },
        getIsActiveClass(filedIndex, sort) {
            const { sortFiled, sortType } = this.current;
            return sortFiled === filedIndex && sortType === sort ? 'active' : '';
        },
        onSearch(page) {
            this.current.page = page || 1;
            this.teamkpi(page);
        },
        sort(filedIndex) {
            this.current.sortType = this.current.sortFiled === filedIndex ? +!this.current.sortType : 0;
            this.current.sortFiled = filedIndex;
            this.teamkpi();
        },
        // 获取kpi信息列表 用于查询区域
        async getKpiKeyList() {
            try {
                const { success, root } = await _getKpiInfoList();
                if (success && root && root.length) {
                    this.kpiKeyList = root;
                    this.kpiKey = root[0].kpiKey;
                    // this.rawTeamkpi();
                    this.getDeptList();
                }
            } catch (error) {
                console.log(error);
            }
        },
        teamkpi: debounce(300,function() {
            this.rawTeamkpi();
        }),
        async rawTeamkpi() {
            try {
                const res = await teamkpi({
                    userName: this.userName,
                    deptId: this.deptId,
                    page: this.current.page,
                    // kpiKey: this.kpiKey,
                    sortField: this.general.sortFiled[this.current.sortFiled],
                    sortType: this.general.sortType[this.current.sortType]
                });
                if (res.success) {
                    this.listData = res.root.data || [];
                    this.total = res.root.kpiClass || {};
                    this.current.page = res.root.page;
                    this.current.totalCount = res.root.totalCount;
                    this.showResult = true;
                } else {
                    this.listData = [];
                }
                this.isload = true;
                this.$nextTick(_ => {
                    this.isload = false;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async getDeptList() {
            try {
                this.isLoading = true;
                const res = await _getDeptLeaderKpiTreeHistory();
                if (res.success) {
                    this.partmentData = res.root || [];
                    this.partmentData.unshift({ name: '全部' });
                } else {
                    this.partmentData = [];
                }
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
            }
        },
        // 获取用户批量操作权限
        async getResouces() {
            const { success, root } = await _getResouces();
            if (success && root) {
                this.authorityList = root;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.meta.keepAlive) {
                vm.onSearch();
            }
        });
    },
    activated() {
        this.onSearch();
    },
    mounted() {
        this.getKpiKeyList(); 
        this.getResouces();
    }
};
</script>
<style lang="less" scoped>
::v-deep .ui-table {
    th {
        cursor: pointer;
    }
    td {
        word-break: break-all;
    }
}
.search-year {
    width: 220px;
    ::v-deep .input {
        width: 220px;
    }
}
</style>
