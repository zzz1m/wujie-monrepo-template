<!--表头设置 -->
<template>
<ui-dialog v-model="dialogShow" width="720" prevent-layer prevent-confirm class="side-scroll-dialog staff-roster__header-setting" @on-confirm="onConfirm">
    <template slot="title">对象名称</template>
    <template slot="content">
        <div class="setting-container">
            <div class="column">
                <!--左侧-->
                <div class="column-item column--left">
                    <div class="column__header" style="padding-left: 20px">
                        <ui-checkbox v-model="checkAll" :style="noVisibleCurrent && 'cursor: not-allowed'" :disabled="noVisibleCurrent" @on-change="checkAllChange"><span class="field-text" style="margin-left: 10px">全选</span></ui-checkbox>
                    </div>

                    <div ref="columnMain" class="column__main">
                        <ul>
                            <template v-for="(i, n) in currentFieldList">
                                <li v-if="isFieldShow(i)" :key="n" class="field-item">
                                    <ui-checkbox v-model="checkStatusData[i.id]" @on-change="itemChange"><span class="field-text">{{ i.name }}</span></ui-checkbox>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="btn-group">
                    <button class="btn ui-icon-arrow-right" :class="{'disabled': !isLeftChecked}" @click="onAdd"></button>
                    <button class="btn ui-icon-arrow-left" :class="{'disabled': !isRightChecked}" @click="onDelete"></button>
                </div>

                <!--右侧-->
                <div class="column-item column--right">
                    <div class="column__header">显示顺序</div>
                    <div class="column__main">
                        <draggable tag="ul" :list="resultFieldList" v-bind="dragOptions">
                            <li v-for="(i, n) in resultFieldList" :key="n" class="field-item">
                                <ui-checkbox v-model="i.check"><span class="field-text">{{ i.name }}</span></ui-checkbox>
                                <i class="ti-menu btn-action btn-sort"></i>
                            </li>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
    </template>
</ui-dialog>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    props: {
        // 是否显示checkbox
        showMulti: Boolean,
        moduleList: { type: Array, default: () => []} // 左侧字段列表
    },
    inject: ['vm'],
    components: { draggable },
    data() {
        return {
            id: '',
            dialogShow: false,
            dragOptions: Object.freeze({
                animation: 200,
                group: 'resultFieldList',
                ghostClass: 'sortable-ghost', // 设置拖动元素的class的占位符的类名。
                draggable: '.field-item' // 拖动元素
            }),
            resultFieldList: [], // 右侧筛选结果列表
            checkStatusData: {}, // 复选框选中状态
            checkAll: false
        };
    },
    computed: {
        moduleId() {
            return this.id && this.vm.configList[this.id]?.type;
        },
        currentFieldList () { // 当前字段列表
            let targetItem = this.moduleList.find(i => i.type == this.moduleId);
            return targetItem && targetItem.list || [];
        },
        noVisibleCurrent() {
            return this.currentFieldList.filter(i => this.isFieldShow(i))?.length === 0;
        },
        isLeftChecked () { // 左侧是否有 已经选中的
            let isChecked = false;
            for (let key in this.checkStatusData) {
                if (this.checkStatusData[key]) {
                    isChecked = true;
                    break;
                }
            }
            return isChecked;
        },
        isRightChecked () { // 右侧是否有 已经选中的
            return !!this.resultFieldList.find(i => i.check);
        }
    },
    watch: {
        dialogShow (show) {
            if (show) {
                this.getSelectedDetail();
            } else {
                this.resultFieldList = [];
                this.checkStatusData = {};
                this.checkAll = false;
            }
        },
        id() {
            this.$refs.columnMain && (this.$refs.columnMain.scrollTop = 0);
        }
    },
    methods: {
        checkAllChange() {
            const list = this.currentFieldList.filter(i => this.isFieldShow(i));
            if(this.checkAll) {
                list.forEach(fieldItem => {
                    this.$set(this.checkStatusData, fieldItem.id, true);
                });
            } else {
                list.forEach(fieldItem => {
                    this.$set(this.checkStatusData, fieldItem.id, false);
                });
            }
        },
        itemChange() {
            const list = this.currentFieldList.filter(i => this.isFieldShow(i));
            this.checkAll = list.length && list.map(k => this.checkStatusData[k.id]).reduce((val, cVal) => val && cVal, true) || false;
        },
        show (id, confirmCallback) {
            this.id = id; // mode: add、edit
            this.confirmCallback = confirmCallback;
            this.dialogShow = true;
        },
        isFieldShow (fieldItem) { // 控制左侧字段是否显示
            return !this.resultFieldList.find(i => i.id == fieldItem.id);
        },
        getSelectedDetail () { // 获取名册详情
            this.resultFieldList = this.vm.configList[this.id]?.fieldsList.map(i => ({
                id: i.code,
                name: i.label
            })) || [];
        },
        onAdd () { // 点击添加
            this.currentFieldList.forEach(fieldItem => {
                // 若是选中的
                this.checkStatusData[fieldItem.id] &&
                    this.resultFieldList.push({
                        ...fieldItem
                    });
            });
            this.checkStatusData = {}; // 清空状态
            this.itemChange();
        },
        onDelete () {
            this.resultFieldList = this.resultFieldList.filter(i => !i.check); // 覆盖原数组
        },
        _solvePostData () {
            let fieldJson = this.resultFieldList.map((i, n) => {
                return {
                    id: i.id,
                    name: i.name,
                    sort: n
                };
            });
            return {
                fieldJson: fieldJson.length ? JSON.stringify(fieldJson) : ''
            };
        },
        onConfirm () {
            if (!this.resultFieldList.length) {
                this.$toast('请选择需要导出的字段！', 'warning');
                return;
            }
            this.dialogShow = false;
            let postData = this._solvePostData();
            if (!postData.fieldJson) return;

            this.confirmCallback && this.confirmCallback(postData);
        }
    }
};
</script>