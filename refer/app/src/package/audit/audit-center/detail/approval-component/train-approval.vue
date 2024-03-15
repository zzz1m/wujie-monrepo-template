<template>
<div class="train-approval__module">
    <!-- 基本信息 -->
    <div class="approval-component__container">
        <h2 class="title">
            课程信息
        </h2>
        <ul class="train-approval-component__list">
            <li :class="[highlightClass(progressInfo, 'type')]">
                <span>课程类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.type === 4 ? '线下培训': '课程'" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'name')]">
                <span>课程名称</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.name" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'icon')]">
                <span>封面</span>
                <div class="cover-container">
                    <viewer
ref="viewer"
                        class="cover-wrap"
                        :options="{ title: false, navbar: false, tooltip: false}" @inited="initedViewer"
                    >
                        <template>
                            <img alt="" :src="progressInfo.icon" />
                            <div class="preview" @click="onPreviewCover(progressInfo.icon)">点击预览</div>
                        </template>
                    </viewer>
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'classNameFullPath')]">
                <span>课程分类</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.classNameFullPath" />
                </div>
            </li>
            <li v-if="[1,2,3].includes(progressInfo.type)" :class="[highlightClass(progressInfo, 'teacherVOList')]">
                <span>主讲人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="(progressInfo.teacherVOList || []).map(item => item.name).join('，')" />
                </div>
            </li>
            <li v-if="[4].includes(progressInfo.type)" :class="[highlightClass(progressInfo, 'startDate')]">
                <span>培训时间</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="`${$dayjs(progressInfo.startDate).format('YYYY-MM-DD')} ~ ${$dayjs(progressInfo.endDate).format('YYYY-MM-DD')}`" />
                </div>
            </li>
            <li v-if="[1,2,3].includes(progressInfo.type)" :class="['only-full-row', 'margin-top-40']">
                <span>课件</span>
                <div>
                    <ul class="courseware-list">
                        <li v-for="(item, index) in progressInfo.courseDetailVOList" :key="index" class="course-list-content">
                            <div class="course-name">
                                <svg-icon :icon-class="getIconName(item.name)"></svg-icon>
                                <div class="course-title">
                                    <nari-tooltip :value="item.name" />
                                </div>
                            </div>
                            <div class="course-operation" @click="previewAction(item)">
                                <i class="ui-icon-view"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li :class="['only-full-row', 'margin-top-40', 'no-class', highlightClass(progressInfo, 'content')]">
                <span class="approval-detail-title">课程介绍</span>
                <div>
                    <div class="ql-editor" v-html="progressInfo.content"></div>
                </div>
            </li>
            <!-- 只有下线才显示 -->
            <li v-if="progressInfo.operation === 'offline'" :class="['full-row', 'margin-top-40', 'audit-detail-highlight', highlightClass(progressInfo, 'offLineReason')]">
                <span>下线原因</span>
                <div>{{ progressInfo.offLineReason || '-' }}</div>
            </li>
            <li v-if="progressInfo.type !== 4" :class="['only-full-row', 'margin-top-40', 'no-class', highlightFieldList.includes('auth') && 'audit-detail-highlight']">
                <span class="approval-detail-title">可见范围</span>
                <div>{{ viewScopeTypeMap[progressInfo.viewScopeType] || '-' }}</div>
                <div v-if="progressInfo.viewScopeType === 2" class="row-val-list">
                    <div class="row-val-item">
                        <div class="row-val-title">
                            <span :class="[highlightClass(progressInfo, 'viewDeptScopeList')]">部门范围</span>：
                        </div>
                        <div class="row-val-value">{{ viewDeptScopeList || '-' }}</div>
                    </div>
                    <div class="row-val-item">
                        <div class="row-val-title">
                            <span :class="[highlightClass(progressInfo, 'viewSeqScopeList')]">序列范围</span>：
                        </div>
                        <div class="row-val-value">{{ viewSeqScopeList || '-' }}</div>
                    </div>
                    <!-- TODO 标准岗位 -->
                    <div class="row-val-item">
                        <div class="row-val-title">
                            <span :class="[highlightClass(progressInfo, 'positionList')]">标准岗位</span>：
                        </div>
                        <div class="row-val-value">{{ positionList || '-' }}</div>
                    </div>
                    <div class="row-val-item">
                        <div class="row-val-title">
                            <span :class="[highlightClass(progressInfo, 'viewUserScopeList')]">人员范围</span>：
                        </div>
                        <div class="row-val-value">{{ viewUserScopeList || '-' }}</div>
                    </div>
                    <div class="row-val-item">
                        <div class="row-val-title">
                            <span :class="[highlightClass(progressInfo, 'viewExcludeUserScopeList')]">剔除人员</span>：
                        </div>
                        <div class="row-val-value">{{ viewExcludeUserScopeList || '-' }}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="[4].includes(progressInfo.type)" class="approval-component__container">
        <h2 class="title">
            培训内容
        </h2>
        <div v-for="(item, index) in progressInfo.trainStageVOList" :key="index" class="approval-component__inner approval-train-stage">
            <h2 class="title">
                <img alt="" :src="getImportUrl('audit/train-approval.png')" /><span :class="item.newAdd && 'train-highlight'">培训内容-{{ getStage(index) }}</span>
            </h2>
            <ul class="approval-component__list">
                <li>
                    <span :class="(item.highlightFieldList || []).includes('name') && 'train-highlight'">课程名称</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="item.name" />
                    </div>
                </li>
                <li>
                    <span :class="(item.highlightFieldList || []).includes('teacherList') && 'train-highlight'">讲师</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="(item.teacherList || []).map(item => item.name).join('、')" />
                    </div>
                </li>
                <li>
                    <span :class="(item.highlightFieldList || []).includes('startTime') && 'train-highlight'">培训时间</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="`${$dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss')} ~ ${$dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss')}`" />
                    </div>
                </li>
                <li>
                    <span :class="(item.highlightFieldList || []).includes('place') && 'train-highlight'">培训地点</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="item.place" />
                    </div>
                </li>
                <li :class="['only-full-row', 'margin-top-40']">
                    <span :class="(item.highlightFieldList || []).includes('detailList') && 'train-highlight'">课件</span>
                    <div>
                        <ul class="courseware-list">
                            <li v-for="(item, index) in item.detailList" :key="index" class="course-list-content">
                                <div class="course-name">
                                    <svg-icon :icon-class="getIconName(item.name)"></svg-icon>
                                    <div class="course-title">
                                        <nari-tooltip :value="item.name" />
                                    </div>
                                </div>
                                <div class="course-operation" @click="previewAction(item)">
                                    <i class="ui-icon-view"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="approval-component__container">
        <h2 class="title">
            <img alt="" :src="getImportUrl('offer/other.png')" />备注说明
        </h2>
        <div class="ql-editor wrap-text-area" v-html="progressInfo.remark1 || '-'"></div>
    </div>
</div>
</template>
<script>
import { _updateOfferSalary } from '@/services/dashboard/audit';
import commonMixin from './mixins';
import { commonConfig } from '@noah/tools';
const { COURSE_TYPE_LIST } = commonConfig.train;

import { getIconName, getFileType } from '@noah/tools/src/utils/icon.js';
import { _getValue, getNameByCode } from '@/utils/util.js';
import { getTargetPath } from '@/utils/common';

import { mapState } from 'vuex';
export default {
    name: 'OfferApproval',
    mixins: [commonMixin],
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        currentPath() {
            return getTargetPath( '/dashboard/audit/audit-center/list' );
        },
        viewDeptScopeList() {
            return this.progressInfo?.viewDeptScopeList?.map(t => t.deptNameFullPath).join('、');
        },
        positionList() {
            let positionList = [...(this.progressInfo?.viewPositionScopeList || []), ...(this.progressInfo?.viewManagePositionScopeList || [])];
            return positionList.map(t => t.dictNameFullPath).join('、');
        },
        viewSeqScopeList() {
            const l1 =  this.progressInfo?.viewSeqScopeList?.map(t => t.dictName) || [];
            const l2 =  this.progressInfo?.viewManageSeqScopeList?.map(t => t.dictName) || [];
            return [...l1, ...l2].join('、');
        },
        viewUserScopeList() {
            return this.progressInfo?.viewUserScopeList?.map(t => t.name).join('、');
        },
        viewExcludeUserScopeList() {
            return this.progressInfo?.viewExcludeUserScopeList?.map(t => t.name).join('、');
        }
    },
    data() {
        return {
            progressInfo: {},
            viewScopeTypeMap: {
                0: '公开',
                1: '仅用于培训',
                2: '部分可见'
            },
            courseTypeList: COURSE_TYPE_LIST    // 课程类型
        };
    },
    created() {
        this.getProgressInfo();
        this.getIconName = getIconName;
        this.getNameByCode = getNameByCode;
    },
    methods: {
        // 获取详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        },

        // 在线预览
        previewAction(file) {
            let fileId = '';
            let suffix = '';
            let fileType = getFileType(file.name);
            if(fileType === 'video') {
                fileId = file.ossKey;
            } else {
                const l = file.ossKey.split('/');
                const t = l[l.length - 2] + l[l.length - 1];
                fileId = t.split('.')[0];
                suffix = t.split('.')[1];
            }
            window.open(`/dashboard/train/learning-platform/study-page/preview/${suffix || fileType}/${fileId}?target=${this.currentPath}`);
        },
        onPreviewCover(src) {
            this.$viewer.show();
        },
        initedViewer(viewer) {
            this.$viewer = viewer;
        },
        getStage(index) {
            return (index < 9) ? ('0' + (index + 1)) : (index + 1);
        }
    }
};
</script>
