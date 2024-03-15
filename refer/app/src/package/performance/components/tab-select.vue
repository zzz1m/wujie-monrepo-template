<template>
<div class="tab-select">
    <div class="select-box" :style="{'left': left + 'px', 'width': width + 'px'}"></div>
    <template v-for="(item, index) in tabs">
        <div :id="random + index" :key="index" class="select-item" :class="{'tab-active': active === item.value}" @click="setActive(item.value)">{{ item.name }}</div>
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
            random: 'tab' + Math.floor(Math.random() * 10000) + ''
        };
    },
    watch: {
        active: {
            handler() {
                this.renderLine();
            }
        }
    },
    mounted() {
        this.renderLine();
    },
    methods: {
        renderLine() {
            const index = this.tabs.findIndex(item => item.value === this.active);
            this.$nextTick(() => {
                const dom = document.querySelector('#' + this.random + index);
                if (dom) {
                    this.width = dom.clientWidth;
                    this.left = dom.offsetLeft;
                }
            });
        },
        setActive(value) {
            this.$emit('update:active', value);
            this.$emit('change', value);
        }
    }
    
};
</script>

<style lang="less" scoped>
.tab-select {
    padding: 9px 0px;
    position: relative;
    overflow: hidden;
    display: flex;
    height: 40px;
    box-shadow: inset 0px -1px 0px 0px #E5E6EB;
    margin-top: -14px;
    margin-bottom: 20px;
    .select-item {
        height: 22px;
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
        margin-right: 32px;
        cursor: pointer;
        &:hover {
            color: #00A6A7;
        }
    }
    .tab-active {
        color: #00A6A7;
        font-weight: 500;
    }
    .select-box {
        height: 2px;
        background: #00BEBD;
        border-radius: 2px;
        position: absolute;
        bottom: 0px;
        transition: all .2s;
    }
}
</style>
