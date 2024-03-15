<template>
<form-item>
    <span class="label">自定义角色名</span>
    <ui-input v-model.trim="title" 
        style="width: 83px;" placeholder=""
        size="small"
        type="text" @on-blur="onBlur('title')"
    ></ui-input>
</form-item>
</template>

<script>
export default {
    name: 'InterviewCustomConfig',
    props: {
        config: { type: Object, default: null }
    },
    watch: {
        'config.id': {
            handler: function() {
                this.title = this.config.title;
            }
        }
    },
    data() {
        return {
            title: this.config.title
        };
    },
    methods: {
        onBlur(type) {
            this.config[type] = this[type];
        }
    }
};
</script>