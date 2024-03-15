<template>
<ui-dialog v-model="showDialog"
    :title="title" width="540" wrap-class="ui-dialog-reset dialog-approval-batch-approval"
    lock prevent-layer :show-footer="showFooter" :show-header="showHeader" :prevent-confirm="true" @on-confirm="handleBranchApproval" @on-hide="resetData"
>
    <template v-if="showDialog" slot="content">
        <ui-form v-if="!loading" ref="form"
            :model="formData" :rules="ruleData" :label-width="0" :inline="false"
            @submit.native.prevent="handleSubmit('form')"
        >
            <form-item prop="remark">
                <ui-input v-model.trim="formData.remark" :rows="5" :counter="true"
                    :maxlength="200" type="textarea" aria-placeholder="200字符以内"
                ></ui-input>
            </form-item>
        </ui-form>
        <div v-if="loading">
            <div class="dialog-header">
                <h3 class="title">审批进度</h3>
            </div>
            <p class="alert-warning">请勿关闭页面，避免终止批量审批操作</p>
            <div class="progress-type">
                <div>成功：<span class="active-num">{{ successNum }}</span></div>
                <div>失败：<span class="fail-num">{{ failNum }}</span></div>
            </div>
            <div class="progress-wrapper">
                <ui-progress :percent="percent" type="success" class="active"></ui-progress>
                <p class="progress-num">
                    <span class="active-num">{{ successNum + failNum }}</span>
                    <span>/{{ rows.length || 0 }}</span>
                </p>
            </div>
        </div>
    </template>
</ui-dialog>
</template>
<script>
import { _batchGetDictInfo } from '@/services/dashboard/common';
import { _progressApprove } from '@/services/dashboard/audit';
import { mapActions } from 'vuex';
export default {
    components: {
    },
    data() {
        return {
            showDialog: false,
            formData: {
                remark: ''  // 备注
            },
            ruleData: {
                remark: [
                    { max: 200, trigger: 'change' }
                ]
            },
            rows: [],
            title: '意见内容',
            showFooter: true,
            showHeader: true,
            successNum: 0,
            failNum: 0,
            loading: false
        };
    },
    created() {
    },
    mounted() {
        // this.loading = true;
        // this.handleShowProgress();
    },
    computed: {
        percent() {
            return Math.floor((this.successNum + this.failNum)/this.rows.length * 100);
        }
    },
    watch: {
        showDialog(show) {
            if (!show) {
                this.$refs.form && this.$refs.form.resetFields();
            }
        },
        loading() {

        }
    },
    methods: {
        open(rows) {
            this.rows = rows;
            this.showDialog = true;
        },
        handleSubmit() {

        },
        async handleBranchApproval() {
            try {
                if (this.loading) {return;};
                this.loading = true;
                this.handleShowProgress();
                for (let i = 0; i < this.rows.length; i++) {
                    let billType = this.rows[i]?.billType;
                    let processInstanceId = this.rows[i]?.processInstanceId;
                    await this.onConfirm(billType, processInstanceId);
                }
            } catch (error) {
                console.log(error);
            } finally {
                let timer = setTimeout(() => {
                    this.loading = false;
                    this.showDialog = false;
                    this.resetData();
                    clearTimeout(timer);
                    this.$emit('on-confirm');
                    this.$toast('批量审批完成','success');
                }, 2500);
            }
        },
        resetData() {
            this.title = '意见内容';
            this.showFooter = true;
            this.showHeader = true;
            this.successNum = 0;
            this.failNum = 0;
            this.formData.remark = '';
        },
        handleShowProgress() {
            this.title = '审批进度';
            this.showFooter = false;
            this.showHeader = false;
            this.successNum = 0;
            this.failNum = 0;
        },
        async onConfirm(billType, processInstanceId) {
            try {
                let params = {
                    approveAction: 1,
                    auditComment: this.formData.remark,
                    billType,
                    processInstanceId
                };
                const { success, root } = await _progressApprove(params);
                if (success, root) {
                    this.successNum += 1;
                } else {
                    this.failNum += 1;
                }
            } catch (error) {
                this.failNum += 1;
                console.log(error);
            } 
        }
    }
};
</script>