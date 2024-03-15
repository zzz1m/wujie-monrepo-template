<template>
<div class="full-calendar-body">
    <div class="weeks">
        <strong v-for="(week, index) in weekNames" :key="index" class="week" :class="['周六','周日'].includes(week) && 'weekend'">{{ week }}</strong>
    </div>
    <div ref="dates" class="dates">
        <!-- absolute so we can make dynamic td -->
        <div ref="datesEvents" class="dates-events">
            <div v-for="(week, index) in currentDates" :key="index" class="events-week">
                <template v-for="(day, i) in week">
                    <div v-if="week.length && day" :key="i" class="events-day" :class="{
                        'not-cur-month': !day.isCurMonth,
                        'day-type': day.events.length && day.events[0].type
                    }"
                        @click="dayClick(day, $event)" @mouseenter="toggleShowAddEvent($event,0)" @mouseleave="toggleShowAddEvent($event,1)"
                    >
                        <i v-if="day.events.length && day.events[0].type" class="day-rest badge badge-muted" :style="{'background': '#F7F8FA'}">休息</i>
                        <!-- <i v-else-if="day.events.length && day.events[0].isOver" class="day-rest badge">加班</i> -->
                        <i v-else-if="day.attendanceShiftVO" class="day-rest badge day-wrap" :style="{'background':set16ToRgb(day.attendanceShiftVO.color,0.1),'color': day.attendanceShiftVO.color}">
                            <nari-tooltip :value="day.attendanceShiftVO.name" />
                        </i>
                        <!-- 当前月 && 没有考勤对象 && 在职 =》 为老考勤 展示班字 -->
                        <i v-else-if="day.isCurMonth && !day.attendanceShiftVO && (day.events.length && day.events[0].inWorkTimeRange === true)" class="day-rest badge" :class="{'badge-success':!day.isAfterToDay,'badge-warning':day.isAfterToDay}">班</i>
                        <span class="day-number">{{ day.monthDay }}</span>
                        <span v-if="day.isToday" class="today">{{ day.monthDay }}</span>
                        <svg-icon v-if="day.events.length && day.events[0].isOver && day.events[0].appealFlag != 2" cursor="unset" icon-class="repair" class="day-over"></svg-icon>
                        <!-- <span class="badge badge-muted day-small-late" v-if="day.events.length && day.events[0].smallLateStatus">来晚了</span> -->

                        <a v-if="(day.isAfterToDay || day.isToday) && day.isCurMonth && !(day.events.length && day.events[0].type) && !banEvent" class="add-new-event"
                            @click="addNewEvent(day)"
                        >
                            新增事件
                        </a>

                        <!-- <div v-if="day.events.length && day.events[0].data.leaveInfoFromList" class="day-holiday">请假</div> -->
                        <div v-if="day.events.length && !day.events[0].type && day.events[0].isEvent" class="event-box">
                            <div v-for="(event, e) in day.events" v-show="event.cellIndex <= eventLimit" :key="e" class="event-item" :class="[classNames(event.cssClass), {
                                'is-start': isStart(event.start, day.date),
                                'is-end': isEnd(event.end,day.date),
                                'is-opacity': !event.isShow
                            }]"
                            >
                                <template v-if="event.appealFlag != 2">
                                    <!-- <p v-if="event.start_desc" class="event-obj am" :class="getTagClass(event, 0)" @click="onEvent(event, day, $event, 0)">AM：{{event.start_desc}}</p> -->
                                    <!-- <div> -->
                                    <p v-if="event.start_desc" slot="reference" class="event-obj am" :class="getTagClass(event, 0)" @click="eventClick(event, $event, 0)">AM：{{ event.start_desc }}</p>
                                    <!-- <br v-if="event.start_desc  && event.end_desc " /> -->

                                    <p v-if="event.end_desc && (!day.isToday || banEvent)" slot="reference" class="event-obj pm" :class="getTagClass(event, 1)" @click="eventClick(event, $event, 1)">PM：{{ event.end_desc }}</p>

                                    <p v-if="event.leaveWorkEarlyType" slot="reference" class="event-obj am green">{{ getNameByCode(event.leaveWorkEarlyType, dictInfo.attendance_special_type, '') }}</p>
                                    <p v-for="(personApply,index) in event.personApplyFormList" slot="reference" :key="index" class="event-obj am green"
                                        :class="getTagClass(event, 2)" @click="onApplyEvent(event, day, personApply)"
                                    >
                                        {{ getType(personApply.leaveType,personApply.appealType) }}
                                    </p>
                                </template>
                            <!-- </div> -->
                            <!-- <p v-if="event.end_desc" class="event-obj pm" :class="getTagClass(event, 1)" @click="onEvent(event, day, $event, 1)">PM：{{event.end_desc}}</p> -->
                            </div>
                            <p v-if="day.events.length > eventLimit" class="more-link" @click.stop="selectThisDay(day, $event)">
                                +
                                {{ day.events[day.events.length -1].cellIndex - eventLimit }} more
                            </p>
                        </div>
                    <!-- <i
              v-for="(event, n) in day.events"
              :key="n"
              :class="[event.addon ? event.addon.className : '']"
            >{{event.addon && event.addon.text}}45</i>-->
                    </div>
                </template>
            </div>
        </div>

        <!-- full events when click show more -->
        <div v-show="showMore" class="more-events" :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
            <div class="more-header">
                <span class="title">{{ moreTitle(selectDay.date) }}</span>
                <span class="close" @click.stop="showMore = false">x</span>
            </div>
            <div class="more-body">
                <ul class="body-list">
                    <li v-for="(event, index) in selectDay.events" v-show="event.isShow" :key="index" class="body-item" @click="eventClick(event,$event)">{{ event.title }}</li>
                </ul>
            </div>
        </div>

        <slot name="body-card"></slot>
    </div>
    <ui-dialog v-model="isVisibleDialog"
        title="新增事件"
        wrap-class="attendance-dialog"
        prevent-cancel prevent-confirm  
        prevent-close prevent-layer
        @on-confirm="confirmDialog"
        @on-cancel="closeDialog"
        @on-close="closeDialog"
    >
        <template v-if="isVisibleDialog" slot="content">
            <ui-radio-group v-model="type">
                <ui-radio v-for="item in typeList" :key="item.value" :label="item.value">{{ item.label }}</ui-radio>
            </ui-radio-group>
        </template>
    </ui-dialog>
    <ApplyDialog ref="applyDialog" />
</div>
</template>
<script>
import dateFunc from './dateFunc';
import { getNameByCode } from '@/utils/util.js';
import { getTargetPath } from '@/utils/common';
import { _batchGetDictInfo } from '@/services/dashboard/common';
import NariTooltip from '@/package/common/nari-tooltip';
import { set16ToRgb } from '@/utils/util.js';
import ApplyDialog from '@/package/attendance/components/apply-dialog/index.vue';


export default {
    components: {
        NariTooltip,
        ApplyDialog
    },
    props: {
        currentDate: {},
        events: {},
        weekNames: {
            type: Array,
            default: () => []
        },
        monthNames: {},
        firstDay: {},
        eventIsDay: {},
        isNotEvent: {},
        banEvent: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    created() {
        this.events.forEach((item, index) => {
            item._id = item.id || index;
            item.end = item.end || item.start;
        });
        this.getNameByCode = getNameByCode;
        this.getDictInfo();
        this.set16ToRgb = set16ToRgb;
        // this.events = events
    },
    mounted() {
        console.log('events', this.events)
        this.$nextTick(() => {
            if (!this.$refs.datesEvents) {
                return;
            }
            this.$refs.dates.style.height = this.$refs.datesEvents.offsetHeight + 20 + 'px';
            // this.$refs.dates.style.height = this.$refs.datesEvents.offsetHeight + 'px'
        });
    },
    data() {
        return {
            // weekNames: DAY_NAMES,
            weekMask: [1, 2, 3, 4, 5, 6, 7],
            isVisibleDialog: false,
            type: '1',
            typeList: [{ value: '1', label: '休假' }, { value: '2', label: '公出' }],
            currentTime: '',
            // events: [],
            isLismit: true,
            eventLimit: 3,
            showMore: false,
            morePos: {
                top: 0,
                left: 0
            },
            selectDay: {},
            leaveWorkEarlyTypeList: [{
                label: '照顾家属特殊考勤',
                value: '1'
            },{
                label: '照看子女特殊考勤',
                value: '2'
            }],
            dictInfo: {                             // 批量字典
                attendance_special_type: []
            }
        };
    },
    watch: {},
    computed: {
        currentDates() {
            return this.getCalendar();
        },
        currentPath() {
            return getTargetPath( this.$route.path );
        }
    },
    methods: {
        getType(status, appealType) {
            switch (appealType) {
                case 1:
                    return '事后请假';
                case 2:
                    return status == 20 ? '申诉（防疫-居家）' : '申诉（公出申请）';
                case 3:
                    return '申诉（忘打卡）';
                case 4:
                    return '申诉（其他）';
            }
            switch (status) {
                case 1:
                    return '法定年休假';
                case 2:
                    return '病假';
                case 3:
                    return '事假';
                case 4:
                    return '婚假';
                case 5:
                    return '准妈妈假';
                case 6:
                    return '产检假';
                case 7:
                    return '产假';
                case 8:
                    return '哺乳假';
                case 9:
                    return '丧假';
                case 10:
                    return '奖励假';
                case 11:
                    return '调休';
                case 12:
                    return '市内公出';
                case 13:
                    return '市外出差';
                case 14:
                    return '带薪病假';
                case 15:
                    return '少数民族假';
                case 18:
                    return '女性带薪（姨妈）假';
                case 19:
                    return '司龄假';
                case 20:
                    return '防疫-居家';
                case 21:
                    return '育儿假';
                case 22:
                    return '陪产假';
                case 23:
                    return '工伤假';
                case 24:
                    return '临时带薪关怀';
                // case 14:
                //     return "申诉(公出)";
                // case 15:
                //     return "事后请假";
                // case 16:
                //     return "申诉(忘打卡)";
                // case 17:
                //     return "申诉(其他)";
            }
        },
        closeDialog() {
            this.isVisibleDialog = false;
        },
        confirmDialog() {
            this.$refs.applyDialog?.open({
                pageType: this.type == '1' ? 'vacation' : 'publicout',
                startDate: this.currentTime
            });
            
            this.isVisibleDialog = false;
        },
        addNewEvent(day) {
            if (this.banEvent) {
                return;
            }
            this.isVisibleDialog = true;
            this.currentTime = this.$dayjs.tz(day.date, 'Asia/Shanghai').format('YYYY-MM-DD');
        },
        toggleShowAddEvent(event, type) {
            // eslint-disable-next-line
            const dom = $(event.target).find('.add-new-event');
            type ? dom.hide() : dom.show();
        },
        isBegin(event, date, index) {
            let st = new Date(dateFunc.format(event.start, 'yyyy-MM-dd'));

            if (index === 0 || st.toDateString() === date.toDateString()) {
                return event.title;
            }
            return '';
        },
        moreTitle(date) {
            let dt = new Date(dateFunc.format(date, 'yyyy-MM-dd'));
            return this.weekNames[dt.getDay()] + ', ' + this.monthNames[dt.getMonth()] + dt.getDate();
        },
        classNames(cssClass) {
            if (!cssClass) return '';
            // string
            if (typeof cssClass === 'string') return cssClass;

            // Array
            if (Array.isArray(cssClass)) return cssClass.join(' ');

            // else
            return '';
        },
        getCalendar() {
            // calculate 2d-array of each month
            // first day of this month
            let now = new Date(); // today
            let current = new Date(dateFunc.format(this.currentDate, 'yyyy-MM-dd'));

            let startDate = dateFunc.getStartDate(current); // 1st day of this month

            let curWeekDay = startDate.getDay();

            let eventIndex = 0;

            // begin date of this table may be some day of last month
            let diff = parseInt(this.firstDay) - curWeekDay;
            diff = diff > 0 ? diff - 7 : diff;

            startDate.setDate(startDate.getDate() + diff);
            let calendar = [];
            for (let perWeek = 0; perWeek < 6; perWeek++) {
                let week = [];

                for (let perDay = 0; perDay < 7; perDay++) {
                    week.push({
                        monthDay: startDate.getDate(),
                        isToday: now.toDateString() === startDate.toDateString(),
                        isCurMonth: startDate.getMonth() === current.getMonth(),
                        weekDay: perDay,
                        date: new Date(dateFunc.format(startDate, 'yyyy-MM-dd')),
                        events: this.slotEvents(startDate),
                        isAfterToDay: now < startDate
                    });

                    startDate.setDate(startDate.getDate() + 1);
                    // if (startDate.toDateString() == endDate.toDateString()) {
                    //   isFinal = true
                    //   break
                    // }
                }
                calendar.push(week);
                // if (isFinal) break
            }
            // If the last column does not belong to that month, delete it.
            calendar.map((item, index) => {
                let _isCurMonth = [];
                item.map((obj, i) => {
                    if (obj.isCurMonth) _isCurMonth.push(obj);
                });
                if (!_isCurMonth.length) calendar.splice(index, 1);
            });
            for (let i = 0; i < calendar.length; i++ ) {
                for (let j = 0; j < calendar[i].length; j++) {
                    if (eventIndex < this.events.length && calendar[i][j].isCurMonth) {
                        calendar[i][j].attendanceShiftVO = this.events[eventIndex].attendanceShiftVO;
                        eventIndex++;
                    }
                }
            }
            return calendar;
        },
        slotEvents(date) {
           
            // find all events start from this date
            let thisDayEvents = this.events.filter(day => {
                // let dt = new Date(dateFunc.format(day.start, 'yyyy-MM-dd'));
                // let st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
                // let ed = day.end ? new Date(dateFunc.format(day.start, 'yyyy-MM-dd')) : st;
                return this.$dayjs(date).format('YYYY-MM-DD') === this.$dayjs.tz(day.attendanceDate, 'Asia/Shanghai').format('YYYY-MM-DD');
            });
            // sort by duration
            thisDayEvents.sort((a, b) => {
                if (!a.cellIndex) return 1;
                if (!b.cellIndex) return -1;
                return a.cellIndex - b.cellIndex;
            });
            // mark cellIndex and place holder
            for (let i = 0; i < thisDayEvents.length; i++) {
                thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
                thisDayEvents[i].isShow = true;
                if (thisDayEvents[i].cellIndex === i + 1 || i > 2) continue;
                thisDayEvents.splice(i, 0, {
                    title: 'holder',
                    cellIndex: i + 1,
                    start: this.$dayjs.tz(date, 'Asia/Shanghai').format('YYYY-MM-DD'),
                    end:  this.$dayjs.tz(date, 'Asia/Shanghai').format('YYYY-MM-DD'),
                    isShow: false
                });
            }
            return thisDayEvents;
        },
        isStart(eventDate, date) {
            let st = new Date(dateFunc.format(eventDate, 'yyyy-MM-dd'));
            return st.toDateString() === date.toDateString();
        },
        isEnd(eventDate, date) {
            let ed = new Date(dateFunc.format(eventDate, 'yyyy-MM-dd'));
            return ed.toDateString() === date.toDateString();
        },
        selectThisDay(day, jsEvent) {
            this.selectDay = day;
            this.showMore = true;
            this.morePos = this.computePos(event.target);
            this.morePos.top -= 100;
            let events = day.events.filter(item => {
                return item.isShow === true;
            });
            this.$emit('moreclick', day.date, events, jsEvent);
        },
        computePos(target) {
            let eventRect = target.getBoundingClientRect();
            let pageRect = this.$refs.dates.getBoundingClientRect();
            return {
                left: eventRect.left - pageRect.left,
                top: eventRect.top + eventRect.height - pageRect.top
            };
        },
        getTagClass(event, flag) {
            let str = '';

            if (this.isNotEvent) return;

            // if (event.personApplyFormList && event.personApplyFormList.length) {
            //     event.personApplyFormList.forEach(n => {
            //         if (n.attendanceStatus == flag) {
            //             str = "no-appeal";
            //         }
            //     });
            // }
            if (str) {
                return str;
            }
            if ((event.appealFlag == 1 && !this.banEvent) || flag === 2) {
                str = 'pointer';
            } else {
                str = 'no-appeal';
            }
            return str;
        },
        dayClick(day, jsEvent) {
            this.$emit('dayclick', day, jsEvent);
        },
        eventClick(event, jsEvent, flag) {
            let str = '';
            // if (event.personApplyFormList && event.personApplyFormList.length) {
            //     event.personApplyFormList.forEach(n => {
            //         if (n.attendanceStatus == flag) {
            //             str = "no-appeal";
            //         }
            //     });
            // }
            if (str) {
                return;
            }
            if (event.appealFlag == 0 || this.banEvent) {
                return;
            }
            jsEvent.stopPropagation();
            let pos = this.computePos(jsEvent.target);
            this.$emit('eventclick', event, jsEvent, flag, pos);
        },
        onEvent(event, day, $event, flag) {
            // flag: 0:上午
            // flag: 1:下午
            // flag: 2:请假
            if (this.isNotEvent || event.appealFlag == 0) return;
            if (!flag && (event.data.startWorkStatus === 4 || event.data.startWorkStatus === 2)) return;
            if (flag && (event.data.endWorkStatus === 4 || event.data.endWorkStatus === 2)) return;

            if (!flag) {
                if (
                    event.data.startApplyStatus !== '' &&
                    event.data.startApplyStatus !== undefined &&
                    event.data.startApplyStatus !== null &&
                    event.data.startApplyStatus !== 2
                ) {
                    this.$toast({
                        content: ['审批中', '已通过审批'][event.data.startApplyStatus],
                        type: 'warning'
                    });
                } else {
                    this.eventIsDay ? this.dayClick(day, $event) : this.eventClick(event, $event, flag);
                }
            } else {
                if (
                    event.data.endApplyStatus !== '' &&
                    event.data.endApplyStatus !== undefined &&
                    event.data.endApplyStatus !== null &&
                    event.data.endApplyStatus !== 2
                ) {
                    this.$toast({
                        content: ['审批中', '已通过审批'][event.data.endApplyStatus],
                        type: 'warning'
                    });
                } else {
                    this.eventIsDay ? this.dayClick(day, $event) : this.eventClick(event, $event, flag);
                }
            }
        },
        getQueryType(appealType, leaveType) {
            if (appealType === 3 || appealType === 4) {
                return 'appeal';
            } else if (leaveType === 12 || leaveType === 13 || leaveType === 20) {
                return 'publicout';
            } else {
                return '';
            }
        },
        onApplyEvent(event, day, apply) {
            const query = {
                id: apply.encryptId,
                target: this.currentPath
            };
            if(this.$route.query.id) {
                query.from = 'detail';
            }
            this.$router.push({
                // path: '/dashboard/attendance/application-detail',
                path: '/dashboard/attendance/approval-progress-detail',
                query
            });
        },
        // 获取下拉列表数据
        async getDictInfo() {
            try {
                const { success, root } = await _batchGetDictInfo({
                    typeList: Object.keys(this.dictInfo),
                    enable: 2
                });
                if(!success) return;
                this.dictInfo = root || {};
            } catch (error) {
                console.log(error);
            }
           
        }
    }
};
</script>
