<template>
    <div class="page-content flex-page-content cooperation-email-page">
        <div class="data-tab tab-line">
            <a
                href="javascript:;"
                v-for="(item, index) in tabs"
                :key="index"
                :class="currentTab === index ? 'selected' : ''"
                @click="onChangeTab(index)"
                >{{ item.name }}</a
            >
        </div>
        <!-- 未进行自评或者他评 -->
        <undone v-if="currentTab === 0"></undone>
        <!-- 未操作协作方 -->
        <unsave v-else></unsave>
    </div>
</template>
<script>
import undone from './cooperation-email-undone.vue';
import unsave from './cooperation-email-unsave.vue';
import pathController from '@/mixins/pathController';
export default {
    components: {
        undone,
        unsave
    },
    mixins: [pathController],
    methods: {
        onChangeTab(index) {
            this.currentTab = index;
        }
    },
    data() {
        return {
            pathOptions:{
                activeTab: {
                    key: 'currentTab',
                    formatter: val => (Number(val))
                }
            },
            currentTab: 0,
            tabs: [{ name: '未自评他评', selected: true }, { name: '未操作协作方', selected: false }]
        };
    }
};
</script>
<style lang="less" scoped>
.tab-line {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>

