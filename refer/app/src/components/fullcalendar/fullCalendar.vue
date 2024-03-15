<template>
    <div class="comp-full-calendar">
        <!-- header pick month -->
        <fc-header v-if="!hiddenHeader" :current-date="currentDate" :title-format="titleFormat" :staffName="staffName" :first-day="firstDay" :month-names="monthNames"
            :islast="last" :isMinMonth="isMinMonth" @change="emitChangeMonth">
            <div slot="header-left">
                <slot name="fc-header-left"></slot>
            </div>

            <template slot="header-right">
                <slot name="fc-header-right"></slot>
            </template>
        </fc-header>
        <!-- body display date day and events -->
        <fc-body :current-date="currentDate" :events="events" :month-names="monthNames" :week-names="weekNames" :first-day="firstDay" :eventIsDay="eventIsDay"
            :isNotEvent="isNotEvent" :banEvent="banEvent" @eventclick="emitEventClick" @dayclick="emitDayClick" @moreclick="emitMoreClick">
            <div slot="body-card">
                <slot name="fc-body-card"></slot>
            </div>
        </fc-body>
    </div>
</template>
<script>
import Header from './header';
import Body from './body';
import langSets from './dataMap/langSets';

export default {
    props: {
        events: {
            // events will be displayed on calendar
            type: Array,
            default: () => []
        },
        lang: {
            type: String,
            default: 'en'
        },
        firstDay: {
            type: Number | String,
            validator(val) {
                let res = parseInt(val);
                return res >= 0 && res <= 6;
            },
            default: 0
        },
        titleFormat: {
            type: String,
            default() {
                return langSets[this.lang].titleFormat;
            }
        },
        staffName: {
            type: String,
            default() {
                return '';
            }
        },
        monthNames: {
            type: Array,
            default() {
                return langSets[this.lang].monthNames;
            }
        },
        last: {
            type: Boolean,
            default() {
                return false;
            }
        },
        weekNames: {
            type: Array,
            default() {
                let arr = langSets[this.lang].weekNames;
                return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay));
            }
        },
        nowDate: {
            type: [Date, String],
            default() {
                return new Date();
            }
        },
        isMinMonth: {
            type: Boolean,
            default() {
                return false;
            }
        },
        eventIsDay: {
            type: Boolean,
            default() {
                return false;
            }
        },
        isNotEvent: {
            type: Boolean,
            default() {
                return false;
            }
        },
        banEvent: {
            type: Boolean,
            default() {
                return false;
            }
        },
        hiddenHeader: Boolean
    },
    data() {
        return {
            currentDate: new Date()
        };
    },
    mounted() {
        let _date = '';
        if (this.$route.query.month) _date = this.$route.query.month.split('-');
        this.currentDate = _date ? new Date(_date[0], _date[1] - 1) : this.nowDate;
    },
    methods: {
        emitChangeMonth(start, end, currentStart, current) {
            this.currentDate = current;
            this.$emit('changeMonth', start, end, currentStart);
        },
        emitEventClick(event, jsEvent, flag) {
            this.$emit('eventClick', event, jsEvent, flag);
        },
        emitDayClick(day, jsEvent) {
            this.$emit('dayClick', day, jsEvent);
        },
        emitMoreClick(day, events, jsEvent) {
            this.$emit('moreClick', day, event, jsEvent);
        }
    },
    components: {
        'fc-body': Body,
        'fc-header': Header
    }
};
</script>
<style>
</style>
