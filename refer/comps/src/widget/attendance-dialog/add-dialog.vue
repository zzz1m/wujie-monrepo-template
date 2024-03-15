<template>
  <!--添加行程 -->
  <div v-show="isVisibleDialog">
    <ui-dialog
      v-model="showDialog"
      class="distance-dialog"
      :prevent-confirm="true"
      :prevent-layer="true"
      title="添加行程"
      @on-confirm="submitDistance"
      @on-hide="distanceHide"
    >
      <template slot="content">
        <div class="distance-body">
          <p class="top-tool">
            <span :class="distanceType === 'oneWay' && 'active'" @click="changeDistance('oneWay')">单程</span>
            <span :class="distanceType === 'backTracking' && 'active'" @click="changeDistance('backTracking')">往返</span>
          </p>
          <div class="distance-container">
            <ui-form ref="distenceForm" :model="formData">
              <div v-for="(theWay, index) in formData.theWayList" :key="index" class="container-item">
                <span class="distance-index">{{ index + 1 }}</span>
                <i v-if="formData.theWayList.length > 1" class="ti-trash" @click="deleteWayList(index)"></i>

                <div class="item-required">
                  <form-item
                    label="出发地"
                    :prop="'theWayList.' + index + '.fromCityCode'"
                    :rules="[{ required: true, message: '请填写出发地', trigger: 'change' }]"
                  >
                    <ui-select
                      v-model="theWay.fromCityCode"
                      class="city-select"
                      filterable
                      remote
                      :remote-method="searchByKeywordFrom"
                      @on-change="fromCityChange($event, index)"
                    >
                      <template v-if="cityList1 && cityList1.length">
                        <ui-option v-for="item in cityList1" :key="item.code" :value="item.code">{{ item.areaName }}</ui-option>
                      </template>
                    </ui-select>
                  </form-item>

                  <form-item
                    label="目的地"
                    :prop="'theWayList.' + index + '.toCityCode'"
                    :rules="[{ required: true, message: '请填写目的地', trigger: 'change' }]"
                  >
                    <ui-select
                      v-model="theWay.toCityCode"
                      class="city-select"
                      filterable
                      remote
                      :remote-method="searchByKeywordTo"
                      @on-change="toCityChange($event, index)"
                    >
                      <template v-if="cityList2 && cityList2.length">
                        <ui-option v-for="item in cityList2" :key="item.code" :value="item.code">{{ item.areaName }}</ui-option>
                      </template>
                    </ui-select>
                  </form-item>

                  <form-item
                    label="开始日期"
                    :prop="'theWayList.' + index + '.startDate'"
                    :rules="[{ required: true, message: '请填写开始日期', trigger: 'change' }]"
                  >
                    <ui-date-picker
                      v-model="theWay.startDate"
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

                  <form-item
                    label="离开日期"
                    :prop="'theWayList.' + index + '.endDate'"
                    :rules="[{ required: true, message: '请填写离开日期', trigger: 'change' }]"
                  >
                    <ui-date-picker
                      v-model="theWay.endDate"
                      :forbid-day-list="endTimeForbid"
                      :is-loading="endTimeLoading"
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

                <div v-if="distanceType === 'backTracking'" class="item-required">
                  <form-item label="出发地">
                    <ui-input class="city-echo" disabled placeholder="请选择" :value="fromCityname"></ui-input>
                  </form-item>
                  <form-item label="目的地">
                    <ui-input class="city-echo" disabled placeholder="请选择" :value="toCityName"></ui-input>
                  </form-item>
                  <form-item label="开始日期">
                    <ui-date-picker v-model="theWay.back.startDate" disabled placeholder="选择日期" type="date" value-format="yyyy-MM-dd"> </ui-date-picker>
                  </form-item>
                  <form-item
                    label="离开日期"
                    :prop="'theWayList.' + index + '.back.endDate'"
                    :rules="[{ required: true, message: '请填写离开日期', trigger: 'change' }]"
                  >
                    <ui-date-picker
                      v-model="theWay.back.endDate"
                      :forbid-day-list="endTime2Forbid"
                      :is-loading="endTime2Loading"
                      :picker-options="pickerOptionEnd"
                      placeholder="选择日期"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @on-show-date-change="onShowEndDate2Change"
                    >
                    </ui-date-picker>
                  </form-item>
                </div>
                <form-item label="事由">
                  <ui-input v-model="theWay.remark" :maxlength="200" placeholder="请输入" type="textarea"> </ui-input>
                </form-item>
              </div>
            </ui-form>
          </div>
          <div v-if="formData.theWayList.length < 10 && distanceType === 'oneWay'" class="btn btn-primary" @click="addDistance">添加行程</div>
        </div>
      </template>
    </ui-dialog>
  </div>
</template>

<script type="text/javascript">
import { deepCopy } from '@noah/tools/src/utils/object';
import { getNameByCode } from '@noah/tools/src/utils/util';
import { debounce } from '@noah/tools/src/utils/util';
import { attendanceServices } from '@noah/tools';
const { _personalCalendar, _getYoldandaArea } = attendanceServices;

let timer = null;
const forbidCache = {};
export default {
  props: {
    getWayList: {
      type: Function,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    },
    closeAdd: {
      type: Function,
      default: () => {}
    }
  },
  components: {},
  created() {
    this.isVisibleDialog = true;
    this.formData.theWayList[0].startDate = this.form.startDate;
    this.formData.theWayList[0].endDate = this.form.endDate;
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
    addDistance() {
      if (this.formData.theWayList.length < 10) {
        let item = deepCopy(this.theWayItem);
        item.startDate = this.form.startDate;
        item.endDate = this.form.endDate;
        this.formData.theWayList.push(item);
      }
    },
    changeDistance(type) {
      if (type !== this.distanceType) {
        this.distanceType = type;
        if (this.distanceType === 'oneWay') {
          this.formData.theWayList = [deepCopy(this.theWayItem)];
          this.formData.theWayList[0].startDate = this.form.startDate;
          this.formData.theWayList[0].endDate = this.form.endDate;
        } else {
          let item = deepCopy(this.theWayItem);
          item.back = deepCopy(this.theWayItem);
          item.startDate = this.form.startDate;
          item.endDate = this.form.endDate;
          item.back.startDate = this.form.endDate;
          this.formData.theWayList = [item];
        }
      }
    },
    deleteDistance(index) {
      this.distanceList.splice(index, 1);
    },
    deleteWayList(index) {
      this.formData.theWayList.splice(index, 1);
    },
    distanceHide() {
      this.isVisibleDialog = false;
      this.closeAdd();
    },
    dealDisabledDate(time) {
      return time.getTime() >= new Date(this.form.endDate).getTime() || time.getTime() <= new Date(this.form.startDate).getTime() - 60 * 60 * 24 * 1000;
    },
    submitDistance() {
      this.$refs['distenceForm'].validate(async (valid) => {
        // this.isVisibleDialog = false;
        console.log(this.formData.theWayList, 'this.formData.theWayList');
        if (valid) {
          if (this.distanceType === 'oneWay') {
            this.distanceList = this.formData.theWayList.concat([]);
            this.distanceList.forEach((item) => {
              item.type = 1001;
            });
          } else {
            console.log(this.formData.theWayList, 'this.theWayList');
            let item = JSON.parse(JSON.stringify(this.formData.theWayList[0]));
            let back = item.back;
            let arr = [];
            delete item.back;
            arr[0] = item;
            arr[1] = back;
            arr[0].type = 1002;
            arr[1].type = 1002;
            arr[1].remark = this.formData.theWayList[0].remark;
            console.log(this.formData.theWayList, 'this.theWayListthis.theWayListthis.theWayList');
            this.distanceList = arr.concat([]);
          }
          console.log(this.distanceList, 'reallist');
          if (
            this.distanceList.some((item) => {
              return new Date(item.startDate).getTime() > new Date(item.endDate).getTime();
            })
          ) {
            this.$toast({ content: '结束日期不可以小于开始日期', type: 'warning' });
          } else {
            this.getWayList(this.distanceList, this.distanceType);
            this.showDialog = false;
          }
        }
      });
    },
    fromCityChange(val, index) {
      this.toCityName = getNameByCode(val, this.cityList1, '', {
        codeKey: 'code',
        labelKey: 'areaName'
      });
      if (this.distanceType !== 'oneWay') {
        this.formData.theWayList[0].back.toCityCode = val;
      }
    },
    toCityChange(val, index) {
      this.fromCityname = getNameByCode(val, this.cityList2, '', {
        codeKey: 'code',
        labelKey: 'areaName'
      });
      if (this.distanceType !== 'oneWay') {
        this.formData.theWayList[0].back.fromCityCode = val;
      }
    },
    timeChange(val) {
      if (this.distanceType !== 'oneWay') {
        this.formData.theWayList[0].back.startDate = val;
      }
    },
    //
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
    }
  },
  data() {
    return {
      isVisibleDialog: true,
      theWayItem: {
        fromCityCode: '',
        toCityCode: '',
        startDate: '',
        endDate: '',
        remark: '',
        type: ''
      },
      formData: {
        theWayList: [
          {
            fromCityCode: '',
            toCityCode: '',
            startDate: '',
            endDate: '',
            remark: '',
            type: ''
          }
        ]
      },
      distanceList: [],
      distanceType: 'oneWay',
      showDialog: true,
      cityList1: [],
      cityList2: [],
      toCityName: '',
      fromCityname: '',
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

    .top-tool {
      height: 32px;
      border-bottom: 1px solid #e0e6e8;
      user-select: none;

      span {
        line-height: 32px;
        position: relative;
        margin-right: 32px;
        display: inline-block;
        cursor: pointer;

        &.active {
          color: #53cac3;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: #53cac3;
          }
        }
      }
    }

    .btn {
      margin: 10px 0 0 34px;
    }
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

          .city-select {
            input {
              width: 90px;
            }
          }

          .city-select,
          .city-echo {
            input {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
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
