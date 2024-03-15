<template>
<div class="batch-approval-page">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(effectDateStr, 'effectDateStr', true)]">
                <span>生效日期</span>
                <div>{{ effectDateStr ? $dayjs(effectDateStr).format('YYYY-MM-DD') : '-' }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container approval-no-border">
        <h2 class="title">职级调整信息</h2>
        <!-- 异动信息 -->
        <ui-table-pro v-show="isLoad" :data="listInTable" class="table-pro-reset-ui"
            tooltip-effect="dark" tooltip-max-width="200px" 
            stripe :border="false" empty-text="暂无数据"
        >
            <ui-table-column prop="name" label="姓名" show-overflow-tooltip min-width="100px">
                <talentIcon :id="row.encryptUserId" slot-scope="{row}" :name="row.name" :blank="true" :no-tip="true" />
            </ui-table-column>
            <ui-table-column prop="number" label="编号" show-overflow-tooltip min-width="90px"></ui-table-column>
            <ui-table-column prop="beforeWorkplaceStr" show-overflow-tooltip label="工作地点" min-width="120px"></ui-table-column>
            <ui-table-column prop="beforeDeptName" label="部门" show-overflow-tooltip min-width="140px"></ui-table-column>
            <ui-table-column prop="beforeManageSeqLevelStr" label="管理职级" show-overflow-tooltip min-width="120px"></ui-table-column>
            <ui-table-column prop="beforeSeqLevelStr" label="专业职级" show-overflow-tooltip min-width="120px"></ui-table-column>
            <ui-table-column prop="isNormalName" label="是否正常升降级" min-width="120"></ui-table-column>
            <ui-table-column prop="retentionTime" label="停留时间" min-width="140px">
            </ui-table-column>
            <ui-table-column prop="upOrDownName" label="升降级类型" min-width="140px">
                <template slot-scope="{row}">
                    <span>{{ row.changeTypeStr || row.upOrDownName }}</span>
                </template>
            </ui-table-column>
            <ui-table-column prop="afterManageSeqLevelStr" label="调整后管理职级" min-width="140px"></ui-table-column>
            <ui-table-column prop="afterSeqLevelStr" label="调整后专业职级" min-width="140px"></ui-table-column>
            <ui-table-column prop="changeForStr" label="异动变化" min-width="180px"></ui-table-column>
        </ui-table-pro>
        <ui-pager
            v-show="tableData.length"
            class="center" text-align="center"
            show-total show-elevator show-sizer
            :total="pageData.total" :current="pageData.current"
            :page-size="pageData.pageSize" :page-size-opts="[15, 30, 50, 100]"
            @update:page="onCurrentPageChange" @update:pageSize="onPageSizeChange"
        >
        </ui-pager> 
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { getNameByCode } from '@/utils/util.js';
import { _getSpecialDictTypes } from '@/services/dashboard/system/common';
import talentIcon from '@/components/talent-entry-icon/index.vue';
export default {
    components: {
        talentIcon
    },
    name: 'ChangeApproval',
    mixins: [commonMixin],
    data() {
        return {
            effectDateStr: '',
            pageData: {                         // 分页配置
                total: 0,
                current: 1,
                pageSize: 30
            },
            isLoad: false,
            tableData: []
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        // 前端做分页处理
        listInTable() {
            const { current, pageSize } = this.pageData;
            let startNum =  (current - 1) * pageSize;
            this.isLoad = false;
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.isLoad = true;
            },100);
            return this.tableData.slice(startNum, startNum + pageSize);
        }
    },
    watch: {
        // listInTable: {
        //     deep: true,
        //     handler() {
        //         const { current, pageSize } = this.pageData;
        //         let startNum =  (current - 1) * pageSize;
        //         this.isLoad = false;
        //         clearTimeout(this.timer);
        //         this.timer = setTimeout(()=>{
        //             this.isLoad = true;
        //         },100);
        //     }
        // },
        tableData(value){
            this.pageData.total = value ? value.length : 0;
        }
    },
    created() {
        this.getProgressInfo();
        this.getNameByCode = getNameByCode;
    },
    methods: {
        // 获取审批详情
        async getProgressInfo() {
            try {
                const { success, root } = await this.getDetailApi({
                    processInstanceId: this.processId
                });
                if(!success || !root) return;
                // 列表顺序：①是否正常升降级 = 否 的优先排；②升降级 = 降级的优先排； ③按填写顺序
                this.tableData = (root.detail || []);
                this.effectDateStr = this.tableData[0] ? this.tableData[0].effectDateStr : '';
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 修改分页组件page
         * @param {String} page 页面数字
         */
        onCurrentPageChange(page) {
            this.pageData.current = +page;
        },
        /**
         * @description 修改分页组件pageSize
         * @param {String} pageSize 页面每页显示数量
         */
        onPageSizeChange(pageSize) {
            this.pageData.current = 1;
            this.pageData.pageSize = +pageSize;
        }
    }
};
</script>