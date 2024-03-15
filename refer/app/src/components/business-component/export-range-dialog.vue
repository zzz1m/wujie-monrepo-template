<template>
    <ui-dialog
        v-model="showDialog"
        class="ui-dialog-reset export-range-dialog"
        preventConfirm
        preventClose
        preventLayer
        @on-layer="showDialog = false"
        @on-close="showDialog = false"
        @on-confirm="onExportDetail">
        <template slot="header">
            <h3 class="title" :class="required ? 'required' : '' ">{{title}}</h3>
        </template>
        <template v-if="showDialog" slot="content">
            <ui-date-picker 
                v-model="startDate"
                type="date" placeholder="开始时间" value-format="yyyy-MM-dd"
                >
            </ui-date-picker> ~
            <ui-date-picker 
                v-model="endDate"
                type="date" placeholder="结束时间" value-format="yyyy-MM-dd"
                >
            </ui-date-picker>
        </template>
    </ui-dialog>
</template>
<script>
import { downLoad } from '@/utils/util.js';
export default {
    props: {
        title: {
            type: String,
            default: '导出范围'
        },
        downLoadUrl: '',
        required: false,
        validate: Function
    },
    components: {
    },
    data() {
        return {
            showDialog: false,
            startDate: '',
            endDate: ''
        };
    },
    created() {
    },
    mounted() {
    },
    methods: {
        open() {
            this.showDialog = true;
            this.startDate = '';
            this.endDate = '';
        },
        async onExportDetail() {
            try {
                if (this.required && !(this.startDate && this.endDate)) {
                    this.$toast({
                        content: '请选择时间范围',
                        type: 'warning'
                    });
                    return;
                }
                if (this.$dayjs(this.startDate).isAfter(this.endDate)) {
                    this.$toast('开始时间不得大于结束时间', 'warning');
                    return false;
                }
                if (!this.downLoadUrl) {
                    this.showDialog = false;
                    return;
                }
                if (this.validate) {
                    const validate = await this.validate({
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                    if (!validate) { return; }
                }
                downLoad(`${this.downLoadUrl}?startDate=${this.startDate}&endDate=${this.endDate}`);
                this.showDialog = false;
            } catch (e) {
                console.log(e);
            }
        },
    }
};
</script>