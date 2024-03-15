// 接口文档 https://hi.zhipin.com/open/#%E7%BD%91%E9%A1%B5%E8%B7%B3%E8%BD%AC%E6%89%93%E5%BC%80bosshi%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%81%8A%E5%A4%A9
// 最新接口文档  https://wiki.kanzhun-inc.com/display/PX/bossHi+web+sdk
// 调用方式 
// sendMessageByUserCard支持两个参数：
// - <Array>userCardList - BossHi 用户信息数组
// - <Boolean> - PC端是否hover出现用户卡片进行跳转
// BossHi.sendMessageByUserCard([{
//     domId: 'bosshi-name', // 拥有data-id=xxx 属性的DOM，这里需要将xxx放这里
//     avatar: "", // 头像
//     email: this.cardParams.email, //邮箱
//     name: "随机名字", // 用户名
//     hiAppId: this.cardParams.hiAppId // "业务方接入bossHi申请的hiAppId"
// },{
//     domId: 'bosshi-name2',
//     avatar: "",
//     email: this.cardParams.email,
//     name: "随机名字2",
//     hiAppId: this.cardParams.hiAppId
// }], false)

const isOnline = ['noah.kanzhun-inc.com', 'noah-pre.kanzhun-inc.com', 'noah-web.kanzhun-inc.com', 'noah-web-pre.kanzhun-inc.com'].includes(location.host) ?  true : false; // 判断是否是线上环境

import { setConfig } from '@hi/bosshi-jssdk';

export function initBossHiConfig() {
    setConfig({
        env: isOnline ? 'prod' : 'qa', // 切换sdk 环境，目前有qa 或 prod
        debug: true // 调用 SDK 方法，是否要在控制台打印相关传参，方便调试
    });
}
const APP_ID_QA = 'uOdwRAec';
const APP_ID_PROD = '7Awt41Z1';

export const hiAppId = isOnline ? APP_ID_PROD : APP_ID_QA;