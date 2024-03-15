<template>
<div>
    <!-- 培训下线弹窗 -->
    <dialog-train-offline ref="dialogTrainOffline" :detail-info="detailInfo" @onconfim="sureRegister()"></dialog-train-offline>
    <!-- 课程下线弹窗 -->
    <dialog-course-offline ref="dialogCourseOffline" @onConfirm="sureRegister()"></dialog-course-offline>
</div>
</template>
<script>
import { _getLearningType } from '@/services/dashboard/train';
import { TrainOfflineDialog as DialogTrainOffline, CourseOfflineDialog as DialogCourseOffline } from '@noah/components';

export default {
    name: 'TrainDialog',
    props: {
    },
    data() {
        return {
            show: false,
            processInstanceId: '',
            detailInfo: {}
        };
    },
    components: {
        DialogCourseOffline,
        DialogTrainOffline
    },
    methods: {
        sureRegister(data) {
            setTimeout(() => {
                this.$emit('on-confirm', data);
            }, 500);
        },
        open(data) {
            this.processInstanceId = data.processInstanceId;
            this.init();
        },
        async init() {
            try {
                const { success, root } = await _getLearningType({
                    processInstanceId: this.processInstanceId
                });
                if (success && root) {
                    // 4是培训课 其他为普通课
                    const isTrain = root.type === 4 ? true : false;
                    // 不是下线退回直接挑转到编辑页 是下线审批展示弹窗
                    if (root.approveStatus !== 5) {
                        let url = isTrain ? '/dashboard/audit/audit-center/train-manage-edit' : '/dashboard/audit/audit-center/course-manage-edit';
                        const q = {
                            path: url,
                            query: {
                                id: root.snapshotId,
                                type: root.type,
                                formPage: 'audit'
                            }
                        };
                        if(this.$route.name === 'auditCenterDetail') {
                            q.query.isDetail = 1;
                        }
                        this.$router.push(q);
                    } else {
                        this.detailInfo = {
                            id: root.id
                        };
                        if (isTrain) {
                            this.$refs.dialogTrainOffline.openDialog();
                        } else {
                            this.$refs.dialogCourseOffline.openDialog(this.detailInfo);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
