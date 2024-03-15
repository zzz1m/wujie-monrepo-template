<template>
    <div class="">
        <ui-dialog
            v-model="show"
            class="choose-role-dialog email-reject-dialog"
            @on-confirm="onConfirm"
            preventConfirm
            cancelText="取消"
            confirmText="确定"
            style="z-index: 1020;"
            
        >
            <template slot="title">驳回</template>
            <template slot="content">
                <div class="reject-box">
                    <span class="label text-gray">请填写驳回原因：</span>
                    <ui-input v-model.trim="comment" placeholder="请输入" :maxlength="100"></ui-input>
                </div>
            </template>
        </ui-dialog>
    </div>
</template>
<script>
import {_interviewApproveReport} from '@/services/dashboard/interview';

export default {
    data() {
        return {
            show: false,
            comment: '',
            interviewId: '',

        };
    },
    computed: {
    },
    methods: {
        open(params) {
            this.interviewId = params.interviewId || '';
            this.show = true;
        },
        close() {
            this.show = false;
            this.comment = '';
            this.interviewId = '';
        },
        async onConfirm() {
            if (!this.comment) {
                this.$toast('请填写驳回原因','warning');
                return;
            }

            this.$emit('on-reject',{comment: this.comment});
            this.close();

            // if (this.submitting) return;
            // this.submitting = true;

            // try {
            //     const res = await _interviewApproveReport({
            //         interviewId: this.interviewId,
            //         action: 3,
            //         comment: this.comment,
            //     });
            //     this.submitting = false;
            //     if (res.success) {
            //         this.$toast('操作成功！','success');

            //         this.$emit('reject-success',{comment: this.comment});
            //         this.close();
            //     } else {
            //         this.$toast(res.message || '请求失败', 'warning');
            //     }
            // }catch(e) {
            //     this.submitting = false;
            //     this.$toast(e.message || '请求失败', 'error');
            // }
            
            
        },
        chooseRole(obj) {
            // console.log('=====obj',obj);
            if (!obj) return;
            this.role.label = obj.label;
            this.role.value = obj.value;
        }
    }
};
</script>
<style lang="less">
</style>
