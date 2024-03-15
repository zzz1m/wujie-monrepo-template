<template>
<div :class="['cascader-viewer', filterable ? 'filterable' : '', className, showPicker && 'show-picker' ]" 
    :style="styles"
>
    <!-- 过滤支持选择 -->
    <ui-select v-if="filterable" ref="filter" 
        v-model="checkedDicts" class="filterabl-input" placeholder="请输入关键字"
        clearable filterable remote
        :remote-method="dictSearchByKeyword"
        @on-open-change="handleSelectOpenChange"
        @click.native.stop
    >
        <template v-if="fullDictList && fullDictList.length > 0 ">
            <ui-option v-for="item in fullDictList"
                :key="item.dictCodeFullPath"
                :class="{'active': filterChecked(item.dictCodeFullPath) }"
                :value="item.dictCodeFullPath" @click.native="changeDict(item)"
            >{{ item.dictNameFullPath }}</ui-option>
        </template>
    </ui-select>

    <cascader-node v-if="!isEmpty && showPicker" 
        :style="{display: showDictSelector ? 'block' : 'none' }"
        :node="root"
    ></cascader-node>

    <!-- 无数据 -->
    <div v-else class="data-blank">
        <span class="empty-text">{{ emptyText || '暂无数据' }}</span>
    </div>
</div>
</template>

<script>
import CascaderStore from './model/cascader-store';
import CascaderNode from './cascader-node';
import { _dictSearchByKeyword } from '@/services/dashboard/common';
import { transferIndex, transferIncrease } from '@/utils/transfer-queue';
import { deepCopy } from '@/utils/object';

let Popper;
import('popper.js/dist/umd/popper').then(res => {
    Popper = res.default;
});



let timer = null;

export default {
    name: 'UiCascaderPicker',
    components: { CascaderNode },
    props: {
        nodeKey: String,
        emptyText: String,
        lazy: Boolean, // 是否懒加载数据
        load: Function, // 加载数据函数
        multiple: { // 是否允许多选
            type: Boolean,
            default: true
        },
        stage: { // 在第几层级关闭 
            type: [String, Number],
            default: 3
        }, 
        props: {
            type: Object,
            default: () => ({
                children: 'children',
                label: 'name',
                disabled: 'disabled'
            })
        },
        defaultCheckedKeys: {
            type: Array
        },
        data: {
            type: Array
        },
        filterable: Boolean,
        filterDataFn: Function,
        onlyLeaf: Boolean,
        allowCrossLevel: Boolean,
        dictType: String,
        cacheCheckedDicts: {
            type: Array,
            default: () => ([])
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        className: String,
        transfer: Boolean,
        showPicker: Boolean
    },
    computed: {
        isEmpty() {
            const { childNodes } = this.root;
            return !childNodes || childNodes.length === 0 || childNodes.every(({visible}) => !visible);
        },
        cacheCheckedDictsValues() {
            return this.cacheCheckedDicts.map(item => item.value);
        },
        styles() {
            let style = {};
            if (this.transfer) style['z-index'] = 1060 + this.tIndex;
            return style;
        }
    },
    watch: {
        data: {
            deep: true,
            handler(newval, oldval) {
                if( newval && newval.length > 0 && this.root){
                    if( typeof this.root.setData === 'function' ){
                        this.root.setData( newval );
                    }
                }
            }
        }
    },
    data() {
        return {
            isCascader: true,
            store: null,
            checkedDicts: '',
            fullDictList: [],
            showDictSelector: true, // 是否展示字典，当过滤的时候需要隐藏掉
            tIndex: this.handleGetIndex(),
            popper: null,
            popperStatus: false,
            root: {}
        };
    },
    created() {
        this.$on('on-update-popper', this.update);
        this.$on('on-destroy-popper', this.destroy);
        this.resetStore();

    },
    beforeDestroy() {
        if (this.popper) {
            this.popper.destroy();
        }
        this.root = null;
        this.store = null;
    },
    methods: {
        filterChecked( dictCodeFullPath ){
            return this.cacheCheckedDictsValues.some(value => {
                return value === dictCodeFullPath || dictCodeFullPath.endsWith( value );
            });
        },
        resetStore(){
            const {
                nodeKey,data,props,onlyLeaf,
                lazy,load,multiple,stage,
                defaultCheckedKeys,
                allowCrossLevel
            } = this;
            this.store = new CascaderStore({
                nodeKey, data,lazy,load,props,onlyLeaf,
                defaultCheckedKeys,multiple,stage,allowCrossLevel
            });
            this.root = this.store.root;
        },

        getCheckedNodes(leafOnly) {
            return this.store.getCheckedNodes(leafOnly);
        },
        getCheckedKeys(leafOnly) {
            return this.store.getCheckedKeys(leafOnly);
        },  
        getLinkCheckedNodes(){
            let checkedNodes = [];
            const nodesMap = this.store.nodesMap;
            Object.keys(nodesMap).forEach(key => {
                const node = nodesMap[key];
                if( node.level === 1 ){
                    const { nodeKey, label, childNodes, checked } = node;
                    checkedNodes.push({
                        nodeKey, label, childNodes, checked 
                    });
                }
            });
            const traverse = function(arr) {
                return arr.filter(item => item.checked).map(cell => {
                    const { nodeKey, label, childNodes, checked } = cell;
                    const obj = { nodeKey, label, checked };
                    if( childNodes && childNodes.length ){
                        obj.childNodes = traverse(childNodes);
                    }
                    return obj;
                });
            };
            const result = traverse( checkedNodes );
            return result;
        },
        close() {
            this.$parent.hidePicker();
        },
        refreshCheckedNodes(checkedKeys) {
            this.store.defaultCheckedKeys = checkedKeys;
            this.$nextTick(() => {
                this.updateCheckedNodes();
            });
        },
        resetUnusefulCheckedNodes() {
            Object.keys(this.store.nodesMap).forEach(key => {
                const node = this.store.nodesMap[key];
                if( node.checked && !this.store.defaultCheckedKeys.includes(node.nodeKey) ){
                    node.setChecked(false, true);
                }
            });
        },
        // 更新选中信息
        updateCheckedNodes() {
            Object.keys(this.store.nodesMap).forEach(key => {
                const node = this.store.nodesMap[key];
                if( this.store.defaultCheckedKeys.includes(node.nodeKey) ){
                    node.setChecked(true, false);
                }
            });
        },
        // 根据关键字查询字典的路径信息
        dictSearchByKeyword(keyword) {
            if(timer) clearTimeout( timer );
            const dictType = this.dictType;
            try {
                timer = setTimeout(async () => {
                    const { success, root } = await _dictSearchByKeyword({keyword,dictType });
                    if (success && root) {
                        this.fullDictList = this.filterDataFn ? this.filterDataFn(root || []) : (root || []);
                    }
                }, 100);
            } catch (e) {}
        },
        // 处理下拉框展示隐藏
        handleSelectOpenChange(state) {
            this.showDictSelector = !state;
            this.$nextTick(() => {
                const _select = this.$refs.filter?.$el;
                if(  !_select ) return;

                const width = _select.offsetWidth;
                const _dropDown = _select.querySelector('.ui-select-dropdown');
                if( !_dropDown ) return;

                _dropDown.style.width = `${width}px`;
                _dropDown.style.left = 0;
            });
        },
        changeDict(item) {
            if(!item) return;
            item.value = item.dictCodeFullPath;
            item.label = item.dictNameFullPath;
            this.$emit('on-select-dict', item, this.multiple);
        },
        handleGetIndex() {
            transferIncrease();
            return transferIndex;
        },

        toggleInput(){
            this.$refs?.filter?.clearSingleSelect();
        },
        update() {
            this.toggleInput();

            if (this.popper) {
                this.$nextTick(() => {
                    this.popper.update();
                    this.popperStatus = true;
                });
            } else {
                this.$nextTick(() => {
                    const viewWidth = this.$parent.$el.offsetWidth;
                    // this.$el.style.width = `${viewWidth}px`;
                    this.$el.style.minWidth = `${viewWidth}px`;
                    this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                        placement: this.placement,
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            }
                        },
                        onCreate: () => {
                            this.resetTransformOrigin();
                            this.$nextTick(this.popper.update());
                        },
                        onUpdate: () => {
                            this.resetTransformOrigin();
                        }
                    });
                });
            }
        },
        destroy() {
            if (!this.popper) return;
            let timer = setTimeout(() => {
                if (this.popper && !this.popperStatus) {
                    this.popper.destroy();
                    this.popper = null;
                }
                this.popperStatus = false;
                clearTimeout( timer );
                timer = null;
            }, 300);
        },
        resetTransformOrigin() {
            if (!this.popper) return;

            let x_placement = this.popper.popper.getAttribute('x-placement');
            let placementStart = x_placement.split('-')[0];
            let placementEnd = x_placement.split('-')[1];
            const leftOrRight = x_placement === 'left' || x_placement === 'right';
            if (!leftOrRight) {
                this.popper.popper.style.transformOrigin =
                    placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom';
            }
        }

    }
};
</script>