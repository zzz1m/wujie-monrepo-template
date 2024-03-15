<template>
<div class="state-in-table">
    <div class="state-type-wrapper" :class="stateClassName">
        {{ stateName }}
    </div>
</div>
</template>
    
<script>
import { getImgPreviewPath } from '@/utils/util';
export default {
    name: 'State',
    props: {
        row: {
            type: Object,
            default: () => {}
        },
        stateKey: {
            type: String,
            default: ''
        },
        showStateMap: {
            type: Object,
            default: () => {}
        },
        stateName: {
            type: String,
            default: ''
        }
    },
    computed: {
        stateType() {
            if (!this.stateKey) {
                return '';
            }
            return Object.keys(this.showStateMap).find(state => {
                let stateList = this.showStateMap[state] || [];
                return stateList.includes(this.row[this.stateKey]);
            }) || '';
        },
        stateClassName() {
            return 'state-type-' + this.stateType;
        }
    },
    data () {
        return {
                
        };
    },
    
    created () {
        this.getImgPreviewPath = getImgPreviewPath;
    },
    
    methods: {
            
    }
};
</script>