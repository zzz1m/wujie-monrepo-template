<template>
<div class="content">
    <div class="relation-title">
        <div v-select :contenteditable="true" class="rich-text-area" @blur="onBlur($event)">{{ config.title }}</div>
    </div>
    <template v-if="config.printStyle === 1">
        <div v-if="config.fieldsList.length" class="relation-row">
            <ui-table>
                <thead slot="header">
                    <th v-for="item in config.fieldsList" :key="item.code">
                        <div class="label">  {{ item.label }}</div>
                    </th>
                </thead>
                <tbody slot="body">
                    <tr>
                        <td v-for="item in config.fieldsList" :key="item.code"></td>
                    </tr>
                </tbody>
            </ui-table>
        </div>
    </template>
    <template v-else>
        <div v-if="config.fieldsList.length" class="relation-column">
            <ul class="head">
                <li v-for="item in config.fieldsList" :key="item.code">{{ item.label }}</li>
            </ul>
            <ul class="body">
                <li v-for="item in config.fieldsList" :key="item.code + 'l'"></li>
            </ul>
        </div>
    </template>
</div>
</template>
<script>
export default {
    name: 'MultipleCreate',
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