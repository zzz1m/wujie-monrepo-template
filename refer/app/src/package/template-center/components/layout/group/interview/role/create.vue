<template>
<div class="content">
    <div class="title">{{ config.title }}</div>
    <div class="flex group-content-row">
        <div v-select="{limit: 1000}" :contenteditable="true" class="rich-text-area" @blur="(e) => onBlur(e, 'labelName')">{{ config.labelName }}</div>
        <ui-select placeholder="请选择" :disabled="true" style="margin-right: 30px" />
        <div v-select="{limit: 1000}" :contenteditable="true" class="rich-text-area" style="margin-left: auto" @blur="(e) => onBlur(e, 'labelTime')">{{ config.labelTime }}</div>
        <ui-time-picker placeholder="请选择" :disabled="true" />
    </div>
</div>
</template>
<script>
export default {
    name: 'RoleCreate',
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
        onBlur(e, item) {
            const innerText = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
            if(!innerText) {
                let value = this.config[item];
                e.target.innerText = value;
            } else {
                e.target.innerHTML = innerText;
                this.$set(this.config, item, innerText);
            };
        }
    }
};
</script>