<template>
<div>
    <form-item>
        <span class="label">选项说明</span>
        <ui-switch 
            v-model="config.hasExplain" size="small"
            :true-value="true" :false-value="false"
        />
    </form-item>
    <form-item>
        <span class="label">选项添加填空框</span>
        <ui-switch 
            v-model="config.hasExtra" size="small"
            :true-value="true" :false-value="false"
        />
    </form-item>
    <!-- todo v-show -->
    <template v-if="config.hasExtra">
        <FormatConfig :config="config" key-name="extraRule" />
        <form-item>
            <span class="label">字数限制</span>
            <ui-switch 
                v-model="config.hasExtraLimit" size="small"
                :true-value="true" :false-value="false"
            />
        </form-item>
        <form-item v-if="config.hasExtraLimit">
            <ui-input-number 
                v-model="config.extraLimit"
                :precision="0"
                size="small" style="width: 60px;"
                :min="1" :max="9999" :step="1"
            ></ui-input-number>
            <span class="label">字以内</span>
        </form-item>
        <form-item>
            <span class="label">该空可不填</span>
            <ui-switch 
                v-model="config.extraRequired" size="small"
                :true-value="false" :false-value="true"
            />
        </form-item>
    </template>
</div>
</template>

<script>
import FormatConfig from './format.vue';
export default {
    name: 'OptionConfig',
    components: {
        FormatConfig
    },
    props: {
        config: { type: Object, default: null }
    }
    
};
</script>