<template>
<div class="leave-approval__module">
    <template v-for="module in moduleList">
        <div v-if="!module.hidden" :key="module.title" class="approval-component__container" :class="{ 'approval-no-border': module.noBorder}">
            <h2 class="title">{{ module.title }}{{ module.subTitle? `（${module.subTitle}）`: '' }}</h2>
            <template v-if="module.subModules">
                <h2 class="title">{{ module.title }}{{ module.subTitle? `（${module.subTitle}）`: '' }}</h2>
                <template v-for="subModule in module.subModules">
                    <div v-if="!subModule.hidden" :key="subModule.title" class="approval-component__inner">
                        <h2 class="title">{{ subModule.title }}</h2>
                        <ApproveSection  v-bind="{ module: subModule, translateBoolLabel, progressInfo, highlightClass, processList}" />
                    </div>
                </template>
            </template>
            <ApproveSection v-else v-bind="{ module, translateBoolLabel, progressInfo, highlightClass, processList}" />
        </div>
    </template>
</div>
</template>
<script>
import ApproveSection from './section';
import commonMixin from '../mixins';
import { mapState } from 'vuex';
import { _getAuditNodeStatusByProcessInstanceId, _principalSave } from '@/services/dashboard/audit';
import { _searchInfo } from '@/services/dashboard/meeting';
import { debounce } from '@/utils/common';
import { _commonUserSearch } from '@/services/dashboard/base';
import { getModules, getNodeType} from './config';

export default {
    name: 'LeaveApproval',
    components: { ApproveSection},
    mixins: [commonMixin],
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },

        // 发起人也是后面的节点
        needShowProgress() {
            const processList = this.processList || [];
            const workhandoverIndex = processList.findIndex((t) => t.nodeName === '工作交接');
            if(workhandoverIndex === -1) return true;
            const list = processList.slice(workhandoverIndex);
            const curr =  this.$store.state.userInfo.name;
            return list.findIndex((t) => t.approveName === curr ||  t.approveUserVOList?.find((l) => l.approveName === curr)) > -1;
        },
        isAdminDetail() {
            return this.$route.path.match('process-detail-admin');
        },
        needLeaderTip() {
            const { Node: currNode, NodeName: currNodeName } = getNodeType({ 
                currentNodeName: this.currentNodeName, 
                progressInfo: this.progressInfo 
            });
            return currNodeName === 'ER' && this.progressInfo.userInfoVO?.isTl;
        }
    },
    props: {
        tdata: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            moduleList: [],
            progressInfo: {},
            currentNodeName: '',
            userList0: [],              // 人员列表
            userList1: [],              // 人员列表
            // projectHandoverList: [],    // 系统交接列表
            isDirty: false              // 是否检验过
        };
    },
    async created() {
        try {
            this.progressInfo = this.tdata.progressInfo || {};
            this.highlightFieldList = this.tdata.progressInfo.highlightFieldList || [];
            const list = await this.getAuditNodeStatusByProcessInstanceId();
            this.moduleList = getModules({
                currentNodeName: this.currentNodeName,
                progressInfo: this.progressInfo,
                processList: list,
                isOperate: this.$route.query.type === 'operate'
            }, this.isAdminDetail);
            if(this.needShowProgress) {
                this.$emit('showProgress');
            }
        } catch (error) {
            console.error(error);
        }

        console.log(this.moduleList);
    },
    methods: {
        
        // 获取访谈详情
        // async getProgressInfo() {
        //     const { success, root } = await this.getDetailApi({
        //         processInstanceId: this.processId
        //     });
        //     if(!success || !root) return;
        //     this.progressInfo = root.detail || {};
        //     this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        // },
        async getAuditNodeStatusByProcessInstanceId() {
            const { success, root } = await _getAuditNodeStatusByProcessInstanceId({
                processInstanceId: this.processId
            });
            if(!(success && root && root.length)) return;
            const current = root.find(item => item.last === 1);

            this.currentNodeName = current ? current.nodeName : '';
            this.currentNodeCode = current ? current.node : '';

            return root;
        },
        queryUser: debounce(300, async function(key, row) {
            try {
                if (!key) { return; }
                const { success, root } = await _commonUserSearch({ key });
                if (success) {
                    row.principal = (root || []).map(n => {
                        return {
                            name: [n.name, n.deptName].join('-'),
                            userId: n.id,
                            label: [n.name, n.deptName, n.email].join('-')
                        };
                    }).filter(item => item.userId !== this.userInfoVO.idStr);
                }
            } catch(error) {
                console.log(error);
            }
        }),
        async beforeAgree() {
            console.log('----');
            let result = true;
            if(this.$children.length) {
                for(let i = 0; i < this.$children.length; i++) {
                    const child = this.$children[i];
                    if(!child.beforeAgree) continue;
                    const res = child.beforeAgree();
                    if(!res) {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        },
        // 提交前操作
        beforeSubmit() {
            let result = true;
            if(this.$children.length) {
                for(let i = 0; i < this.$children.length; i++) {
                    const child = this.$children[i];
                    if(!child.check) continue;
                    const res = child.check();
                    if(!res) {
                        result = false;
                        break;
                    }
                }
            }

            return new Promise((resolve) => {
                if(result) {
                    if(this.needLeaderTip) {
                        this.$dialog({
                            title: '温馨提示',
                            content: '此人是部门负责人，审批后应及时调整组织架构',
                            confirmText: '确定',
                            cancelText: '取消',
                            preventLayer: true,
                            onConfirm: () => {
                                resolve(true);
                            },
                            onCancel: () => {
                                resolve(false);
                            },
                            onClose: () => {
                                resolve(false);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                } else {
                    resolve(false);
                }
            });
        }
    }
};
</script>