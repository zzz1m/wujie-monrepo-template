<template>
  <div class="full-calendar-header">
    <div class="header-wrap">
      <div class="header-center">
        <span class="name" v-if="staffName">{{staffName}}</span>
        <span class="btn-date" v-if="isMinMonth" @click.stop="goPrev"><svg-icon icon-class="meeting-left" /></span>
        <span class="title">{{title}}</span>
        <span class="btn-date" @click.stop="goNext"><svg-icon icon-class="meeting-right" /></span>
      </div>
      <slot name="header-right"></slot>
    </div>
  </div>
</template>
<script>
import dateFunc from './dateFunc';

export default {
    props: {
        currentDate: {
            type: [Date, String],
            default() {
                return new Date();
            }
        },
        titleFormat: {},
        firstDay: {},
        monthNames: {},
        islast: [Boolean],
        isMinMonth: [Boolean],
        staffName: [String]
    },
    data() {
        return {
            title: '',
            headDate: new Date()
        };
    },
    watch: {
        currentDate(val) {
            if (val) this.headDate = val;
        },
        headDate(val) {
            this.islast ? this.dispatchEvent(true) : this.dispatchEvent();
        }
    },
    methods: {
        goPrev() {
            this.headDate = this.onChangeMonth(this.headDate, -1);
            // this.islast ? this.dispatchEvent(true) : this.dispatchEvent();
        },
        goNext() {
            this.headDate = this.onChangeMonth(this.headDate, 1);
            // this.islast ? this.dispatchEvent(true) : this.dispatchEvent();
        },
        onChangeMonth(date, num) {
            let dt = new Date(date);
            let _year = dt.getFullYear();
            let _month = dt.getMonth() + num;
            return new Date(_year, _month, 1);
        },
        dispatchEvent(last) {
            if (last) {
                this.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames, last);
            } else {
                this.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames);
            }
            let startDate = dateFunc.getStartDate(this.headDate);
            let curWeekDay = startDate.getDay();
            // 1st day of this monthView
            let diff = parseInt(this.firstDay) - curWeekDay;
            if (diff) diff -= 7;
            startDate.setDate(startDate.getDate() + diff);

            // the month view is 6*7
            let endDate = dateFunc.changeDay(startDate, 41);
            // 1st day of current month
            let currentDate = dateFunc.getStartDate(this.headDate);
            this.$emit(
                'change',
                dateFunc.format(startDate, 'yyyy-MM-dd'),
                dateFunc.format(endDate, 'yyyy-MM-dd'),
                dateFunc.format(currentDate, 'yyyy-MM-dd'),
                this.headDate
            );
        }
    }
};
</script>
