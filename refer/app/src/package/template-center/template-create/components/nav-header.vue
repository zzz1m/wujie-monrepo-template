<template>
<div class="nav-bar-wrap">
    <div class="back-interview">
        <span v-if="!noBack" class="btn-back" @click="handleGoBack">返回</span>
        <h2 class="title">{{ pageTitle }}</h2>
    </div>
    <nav v-if="!showPreviewPage">
        <span class="option" :class="{ active: value === 0}" @click.stop="changeTab(0)">模板配置</span>
        <i class="ui-icon-arrow-right"></i>
        <span class="option" :class="{ active: value === 1}" @click.stop="changeTab(1)">关联逻辑配置</span>
    </nav>
    <div class="nav-btns">
        <button v-if="!showPreviewPage" :disabled="disablePreview" class="btn btn-primary btn-outline" @click.stop="$emit('preview')">预览</button>
        <button class="btn btn-primary btn-save" :disabled="isLoading" @click.stop="$emit('save')"><i v-if="isLoading" class="ui-icon-loading"></i>{{ showPreviewPage ? '提交' : '保存' }}</button>
    </div>
</div>
</template>

<script>
let timer = null;
export default {
    name: 'NavHeader',
    props: {
        value: { type: Number, default: 0 },
        beforeChange: { type: Function, default: null },
        showPreviewPage: {type: Boolean},
        pageTitle: { type: String, default: '' },
        isLoading: { type: Boolean, default: false }
    },
    inject: ['vm'],
    computed: {
        disablePreview() {
            return !this.vm.viewerList.length;
        },
        noBack() {
            return !!this.$route.query.noBack;
        }
    },
    mounted() {
        timer = setTimeout(() => {
            updatePageTitle( this.pageTitle, `BZL Noah - ${this.pageTitle}` );
            clearTimeout(timer);
        }, 500);
    },
    methods: {
        async changeTab(val) {
            let go = this.beforeChange ? await this.beforeChange(val) : true;
            go && this.$emit('input', val);
        },
        handleGoBack() {
            if(this.showPreviewPage) {
                if(this.$route.query.fromPage && this.$route.query.isFromList) {
                    this.$router.replace(decodeURIComponent(this.$route.query.fromPage));
                    return;
                }
                this.$router.go(-1);
            } else if(this.$route.query.fromPage) {
                this.$router.replace(decodeURIComponent(this.$route.query.fromPage));
            } else {
                this.$router.replace('/dashboard/interview/order/template');
            }
        }
    }
};
</script>
