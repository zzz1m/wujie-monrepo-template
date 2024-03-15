<template>
  <!--添加行程 -->
  <div v-show="isVisibleDialog">
    <ui-dialog
      v-model="showDialog"
      class="distance-dialog"
      :prevent-confirm="true"
      :prevent-layer="true"
      title="编辑行程"
      @on-cancel="distanceHide"
      @on-close="distanceHide"
      @on-confirm="submitDistance"
    >
      <template slot="content">
        <div class="distance-body">
          <div class="distance-container">
            <ui-form ref="distenceForm" :model="formData" :rules="rule">
              <div class="container-item">
                <div class="item-required">
                  <form-item label="出发地" prop="fromCityCode">
                    <ui-select v-model="formData.fromCityCode" filterable remote :remote-method="searchByKeywordFrom" @on-change="fromCityChange($event)">
                      <ui-option v-for="item in cityList1" :key="item.code" :value="item.code">{{ item.areaName }}</ui-option>
                    </ui-select>
                  </form-item>

                  <form-item label="目的地" prop="toCityCode">
                    <ui-select v-model="formData.toCityCode" filterable remote :remote-method="searchByKeywordTo" @on-change="toCityChange($event)">
                      <ui-option v-for="item in cityList2" :key="item.code" :value="item.code">{{ item.areaName }}</ui-option>
                    </ui-select>
                  </form-item>

                  <form-item label="开始日期" prop="startDate">
                    <ui-date-picker
                      v-model="formData.startDate"
                      :forbid-day-list="startTimeForbid"
                      :is-loading="startTimeLoading"
                      :picker-options="pickerOptionStart"
                      placeholder="选择日期"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @on-show-date-change="onShowStartDateChange"
                    >
                    </ui-date-picker>
                  </form-item>

                  <form-item label="离开日期" prop="endDate">
                    <ui-date-picker
                      v-model="formData.endDate"
                      :forbid-day-list="endTimeForbid"
                      :picker-options="pickerOptionEnd"
                      placeholder="选择日期"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @on-change="timeChange"
                      @on-show-date-change="onShowEndDateChange"
                    >
                    </ui-date-picker>
                  </form-item>
                </div>
                <div v-if="formData.back" class="item-required">
                  <form-item label="出发地">
                    <ui-input disabled placeholder="请选择" :value="fromCityname"></ui-input>
                  </form-item>
                  <form-item label="目的地">
                    <ui-input disabled placeholder="请选择" :value="toCityName"></ui-input>
                  </form-item>
                  <form-item label="开始日期">
                    <ui-date-picker v-model="formData.back.startDate" disabled placeholder="选择日期" type="date" value-format="yyyy-MM-dd"> </ui-date-picker>
                  </form-item>
                  <form-item label="离开日期">
                    <ui-date-picker
                      v-model="formData.back.endDate"
                      :forbid-day-list="endTime2Forbid"
                      :is-loading="endTime2Loading"
                      :picker-options="pickerOptionEnd"
                      placeholder="选择日期"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @on-change="timeChange"
                      @on-show-date-change="onShowEndDate2Change"
                    >
                    </ui-date-picker>
                  </form-item>
                </div>

                <form-item label="事由">
                  <ui-input v-model="formData.remark" :maxlength="200" placeholder="请输入" type="textarea" @input="remarkInput"> </ui-input>
                </form-item>
              </div>
            </ui-form>
          </div>
        </div>
      </template>
    </ui-dialog>
  </div>
</template>

<script type="text/javascript">
import { getNameByCode, debounce } from '@noah/tools/src/utils/util';
import { attendanceServices } from '@noah/tools';
const { _getYoldandaArea, _searchYoldanda, _personalCalendar } = attendanceServices;

const forbidCache = {};
let timer = null;
export default {
  props: {
    editWay: {
      type: Function,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    },
    wayItem: {
      type: Object,
      default: () => {}
    },
    closeEdit: {
      type: Function,
      default: () => {}
    }
  },
  components: {},
  created() {
    this.isVisibleDialog = true;
    this.formData = JSON.parse(JSON.stringify(this.wayItem));
    this.fixData();
    console.log(this.formData, 'this.formDatathis.formDatathis.formDatathis.formDatathis.formData');
  },
  mounted() {},
  computed: {
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
    }
  },
  methods: {
    onShowEndDateChange: debounce(300, async function (date) {
      const d = this.$dayjs(date).startOf('month');
      this.endTimeLoading = true;
      this.endTimeForbid = await this.loadingForbidDate(d);
      this.endTimeLoading = false;
    }),
    onShowEndDate2Change: debounce(300, async function (date) {
      const d = this.$dayjs(date).startOf('month');
      this.endTime2Loading = true;
      this.endTime2Forbid = await this.loadingForbidDate(d);
      this.endTime2Loading = false;
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
    dealDisabledDate(time) {
      return time.getTime() >= new Date(this.form.endDate).getTime() || time.getTime() <= new Date(this.form.startDate).getTime() - 60 * 60 * 24 * 1000;
    },
    submitDistance() {
      console.log(this.formData, 12312313123123123);
      this.$refs['distenceForm'].validate(async (valid) => {
        if (valid) {
          this.editWay(this.formData);
          this.isVisibleDialog = false;
          this.showDialog = false;
        }
      });
    },
    searchByKeywordFrom(keyword) {
      if (timer) clearTimeout(timer);
      try {
        timer = setTimeout(async () => {
          const { success, root } = await _getYoldandaArea({ keyword });
          if (success && root) {
            this.cityList1 = root || [];
          }
        }, 100);
      } catch (e) {}
    },
    searchByKeywordTo(keyword) {
      if (timer) clearTimeout(timer);
      try {
        timer = setTimeout(async () => {
          const { success, root } = await _getYoldandaArea({ keyword });
          if (success && root) {
            this.cityList2 = root || [];
          }
        }, 100);
      } catch (e) {}
    },
    distanceHide() {
      this.isVisibleDialog = false;
      this.closeEdit();
    },
    fromCityChange(val) {
      this.toCityName = getNameByCode(val, this.cityList1, '', {
        codeKey: 'code',
        labelKey: 'areaName'
      });
      if (this.formData.back) {
        this.formData.back.toCityCode = val;
      }
    },
    toCityChange(val) {
      this.fromCityname = getNameByCode(val, this.cityList2, '', {
        codeKey: 'code',
        labelKey: 'areaName'
      });
      if (this.formData.back) {
        this.formData.back.fromCityCode = val;
      }
    },
    timeChange(val) {
      if (this.formData.back) {
        this.formData.back.startDate = val;
      }
    },
    remarkInput(val) {
      if (this.formData.back) {
        this.formData.back.remark = val;
      }
    },
    async fixData() {
      let cityArr = [];
      let cityList = [];
      cityArr.push(this.wayItem.fromCityCode);
      cityArr.push(this.wayItem.toCityCode);
      if (this.wayItem.back) {
        cityArr.push(this.wayItem.back.fromCityCode);
        cityArr.push(this.wayItem.back.toCityCode);
      }
      const res = await _searchYoldanda(cityArr);
      if (res.success && res.root && res.root.length) {
        res.root.forEach((item) => {
          let citem = {};
          citem.code = item.code;
          citem.areaName = item.areaName;
          cityList.push(item);
        });
        this.cityList1 = cityList;
        this.cityList2 = cityList;
        if (this.wayItem.back) {
          this.fromCityChange(this.wayItem.back.toCityCode);
          this.toCityChange(this.wayItem.back.fromCityCode);
        }
      }
    }
  },
  data() {
    return {
      isVisibleDialog: true,
      showDialog: true,
      formData: {
        fromCityCode: '',
        toCityCode: '',
        startDate: '',
        endDate: '',
        back: {}
      },
      cityList1: [],
      cityList2: [],
      toCityName: '',
      fromCityname: '',
      rule: {
        fromCityCode: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
        toCityCode: [{ required: true, message: '请填写出差地点', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择起始日期', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        back: {
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }]
        }
      },
      startTimeLoading: false,
      endTimeLoading: false,
      endTime2Loading: false,
      startTimeForbid: [],
      endTimeForbid: [],
      endTime2Forbid: []
    };
  }
};
</script>

<style lang="less" scoped>
.distance-container {
  margin: 0 0 20px 140px;
}

.distance-dialog {
  .distance-body {
    height: 425px;
    overflow-y: overlay;
  }

  ::v-deep .distance-container {
    width: 700px;
    box-sizing: border-box;
    padding-left: 20px;
    margin: 0 0 0 14px;

    .item-label {
      float: none;
      text-align: left;
    }

    .container-item {
      position: relative;

      .item-required {
        display: flex;

        .form-item {
          margin-right: 20px;

          &.form-item:last-child {
            margin-right: 0;
          }
        }

        .item-content {
          .ui-select,
          .input-wrap {
            width: 150px;
            min-width: 150px;
          }

          input {
            width: 150px;
          }
        }
      }

      .input-wrap-textarea {
        width: 97%;

        textarea {
          width: 100%;
        }
      }

      .form-item {
        margin-bottom: 10px;
      }

      .distance-index {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        background: #00cfc5;
        color: #ffffff;
        position: absolute;
        top: 6px;
        left: -30px;
      }

      > i {
        position: absolute;
        top: 40px;
        left: -30px;
        color: #e3e5e9;
        font-size: 20px;
        cursor: pointer;

        &:hover {
          color: #00cfc5;
        }
      }
    }
  }
}
</style>
