<template>
<ui-dialog v-model="showDialog"
    title="确认协作方"
    width="556" wrap-class="ui-dialog-reset common-edit-dialog recruit-demand-form"
    lock prevent-layer :prevent-confirm="true"
    @on-close="close"
>
    <template v-if="showDialog" slot="content">
        <div>
            <div class="edit-wrap common-edit-dialog-form">
                <ui-form ref="form"
                    :inline="false"
                    :model="formData"
                    @submit.native.prevent="handleSubmit('form')"
                >
                    <form-item v-if="!formData.isTPU" label="已选协作方：" prop="content">
                        <ui-radio-group v-model="formData.single">
                            <ui-radio v-for="(item, index) in peoples" :key="index" :label="item.value">{{ item.label }}</ui-radio>
                        </ui-radio-group>
                    </form-item>
                    <form-item v-else label="已选协作方：" prop="content">
                        <ui-checkbox-group v-model="formData.content">
                            <ui-checkbox v-for="(item, index) in peoples" :key="index" :label="item.value">{{ item.label }}</ui-checkbox>
                        </ui-checkbox-group>
                    </form-item>
                    <form-item label="选择其他协作方：" prop="userIds">
                        <ui-select v-model="formData.userIds" style="width:100%" multiple filterable clearable placeholder="请选择其他协作方" transfer @on-query-change="queryOwn">
                            <ui-option v-for="item in userList" :key="item.value" :value="item.value">{{ item.label }}</ui-option>
                        </ui-select>
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
import { updateTwUser, newkpiUser } from '@/services/dashboard/performance';
import { debounce } from '@/utils/common';
// 初始化form表单
const originForm = {
    single: '',
    content: [],
    userIds: []
};

export default {
    props: ['kpiKey'],
    data() {
        return {
            showDialog: false,
            formData: { ...originForm },
            isLoading: false,
            classList: ['A', 'A-', 'B+', 'B', 'C+', 'C'],
            userList: [],
            peoples: [],
            orignArr: [],
            rowData: {}
        };
    },
    watch: {
        'formData.userIds'(val) {
            let tempArr = val.map(item => item.split(' - ')[0]);
            this.peoples = this.peoples.filter(item => tempArr.includes(item.value) || this.orignArr.some(a => a.value === item.value));
            if (!tempArr.includes(this.formData.single)) {
                this.formData.single = '';
            }
            val.map(item => {
                const splitArr = item.split(' - ');
                let temp = {
                    value: splitArr[0],
                    label: splitArr[1] + '-' + splitArr[2]
                };
                if (!this.peoples.some(k => k.value === temp.value)) {
                    this.peoples.push(temp);
                }
            });
            this.formData.content = this.formData.content.filter(item => this.peoples.some(a => a.value === item));
            if (!this.peoples.some(key => key.value === this.formData.single)) {
                this.formData.single = '';
            }
        }
    },
    methods: {
        // 打开弹窗
        async open(rowData) {
            this.formData = { 
                userId: rowData?.userId,
                content: [],
                userIds: [],
                single: '',
                isTPU: rowData.isTPU
            };
            if (!rowData.twUsers) {
                rowData.twUsers = [];
            }
            if (rowData.isTPU) {
                this.orignArr = rowData.twUsers.map(user => {
                    if (user.choose) {
                        this.formData.content.push(user.userId);
                    }
                    return {
                        label: user.name + '-' + user.email,
                        value: user.userId
                    };
                });
            } else {
                this.orignArr = rowData.twUsers.map(user => {
                    if (user.choose) {
                        this.formData.single = user.userId;
                    }
                    return {
                        label: user.name + '-' + user.email,
                        value: user.userId
                    };
                });
            }
            this.peoples = [...this.orignArr];
            this.rowData = rowData;
            this.showDialog = true;
        },
        // 搜索人员
        queryOwn: debounce(300, function(key) {
            this.getUserList(key);
        }),
        async getUserList(keyWork) {
            const res = await newkpiUser({ keyWork, kpiKey: this.kpiKey });
            if (res.success) {
                this.userList = res.root || [];
                this.userList = this.userList.map(n => {
                    return {
                        label: `${n.userName}-${n.email}`,
                        value: `${n.userId} - ${n.userName} - ${n.email}`,
                        name: `${n.userName}-${n.email}`,
                        id: n.userId
                    };
                }).filter(item => !this.peoples.find(key => key.value === item.id));
            }
        },
        // 关闭弹窗
        close() {
            this.showDialog = false;
        },
        // 提交方法
        async onSave() {
            let params = {
                userId: this.rowData.userId,
                kpiKey: this.kpiKey,
                applyTwUserDTOList: []
            };
            if (this.rowData.isTPU) {
                if (!this.formData.content.length) {
                    this.$toast({ content: '请为当前员工选择协作方', type: 'warning' });
                    return;
                } else if (this.formData.content.length !== 2) {
                    this.$toast({ content: '需为当前员工选择2位协作方', type: 'warning' });
                    return;
                } else if (this.formData.content.length !== [...new Set(this.formData.content)].length) {
                    this.$toast({ content: '存在重复协作方', type: 'warning' });
                    return;
                }
                this.peoples.map(item => {
                    if (this.formData.content.includes(item.value)) {
                        params.applyTwUserDTOList.push({
                            userId: item.value,
                            userName: item.label,
                            isChoose: this.formData.content.includes(item.value)
                        });
                    }
                });
            } else {
                if (!this.formData.single) {
                    this.$toast({ content: '请为当前员工选择协作方', type: 'warning' });
                    return;
                }
                this.peoples.map(item => {
                    params.applyTwUserDTOList.push({
                        userId: item.value,
                        userName: item.label,
                        isChoose: this.formData.single === item.value
                    });
                });
            }
            this.isLoading = true;
            try {
                const { success, message } = await updateTwUser(params);
                if (success) {
                    this.$toast({ content: '操作成功', type: 'success' });
                    this.close();
                    this.$parent.getTeamApply();
                } else {
                    this.$toast({ content: message, type: 'warning' });
                }
                this.isLoading = false;
            } catch(e) {
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
</style>