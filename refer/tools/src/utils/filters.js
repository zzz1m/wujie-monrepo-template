const addZero = (val) => {
  if (val < 10) {
    return '0' + val;
  } else {
    return val;
  }
};
/**
 * 日期时间格式化
 * @param {Date} value
 * @param {String} type : 'YMD'/'YMDHMS'/'HMS'/'YM'
 * @split {String} split : '-'
 */
export const formatTime = (value, type, _split) => {
  var dataTime = '';
  var split = _split || '-';
  if (value) {
    var data = new Date();
    data.setTime(value);
    var year = data.getFullYear();
    var month = addZero(data.getMonth() + 1);
    var day = addZero(data.getDate());
    var hour = addZero(data.getHours());
    var minute = addZero(data.getMinutes());
    var second = addZero(data.getSeconds());
    if (type == 'YMD') {
      dataTime = year + split + month + split + day;
    } else if (type == 'YMDHMS') {
      dataTime = year + split + month + split + day + ' ' + hour + ':' + minute + ':' + second;
    } else if (type == 'YMDHM') {
      dataTime = year + split + month + split + day + ' ' + hour + ':' + minute;
    } else if (type == 'MDHM') {
      dataTime = month + split + day + ' ' + hour + ':' + minute;
    } else if (type == 'HMS') {
      dataTime = hour + ':' + minute + ':' + second;
    } else if (type == 'YM') {
      dataTime = year + split + month;
    } else {
      dataTime = year + split + month + split + day;
    }
  }
  return dataTime;
};


/**
 * 将日期类型的字符串转化为Date类型（2019-11-29 18:13:14）
 * replace(/-/g, '/') 兼容Safari
 * @param dateStr
 * @returns {Date}
 * @constructor
 */
export const _newDate = (dateStr) => {
  let dateObj = new Date();
  if(dateStr) {
    dateObj = new Date(dateStr.replace(/-/g, '/'));
  }
  return dateObj;
};


export const htmlToText = (str) => {
  if (!str) {
    return '';
  }
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'')
    .replace(/<[^>]+?>/g,'').replace(/\s+/g,' ')
    .replace(/ /g,' ').replace(/>/g,' ').replace(/&nbsp;/g, '').replace(/&amp;/g, '&').replace(/&mdash;/g, '—');
};

export const placeholder = function(val, placeholder = '--') {
  return !val ? placeholder : val;
};

export const numFormat = (val, placeholder = '-') => {
  var rule = /\B(?=(?:\d{3})+(?!\d))/g;
  var result = null;
  if(val !== '' && val !== null){
    result = val.toString().replace(rule, ',');
  }
  return (val === '' || val === null) ?  placeholder : result;
};

export const timeFormat = (val, placeholder = '-') => {
  let result = null;
  if(!['', null, undefined].includes(val)){
    result = Math.floor(val / 60) > 0 ? `${Math.floor(val / 60)}小时${val % 60}分钟` : `${val % 60}分钟`;
  }
  return ['', null, undefined].includes(val) ?  placeholder : result;
};
