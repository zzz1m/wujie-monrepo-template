import { _batchGetDictInfo } from '@/services/dashboard/common.js';

const watchBatch = (() => {
    let timer = null;
    let observers = [];
    return (key, callback) => {
        // 通过设置timer节流的形式，把需要一起加载的dict合并请求
        timer && clearTimeout(timer);
        observers.push({
            key,
            callback,
        });
        timer = setTimeout(async () => {
            const types = new Set(observers.map(e => e.key));
            // 去重
            const { root, success } = await _batchGetDictInfo({
                typeList: [...types],
                parentCode: null,
            });
            observers.forEach((observer) => {
                observer.callback(root[observer.key], success);
            });
            observers = [];
        }, 100);
    };
})();

const batchAny = (() => {
    let timer = null;
    let observers = [];
    return (key, fn, callback) => {
        // 通过设置timer节流的形式，把需要一起加载的dict合并请求
        timer && clearTimeout(timer);
        const target = observers.find(obsv => obsv.key === key);
        if(target) {
            target.callbackList.push(callback);
        } else {
            observers.push({
                key,
                callbackList: [callback],
                fn,
            });
        }
        
        timer = setTimeout(async () => {
            observers.forEach(async (observer) => {
                const res = await observer.fn();
                observer.callbackList.forEach(cbk => {
                    cbk(res);
                });
            });
            observers = [];
        }, 100);
    };
})();

export default {
    name: 'dict',
    namespaced: true,
    state: {
        dictCache: {}
    },
    mutations: {
        M_setDict(state, { key, data }) {
            state.dictCache[key] = data;
        }
    },
    actions: {
        A_batchRequest({ state, commit }, key) {
            return new Promise((resolve, reject) => {
                if (state?.dictCache.hasOwnProperty(key)) {
                    resolve(state.dictCache[key]);
                } else {
                    const callback = (result, success) => {
                        if (success) {
                            commit('M_setDict', {
                                key,
                                data: result,
                            });
                            resolve(result);
                        } else {
                            reject('批量获取失败');
                        }
                    };
                    // 获取完成调用callback完成
                    watchBatch(key, callback);
                }
            });
        },
        // 非batch重复接口获取
        A_batchAnyRequest({ state, commit },requestList) {
            (requestList || []).forEach(req => {
                const { key, fn, callback } = req;
                batchAny(key, fn, callback);
            });
        }
    },
};
