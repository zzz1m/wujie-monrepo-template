<template>
<div class="performance-level-wrapper">
    <span class="performance-level-score"> {{ result }} </span>
</div>
</template>

<script>
export default {
    name: 'PerformanceScore',
    props: {
        result: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            
        };
    },

    created () {
        
    },

    methods: {
        
    }
};
</script>