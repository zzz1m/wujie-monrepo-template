<template>
<span class="time-range">
    <span>起止时间：<slot></slot></span>
</span>
</template>

<script type="text/javascript">
export default {
    
};
</script>

<style lang="less" scoped>
.time-range {
    display: inline-block;
    padding: 0 8px;
    height: 24px;
    background: #fdf5e8;
    border-radius: 4px;
    font-weight: 400;
    color: #995C1A;
    line-height: 24px;
}
</style>
