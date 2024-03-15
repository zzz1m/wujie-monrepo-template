<template>
<div class="comp-lib-panel" @click="close">
    <ui-tab v-model="activeTab" @click.native.stop>
        <!-- todo 缺少onchange @马凯  -->
        <ui-tab-pane v-for="tab in tabs" :key="tab.name" v-bind="tab"></ui-tab-pane>
    </ui-tab>
    <!-- 组件列表 -->
    <div class="comp-list-wrap">
        <Draggable 
            v-model="activeTabData" v-bind="dragOptions" 
            :move="onMove" @start="onStart" @end="onEnd"
        > 
            <template v-for="(item, index) in activeTabData">
                <div v-if="item"  :key="index" :class="item.role? 'comp-item-wrap': 'comp-group-title'" @click.prevent.stop="onClick(item)">
                    <!-- 组件拖拽的目标 -->
                    <div v-if="item.role" class="comp-item" :class="{ 'dragHandle': canDrag(item, vm.configList) }">
                        <div v-if="activeTab === 'basic'" class="icon-wrap">
                            <svg-icon :icon-class="`comp-${item.type}`"></svg-icon>
                        </div>
                        <span>{{ item.name }}</span>
                    </div>
                    <!-- 组标题 -->
                    <template v-else>{{ item }}</template>
                </div>
            </template>
        </Draggable>
    </div>
</div>
</template>

<script>
import { 
    allowSameTypes,
    TOOL_BAR,
    BASIC_COMP,
    TYPE_BASIC_COLUMNS,
    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE, ROLE_GROUP_INTERVIEW,
    ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE,
    ROLE_RELATION_INTERVIEW_BASIC_SINGLE
} from '../../model/const';

import { searchCurViewlist } from '../../model/viewer';
import { extend, guid, handleScroll } from '../../model/tools.js';
import Draggable from 'vuedraggable';

export default {
    name: 'Toolsbar',
    inject: ['vm', 'status', 'configInfo'],
    components: {
        Draggable
    },
    props: {
        relationList: { type: Array, default: () => []},
        groupList: { type: Array, default: () => []}
    },
    data() {
        return {
            handleScroll: null,
            tabs: TOOL_BAR,
            activeTab: 'basic',
            dragOptions: Object.freeze({
                // forceFallback: true, // 忽略HTML5的拖拽行为， 自定义样式
                sort: false,
                handle: '.dragHandle',
                group: {
                    name: 'common',
                    pull: 'clone',
                    put: false
                }
            })
        };
    },
    computed: {
        module() {
            return this.$route.query.module;
        },
        activeTabData() {
            const list = {
                basic: BASIC_COMP,
                group: this.groupList,
                relation: this.relationList
            }[this.activeTab];
            // console.log(list);
            return list.reduce((p, c) => {
                return [   
                    ...p, 
                    c.name, 
                    ...c.comps.map(e =>  ({
                        ...e,
                        role: c.role,
                        idRole: c.idRole
                    }))
                ];
            }, []);
        }
    },
    methods: {
        close() {
            this.$emit('clearConfig');
        },
        async onClick(item) {
            if(!item.role) return;
            if(!this.canDrag(item, this.vm.configList)) return;
            const { type, role, name, idRole } = item;
            const activeId = this.configInfo.activeId;
            const target = activeId && this.vm.configList[activeId];
            const parentId = target && target.parentId;

            if(parentId && role !== ROLE_RELATION_INTERVIEW_BASIC_SINGLE) {
                const { type: pType, role: pRole } = this.vm.configList[parentId];
                const isCol = pType === TYPE_BASIC_COLUMNS && !([
                    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, 
                    TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE
                ].includes(type));
                if(isCol) return this.$toast('该对象不可加入分栏中', 'warning');
                const isMulti = role === ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE;
                if(isMulti) return this.$toast('多子集不可加入其他对象中', 'warning');
                const isGroup = role === ROLE_GROUP_INTERVIEW;
                if(isGroup) return this.$toast('套件不可加入其他对象中', 'warning');
            }

            const curList = target && searchCurViewlist(activeId, this.vm.configList, this.vm.viewerList);
            const curIndex = curList?.length && curList.findIndex(t => t.id ===activeId);
            const newId = await this.vm.add({
                type, role, parentId, name, idRole
            }, target? curIndex: this.vm.viewerList.length-1);

            if(role === ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE) {
                this.$emit('show-multiple', newId);
            }

            this.$nextTick(() => {
                const el = document.getElementById(`template-card-${newId}`);
                if(!el) return;
                const rect = el.getBoundingClientRect();
                if(rect.top > document.documentElement.clientHeight || rect.bottom < 60) {
                    el?.scrollIntoView();
                }
               
            });
        },
        canDrag(item, list) {
            // console.log(item);
            if( !allowSameTypes.includes(item.type) && (item.role === ROLE_GROUP_INTERVIEW || item.role.startsWith('relation-'))) {
                // console.log(list);
                return !Object.keys(list).find(t => list[t].type === item.type);
            }
            return true;
        },
        onStart() {
            this.handleScroll = handleScroll();
            this.status.isDragging = true;
            this.handleScroll.handleScrollStart();
        },
        onEnd() {
            this.status.isDragging = false;
            if(this.status.hoverColumnId && this.status.hoverColumnError) {
                const config = this.vm.configList[this.status.hoverColumnId];
                if(config?.type === TYPE_BASIC_COLUMNS) {
                    this.$toast('该对象不可加入分栏中', 'warning');
                }
                if(config?.role === ROLE_GROUP_INTERVIEW) {
                    this.$toast('该对象不可加入套件中', 'warning');
                }
            }
            this.status.hoverColumnId = null;
            this.resetDisabledId();
            this.handleScroll.handleScrollEnd();
        },
        resetDisabledId() {
            this.status.hoverColumnError = false;
            document.documentElement.style.cursor = 'default';
        },
        onMove(evt) {
            const { relatedContext, draggedContext: { element: { type: dragConfigType, role: dragConfigRole } } } = evt;

            const relatedElm = relatedContext.element || null;
            const relatedId = relatedElm && relatedElm.id;
            const relatedConfig = relatedId && this.vm.configList[relatedId]; 

            if(dragConfigRole === ROLE_GROUP_INTERVIEW && relatedConfig && relatedConfig.parentId) {
                this.status.hoverColumnId = relatedConfig.parentId;
                this.status.hoverColumnError = true;
                document.documentElement.style.cursor = 'not-allowed';
                return;
            }

            const targetInterview = relatedContext.component?.rootContainer.classList.contains('is-group-sub');

            if(this.vm.viewerList.length && !relatedContext.list?.length || relatedElm?.splits || targetInterview ) {
                let dragInvalid =  dragConfigRole === ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE || !targetInterview && !([
                    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, 
                    TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE
                ].includes(dragConfigType)) || (dragConfigRole.startsWith('group-') && targetInterview);
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
            }
            return true;
        }
    }
};
</script>