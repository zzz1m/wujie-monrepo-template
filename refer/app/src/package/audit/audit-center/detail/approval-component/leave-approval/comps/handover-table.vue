<template>
    <ui-table-pro :data="todoList" empty-text="暂无数据" class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px">
        <ui-table-column label="交接事项" :width="300" prop="todoContent" show-overflow-tooltip></ui-table-column>
        <ui-table-column label="交接情况" :width="module.editable ? 400: 140">
            <template slot="header">
                <span v-if="module.editable" style="color: red">*</span>
                交接情况
            </template>
            <template slot-scope="{ row }">
                <template v-if="module.editable && isCurr(row)">
                    <ui-select v-if="checkIsCollect(row.todoContent)" v-model="row.state" transfer>
                        <ui-option :value="1">{{ `已回收` }}</ui-option>
                        <ui-option :value="0">{{ `未回收` }}</ui-option>
                    </ui-select>
                    <template v-else>已处理</template>
                </template>
                <template v-else-if="!isAdminDetail || row.state">
                    <template v-if="checkIsFinish(row.todoContent)">已完成</template>
                    <template v-else>{{ checkIsCollect(row.todoContent) ? `${row.recycleState ? '已回收' : '未回收'}` : '已处理' }}</template>
                </template>
            </template>
        </ui-table-column>
        <ui-table-column label="备注说明"  show-overflow-tooltip>
            <template slot-scope="{ row }">
                <ui-input v-if="module.editable && isCurr(row)" v-model="row.remark" :maxlength="200" style="width: 100%" type="text" placeholder="请输入备注说明" clearable></ui-input>
                <template v-else>
                    {{ row.remark || '' }}
                </template>
            </template>
        </ui-table-column>
    </ui-table-pro>
</template>

<script>
import {_updateRemark, _updateRecycleState } from '@/services/dashboard/audit';
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
    computed: {
        isAdminDetail() {
            return this.$route.path.match('process-detail-admin');
        }
    },
    data() {
        return {
            todoList: []
        };
    },
    created() {
        if(this.module.editable) {
            this.todoList = (this.progressInfo.toDoList || []).map(t => ({...t, state: ''}));
        } else {
            this.todoList = (this.progressInfo.toDoList || []);
        }
    },
    methods: {
        isCurr(row) {
            if(this.module.currNodeName === 'ReAll') {
                return this.checkIsCollect(row.todoContent);
            }
            return row.todoContent === this.module.currentNodeName;
        },
        checkIsCollect(t) {
            return ['办公电脑回收', '工作证/门禁/办公电脑回收', '工作证/门禁回收', '工作证/门禁/办公电脑回收'].includes(t);
        },
        checkIsFinish(t) {
            return ['常规事项交接', '系统待办/数据资产交接'].includes(t);
        },
        check() {
            if(!this.module.editable || !this.todoList?.length) return true;
            const collectItems = this.todoList.filter(t => this.isCurr(t) && this.checkIsCollect(t.todoContent));
            if(collectItems.length && collectItems.some(t => t.state === '' || !isNaN(Number(t.state)) && ![0, 1].includes(+t.state))) {
                this.$toast('请选择交接情况','warning');
                return false;
            } else {
                return true;
            }
        },
        async beforeAgree() {
            await this.saveResult();
            return true;
        },
        async saveResult() {
            if(!this.module.editable || !this.todoList?.length) return;

            const items = this.todoList.filter(t => this.isCurr(t));
            

            if(this.checkIsCollect(items[0]?.todoContent)) {
                const stateList = items?.map(t => ({
                    id: t.id,
                    state: t.state,
                    remark: t.remark
                })) || []; 
                _updateRecycleState({
                    items: stateList
                });
            } else {
                _updateRemark({
                    items: items?.map(t => ({
                        id: t.id,
                        remark: t.remark
                    })) || []
                });
            }

            return true;
        }
    }
};
</script>
