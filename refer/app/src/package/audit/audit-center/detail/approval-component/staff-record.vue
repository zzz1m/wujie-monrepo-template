<template>
<div class="staff-approval__module">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userInfoVO.name')]">
                <span>姓名</span>
                <div>
                    <nari-tooltip :show-tip="false"  :value="userInfoVO.name" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInfoVO.number')]">
                <span>员工编号</span>
                <div>
                    <nari-tooltip :show-tip="false"  :value="userInfoVO.number" />
                </div>
            </li>
        </ul>
    </div>
    <div v-if="(groupVOList || []).length || userRecordTempVO.headImage" class="approval-component__container">
        <h2 class="title">修改信息</h2>
        <!-- 个人档案修改了照片审批 -->
        <div v-if="userRecordTempVO.headImage" class="approval-component__inner">
            <h2 class="title">
                基本信息
            </h2>
            <ui-table-pro
class="table-pro-reset-ui" :data="[userRecordTempVO.headImage]"
                empty-text="暂无数据"
            >
                <ui-table-column label="修改类型" width="200">编辑</ui-table-column>
                <ui-table-column label="照片">
                    <template slot-scope="{ row }">
                        <a
class="text-primary" href="javascript:void(0)"
                            @click="headImageClick(previewImg(row))"
                        >
                            点击预览
                        </a>
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <div v-for="(group, index) in groupVOList" :key="index" class="approval-component__inner">
            <h2 class="title">
                {{ group.name || '' }}
            </h2>
            <ui-table-pro
class="table-pro-reset-ui" :data="groupFieldValueMap[group.id] || []"
                empty-text="暂无数据" tooltip-effect="dark" tooltip-max-width="400px"
            >
                <ui-table-column label="修改类型" width="100">
                    <template slot-scope="{ row }">
                        <span v-if="row[group.id] == 1">新增</span>
                        <span v-else-if="row[group.id] == 2">编辑</span>
                        <span v-else-if="row[group.id] == 3">删除</span>
                    </template>
                </ui-table-column>
                <ui-table-column
v-for="(field, fieldIndex) in group.fieldVOList || []" :key="fieldIndex"
                    :min-width="200" show-overflow-tooltip
                >
                    <template slot="header"><nari-tooltip :value="field.name" /></template>
                    <template slot-scope="{ row }">{{ parseFieldValue(field, row) }}</template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <!-- 附件信息 -->
        <div v-if="(userRecordTempVO.attachList || []).length" class="approval-component__inner">
            <ul  class="approval-component__list">
                <li class="full-row">
                    <span>附件</span>
                    <div>
                        <ul class="download-list">
                            <li v-for="(item, index) in userRecordTempVO.attachList" :key="index">
                                <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                                <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- 照片预览 -->
    <ui-dialog v-model="imagePreview" class="image-preview-dialog" :show-footer="false" title="照片预览">
        <template v-if="imagePreview" slot="content">
            <div class="image-container">
                <transition mode="out-in" name="fade">
                    <div v-if="headImageLoading" class="data-tips">
                        <div class="tip-inner">
                            <p class="gray"><i class="ui-icon-loading"></i>正在加载中...</p>
                        </div>
                    </div>
                    <img v-else-if="headImageLoadError" :src="defaultAvatar" />
                    <img v-else :src="previewImg(userRecordTempVO.headImage)" />
                </transition>
            </div>
        </template>
    </ui-dialog>
</div>
</template>
<script>
import commonMixin from './mixins';
import { commonConfig } from '@noah/tools';
const {  moduleConfigMap } = commonConfig.staff;
import fecha from '@/utils/date';
import {commonPreviewImg } from '@/utils/common';
export default {
    name: 'StaffRecordApproval',
    mixins: [commonMixin],
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        // 基本信息
        userInfoVO() {
            return this.progressInfo['userInfoVO'] || {};
        },
        userRecordTempVO() {
            return this.progressInfo['userRecordTempVO'] || {};
        },
        groupVOList() {
            return this.progressInfo['groupVOList'] || [];
        },
        groupFieldValueMap() {
            return this.progressInfo['groupFieldValueMap'] || {};
        }
    },
    data() {
        return {
            moduleConfigMap,
            progressInfo: {},
            imagePreview: false,
            headImageLoadError: false,
            headImageLoading: false
        };
    },
    created() {
        this.getProgressInfo();
    },
    methods: {
        // 在线预览
        previewAction(info) {
            window.open(`/api/common/file/preview.json?ossPath=${info.downloadUrl.replace(/http.*(review|download)\//, '')}`);
        },
        previewImg(imgSrc) {
            return commonPreviewImg(imgSrc);
        },
        // 点击头像地址预览图片
        headImageClick(src) {
            if(!src) return;
            this.imagePreview = true;
            const newImage = new Image();
            newImage.src = src;
            this.headImageLoading = true;
            this.headImageLoadError = false;
            newImage.onload = () => {
                this.headImageLoading = false;
                this.headImageLoadError = false;
            };
            newImage.onerror = () => {
                this.headImageLoading = false;
                this.headImageLoadError = true;
            };
        },
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
        },
        // 获取值显示
        parseFieldValue(fileConfig, fileValue) {
            const { config } = fileConfig || {};
            // 布尔类型的
            if(config && config.fieldType * 1 === 1012) {
                return [1, '1', true, 'true'].indexOf(fileValue[fileConfig.fieldName]) > -1 ? '是' : ([null, ''].indexOf(fileValue[fileConfig.fieldName]) > -1 ? '-' : '否');
            } else if(config && config.fieldType * 1 === 1018) { // 日期类型
                const isDateString = isNaN(fileValue[fileConfig.fieldName]) && !isNaN(Date.parse(fileValue[fileConfig.fieldName]));
                return fileValue[fileConfig.fieldName]
                    ? (!isDateString ? fecha.format(fileValue[fileConfig.fieldName] * 1, config.regulation || 'yyyy-MM-dd') : fileValue[fileConfig.fieldName])
                    : '-';
            } else if(config && [1003, 1004, 1013, 1015, 1017].indexOf(config.fieldType * 1) > -1) {
                // 取字典名称
                const labelList = fileValue[`${fileConfig.fieldName}_name`] || [];
                return labelList.length ? labelList.map(ele => ele.label).join('，') : '-';
            }
            return [null, undefined, ''].indexOf(fileValue[fileConfig.fieldName]) > -1 ? '-' : fileValue[fileConfig.fieldName];
        }
    }
};
</script>
