<template>
<div class="form-attachment">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <!-- filesize-unit="Kb" -->
        <ui-upload
            ref="upload" action="/api/common/interview/upload.json"
            custom
            :disabled="readonly" :exname="viewConfig.suffix.join(',')"
            :cropper="false"
            :filesize="viewConfig.singleSizeLimit"
            multiple
            :total="viewConfig.totalLimit" :upload-fieled="{name:'size',value: viewConfig.singleSizeLimit}" :uploaded-num="valueConfig[PARAM_COMMON_VALUE_CODE].length"
            @uploadEnd="uploadEnd"
            @uploadStart="uploadStart"
        >
            <button v-if="!readonly" class="btn btn-primary btn-outline" type="button" @click="mockClick"> <i v-if="isLoading" class="ui-icon-loading"></i><svg-icon v-else class="icon" icon-class="icon-upload-new" />上传附件</button>
        </ui-upload>
        <p class="form-tip">格式支持：{{ viewConfig.suffix.join('、').replace(/\./g, '') }}{{ `，${viewConfig.singleSizeLimit > 0 ? `单个文件不超过${viewConfig.singleSizeLimit}M，` : ''}` }}{{ `${viewConfig.totalLimit > 0 ? `最多上传${viewConfig.totalLimit}个文件` : ''}` }}</p>
        <ul class="attachment-list">
            <li v-for="(attachment, index) in valueConfig[PARAM_COMMON_VALUE_CODE]" :key="index" class="attachment-list-content">
                <div class="attachment-name">
                    <svg-icon :icon-class="getIconName(attachment.relativePath)"></svg-icon>
                    <div class="attachment-title">
                        <nari-tooltip :value="getAttaName(attachment.relativePath)" />
                    </div>
                </div>
                <div class="attachment-operation">
                    <router-link class="text-primary middle" target="_blank" :to="`/api/common/file/preview.json?ossPath=${attachment.relativePath.split('||')[1]}`">
                        <div class="icon-wrapper">
                            <svg-icon icon-class="file-view"></svg-icon>
                        </div>
                    </router-link>
                    <div v-if="!readonly" class="icon-wrapper attachment-delete" @click="delAttachment(index)">
                        <svg-icon class="resume-evaluate-icon recruit-delete" icon-class="file-delete"></svg-icon>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import { getIconName } from '@noah/tools/src/utils/icon.js';
//todo 这个mixin 是干嘛用的
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';

export default {
    name: 'Attachment',
    mixins: [Mixin],
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
    },
    created() {
        this.getIconName = getIconName;
    },
    mounted() {
    },
    methods: {
        /**
         * @description: 获取附件名防范
         * @param {String} attachment 附件全称
         * @return {String} 附件名
         */
        getAttaName(attachment) {
            if (!attachment) { return '';}
            return attachment.split('||')[0];
        },
        /**
         * @description: 附件上传开始
         * @return {*}
         */
        uploadStart() {
            this.isLoading = true;
        },
        /**
         * @description: 附件下载结束
         * @param {Object} data 接口返回数据对象
         */
        uploadEnd({ data }) {
            const res = data;
            this.isLoading = false;
            if (res.success) {
                let fileKeys = [...this.valueConfig[this.PARAM_COMMON_VALUE_CODE]];
                fileKeys.push(res.root);
                this.$emit('on-change', this.viewId, fileKeys);
                this.$toast({ content: '上传成功', type: 'success' });
            } else {
                this.$toast({ content: res.message || '上传失败', type: 'error' });
            }
        },
        /**
         * @description: 删除附件
         * @param {Number} index 附件下标
         */
        delAttachment(index) {
            let fileKeys = [...this.valueConfig[this.PARAM_COMMON_VALUE_CODE]];
            fileKeys.splice(index, 1);
            this.$emit('on-change', this.viewId, fileKeys);
        },
        // 附件模拟点击
        mockClick() {
            this.$refs.upload.mockClick();
        }
    }
};
</script>
