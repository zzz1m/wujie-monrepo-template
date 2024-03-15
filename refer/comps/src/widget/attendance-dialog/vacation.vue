<template>
  <div>
    <ui-form ref="form" :inline="false" :label-width="options.pageType === 'stay-home' || form.leaveType === '9' ? 114 : 90" :model="form" :rules="rule">
      <template v-if="options.pageType !== 'appeal'">
        <template v-if="options.pageType === 'publicout'">
          <!-- <form-item label="公出类型：" prop="leaveType">
                    <ui-select v-model="form.leaveType"
                        placeholder="请选择"
                        @on-change="changeBusiness"
                    >
                        <ui-option v-for="item in typeList"
                            :key="item.value" :value="item.value"
                        >
                            {{ item.label }}
                        </ui-option>
                    </ui-select>
                </form-item> -->
          <form-item v-if="form.leaveType === '13'" label="出差地点：" prop="businessPlace" required>
            <ui-input v-model.trim="form.businessPlace" clearable :maxlength="60" placeholder="请输入"></ui-input>
          </form-item>
        </template>

        <form-item v-else-if="options.pageType !== 'stay-home'" label="请假类型：" prop="leaveType">
          <ui-select v-model="form.leaveType" placeholder="请选择" @on-change="changeSelected">
            <ui-option v-for="item in leaveList" :key="item.type" :value="item.type">
              {{ item.name }}
            </ui-option>
          </ui-select>
        </form-item>
        <form-item v-if="form.leaveType === '9'" label="去世亲属关系：" prop="deceasedKinship">
          <ui-select v-model="form.deceasedKinship" placeholder="请选择">
            <ui-option v-for="item in dictTypes.deceased_kinship" :key="item.dictCode" :value="item.dictCode">
              {{ item.dictName }}
            </ui-option>
          </ui-select>
        </form-item>
        <div style="display: flex">
          <form-item label="开始时间：" prop="startDate" :style="`width: ${showTime ? '100%' : options.pageType === 'stay-home' ? '270px' : '260px'}`">
            <ui-date-picker
              v-model="form.startDate"
              :forbid-day-list="startTimeForbid"
              :is-loading="startTimeLoading"
              :picker-options="{
                disabledDate: disabledStartDate
              }"
              placeholder="请选择日期"
              type="date"
              value-format="yyyy-MM-dd"
              @on-change="wayTimeChange"
              @on-show-date-change="onShowStartDateChange"
            >
            </ui-date-picker>
          </form-item>
          <!-- label="起始时间："  -->
          <form-item v-if="!showTime" class="no-label" prop="startTime" style="width: 178px">
            <ui-select v-model="form.startTime" placeholder="请选择">
              <template v-if="timeList && timeList.length > 0">
                <ui-option v-for="(item, index) in timeList" :key="index" :value="item.value ? item.value : item">
                  {{ item.label ? item.label : item }}
                </ui-option>
              </template>
            </ui-select>
          </form-item>
        </div>
        <div style="display: flex">
          <form-item label="结束时间：" prop="endDate" :style="`width: ${showTime ? '100%' : options.pageType === 'stay-home' ? '270px' : '260px'}`">
            <ui-date-picker
              v-model="form.endDate"
              :forbid-day-list="endTimeForbid"
              :is-loading="endTimeLoading"
              :picker-options="{
                disabledDate: disabledEndDate
              }"
              placeholder="请选择日期"
              type="date"
              value-format="yyyy-MM-dd"
              @on-change="wayTimeChange"
              @on-show-date-change="onShowEndDateChange"
            >
            </ui-date-picker>
          </form-item>
          <!-- label="结束时间：" -->
          <form-item v-if="!showTime" class="no-label" prop="endTime" style="width: 178px">
            <ui-select v-model="form.endTime" placeholder="请选择">
              <template v-if="timeList && timeList.length > 0">
                <ui-option v-for="(item, index) in timeList" :key="index" :value="item.value ? item.value : item">
                  {{ item.label ? item.label : item }}
                </ui-option>
              </template>
            </ui-select>
          </form-item>
        </div>

        <form-item v-if="form.leaveType !== '13'" label="合计：" prop="totalTime" required>
          <ui-input v-model="form.totalTime" disabled style="display: none" type="text"></ui-input>
          <ui-input v-model="totalTime" disabled placeholder="选择后自动生成" type="text"></ui-input>
          <div v-if="options.pageType !== 'publicout'" class="info-wrap">
            <template v-if="form.leaveType === '20'">
              <span class="text-blue">*2023年1月21日起，至本年度结束，限定最多可请休7个工作日，2023年12月31日不使用部分清零。</span><br />
              <span class="text-blue">*此临时措施自愿使用，也可请休如法定年休假、病假等假期。</span><br />
              <span class="text-blue">*此临时措施，仅限本人感染新冠病毒、甲流休养使用，不得用于其他情形，最小单位为1个工作日，可根据自身需要选择申请天数。</span
              ><br />
              <span class="text-blue">*若您症状缓解，可自行安排返厂办公。</span><br />
              <span class="text-blue">*此措施暂定执行至2023年12月31日。</span>
            </template>
            <template v-else>
              <!-- 4513.20【考勤管理】休假提示优化@朝阳 -->
              <!-- <span class="text-blue">*如{{ showHomeType ? '居家' : '请假' }}到当天下班，请注意{{ showHomeType ? '居家' : '请假' }}时间覆盖当天应签退时间，避免造成旷工</span><br> -->
              <span v-if="!unHalfList.includes(+form.leaveType)" class="text-blue">
                *若申请上午{{ showHomeType ? '居家' : '休假' }}，无论是否弹性考勤，需在13:30前进行签到<br />
              </span>
              <span v-if="hasRemainList.includes(+form.leaveType)" class="text-blue">*休假结束时间不能超过假期余额失效时间</span>
            </template>
          </div>
        </form-item>
      </template>
      <template v-if="showAppealOptions">
        <form-item label="申诉类型：" prop="appealType">
          <ui-select v-model="form.appealType" placeholder="请选择">
            <ui-option v-for="item in appealTypeList" :key="item.value" :value="item.value">
              {{ item.label }}
            </ui-option>
          </ui-select>
        </form-item>
        <form-item label="申诉时间：" prop="attendanceDate">
          <ui-select v-model="form.attendanceDate" placeholder="请选择">
            <ui-option v-for="item in appealDateList" :key="item.value" :value="item.value">
              {{ item.label }}
            </ui-option>
          </ui-select>
        </form-item>
      </template>
      <form-item v-if="options.pageType === 'appeal'" label="" :style="`margin-bottom: 10px;${showAppealOptions ? 'margin-top: -25px' : ''}`">
        <div class="info-wrap">
          <span v-if="form.appealType == 3" class="text-blue">*按时出勤但忘记打卡，说明原因，可申诉（忘打卡）<br /></span>
          <span v-else class="text-blue">*遇不可抗力情况导致无法按时打卡（网络故障、交通瘫痪、极端天气等），上传对应证明资料，可申诉（其他）</span>
        </div>
      </form-item>
      <template v-if="pageTypeIsOut">
        <form-item v-show="showType" label="我的行程：">
          <div
            v-if="(distanceType === 'oneWay' && distanceList.length < 10) || (distanceType === 'backTracking' && distanceList.length < 2)"
            class="btn btn-primary btn-outline submit-btn"
            @click="openDialog"
          >
            添加行程
          </div>
        </form-item>
        <div v-if="form.leaveType === '13' && distanceList.length" class="distance-container" style="margin-left: 90px">
          <distanceTable :distance-list="distanceList" @chooseEdit="chooseEdit" @deleteDistance="deleteDistance"> </distanceTable>
        </div>
        <form-item v-if="form.leaveType === '13'" class="info-wrap" label="" style="margin-top: -20px">
          <span class="red">*如需使用汇联易携程预订功能，省去报销流程，请务必填写“我的行程”</span>
        </form-item>
        <template v-if="showHomeType">
          <form-item label="居家原因：" prop="homeReason">
            <ui-select v-model="form.homeReason" placeholder="请选择居家原因">
              <ui-option v-for="item in dictTypes.apply_business_home_reason" :key="item.dictCode" :value="item.dictCode">
                {{ item.dictName }}
              </ui-option>
            </ui-select>
          </form-item>
          <form-item label="感染频次：" prop="infectCount">
            <ui-select v-model="form.infectCount" placeholder="请选择感染频次">
              <ui-option v-for="item in dictTypes.apply_infect_count" :key="item.dictCode" :value="item.dictCode">
                {{ item.dictName }}
              </ui-option>
            </ui-select>
          </form-item>
        </template>
        <!-- <form-item v-if="showHomeType && form.homeReason.includes('04')" label="其他原因说明：" prop="homeReasonOther">
                <ui-input v-model="form.homeReasonOther" type="textarea" :rows="4" :maxlength="200" counter></ui-input>
            </form-item> -->
      </template>
      <form-item label="详细说明：" prop="description">
        <ui-input v-model="form.description" counter :maxlength="200" :placeholder="descPlaceholder || '请输入'" :rows="4" type="textarea"></ui-input>
      </form-item>

      <form-item v-if="!['23'].includes(form.leaveType)" label="附件：" :required="showFileNeed">
        <ui-upload
          ref="upload"
          action="/api/config/upload.json"
          :cropper="false"
          custom
          exname=".jpg.png.jpeg.bmp"
          multiple
          style="margin-bottom: 12px"
          :total="9"
          :uploaded-num="uploadedNum"
          @uploadEnd="uploadEnd"
        >
          <ul v-if="form.imgUrl && form.imgUrl.length > 0" class="error-image-preview clearfix">
            <li v-for="(image, index) in form.imgUrl" :key="index">
              <i class="ui-icon-close" @click="removeImage(index)"></i>
              <img alt="" :src="image" />
            </li>
          </ul>
          <button class="btn btn-primary btn-outline submit-btn" :disabled="form.imgUrl && form.imgUrl.length >= 9" type="button" @click="mockClick">
            <svg-icon icon-class="icon-upload-new"></svg-icon>
            点击上传
          </button>
        </ui-upload>
        <div class="info-wrap">
          <span v-if="form.leaveType && !['12', '13', '20'].includes(form.leaveType) && isEarly" class="text-blue">
            *休假遵循先请假后休假的规则，因特殊情况无法提前通过系统请假的，应上传提前通过其他途径与上级沟通休假的记录<br />
          </span>
          <span v-if="['12', '13'].includes(form.leaveType) && isEarly" class="text-blue">
            {{
              `*${form.leaveType == 12 ? '公出' : '出差'}遵循先申请后${
                form.leaveType == 12 ? '公出' : '出差'
              }的规则，因特殊情况无法提前通过系统申请的，应上传提前通过其他途径与上级沟通申请的记录`
            }}<br />
          </span>
          <span v-show="currentRemark" class="text-blue" v-html="currentRemark"></span>
          <template v-if="form.leaveType === '20'">
            <span class="text-blue">*请上传申请当日的抗原阳性/核酸阳性的检测结果，或医院开具的甲流诊断证明/抗原阳性报告。<br /></span>
            <span v-if="isNowBefore" class="text-blue">
              *请遵循先申请后居家的规则，因特殊情况无法提前通过系统申请的，应上传提前通过其他途径与上级沟通的记录。<br />
            </span>
            <span class="text-blue">*请上传与HRBP或直接上级沟通截图。<br /></span>
            <span class="text-blue">*医疗健康信息属于您的个人信息，公司仅用于审批及内部核实存档，未经您的同意不会向任何第三方提供。<br /></span>
          </template>
        </div>
      </form-item>
      <div class="audit-progress-wrap-preview attendace">
        <div class="title">审批流程预览：</div>
        <AuditProgress v-if="showProgress" :list="progress" />
        <div v-else class="tip">必填信息填写完成后，可预览审批流</div>
      </div>
    </ui-form>

    <addDialog v-if="showAdd" :close-add="closeAdd" :form="form" :get-way-list="getWayList"></addDialog>
    <editDialog v-if="showEdit" :close-edit="closeEdit" :distance-type="distanceType" :edit-way="editWay" :form="form" :way-item="wayItem"></editDialog>
  </div>
</template>

<script type="text/javascript">
import { commonServices, attendanceServices, auditServices } from '@noah/tools';
const { _batchGetDictInfo } = commonServices;
const { _previewProgress } = auditServices;
const { getDeptInfo, editKq, getApply, getTotalTime, _getLeaveType, _personalCalendar } = attendanceServices;

import { mapState } from 'vuex';
import distanceTable from './distance-table';
import addDialog from './add-dialog';
import editDialog from './edit-dialog';

import { vacationMap } from './const';
import AuditProgress from '../audit-preview-dialog/progress.vue';

import { util } from '@noah/tools';

const { generateTimeList, debounce } = util;

const forbidCache = {};

export default {
  components: {
    distanceTable,
    addDialog,
    editDialog,
    AuditProgress
  },
  props: {
    options: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      hasConfirm: false,
      uploadfileName: 'file',
      appealType: this.options && this.options.appealType,
      deptInfo: {},
      timeList: [],
      typeList: [
        { label: '市内公出', value: '12' },
        { label: '市外出差', value: '13' }
        //  { label: '防疫-居家', value: '20' }
      ],
      appealTypeList: [
        { label: '忘打卡', value: '3' },
        { label: '其他', value: '4' }
      ],
      isRouterAlive: true,
      isLoading: false,
      appealDateList: [],
      appealList: [
        { value: 1, label: '补休假申请' },
        { value: 2, label: '补公出申请' },
        { value: 3, label: '忘打卡' },
        { value: 4, label: '其他' }
      ],
      leaveList: [],
      // 非正式员工可请假类型
      unNatureList: [
        { label: '事假', value: '3' },
        { label: '奖励假', value: '10' }
      ],
      // 非【按半天休假】
      // 法定年休假和工伤假
      unHalfList: [
        1, // 法定年休假
        23 // 工伤假
      ],
      hasRemainList: Object.keys(vacationMap).map(Number),
      leaveRemarkList: {
        2: '*医疗健康信息属于您的敏感信息，公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供<br/>*连续请休2天及以上病假，请在附件上传正规医院出具的建休证明和病例<br/>*如有必要，公司有权要求您提供三级及以上医院开具的不限于病例、药品处方、检查报告、缴费票据等证明材料以做核实<br/>*病假为自然日',
        4: '*您所提交的个人信息公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供<br/>*员工在职期间登记结婚，自婚姻登记之日起1年内可以请休婚假<br/>*婚假应一次性请休<br/>*请休婚假，请在附件上传结婚证<br/>*婚假为自然日',
        6: '*医疗健康信息属于您的敏感信息，公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供<br/>*请休产检假，请在附件上传正规医院出具的带有产检日期的预约凭证、挂号单等<br/>*公司有权要求您在产检结束后请补充产检结果、缴费票据等证明材料以做核实',
        7: '*医疗健康信息属于您的敏感信息，公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供<br/>*请休产假，请在附件上传正规医院出具的妊娠证明、预产期证明或流产证明<br/>*产假为自然日',
        9: '*请告知我们您与去世亲属的关系<br/>*员工父母、配偶父母、配偶或子女不幸去世，可请休3天丧假<br/>*员工祖父母或外祖父母不幸去世，可请休2天丧假<br/>*丧假为自然日',
        15: '*民族习惯的节日，依据公司通知可请休民族节日假<br/>*请休民族节日假，请在附件上传身份证或户口页',
        18: '*医疗健康信息属于您的敏感信息，公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供',
        22: '*医疗健康信息属于您的敏感信息，公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供<br/>*请休陪产假，请在附件上传结婚证，以及正规医院出具的妊娠证明、预产期证明、流产证明或出生证明<br/>*请休陪产假，必须在配偶产假期间内<br/>*陪产假为自然日'
      },
      currentRemark: '',
      form: {
        leaveType: '',
        businessPlace: '',
        startTime: '',
        appealType: '',
        endTime: '',
        startDate: '',
        endDate: '',
        imgUrl: [],
        totalTime: '',
        // homeReason: [],
        // homeReasonOther: '',
        homeReason: '',
        infectCount: '',
        deceasedKinship: '',
        attendanceDate: ''
      },
      rule: {
        leaveType: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
        businessPlace: [{ required: true, message: '请填写出差地点', trigger: 'blur' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        attendanceDate: [{ required: true, message: '请选择申诉时间', trigger: 'change' }],
        appealType: [{ required: true, message: '请选择申诉类型', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        deceasedKinship: [{ required: true, message: '请选择去世亲属关系', trigger: 'blur' }],
        // homeReason: [{ validator: this.validatorReason, trigger: 'change' }],
        // homeReasonOther: [{ required: true, message: '请填写其他原因说明', trigger: 'blur', min: 1, max: 200 }],
        description: [{ required: true, message: '请填写详细说明', trigger: 'blur', min: 1, max: 200 }],
        homeReason: [{ required: true, message: '请选择居家原因', trigger: 'change' }],
        infectCount: [{ required: true, message: '请选择感染频次', trigger: 'change' }]
      },
      isEarly: false,
      showAdd: false,
      showEdit: false,
      distanceType: 'oneWay',
      distanceList: [],
      wayItem: {},
      wayIndex: 0,
      // reasonList: [
      //     { value: 1, label: '健康宝异常' },
      //     { value: 2, label: '途经风险地区' },
      //     { value: 3, label: '社区要求居家隔离' },
      //     { value: 4, label: '其他' }
      // ],
      dictTypes: {
        apply_business_home_reason: [], // 防疫居家原因字典
        apply_infect_count: [],
        deceased_kinship: []
      },
      showProgress: false,
      progress: [],
      fileBlackList: [2, 4, 6, 7, 15, 20, 22],
      startTimeLoading: false,
      endTimeLoading: false,
      startTimeForbid: [],
      endTimeForbid: []

      // homeReasonOptions: Object.freeze([
      //     { label: '感染甲流', value: '1' },
      //     { label: '感染新冠', value: '2' }
      // ]),
      // homeFreqOptions: Object.freeze([
      //     { label: '首次', value: '1' },
      //     { label: '二次', value: '2' },
      //     { label: '三次及以上', value: '3' }
      // ])
    };
  },
  created() {},
  mounted() {
    this.getDeptInfo();
    this.getTimeList();
    this.getDictTypes();
    this.getLeaveType();
    if (this.options.id) {
      this.getApply();
    }
    if (this.showAppealOptions) {
      this.getCalender();
    }
    if (this.options?.startDate) {
      this.form.startDate = this.options.startDate;
    }
    // const pageTitle = Number(this.appealType) > 0 ? '申诉' : this.pageTypeIsOut ? '我要公出' : '我要休假';
    // this.$route.meta.title = pageTitle;
    // this.$store.commit('updatePageTitle', pageTitle);

    if (this.options.appealType) {
      this.form.appealType = this.options.appealType;
    } else {
      this.form.leaveType = this.options.dataType || '';
    }
    if (this.options.attendanceId) {
      this.form.attendanceDate = `${this.options.attendanceId}--${this.options.attendanceStatus}`;
    }
    if (this.options.pageType === 'publicout' && !this.form.leaveType) {
      this.form.leaveType = '12';
    }
  },
  // beforeDestroy() {
  //     this.$store.commit('updatePageTitle', '');
  // },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (e) {
        let check = false;
        if (['vacation', 'publicout'].includes(this.options.pageType)) {
          console.log(this.form.leaveType, e, this.showTime);
          if (!this.form.leaveType) {
            check = true;
          }
          if (!e.startDate || !e.endDate) {
            check = true;
          }
          if (!this.showTime && (!e.startTime || !e.endTime)) {
            check = true;
          }

          if (this.form.leaveType === '9' && !this.form.deceasedKinship) {
            check = true;
          }
        } else if (this.options.pageType === 'appeal') {
          if (!this.form.appealType || !this.form.attendanceDate) {
            check = true;
          }
        } else if (this.options.pageType === 'stay-home') {
          if (!e.startDate || !e.endDate || !e.infectCount || !e.homeReason) {
            check = true;
          }
        }
        console.log(check, e, this.options.pageType);
        if (check) {
          this.showProgress = false;
          this.progress = [];
          return;
        }

        this.previewConfirm();
      }
    },
    'form.leaveType'() {
      this.getTimeList();
      this.getTotalTime();
    },
    'form.startDate'() {
      this.getTotalTime();
      this.getEarlyStatus();
    },
    'form.startTime'() {
      this.getTotalTime();
      this.getEarlyStatus();
    },
    'form.endTime'() {
      this.getTotalTime();
    },
    'form.endDate'() {
      this.getTotalTime();
    }
    // $route() {
    //     this.$set(this, 'form', {
    //         leaveType: '',
    //         startDate: '',
    //         endDate: '',
    //         imgUrl: []
    //     });
    //     this.form.startDate = this.$route.query.startDate ?  this.$route.query.startDate : '';
    //     this.appealType = this.$route.query.appealType;
    // }
  },
  computed: {
    ...mapState(['userInfo']),
    showFileNeed() {
      if ([12, 13].includes(+this.form.leaveType)) {
        return this.isEarly;
      }
      return this.form.appealType == 4 || this.fileBlackList.includes(+this.form.leaveType);
    },
    descPlaceholder() {
      if (this.form.leaveType === '20') {
        return `请结合实际说明自身情况。\n示例：XX日抗原/核酸检测呈阳性或确诊甲流，身体不适，特此申请。`;
      }
      return '';
    },
    showAppealOptions() {
      return this.options.pageType === 'appeal' && !this.options.attendanceId;
    },
    pageTypeIsOut() {
      return ['publicout', 'stay-home'].includes(this.options.pageType);
    },
    totalTime() {
      // 除了公出  都按天显示
      let hourList = ['12', '13'];
      if (!hourList.includes(this.form.leaveType + '')) {
        if (this.form.totalTime === 0) return '0天';
        if (this.form.totalTime) {
          let hour = this.form.totalTime % 4;
          let day = parseInt(this.form.totalTime / 4) * 0.5;
          if (hour) {
            return `${day}天${hour}小时`;
          } else {
            return `${day}天`;
          }
        }
      }

      if (this.form.totalTime > 8) {
        return parseInt(this.form.totalTime / 8) + '天' + Math.round((this.form.totalTime % 8) * 10) / 10 + '小时';
      }
      if (this.form.totalTime === 0) {
        return '0小时';
      }
      return this.form.totalTime ? this.form.totalTime + '小时' : '';
    },
    uploadedNum() {
      const imgUrl = this.form.imgUrl || [];
      return imgUrl.length;
    },
    pickerOptionStart() {
      return {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        }
      };
    },
    pickerOptionEnd() {
      return {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        }
      };
    },
    showType() {
      return this.form.leaveType === '13';
    },
    // 防疫居家类型
    showHomeType() {
      return this.pageTypeIsOut && this.form.leaveType === '20';
    },
    // 防疫居家-上传按钮下边提示
    showHomeTips() {
      return this.dictTypes.apply_business_home_reason.filter((v) => this.form.homeReason.find((item) => item == v.dictCode));
    },
    showTime() {
      return ['1', '23', '20'].includes(this.form.leaveType);
    },
    isNowBefore() {
      return this.form.startDate && this.$dayjs().isAfter(this.form.startDate);
    }
  },
  methods: {
    onShowEndDateChange: debounce(300, async function (date) {
      const d = this.$dayjs(date).startOf('month');
      this.endTimeLoading = true;
      this.endTimeForbid = await this.loadingForbidDate(d);
      this.endTimeLoading = false;
    }),
    onShowStartDateChange: debounce(300, async function (date) {
      const d = this.$dayjs(date).startOf('month');
      this.startTimeLoading = true;
      this.startTimeForbid = await this.loadingForbidDate(d);
      this.startTimeLoading = false;
    }),
    async loadingForbidDate(date) {
      const d1 = date.add(1, 'month').format('YYYY-MM-DD');
      const d2 = date.subtract(1, 'month').format('YYYY-MM-DD');

      const load = async (dateVal) => {
        try {
          if (forbidCache[dateVal]) return forbidCache[dateVal];
          const { success, root } = await _personalCalendar({
            date: dateVal,
            userId: this.$store.state.userInfo.id
          });
          if (success) {
            const result = (root?.calendarList || [])
              .filter((t) => t.dayType === 'weekend')
              .map((t) => this.$dayjs.tz(t.attendanceDate, 'Asia/Shanghai').format('YYYY-MM-DD'));
            forbidCache[dateVal] = result;
            return result;
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      };
      const res = await Promise.all([load(date.format('YYYY-MM-DD')), load(d1), load(d2)]);
      return res.reduce((a, b) => [...a, ...b], []);
    },
    async getCalender() {
      try {
        const { success, root } = await _personalCalendar({
          date: this.$dayjs().format('YYYY-MM-DD'),
          userId: this.userInfo.id
        });
        let _startStatusArr = ['', '', '上班迟到', '未打卡', '上班旷工', '小迟到', '上班迟到2', '上班旷工2'];
        let _endStatusArr = ['', '', '下班早退', '未打卡', '下班旷工', '下班早退2', '', '下班旷工2'];
        if (success) {
          const { calendarList } = root || {};
          const appealDateList = [];
          calendarList.forEach((c) => {
            if (c.startWorkStatus !== 5 && _startStatusArr[c.startWorkStatus]) {
              appealDateList.push({
                value: `${c.id}--0`,
                label: `${this.$dayjs(c.attendanceDate).format('YYYY-MM-DD')}-上午`
              });
            }
            if (_endStatusArr[c.endWorkStatus] && !this.$dayjs().isSame(this.$dayjs(c.attendanceDate), 'date')) {
              appealDateList.push({
                value: `${c.id}--1`,
                label: `${this.$dayjs(c.attendanceDate).format('YYYY-MM-DD')}-下午`
              });
            }
          });
          this.appealDateList = appealDateList || [];
        }
      } catch (error) {}
    },
    // 获取字典的值
    async getDictTypes() {
      try {
        const { success, root } = await _batchGetDictInfo({
          typeList: Object.keys(this.dictTypes)
          // enable: 2
        });
        if (success) {
          Object.keys(this.dictTypes).forEach((dictCode) => {
            if (root[dictCode] && root[dictCode].length) {
              this.dictTypes[dictCode] = root[dictCode];
            }
          });
        }
      } catch (error) {
        // console.log(error);
      }
    },
    // 获取请假类型列表
    async getLeaveType() {
      try {
        const { success, root } = await _getLeaveType();
        if (success && root) {
          this.leaveList = root || [];
        }
      } catch (error) {
        // console.error(error);
      }
    },
    getEarlyStatus() {
      if (this.form.startDate && this.form.startTime) {
        let startTime = this.form.startTime;
        if (startTime === 'am') {
          startTime = ' 12:00:00';
        } else if (startTime === 'pm') {
          startTime = ' 24:00:00';
        } else {
          startTime = ' ' + startTime + ':00';
        }
        this.isEarly = this.$dayjs().isAfter(this.form.startDate + startTime, 's');
      } else {
        this.isEarly = false;
      }
    },
    mockClick() {
      this.$refs.upload.mockClick();
    },
    removeImage(index) {
      this.form.imgUrl.splice(index, 1);
    },
    disabledStartDate(time) {
      const day = this.$dayjs().format('DD');
      const isBeforeLast = this.form.endDate ? time.getTime() > this.$dayjs(this.form.endDate).valueOf() : false;
      let check = null;
      if (day < 2) {
        check = isBeforeLast || time.getTime() < new Date(this.$dayjs().subtract(1, 'month').startOf('month'));
      } else {
        check = isBeforeLast || time.getTime() < new Date(this.$dayjs().startOf('month'));
      }

      return check;
    },
    disabledEndDate(time) {
      const day = this.$dayjs().format('DD');
      let check = null;
      if (!this.form.startDate) {
        if (day < 2) {
          check = time.getTime() < new Date(this.$dayjs().subtract(1, 'month').startOf('month'));
        } else {
          check = time.getTime() < new Date(this.$dayjs().startOf('month'));
        }
      } else {
        check = time.getTime() < this.$dayjs(this.form.startDate).valueOf();
      }

      return check;
    },
    async getTotalTime() {
      try {
        const postData = {};
        const { leaveType, startDate, endDate, startTime, endTime, description, imgUrl, businessPlace } = this.form;
        if ((this.showTime || (startTime && endTime)) && startDate && endDate && leaveType) {
          this.$toast({
            content: '加载中...',
            type: 'loading'
          });
          this.isLoading = true;
          postData.leaveType = leaveType;
          postData.leaveTimeFrom = startDate + (startTime === 'am' || startTime === 'pm' || !startTime ? '' : ' ' + startTime + ':00');
          // console.log(postData.leaveTimeFrom, startTime === 'am' || startTime === 'pm' || !startTime, startTime);

          postData.leaveTimeTo = endDate + (endTime === 'am' || endTime === 'pm' || !endTime ? '' : ' ' + endTime + ':00');
          postData.fromHalfDay = startTime === 'am' || startTime === 'pm' ? startTime : '';
          postData.toHalfDay = endTime === 'am' || endTime === 'pm' ? endTime : '';

          const res = await getTotalTime(postData);
          if (res.success) {
            this.$set(this.form, 'totalTime', res.root);
            this.$toast.hide();
            // this.form.totalTime = res.root;
          }
        }
      } catch (e) {
        console.log(e);
        this.$toast.hide();
      } finally {
        this.isLoading = false;
      }
    },
    async getDeptInfo() {
      try {
        const res = await getDeptInfo();
        if (res.success && res.root) {
          this.deptInfo = res.root;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getApply() {
      try {
        const res = await getApply({ applyId: this.options.id });
        if (res.success && res.root) {
          const data = res.root;
          const form = this.form;
          data.leaveType += '';
          this.$set(form, 'leaveType', data.leaveType);

          let leaveTime = data.leaveHalfTo || data.leaveTimeTo; // 防疫居家有夜班情况 虽然跨天 但是显示上不跨天
          this.$set(form, 'startDate', data.leaveTimeFrom && data.leaveTimeFrom.split(' ')[0]);
          this.$set(form, 'endDate', leaveTime && this.$dayjs(leaveTime).format('YYYY-MM-DD'));
          this.$set(form, 'homeReason', data.homeReason || '');
          this.$set(form, 'infectCount', data.infectCount || '');

          // this.$set(form, 'homeReasonOther', data.homeReasonOther || '');
          this.$set(form, 'description', data.leaveExplain);
          this.$set(form, 'totalTime', data.totalTime);
          this.$set(form, 'deceasedKinship', data.deceasedKinship);
          if (data.imgUrl) {
            this.$set(form, 'imgUrl', data.imgUrl);
          }
          this.$set(form, 'businessPlace', data.businessPlace);
          if (data.travels && data.travels.length) {
            if (data.travels[0].type === 1001) {
              this.distanceType = 'oneWay';
            } else if (data.travels[0].type === 1002) {
              this.distanceType = 'backTracking';
            }
          }
          this.distanceList = data.travels || [];
          this.$nextTick(() => {
            if (data.fromHalfDay || data.toHalfDay) {
              this.$set(form, 'startTime', data.fromHalfDay);
              this.$set(form, 'endTime', data.toHalfDay);
            } else if (data.appealType != 3 && data.appealType != 4) {
              this.$set(form, 'startTime', data.leaveTimeFrom.split(' ')[1].substring(0, 5));
              this.$set(form, 'endTime', data.leaveTimeTo.split(' ')[1].substring(0, 5));
            }
          });
        }
      } catch (e) {
        // console.log(e);
      }
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
    getTimeList() {
      let timeList = [];
      if (
        this.form.leaveType === '12' || // 市内公出
        this.form.leaveType === '13' || // 市外公出
        !this.form.leaveType
      ) {
        timeList = generateTimeList('00:00', '24:00', 30)
          .map((item) => item.label)
          .concat(['24:00']);
        if (!this.form.leaveType) {
          if (this.options.pageType !== 'publicout') {
            timeList = [
              { value: 'am', label: '上午' },
              { value: 'pm', label: '下午' }
            ];
          }
        }
      } else {
        timeList = [
          { value: 'am', label: '上午' },
          { value: 'pm', label: '下午' }
        ];
      }

      this.timeList = timeList;
    },
    changeSelected(value) {
      this.currentRemark = this.leaveRemarkList[value] || '';
      this.form.startTime = ['1', '23'].includes(value) ? 'am' : '';
      this.form.endTime = ['1', '23'].includes(value) ? 'pm' : '';
      this.form.totalTime = '';
      this.form.imgUrl = [];
    },
    // validatorReason (rule, value, callback) {
    //     if(this.showHomeType && !value?.length) {
    //         callback(new Error('请选择防疫-居家原因'));
    //     }else {
    //         callback();
    //     }
    // },
    confirm() {
      const toast = (...params) => this.$toast.apply(this, params);
      const dialog = (...params) => this.$dialog.apply(this, params);
      const submitForm = this.submitForm;
      this.confirmSubmit(toast, dialog, submitForm, true);
    },
    previewConfirm: debounce(300, async function () {
      const search = async (postData) => {
        console.log('pre');

        const { success, root } = await _previewProgress(postData);
        if (success && root.length) {
          this.showProgress = true;
          this.progress = root;
        } else {
          this.showProgress = false;
          this.progress = [];
        }
      };

      const toast = (val) => {
        console.log(val);
      };
      const dialog = () => {};
      const submitForm = search;
      this.confirmSubmit(toast, dialog, submitForm);
    }),
    confirmSubmit(toast, dialog, submitForm, validate = false) {
      const check = (valid) => {
        // 校验附件上传
        const nowLeaveType = this.form.leaveType;
        if (validate && this.fileBlackList.includes(nowLeaveType * 1) && !this.form.imgUrl) {
          toast({ content: '请上传附件证明', type: 'warning' });
          return;
        }

        if (valid !== false) {
          const postData = {};
          const {
            leaveType,
            startDate,
            endDate,
            startTime,
            endTime,
            description,
            imgUrl,
            businessPlace,
            totalTime,
            deceasedKinship,
            attendanceDate,
            appealType
          } = this.form;
          if (this.options.pageType !== 'appeal') {
            if (validate) {
              //不是申诉忘打卡或其他时才校验
              if (this.$dayjs(endDate).isBefore(this.$dayjs(startDate))) {
                toast({ content: '结束日期不可以小于开始日期', type: 'warning' });
                return;
              } else if (this.$dayjs(endDate).isSame(this.$dayjs(startDate))) {
                if (startTime === 'am' || startTime === 'pm') {
                  if (endTime === 'am' && startTime === 'pm') {
                    this.$toast({ content: '结束时间不可以小于开始时间', type: 'warning' });
                    return;
                  }
                } else if (this.$dayjs(endDate + ' ' + endTime).isBefore(this.$dayjs(startDate + ' ' + startTime))) {
                  toast({ content: '结束时间不可以小于开始时间', type: 'warning' });
                  return;
                }
              }
              // 不是 婚假 产假 丧假 和几种公出 且 大于两个月
              if (
                this.form.leaveType &&
                !['4', '7', '9', '12', '13', '20'].includes(this.form.leaveType) &&
                this.$dayjs(endDate).isAfter(this.$dayjs().add(2, 'month'))
              ) {
                toast({ content: '请选择未来两个月内的日期', type: 'warning' });
                return;
              }

              if (totalTime <= 0) {
                // 出差允许合计时间小于0
                if (this.form.leaveType !== '13') {
                  toast({ content: '合计时间不可以小于0小时', type: 'warning' });
                  return;
                }
              }
              if (
                leaveType == 4 ||
                leaveType == 6 ||
                leaveType == 7 ||
                leaveType == 8 ||
                leaveType == 5 ||
                leaveType == 15 ||
                leaveType == 20 ||
                (leaveType == 2 && totalTime >= 16) ||
                (leaveType == 14 && totalTime >= 16)
              ) {
                // console.log(leaveType, totalTime);
                if (!this.form.imgUrl || !this.form.imgUrl.length) {
                  toast({ content: '请上传附件证明', type: 'warning' });
                  return;
                }
              }
            }

            postData.leaveTimeFrom = startDate + (startTime === 'am' || startTime === 'pm' || !startTime ? '' : ' ' + startTime + ':00');
            postData.leaveTimeTo = endDate + (endTime === 'am' || endTime === 'pm' || !endTime ? '' : ' ' + endTime + ':00');

            postData.fromHalfDay = startTime === 'am' || startTime === 'pm' ? startTime : '';
            postData.toHalfDay = endTime === 'am' || endTime === 'pm' ? endTime : '';
          }
          postData.deptId = this.deptInfo.deptId;
          postData.deptName = this.deptInfo.deptName;
          postData.leaveType = leaveType;
          postData.leaveExplain = description;
          postData.imgUrl = imgUrl;
          postData.businessPlace = businessPlace;
          postData.id = this.options.id;
          postData.totalTime = totalTime;
          postData.appealType = appealType;

          const attendanceDateList = (attendanceDate || '').split('--');
          const attendanceDateListLength = attendanceDateList.length;
          if (attendanceDateList?.[0]) {
            postData.attendanceId = attendanceDateList?.slice(0, attendanceDateListLength - 1)?.join('--');
            postData.attendanceStatus = attendanceDateList?.[attendanceDateListLength - 1];
          }

          postData.travels = this.distanceList || [];
          // postData.homeReason = homeReason.join();
          // postData.homeReasonOther = homeReasonOther;
          if (this.showHomeType) {
            const { homeReason, homeReasonOther, infectCount } = this.form;
            postData.homeReason = homeReason;
            postData.infectCount = infectCount;
          }
          postData.deceasedKinship = deceasedKinship;

          console.log('check', this.showType, valid, validate);

          if (validate && this.showType && !postData.travels.length) {
            dialog({
              title: '提示',
              content: '请检查“我的行程”是否填写，如未填写将无法使用汇联易携程预订功能，差旅费用需自行垫付',
              type: 'warning',
              onConfirm: async () => {
                submitForm(postData);
              }
            });
          } else {
            submitForm(postData);
          }
        }
      };
      if (validate) {
        this.$refs['form'].validate(async (valid) => {
          check(valid);
        });
      } else {
        check(true);
      }
    },
    async submitForm(postData) {
      this.hasConfirm = true;
      const res = await editKq(postData);
      if (res.success) {
        this.$toast({ content: res.message || '保存成功', type: 'success' });
        // this.$router.push({path:'/dashboard/attendance/application',params:{v:Date.parse(new Date())}});
        if (this.$route.path.indexOf('/dashboard/audit/audit-center') === -1) {
          let from = this.options.pageType || 'appeal';
          if (!['vacation', 'publicout', 'stay-home', 'special', 'appeal'].includes(from)) {
            from = 'vacation';
          }
          const target = `/dashboard/attendance/apply/${from}`;
          if (this.$route.path.indexOf('attendance/apply') > -1) {
            this.$router.replace({ path: `${target}` });
          } else {
            this.$router.push({ path: `${target}` });
          }
        } else {
          this.$emit('refresh');
        }

        this.$emit('close');
      }
      this.hasConfirm = false;
    },
    openDialog() {
      if (this.form.startTime && this.form.startDate && this.form.endTime && this.form.endDate) {
        this.showAdd = true;
      } else {
        this.$dialog({
          content: '请添加起始日期时间与结束日期时间'
        });
      }
    },
    getWayList(wayList, type) {
      if (this.distanceType !== type) {
        this.distanceList = wayList;
        this.distanceType = type;
      } else {
        if (this.distanceType === 'backTracking') {
          this.distanceList = wayList;
        } else {
          this.distanceList = this.distanceList.concat(wayList);
        }
      }
      this.showAdd = false;
    },
    closeEdit() {
      this.showEdit = false;
    },
    closeAdd() {
      this.showAdd = false;
    },
    deleteDistance(index) {
      if (this.distanceType === 'oneWay') {
        this.distanceList.splice(index, 1);
      } else {
        this.distanceList = [];
      }
    },
    editWay(item) {
      let data = JSON.parse(JSON.stringify(item));
      if (item.back) {
        let arr = [];
        arr[0] = data;
        arr[1] = data.back;
        this.distanceList = arr;
      } else {
        this.$set(this.distanceList, this.wayIndex, item);
      }
      this.showEdit = false;
    },
    chooseEdit(index) {
      this.wayIndex = index;
      if (this.distanceType === 'oneWay') {
        this.wayItem = this.distanceList[index];
      } else {
        this.wayItem = JSON.parse(JSON.stringify(this.distanceList[0]));
        this.wayItem.back = JSON.parse(JSON.stringify(this.distanceList[1]));
        this.$nextTick(() => {});
      }
      this.showEdit = true;
    },
    fixTime(t) {
      let time = new Date(t).getTime();
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = new Date(time).getDate() < 10 ? '0' + new Date(time).getDate() : new Date(time).getDate();
      return year + '-' + month + '-' + day;
    },
    changeBusiness() {
      this.distanceList = [];
      this.form.imgUrl = [];
    },
    wayTimeChange(val) {
      this.distanceList = [];
    }
    // homeReasonChange(val) {
    //     if(!val.includes('04')){
    //         this.form.homeReasonOther = '';
    //     }
    // }
  }
};
</script>

<style lang="less" scoped>
.application-publicout-page ::v-deep {
  padding-bottom: 0;

  .page-info {
    position: sticky;
    top: 0;
    z-index: 10;
    margin: 0;
    padding: 12px 20px;
    margin: 0 -20px;
    margin-bottom: 20px;
    color: #13141a;
    font-size: 14px;
    background-color: #fff;
    border-bottom: 1px solid #eceef0;
  }
}

.error-image-preview {
  display: flex;
  margin-top: 12px;
  flex-wrap: wrap;
}

.no-label {
  margin-left: 10px;

  ::v-deep.item-content {
    margin-left: 0 !important;
  }
}

.info-wrap {
  line-height: 16px;
  font-size: 12px;
  overflow: hidden;
  display: block;

  /deep/.item-content {
    line-height: 14px;
  }
}

// .text-blue {
//     line-height: 16px !important;
//     padding-top: 6px;
//     font-size: 12px;
//     color: #FA594A;
// }
::v-deep {
  .today {
    top: 0;
    left: 0;
  }

  .form-item {
    margin-bottom: 20px;

    .item-content {
      margin-top: 3px;
    }

    .item-label {
      font-size: 14px;
      font-weight: 400;
      color: #4e5969;
      line-height: 20px;
      white-space: nowrap;
    }
  }

  .datepicker-wrap .ui-icon-date + .ipt {
    padding-right: 25px;
  }

  .dropdown-menu li {
    padding: 0 8px;
  }

  .today {
    background-color: #f2f5f9 !important;
  }

  .datepicker-pannel {
    z-index: 3;
  }
}

.datepicker-wrap ::v-deep input {
  width: 300px;
  padding-left: 12px;
}

.ipt-wrap ::v-deep input {
  padding-left: 12px;
}

.attendance-submit {
  width: 240px;
  margin: 0 auto;

  .alert-warning {
    width: 389px;
  }

  button {
    margin-right: -180px;
    margin-bottom: 20px;
  }
}

.radio-group {
  position: relative;
}

.form-item .item-content {
  flex: auto;
}

::v-deep .upload-file-info {
  align-items: baseline;
}

::v-deep .file-name {
  max-width: 373px;
  flex: auto;
  flex-shrink: 0;
}

::v-deep .radio-group .tip-error {
  position: absolute;
  left: 200px;
  top: 5px;
}

// ::v-deep .input{
//     width: 600px;
// }
// ::v-deep .ui-select {
//     width: 600px;
// }

::v-deep .form-btns .btn + .btn {
  margin-left: 20px;
}

.distance-container {
  margin: 0 0 20px 115px;
}

.submit-btn {
  height: 32px;
  color: #00a6a7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 400;
  color: #00a6a7;
  line-height: 20px;

  .svg-icon {
    margin-right: 8px;
  }
}
</style>
