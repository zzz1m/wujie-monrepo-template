<template>
<div class="it-approval__module">
    <div class="approval-component__container">
        <h2 class="title">
            基本信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'launcher.name', true)]">
                <span>姓名</span>
                <div>{{ _getValue(progressInfo, 'launcher.name', '-') }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'launcher.deptName', true)]">
                <span>末级部门</span>
                <div>{{ _getValue(progressInfo, 'launcher.deptName', '-') }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'launcher.workplace', true)]">
                <span>工作地点</span>
                <div>{{ _getValue(progressInfo, 'launcher.workplace', '-') }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">申请信息</h2>
        <ul class="approval-component__list">
            <li :class="['full-row', highlightClass(progressInfo, 'device')]">
                <span>维修设备</span>
                <div v-if="progressInfo.device">资产类别：{{ progressInfo.device.categoryName || '-' }} 型号规格：{{ progressInfo.device.typeSpecification || '-' }} 资产编号：{{ progressInfo.device.assetNo || '-' }}</div>
                <div v-else>-</div>
            </li>
            <li :class="['full-row', 'margin-top-20', highlightClass(progressInfo, 'desc')]">
                <span>详细说明</span>
                <div>{{ progressInfo.desc || '-' }}</div>
            </li>
            <li :class="['full-row', 'margin-top-20', highlightClass(progressInfo, 'fileKeys')]">
                <span>附件</span>
                <div>
                    <ul v-if="annexesList.length" class="approval-attachment-list">
                        <li v-for="(attachment, index) in annexesList" :key="index" class="attachment-list-content">
                            <div class="attachment-name">
                                <svg-icon :icon-class="getIconName(attachment.fileName)"></svg-icon>
                                <div class="attachment-title">
                                    <nari-tooltip :value="attachment.fileName" />
                                </div>
                            </div>
                            <div class="attachment-operation">
                                <router-link target="_blank" :to="`/api/common/file/preview.json?ossPath=${attachment.url.replace(/http.*(review|download)\//, '')}`" class="text-primary check-resume">
                                    <div class="icon-wrapper">
                                        <svg-icon icon-class="file-view"></svg-icon>
                                    </div>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                    <span v-else>-</span>
                </div>
            </li>
            <li v-if="adviceCodeShow" :class="['margin-top-20', 'margin-bottom-20', highlightClass(progressInfo, 'bpName')]">
                <span>处理意见</span>
                <div v-if="dataPrivilege.operatePrivilege">
                    <ui-select v-model="progressInfo.adviceCode"
                        placeholder="请选择"
                        clearable transfer
                        @on-change="onAdviceChange()"
                    >
                        <ui-option v-for="item in dictInfo.device_repair_advice"
                            :key="item.dictCode" :value="item.dictCode"
                        >
                            {{ item.dictName }}
                        </ui-option>
                    </ui-select>
                </div>
                <div v-else>{{ progressInfo.advice || '-' }}</div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { _updateRepairDevice } from '@/services/dashboard/it-order';
import { getNameByCode } from '@/utils/util.js';
import { mapState } from 'vuex';
import { _batchGetDictInfo } from '@/services/dashboard/common';
// 处理附件信息
const dealFile = (listStr = []) => {
    return listStr.map(ele => {
        const infoArr = (ele || '').split('||');
        return {
            fileName: infoArr[0],
            url: infoArr[1] ? `${window.location.origin}/api/common/file/download${infoArr[1]}` : ''
        };
    });
};

export default {
    name: 'OfferApproval',
    mixins: [commonMixin],
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        annexesList() {
            const { fileKeys } = this.progressInfo;
            return dealFile(fileKeys);
        },
        adviceCodeShow() {
            return this.progressInfo.isItAdministratorApprove || this.progressInfo.isItGroupApprove;
        },
        adviceCodeEdit() {
            return this.dataPrivilege.operatePrivilege && (this.progressInfo.isItAdministratorApprove || this.progressInfo.isItGroupApprove);
        }
    },
    data() {
        return {
            progressInfo: {},
            handlingOpinionsList: [
                {
                    value: '1',
                    label: '维修'
                },
                {
                    value: '2',
                    label: '报废'
                }
            ],
            dictInfo: {
                'device_repair_advice': []
            }
        };
    },
    created() {
        this.getDictInfo();
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
        // 在线预览
        previewAction(info) {
            window.open(`/api/common/file/preview.json?ossPath=${info.url.replace(/http.*(review|download)\//, '')}`);
        },
        // 下载
        downloadAction(info) {
            window.open(info.url);
        },
        // 确定之前 先保存密码
        async beforeSubmit() {
            if (!this.progressInfo.adviceCode && this.adviceCodeEdit) {
                this.$dialog({
                    title: '温馨提示',
                    content: '处理意见未填写',
                    type: 'warning'
                });
                return false;
            }
            return true;
        },
        async beforeAgree() {
            try {
                const { success, root } = await _updateRepairDevice({
                    ...this.progressInfo,
                    processInstanceId: this.processId
                });
                if(success) {
                    return {
                        postData: {}
                    };
                };
                return false;
            } catch(error) {
                console.log(error);
            }
        },
        // 获取下拉列表数据
        async getDictInfo() {
            try {
                const { success, root } = await _batchGetDictInfo({
                    typeList: Object.keys(this.dictInfo)
                });
                if(!success) return;
                this.dictInfo = root || {};
            } catch (error) {
                console.log(error);
            }
        },
        onAdviceChange() {
            this.progressInfo.advice = getNameByCode(this.progressInfo.adviceCode, this.dictInfo.device_repair_advice, '');
        }
    }
};
</script>