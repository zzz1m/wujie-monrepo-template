<template>
<div class="empty-page">
    <svg-icon icon-class="performance-empty" class="icon" />
    <div class="text">该阶段暂未开始</div>
</div>
</template>

<script type="text/javascript">
export default {
    
};
</script>

<style lang="less" scoped>
.empty-page {
    display: flex;
    margin: auto;
    flex-direction: column;
    position: relative;
    flex: 1;
    z-index: 1;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 14px;
    justify-content: center;
    align-items: center;
    .icon {
        width: 180px;
        height: 180px;
    }
    .text {
        font-size: 16px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
        text-align: center;
    }
}
</style>
