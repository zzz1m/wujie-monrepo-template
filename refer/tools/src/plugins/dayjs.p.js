/**
 * 时间插件
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
export default {
  install: function(Vue, options = {}) {
    Vue.prototype.$dayjs = dayjs;
  }
};