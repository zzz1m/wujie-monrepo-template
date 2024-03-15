<template>
<div class="relation-config-page page-wrap">
    <div class="relation-config-inner">
        <div class="relation-config-header">
            <div class="logic-select-wrapper">
                <!-- 控件分类：普通控件or套件列表 -->
                <ui-select ref="widgetTypeRef" :value="widgetType">
                    <ui-option v-for="(item, index) in widgetTypeList" :key="index"
                        :value="item.id" @click.capture.native.stop="clickWidgetType(item.id)"
                    >
                        {{ item.id == -1 ? item.title : `套件-${item.title || ''}` }}
                    </ui-option>
                </ui-select>
                <!-- 控件列表 -->
                <ui-select ref="questionSelectRef" :value="selectQuestion">
                    <ui-option v-for="(item, index) in selectQuestionList" :key="index"
                        :value="item.id" @click.capture.native.stop="clickSelectQuestion(item.id)"
                    >
                        {{ item.title }}
                    </ui-option>
                </ui-select>
            </div>
            <div class="operate-list">
                <a href="javascript:;" :class="['btn', 'btn-primary', { 'btn-disabled': !allowAddGroup }]"
                    @click="handleAction('add-group')"
                >
                    <i class="ui-icon-plus"></i>添加关联逻辑
                </a>
            </div>
        </div>
        <!-- 无关联组 -->
        <div v-if="!relationGroupList.length" class="no-relation-group">
            <img src="https://img.bosszhipin.com/static/file/2022/x2tgkvz1h81658392541006.png" />
            <span>暂无内容</span>
        </div>
        <!-- 关联组 -->
        <div v-else ref="wrapper" class="relation-group-wrapper">
            <relation-group v-for="(group, index) in relationGroupList"
                :key="index" :data="group" :question-list="questionList"
                :class="[{ active: activeRelateGroup && activeRelateGroup.id == group.id }]"
                @click.native="handleAction('active-group', { group })"
            >
                <div slot="delete-operate" class="remove-group-btn"
                    @click.stop="handleAction('remove-group', { group })"
                >
                    <i class="ui-icon-remove"></i>
                </div>
            </relation-group>
        </div>
    </div>
</div>
</template>
<script>
import RelationGroup from './relation-group.vue';

import {
    BASIC_COMP,
    TYPE_BASIC_COLUMNS,
    ROLE_CHOOSE
} from '../../model/const';

import {
    createNewRelationGroup,
    createNewCondition,
    createNewShowItem
} from '../../model/relation';

export default {
    name: 'RelationPage',
    inheritAttrs: false,
    inject: ['relation', 'vm'],
    components: {
        RelationGroup
    },
    props: {
        // 套件列表
        groupList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    computed: {
        // 允许添加关联组 至少有2个控件且至少含有1个可作为条件
        allowAddGroup() {
            const roleList = [ROLE_CHOOSE];
            return this.questionList.length > 1
                && this.questionList.filter(question => roleList.includes(question.role)).length;
        },
        // 当前选中的关联组
        activeRelateGroup() {
            if(!this.relation) return null;
            return this.relation.getActiveRelationGroup();
        },
        // 控件类型下拉列表
        widgetTypeList() {
            if(!this.vm) return [];
            /**
             * 过滤出视图列表中的基础控件配置列表
             * 分栏则去其子组件查找基础控件
             */
            const filterBasicViewer = (viewerList = []) => {
                if(!viewerList.length) return [];
                const { configList } = this.vm;
                // 基础控件的角色
                const basicRoleList = BASIC_COMP.map(basic => basic.role);
                return (viewerList || []).filter(viewer => {
                    if(configList[viewer.id] && configList[viewer.id].role) {
                        return [...basicRoleList].includes(configList[viewer.id].role);
                    } else {
                        return false;
                    }
                }).reduce(function compute(result, current) {
                    const currentConfig = configList[current.id] && basicRoleList.includes(configList[current.id].role)
                        ? [ configList[current.id] ] : [];
                    if((current.children || []).length) {
                        return result.concat(currentConfig, current.children.reduce(compute, []));
                    } else {
                        return result.concat(currentConfig);
                    }
                }, []);
            };
            const { viewerList, configList } = this.vm;
            // 接口返回的所有关联组列表
            const groupTypeList = this.groupList.reduce((result, group) => {
                return result.concat(group.comps || []);
            }, []).map(group => group.type)
                // 不展示目标信息
                .filter(t => !['target'].includes(t));

            const list = (viewerList || []).filter(
                viewer => configList[viewer.id] && groupTypeList.includes(configList[viewer.id].type)
            ).map(viewer => {
                return {
                    ...(configList[viewer.id] || {}),
                    questionList: filterBasicViewer(viewer.children || [])
                };
            });
            return [
                { id: -1, title: '控件', questionList: filterBasicViewer(viewerList) }
            ].concat(list);
        },
        // 下拉选择问题列表
        selectQuestionList() {
            return [
                { id: -1, title: '全部逻辑' }
            ].concat(this.questionList);
        },
        // 问题列表
        questionList() {
            return (this.widgetTypeList.find(item => item.id == this.widgetType) || {}).questionList || [];
        }
    },
    data() {
        return {
            // 当前控件类型
            widgetType: -1,
            selectQuestion: -1,
            relationGroupList: []
        };
    },
    created() {
        this.computeRelationGroupList();
    },
    methods: {
        // 关联组数据
        computeRelationGroupList() {
            if(!this.relation) {
                this.relationGroupList = [];
                return;
            };
            const { relationGroupList } = this.relation;
            const { widgetType, selectQuestion } = this;
            this.relationGroupList = relationGroupList.filter(relationGroup => relationGroup.widgetType == widgetType)
                .filter(relationGroup => {
                    const { conditions, showList } = relationGroup;
                    return selectQuestion == -1
                        || (conditions || []).some(condition => condition.conditionId === selectQuestion)
                        || (showList || []).some(show => show.showItemId === selectQuestion);
                });
        },
        // 校验关联逻辑设置的完整性
        async validateRelation() {
            if(!this.relation) return true;
            const validateArr = await this.relation.validateAll();
            const flag = validateArr.some(({ success }) => success === 0);
            return !flag;
        },
        // 改变控件类型
        async clickWidgetType(value) {
            this.$refs.widgetTypeRef.hideMenu();
            const valid = await this.validateRelation();
            if(!valid) {
                this.$toast({
                    type: 'warning',
                    content: '请将关联逻辑配置完整'
                });
                return;
            }
            this.widgetType = value || -1;
            this.selectQuestion = -1;
            this.computeRelationGroupList();
        },
        // 改变问题
        async clickSelectQuestion(value) {
            this.$refs.questionSelectRef.hideMenu();
            const valid = await this.validateRelation();
            if(!valid) {
                this.$toast({
                    type: 'warning',
                    content: '请将关联逻辑配置完整'
                });
                return;
            }
            this.selectQuestion = value || -1;
            this.computeRelationGroupList();
        },
        // 操作
        handleAction(operateType, options) {
            const { group } = options || {};
            switch(operateType) {
                case 'add-group':
                    this.addRelationGroup();
                    break;
                case 'remove-group':
                    this.removeRelationGroup(group);
                    break;
                case 'active-group':
                    this.setActiveGroup(group);
                    break;
            }
        },
        // 删除逻辑组
        removeRelationGroup(group) {
            const { id } = group || {};
            this.$dialog({
                title: '确认删除',
                content: '确定要删除改逻辑？',
                onConfirm: () => {
                    this.relation && this.relation.removeRelationGroup(id);
                    this.computeRelationGroupList();
                }
            });
        },
        // 添加关联组
        addRelationGroup() {
            if(!this.relation || !this.allowAddGroup) return;
            const { widgetType, selectQuestion } = this;
            const newRelationGroup = createNewRelationGroup();
            newRelationGroup.widgetType = widgetType || -1;
            if(selectQuestion == -1) {
                this.relation.addRelationGroup(newRelationGroup);
            } else {
                // 添加当前问题下逻辑
                const { configList } = this.vm;
                const { type } = configList[selectQuestion] || {};
                if(type === TYPE_BASIC_COLUMNS) { // 分栏只能作为结果
                    const newShowItem = createNewShowItem();
                    newShowItem.showItemId = selectQuestion;
                    newRelationGroup.showList = [newShowItem];
                } else {
                    const newCondition = createNewCondition();
                    newCondition.conditionId = selectQuestion;
                    newRelationGroup.conditions = [newCondition];
                }
                this.relation.addRelationGroup(newRelationGroup);
            }
            this.computeRelationGroupList();

            // 滚动到最底部
            this.$nextTick(() => {
                const wrapper = this.$refs.wrapper;
                if(!wrapper) return;
                if(wrapper.scrollHeight > wrapper.clientHeight) {
                    wrapper.scrollTop = wrapper.scrollHeight;
                }
            });
        },
        // 激活某个组
        setActiveGroup(group) {
            this.relation && this.relation.setActiveRelationGroup(group);
        }
    }
};
</script>