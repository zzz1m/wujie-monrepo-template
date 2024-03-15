<template>
  <div>
    <div class="apply-container">
      <ui-form ref="form" :class="'apply-form'" :label-width="115" :model="formData" :rules="ruleData" @submit.native.prevent="handleSubmit('form')">
        <form-item label="特殊考勤类型：" prop="type" required>
          <ui-select v-model="formData.type" @on-change="typeChange">
            <ui-option v-for="item in checkList" :key="item.dictCode" :value="item.dictCode">{{ item.dictName }}</ui-option>
          </ui-select>
        </form-item>
        <form-item v-if="['03', '04'].includes(formData.type)" label="考勤时间：" prop="shiftCode" required>
          <ui-select v-model="formData.shiftCode">
            <ui-option v-for="item in statusList" :key="item.code" :value="item.code">{{ item.name }}</ui-option>
          </ui-select>
        </form-item>
        <form-item label="时间范围：" prop="time" required>
          <ui-date-picker
            v-model="formData.time"
            end-placeholder="结束日期"
            :forbid-day-list="startTimeForbid"
            format="yyyy-MM-dd"
            :is-loading="startTimeLoading"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="开始日期"
            type="daterange"
            :unlink-panels="true"
            value-format="yyyy-MM-dd"
            @on-change="timeChange"
            @on-show-date-change="onShowStartDateChange"
          >
          </ui-date-picker>
        </form-item>
        <form-item label="详细说明：" prop="remark" required>
          <ui-input v-model.trim="formData.remark" placeholder="请输入" type="textarea"></ui-input>
        </form-item>
        <form-item label="附件：" prop="attachmentList" required style="margin-bottom: 10px">
          <ui-upload
            ref="upload"
            action="/api/config/upload.json"
            :cropper="false"
            custom
            exname=".jpg.png.jpeg.bmp"
            multiple
            :total="9"
            :uploaded-num="uploadedNum"
            @uploadEnd="uploadEnd"
          >
            <ul v-if="formData.attachmentList && formData.attachmentList.length > 0" class="error-image-preview clearfix">
              <li v-for="(image, index) in formData.attachmentList" :key="index">
                <i class="ui-icon-close" @click="removeImage(index)"></i>
                <img alt="" :src="image" />
              </li>
            </ul>
            <button
              class="btn btn-primary btn-outline submit-btn"
              :disabled="formData.attachmentList && formData.attachmentList.length >= 9"
              type="button"
              @click="mockClick"
            >
              <svg-icon icon-class="icon-upload-new"></svg-icon>
              点击上传
            </button>
          </ui-upload>
        </form-item>
      </ui-form>
      <div v-if="formData.type" style="margin-bottom: 30px">
        <p v-for="(item, index) in text[formData.type]" :key="index" class="apply-desc">{{ item }}</p>
      </div>
      <div class="audit-progress-wrap-preview attendace">
        <div class="title">审批流程预览：</div>
        <AuditProgress v-if="showProgress" :list="progress" />
        <div v-else class="tip">必填信息填写完成后，可预览审批流</div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getValue, debounce } from '@noah/tools/src/utils/util';
import AuditProgress from '../audit-preview-dialog/progress.vue';

import { commonServices, attendanceServices, auditServices } from '@noah/tools';
const { _batchGetDictInfo } = commonServices;
const { _specRequire, _getSpecialShiftList, _personalCalendar } = attendanceServices;
const { _getDetailByProcessInstanceId, _attendanceSpecialUserPreviewProgress } = auditServices;

const forbidCache = {};
export default {
  components: {
    AuditProgress
  },
  props: {
    // initDataType: { type: String, default: ''},
    options: { type: Object, default: () => {} }
  },
  data() {
    return {
      formData: {
        type: '',
        shiftCode: '',
        remark: '',
        attachmentList: [],
        time: []
      },
      ruleData: {
        type: [{ required: true, message: '请选择特殊考勤类型', trigger: 'change' }],
        time: [{ required: true, type: 'array', message: '请选择时间范围', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入详细说明', trigger: 'change' }],
        attachmentList: [{ required: true, type: 'array', message: '请上传附件', trigger: 'change' }]
      },
      checkList: [],
      statusList: [],
      text: {
        '01': [
          '您所提交的个人信息公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供。',
          '申请照顾重病家属考勤，请说明您和重病家属的亲属关系、家属患病情况、申请适用时限（每次不超过6个月）等信息。',
          '适用本政策情形消失，应立即告知考勤停止适用本政策。'
        ],
        '02': [
          '您所提交的个人信息公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供。',
          '申请照看幼小初阶段子女考勤，请说明您和孩子的亲子关系、子女就学阶段、所在学校和年级、申请适用时限（不能超过子女当前就学阶段毕业日期）等信息，并上传相应附件证明。',
          '适用本政策情形消失，应立即告知考勤停止适用本政策。'
        ],
        '03': [
          '您所提交的个人信息公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供。',
          '医疗健康信息属于您的敏感信息，公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供。',
          '申请准妈妈考勤，请在附件上传结婚证、正规医院出具的妊娠证明。'
        ],
        '04': ['您所提交的个人信息公司仅用于审批休假及内部核实存档，未经您的同意不会向任何第三方提供。', '申请哺乳期考勤，请在附件上传您子女的出生证明。']
      },
      loading: false,
      pickerOptions: {
        disabledDate: (date) => {
          return this.$dayjs(date).isBefore(this.$dayjs().format('YYYY-MM-DD', 'day'));
        }
      },
      showProgress: false,
      progress: [],
      startTimeLoading: false,
      startTimeForbid: []
    };
  },
  computed: {
    uploadedNum() {
      const imgUrl = this.formData.attachmentList || [];
      return imgUrl.length;
    },
    processInstanceId() {
      return this.options.id || '';
    }
  },
  created() {
    this.getCheckIng();
    this.formData.type = this.options.dataType;
    this.init();
    this.typeChange(this.options.dataType, true);
  },
  mounted() {},
  methods: {
    onShowStartDateChange: debounce(300, async function (dateList) {
      const load = async (dateVal) => {
        try {
          if (forbidCache[dateVal]) return forbidCache[dateVal];
          const { success, root } = await _personalCalendar({
            date: dateVal,
            userId: this.$store.state.userInfo.id
          });
          if (success) {
            const result = (root?.calendarList || []).filter((t) => t.dayType === 'weekend').map((t) => this.$dayjs(t.attendanceDate).format('YYYY-MM-DD'));
            forbidCache[dateVal] = result;
            return result;
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      };

      const [d1, d2] = dateList;
      const d = this.$dayjs(d1).startOf('month');
      const dd2 = this.$dayjs(d2).startOf('month');
      this.startTimeLoading = true;
      const dList = [
        d.subtract(1, 'month').format('YYYY-MM-DD'),
        d.format('YYYY-MM-DD'),
        d.add(1, 'month').format('YYYY-MM-DD'),
        dd2.subtract(1, 'month').format('YYYY-MM-DD'),
        dd2.format('YYYY-MM-DD'),
        dd2.add(1, 'month').format('YYYY-MM-DD')
      ];
      const dLIstUniq = [...new Set(dList)];

      const res = await Promise.all(dLIstUniq.map((t) => load(t)));
      this.startTimeForbid = res.reduce((a, b) => [...a, ...b], []);
      this.startTimeLoading = false;
    }),
    async init() {
      try {
        if (this.processInstanceId) {
          const { success, root } = await _getDetailByProcessInstanceId({
            processInstanceId: this.processInstanceId
          });
          if (!success || !root) return;
          let detailData = root.detail || [];
          Object.keys(this.formData).forEach((key) => {
            if (detailData[key]) {
              this.formData[key] = detailData[key];
            } else if (key === 'time') {
              let applyStartDate = detailData.applyStartDate ? this.$dayjs(detailData.applyStartDate).format('YYYY-MM-DD') : '';
              let applyEndDate = detailData.applyEndDate ? this.$dayjs(detailData.applyEndDate).format('YYYY-MM-DD') : '';
              this.formData.time = [applyStartDate, applyEndDate];
            }
          });
          this.typeChange(detailData.type, true);
          // this.tableData = detailData;
          // this.formData.effectDateStr = detailData[0] ? detailData[0].effectDateStr : '';
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async requireSpec(handler) {
      const { type, shiftCode, remark, attachmentList, time } = this.formData;
      const applyStartDate = _getValue(time, [0], '');
      const applyEndDate = _getValue(time, [1], '');
      let params = {
        type,
        applyStartDate,
        applyEndDate,
        shiftCode,
        remark,
        attachmentList
      };
      if (this.processInstanceId) {
        params.processInstanceId = this.processInstanceId;
      }

      handler(params);
    },
    async getCheckIng() {
      const res = await _batchGetDictInfo({ typeList: ['attendance_special_type'] });
      if (res.success) {
        this.checkList = res.root.attendance_special_type;
      }
    },
    timeChange(val) {},
    previewConfirm() {
      const handler = async (postData) => {
        const { success, root } = await _attendanceSpecialUserPreviewProgress(postData);
        if (success && root.length) {
          this.showProgress = true;
          this.progress = root;
        } else {
          this.showProgress = false;
          this.progress = [];
        }
      };
      this.requireSpec(handler);
    },
    async confirm() {
      const valid = await this.$refs['form'].validate();
      if (!valid) {
        return;
      }

      const handler = async (params) => {
        try {
          if (this.loading) return;
          this.loading = true;

          const { success, root } = await _specRequire(params);
          if (success) {
            this.$toast({
              type: 'success',
              duration: 2000,
              content: root || '发起成功'
            });
            const timer = setTimeout(() => {
              // 重新提交的跳到审批列表页
              // this.processInstanceId ? this.$router.push({path:'/dashboard/attendance/application'}) : this.$router.replace({ path: '/dashboard/audit/audit-center/list' });
              if (this.$route.path === '/dashboard/attendance/apply/special' && this.$route.query.tab == 1) {
                this.$emit('refresh');
              } else {
                this.$router.replace({ path: '/dashboard/attendance/apply/special' });
              }
              this.$emit('close');
              clearTimeout(timer);
            }, 300);
          }
        } catch (error) {
          // console.length(error);
        } finally {
          this.loading = false;
        }
      };
      this.requireSpec(handler);
    },
    uploadEnd({ data }) {
      const res = data;
      if (res.success) {
        this.formData.attachmentList.push(...res.root.urls);
        this.$toast({ content: '上传成功', type: 'success' });
      } else {
        this.$toast({ content: '上传失败', type: 'error' });
      }
    },
    removeImage(index) {
      this.formData.attachmentList.splice(index, 1);
    },
    mockClick() {
      this.$refs.upload.mockClick();
    },
    typeChange: debounce(500, async function (val, init) {
      try {
        if (!init) {
          this.formData.shiftCode = '';
        }
        if (!val || !['03', '04'].includes(this.formData.type)) {
          this.statusList = [];
          return;
        }
        const { success, root } = await _getSpecialShiftList({
          dictCode: val
        });
        if (!success || !root) return;
        this.statusList = root;
      } catch (error) {
        // console.log(error);
      }
    })
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler: function (e) {
        let check = false;
        if (!e.time || !e.time[0] || !e.time[1]) {
          check = true;
        }
        if (['03', '04'].includes(e.type) && !e.shiftCode) {
          check = true;
        }
        if (check) {
          this.showProgress = false;
          this.progress = [];
          return;
        }
        this.previewConfirm();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.apply-container {
  flex: 1;
  background: #ffffff;
  margin-bottom: 12px;

  ::v-deep.error-image-preview {
    display: flex;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  ::v-deep .apply-form {
    margin-top: 0px;
    margin-bottom: 20px;

    .form-item {
      margin-top: 0px;
      margin-bottom: 20px;
    }

    .item-content {
      margin-top: 3px;
    }

    .item-label {
      font-size: 14px;
      font-weight: 400;
      color: #4e5969;
      line-height: 20px;
    }
  }

  .apply-desc {
    padding-left: 114px;
    color: #8a8e9a;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .ui-select {
    // min-width: 340px;
    min-width: 100%;
  }

  .ui-range-editor.ui-input-inner {
    // width: 340px;
    width: 100%;
  }

  .ui-date-editor-datetimerange.ui-input-inner {
    width: 252px;
  }

  ::v-deep textarea.input {
    height: 169px;
  }

  .btn {
    display: flex;
    align-items: center;

    .svg-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
}

.submit-btn {
  height: 32px;
  color: #00a6a7;
  display: flex;
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
