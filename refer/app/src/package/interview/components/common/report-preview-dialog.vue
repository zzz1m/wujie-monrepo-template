<template>
    <ui-dialog
        v-model="openDialog"
        preventClose
        preventLayer
        @on-close="close"
        @on-layer="close"
        :showFooter="false"
        :lock="true"
        wrapClass="interview-template-dialog"
        :class="`interview-preview-dialog__${formType}`"
        :style="{'z-index': 1018, 'opacity': transparent ? 0 : 1}"
    >
        <template slot="content">
            <div class="dialog-content" id="interview-preview-table">
                <div ref="previewer">
                    <interview-form v-if="formType==1" :modelData="modelData" :configData="configData" :title="title"></interview-form>
                    <resign-form v-else-if="formType==0" :modelData="modelData" :configData="configData" :title="title"></resign-form>
                    <!-- <email-tpl v-if="openDialog"
                        :formType="formType" :title="title"
                        :modelData="modelData" :configData="configData"></email-tpl> -->
                </div>
            </div>

            <!-- 邮件模版专用 -->
            <div style="display:none">
                <email-tpl ref="email" v-if="openDialog"
                    :formType="formType" :title="title"
                    :modelData="modelData" :configData="configData"></email-tpl>
            </div>

            <div class="footer-btns">
                <button type="button" class="btn btn-primary" @click="onCancel">关闭</button>
            </div>
        </template>
    </ui-dialog>
</template>

<script>
import html2canvas from 'html2canvas';
import {_interviewerReportDetail} from '@/services/dashboard/interview';
import InterviewForm from '@/package/interview/components/evaluation-form/index-interview-form.vue';
import ResignForm from '@/package/interview/components/evaluation-form/index-resign-form.vue';

// 邮件专用模版
import emailTpl from '../email-tpl/index.vue';

export default {
    components: {
        InterviewForm,
        ResignForm,
        emailTpl
    },
    data() {
        return {
            openDialog: false,
            id: '',
            type: '',

            title: '',
            formType: null,     //评估表的类型   1 首月表 0离职表
            modelData: {},   //访谈表的模版数据
            configData: {},   //访谈表的参数

            transparent: false // 是否透明
        };
    },
    computed: {
    },
    //方法集合
    methods: {
        open(params, isHide) {

            this.title= params.title;
            this.formType = params.formType;
            this.modelData = params.renderModel;
            this.configData = params.renderConfig;

            this.openDialog = true;
            this.transparent = isHide;
            if (isHide) {
                this.$nextTick(() => {
                    this.getCanvasData();
                });
            }
        },
        getDom(params) {
            this.open(params, 1);   

        },
        close() {
            this.openDialog = false;
            this.formType = null;
        },
        onCancel() {
            this.close();
        },
        handleTrs () {
            const trTitles = this.$refs.email.$el.querySelectorAll('.tr-title');
            Array.prototype.forEach.call(trTitles, function(item){
                const previousElement = item.previousElementSibling;
                previousElement.classList.add('interview-module-last');
            });
        },
        async getCanvasData () {
            const previewCont = document.querySelector(`.interview-preview-dialog__${this.formType} #interview-preview-table`);
            await this.handleTrs();
            const emailHtml = this.$refs.email.$el.outerHTML;
            if (previewCont) this.$emit('evaluate', previewCont.innerHTML);
            if (emailHtml) this.$emit('base64', emailHtml);
            console.log('邮件模版dom结构：', emailHtml);
            this.close();

            // 以下为网页生成图片的例子  ->  已废弃
            // const self = this;
            // const $viewer = this.$refs.previewer;
            // const { scrollWidth, scrollHeight } = $viewer;

            // const scale = Math.max( window.devicePixelRatio, 2 );
            // console.log( 'window.devicePixelRatio', scale );

            // html2canvas($viewer, {
            //     allowTaint: true,
            //     useCORS: true,
            //     taintTest: false,
            //     width: scrollWidth,
            //     // width: 940,
            //     height: scrollHeight,
            //     scrollY:0,
            //     backgroundColor: '#ffffff',
            //     scale
            // }).then(canvas => {
            //     const img = new Image();
            //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
                
            //     // 下边是 【【 测试 】】 图片导出效果用
            //     // img.src = imgData;
            //     // img.onload = function(){
            //     //     document.getElementById('test').appendChild(this);
            //     // }
                
            //     this.$emit('base64', imgData);
            //     if (previewCont) this.$emit('evaluate', previewCont.innerHTML);
            //     this.close();
            // }); 
        }
    },
    created() {
    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
@import '~@/styles/interview/order.less';
</style>