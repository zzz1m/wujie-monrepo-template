<template>
<div class="page-evaluate-fill-entry">
    <component :is="fillComp" :detail-page="true" />
</div>
</template>

<script>
import Entry2021OrBefore from './entry-2021-or-before';
import Entry2022 from '../evaluate-fill-entry/entry-2022';
export default {
    name: 'EvaluateFillEntry',
    // components: {
    //     EvaluationFill
    // },
    data () {
        return {
            
        };
    },
    computed: {
        kpiKey() {
            return this.$route.query.kpiKey;
        },
        fillComp() {
            if (this.kpiKey.includes('2022')) {
                return Entry2022;
            }
            return Entry2021OrBefore;
        }    
    },
    created () {
    },

    methods: {
        
    }
};
</script>