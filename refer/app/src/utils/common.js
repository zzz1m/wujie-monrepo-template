// 判断参数是否是其中之一
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

export function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

export function getStyle(element, styleName) {
    if (!element || !styleName) return null;

    try {
        const computed = getComputedStyle(element, '');
        return element.style[styleName] || (computed ? computed[styleName] : null);
    } catch (e) {
        return element.style[styleName];
    }
}

export function debounce(delay, fn) {
    var ctx;
    var args;
    var timer = null;
    var later = function () {
        fn.apply(ctx, args);
        // 当事件真正执行后，清空定时器
        timer = null;
    };
    return function () {
        ctx = this;
        args = arguments;
        // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        // 重新设置事件触发的定时器
        timer = setTimeout(later, delay);
    };
}

export function throttle(fn, wait = 300) {
    var previous = null;
    var timer = null;

    return function() {
        const now = +new Date();
        const _this = this;

        if (!previous) {
            previous = now;
        }

        clearTimeout(timer);
        if (now - previous > wait) {
            fn.apply(_this, arguments);
            previous = now;
        } else {
            timer = setTimeout(() => {
                fn.apply(_this, arguments);
            }, wait);
        }
    };
}

export const calcStrLength = function(str) {
    return str.replace(/[^\x00-\xff]/g, 'aa').length;
};

export const qs = name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
export function filterQueryParams(url, target='', options=[]) {
    target = target || [];
    if( target.length === 0 ) return url;
    target = typeof target === 'string' ? [ target ] : target;
    var query = url.split('?');
    if(query.length > 1){
        var location = query[0];
        var data = query[1];
        var group = data.split('&');
        for (var i = 0; i < group.length; i++) {
            const result = target.some(item => group[i].includes( item ));
            if( result ){
                group.splice(i,1);
                i--;
            }
        }
        if( options && options.length > 0 ){
            group = group.concat( options );
        }
        return  location+ '?' + group.join('&');
    }else{
        return url;
    }
}

// 记录目标来源
export const getTargetPath = url => {
    return url ? window.encodeURIComponent(url) : '';
};

// 图片预览
export function commonPreviewImg(imgSrc) {
    if (!imgSrc) return imgSrc;
    if (imgSrc.includes('http')) {
        return imgSrc;
    }
    return '/api/common/file/review' + imgSrc.split('||')[1];
};