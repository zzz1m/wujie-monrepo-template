<template>
<ui-dialog
v-model="showDialog"
    lock :prevent-confirm="true"
    prevent-layer :style="{'z-index': 1018, 'opacity': transparent ? 0 : 1}" width="1000"
    wrap-class="ui-dialog-reset interview-temp-preview-dialog"
>
    <template v-if="showDialog" slot="content">
        <div id="interviewEvaluation" ref="interviewEvaluation" class="interview-evaluation-content">
            <div class="preview-title">{{ title }}</div>
            <TemplateViewPage ref="templateFillPage" />
        </div>
    </template>
    <template slot="footer">
        <div class="footer-btns">
            <button class="btn btn-primary" type="button" @click="handleClose">关闭</button>
        </div>
    </template>
</ui-dialog>
</template>
<script>
import TemplateViewPage from '@/package/template-center/template-preview/index.vue';

import { commonConfig } from '@noah/tools';
const {  INTERVIEW_TYPE_LIST }  = commonConfig.interview;

export default {
    name: 'PreviewPage',
    props: {
    },
    components: {
        TemplateViewPage
    },
    data() {
        return {
            showDialog: false,
            type: '',
            transparent: false // 是否透明
        };
    },
    computed: {
        title(){
            if(!this.type){
                return '';
            }
            const typeName = INTERVIEW_TYPE_LIST.find(item => item.value  === this.type + '');

            return `${typeName?.label || ''}评估表`;
        }
    },
    mounted() {
    },
    methods: {
        open({viewerList, configList, paramModel, type, isHide}) {
            return new Promise(resolve => {
                this.showDialog = true;
                this.transparent = isHide;
                this.type = type;
                this.$nextTick(() => {


                    this.$refs.templateFillPage && this.$refs.templateFillPage.initPage({
                        viewerList,
                        configList,
                        paramModel,
                        interviewType:  +this.type
                    });
                    if (isHide) {
                        this.$nextTick(() => {
                            if (!this.$refs.interviewEvaluation) return;
                            const previewCont = this.$refs.interviewEvaluation.outerHTML;
                            resolve(previewCont);
                            this.handleClose();
                        });
                    } else {
                        resolve(true);
                    }
                });
            });

        },
        handleClose() {
            this.showDialog = false;
        },
        async getDom({viewerList, configList, paramModel, type}) {
            return this.open({viewerList, configList, paramModel, type, isHide: true});
        }
    }
};
</script>
