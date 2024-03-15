<template>
<div class="page-content flex-page-content performance-setting">
    <!-- search-panel -->
    <div class="search-panel"> 
        <div class="search-row">
            <div class="search-item">
                <label>绩效名称： </label>
                <ui-select v-model="queryData.kpiKey" class="search-item-select" placeholder="请选择年份">
                    <ui-option v-for="item in kpiKeyList" :key="item.kpiKey" :value="item.kpiKey">{{ item.name }}</ui-option>
                </ui-select>
            </div>
            <div class="search-item">
                <button type="button" class="btn btn-primary" @click="onMockClick('uploadConfig')">导入配置</button>
                <ui-upload
                    ref="uploadConfig" exname=".xls,.xlsx"
                    action="/api/kpi/admin/init/kpiData.json"
                    custom
                    @uploadEnd="uploadEnd"
                />
            </div>
            <!-- <div class="search-item">
                <button type="button" class="btn btn-primary" @click="onMockClick('uploadUser')">导入绩效人员</button>
                <ui-upload
                    ref="uploadUser" exname=".xls,.xlsx"
                    action="/api/kpi/admin/init/user.json"
                    custom
                    @uploadEnd="uploadEnd"
                />
            </div> -->
            <!-- <div class="search-item">
                <button type="button" class="btn btn-primary" @click="onMonthMockClick">导入月度绩效</button>
                <ui-upload
                    ref="uploadMonth" exname=".xls,.xlsx"
                    action="/api/kpi/admin/import/monthKpi.json"
                    custom
                    @uploadEnd="uploadMonthEnd"
                />
            </div> -->
            <!-- <div class="search-item">
                    <button class="btn btn-small btn-primary" @click="onSearch()">查询</button>
                </div> -->
        </div>
    </div>
    <div class="data-list no-pager">
        <div class="fix-table-warp">
            <div class="fix-table-content">
                <ui-table-pro
                    :data="tableData"
                    :height="100"
                    tooltip-effect="dark" tooltip-max-width="200px" class="table-pro-reset-ui"
                >
                    <template slot="empty">
                        <ui-pageloading v-if="isLoading"></ui-pageloading>
                        <ui-pagetip v-else style="max-height:300px;" :type="showLoadError?'error':'nodata'"></ui-pagetip>
                    </template>
                    <ui-table-column prop="nodeName" label="阶段名称" min-width="120" show-overflow-tooltip></ui-table-column>
                    <ui-table-column prop="startDateStr" label="开始时间" min-width="120" show-overflow-tooltip></ui-table-column>
                    <ui-table-column prop="endDateStr" label="结束时间" min-width="120" show-overflow-tooltip></ui-table-column>
                    <ui-table-column 
                        label="操作" width="120"
                    >
                        <template slot-scope="{row}">
                            <span 
                                class="text-primary column-operate-btn"
                                @click="handleShowEditDialog(row)"
                            >
                                修改
                            </span>
                        </template>
                    </ui-table-column>
                </ui-table-pro>
            </div>
        </div>
    </div>
    <!-- 编辑弹窗 -->
    <ui-dialog 
        v-model="showEditDialog"
        wrap-class="dialog-create-performance-warp" :title="`修改${currentRow.nodeName}时间`"
        prevent-cancel prevent-confirm  
        prevent-close prevent-layer
        @on-confirm="onCreateOrEditConfirm"
        @on-cancel="onEditDialogClose"
        @on-close="onEditDialogClose"
    >
        <template slot="content">
            <ui-form ref="form" 
                :model="formData" :rules="ruleData" :inline="true" label-position="right" :label-width="76"
            >
                <div class="form-group">
                    <form-item label="开始时间：" prop="startDate">
                        <ui-date-picker
                            v-model="formData.startDate"
                            type="datetime" placeholder="开始时间" default-time="00:00:00" value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </ui-date-picker>
                    </form-item>
                    <form-item label="结束时间：" prop="endDate">
                        <ui-date-picker
                            v-model="formData.endDate"
                            type="datetime" placeholder="开始时间" default-time="23:59:59" value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </ui-date-picker>
                    </form-item>
                </div>
            </ui-form>
        </template>
    </ui-dialog>
</div>
</template>
<script>
import { _getKpiDateList, _getKpiInfoList, _updateKpiDate} from '@/services/dashboard/performance/index.js';
import kpiDate from '../utils/kpi-date.mixin';

export default {
    mixins: [kpiDate],
    data() {
        return {
            queryData: {                    // 查询条件
                kpiKey: ''
            },
            formData: {                     // 编辑弹窗数据
                startDate: '',
                endDate: ''
            },
            kpiKeyList: [],                 // 绩效名称列表
            showEditDialog: false,          // 显示新增编辑弹窗
            currentRow: {},                 // 弹窗出现时 所选中的合同对象
            isLoading: true,                // 显示加载中
            showLoadError: false,           // 显示错误信息
            tableData: [],                  // 表格数据
            ruleData: {                     // 校验规则
                startDate: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                endDate: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                    // { validator: this.endDateRule, trigger: 'change' },
                ]
            }
        };
    },

    mounted() {
        this.init();
    },

    computed: {
        // 开始时间输入禁用  小于当前时间不可编辑
        startDateDisable() {
            return this.dateDisable(this.currentRow.startDateStr);
        },
        // 结束时间输入禁用  小于当前时间不可编辑
        endDateDisable() {
            return this.dateDisable(this.currentRow.endDateStr);
        }
    },

    watch: {
        'queryData.kpiKey': function() {
            this.onSearch();
        }
    },

    methods: {
        init() {
            this.getKpiKeyList();
        },
        // 获取kpi信息列表 用于查询区域
        async getKpiKeyList() {
            try {
                const { success, root } = await _getKpiInfoList();
                if (success && root && root.length) {
                    this.kpiKeyList = root;
                    this.queryData.kpiKey = root[0].kpiKey;
                    this.onSearch();
                }
            } catch (error) {
                console.log(error);
            }
        },

        // 页面搜索方法
        async onSearch(page) {
            try {
                this.isLoading = true;
                const { kpiKey } =  this.queryData;
                const { success, root } = await _getKpiDateList({
                    kpiKey
                });
                if (success && root) {
                    this.tableData = root;
                }
            } catch (e) {
                this.showLoadError = true;
                console.log(e);
            } finally {
                this.isLoading = false;
            }

        },
    
        /**
         * @description 显示编辑弹窗
         * @param {Object} row 当前行对象
         */
        handleShowEditDialog(row) {
            this.currentRow = row;
            this.formData.startDate = row.startDateStr;
            this.formData.endDate = row.endDateStr;
            this.showEditDialog = true;
        },

        /**
         * @description 关闭编辑弹窗
         */
        onEditDialogClose() {
            this.showEditDialog = false;
            this.$refs['form'].resetFields();
        },

        /**
         * @description 编辑弹窗提交
         */
        async onCreateOrEditConfirm() {
            const valid = await this.$refs['form'].validate();
            if (!valid) { return; }
            try {
                const { nodeKey, kpiKey } = this.currentRow;
                let data = {
                    ...this.formData,
                    node: nodeKey,
                    kpiKey
                };
                let res = await _updateKpiDate(data);
                if (res.success && res.root) {
                    this.onEditDialogClose();
                    this.onSearch();
                    this.$toast({
                        content: '保存成功！',
                        type: 'success'
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * @description 禁用时间输入框
         * @param {String}} datetime 时间字符串
         */
        dateDisable(datetime) {
            if (!datetime) {
                return false;
            }
            return this.$dayjs(datetime).valueOf() < Date.now();
        },

        // 开始时间选择禁用
        disabledStartDate(time) {
            let endData = this.formData.endDate;
            return (
                time.getTime() <= Date.now()
                || (endData && time.getTime() > this.$dayjs(endData).valueOf()));
        },

        // 结束时间选择禁用 结束日期小于当日 或者 小于开始时间的日期 不可选
        disabledEndDate(time) {
            let startDate = this.formData.startDate;
            let currentDay = this.$dayjs(Date.now()).format('YYYY-MM-DD');
            return (
                this.$dayjs(time.getTime()).valueOf() < this.$dayjs(currentDay)
                || time.getTime() < this.$dayjs(startDate).valueOf());
        },

        // 合同期限校验规则
        endDateRule(rule, value, callback) {
            let { startDate, endDate } = this.formData;
            // 只读状态 不进行校验
            if (this.endDateDisable) {  callback(); }

            if (endDate && (this.$dayjs(endDate).valueOf() <= Date.now())) {
                callback(new Error('结束时间必须大于当前时间'));
            } else if (endDate && (this.$dayjs(endDate).valueOf() <= this.$dayjs(startDate).valueOf())) {
                callback(new Error('结束时间必须大于开始时间'));
            } else {
                callback();
            }
        },
        onMockClick(key) {
            this.$refs[key].mockClick();
        },
        uploadEnd(res) {
            let { success } = res.data;
            if (success) {
                this.$toast({
                    content: '导入成功！',
                    type:'success'
                });
                
            } else {
                this.$toast({
                    content: '导入失败!',
                    type:'error'
                });
            }
        },
        onMonthMockClick() {
            this.$refs.uploadMonth.mockClick();
        },
        uploadMonthEnd(res) {
            let { success } = res.data;
            if (success) {
                this.$toast({
                    content: '导入成功！',
                    type:'success'
                });
            } else {
                this.$toast({
                    content: '导入失败!',
                    type:'error'
                });
            }
        }
    }
};
</script>