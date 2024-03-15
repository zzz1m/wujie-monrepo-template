import { throttle } from '@/utils/common';

export const getType = function( value ){
    const type = Object.prototype.toString.call( value );
    return type.slice(8,-1).toLowerCase();
};

export const extend = function(target, ...source){
    return Object.assign(target, ...source);
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

// 去重
export function unique ( value ) {
    const type = getType( value );
    if(!['array', 'string'].includes(type)) return value;

    const result = [ ...new Set( value ) ];
    return type === 'array' ? result : result.join('');
}
// 数组并集
export function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}
// 数组交集
export function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item) );
}
// 数组差集
export function difference(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item) );
}

// 交换任意2个索引的数据
export function exchange(arr, startIdx, targetIdx) {
    const maxIdx = arr.length-1;
    if(startIdx < 0 || targetIdx < 0 || startIdx > maxIdx || targetIdx > maxIdx) return arr;
    let tmp;
    tmp = arr[startIdx];
    arr[startIdx] = arr[targetIdx];
    arr[targetIdx] = tmp;
    return arr;
} 




export function handleScroll() {
    const elm = document.getElementsByClassName('page-content')[0];
    const height = elm.clientHeight;
    let scrollBase = 0;
    let d = -1;
    const roll = (dist) => {
        scrollBase += dist;
        elm.scrollTop =  scrollBase;
    };
    const handler = throttle((evt) => {
        if(evt.clientY < 230) {
            d !== 1 && (d = 1) && (scrollBase = elm.scrollTop);

            roll(-20);
        } else if(evt.clientY > height - 180) {
            d !== 2 && (d = 2) && (scrollBase = elm.scrollTop);
            roll(20);
        } else {
            d = -1;
        }
    }, 10);
    const handleScrollStart = () => {
        document.addEventListener('dragover', handler, true);
    };
    const handleScrollEnd = () => {
        document.removeEventListener('dragover', handler, true);

    };
    return {
        handleScrollStart,
        handleScrollEnd
    };
}