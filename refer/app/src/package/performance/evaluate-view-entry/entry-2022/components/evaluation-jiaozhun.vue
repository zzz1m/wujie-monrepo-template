<template>
<div v-if="kpiKey" class="jixiao-jiaozhun">
    <div v-if="operateList.length" class="jiaozhun-title">校准历史</div>
    <OperationRecord v-if="operateList.length" :data="operateList"></OperationRecord>
    <button type="button" class="btn btn-primary" style="margin-top:10px" @click="onSave">我要校准</button>
    <jiaozhunDailog1 v-if="isAdmin == 2" ref="jiaozhunDailogRef" :kpi-key="kpiKey" @refresh="refresh"></jiaozhunDailog1>
    <jiaozhunDailog v-else ref="jiaozhunDailogRef" :kpi-key="kpiKey" @refresh="refresh"></jiaozhunDailog>
</div>
</template>

<script>
import OperationRecord from '@/package/performance/components/operation-record.vue';
import jiaozhunDailog from '@/package/performance/result-check/components/dialog.vue';
import jiaozhunDailog1 from '@/package/performance/result-setting/components/dialog.vue';
import { _jixiaoRecord } from '@/services/dashboard/performance';
export default {
    props: ['user', 'kpiKey', 'isAdmin'],
    name: 'EvaluationJiaozhun',
    data() {
        return {
            operateList: []
        };
    },
    watch: {
        user: {
            handler() {
                this.getRecordData();
            },
            immediate: true
        }
    },
    components: { OperationRecord, jiaozhunDailog, jiaozhunDailog1 },
    methods: {
        onSave() {
            this.$refs.jiaozhunDailogRef.open(this.user);
        },
        async getRecordData() {
            const { success, root } = await _jixiaoRecord({
                userId: this.user.userId,
                kpiKey: this.kpiKey
            });
            if (success) {
                this.operateList = root || [];
            }
        },
        refresh() {
            this.getRecordData();
            this.$emit('refresh');
        }
    }
};
</script>
<style lang="less" scoped>
.jixiao-jiaozhun {
    .jiaozhun-title {
        font-size: 16px;
        font-weight: 500;
        color: #1D2129;
        line-height: 20px;
        margin-bottom: 16px;
    }
}
</style>