import axios from 'axios';
import Vue from 'vue';
import store from '@/store/index';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const WIN= window;
const UA = WIN.navigator.userAgent;

export function noop() {
};

export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
    for (let key in _from) {
        to[key] = _from[key];
    }
    return to;
};

export function toObject(arr) {
    var res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
};

export const getValueByPath = function (object, prop) {
    prop = prop || '';
    const paths = prop.split('.');
    let current = object;
    let result = null;
    for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i];
        if (!current) break;

        if (i === j - 1) {
            result = current[path];
            break;
        }
        current = current[path];
    }
    return result;
};

export function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    let keyArr = path.split('.');
    let i = 0;
    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        let key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        } else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
    };
};

export const generateId = function () {
    return Math.floor(Math.random() * 10000);
};

export const valueEquals = (a, b) => {
    // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    if (a === b) return true;
    if (!(a instanceof Array)) return false;
    if (!(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i !== a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

// 根据数组中某对象的某属性值查找数组中是否包含某元素
export const findElem = function (arr, attr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][attr] === val) return i;
    }
    return -1;
};


export default function (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};

/**
 * 将obj格式化成FormData
 * @param obj
 */
export function formatFormData(obj) {
    let params = new FormData();
    for (let k in obj) {
        params.append(k, obj[k]);
    }
    return params;
}


/*获取文本的长度，2个英文算一个长度*/
export function zhLength(str) {
    str = str.replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, '');
    var realLength = 0,
        len = str.length,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode > 255) {
            // 大于255的包括中文字、全角符号、特殊字
            realLength += 1;
        } else {
            realLength += 0.5;
        }
    }
    return Math.ceil(realLength);
}


//下载文件
export const  download_file = function(downUrl,callback) {
    let iframe = document.getElementById('download_iframe');
    const origin = window.location.origin;
    if( !iframe ){
        iframe = document.createElement('iframe');
        iframe.id = 'download_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.onload = function(){
            callback && callback(); 
        };
    }
    iframe.src = origin + downUrl;
    // let timer = setInterval(function () {
    //     let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    //     // Check if loading is complete
    //     if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
    //         clearInterval(timer);
    //         callback();
    //         return;
    //     }
    // }, 1000);
};

// 计算星座
export const computeAstro = function(month, day){  
    var s = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯';
    var arr = [20,19,21,21,21,22,23,23,23,23,22,22];
    return s.substr(month * 2-(day < arr[month-1] ? 2 : 0), 2);
};


/**
* object: 对象
* path: 输入的路径
* defaultVal: 默认值
**/
 
export const _get = function(object, path, defaultVal = undefined) {
    // 先将path处理成统一格式
    let newPath = [];
    if (Array.isArray(path)) {
        newPath = path;
    } else {
        // 先将字符串中的'['、']'去除替换为'.'，split分割成数组形式
        newPath = path.replace(/\[/g,'.').replace(/\]/g,'').split('.');
    }
    // 递归处理，返回最后结果
    return newPath.reduce((o, k) => {
        return (o || {})[k];
    }, object) || defaultVal;   
};

/**
 * @description 包装Promise函数工厂处理只让最后一次请求返回数据
 * @param {Promise} func 
 * @returns Promise
 */
export const agentWarper = function(func) {
    let num = 0;
    return function(...res) {
        num++;
        let currentNum = num;
        return new Promise(resolve => {
            func(...res).then(result => {
                if (currentNum === num) {
                    resolve(result);
                }
            });
        }).catch(e => {
            throw e;
        });
    };
};

/**
* object: 对象
* path: 输入的路径
* defaultVal: 默认值
**/
export const _getValue = function(object, path, defaultVal = undefined) {
    // 先将path处理成统一格式
    let newPath = [];
    if (Array.isArray(path)) {
        newPath = path;
    } else {
        // 先将字符串中的'['、']'去除替换为'.'，split分割成数组形式
        newPath = path.replace(/\[/g,'.').replace(/\]/g,'').split('.');
    }
    // 递归处理，返回最后结果
    let value = newPath.reduce((o, k) => {
        return (o || {})[k];
    }, object);
    return  [null, undefined].includes(value) ? defaultVal : value;
};

// 阿拉伯数字转大写
export const arabToChinese = function(Num) {
    if ([null, undefined, ''].includes(Num)) {
        return '';
    }
    for (let i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(',', '');  //替换Num中的“,”
        Num = Num.replace(' ', '');  //替换Num中的空格
    }    
    if (isNaN(Num)) { //验证输入的字符是否为数字
        return '';
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split('.');
    var newChar = '';
    //小数点前进行转化
    for (let i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            //alert("位数过大，无法计算");
            return '';
        }//若数量超过拾亿单位，提示
        var tmpNewChar = '';
        var perChar = part[0].charAt(i);
        switch (perChar) {
            case '0': tmpNewChar = '零' + tmpNewChar;break;
            case '1': tmpNewChar = '一' + tmpNewChar; break;
            case '2': tmpNewChar = '二' + tmpNewChar; break;
            case '3': tmpNewChar = '三' + tmpNewChar; break;
            case '4': tmpNewChar = '四' + tmpNewChar; break;
            case '5': tmpNewChar = '五' + tmpNewChar; break;
            case '6': tmpNewChar = '六' + tmpNewChar; break;
            case '7': tmpNewChar = '七' + tmpNewChar; break;
            case '8': tmpNewChar = '八' + tmpNewChar; break;
            case '9': tmpNewChar = '九' + tmpNewChar; break;
        }
        switch (part[0].length - i - 1) {
            case 0: tmpNewChar = tmpNewChar; break;
            case 1: if (perChar != 0) tmpNewChar = tmpNewChar + '十'; break;
            case 2: if (perChar != 0) tmpNewChar = tmpNewChar + '百'; break;
            case 3: if (perChar != 0) tmpNewChar = tmpNewChar + '千'; break;
            case 4: tmpNewChar = tmpNewChar + '万'; break;
            case 5: if (perChar != 0) tmpNewChar = tmpNewChar + '十'; break;
            case 6: if (perChar != 0) tmpNewChar = tmpNewChar + '百'; break;
            case 7: if (perChar != 0) tmpNewChar = tmpNewChar + '千'; break;
            case 8: tmpNewChar = tmpNewChar + '亿'; break;
            case 9: tmpNewChar = tmpNewChar + '十'; break;
        }
        newChar = tmpNewChar + newChar;
    }   
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newChar.search('零零') != -1 || newChar.search('零亿') != -1 || newChar.search('亿万') != -1 || newChar.search('零万') != -1) {
        newChar = newChar.replace('零亿', '亿');
        newChar = newChar.replace('亿万', '亿');
        newChar = newChar.replace('零万', '万');
        newChar = newChar.replace('零零', '零');      
    }
    //替换以“一十”开头的，为“十”
    if (newChar.indexOf('一十') == 0) {
        newChar = newChar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newChar.lastIndexOf('零') == newChar.length - 1) {
        newChar = newChar.substr(0, newChar.length - 1);
    }
    return newChar;
};

/**
 * @description 通过code获取列表name
 * @param {String} code  code 
 * @param {Array} options 列表
 * @param {String} defaultValue 默认值
 * @param {Object} param3 
 * @param {Object} param3.codeKey  字典code key
 * @param {Object} param3.labelKey 字典label key
 * @returns {String}
 */
export const getNameByCode = function(code, options = [], defaultValue = '', {
    codeKey = 'dictCode',
    labelKey = 'dictName'
} = {}) {
    const selectItem = options.find(item => {
        return String(item[codeKey]) === String(code);
    });
    return selectItem ? selectItem[labelKey] : defaultValue;
};

// 判断是否为空值
export const isNull = function(value) {
    return [null, undefined, ''].includes(value);
};

/**
 * @description 计算table所有行中 操作列的最大宽度
 * @param {String} parent table的选择器
 * @param {String} cell 操作列选择器
 * @returns 宽度
 */
export const reCalc = function(parent, cell) {
    try{
        parent = parent || '.re-calc-table';
        cell = cell || '.re-calc-cell';
        var $table = document.querySelector( parent );
        var $cell = $table.querySelectorAll( cell );
        const cellWidth = Array.from($cell).reduce((cur, next) => {
            next.parentNode.style.display = 'inline-block';
            next.parentNode.style.whiteSpace = 'nowrap';
            return Math.max( cur, next.offsetWidth );
        }, 0);
        return cellWidth + 50;
    }catch(err){
        return 100;
    }
};

/**
 * @description 用于处理dom报错之后需要滚动到的位置
 * @param {Boolean} animation 是否开启动画效果 默认不开
 * @param {String} selector 报错dom对象选择器
 * @returns 
 */
export const scrollToFormError = function (animation, selector = '.form-item-error') {
    let errorEl = document.querySelector(selector);
    if (!errorEl) {
        return;
    }
    errorEl.scrollIntoView({
        block: 'start', 
        behavior: animation ? 'smooth' : 'auto'}
    );
};

// 处理图片路径
export const getImgPreviewPath = (str) => {
    if(str && str.indexOf('||') > -1) {
        const url = str.split('||')[1];
        const prefix = '/api/common/file/preview.json?ossPath=';
        return prefix +  url;
    }
    console.error('不合法的路径');
    return '';
};
// 处理图片路径
export const getImgDownloadPath = (str) => {
    if(str && str.indexOf('||') > -1) {
        const url = str.split('||')[1];
        const prefix = '/api/common/file/download/';
        return prefix +  url;
    }
    console.error('不合法的路径');
    return '';
};
// 判断是不是safari浏览器
export const isSafari = function() {
    return (/Safari/.test(UA) && !/Chrome/.test(UA));
};
// 判断是不是手机浏览器
export const isMobile = function() {
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(UA);
};

// 判断是不是网址链接
export const isHref = function(href) {
    return  /(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(href);
};

/**
 * @description 下载方法
 * @param {String} url 下载地址
 * @param {Function} cb 回调方法
 */
export const downLoad = function(url, cb, target) {
    let a = document.createElement('a');
    let event = new MouseEvent('click');
    a.href = url;
    if (target) { 
        a.target = target;
    }
    a.dispatchEvent(event);
    a = null;
    cb && cb();
};

// 字符串下划线转驼峰
export const formatToHump = (value) => {
    return value.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase());
};
  
// 字符串驼峰转下划线
export const formatToLine = (value) => {
    return value.replace(/([A-Z])/g, '_$1').toLowerCase();
};
  

/*串联加载脚本，用于本地开发加载文件*/
export const seriesLoadScripts = function(scripts, callback) {
    if(typeof(scripts) !== 'object') scripts = [scripts];
    var HEAD = document.getElementsByTagName('head').item(0) || document.documentElement;
    var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) {
        s[i] = document.createElement('script');
        s[i].setAttribute('type', 'text/javascript');
        s[i].onload = s[i].onreadystatechange = function() {
            if(!/*@cc_on!@*/0 || this.readyState == 'loaded' || this.readyState == 'complete') {
                this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                if(i != last) recursiveLoad(i + 1); else if(typeof(callback) === 'function') callback();
            }
        };
        s[i].setAttribute('src',scripts[i]);
        HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
};

export const set16ToRgb = function(str,a=1){
    var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    if(!reg.test(str)){return;}
    let newStr = (str.toLowerCase()).replace(/\#/g,'');
    let len = newStr.length;
    if(len == 3){
        let t = '';
        for(let i=0;i<len;i++){
            t += newStr.slice(i,i+1).concat(newStr.slice(i,i+1));
        }
        newStr = t;
    }
    let arr = []; //将字符串分隔，两个两个的分隔
    for(let i =0;i<6;i=i+2){
        let s = newStr.slice(i,i+2);
        arr.push(parseInt('0x' + s));
    }
    return `rgba(${arr.join(',')},${a})`;
};

/***
 * @description 给对象的特定某个key赋值
 * @param {Object} obj 对象
 * @param {String | Array} keys 对象赋值链路
 * @param {Any} value 赋的值
 */
export const _setValue = function(obj, keys, value){ 
    let currentObj = obj;
    let keyArr = [];
    if (Array.isArray(keys)) {
        keyArr = keys;
    } else {
        // 先将字符串中的'['、']'去除替换为'.'，split分割成数组形式
        keyArr = keys.replace(/\[/g,'.').replace(/\]/g,'').split('.');
    }

    for(let i = 0; i < keyArr.length; i++) {
        if (i < keyArr.length - 1) {
            currentObj = currentObj[keyArr[i]];
        } else {
            currentObj[keyArr[i]] = value;
        }
    }
};
/**
 * @description: 数据扁平化处理
 * @param {Array} arr 要处理的数组
 * @param {String} key 唯一标识
 * @param {String} childrenKey 子项 code
 */
export const _keyBy = function(arr, key, childrenKey) {
    let keyMap = {};
    function getKeyObj(arr) {
        arr.forEach(item => {
            keyMap[item[key]] = item;
            if (item[childrenKey]?.length) {
                getKeyObj(item[childrenKey]);
            }
        });
    }
    getKeyObj(arr);
    return keyMap;
};

export const guid = (pre = 'code_') => {
    return pre + getUid();
    function getUid () {
        return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, 
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
};

export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

//isEqual：判断两个对象是否键值对应相等
export const isEqual = function(a,b){
    //如果a和b本来就全等
    if(a===b){
        //判断是否为0和-0
        return a !== 0 || 1/a ===1/b;
    }
    //判断是否为null和undefined
    if(a==null||b==null){
        return a===b;
    }
    //接下来判断a和b的数据类型
    var classNameA=Object.prototype.toString.call(a),
        classNameB=Object.prototype.toString.call(b);
    //如果数据类型不相等，则返回false
    if(classNameA !== classNameB){
        return false;
    }

    //如果数据类型相等，再根据不同数据类型分别判断
    switch(classNameA){
        case '[object RegExp]':
        case '[object String]':
            //进行字符串转换比较
            return '' + a ==='' + b;
        case '[object Number]':
            //进行数字转换比较,判断是否为NaN
            if(+a !== +a){
                return +b !== +b;
            }
            //判断是否为0或-0
            return +a === 0?1/ +a === 1/b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }
    //如果是对象类型
    if(classNameA == '[object Object]'){
        //获取a和b的属性长度
        var propsA = Object.getOwnPropertyNames(a),
            propsB = Object.getOwnPropertyNames(b);
        if(propsA.length != propsB.length){
            return false;
        }
        for(var i=0;i<propsA.length;i++){
            var propName=propsA[i];
            //如果对应属性对应值不相等，则返回false
            if(a[propName] !== b[propName]){
                return false;
            }
        }
        return true;
    }
    //如果是数组类型
    if(classNameA == '[object Array]'){
        if(a.toString() == b.toString()){
            return true;
        }
        return false;
    }
};
//last 获取数组最后一个元素
export const _last = function (array) {
    //   获取数组长度
    var length = isNull(array) ? 0 : array.length;
    // 长度存在 = 数组有内容  》》》 返回最后一个参数
    // 不存在说明数组本身为空或者其他，返回undefined
    return length ? array[length - 1] : undefined;
};
// 文案拼接
export const concatText = function(val, label='', split=' · ') {
    if( Array.isArray(val) ){
        return val.map(item => {
            return this.concatText( item.val, item.label, split );
        }).filter(Boolean).join(split);
    }
    return val ? val + label : '';
};


export const downloadFile = async function(url, data, config = {
    method: 'POST',
    defaultFileName: '',
    headers: {}
}) {
    try {
        store.commit('updateLoading', true);
        const response = await axios({
            url,
            data,
            method: config.method,
            responseType: 'blob',
            headers: config.headers
        });
        if (response.data?.type === 'application/json') {
            let reader = new FileReader(); // 创建读取文件对象
            reader.readAsText(response.data, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
            reader.addEventListener('loadend', () => { // 
                let res = JSON.parse(reader.result); // 返回的数据
                if (res.code === 50001) {
                    store.commit('updateShowCheckedDialog', true);
                    return data;
                } else if (res.success === false) {
                    Vue.prototype.$toast(res.message || '下载失败', 'error');
                    return;
                }
            });
        } else {
            let fileName = decodeURI(response.headers['content-disposition']?.split('filename=')[1]?.replace(/\"/g, ''));
            if (response.data.success === false) {
                const content = data.message || data.ms;
                Vue.prototype.$toast(content || '下载失败', 'error');
                return;
            }
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', `${fileName || config.defaultFileName || +new Date() }`);
            document.body.appendChild(fileLink);
            fileLink.click();
            document.body.removeChild(fileLink);

        }

    } catch (error) {
        console.log(error);
        // Vue.prototype.$toast('下载失败','warning');
    } finally {
        store.commit('updateLoading', false);
    }
};

export const asyncSubmit = function(config) {
    const {title = '温馨提示', msg = '您确定提交吗'} = config;
    return new Promise((resolve, reject) => {
        Vue.prototype.$dialog({
            title: '温馨提示',
            content: msg,
            type: 'warning',
            onConfirm: () => {
                resolve(true);
            },
            onCancel() {
                resolve(false);
            },
            onClose: () =>{
                resolve(false);
            },
            onLayer: () =>{
                resolve(false);
            }
        });
    });
}