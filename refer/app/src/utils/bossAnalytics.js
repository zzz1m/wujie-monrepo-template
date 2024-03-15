// PageView
// 页面浏览事件
// first_visit_time          字符串  用户首次访问页面时，触发的第一个 pageview 时间
// first_referrer            字符串  新用户第一次来到有 SDK 页面时的前向页面地址
// first_browser_language    字符串  首次访问浏览器语言
// first_browser_charset     字符串  首次访问浏览器字符集
// first_traffic_source_type 字符串  首次访问来源类型
// first_search_keyword      字符串  首次访问搜索关键字
// page_referrer             字符串  前向地址，如果直接打开页面，值为空字符串


// WebClick
// 页面点击事件，默认会采集a、button、input、textarea及带有data-warlock-click属性的标签的点击事件。
// ele_id         字符串  元素ID，元素有 id 属性才采集
// ele_content    字符串  元素内容，元素标签对直接的文本，例如：<a><span>提交</span></a>，采集的是 "提交"
// ele_name       字符串  元素名字，元素有 name 属性的时候才采集
// ele_class_name 字符串  元素样式名，元素有 class 属性的时候才采集
// ele_type       字符串  元素标签类型
// ele_selector   字符串  元素选择器
// ele_target_url 字符串  元素链接地址，有值才会采集
// ele_attributes 字符串  元素的所有属性（不包含class、id和name），json格式保存
// ele_value      字符串  元素的值，元素有值且不为空时才会采集
// page_x          数值   页面点击的横坐标
// page_y          数值   页面点击的纵坐标
// viewport_width  数值   当前浏览器窗口宽度

// 共有属性
// _reqid                      字符串   默认UUID
// _topic                      字符串   token
// _ts                          数值    数据发送时间戳
// _v                          字符串   SDK 协议版本，默认1.0.0
// app_name                    字符串   应用名称
// app_ver                     字符串   应用版本
// distinct_id                 字符串   用户ID
// anonymous_id                字符串   匿名ID
// event                       字符串   事件名称
// event_no                     数值    事件编号
// event_ts                     数值    事件发生时间戳
// event_type                  字符串   事件类型
// lib                         字符串   SDK 类型
// lib_version                 字符串   SDK 版本
// page_url                    字符串   页面地址
// page_title                  字符串   页面<title>标签对的内容
// latest_referrer             字符串   最近一次站外地址，只要前向域名不是当前页面的域名，就会重置
// latest_referrer_host        字符串   最近一次站外域名
// latest_search_keyword       字符串   最近一次搜索引擎关键词，由于各搜索引擎策略不同，可能有获取不到的情况
// latest_traffic_source_type  字符串   最近一次流量来源类型，属性包括自然搜索流量、社交网站流量、引荐流量、直接流量。
// latest_landing_page         字符串   最近一次登录页地址
// resolution                  字符串   屏幕宽度*屏幕高度
// timezone_offset              数值    时区偏移量，从浏览器的时间对象上直接获取

const SERVER_URL_DEV = 'https://logapi-dev.weizhipin.com/dap/api/json';     // 测试环境地址
const SERVER_URL_PROD = 'https://logapi.zhipin.com/dap/api/json';           // 线上地址
const TOKEN = 'A453302A7C6A4FFD81211FD5A060AAFC';                           // noah服务token
const APP_NAME = 'noah_pc';                                                    
export const analyticsInit = function({
    appVer = '1.0',
    userId
}) {

    if (!window.BossAnalytics) return;
    
    const server_url = ['noah.kanzhun-inc.com', 'noah-web.kanzhun-inc.com'].includes(location.host) ? SERVER_URL_PROD : SERVER_URL_DEV;
    window.BossAnalytics.init({
        // 必填属性，如果缺少必填属性，SDK会停止初始化
        // 线上地址：https://logapi.zhipin.com/dap/api/json
        server_url: server_url,
        token: TOKEN,
        app_name: APP_NAME,
        app_ver: appVer,

        // 选填配置
        // 是否自动采集PageView事件，默认为false
        auto_track_page_view: true, 
        // 是否自动采集WebClick事件，默认为false
        auto_track_web_click: true,
        // 是否打印提交的数据，默认为false
        // show_log: true, 
        // 是否提交页面title，默认为true
        page_title: false,
        // 是否采集元素完整路径，默认为true
        // element_selector: false,
        // 添加额外要采集的标签，默认采集的标签有a，input，area，textarea，button，必须为数组类型
        // 如果要自动采集某个标签点击事件，可以为标签添加 data-warlock-click 属性
        // auto_track_elements: ['span'], 
        // 如果返回 false 则该事件不进行采集，target为点击的元素
        // auto_track_filter: function(target){return true;}, 
        // 添加额外要采集的带有指定 class 的标签，必须为数组
        auto_track_elements_class:['btn', 'radio', 'boss-track']
        // 添加额外要采集的带有指定 id 的标签
        // auto_track_elements_id:['custom id'],
        // 自定义扩展元素属性收集方法，参数为点击的目标元素
        // auto_track_property_extend:function(target){return {'custom_prop':target.getAttribute('prop')};},
        // 以下对应相应的上报数据字段key，如果为 false 则该项不上报，默认为 false
        // latest_traffic_source_type: true,
        // latest_search_keyword: true,
        // latest_referrer: true,
        // latest_referrer_host: true,
        // latest_landing_page: true,

    });
    userId && window.BossAnalytics.login(userId);
    window.BossAnalytics.extendTrackProps({'source': 'PC'});
    window.BossAnalytics.quick('autoTrackPageView');
    // 如果有其他匿名id（比如设备id，或者自己生成的id），可以用该方法修改
    // BossAnalytics.anonymousId('CustomAnonymousId');
    // 参数为用户ID
    // BossAnalytics.login('12345679213');
    // 扩展上报数据属性，设置之后上报的数据都会携带该属性
    // BossAnalytics.extendTrackProps({'email': "zhangsan@kanzhun.com"});
    // 便捷手动提交事件
    // BossAnalytics.quick('autoTrackPageView'); // 与自动提交PageView事件配合使用，第一个页面没有redirect，需手动提交
    // BossAnalytics.quick('trackPageView'); // 手动快速提交PageView事件
    // BossAnalytics.quick('trackWebClick', target, {}, function () {console.log('click callback');}) // 手动快速提交WebClick事件
    // 手动埋点，参数分别为：事件名称，自定义参数，回调函数
    // BossAnalytics.track('ViewProduct', {
    //     ProductId: '123456',
    //     ProductCatalog: 'Laptop Computer',
    //     isAddedToFav: true
    // }, function () {
    //     console.log('callback');
    // });
    // BossAnalytics.logout();
};