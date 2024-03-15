<template>
<Draggable
    ref="draggable"
    :value="list" v-bind="dragOptions" 
    :parent-id="parentId"
    class="drag-wrap" 
    :class="{
        'is-dragging': status.isDragging,
        'is-column': parentConfig && parentConfig.type === TYPE_BASIC_COLUMNS,
        'is-group-sub': parentConfig && parentConfig.type !== TYPE_BASIC_COLUMNS,
        'not-group-sub': parentConfig && parentConfig.type === TYPE_BASIC_COLUMNS,
        'not-empty-list': !!list.length
    }"
    :move="onMove"
    @change="onChange"
    @start="onStart"
    @end="onEnd"
>
    <template v-if="list.length">
        <div v-for="item in list" :id="`template-card-${item.id}`"
            :key="item.id"
            class="drag-card-wrap"
            :class="{
                'grid-col-span-25' : item.splits === 25,
                'grid-col-span-50' : item.splits === 50,
                'grid-col-span-75' : item.splits === 75,
                'grid-col-span-100' : item.splits === 100,
                'grid-col-span-mini' : item.splits === 25 && showColSpanMini
            }"
            :style="item.splits && `width: ${item.splits}%`"
            @click.prevent.stop
        >
            <div class="drag-card-body" 
                :class=" {
                    active: activeId === item.id || (item.id === status.hoverColumnId && !status.hoverColumnError),
                    'is-column-disabled': item.id === status.hoverColumnId && status.hoverColumnError,
                    'has-sub': item.children
                }" 
                @click.stop="onClick(item)"
            >
                <div class="drag-card-content">
                    <slot :item="item" />

                    <!-- 处理删除/复制/拖拽锚点的公用组件 -->
                    <CardTools 
                        v-show="activeId === item.id"
                        :item="item" 
                        :drag-point="dragPointClass" 
                        @del="onDel(item, list)" 
                        @copy="onCopy(item, list)"
                    />
                </div>
                <div v-if="item.children" 
                    class="sub-area" 
                    :class="{ 'is-empty': !item.children.length}"
                >
                    <DragViewlist
                        :is-sub="true"
                        :list="item.children" 
                        :parent-id="item.id" 
                        v-on="$listeners"
                    >
                        <slot slot-scope="{item: subItem}" :item="subItem" />
                    </DragViewlist>
                </div>
            </div>
        </div>
    </template>
    <template v-else-if="isSub">
        <p class="empty-tip">拖动控件到这里</p>
    </template>
</Draggable>
</template>
<script>
import { 
    TYPE_BASIC_COLUMNS, ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE,
    ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, TYPE_ELSE_EVALUATION, ROLE_GROUP_INTERVIEW
} from '../../model/const';

import Draggable from 'vuedraggable';
import CardTools from './card-tools.vue';
import { searchCurViewlist, handleScroll } from '../../model/tools';
function getView(id, list) {
    let target = list.find(t => t.id === id);
    if(target) return target;
    for(let i = 0; i < list.length; i++) {
        target = getView(id, list[i].children || []);
        if(target) break;
    }
    return target;
}

export default {
    name: 'DragViewlist',
    inject: ['vm', 'relation', 'status', 'configInfo', 'businessData'],
    components: {
        Draggable, CardTools
    },
    props: {
        list: { type: Array,  default: () => []},
        parentId: { type: String, default: null },
        isSub: { type: Boolean, default: false }
    },
    data() {
        const dragPointClass = 'drag-handle';
        return {
            handleScroll: null,
            TYPE_BASIC_COLUMNS,
            dragPointClass,
            showColSpanMini: false,     // 窄屏样式兼容
            dragOptions: Object.freeze({
                handle: '.' + dragPointClass,
                sort: true,
                group: {
                    name: 'common',
                    pull: 'common',
                    put: 'common'
                }
            })
        };
    },
    computed: {
        activeId() {
            return this.configInfo && this.configInfo.activeId;
        },
        parentConfig() {
            return this.parentId && this.vm.configList[this.parentId];
        }
    },
    watch: {
        'vm.configList': {
            deep: true,
            immediate: true,
            handler: function() {
                setTimeout(() => {
                    this.setSize();
                }, 1000);
            }
        }
    },
    mounted() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize );
    },
    beforeDestroy(){
        window.removeEventListener('resize', this.onWindowResize );
    },
    methods: {
        onStart(e) {
            this.handleScroll = handleScroll();
            this.handleScroll.handleScrollStart();
            this.status.isDragging = true;
            const curId = e.item._underlying_vm_.id;
            this.status.onItemId = curId;
            const curDom = document.getElementById(`template-card-${curId}`);
            const width = curDom.getAttribute('width');
            const height = curDom.getAttribute('height');
            const shadowNode = document.createElement('div');
            shadowNode.innerHTML = `<div class="card-node" style="width: 100%; height: 100%;background-color: #F7F8FA;"></div>`;
            shadowNode.setAttribute('style', `width: ${width}px; height: ${height}px;flex-shrink: 0; flex-grow: 0;`);
            shadowNode.id = 'drag-shadow-node';
            curDom.parentNode.insertBefore(shadowNode, curDom);
        },
        setSize() {
            const container = document.getElementById('container');
            if(!container) return;
            const wrapList = container.querySelectorAll('.drag-card-wrap');

            wrapList.forEach(s => {
                const rect = s.getBoundingClientRect();
                if(rect) {
                    const { width, height } = rect;
                    s.setAttribute('width', width + '');
                    s.setAttribute('height', height + '');
                }
            });
        },
        onEnd() {
            this.status.isDragging = false;
            this.status.onItemId = null;
            if(this.status.hoverColumnId && this.status.hoverColumnError) {
                const config = this.vm.configList[this.status.hoverColumnId];
                if(config?.type === TYPE_BASIC_COLUMNS) {
                    this.$toast('该对象不可加入分栏中', 'warning');
                }
                if(config.role === ROLE_GROUP_INTERVIEW) {
                    this.$toast('该对象不可加入套件中', 'warning');
                }
            }
            this.status.hoverColumnId = null;
            this.resetDisabledId();
            
            const shadowNode = document.getElementById('drag-shadow-node');
            if(shadowNode) {
                shadowNode.parentElement.removeChild(shadowNode);
            }

            this.handleScroll.handleScrollEnd();
        },
        resetDisabledId() {
            this.status.hoverColumnError = false;
            document.documentElement.style.cursor = 'default';
        },
        onMove(evt) {
            const { relatedContext, draggedContext: { element: {id} } } = evt;
            const dragConfigType = this.vm.configList[id].type;
            const dragConfigRole = this.vm.configList[id].role;

            const relatedElm = relatedContext.element || null;
            const relatedId = relatedElm && relatedElm.id;
            const relatedConfig = relatedId && this.vm.configList[relatedId]; 
            
            // 评估建议只能在当前套件
            if(dragConfigType === TYPE_ELSE_EVALUATION && (!relatedId ||  id.indexOf(relatedConfig.parentId) !== 0)) return false;
            // 套件不能拖到其他容器里
            if(dragConfigType !== TYPE_ELSE_EVALUATION && dragConfigRole === ROLE_GROUP_INTERVIEW && relatedConfig && relatedConfig.parentId) return false;

            const targetInterview = relatedContext.component?.rootContainer.classList.contains('is-group-sub');

            if(!relatedContext.list?.length || relatedElm?.splits || targetInterview) {
                let dragInvalid = this.vm.configList[id]?.multiple || !targetInterview && ![
                    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, 
                    TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE
                ].includes(dragConfigType) || (dragConfigRole.startsWith('group-') && targetInterview);
                // 单子集都支持
                if(dragConfigRole.startsWith('relation-') && dragConfigRole !== ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE) {
                    dragInvalid = false;
                }

                let columnId = relatedElm?.splits ? 
                    this.vm.configList[relatedElm.id].parentId
                    : relatedContext.component.$attrs['parent-id'];
                
                this.status.hoverColumnId = columnId;

                if(dragInvalid) {
                    this.status.hoverColumnError = true;
                    document.documentElement.style.cursor = 'not-allowed';
                } else {
                    this.resetDisabledId();
                }
            } else {
                this.resetDisabledId();
                this.status.hoverColumnId = null;
            }
        },
        async onChange(evt) {
            if(this.status.hoverColumnError) return;
            const checkSort = async (id, newIndex, targetColumnId, isSameLevel) => {
                let parentId = targetColumnId;
                const viewerList = parentId ? getView(parentId, this.vm.viewerList).children : this.vm.viewerList;

                // 同级拖拽选择下一个
                if(isSameLevel) {
                    const cIdx = viewerList.findIndex(i => i.id === id);
                    newIndex = cIdx < newIndex? newIndex + 1: newIndex;
                }
                const targetId = viewerList[newIndex]?.id || null;
                const { success, message } = await this.relation.RTools.startSort(id, targetId, !targetId && targetColumnId);

                if(success === 0) {
                    this.$toast(message || '移动失败', 'warning');
                    return false;
                }
                return true;

                function getView(id, list) {
                    let target = list.find(t => t.id === id);
                    if(target) return target;
                    for(let i = 0; i < list.length; i++) {
                        target = getView(id, list[i].children || []);
                        if(target) break;
                    }
                    return target;
                }
            };
            try {
                const { added, moved } = evt;
                
                if(added) {
                    const { element: { id, type, role, name, idRole },  newIndex } = added;
                    if(id) { 
                        const targetColumnId = this.status.hoverColumnId || null; 
                        const result = await checkSort(id, newIndex, targetColumnId);
                        if(!result) return;

                        this.vm.moveIntoOrOut(id, newIndex -1, this.parentId);
                    } else {
                        const cId = await this.vm.add(
                            { type, role, idRole, parentId: this.parentId, name, interviewType: this.businessData.interviewData?.interviewType },
                            newIndex - 1,
                        );
                        // 关联数据多子集-弹窗
                        if(role === ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE) {
                            this.$emit('show-multiple', cId, type);
                        }
                    }
                } else if(moved) {
                    const { element: { id }, newIndex } = moved;
                    if(this.vm.configList[id].type !== TYPE_ELSE_EVALUATION) {
                        const targetColumnId = this.vm.configList[id]?.parentId;
                        const result = await checkSort(id, newIndex, targetColumnId, true);
                        if(!result) return;
                    }

                    this.vm.move(id, newIndex);
                }
            } catch (error) {
                this.$toast(error.message || '操作失败', 'warning');
            }
        },
        async onDel(item, list) {
            // 点击删除，判断该题是否已经设置了关联逻辑；
            // 若设置了，则弹窗提示：该题已设置关联逻辑，不可删除；
            // 若未设置，二次弹窗确认，是否确定删除；确定则删除当前题目。
            const { success, message } = await this.relation.checkRelation(item);
            if( success === 0 ) {
                this.$dialog({
                    content: message || '该控件已参与逻辑设置，不能删除！',
                    cancelText: ''
                });
            } else {
                this.$dialog({
                    title: '删除',
                    content: '是否确定删除?',
                    onConfirm: () => {
                        try {
                            this.vm.remove(item, list);

                            if(this.configInfo.activeId === item.id) {
                                this.$emit('clearConfig');
                            }
                        } catch (error) {
                            this.$toast(error.message || '操作失败', 'warning');
                        }
                    }
                });
            }
        },
        onCopy(item, viewlist) {
            const newId = this.vm && this.vm.copy( item, viewlist );
            this.$emit('choose', {
                activeId: newId,
                activeCode: null
            });
        },
        onClick(item) {
            Object.keys(this.vm.configList).forEach(item => {
                if(item.startsWith('basic_radio') || item.startsWith('basic_checkbox')) {
                    this.vm.configList[item].options.forEach(option => {
                        this.$set(option, 'chooseClick' , false);
                    });
                }
            });
            this.$emit('choose', {
                activeId: item.id,
                activeCode: null
            });
        },
        onWindowResize(){
            const totalWidth = 2000;
            const viewWidth = window.innerWidth;
            this.showColSpanMini = viewWidth <= totalWidth;
        }
    }
};
</script>