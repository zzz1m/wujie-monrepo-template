<template>
<div class="month-performance__module">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userName')]">
                <span>姓名</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.submitName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'deptName')]">
                <span>末级部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.submitDeptName" />
                </div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">申请信息</h2>
        <div class="approval-component__inner">
            <!-- todo 详细内容，表格预览用ui-tables -->
            <ul class="approval-component__list">
                <li :class="['row-40']">
                    <span>月份</span>
                    <div>{{ progressInfo.kpiMonth || '-' }}</div>
                </li>
                <li :class="['row-40']">
                    <span>绩效组</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.kpiGroupName" />
                    </div>
                </li>
                <li :class="['full-row mt40']">
                    <span>详细说明</span>
                    <div>{{ progressInfo.kpiDesc || '-'  }}</div>
                </li>
                <li :class="['full-row mt40']">
                    <span>月度绩效</span>
                    <div v-if="progressInfo.monthKpiFile" class="table-preview-block-wrap">
                        <div  class="table-preview-block">
                            <svg-icon icon-class="icon-excel"></svg-icon>
                            <div class="filename">{{ progressInfo.monthKpiFile.split('||')[0] }}</div>
                            <svg-icon class="preview-btn" icon-class="file-view" @click.native="handleShowTable('monthKpiDataList')"></svg-icon>
                        </div>
                    </div>
                    <div v-else>-</div>
                </li>
                <li :class="['full-row mt40']">
                    <span>季度绩效</span>
                    <div v-if="progressInfo.seasonKpiFile" class="table-preview-block-wrap">
                        <div class="table-preview-block">
                            <svg-icon icon-class="icon-excel"></svg-icon>
                            <div class="filename">{{ progressInfo.seasonKpiFile.split('||')[0] }}</div>
                            <svg-icon class="preview-btn" icon-class="file-view" @click.native="handleShowTable('seasonKpiDataList')"></svg-icon>
                        </div>
                    </div>
                    <div v-else>-</div>
                </li>
                <li :class="['full-row mt40']">
                    <span>奖金</span>
                    <div v-if="progressInfo.bonusKpiFile" class="table-preview-block-wrap">
                        <div class="table-preview-block">
                            <svg-icon icon-class="icon-excel"></svg-icon>
                            <div class="filename">{{ progressInfo.bonusKpiFile.split('||')[0] }}</div>
                            <svg-icon class="preview-btn" icon-class="file-view" @click.native="handleShowTable('bonusKpiDataList')"></svg-icon>
                        </div>
                    </div>

                    <div v-else>-</div>
                </li>
            </ul>
        </div>
    </div>
    <EditDialog ref="editDialog" :table-list="tableList" />
</div>
</template>

<script>
import commonMixin from '../mixins';
import EditDialog from './edit-dialog.vue';

export default {
    name: 'MonthPerformance',
    mixins: [commonMixin],
    components: {
        EditDialog
    },
    data() {
        return {
            progressInfo: {},
            tableList: []
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        }
    },
    created() {
        this.getProgressInfo();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        },
        handleShowTable(key) {
            this.tableList = this.progressInfo[key];
            this.$refs.editDialog.open({}, 'TableList');
        }
    }
};
</script>

<style lang="less" scoped>
.table-preview-block-wrap {
    display: flex;
    .table-preview-block {
    min-width: 416px;
    // max-width: 100%;
    background: #F7F8FA;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding: 16px;
    .filename {
        flex: 1;
        margin: 0 12px;
    }
    .svg-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        &.preview-btn {
            transition: all ease-in-out 0.2s;
            &:hover {
                color: #00B8BF;
            }
        }
    }
}
}

</style>
