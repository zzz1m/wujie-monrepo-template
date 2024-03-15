import axios from 'axios';
import store from '@/store/index';
import md5 from 'blueimp-md5';
import Vue from 'vue';
import Storage from '@/utils/localstorage';
import { qs, filterQueryParams } from '@/utils/common';
import { decrypt } from '@/utils/crypto';
import magpie from 'magpie-monitor';
import { magpieConfig } from '@/utils/magpie';
import { iucLogin } from '@boss/utils/iuc-login';

let { wdCustomSend, requestPerformance } = magpie;
let isLogging = 0;
iucLogin.init('zhipinhr-v2');
const vue = new Vue();
const stringify = o => {
    try {
        if ([null, '', undefined].includes(o)) {
            return '';
        }
        return JSON.stringify(o);
    } catch (e) {
        return '';
    }
};

const token = qs('t_uc') || Storage.get('t_zhipinhr-v2') || '';
if (token) {
    Storage.set('t_zhipinhr-v2', token);
}

const handleResponseEnd = function (response) {   // 喜鹊性能监控
    if (magpieConfig.isOnline) {
        requestPerformance({
            appKey: magpieConfig.appKey,
            runTime: 3000,
            response
        });
    }
};

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */

const instance = axios.create({
    timeout: 3 * 60 * 1000, // 请求超时时间
    withCredentials: true // 跨域
});

// 防止重复多次提交
// 参考链接：https://www.zhihu.com/question/19805411/answers/updated?page=1
let cancel = null;
const promiseArr = {};
const CancelToken = axios.CancelToken;

instance.interceptors.request.use(
    config => {
        // 历史场景中 有同一个接口 不同组件都调用的场景 先不加
        // if( config.method === 'post' ){
        //     config.cancelToken = new CancelToken( c => {
        //         cancel = c;
        //     });
        //     const key = JSON.stringify({
        //         url: config.url,
        //         ...config.data
        //     });
        //     //发起请求时，取消掉当前正在进行的相同请求
        //     if (promiseArr[key]) {
        //         promiseArr[key]('重复请求，操作取消');
        //     }
        //     promiseArr[key] = cancel;
        // }
        if (typeof window.zhilian != 'undefined' && typeof window.zhilian.addHeaders == 'function') {
            config.headers.common = window.zhilian.addHeaders(config.headers.common);
        }
        config.headers.common = iucLogin.addHeader(config.headers.common);

        let params = Object.assign(config.params || {}, {
            _: Date.now()
        });
        /*if (store.state.encryptId) {
            params = Object.assign(params || {}, {
                encryptId: store.state.encryptId
            });
        }*/
        // 防止重复提交token
        config.headers.common['X-Anti-Request-Token'] = md5(
            stringify(config.body || config.params)
        );

        config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        config.headers.common['zhipinhr-v2'] = token;// 令牌认证

        if (store.state.token) {
            config.headers.common['token'] = store.state.token;
        }

        if (!config.params) { // post 时强行给url上加上参数
            config.params = params;
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // console.log('----response----', response);
        let { status, data, config } = response;

        if (status !== 200) {
            return Promise.reject(data);
        }
        if (data && data.callback) { //不能直接用后端返回的callback，因为server无法获取到当前浏览器访问的地址
            let urlPre = data.callback.split('callback=')[0];
            const callbackUrl = urlPre + 'callback='+ encodeURIComponent( location.href );
            isLogging++;
            setTimeout(() => {
                iucLogin.goLogin(callbackUrl);
                // window.location.href = filterQueryParams(callbackUrl, 't_uc');
            }, 500);
        }else if( qs('t_uc') && window.noahApp ){
            const url = filterQueryParams(window.noahApp.$route.fullPath, ['t_uc=', 'callback=', 'hideBack=', 'token=', 'needCode='], ['hideBack=1']);
            window.noahApp.$router.replace( url );
        }
        // 需要验证码校验
        if (data.code === 50001) {
            store.commit('updateShowCheckedDialog', true);
            return data;
        }

        // 如果code === 50005 需要做解密处理
        const decryptData = data.code === 50005 ? decrypt(data.root) : data;
        const content = decryptData.message || decryptData.msg;
        // 更新系统版本号
        store.commit('updateVersion', decryptData.version);
        if (!decryptData.success && content !== '没有访问权限' && content !== '重复请求，请稍后再试' && isLogging <= 1 && !config.quiet) { // 自定义属性：quiet（控制是否toast）
            data.code != 0 &&content && vue.$toast({ // 提示错误信息
                type: 'error',
                content
            });
        } 
        else if (content === '没有访问权限') {
            if (magpieConfig.isOnline) {
                wdCustomSend({
                    appKey: magpieConfig.appKey,
                    openId: store.state.userInfo?.id,
                    userId: store.state.userInfo?.userId,
                    platform: magpieConfig.platform,
                    errorType: magpieConfig.type.collectData,
                    sceneType: magpieConfig.sceneType.noPermissions,
                    apiUrl: config.url,     //接口路径
                    apiParam: JSON.stringify(config.data || config.params), //接口需要的参数
                    errorCode: JSON.stringify(data)
                });
            }
        }
        handleResponseEnd(response);
      
        return decryptData;
    },
    error => {
        const config = error.config;
        if (magpieConfig.isOnline && config) {
            wdCustomSend({      // 接口请求异常 喜鹊上报
                appKey: magpieConfig.appKey,
                platform: magpieConfig.platform,
                openId: store.state.userInfo?.id,
                userId: store.state.userInfo?.userId,
                errorType: magpieConfig.type.httpCatchError,
                apiUrl: config.url,     //接口路径
                apiParam: JSON.stringify(config.data || config.params), //接口需要的参数
                errorCode: JSON.stringify(error.stack || error.message || error)
            });
        }
        return Promise.reject(error);
    }
);

export default instance;
