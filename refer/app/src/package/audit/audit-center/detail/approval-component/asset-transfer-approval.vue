<template>
<div class="asset-transfer-approval__module">
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
        <!-- 异动信息 -->
        <div class="approval-component__inner">
            <ul class="approval-component__list">
                <li :class="['full-row', highlightClass(progressInfo, 'categoryName')]">
                    <span>资产信息</span>
                    <div>资产类别：{{ progressInfo.categoryName || '-' }}</div>
                    <div>型号规格：{{ progressInfo.typeSpecification || '-' }} </div>
                    <div>资产编号：{{ progressInfo.assetNo || '-' }}</div>
                </li>
                <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'equipmentImage')]">
                    <span>设备外观数据</span>
                    <div v-if="(progressInfo.equipmentAppearanceName || []).filter(Boolean).length" class="ll">
                        <div v-for="(item, index) in progressInfo.equipmentAppearanceName.filter(Boolean)" :key="index">{{ item }}</div>
                    </div>
                    <div v-else-if="!(progressInfo.imgUrl || []).length">-</div>

                    <div v-if="(progressInfo.imgUrl || []).length" :class="['mt20']">
                        <ul v-viewer="{ title: false, navbar: false, tooltip: false, }" class="attachment-list">
                            <li v-for="(item, index) in progressInfo.imgUrl || []" :key="index">
                                <img 
                                    v-loading="{
                                        src: getImgPreviewPath(item),
                                        err_html: `<div 
                                                style='height: 100%;
                                                color: red; background: #eee; 
                                                display: flex; align-items: center;justify-content: center'>
                                                        ${ '加载失败' }
                                                    </div>`,
                                    }"
                                    class="preview-image"
                                />
                            </li>
                        </ul>
                    </div>
                </li>
                <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'receiverName')]">
                    <span>资产接收人</span>
                    <div>{{ progressInfo.receiverName || '-' }}</div>
                </li>
                <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'formalExplain')]">
                    <span>转移原因</span>
                    <div>{{ progressInfo.transferReason || '-' }}</div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { mapState } from 'vuex';
import { _getAuditNodeStatusByProcessInstanceId } from '@/services/dashboard/audit';
import { getImgPreviewPath } from '@/utils/util';
export default {
    name: 'ChangeApproval',
    mixins: [commonMixin],
    components: {
    },
    computed: {
        ...mapState(['userInfo']),
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
        this.getImgPreviewPath = getImgPreviewPath;
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.progressInfo.imgUrl = this.progressInfo.equipmentImage ? this.progressInfo.equipmentImage.split(',') : [];
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        }
    }
};
</script>