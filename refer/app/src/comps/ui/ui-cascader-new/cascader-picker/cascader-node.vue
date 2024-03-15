<template>
<div class="cascader-panel">
    <ul>
        <template v-for="child in node.childNodes">
            <li v-show="child.visible" :key="child.nodeKey"
                :class="['cascader-item', 
                         child.checked ? 'active' : '',
                         child.isLeaf ? 'leaf' : ''
                ]"
                @mouseover="expandChildNodes(child)"
                @click.stop="clickNode(child)"
            >
                <span :title="child.label"> {{ showFullLabel?child.label:  calcLabel(child.label) }}</span>
                <svg-icon icon-class="icon-checked"></svg-icon> 
            </li>
        </template>
    </ul>
    <cascader-node v-if="!isEmpty" :node="curNode"></cascader-node>
</div>
</template>

<script>
import { zhLength } from '@/utils/util';

export default {
    name: 'CascaderNode',
    props: {
        node: {
            type: Object,
            default: () => ({})
        }
    },
    inject: ['showFullLabel'],
    computed: {
        isEmpty() {
            if( !this.curNode ) return true;
            const { childNodes } = this.curNode;
            return !childNodes || childNodes.length === 0 || childNodes.every(({visible}) => !visible);
        }
    },
    data() {
        return {
            curNode: null
        };
    },
    methods: {
        calcLabel( label ){
            const length = zhLength( label );
            return length > 15 ? label.slice(0,15) + '...' : label;
        },
        expandChildNodes(node) {
            const store = this.tree.store;
            this.curNode = node; // 存储当前组件下级需要的node节点信息

            // 初始化页面视图 
            if( this.tree.currentNode && node.level <= this.tree.currentNode.level && node !== this.tree.currentNode.parent ){
                this.initNext2Level( node.level );
            }

            node.expand();
           
            this.handleMouseover(node);
            
            store.setCurrentNode(node);
            this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
            this.tree.currentNode = node; 
        },
        handleMouseover(node) {
            this.clearSiblingsChecked(node);
            this.handleParentNode(node.parent);
        },
        clickNode(node) {
            // 设置当前选中节点
            const store = this.tree.store;
            const tolevel = node.level == store.stage || node.isLeaf || store.allowCrossLevel;

            // 末级节点
            if(store.onlyLeaf && !node.isLeaf) return;

            // 处理兄弟节点
            if( !store.multiple && tolevel){ // 单选
                this.clearSiblingsChecked(node, true);
                node.setChecked(true, false);
            }else {
                const deep = node.checked; // 只有取消选中的时候，才会过渡给子级
                node.setChecked(!node.checked, deep);
            }

            // 处理父节点及兄弟节点
            if( node.checked && node.parent && tolevel){ // 如果当前节点选中，父节点同步选中
                this.handleParentNode(node.parent, true);
            }
            if( !node.checked && store.multiple ){
                this.cancelParentNodeCheced(node);
            }

            if( !store.multiple && tolevel ){ // 在第几层级关闭 || 叶子节点
                this.tree.$emit('update-close', node.data);
                this.tree.close();
                this.tree.$emit('node-click', node.data, node, store);
            }else if(store.multiple){
                this.tree.$emit('node-click', node.data, node, store);
            }

        },
        // 处理子节点
        initNext2Level(level) {
            const store = this.tree.store;
            Object.values(store.nodesMap).forEach(node => {
                if( node.level > level + 1 ){
                    node.visible = false;
                }
            });
        },
        // 处理父节点
        handleParentNode(parentNode, clearcache = false) {
            if( parentNode.level == 0 ) return;
            const store = this.tree.store;
            // 处理父节点的兄弟节点
            if( !store.multiple ){
                this.clearSiblingsChecked(parentNode, clearcache);
            }
            parentNode.setChecked(true, false);
            parentNode.parent && this.handleParentNode( parentNode.parent, clearcache );
        },
        // 取消父元素的旋转
        cancelParentNodeCheced(node) {
            const parentNode = node.parent;
            const hasCheckedSibling = node.siblings.some(item => item.checked);
            if(!hasCheckedSibling && parentNode){
                parentNode.setChecked(false, false);
                this.cancelParentNodeCheced( parentNode );
            }
        },
        // 处理兄弟节点 
        // clearcache 是否清除历史的信息
        clearSiblingsChecked(node, clearcache = false) {
            const store = this.tree.store;
            node.siblings.forEach(sibling => {
                if( clearcache || !store.defaultCheckedKeys.includes(sibling.nodeKey) ){
                    sibling.setChecked(false, true);
                }
            });
        }
    },
    created() {
        const parent = this.$parent; // 父级组件
        if (parent.isCascader) {
            this.tree = parent;
        } else {
            this.tree = parent.tree;
        }
    }
};
</script>