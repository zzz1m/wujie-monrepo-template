<template>
<div class="pop-btn-wrapper">
    <span 
        v-for="item in showBtnList"
        :key="item.key"
        class="pop-btn" 
        @click="handleClick(item)"
    >
        <a v-if="item.path && (typeof(item.path) === 'string' ? item.path : item.path(data)).match(/^http/i)" :href="typeof(item.path) === 'string' ? item.path : item.path(data)" :target="item.target || '_self'">{{ item.render ? item.render(data) : item.name }}</a>
        <router-link v-else-if="item.path && !(typeof(item.path) === 'string' ? item.path : item.path(data)).match(/^http/i)" :to="typeof(item.path) === 'string' ? item.path : item.path(data)" :target="item.target || '_self'">{{ item.render ? item.render(data) : item.name }}</router-link>
        <template v-else>{{ item.render ? item.render(data) : item.name }}</template>
    </span>
   
    <ui-tooltip content="提示内容" placement="bottom-end" popper-class="pop-btn-tooltip" :open-delay="400">
        <ul slot="content" @click="toolBlur">
            <li 
                v-for="item in restBtnList" :key="item.key" 
                class="pop-tip-btn"
                @click="handleClick(item)"
            >
                <a v-if="item.path" :href="typeof(item.path) === 'string' ? item.path : item.path(data)" :target="item.target || '_self'">{{ item.render ? item.render(data) : item.name }}</a>
                <template v-else>{{ item.render ? item.render(data) : item.name }}</template>
            </li>
        </ul>
        <div v-if="showMore" class="pop-btn">
            <span class="op-rest"></span>
        </div>
    </ui-tooltip>
</div>
</template>
<script>
export default {
    props: {
        maxShow: {
            type: Number,
            default: 3
        },
        btnList: {
            type: Array,
            default: () => ([])
        },
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        
    },
    computed: {
        filterBtnList() {
            return this.btnList.filter(item => {
                if (typeof item.hidden === 'function') {
                    return !item.hidden(this.data);
                } else if (typeof item.hidden === 'boolean') {
                    return !item.hidden;
                } else {
                    return true;
                }
            });
        },
        showMore() {
            if (this.filterBtnList.length > this.maxShow) {
                return true;
            }
            return false;
        },
        showBtnList() {
            if (this.showMore) {
                return this.filterBtnList.slice(0, this.maxShow - 1 );
            } else {
                return this.filterBtnList.slice(0, this.maxShow);
            }
        },
        restBtnList() {
            return this.filterBtnList.slice(this.maxShow - 1);
        }
    },
    data() {
        return {

        };
    },
    mounted() {
    },
    methods: {
        handleClick(item) {
            this.$emit('op-click', item.key, this.data);
        },
        // tooltip点击消失
        toolBlur(e){
            let el = e.target;
            while(el.tagName.toLowerCase() != 'body'){
                let className = el.className;
                if(className&&className.indexOf('ui-tooltip-popper')>-1){
                    el.style.display = 'none';
                    break;
                }else{
                    el = el.parentNode;
                }
            }
        }
    }
};
</script>