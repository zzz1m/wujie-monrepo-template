<template>
<div class="type-select">
    <div class="select-box" :style="{'left': left + 'px', 'width': width + 'px'}"></div>
    <template v-for="(item, index) in tabs">
        <div :id="random + index" :key="index" class="select-item" :class="{'tab-active': active === item.value}" @click="setActive(item.value)">{{ item.label }}</div>
        <div v-if="index < tabs.length - 1" :key="index + 'line'" class="select-line"></div>
    </template>
</div>
</template>

<script type="text/javascript">
export default {
    props: ['tabs', 'active'],
    data() {
        return {
            left: 0,
            width: 0,
            random: 'id' + Math.floor(Math.random() * 10000) + ''
        };
    },
    watch: {
        active() {
            this.renderLine();
        }
    },
    mounted() {
        this.renderLine();
    },
    methods: {
        renderLine() {
            const index = this.tabs.findIndex(item => item.value === this.active);
            const dom = document.querySelector('#' + this.random + index);
            if (dom) {
                this.width = dom.clientWidth;
                this.left = dom.offsetLeft;
            }
        },
        setActive(value) {
            this.$emit('update:active', value);
            this.$emit('change', value);
        }
    }
    
};
</script>

<style lang="less" scoped>
.type-select {
    background: #f6f7fb;
    border-radius: 2px;
    padding: 3px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    border-radius: 2px;
    .select-item {
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        text-align: center;
        float: left;
        position: relative;
        z-index: 1;
        cursor: pointer;
        line-height: 22px;
        border-radius: 1px;
        padding: 0 12px;
        &:hover {
            background: #ffffff;
        }
    }
    .tab-active {
        color: #00A6A7;
        font-weight: 500;
    }
    .select-line {
        width: 1px;
        height: 14px;
        background: #E5E6EB;
        float: left;
        margin: 4px 1px;
    }
    .select-box {
        height: 22px;
        background: #fff;
        border-radius: 2px;
        position: absolute;
        top: 3px;
        transition: all .2s;
    }
}
</style>
