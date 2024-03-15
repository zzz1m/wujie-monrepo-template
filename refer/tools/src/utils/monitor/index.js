import Vue from 'vue';
import errorStackParser from './error-stack-parser';
import magpie from 'magpie-monitor';
let {Woodpecker, wdCustomSend, filterData}= magpie;

const isOnline = location.host === 'noah.kanzhun-inc.com' ? true : false; // 判断是否是线上环境
export const magpieConfig = {
  appKey: isOnline ? 'db4388b14a5ea55da1401' : 'ed8d1b9d40a89f30ba721',
  type: {
    jsError: 'jsError',
    codeError: 'codeError',
    performance: 'performance',
    httpCatchError: 'httpCatchError',
    resource404: 'resource404',
    router404: '404',
    collectData: 'collectData'
  },
  isOnline,
  platform: 'noah-pc',
  filterTextArray: [
    'Error: Network Error',
    'Script error',
    'Error: 尚未实现',
    'Error: ERR_REDIRECT',
    'Error: Request failed',
    'Error: Request aborted',
    'Error: 未指明的错误'
  ],
  jsErrorArray: ['Error: Request failed with status code'],
  sceneType: {
    noPermissions: 'c5f7765021a49934581e66b632334f01' // 无权限
  }
};

export const magpieInit = function () {
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
};
