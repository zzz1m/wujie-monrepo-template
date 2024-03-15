<template>
<Empty v-if="isEmpty" />
<div v-else>
    <form-item>
        <span class="label">{{ groupName }}</span>
        <ui-input v-model.trim="title" 
            style="width: 83px;" placeholder=""
            size="small"
            type="text" @on-blur="onBlur('title')"
        ></ui-input>
    </form-item>
</div>
</template>
    
<script>
import Empty from '../basic/empty.vue';
export default {
    name: 'InterviewConfig',
    components: {
        Empty 
    },
    props: {
        config: { type: Object, default: null },
        groupList: { type: Array, default: () => []}
    },
    data() {
        return {
            title: this.config.title
        };
    },
    computed: {
        isEmpty() {
            return false;
        },
        groupName() {
            const list = this.groupList.find(t => t.role === this.config.role)?.comps;
            return list.find(e => e.type === this.config.type)?.name;
        }
    },
    created() {
        console.log(this.config, this.groupList);
    },
    methods: {
        onBlur(type) {
            this.config[type] = this[type];
        }
    }
};
</script>