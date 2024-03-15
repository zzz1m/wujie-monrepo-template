<template>
<div class="page-content evaluation-manage">
    <!-- 搜索区域 -->
    <div class="search-panel"> 
        <div class="search-row">
            <div class="search-item width-160">
                <ui-select v-model="queryData.kpiKey" class="search-item-select" placeholder="绩效名称" style="width:350px">
                    <ui-option v-for="item in kpiKeyList" :key="item.kpiKey" :value="item.kpiKey">{{ item.name }}</ui-option>
                </ui-select>
            </div>
            <div class="search-item">
                <ui-select-last ref="depart" v-model="queryData.deptId" :clearable="true" placeholder="请选择部门" class="depart-tree search-ipt">
                    <template slot="options">
                        <ul>
                            <partment-tree
                                v-for="(item, index) in partmentData"
                                :key="index"
                                :tree-data="item"
                                :current-id="queryData.deptId"
                                @update:select="onToggle"
                            ></partment-tree>
                        </ul>
                    </template>
                    <span v-if="queryData.deptId" slot="partment-tree-suffix-label" @click="clearDept">
                        <i class="ui-icon-circle-close"></i>
                    </span>
                </ui-select-last>
            </div>
            <div class="search-item">
                <ui-select v-model="queryData.roleKey" :clearable="true" class="search-item-select" placeholder="请选择类型" style="width:180px">
                    <ui-option v-for="key in Object.keys(typeMap)" :key="key" :value="key">{{ typeMap[key] }}</ui-option>
                </ui-select>
            </div>
            <div class="search-item">
                <ui-input v-model.trim="queryData.userName" placeholder="请输入姓名" style="width:180px"
                    size="large" @on-enter.prevent="onSearch()"
                >
                </ui-input>
            </div>
            <div class="search-item">
                <button class="btn btn-small btn-primary" @click="onSearch()">查询</button>
            </div>
            <div class="line"></div>
            <div>
                <!-- <div class="search-item">
                    <button type="button" class="btn btn-primary" @click="onMockClick">导入名单</button>
                    <ui-upload
                        ref="upload" exname=".xls,.xlsx"
                        action="/api/kpi/admin/import/userChange.json"
                        custom
                        @uploadEnd="uploadEnd"
                    />
                </div> -->
                <div class="search-item">
                    <a 
                        class="btn btn-small btn-primary" 
                        :href="`/api/kpi/admin/exportChangeRelation.json?deptId=${queryData.deptId}&userName=${queryData.userName}&roleKey=${queryData.roleKey}&kpiKey=${queryData.kpiKey}`"
                    >
                        导出评价关系
                    </a>
                </div>
                <div class="search-item">
                    <button type="button" class="btn btn-primary" @click="onMonthMockClick">导入月度绩效</button>
                    <ui-upload
                        ref="uploadMonth" exname=".xls,.xlsx"
                        action="/api/kpi/admin/import/monthKpi.json"
                        custom
                        @uploadEnd="uploadMonthEnd"
                    />
                </div>
                <div class="search-item">
                    <button type="button" class="btn btn-primary" @click="onRelationMockClick">导入评价关系</button>
                    <ui-upload
                        ref="uploadRelation" exname=".xls,.xlsx"
                        action="/api/kpi/admin/import/userChange.json"
                        custom
                        @uploadEnd="uploadRelationEnd"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- 表格区域 -->
    <div class="data-list">
        <!-- 正在加载 -->
        <div v-if="isLoading" class="row-pageloading">
            <ui-pageloading></ui-pageloading>
        </div>
        <!-- 接口报错 -->
        <div v-else-if="showLoadError" class="row-nodata">
            <ui-pagetip type="error"></ui-pagetip>
        </div>
        <ui-table-pro
            tooltip-effect="dark" height="100%" tooltip-max-width="200px" class="evaluation-table table-pro-reset-ui"
            :cell-class-name="getCellClassName" :data="tableData" 
        >
            <!-- 没有数据 -->
            <div slot="empty" class="row-nodata">
                <ui-pagetip type="nodata"></ui-pagetip>
            </div>
            <ui-table-column prop="userName" label="姓名" fixed="left" min-width="100" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="deptName" label="部门" min-width="100" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="email" label="邮箱" min-width="120" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="stateStr" label="员工状态" min-width="100" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="seq" label="序列" min-width="100" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{ getNameByCode(row.seq, seqList) }}
                </template>
            </ui-table-column>
            <ui-table-column prop="joinKpi" label="是否参与绩效考核" min-width="140" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{ row.joinKpi ? '是' : '否' }}
                </template>
            </ui-table-column>

            <ui-table-column label="类型" min-width="100" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{ row.roleName || '' }}
                </template>
            </ui-table-column>
            <ui-table-column prop="leader" label="上级" min-width="100" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="cooperate1" label="协作方" min-width="120" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="cooperate2" label="协作方二" min-width="120" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="subordinate" label="下级" min-width="120" show-overflow-tooltip></ui-table-column>
            <ui-table-column prop="leaderPro" label="专业上级" min-width="120" show-overflow-tooltip></ui-table-column>
            <ui-table-column 
                label="操作" width="120" fixed="right"
            >
                <template slot-scope="{row}">
                    <ui-tooltip v-if="!snapShotDateFlag" transition="" popper-class="operate-btn__tooltip" :open-delay="300" placement="bottom-start">
                        <a href="javascript:;" class="operate-btn__more inline">
                            <img class="operate-btn-dot" src="@/assets/images/dotdot.png" alt="" />
                        </a>
                        <ul slot="content">
                            <li 
                                v-for="key in Object.keys(editTypeMap)" :key="key"
                                @click="handleShowEditDialog(row, key)"
                            >
                                修改{{ editTypeMap[key] }}
                            </li>
                        </ul>
                        <!-- <ul slot="content">
                            <li @click="$refs['dep-manage'].show('add')">创建部门</li>
                            <li @click="checkboxShow = true">合并</li>
                        </ul> -->
                    </ui-tooltip>
                    <!-- <div 
                        class="text-primary column-operate-btn"
                    >
                        <ui-dropmenu>
                            <i class="ui-icon-more" trigger="hover"></i>
                            <ul slot="options">
                                <li 
                                    v-for="key in Object.keys(editTypeMap)" :key="key"
                                    @click="handleShowEditDialog(row, key)"
                                >
                                    修改{{ editTypeMap[key] }}
                                </li>
                            </ul>
                        </ui-dropmenu>
                    </div> -->
                </template>
            </ui-table-column>
        </ui-table-pro>
        <ui-pager 
            v-show="tableData.length"
            class="fasion-pager" text-align="center"
            show-elevator show-sizer
            :total="pageData.total" :current="pageData.current"
            :page-size="pageData.pageSize" :page-size-opts="[15, 30, 50, 100]"
            @update:page="onCurrentPageChange" @update:pageSize="onPageSizeChange"
        >
        </ui-pager>
    </div>
    <!-- 新增编辑弹窗 -->
    <ui-dialog 
        v-model="showEditDialog"
        wrap-class="dialog-evaluation-relationship" :title="`修改${currentEditTitle}`"

        prevent-cancel prevent-confirm  
        prevent-close prevent-layer
        @on-confirm="onEditConfirm"
        @on-cancel="onEditDialogClose"
        @on-close="onEditDialogClose"
    >
        <template slot="content">
            <ui-form 
                ref="form" class="evaluation-form" label-position="right" 
                :model="formData" :rules="ruleData" :label-width="100"
            >
                <div class="title"></div>
                <p v-if="editType === 'ROLE_KEY'" style="margin:10px 0;color:red">修改类型后，评价模板将变成对应类型的模板，且历史已评价数据<br>会被清空，请提前备份。</p>
                <form-item v-if="editType === 'ROLE_KEY'" prop="role" :label="`${currentEditTitle}:`">
                    <ui-select v-model="formData.role" class="search-item-select" placeholder="请选择类型">
                        <ui-option v-for="key in Object.keys(typeMap)" :key="key" :value="key">{{ typeMap[key] }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item v-else-if="editType === 'JOIN_KPI'" prop="joinKpi" :label="`${currentEditTitle}:`">
                    <ui-select v-model="formData.joinKpi" class="search-item-select" placeholder="请选择">
                        <ui-option v-for="item in yesOrNoList" :key="item.value" :value="item.value">{{ item.label }}</ui-option>
                    </ui-select>
                </form-item>
                <!-- 这里暂时不做回显处理 没有必要 需要修改了 在回显 用户还需要自己删除 -->
                <form-item v-else prop="user" :label="`${currentEditTitle}:`">
                    <ui-suggest v-model="formData.user" :list="userList" @on-query="handleQuery" @on-select="handleSelect">
                        <template #item="{ item }">{{ item.userName }}-{{ item.email }}-{{ item.deptName }}</template>
                    </ui-suggest>
                </form-item>
            </ui-form>
        </template>
    </ui-dialog>
</div>
</template>
<script>
import { newkpiUser, _getChangeRelation, _UserChangeRelations, _getKpiInfoList, _getDeptLeaderKpiTreeHistory, _updateJoinKpi, _updateUserKpiRole } from '@/services/dashboard/performance/index.js';
import partmentTree from '@/components/partment-tree';
import { debounce } from '@/utils/common';
import { _getValue, getNameByCode } from '@/utils/util';
import { _getSpecialDictTypes } from '@/services/dashboard/system/common';
export default {
    components: {
        partmentTree
    },
    data() {
        return {
            queryData: {                    // 查询数据
                userName: '',
                deptId: '',
                roleKey: '',
                kpiKey: ''
            },
            formData: {                     // 编辑表单数据
                role: '',
                user: '',
                userId: '',
                joinKpi: '1'
            },
            roleList: [{                    // 角色列表
                label: '管理',
                value: 1
            }, {
                label: '员工',
                value: 2
            }],
            yesOrNoList: [{                    // 是否列表
                label: '是',
                value: '1'
            }, {
                label: '否',
                value: '0'
            }],
            partmentData: [],               // 部门列表
            pageData: {                     // 分页数据
                total: 0,
                current: 1,
                pageSize: 15
            },
            editType: '',                   // 当前编辑的类型
            showEditDialog: false,          // 显示新增编辑弹窗
            currentRow: {},                 // 弹窗出现时 所选中的合同对象
            isLoading: true,                // 显示加载中
            showLoadError: false,           // 显示错误信息
            tableData: [],                  // 表格数据
            ruleData: {                     // 编辑区域校验规则
                role: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                user: [
                    { required: true, message: '请输入内容', trigger: 'change' }
                ],
                joinKpi: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            },
            editTypeMap: {                  // 编辑类型对应的中文映射     
                ROLE_KEY: '类型',              
                LEADER: '上级',
                COOPERATE: '协作方',
                COOPERATE2: '协作方二',
                SUBORDINATE: '下级',
                LEADER_PRO: '专业上级',
                JOIN_KPI: '是否参与绩效考核'
            },
            userList: [],                   // 人员编辑列表
            userRoleMap: {
                MEMBER_ONE: '员工单线',
                MEMBER_TWO: '员工双线',
                LEADER_ONE: '管理单线',
                LEADER_TWO: '管理双线'
            },
            typeMap: {
                role_one: '类型一',
                role_two: '类型二'
            },
            seqList: [],                    // 序列列表
            kpiKeyList: []
        };
    },
    mounted() {
        this.init();
        this.getNameByCode = getNameByCode;
    },

    computed: {
        currentEditTitle() {                 // 编辑弹窗表头
            return this.editTypeMap[this.editType];
        }
    },

    methods: {
        async init() {
            await this.getKpiKeyList();
            this.rawOnSearch();
            this.getDeptList();
            this.getSeqList();
        },
        onSearch: debounce(300, function(...p) {
            this.rawOnSearch(...p);
        }),
        // 页面搜索方法
        async rawOnSearch(page = 1) {
            try {
                this.isLoading = true;
                this.pageData.current = page;
                const { current, pageSize } = this.pageData;
                const {success, root} = await _getChangeRelation({
                    ...this.queryData,
                    page: current,
                    pageSize: pageSize
                });
                if (success && root) {
                    this.tableData = _getValue(root, 'data', []);
                    this.pageData.total = root.totalCount;
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.isLoading = false;
            }

        },
        
        /**
         * @description 修改分页组件page
         * @Parms {String} page 页面数字
         */
        onCurrentPageChange(page) {
            this.onSearch(+page);
        },
        /**
         * @description 修改分页组件pageSize
         * @Parms {String} pageSize 每页显示条数
         */
        onPageSizeChange: debounce(100, function(pageSize) {
            this.pageData.pageSize = +pageSize;
            this.onSearch();
        }),

        /**
         * @description 显示新增编辑弹窗
         */
        handleShowEditDialog(row, type) {
            this.currentRow = row;
            this.editType = type;
            this.showEditDialog = true;
        },

        /**
         * @description 关闭新增编辑弹窗
         */
        onEditDialogClose() {
            this.showEditDialog = false;
            this.$refs['form'].resetFields();
            this.formData = {                    
                role: '',
                user: '',
                userId: '',
                joinKpi: '1'
            };
        },

        /**
         * @description 新增编辑弹窗提交
         */
        async onEditConfirm() {
            const valid = await this.$refs['form'].validate();
            if (!valid) { return; }
            try {
                // contractType contractSubject 针对多层级select值进行处理 只取数据的最后一项的值
                //  ...this.formData,
                const { id, userId, deptId, kpiKey} = this.currentRow;
                const relationUserId = this.formData.userId;
                const joinKpi = this.formData.joinKpi;
                let data = {
                    kpiKey: kpiKey,                             // 绩效的KEY
                    userId,                                     // 绩效被评价人ID
                    relationUserId,                             // 评价人ID
                    relationType: this.editType,                // 评价人类型
                    label: ''                                  // 这个字段保留字段以后可能会用
                };
                let joinKpiData = {
                    kpiKey: kpiKey,      
                    userId,
                    isJoinKpi: joinKpi === '0' ? false : true    // 是否参与绩效评价
                };
                let roleData = {
                    kpiKey: kpiKey,
                    userId,
                    roleKey: this.formData.role
                };
                let res = {};
                if (this.editType === 'JOIN_KPI') {
                    res = await _updateJoinKpi(joinKpiData);
                } else if (this.editType === 'ROLE_KEY') {
                    res = await _updateUserKpiRole(roleData);
                } else {
                    res = await _UserChangeRelations(data);
                }

                if (res.success) {
                    this.onEditDialogClose();
                    this.onSearch(this.pageData.current);
                    this.$toast({
                        content: '修改成功！',
                        type: 'success'
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * @description 获取部门列表
         */
        async getDeptList() {
            if (!this.queryData.kpiKey) return;
            try {
                const res = await _getDeptLeaderKpiTreeHistory({
                    kpiKey: this.queryData.kpiKey,
                    pageSource: 'admin'
                });
                if (res.success) {
                    this.partmentData = res.root || [];
                    this.partmentData.unshift({ name: '全部' });
                } else {
                    this.partmentData = [];
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 部门选择
         */
        onToggle(data) {
            const select = this.$refs.depart;
            select.isOpen = false;
            this.queryData.deptId = data.id;
            select.setCurrentLabel(data.name);
            this.page = 1;
            this.rawOnSearch();
        },
        clearDept() {
            const select = this.$refs.depart;
            select.isOpen = false;
            this.queryData.deptId = '';
            select.setCurrentLabel('');
            this.page = 1;
            this.rawOnSearch();
        },
        /**
         * @description 人员suggest方法
         * @param {String} 输入的内容
         */
        async handleQuery(keyWork) {
            try {
                const { success, root } = await newkpiUser({ keyWork, kpiKey: this.currentRow.kpiKey });
                if (success && root) {
                    this.userList = root;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 人员选择确认方法
         * @param {Object} 选中的项
         */
        handleSelect(data) {
            // data为list[]中选中的某项
            this.formData.user = `${data.userName}-${data.email}-${data.deptName}`;
            this.formData.userId = data.userId;
            this.list = []; // 清不清空都可以
        },
        /**
         * @description 给列表操作列特殊class用于控制样式
         */
        getCellClassName({ column }) {
            if (column && column.label === '操作') {
                return 'cell-operation';
            }
        },
        /**
         * @description 获取最新的kpiKey
         */
        async getKpiKeyList() {
            try {
                const { success, root } = await _getKpiInfoList();
                if (success && root && root.length) {
                    this.kpiKeyList = root;
                    this.queryData.kpiKey = root[0].kpiKey;
                }
            } catch (error) {
                console.log(error);
            }
        },
        onMockClick() {
            this.$refs.upload.mockClick();
        },
        uploadEnd(res) {
            let { success } = res.data;
            if (success) {
                this.$toast({
                    content: '导入成功！',
                    type:'success'
                });
                this.onSearch();
            } else {
                this.$toast({
                    content: '导入失败!',
                    type:'error'
                });
            }
        },
        // 获取序列下拉列表
        async getSeqList() {
            const { root } = await _getSpecialDictTypes({
                dictType: 'seq',
                url: '/api/sys/dict/seq/list.json'
            });
            this.seqList = (root || []);
        },
        onMonthMockClick() {
            this.$refs.uploadMonth.mockClick();
        },
        onRelationMockClick() {
            this.$refs.uploadRelation.mockClick();
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
        },
        uploadRelationEnd(res) {
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
<style lang="less" scoped>
.line {
    width: 100%;
    height: 1px;
    background: #F2F3F5;
    margin: 20px 0px 10px;
}
</style>