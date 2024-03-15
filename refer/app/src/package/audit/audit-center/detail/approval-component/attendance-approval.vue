<template>
<div class="attendance-approval__module">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userName')]">
                <span>姓名</span>
                <attendanceEntry :id="progressInfo.addUserIdEncrypt" :name="progressInfo.userName" />
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
        <h2 class="title">
            {{ computeTitleInfo }}
        </h2>
        <ul class="approval-component__list">
            <li v-if="![12,13].includes(progressInfo.leaveType)" :class="[highlightClass(attendanceType, 'leaveType', true)]">
                <span>考勤类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="attendanceType" />
                </div>
            </li>
            <li v-if="progressInfo.leaveType === 9" :class="[highlightClass(progressInfo, 'deceasedKinship')]">
                <span>去世亲属关系</span>
                <div>
                    {{ getDeceasedKinship(progressInfo.deceasedKinship) || '-' }}
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'addTime')]">
                <span>申请时间</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.addTime && progressInfo.addTime.split('.')[0]" />
                </div>
            </li>
            <li v-if="progressInfo.leaveType == 13" :class="[highlightClass(progressInfo, 'businessPlace')]">
                <span>出差地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.businessPlace" />
                </div>
            </li>
            <li v-if="!isAppealReal && progressInfo.leaveType !== 13" :class="[highlightClass(progressInfo, 'totalTimeStr')]">
                <span v-if="progressInfo.leaveType == 12">公出时长</span>
                <!-- <span v-else-if="progressInfo.leaveType == 13">出差时长</span> -->
                <span v-else-if="progressInfo.leaveType == 20">居家时长</span>
                <span v-else>请假时长</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.totalTimeStr" />
                </div>
            </li>
            <li v-if="isAppealReal" :class="[highlightClass(progressInfo, 'attendanceDate')]">
                <span>申诉时段</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="`${progressInfo.attendanceDate} ${progressInfo.attendanceStatus == 0 ? 'AM' : 'PM'}`" />
                </div>
            </li>
            <li v-if="!isAppealReal" :class="['full-row', 'mt40', highlightClass(progressInfo, 'leaveTimeDisplay', true)]">
                <span>起止时间</span>
                <div>{{ progressInfo.leaveTimeDisplay || '-' }}</div>
            </li>
            <li v-if="progressInfo.homeReason" class="mt40">
                <span>防疫-居家原因</span>
                <div>{{ homeReason }}</div>
            </li>
            <li v-if="progressInfo.infectCount" class="mt40">
                <span>感染频次</span>
                <div>{{ infectCount }}</div>
            </li>
            <li v-if="progressInfo.homeReasonOther" class="full-row mt40">
                <span>其他原因说明</span>
                <div>{{ progressInfo.homeReasonOther }}</div>
            </li>
            <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'leaveExplain')]">
                <span v-if="progressInfo.leaveType == 12">公出说明</span>
                <span v-else-if="progressInfo.leaveType == 13">出差说明</span>
                <span v-else-if="progressInfo.leaveType == 20">居家说明</span>
                <span v-else-if="progressInfo.leaveType == 24">报备说明</span>
                <span v-else-if="!progressInfo.appealType">请假说明</span>
                <span v-else>申诉说明</span>
                <div>{{ progressInfo.leaveExplain || '-' }}</div>
            </li>
            <template v-if="progressInfo.shiftList && progressInfo.shiftList.length">
                <div class="shift-info">班次信息</div>
                <li v-for="shiftItem in progressInfo.shiftList" :key="shiftItem.date">
                    <span>{{ $dayjs(shiftItem.date).format("YYYY-MM-DD") }}</span>
                    <div class="shift-list">
                        <em :style="{ backgroundColor: shiftItem.color }"></em>
                        <nari-tooltip :show-tip="true" :value="shiftItem.shiftName" />
                    </div>
                </li>
            </template>
            <li v-if="showUploadFile" :class="['full-row', 'mt40', highlightClass(progressInfo, 'imgUrl')]">
                <span>附件</span>
                <ui-upload
                    ref="upload"
                    style="margin-top: 20px"
                    exname=".jpg.png.jpeg.bmp"
                    action="/api/config/upload.json"
                    custom multiple :cropper="false" :total="999"
                    :uploaded-num="uploadedNum"
                    @uploadEnd="uploadEnd"
                >
                    <div style="display: flex; align-items:center">
                        <button type="button" class="btn btn-primary btn-outline submit-btn" :disabled="form.imgUrl && form.imgUrl.length >= 9" @click="mockClick">
                            <svg-icon icon-class="icon-upload-new"></svg-icon>
                            <span>上传附件</span>
                        </button>
                        <span style="margin-left: 16px; color: #2db7f5; font-size: 12px;font-weight: 400">* 在您产检结束后，请附上能够证明您当日参加产检的材料并提交，以便公司复核。</span>
                    </div>
                    <ul v-if="form.imgUrl && form.imgUrl.length > 0" class="error-image-preview clearfix preview-pic-list">
                        <li v-for="(image, index) in form.imgUrl" :key="index" class="no-class">
                            <i class="ui-icon-close" @click="removeImage(index)"></i>
                            <img :src="image" alt="">
                        </li>
                    </ul>
                </ui-upload>
            </li>
            <li v-else :class="['full-row', 'mt40', highlightClass(progressInfo, 'imgUrl')]">
                <span>附件</span>
                <div>
                    <ul v-if="(progressInfo.imgUrl || []).length" v-viewer="{ title: false, navbar: false, tooltip: false, }" class="attachment-list">
                        <li v-for="(item, index) in progressInfo.imgUrl || []" :key="index">
                            <img :src="item" class="preview-image" />
                        </li>
                    </ul>
                    <span v-else>-</span>
                </div>
            </li>
        </ul>
        <wayTable v-if="progressInfo && progressInfo.travels" :distance-list="progressInfo.travels"></wayTable>
    </div>
    <!-- 销假、取消公出 -->
    <div v-if="progressInfo.resumptionType" class="approval-component__container">
        <h2 class="title">
            {{ isPublicOut ? '取消公出' : '销假' }}信息
        </h2>
        <template v-if="progressInfo.partResumptionLeaveList && progressInfo.partResumptionLeaveList.length">
            <ul v-for="item in progressInfo.partResumptionLeaveList" :key="item.id" class="approval-component__list">
                <li>
                    <span>销假类型</span>
                    <div>部分销假</div>
                </li>
                <li>
                    <span>起始日期</span>
                    <div>
                        {{ item.dateFrom&& $dayjs(item.dateFrom).format('YYYY-MM-DD') }}
                        <span v-if="progressInfo.leaveType !== 1" class="half-day">
                            {{ getNameByCode(item.fromHalfDay, timeListWrap, '', {
                                codeKey: 'value',
                                labelKey: 'label'
                            }) }}
                        </span>
                    </div>
                </li>
                <li>
                    <span>结束日期</span>
                    <div>
                        {{ item.dateTo && $dayjs(item.dateTo).format('YYYY-MM-DD') }}
                        <span v-if="progressInfo.leaveType !== 1" class="half-day">
                            {{ getNameByCode(item.toHalfDay, timeListWrap, '', {
                                codeKey: 'value',
                                labelKey: 'label'
                            }) }}
                        </span> 
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'resumptionHoursStr')]">
                    <span>销假时长</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="`${item.totalTime/8}天`" />
                    </div>
                </li>
                <li class="full-row mt40" :class="[highlightClass(progressInfo, 'resumptionExplain')]">
                    <span>销假说明</span>
                    <div>{{ item.explain || '-' }}</div>
                </li>
            </ul>
        </template>
        <ul v-else class="approval-component__list">
            <li>
                <span>{{ isPublicOut ? '取消' : '销假' }}类型</span>
                <div>
                    {{ isPublicOut ? '全部取消' : '全部销假' }}
                </div>
            </li>
            <li>
                <span>起始日期</span>
                <div>{{ progressInfo.leaveTimeDisplay && progressInfo.leaveTimeDisplay.split('~')[0] }}</div>
            </li>
            <li>
                <span>结束日期</span>
                <div>{{ progressInfo.leaveTimeDisplay && progressInfo.leaveTimeDisplay.split('~')[1] }}</div>
            </li>
            <li  v-if="progressInfo.leaveType !== 13" :class="[highlightClass(progressInfo, 'resumptionHoursStr')]">
                <span>{{ isPublicOut ? '取消' : '销假' }}时长</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="`${progressInfo.resumptionHoursStr || '-'}`" />
                </div>
            </li>
            <li class="full-row mt40" :class="[highlightClass(progressInfo, 'resumptionExplain')]">
                <span>{{ isPublicOut ? '取消' : '销假' }}说明</span>
                <div>{{ progressInfo.resumptionExplain || '-' }}</div>
            </li>
        </ul>
    </div>


    <div v-if="progressInfo.processApplyRecordShowDTOList && progressInfo.processApplyRecordShowDTOList.length" class="approval-component__container approval-no-border">
        <h2 class="title">
            已休假期
        </h2>
        <ui-table-pro
            :data="progressInfo.processApplyRecordShowDTOList" empty-text="暂无数据"
            :height="progressInfo.processApplyRecordShowDTOList.length > 5? '250px': 'auto'"
            class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
        >
            <ui-table-column label="审批单" show-overflow-tooltip min-width="220px">
                <template slot-scope="{ row }">
                   <router-link v-if="hasResources('/api/apply/admin/listener/apply.json')" :to="`/dashboard/attendance/approval-progress-detail?id=${row.applyId}&source=audit`">{{ row.processInstanceId }}</router-link>
                   <div v-else>{{ row.processInstanceId }}</div>
                </template>
            </ui-table-column>
            <ui-table-column label="考勤类型" show-overflow-tooltip min-width="120px">
                <template slot-scope="{ row }">
                   {{ row.leaveTypeStr || '-' }}
                </template>
            </ui-table-column>
            <ui-table-column label="起止时间" show-overflow-tooltip min-width="320px">
                <template slot-scope="{ row }">
                   {{  getLeaveTimeRange(row) }}
                </template>
            </ui-table-column>
            <ui-table-column label="请假时长" show-overflow-tooltip  min-width="120px">
                <template slot-scope="{ row }">
                   {{ getTotalTime(row.totalTime) }}
                </template>
            </ui-table-column>
            <ui-table-column label="申请时间" show-overflow-tooltip width="180px">
                <template slot-scope="{ row }">
                   {{  $dayjs(row.addTime).format('YYYY-MM-DD HH:mm:ss')  }}
                </template>
            </ui-table-column>
        </ui-table-pro>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import wayTable from '../components/way-table.vue';
import { _batchGetDictInfo } from '@/services/dashboard/common.js';
import { _getValue, getNameByCode, isNull } from '@/utils/util.js';
import {  _uploadApplyFile } from '@/services/dashboard/audit/index.js';
import attendanceEntry from '../components/attendanceEntry.vue';
export default {
    name: 'AttendanceApproval',
    mixins: [commonMixin],
    components: {
        wayTable,
        attendanceEntry
    },
    computed: {
        uploadedNum() {
            const imgUrl = this.form.imgUrl || [];
            return imgUrl.length;
        },
        processId() {
            return this.$route.query.processId;
        },
        isAppealReal() {
            return this.progressInfo.appealType === 3 || this.progressInfo.appealType === 4;
        },
        // 是否是公出
        isPublicOut() {
            const { leaveType } = this.progressInfo || {};
            return leaveType == 12 || leaveType == 13;
        },
        isFangyi() {
            const { leaveType } = this.progressInfo || {};
            return leaveType == 20;
        },
        // 计算标题
        computeTitleInfo() {
            const { appealType, leaveType } = this.progressInfo || {};
            if(this.isPublicOut) {
                return leaveType == 12? '公出信息': '出差信息';
            } else if(this.isFangyi) {
                return '防疫-居家信息';
            } else if(appealType == 3) {
                return '申诉忘打卡信息';
            } else if(appealType == 4) {
                return '申诉其它信息';
            } else {
                return '休假信息';
            }
        },
        // 考勤类型
        attendanceType() {
            const { leaveType, appealType, leaveTypeStr } = this.progressInfo || {};
            switch (appealType) {
                case 3:
                    return '忘打卡';
                case 4:
                    return '其他';
                default:
                    return leaveTypeStr;
            }
        },
        // 起止时间
        computedLeaveTime() {
            const { leaveTimeFrom, leaveTimeTo, leaveType, fromHalfDay, toHalfDay, leaveHalfTo } = this.progressInfo || {};
            // 请假按天请的显示上午，下午
            const dateType = {
                'am': '上午',
                'pm': '下午'
            };
            if([1, 10, 12, 13, 19].indexOf(Number(leaveType)) > -1 || !leaveType) {
                return `${this.$dayjs(leaveTimeFrom).format('YYYY-MM-DD HH:mm')} ~ ${this.$dayjs(leaveTimeTo).format('YYYY-MM-DD HH:mm')}`;
            } else {
                let leaveTime = leaveHalfTo || leaveTimeTo;   // 防疫居家有夜班情况 虽然跨天 但是显示上不跨天
                return `${this.$dayjs(leaveTimeFrom).format('YYYY-MM-DD')} ${dateType[fromHalfDay]} ~ ${this.$dayjs(leaveTime).format('YYYY-MM-DD')} ${dateType[toHalfDay]}`;
            }
        },
        // 防疫-居家原因
        homeReason() {
            const { apply_business_home_reason: homeReasonList } = this.dictTypes;
            return homeReasonList.filter(item=>this.progressInfo.homeReason?.includes(item.dictCode)).map(v=>v.dictName).join(', ');
        },
        infectCount() {
            const { apply_infect_count: list } = this.dictTypes;
            return list.find(item=> item.dictCode === this.progressInfo.infectCount)?.dictName || '-';
        },
        showUploadFile() {
            return this.progressInfo.leaveType === 6 && this.currentNode?.[0]?.nodeName === '发起人' && this.$route.query.type === 'operate';
        }
    },
    data() {
        return {
            progressInfo: {},
            dictTypes: {
                apply_business_home_reason: [], // 防疫居家原因字典
                deceased_kinship: [],
                apply_infect_count: []
            },
            timeListWrap: [{ label: '上午', value: 'am' }, { label: '下午', value: 'pm' }],
            form: {
                imgUrl: []
            }
        };
    },
    created() {
        this.getProgressInfo();
        this.getDictTypes();
        this.getNameByCode = getNameByCode;
    },
    methods: {
        getLeaveTimeRange(detail) {
            const { leaveTimeFrom, leaveTimeTo, leaveType, fromHalfDay, toHalfDay, leaveHalfTo } = detail || {};
            // 请假按天请的显示上午，下午
            const dateType = {
                'am': '上午',
                'pm': '下午'
            };
            if([1, 10, 12, 13, 19].indexOf(Number(leaveType)) > -1 || !leaveType) {
                return `${this.$dayjs(leaveTimeFrom).format('YYYY-MM-DD HH:mm')} ~ ${this.$dayjs(leaveTimeTo).format('YYYY-MM-DD HH:mm')}`;
            } else {
                let leaveTime = leaveHalfTo || leaveTimeTo;   // 防疫居家有夜班情况 虽然跨天 但是显示上不跨天
                return `${this.$dayjs(leaveTimeFrom).format('YYYY-MM-DD')} ${dateType[fromHalfDay]} ~ ${this.$dayjs(leaveTime).format('YYYY-MM-DD')} ${dateType[toHalfDay]}`;
            }
        },
        getTotalTime(val) {
            const day = Math.floor(val / 8);
            const hour = val % 8;
            return `${day? day + '天': ''}${hour + '小时'}`;
        },
        getDeceasedKinship(type) {
            return this.dictTypes.deceased_kinship?.find(t => t.dictCode === type)?.dictName || '';
        },
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];

            if(this.showUploadFile) {
                this.form.imgUrl = this.progressInfo.imgUrl || [];
            }
        },
        // 获取字典的值
        async getDictTypes() {
            try {
                const { success, root } = await _batchGetDictInfo({
                    typeList: Object.keys(this.dictTypes),
                    enable: 2
                });
                if (success) {
                    Object.keys(this.dictTypes).forEach(dictCode => {
                        if (root[dictCode] && root[dictCode].length) {
                            this.dictTypes[dictCode] = root[dictCode];
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        mockClick() {
            this.$refs.upload.mockClick();
        },
        removeImage(index) {
            this.form.imgUrl.splice(index, 1);
        },
        uploadEnd({ data }) {
            const res = data;
            if (res.success) {
                this.form.imgUrl.push(...res.root.urls);
                this.$toast({ content: '上传成功', type: 'success' });
            } else {
                this.$toast({ content: '上传失败', type: 'error' });
            }
        },
        // 确定之前 先上传产检证明附件
        async beforeSubmit() {
            if (!this.showUploadFile) return true;
            if (!this.form.imgUrl.length) {
                this.$toast('请上传产检证明附件', 'warning');
                return false;
            }

            try {
                const { success, message} = await _uploadApplyFile({
                    processInstanceId: this.processId,
                    files: (this.form.imgUrl || []).join(',')
                });
                if(success) {
                    return true;
                } else {
                    throw new Error(message);
                }
            } catch (error) {
                this.$toast(error.message || '产检证明附件上传失败', 'warning');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="less" scoped>
.submit-btn {
    height: 32px;
    color: #00A6A7;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 16px;
    font-size: 14px;
    font-weight: 400;
    color: #00A6A7;
    line-height: 20px;
    .svg-icon {
        margin-right: 8px
    }
}
.preview-pic-list {
    margin-top: 16px;
    li {
        padding: 0;
        border: 1px solid #eaedf3;
        border-radius: 6px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
        }
    }
}
.link {
    color: #00B8BF;
    &:hover {
        color: #02d2d9;
    }
}
</style>