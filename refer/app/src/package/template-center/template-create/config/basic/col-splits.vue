<template>
<form-item class="col">
    <span class="label">控件占比</span>
    <ui-tab v-model="compWidth" class="select-tab">
        <ui-tab-pane v-for="tab in STRATEGY_WIDTH_PERCENT" :key="tab.value" 
            :name="`${tab.value}`" :label="tab.label" size="small"
        />
    </ui-tab>
</form-item>
</template>

<script>
// 分栏组件的宽度配置
import { STRATEGY_WIDTH_PERCENT } from '@/package/template-center/model/const';

export default {
    name: 'ColSplitsConfig',
    inject: ['vm'],
    props: {
        config: { type: Object, default: null }
    },
    data() {
        return {
            STRATEGY_WIDTH_PERCENT
        };
    },
    computed: {
        // 宽度相关
        viwerTarget() {
            if(!this.config.parentId) return;
            function getView(id, list) {
                let target = list.find(t => t.id === id);
                if(target) return target;
                for(let i = 0; i < list.length; i++) {
                    target = getView(id, list[i].children || []);
                    if(target) break;
                }
                return target;
            }
            const viewerParent = getView(this.config.parentId, this.vm.viewerList);
            return viewerParent && viewerParent.children && viewerParent.children.find(e => e.id === this.config.id);
        },
        compWidth: {
            get() { 
                return this.viwerTarget && `${this.viwerTarget.splits}`;
            },
            set(val) { 
                if(!this.viwerTarget) return;
                this.$set(this.viwerTarget, 'splits', Number(val)); 
            }
        }
    }
};
</script>