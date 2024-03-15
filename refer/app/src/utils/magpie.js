const isOnline = ['noah.kanzhun-inc.com', 'noah-web.kanzhun-inc.com'].includes(location.host) ?  true : false; // 判断是否是线上环境
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
        'Error: 未指明的错误',
        'error.',
        'ResizeObserver'
    ],
    jsErrorArray: [
        'Error: Request failed with status code',
        'Script error',
        'error.',
        'ResizeObserver'
    ],
    sceneType: {
        noPermissions: 'c5f7765021a49934581e66b632334f01'       // 无权限
    }
};