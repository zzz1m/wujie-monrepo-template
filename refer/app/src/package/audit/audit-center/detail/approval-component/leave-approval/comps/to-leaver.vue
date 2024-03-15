<template>
    <div>
        <p v-if="isToLeaver" style="color:#14c0bd;margin-bottom: 16px">您应积极配合公司办理离职交接，包括但不限于在离职手续办结前遵守公司纪律和制度，根据公司安排完成工作移交、归还公司资产、结清财务账目等，否则公司有权追究您的法律责任。</p>

        <ui-table-pro
            :data="todoList" empty-text="暂无数据"
            class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
        >
            <ui-table-column label="交接事项" prop="todoContent" show-overflow-tooltip></ui-table-column>
            <ui-table-column label="办理情况" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <template v-if="['常规事项交接', '系统待办/数据资产交接'].includes(row.todoContent)">已完成</template>
                    <template v-else-if="isCollect(row.todoContent)">
                        {{ row.state? `${row.recycleState? '已':'未'}回收${row.remark? `，${row.remark}`: ''}`: '' }}
                    </template>
                    <template v-else>
                        {{ row.state? `已处理${row.remark? `，${row.remark}`: ''}`: '' }}
                    </template>
                </template>
            </ui-table-column>
            <ui-table-column label="联系人" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{ row.processUserInfo && row.processUserInfo.length && row.processUserInfo.map(t => `${t.name}[${t.email}]`).join('、') }}
                </template>
            </ui-table-column>
        </ui-table-pro>

        <p v-if="isToLeaver" style="margin-top: 16px">以上全部离职交接事项办理完成后，联系HR{{ hrName ? `（${hrName}）`: '' }}出具证明。</p>
    </div>
</template>

<script>
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
        isToLeaver() {
            return !!this.module.subTitle;
        },
        hrName() {
            return this.progressInfo?.hrNames?.length && this.progressInfo?.hrNames.join('、');
        }
    },
    data() {
        return {
            todoList: []
        };
    },
    created() {
        this.todoList = this.progressInfo.toDoList || [];
    },
    methods: {
        isCollect(val) {
            return ['办公电脑回收', '工作证/门禁/办公电脑回收', '工作证/门禁回收', '工作证/门禁/办公电脑回收'].includes(val);
        }
    }
};
</script>