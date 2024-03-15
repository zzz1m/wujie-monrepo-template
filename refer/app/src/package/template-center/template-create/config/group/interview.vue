<template>
<Empty v-if="isEmpty" />
<div v-else>
    <form-item>
        <span class="label">必填</span>
        <ui-switch 
            v-model="config.required" size="small"
            :true-value="true" :false-value="false"
        />
    </form-item>
    <form-item v-if="isTarget">
        <span class="label">自定义目标名</span>
        <ui-input v-model.trim="title" 
            style="width: 83px;" placeholder=""
            size="small"
            type="text" @on-blur="onBlur('title')"
        ></ui-input>
    </form-item>
    <form-item v-if="!noMulti">
        <span class="label">允许添加多个</span>
        <ui-switch 
            v-model="config.multiple" size="small"
            :true-value="true" :false-value="false"
        />
    </form-item>
</div>
</template>

<script>
import { TYPE_GROUP_INTERVIEW_ASSESSMENT,  TYPE_GROUP_INTERVIEW_TARGET, TYPE_GROUP_INTERVIEW_ONESELF } from '@/package/template-center/model/const';
import Empty from '../basic/empty.vue';
export default {
    name: 'InterviewConfig',
    components: {
        Empty 
    },
    props: {
        config: { type: Object, default: null }
    },
    data() {
        return {
            title: this.config.title
        };
    },
    computed: {
        noMulti() {
            return [ TYPE_GROUP_INTERVIEW_ONESELF,  TYPE_GROUP_INTERVIEW_TARGET ].includes(this.config.type);
        },
        isTarget() {
            return TYPE_GROUP_INTERVIEW_TARGET === this.config.type;
        },
        isEmpty() {
            return TYPE_GROUP_INTERVIEW_ASSESSMENT === this.config.type;
        }
    },
    methods: {
        onBlur(type) {
            if(type === 'title') {
                this.config.title = this.title;
            }
        }
    }
};
</script>