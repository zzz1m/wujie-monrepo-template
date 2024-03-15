<template>
    <div>
         <div class="approval-component__inner">
            <h2 class="title">常规事项交接</h2>
            <div>
                <p style="margin-bottom: 6px">请注意安排离职员工进行工作交接，包括但不限于：</p>
                <p>1、退出微信或其他沟通软件上的工作群组</p>
                <p>2、工作交接</p>
                <p>3、线下文件交接</p>
            </div>
        </div>
         <div v-if="dataList && dataList.length" class="approval-component__inner">
            <h2 class="title">系统待办/数据资产交接（以下事项将在离职流程结束后自动转至工作交接人）</h2>
            <ui-table-pro
                :data="dataList" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
            >
                <ui-table-column label="交接内容" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                       <div :style="row.isDetail? 'margin-left: 16px':'font-weight:600'">{{ row.name }}</div>
                    </template>
                </ui-table-column>
                <ui-table-column label="工作交接人" :width="400">
                    <template slot-scope="{ row, $index }">
                        <ui-select
                            v-if="module.editable && (row.canEditPrincipal || !row.isDetail) && row.show"
                            :key="$index"
                            v-model="row.principalUserId"
                            :class="isDirty && !row.principalUserId ? 'approval-error' : ''"
                            filterable clearable
                            placeholder="请选择工作交接人"
                            transfer
                            @on-query-change="(val) => queryUser(val, row)"
                            @on-change="(val) => handleUserChange(val, row)"
                        >
                            <ui-option v-for="item in row.principal"
                                :key="item.userId" :value="item.userId" :label="item.name"
                            >{{ item.label }}</ui-option>
                        </ui-select>
                        <template v-else>
                            {{ row.principal && row.principal.length ? row.principal[0].name : '' }}
                        </template>
                    </template>
                </ui-table-column>
            </ui-table-pro>
         </div>
    </div>
</template>

<script>
import { _principalSave } from '@/services/dashboard/audit';
import { _commonUserSearch } from '@/services/dashboard/base';
import { debounce } from '@/utils/common';
import { scrollToFormError } from '@/utils/util.js';

export default {
    props: {
        module: {
            type: Object,
            default: () => ({})
        },
        progressInfo: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            inited: false,
            isDirty: false,
            dataList: []
        };
    },
    computed: {
        leaveModule() {
            return  this.progressInfo.leaveModule || [];
        }
    },
    
    created() {
        const result = [];
        this.leaveModule.forEach(t => {
            const { systemName, list } = t;
            result.push({
                name: `${systemName} (${list?.length || 0})`,
                systemName,
                show: true,
                principalUserId: '',
                principal: []
            });
            list.forEach(l => {
                result.push({
                    ...l,
                    name: l.description,
                    isDetail: true,
                    systemName,
                    show: true,
                    principal: (l.principal || []).map(n => {
                        return {
                            name: [n.name, n.deptName].join('-'),
                            userId: n.userId,
                            label: [n.name, n.deptName, n.email].join('-')
                        };
                    }),
                    principalUserId:  l?.principal?.length ? l.principal[0].userId : ''
                });
            });
        });
        this.dataList = result;
    },
    methods: {
        check() {
            let hasEmpty = false;
            this.dataList.forEach(t => {
                if(t.isDetail && !t.principalUserId) {
                    hasEmpty = true;
                }
            });
            if(hasEmpty) {
                this.isDirty = true
                this.$toast('请完善工作交接人', 'warning');
                scrollToFormError(false,  '.system-handover');
                return false;
            } else {
                return true;
            }
        },
        queryUser: debounce(300, async function(key, row) {
            if(!row.show) return
            try {
                if (!key || key.indexOf('-') > -1) { return; }
                const { success, root } = await _commonUserSearch({ key });
                if (success) {
                    const ll =  (root || []).map(n => {
                        return {
                            name: [n.name, n.deptName].join('-'),
                            userId: n.id,
                            label: [n.name, n.deptName, n.email].join('-')
                        };
                    }).filter(item => item.userId !== this.progressInfo.userInfoVO.idStr);
                    this.$set(row, 'principal', ll);
                }
            } catch(error) {
                console.log(error);
            }
        }),
        async handleUserChange(val, row) {
            if(!row.isDetail) {
                if(val) {
                    const detailList = this.dataList.filter(t => t.isDetail && t.systemName === row.systemName);
                    detailList.filter(t => t.canEditPrincipal).forEach(t => {
                        t.show = false;
                        t.principal = JSON.parse(JSON.stringify(row.principal));
                       this.$nextTick(() => {
                            t.principalUserId = val;
                            t.show = true;
                            this.handleUserChange(val, t);
                       })
                    });
                }
                return;
            }
            try {
                const { success, root } = await _principalSave({
                    userLeaveApproveDynamicConfigId: row.userLeaveApproveDynamicConfigId,
                    principalUserId: val
                });

                if (!success) {
                    row.principalUserId = '';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
};
</script>