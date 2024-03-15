<template>
<div 
    v-clickoutsider="hidePicker"
    class="ui-cascader-new"
>
    <div ref="reference" class="ui-cascader-reference">
        <!-- 输入框 -->
        <ui-input v-if="!limited" v-model="checkedVal"
            :class="['ctrl-input',
                     showPicker ? 'open' : '']"
            readonly :placeholder="placeholder"  :disabled="$attrs.disabled"
            @click.native="togglePicker"
        >
            <i v-show="!$attrs.disabled" 
                slot="suffix" :class="['icon-arrow', clearable && checkedVal ? 'ui-icon-circle-close' : 'ui-icon-arrow-down']" @click.stop="clear"
            ></i>
        </ui-input>
        <ui-tooltip v-if="limited"
            effect="dark" popper-class="ui-cascader-new-tooltip" placement="right-end" :content="checkedVal"
        >
            <ui-input v-model.trim="checkedVal"
                :class="['ctrl-input',
                         showPicker ? 'open' : '']"
                readonly :placeholder="placeholder" :disabled="$attrs.disabled" 
                @click.native="togglePicker"
            >
                <i v-show="!$attrs.disabled" 
                    slot="suffix" :class="['icon-arrow', clearable && checkedVal ? 'ui-icon-circle-close' : 'ui-icon-arrow-down']" @click.stop="clear"
                ></i>
            </ui-input>
        </ui-tooltip>
    </div>
        
    <!-- cascader数据展示 -->
    <cascader-picker v-show="showPicker" ref="cascader"
        v-transfer-dom v-bind="$attrs"
        :show-picker="showPicker"
        :default-checked-keys="value"
        :class="dropdownCls"
        :cache-checked-dicts="cacheCheckedDicts"
        :filterable="filterable"
        :filter-data-fn="filterDataFn"
        :data-transfer="transfer"
        :transfer="transfer"
        :placement="placement"
        @update-close="onClose"
        @node-click="handleClickDict"
        @on-select-dict="handleSelectDict"
    ></cascader-picker>
</div>
</template>

<script>
import CascaderPicker from './cascader-picker';
import { createTreeLink } from './cascader-picker/model/utils';
import { calcStrLength } from '@/utils/common';
import { remove } from '@/utils/dom';
import { oneOf } from '@/utils/util';
import { deepCopy } from '@/utils/object';
import Emitter from '@/mixins/emitter';

const calcCheckedVal = function(arr) {
    return arr.map(item => item.label).join('，');
};

const loadFn = function(node, load) {
    node.loading = true;
    const resolve = (children) => {
        node.loaded = true;
        node.loading = false;
        node.childNodes = [];
        node.doCreateChildren(children);
        node.updateLeafState();
    };
    load && load(node, resolve);
};

const calcFullNodeInfo = function( node = {}, store = {} ){
    const result = {
        value: '', label: ''
    };
    function calcFullCodePath( cnode = {} ){
        const { data = {} } = cnode;
        const nodeKey = store.nodeKey || 'dictCode';
        const dictCode = data[ nodeKey ];

        if( !dictCode ) return data.dictCodeFullPath;
        
        const codeArr = [ dictCode ];
        const getLinkCodePath = function( parentNode ){
            if(!parentNode || parentNode.level === 0 ) return;
            codeArr.unshift( parentNode.nodeKey );
            if( parentNode.parent ){
                getLinkCodePath( parentNode.parent );
            }
        };
        
        getLinkCodePath( cnode.parent );
        return codeArr.join('/');
    }

    function calcFullNamePath( cnode ){
        const { data = {} } = cnode;
        const nameKey = store.props.label || 'dictName';
        const dictName = data[ nameKey ];

        if( !dictName ) return data.dictNameFullPath;
        const codeArr = [ dictName ];
        const getLinkNamePath = function( parentNode ){
            if(!parentNode || parentNode.level === 0 ) return;
            codeArr.unshift( parentNode.label );
            if( parentNode.parent ){
                getLinkNamePath( parentNode.parent );
            }
        };
        
        getLinkNamePath( cnode.parent );
        return codeArr.join('/');
    }

    result.value = calcFullCodePath( node ) || '';
    result.label = calcFullNamePath( node ) || '';

    return result;
};

const filterMetaData = function( metaData = [], store = {} ){
    const nodesMap = store.nodesMap || {};
    if( !metaData || metaData.length < 1 ) return [];
    return metaData.map(function( item ){
        const { label, value } = item;

        // ps: 用于处理个别场景下没有传value的情形
        if(!value) {
            const curNode = getNodeByLabel(label);
            if( curNode ) item.value = curNode.data.dictCodeFullPath || curNode.nodeKey;
            return item;
        };

        const valueArr = value ? value.split('/') : [];
        if(valueArr.length < 1) return false;
        const [firstCode, secondCode, ...rest] = valueArr;

        const firstNode = nodesMap[firstCode];
        const secondNode = nodesMap[secondCode];

        // ps: 用于处理fullpath里第一个code不在当前字典列表里
        if( !firstNode && secondNode && secondNode.level === 1 ){
            const valIdx = value.indexOf('/');
            const labelIdx = label.indexOf('/');
            item.value = value.slice( valIdx + 1 );
            item.label = label.slice( labelIdx + 1 );
        }

        return item;
    }).filter( Boolean );

    function getNodeByLabel( label ){
        return Object.values(nodesMap).find(node => {
            return node.label === label
                || node.data.dictNameFullPath === label 
                || node.data.dictNameFullPath?.endsWith(label);
        });
    }

};

const filterCheckedCodes = function( codes = [] ){
    const arr = [];
    codes.forEach(item => {
        item = item.toString();
        if(!item.includes('/')) {
            arr.push( item );
        } else {
            [].push.apply(arr, item.split('/'));
        }
    });
    return Array.from( new Set(arr) );
};

export default {
    name: 'UiCascaderNew',
    inheritAttrs: false,
    mixins: [Emitter],
    components: { CascaderPicker },
    provide() {
        return {
            showFullLabel: this.showFullLabel
        };
    },
    props: {
        value: {
            type:Array,
            default: () => ([])
        },
        metaData: {
            type:Array,
            default: () => ([])
        },
        showFullLabel: {
            type: Boolean,
            default: false
        },
        clearable: Boolean,
        renderFormat: Function,
        preLoadable: { // 是否提前加载选中的子级数据
            type: Boolean,
            default: true
        },
        placeholder:{
            type: String,
            default: '请选择'
        },
        maxLength: {
            type: Number,
            default: 30
        },
        filterable: {
            type: Boolean,
            default: true
        },
        filterDataFn: Function,

        placement: {
            validator(value) {
                return oneOf(value, ['top', 'bottom', 'bottom-start']);
            },
            default: 'bottom-start'
        },
        transferClassName: String,
        transfer: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(newval, oldval) {
                this.$nextTick(() => {
                    const initCheckedNodes = (newval || []).filter(Boolean);
                    const checkedNodes = filterCheckedCodes( initCheckedNodes );
                    this.$refs.cascader && this.$refs.cascader.refreshCheckedNodes( checkedNodes );
                });
            }
        },
        metaData: {
            handler (newval, oldval) {
                try{
                    if( JSON.stringify(newval) === JSON.stringify(oldval) )return;
                    this.$nextTick(function(){
                        const result = filterMetaData(newval, this.$refs.cascader?.store);
                        if( this.value.length < 1 ){
                            const initCheckedNodes = result.map(item => item.value).filter(Boolean);
                            const checkedNodes = filterCheckedCodes( initCheckedNodes );
                            this.$refs.cascader && this.$refs.cascader.refreshCheckedNodes( checkedNodes );
                        }
                        this.initMeta(result);
                    });
                }catch(err){}
            },
            immediate: true,
            deep: true
        },
        showPicker(open){
            const event = open ? 'on-update-popper' : 'on-destroy-popper';
            this.broadcast('UiCascaderPicker', event);
        }
    },
    computed: {
        limited() {
            const length = calcStrLength( this.checkedVal );
            return length > this.maxLength;
        },
        dropdownCls() {
            return {
                ['ui-cascader-dropdown-transfer']: this.transfer,
                [this.transferClassName]: this.transferClassName
            };
        }
    },
    data() {
        return {
            showPicker: false,
            checkedVal: '',
            cacheCheckedDicts: []
        };
    },
    mounted() {
        let timer = setTimeout(() => {
            this.loadNodes();
            clearTimeout( timer );
            timer = null;
        }, 500);
    },
    beforeDestroy(){
        // ui-cascader-dropdown-transfer
        remove( this.$refs.cascader.$el );
    },
    methods: {
        initMeta(result = []) {
            this.cacheCheckedDicts = result;
            this.$nextTick(() => {
                this.checkedVal = this.renderFormat ? this.renderFormat( result ) : calcCheckedVal( result );
            });
        },
        hidePicker( event ) {
            if (this.showPicker && this.transfer & event) { 
                const { $el } = this.$refs.cascader || {};
                if ( $el === event.target || $el.contains(event.target) ) return;
            }

            if(!this.showPicker) return;
            this.showPicker = false;
            // this.onClose(null);
        },
        togglePicker() {
            if( this.$attrs.disabled ) return;
            this.showPicker = !this.showPicker;
            this.$refs.cascader && this.$refs.cascader.resetUnusefulCheckedNodes();
        },
        getCheckedKeys(onlyLeaf = false) {
            const cacheCheckedDicts = this.cacheCheckedDicts;
            let arr = cacheCheckedDicts.map(item => item.value).join('/');
            if( arr.length > 0 ){
                arr = arr.split('/');
            }
            const checkedKeys = Array.from( new Set( arr ) );

            // this.$emit('input', checkedKeys); todo 与initmeat合并触发
            return checkedKeys;
        },
        onClose(node) {
            const checkedKeys = this.getCheckedKeys();
            const metaData = this.getLinkCheckedNodes();
            this.$emit('on-close', node, metaData, checkedKeys);
        },
        
        loadNodes() {
            if(!this.preLoadable || !this.$refs.cascader) return;
            const { store } = this.$refs.cascader;
            const defaultCheckedKeys = this.getCheckedKeys();

            let level = 1;
            let timer = null;
            const load = function(arr = []) {
                const cacheArr = [...arr];
                arr = arr.filter(key => {
                    const node = store.nodesMap[key];
                    return node && node.level === level;
                });

                if( arr.length === 0 ) {
                    timer && clearTimeout(timer);
                    level = 1;
                    return;
                };
                
                Promise.all(
                    arr.map(async (nodekey) => {
                        const node = store.nodesMap[nodekey];
                        const idx = cacheArr.indexOf(nodekey);
                        cacheArr.splice(idx, 1);
                        if( node && !node.isLeaf ) {
                            return await loadFn(node, store.load);
                        }
                        return await true;
                    })
                ).then(function(){
                    level++;
                    timer = setTimeout(() => {
                        load(cacheArr);
                    }, 300);
                });
            };
            load( defaultCheckedKeys );
        },
        clear() {
            if(this.clearable && this.checkedVal) {
                this.$emit('input', []);
                this.initMeta([]);
                this.$emit('on-clear');
            }else {
                this.togglePicker();
            }
        },
        getLinkCheckedNodes(){
            return this.cacheCheckedDicts;
        },
        // 点击级连节点 - getLinkCheckedNodes
        handleClickDict(data, node, store) {
            // const linkCheckedNodes =  this.$refs.cascader.getLinkCheckedNodes(); 没办法读取没有参与node生成的数据 【禁止使用｜禁止使用｜禁止使用】
            // const result = createTreeLink( linkCheckedNodes, {value: 'nodeKey', label: 'label', children: 'childNodes'}  );

            if(!data) return;

            const result = calcFullNodeInfo( node, store );
            this.handleSelectDict( result, store.multiple );
        },
        // 处理过滤出来的下拉列表的点击
        handleSelectDict({value,label}, multiple) {
            let cacheCheckedDicts = this.cacheCheckedDicts;
            const oldCheckedDicts = deepCopy( cacheCheckedDicts );

            const curIdx = cacheCheckedDicts.findIndex(item => {
                return item.value === value || value.endsWith( item.value );
            });
            if( curIdx < 0 ){
                if( multiple ){ // 多选
                    cacheCheckedDicts.push({value, label});
                }else {//单选
                    cacheCheckedDicts = [{value, label}];
                }
            }else {
                cacheCheckedDicts.splice(curIdx, 1);
            }

            // 更新checked 的keys
            let arr = cacheCheckedDicts.map(item => item.value).join('/');
            if( arr.length > 0 ){
                arr = arr.split('/');
            }
            const checkedKeys = Array.from( new Set( arr ) );

            // 清除旧的选中信息 -- 只有处理过滤搜索的时候才用
            this.cleanOldCheckedInfo(oldCheckedDicts, checkedKeys);

            this.$emit('update-meta', cacheCheckedDicts);
            this.initMeta(cacheCheckedDicts);
            this.$emit('on-change', cacheCheckedDicts, checkedKeys);
            this.$emit('input',checkedKeys );
        },
        // 清除旧的选中信息
        cleanOldCheckedInfo(oldCheckedDicts, checkedKeys) {
            if(oldCheckedDicts.length === 0) return;
            const oldArr = oldCheckedDicts.map(item => item.value).join('/').split('/');
            const checkeOldKeys = Array.from( new Set( oldArr ) );
            checkeOldKeys.forEach(item => {
                if( !checkedKeys.includes(item) ){
                    const curNode = this.$refs.cascader?.store.nodesMap[item];
                    curNode && curNode.setChecked(false, true);
                }
            });
        }
    }
};
</script>