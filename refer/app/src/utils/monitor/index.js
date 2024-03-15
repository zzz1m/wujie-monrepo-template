import Vue from 'vue';
import errorStackParser from './error-stack-parser';
import { magpieConfig } from '../magpie';
import magpie from 'magpie-monitor';
let {Woodpecker, wdCustomSend, filterData}= magpie;

if (magpieConfig.isOnline) {
    Woodpecker({
        appKey: magpieConfig.appKey,
        jsErrorList: magpieConfig.jsErrorArray,
        recordClickPath:true
    });
    // 错误埋点
    Vue.config.errorHandler = function(err, vm, info) {
        console.error(err);
        const userInfo = vm?.$store?.state?.userInfo || {};
        try{
            let errorStack = errorStackParser.parse(err);
            let errorRes = {};
            if (errorStack && Array.isArray(errorStack) && errorStack.length) {
                errorRes = errorStack[0];
            }
            if (errorRes.lineNumber && userInfo.id && !filterData(magpieConfig.filterTextArray, `Error: ${err.toString()}`)) {
                if (magpieConfig.isOnline) {
                    wdCustomSend({
                        platform: magpieConfig.platform,
                        row: errorRes.lineNumber,
                        column: errorRes.columnNumber,
                        url: errorRes.fileName,
                        appKey: magpieConfig.appKey,
                        openId: userInfo.id,
                        userId: userInfo.userId,
                        errorType: magpieConfig.type.jsError,
                        json: `info: ${err.stack.toString().substr(0, 800)}, infonew: ${err.toString()}`,
                        errorCode: `Error: ${err.toString()},Info: ${info}`
                    });
                }
            }
        }catch(error){
            console.log(error);
        }
    };
}