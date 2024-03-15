<template>
<ui-dialog v-model="showDialog"
    title="绩效校准"
    width="556" wrap-class="ui-dialog-reset common-edit-dialog recruit-demand-form"
    lock prevent-layer :prevent-confirm="true"
    @on-close="close"
>
    <span slot="title">绩效校准<span style="font-size: 14px;color:#646F79;font-weight: 400;padding-left:10px">若不操作，默认保持当前绩效等级</span></span>
    <template v-if="showDialog" slot="content">
        <div>
            <div class="edit-wrap common-edit-dialog-form">
                <div class="jixiao-detail">
                    <span class="detail-title">姓名：</span>
                    <span class="detail-text">{{ user.userName }}</span>
                    <span class="detail-title">部门：</span>
                    <span class="detail-text">{{ user.deptName }}</span>
                    <span class="detail-title">类型：</span>
                    <span class="detail-text">{{ user.roleName || '' }}</span>
                </div>
                <ui-form ref="form"
                    :inline="false"
                    :model="formData" :rules="ruleData"
                    @submit.native.prevent="handleSubmit('form')"
                >
                    <form-item label="选择校准级别：" prop="calss">
                        <ui-select v-model="formData.calss" placeholder="请选择校准级别" transfer filterable clearable style="width:100%;">
                            <ui-option v-for="item in classList" :key="item" :value="item">{{ item }}</ui-option>
                        </ui-select>
                    </form-item>
                    <form-item label="请写校准理由：" prop="reason">
                        <ui-input v-model.trim="formData.reason" type="textarea" :rows="4" :maxlength="100" style="width:100%;"
                            placeholder="请填写校准理由" clearable counter
                        ></ui-input>
                    </form-item>
                    <form-item v-if="operateList.length" label="校准过程：">
                        <OperationRecord :data="operateList"></OperationRecord>
                    </form-item>
                </ui-form>
            </div>
        </div>
    </template>
    <template slot="footer">
        <button type="button" class="btn btn-primary btn-outline" @click="close()">取消</button>
        <button type="button" class="btn btn-primary" :disabled="isLoading" @click="onSave"><i v-if="isLoading" class="ui-icon-loading"></i> 确定</button>
    </template>
</ui-dialog>
</template>
<script>
/**
 * 校准级别
 */
import { _jixiaoRecord, doAdjust } from '@/services/dashboard/performance';
import OperationRecord from '../../components/operation-record.vue';

export default {
    components: { OperationRecord },
    props: ['kpiKey'],
    data() {
        return {
            showDialog: false,
            formData: {},
            ruleData: {
                reason: [{ required: true, message: '请填写校准理由', trigger: 'change' }],
                calss: [{ required: true, message: '请填写校准级别', trigger: 'change' }]
            },
            isLoading: false,
            classList: ['A', 'A-', 'B+', 'B', 'C+', 'C'],
            user: {},
            operateList: []
        };
    },
    methods: {
        // 打开弹窗
        async open(rowData) {
            this.formData = { 
                userId: rowData.userId,
                kpiKey: this.kpiKey,
                reason: '',
                calss: ''
            };
            this.user = rowData;
            this.getRecordData();
            this.showDialog = true;
        },
        // 关闭弹窗
        close() {
            this.$refs.form.resetFields();
            this.operateList = [];
            this.showDialog = false;
        },
        async getRecordData() {
            const { success, root } = await _jixiaoRecord({
                userId: this.user.userId || '',
                kpiKey: this.kpiKey
            });
            if (success) {
                this.operateList = root || [];
            }
        },
        // 提交方法
        async onSave() {
            try {
                const valid = await this.$refs.form.validate();
                if(!valid) return;
                this.isLoading = true;
                const params = {
                    ...this.formData
                };
                const { success, message } = await doAdjust(params);
                if (success) {
                    this.close();
                    this.$toast(`校准成功`, 'success');
                    this.$emit('refresh');
                } else {
                    this.$toast(message || '操作失败', 'error');
                }
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.quality-title {
    font-size: 15px;
    font-weight: 500;
    color: #1D2129;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.jixiao-detail {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 400;
    color: #4E5969;
    .detail-title {
        color: #646F79
    }
    .detail-text {
        color: #1D2129;
        padding-right: 30px;
    }
}
</style>