<template>
<div class="page-content flex-list-ui-page template-create-page">
    <!-- 顶部导航栏 -->
    <NavHeader 
        v-model="activeTab" 
        :before-change="beforeTabChange" 
        :show-preview-page.sync="showPreviewPage"
        :page-title="pageTitle"
        :is-loading="isLoading"
        @preview="onPreview" 
        @save="onSave"
        @click.native="clearConfig"
    /> 

    <!-- 模版配置 -->
    <LayoutPage v-show="activeTab == 0 && !showPreviewPage" ref="layoutPage" v-bind="{ relationList, groupList }" />
    <!-- 关联逻辑配置 -->
    <RelationPage v-show="activeTab == 1 && !showPreviewPage" ref="relationPage" v-bind="{ relationList, groupList }" />
    <!-- 预览页 -->
    <PreviewPage v-if="showPreviewPage" ref="previewPage" />
</div>
</template>
<script>
import browerCtrl from '@/mixins/brower-ctrl';
import observer from '@/mixins/observer';
import NavHeader from './components/nav-header.vue';
import LayoutPage  from './layout/index.vue';
import RelationPage from './relation/index.vue';

import { ViewerModel, searchCurSubViewlist } from '../model/viewer';
import { RelationModel } from '../model/relation';
import PreviewPage from './components/preview-page.vue';

import { MODULE_INTERVIEW, RELATION_ROLE_MAP_ID, TYPE_GROUP_INTERVIEW_ASSESSMENT, ROLE_GROUP_INTERVIEW, RELATION_ROLE_MAP, ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, MODULE_ITEM_NAME, MODULE_NAME, INTERVIEW_TYPE_LIST, RELATION_CODE_MAP } from '../model/const';
import { _getInterviewTemplateKitList, _getInterviewTemplateRelationList, _addTemplate, _getTemplateConfig  } from '@/services/dashboard/interview';
import { _getPromotionPlanById, _updatePromotionEvaluateTemplate } from '@/services/dashboard/promotion-management';
export default {
    name: 'TemplateCreatePage',
    mixins: [browerCtrl, observer],
    components: {
        NavHeader, LayoutPage, RelationPage, PreviewPage
    },
    data() {
        const vm = new ViewerModel();
        const relation = new RelationModel({
            relationGroupList: [],
            viewerList: vm.viewerList,
            configList: vm.configList
        });
        return {
            vm,
            relation,
            activeTab: 0, // 0-模版配置/1-关联逻辑配置
            showPreviewPage: false,
            groupList: [],
            relationList: [],
            pageTitle: '', // 页面标题
            isLoading: false, // 防重复标识
            interviewData: {        // 访谈数据
                interviewType: ''
            } 
        };
    },
    computed: {
        module() {
            return this.$route.query.module;
        },
        id() {
            return this.$route.query.id;
        }
    },

    async created() {
        // location.hash = '';
        window.addEventListener('hashchange', this.handleHashChange);
        this.handleHashChange();

        if(this.module) {
            this.loadGroupData();
            this.loadRelationData();
        };

        if(this.module === 'promotion') {
            await this.getPromotionCfg();
        } else {
            await this.getTemplateConfig();
        }

        if(this.showPreviewPage) {
            this.$refs.previewPage?.init();
        }



        // 获取模板配置信息

        // 访谈模版评估意见是必选项
        if(this.module === MODULE_INTERVIEW || !this.id) {
            const hasAss = !!Object.keys(this.vm.configList).find(k => this.vm.configList[k].type === TYPE_GROUP_INTERVIEW_ASSESSMENT);
            !hasAss && this.vm.add({
                role: ROLE_GROUP_INTERVIEW,
                type: TYPE_GROUP_INTERVIEW_ASSESSMENT
            });
        }
    },
    mounted () {
        setTimeout(() => {
            this.setEditing();
        }, 1000);
    },
    beforeDestroy(){
        window.removeEventListener('hashchange', this.handleHashChange);
    },
    provide() {
        return {
            vm: this.vm,
            relation: this.relation,
            businessData: {
                interviewData: this.interviewData
            }
        };
    },
    methods: {   
        clearConfig() {
            this.$refs.layoutPage?.clearConfig();
        },
        async loadRelationData() {
            const module = this.module;
            const { success, root } = await _getInterviewTemplateRelationList({ module });
            if( !success || !root || root.length < 1 ) return;

            this.relationList = root.map(i => {
                const { classDictName, formDataRelationVOList } = i;
                const roleType =  formDataRelationVOList?.[0]?.classDictCode;// todo 有风险
                const isMulti = formDataRelationVOList?.[0]?.classType === 1;
                const comps = formDataRelationVOList.map(t => {
                    if(isMulti && !t?.fieldVOList?.length) return null;
                    return {
                        fId: t.id,
                        name:isMulti? t.tableDesc: t.fieldDesc,
                        // type: isMulti ? t.tableName: `${RELATION_CODE_MAP[t.classDictCode]}-${t.tableName}-${t.fieldName}`,
                        type: isMulti ? t.tableName: `${t.classDictCode}-${t.tableName}-${t.fieldName}`,
                        list: isMulti && (t.fieldVOList || []).map(l => ({
                            id: l.fieldCode,
                            name: l.fieldName
                        }))
                    };
                }).filter(t => !!t);
                return {
                    name: classDictName,
                    role: RELATION_ROLE_MAP[roleType],
                    idRole: RELATION_ROLE_MAP_ID[module][roleType], // 专门新建id的时候用的，避免改其他逻辑
                    comps,
                    isMulti
                };
            });
            // console.log(this.relationList); 
            this.openObserver( ['.create-preview-panel', '.relation-config-inner'] );
        },
        async loadGroupData() {
            const res = await _getInterviewTemplateKitList({ modules: this.module });
            if(res.success) {
                const list = res.root;
                this.groupList = list.filter(t => t.module === this.module).map(i => {
                    const rowList = i.rows;
            
                    return {
                        name: i.name || MODULE_NAME[i.module],
                        role: `group-${i.module}`,
                        comps: 
                           
                            rowList.map(t => ({
                                name: t.name || MODULE_ITEM_NAME[i.module][t.code],
                                type: t.code
                            }))
                            
                    };
                });
            }
        },
        // 切换模版配置和关联逻辑配置
        async beforeTabChange(newVal) {
            if(newVal == 0) {
                return this.checkRelationValid();
            } else {
                return this.handleTabDialog();
            }
        },
        // 校验关联逻辑设置的完整性
        async checkRelationValid() {
            // 格式化关联逻辑设置的数据
            const { success, message } = await this.relation.formatRelation();
            if(success == 0) {
                this.$toast({
                    type: 'warning',
                    content: message
                });
                return false;
            }
            return true;
        },
        // 导航栏点击预览
        async onPreview() {
            // 校验关联逻辑的填写完整性
            const validateArr = await this.relation.validateAll();
            if(validateArr.some(item => item.success === 0)) {
                this.$toast({
                    type: 'warning',
                    content: '请将关联逻辑配置完整'
                });
                return;
            }
            location.hash = 'preview';
        },
        // 导航栏点击保存 需要调用 template-create-validator 对模版配置 和 关联逻辑做对应校验 @马凯
        async onSave() {
            // 如果展示的预览页 掉预览页校验方法
            if (this.showPreviewPage) {
                const validate = await this.$refs.previewPage.validateAll();
                console.log('value: ', this.$refs.previewPage.getValue());
                return;
            };
            // 校验模板配置是否合法
            const valid = await this.handleTabDialog('save');
            // 关联逻辑设置是否合法
            const relationValid = await this.checkRelationValid();
            if(!valid || !relationValid) return;
            this.handleSaveCb();
        },
        // 保存&切换的校验
        async handleTabDialog(type) {
            if(!this.vm) return true;
            const result = await this.vm.tplValidator.validateAll();
            const errList = result.filter(item => item.success == 0 );
            if( errList.length > 0 ){
                const rule = /【(.+)】(.+)/;
                const content = errList.map(item=>{
                    const result = item.message.replace(/\n/g, '').match( rule );
                    return `<li><span class="err-label">${ result[1] }</span><span class="err-msg">${ result[2] }</span></li>`;
                }).join('');

                this.$dialog({
                    title: type === 'save' ? '当前无法保存' : '当前无法切换',
                    content: `<span class="err-tips">以下内容存在异常，需进行修改</span><ul>${content}</ul>`,
                    preventConfirm: true,
                    userHtmlString: true,
                    cancelText: false,
                    type: 'warning',
                    confirmText: '我知道了',
                    width: 520,
                    wrapClass: 'template-save-dialog',
                    onConfirm() {
                        this.hide();
                    }
                });
                return false;
            }
            return true;
        },
        // 保存接口请求
        async handleSaveCb(){
            try {
                if(this.isLoading) return;
                this.isLoading = true;
                const fn = {
                    interview: _addTemplate,
                    promotion: _updatePromotionEvaluateTemplate
                }[this.module];
                const { success, root } = await fn({
                    id: this.id,
                    templateConfig: JSON.stringify(this.vm.viewerList),
                    templateRule: JSON.stringify(this.vm.configList),
                    templateLogic: JSON.stringify(this.relation.relationGroupList)
                });
                if(success && root) {
                    this.$toast('保存成功', 'success');
                    this.setEditing(0);
                };
            }catch(err){
                console.error(err);
            }finally{
                this.isLoading = false;
            }
        },
        // 获取晋升模版信息
        async getPromotionCfg() {
            try {
                const { success, root } = await _getPromotionPlanById({
                    id: this.$route.query.id
                });
                if(success &&  root) {
                    this.pageTitle = root.templateName;
                    this.initConfig(root);
                }
            } catch(err){
                console.error(err);
            }
        },
        // 获取模板配置信息
        async getTemplateConfig() {
            try {
                const { success, root } = await _getTemplateConfig({ id: this.id });
                if(success && root) {
                    // 组装页面title
                    this.pageTitle = `${INTERVIEW_TYPE_LIST.find(v=>v.value === root?.type)?.label}-${root?.name}模板规则`;
                    this.interviewData.interviewType = root.type;
                    this.initConfig(root);
                }
            }catch(err){
                console.error(err);
            }
        },
        initConfig({ templateRule, templateConfig, templateLogic  }) {

            const configList = templateRule ? JSON.parse(templateRule) : {};
            const viewerList = templateConfig ? JSON.parse(templateConfig) : [];
            const relationGroupList = templateLogic ? JSON.parse(templateLogic) : [];

            if(!Object.keys(configList).length || !viewerList.length) return;

            this.$set(this.vm, 'configList', configList);
            this.$set(this.vm, 'viewerList', viewerList);
            const types = {};
            Object.keys(configList).forEach(key => {
                if(key.endsWith('-evaluation')) return;
                const item = configList[key];
                if(!item.role.startsWith('basic-')) {
                    types[item.type] = null;
                }
                const list = item.parentId? searchCurSubViewlist(item.parentId, this.vm.viewerList): this.vm.viewerList;
                let view = list.find(i => i.id === key);
                this.vm.tplValidator.add(configList[key], view);
            });
            this.vm.initTypeset(Object.keys(types));
            this.vm.resetSort();

            this.$set(this.relation, 'relationGroupList', relationGroupList);
            this.$set(this.relation.RTools, 'configList', configList);
            this.$set(this.relation.RTools, 'viewerList', viewerList);
            this.relation.formatRelation();
            this.$refs.relationPage.computeRelationGroupList();

        },
        handleHashChange() {
            const hasHash = location.hash === '#preview';
            this.showPreviewPage = hasHash;
        }
    }
};
</script>