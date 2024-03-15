<template>
<div v-if="kpiKey" class="jixiao-jiaozhun">
    <div v-if="operateList.length" class="jiaozhun-title">校准历史</div>
    <OperationRecord v-if="operateList.length" :data="operateList"></OperationRecord>
    <div v-if="operateList.length===0 && isAdmin == 0" style="margin:0 auto;margin-top: 100px;">
        <svg-icon style=" width: 100px; height: 100px;display:block;margin: 0px auto;" icon-class="config-empty"></svg-icon>
        <p style="margin: 0 auto;color: #9fa3b0;margin-bottom:20px;font-size:13px;width:100px;text-align:center">暂无校准记录</p>
    </div>
    <button v-if="isAdmin != 0" type="button" class="btn btn-primary" style="margin-top:10px" @click="onSave">我要校准</button>
    <jiaozhunDailog1 v-if="isAdmin == 2" ref="jiaozhunDailogRef" :kpi-key="kpiKey" @refresh="refresh"></jiaozhunDailog1>
    <jiaozhunDailog v-if="isAdmin == 1" ref="jiaozhunDailogRef" :kpi-key="kpiKey" @refresh="refresh"></jiaozhunDailog>
</div>
</template>

<script>
import OperationRecord from '@/package/performance/components/operation-record.vue';
import jiaozhunDailog from '@/package/performance/result-check/components/dialog.vue';
import jiaozhunDailog1 from '@/package/performance/result-setting/components/dialog.vue';
import { _jixiaoRecord } from '@/services/dashboard/performance';
export default {
    props: ['user', 'kpiKey', 'isAdmin', 'twType'],
    name: 'EvaluationJiaozhun',
    data() {
        return {
            operateList: []
        };
    },
    watch: {
        twType: {
            handler() {
                if (this.twType !== 'result_check' || this.operateList.length) return;
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
                userId: this.$route.query.userId,
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
    background: #fff;
    padding: 20px 30px 30px;
    margin: 0 0 20px;
    border-radius: 12px;
    height: 100%;
    .jiaozhun-title {
        font-size: 16px;
        font-weight: 500;
        color: #1D2129;
        line-height: 20px;
        margin-bottom: 16px;
    }
}
</style>