<template>
    <component :is="module.component" v-if="module.component" ref="check" v-bind="{ module, progressInfo, isOperate, processList }"></component>
    <ui-table-pro v-else-if="module.isTable && progressInfo[module.vo] && progressInfo[module.vo].length"
        :data="progressInfo[module.vo]" empty-text="暂无数据"
        class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
    >
        <template v-for="item in module.items">
             <ui-table-column v-if="item.isShow" :key="item.dataKey" :label="item.title" show-overflow-tooltip>
                <template slot-scope="{ row }">
                    <template v-if="module.isDate && module.isDate.includes(row.dataKey)">
                        {{ row[item.dataKey] ? $dayjs(row[item.dataKey]).format('YYYY-MM-DD') : '-' }}
                    </template>
                    <template v-else>
                        {{ row[item.dataKey] || '-' }}
                    </template>
                </template>
            </ui-table-column>
        </template>
    </ui-table-pro>
     <ul v-else-if="progressInfo[module.vo]" class="approval-component__list">
        <template v-for="item in module.items">
            <li v-if="item.isShow"  :key="item.dataKey" :class="[highlightClass(progressInfo, `${item.vo || module.vo}.${item.dataKey}`), module.isFull && module.isFull.includes(item.dataKey) ?'full-row': '']">
                <span style="position: relative">
                    {{ item.title }}
                    <ui-tooltip v-if="item.dataKey === 'lastDay'" placement="top" :open-delay="500" class="staff-apply-msg-wrapper" style="top: -1px;left: 84px" effect="dark">
                        <span><i class="ui-icon-warning"></i> </span>
                        <div slot="content">
                            <p>最后出勤日期，包含员工请休的年休假、调休假。</p>
                        </div>
                    </ui-tooltip>
                </span>
                <div>
                    <talentIcon v-if="item.dataKey === 'name'" :id="progressInfo.userInfoVO.idStr" :name="progressInfo.userInfoVO.name" :blank="true" style="position: relative; top: 1px;display: inline-block;" />
                    <template v-else-if="module.isBool && module.isBool.includes(item.dataKey)">
                        {{ translateBoolLabel(progressInfo[module.vo][item.dataKey]) }}
                    </template>
                    <template v-else-if="module.isDate && module.isDate.includes(item.dataKey)">
                        {{ progressInfo[module.vo][item.dataKey] ? $dayjs(progressInfo[module.vo][item.dataKey]).format('YYYY-MM-DD') : '-' }}
                    </template>
                    <template v-else-if="module.isRaw && module.isRaw.includes(item.dataKey)">{{ progressInfo[module.vo][item.dataKey] || progressInfo[module.vo][item.dataKey] === 0? progressInfo[module.vo][item.dataKey]: '-' }}</template>
                    <nari-tooltip v-else :show-tip="false" :value="progressInfo[module.vo][item.dataKey]" />
                </div>
            </li>
        </template>
    </ul>
</template>

<script>
import talentIcon from '@/components/talent-entry-icon/index.vue';
export default {
    components: {
        talentIcon,
    },
    props: {
        highlightClass: {
            type: Function,
            default: () => {}
        },
        translateBoolLabel: {
            type: Function,
            default: () => {}
        },
        module: {
            type: Object,
            default: () => ({})
        },
        progressInfo: {
            type: Object,
            default: () => ({})
        },
        isOperate: {
            type: Boolean,
            default: false
        },
        processList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        check() {
            if(this.module.component) {
                return this.$refs.check
                    ? (this.$refs.check.check? this.$refs.check.check(): true )
                    : true;
            }
            return true;
        },
        beforeAgree() {
            if(this.module.component) {
                return this.$refs.check
                    ? (this.$refs.check.beforeAgree? this.$refs.check.beforeAgree(): true )
                    : true;
            }
            return true;
        }
    }
};
</script>
