import CryptoJS from 'crypto-js';


export const isOnline = ['noah.kanzhun-inc.com', 'noah-pre.kanzhun-inc.com', 'noah-web.kanzhun-inc.com', 'noah-web-pre.kanzhun-inc.com'].includes(location.host) ?  true : false; // 判断是否是线上环境

// @node 手动调用encodeBase64 做下加密处理增加获取真实秘钥成本 线上: D1R61Ctj2i3pepyDFVUz9GO9gaJnE2vs  线下秘钥: xBNJiNrSdYegSp0W6w4P1Tf3A7asavnK  向量:  hFAQ623Ycu7i3Jkf
const base64Key = isOnline ? 'RDFSNjFDdGoyaTNwZXB5REZWVXo5R085Z2FKbkUydnM=' : 'eEJOSmlOclNkWWVnU3AwVzZ3NFAxVGYzQTdhc2F2bks=';
const base64Iv =  'aEZBUTYyM1ljdTdpM0prZg==';

//密钥
const key = CryptoJS.enc.Utf8.parse(decodeBase64(base64Key));
//加密向量
const iv = CryptoJS.enc.Utf8.parse(decodeBase64(base64Iv));

/**
 * @description: 
 * @param {String | Object} word 要加密的字符串 或者 对象
 * @return {String} 加密之后的字符串
 */
export const encrypt = function(word) {
    let encryptStr = typeof word === 'object' ? JSON.stringify(word) : word;
    let ciphertext =  CryptoJS.AES.encrypt(encryptStr, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    return ciphertext;
};

/**
 * @description: 
 * @param {String} ciphertext  要解密的字符串
 * @param {Boolean} isText 是不是输出字符串 默认转json
 * @return {String | Object}  解密后的数据
 */
export const decrypt = function(ciphertext, isText) {
    try {
        let bytes  = CryptoJS.AES.decrypt(ciphertext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedData = isText ? bytes.toString(CryptoJS.enc.Utf8) : JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.log('解密失败: ', error);
        return isText ? '' : {};
    }
};

// Base64加密
function encodeBase64(str) {
    let wordArray = CryptoJS.enc.Utf8.parse(str);
    return CryptoJS.enc.Base64.stringify(wordArray);
}

// Base64解密
function decodeBase64(str) {
    let parsedWordArray = CryptoJS.enc.Base64.parse(str);
    return parsedWordArray.toString(CryptoJS.enc.Utf8);
}