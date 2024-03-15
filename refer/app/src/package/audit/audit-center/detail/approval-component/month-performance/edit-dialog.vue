<template>
<ui-dialog
v-model="showDialog"
    lock
    :prevent-confirm="true" prevent-layer
    :title="compConfig.title" :width="compConfig.width" :wrap-class="`common-edit-dialog ${compConfig.wrapClass} ${compType === 'TableList'?'is-preview': ''}`"
>
    <template v-if="showDialog" slot="content">
        <component :is="compType" ref="editForm" :edit-id="editId" :edit-type="editType" v-bind="$attrs" v-on="$listeners" />
    </template>
    <template slot="footer">
        <div></div>
    </template>
</ui-dialog>
</template>
<script>
import TableList from './table-list.vue';

export default {
    props: {
    },
    components: {
        TableList
    },
    data() {
        return {
            showDialog: false,
            isLoading: false,
            editId: '',
            compType: '',
            editType: 0
        };
    },
    computed: {
        dialogType() {
            return  this.editId ? 'edit' : 'created';
        },
        dialogTitle() {
            return this.dialogType === 'created' ? '创建' : '编辑';
        },
        compConfig() {
            if (this.compType === 'TableList') {
                return {
                    title: `预览`,
                    width: '700',
                    wrapClass: 'performance-user-dialog'
                };
            }
            else {
                return {
                    title: `编辑`,
                    width: '700'
                };
            }
        }
    },
    methods: {
        open(rowData, type, editType) {
            this.compType = type;
            this.showDialog = true;
            this.editId = rowData?.id;
            this.editType = editType || 0;
        },
        onSuccess() {
            this.$emit('on-success');
            this.close();
        }
    }
};
</script>
