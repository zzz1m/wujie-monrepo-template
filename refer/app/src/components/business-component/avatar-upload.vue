<template>
<div class="upload-img-container business-upload-img-container">
    <ui-upload  
        ref="upload" 
        :cropper="cropper"
        :multiple="false"
        :filesize="filesize"
        filesize-unit="M"  
        custom
        :exname="exname"
        :action="action"
        :fixed-number="fixedNumber"
        @uploadEnd="uploadEnd"
    >
        <div :class="['upload-box', { 'is-uploaded': value }]" @click="mockClick">
            <template v-if="!value">
                <svg-icon class="upload-box-icon" icon-class="icon-upload-minus"></svg-icon>
                <div v-if="btnText" class="desc">{{ btnText }}</div>
            </template>
            <div v-else class="avatar">
                <img v-if="downLoadUrl" :src="imgUrl || iconUrl" alt="">
                <div v-else class="avatar-bg" :style="{ backgroundImage: `url('${relativePath ? getImgPreviewPath(value) : value}')` }"></div>
            </div>
            <div v-if="!disabled && value" class="reupload-img" @click.stop="mockClick()">
                重新上传
            </div>
            <div v-if="!disabled && value" class="del-img">
                <i class="ui-icon-close" @click.stop="handleDel()"></i>
            </div>
        </div>
    </ui-upload>
    <div class="tips">
        <slot name="tips"></slot>
    </div>
</div>
</template>
<script>
import { getImgPreviewPath } from '@/utils/util';
export default {
    props: {
        cropper: {
            type: Boolean,
            default: true
        },
        fixedNumber: {
            type: Array,
            default: () => ([800,500])
        },
        filesize: {
            type: Number,
            default: 1
        },
        exname: {
            type: String,
            default: 'jpg、jpeg、gif、bmp、png'
        },
        btnText: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        relativePath: {
            type: Boolean,
            default: false
        },
        action: {
            type: String,
            default: '/api/common/learning/upload.json'
        },
        iconUrl: {
            type: String,
            default: ''
        },
        downLoadUrl: {
            type: Boolean,
            default: false
        },
        value: String
    },
    data() {
        return {
            imgUrl: ''
        };
    },
    created() {
        this.getImgPreviewPath = getImgPreviewPath;
    },
    mounted() {
        const autoCropWidth = this.fixedNumber[0];
        if (this.$refs.upload && autoCropWidth) {
            this.$refs.upload.cropperProp.autoCropWidth = autoCropWidth;
        }
    },
    methods:{
        mockClick(){
            if (this.disabled) {
                return;
            }
            this.$refs.upload.mockClick();
        },
        handleDel() {
            this.$emit('input', '');
        },
        uploadEnd(res) {
            let nData = res.data || {};
            if (nData.success) {
                this.imgUrl = nData.root && nData.root.downLoadUrl;
                this.$emit('input', this.relativePath ? nData.root?.relativePath : nData.root?.reviewUrl);
            } else {
                this.$toast(nData.message || '上传失败', 'error');
               
            }
        }
    }
};
</script>