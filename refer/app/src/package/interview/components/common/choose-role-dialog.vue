<template>
    <div class="">
        <ui-dialog
            v-model="show"
            class="choose-role-dialog"
            @on-confirm="onConfirm"
            preventConfirm
            cancelText="取消"
            confirmText="确定"
            
        >
            <template slot="title">添加角色</template>
            <template slot="content">
                <div class="select-box">
                    <span class="label">可添加角色：</span>
                    <ui-select
                        placeholder="请选择"
                        v-model="role.value"
                        @on-change="chooseRole"
                        :label-in-value="true"
                    >
                        <ui-option v-for="item in curRoleList" :value="item.value" :key="item.value">{{item.label}}</ui-option>
                    </ui-select>
                </div>
            </template>
        </ui-dialog>
    </div>
</template>
<script>

export default {
    data() {
        return {
            show: false,
            role: {
                label: '',
                value: ''
            },
            roleList: [
                {label: '本人', value: 1},
                {label: '直属上级', value: 2},
                {label: '协作人员', value: 3},
                {label: '下级', value: 4},
            ],
            roleIds: []

        };
    },
    computed: {
        curRoleList() {
            return this.roleList.filter(v => this.roleIds.indexOf(v.value) === -1);
        }
    },
    methods: {
        open(params) {
            this.role.label = '';
            this.role.value = '';
            this.roleIds = params.roleIds || [];
            this.show = true;
        },
        close() {
            this.show = false;
        },
        async onConfirm() {
            if (!this.role.value) {
                this.$toast('请选择角色','warning');
                return;
            }
            this.$emit('add-role',this.role);
            this.close();
            
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
<style lang="less" scoped>
</style>
