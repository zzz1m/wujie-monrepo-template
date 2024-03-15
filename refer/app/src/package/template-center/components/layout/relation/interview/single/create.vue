<!--
 * @Author: makai makai@kanzhun.com
 * @Date: 2022-10-25 14:28:54
 * @LastEditors: makai makai@kanzhun.com
 * @LastEditTime: 2022-10-25 18:29:44
 * @FilePath: /twl-oa-vue/dashboard/src/package/template-center/components/layout/relation/interview/single/create.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
<div class="content">
    <div class="relation-title">
        <div v-select :contenteditable="true" class="rich-text-area" @blur="onBlur($event)">{{ config.title }}</div>
    </div>
    <div class="single-select" style="width: 50%"></div>
</div>
</template>
<script>
export default {
    name: 'SingleCreate',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    directives: {
        
    },
    data() {
        return {
            
        };
    },
    created() {
        
    },
    computed: {
        
    },
    mounted() {
        
    },
    methods: {
        onBlur(e) {
            const innerText = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
            if(!innerText) {
                e.target.innerText = this.config.title;
            } else {
                e.target.innerHTML = innerText;
                this.$set(this.config, 'title', innerText);
            };
        }
    }
};
</script>