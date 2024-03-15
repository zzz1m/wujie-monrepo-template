/**
 * @description 用于获取各个节点时间 用法 kpiNodeDateMap.self、kpiNodeDateMap.chooseCooperate...
 */

import { _getKpiDateList } from '@/services/dashboard/performance/index.js';
import { _getValue } from '@/utils/util.js';
import { mapActions, mapState} from 'vuex';

// this.$store.dispatch('org/A__getDepTree');
export default {
    data() {
        return {
            kpiNodeKeyMap: {
                '1': 'CHOOSE_COOPERATE',                                    // 选择协作方
                '2': 'CONFIRM_COOPERATE',                                   // 确认协作方 协作关系调整
                '3': 'SELF',                                                // 自评
                '4': ['COOPERATE', 'COOPERATE2', 'LEADER_PRO', 'SUBORDINATE'],        // 协作方评价 协作方2评价 上级专业线评价
                '5': ['LEADER'],                                            // 上级评价  
                '6': 'PERFORMANCE_ADJUSTMENT',                              // 绩效调整
                '7': 'PERFORMANCE_ADJUSTMENT_BIG'                           // 大组长绩效调整
                // '1': 'SELF',                                             // 自评
                // '2': 'CHOOSE_COOPERATE',                                 // 选择协作方
                // '3': 'CONFIRM_COOPERATE',                                // 确认协作方
                // '4': 'RELATIONSHIP_ADJUSTMENT',                          // 协作关系调整
                // '4': ['COOPERATE', 'COOPERATE2', 'SUBORDINATE'],         // 协作方评价 协作方2评价
                // '5': ['LEADER', 'LEADER_PRO'],                           // 上级评价  上级专业线评价
                // '6': 'PERFORMANCE_ADJUSTMENT'                            // 绩效调整
            },
            kpiNodeDateMap: {}                                              // 用法 kpiNodeDateMap.self
        };
    },
    async created() {
        if (!this.kpiNodeList.length) {
            await this.getRecordInfo();
        }
        this.getKpiDate();
    },
    computed: {
        ...mapState('performance', ['kpiNodeList']),
        // 判断是否在绩效评价周期内
        isInPerformanceCycle() {
            if (!this.kpiNodeList.length) {
                return false;
            }
            const startDate = this.kpiNodeList[0] ? this.kpiNodeList[0].startDateStr : '';
            const endDate = this.kpiNodeList[this.kpiNodeList.length - 1] ? this.kpiNodeList[this.kpiNodeList.length - 1].endDateStr  : '';
            return !(this.$dayjs().isBefore(this.$dayjs(startDate)) || this.$dayjs().isAfter(this.$dayjs(endDate)));
        }
    },
    methods: {
        ...mapActions('performance',['getRecordInfo']),
        // 获取kpiDate数据
        getKpiDate() {
            // 只保留有必要属性 节点名称 和 起止时间
            let realNodeDates = this.kpiNodeList.map(({ nodeName, startDateStr, endDateStr, nodeKey }) => {
                return { nodeName, startDateStr, endDateStr, nodeKey };
            });
            let keyMapByNode = {};
            realNodeDates.forEach(item => {
                if (!keyMapByNode[item.nodeKey]) {
                    keyMapByNode[item.nodeKey] = item;
                }
            });
            Object.entries(this.kpiNodeKeyMap).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        this.$set(this.kpiNodeDateMap, item, keyMapByNode[key]);
                    });
                } else {
                    this.$set(this.kpiNodeDateMap, value, keyMapByNode[key]);
                }
            });
        
        },

        /**
         * @description 获取起止时间范围字符串 用法 getDateRangeStr('CHOOSE_COOPERATE') => 12.01 - 12.30
         * @param {String}  dateNodeKey 时间阶段的key
         * @param {String} formatType 时间格式化格式 例：MM.DD M月D日 
         * @param {String} separator 分隔符
         */
        getDateRangeStr(dateNodeKey, formatType = 'MM.DD', separator = ' - ') {
            const nodeDate = _getValue(this.kpiNodeDateMap, dateNodeKey);

            if (nodeDate) {
                return ['startDateStr', 'endDateStr'].map(key => this.$dayjs(nodeDate[key]).format(formatType)).join(separator);
            }
            return '';
        },

        /**
         * @description 获取格式化时间字符串 用法 getDateStr('CHOOSE_COOPERATE.startDate') => 12月1日
         * @param {String}  dateNodeKey 时间阶段的key
         * @param {String} formatType 时间格式化格式 例：MM.DD M月D日 
         */
        getDateStr(dateKey, formatType = 'M月D日') {
            const date = _getValue(this.kpiNodeDateMap, dateKey);
            if (date) {
                return this.$dayjs(date).format(formatType);
            }
            return '';
        }
    }
};