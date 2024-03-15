<template>
    <div class="attendance-approval__module">
        <div class="approval-component__container">
            <h2 class="title">基本信息</h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userName')]">
                    <span>姓名</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.userName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'deptName')]">
                    <span>末级部门</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.deptName" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__container">
            <h2 class="title">申请信息</h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userName')]">
                    <span>物品名称及数量</span>
                    <div>
                        {{ `${progressInfo.brandName || ''}${progressInfo.speciesName || ''}` }}
                        <span style="flex-shrink: 0; white-space: nowrap;margin-left: 4px">x {{ progressInfo.num }}{{ progressInfo.unit || '' }}</span>
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userName')]">
                    <span>申请时间</span>
                    <div>
                        {{ $dayjs(progressInfo.applyTime).format('YYYY-MM-DD HH:mm:ss') }}
                    </div>
                </li>
                <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'remark')]">
                    <span>原因</span>
                    <div>{{ progressInfo.remark || '-' }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import commonMixin from './mixins';
export default {
    name: 'EquipmentApply',
    mixins: [commonMixin],
    computed: {
        processId() {
            return this.$route.query.processId;
        }
    },
    data() {
        return {
            progressInfo: {}
        };
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
            if (!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        }
    }
};
</script>
