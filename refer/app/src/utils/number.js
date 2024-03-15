
// 数字逗号分隔 123,323,445.2323
export function formatComma (num) {  
    if (num + '' === '0') { return '0'; }
    const strList = (Math.abs(num) + '').split('.');
    const list = strList[0].split('').reverse();
    let str = '';
    for(let i = 0, len = list.length; i < len; i++) {
        if(i % 3 === 0 && i !== 0) {
            str += ',' + list[i];
            continue;
        }
        str += list[i];
    }
    return (num > 0? '': '-') + str.split('').reverse().join('') + (strList[1]? '.' +strList[1]: '' );
}

export function appendZero(num, zNum) {
    const str = num + '';
    if(str.indexOf('.') === -1) return str + '.00';
    const strList = str.split('.');
    if(strList[1].length >= zNum) return num;
    const t = strList[1] + new Array((zNum - strList[1].length)).fill('0').join('');
    return `${strList[0]}.${t}`;
}