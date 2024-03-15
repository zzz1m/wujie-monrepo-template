<template>
    <component :is="curr" v-if="curr" ref="comp" :tdata="data" v-bind="{processList, currentNode, dataPrivilege}" @showProgress="$emit('showProgress')" />
</template>

<script>
import Old from './old-version.vue';
import New from './new-version.vue';
import { _getDetailByProcessInstanceId, _getAdminDetailByProcessInstanceId } from '@/services/dashboard/audit';

export default {
    components: {
        Old,
        New
    },
    props: {
        // 审批流程
        processList: {
            type: Array,
            default: () => []
        },
        // 当前节点信息
        currentNode: {
            type: Array,
            default: () => []
        },
        dataPrivilege: {
            type: Object,
            default: () => {
                return {
                    userEmail: '', //操作人（点击查看详情页的人）
                    viewPrivilege: false, //是否有查看权限
                    operatePrivilege: false //是否有操作权限
                };
            }
        }
    },
    data() {
        return {
            curr: '',
            data: {
                progressInfo: {},
                highlightFieldList: []
            }
        };
    },
    created() {
        this.getProgressInfo();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const getDetailApi = this.$route.path.match('process-detail-admin') ? _getAdminDetailByProcessInstanceId : _getDetailByProcessInstanceId;
            const { success, root } = await getDetailApi({
                processInstanceId: this.$route.query.processId
            });
            if(!success || !root) return;
            this.data.progressInfo = root.detail || {};
            this.data.highlightFieldList = root.detail.highlightFieldList || [];

            this.curr = root.detail.v2 ? 'new': 'old';
        },
        beforeSubmit() {
            return this.$refs.comp?.beforeSubmit? this.$refs.comp.beforeSubmit(): true;
        },
        beforeAgree() {
            return this.$refs.comp?.beforeAgree? this.$refs.comp.beforeAgree(): true;
        }
    }
};
</script>