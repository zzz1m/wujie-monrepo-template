# 项目简介
    noah是公司内部的一个oa系统，包含了日报、资产、审批、会议室、内推等多个重要办公功能。

# 应用框架
    - [Vue](https://cn.vuejs.org/)
    - [boss-ui v_2.1.3](https://static.weizhipin.com/vueui/2.2/docs/introduce)
    - [webpack](https://webpack.docschina.org/)
    
# 开发人员
    FE：王小龙 马凯 （历史涉及：李光 丁振举 周元）
    RD：王勇 郝荣凯 李林 张玉莹 （历史涉及：黄源 林德峰）
    QA: 王晓臣 苑朝阳 （历史涉及：殷志）
    PM: 彭苛 侯倩云 杨庆

# 相关地址
    wiki： https://wiki.kanzhun-inc.com/display/a/3.2.x
    接口： http://api.weizhipin.com/project/156/interface/api
    UI设计稿：https://lanhu.kanzhun-inc.com/web/#/item/project/board?pid=38eee0e9-d8c9-4db7-9630-9b4fb549dd8f
    鹰眼（项目进度）： https://ye.weizhipin.com/web/home
# 部署
    项目采用jenkins部署方式，上线对接了ops系统；

    **测试环境部署方式**
    - [登录测试环境jenkins](https://ci.kanzhun-inc.com/job/fe-enterprise-platform/job/fe-noah-web-dev/)
    - 点击左侧的Build with Parameters按钮，
    - 选择对应的分支和要部署的环境 
    - 点击build按钮；
    

    **线上环境部署方式**
    - [登录线上环境jenkins](https://ci.kanzhun-inc.com/job/fe-enterprise-platform/job/fe-noah-web-release/)
    - 点击左侧的Build with Parameters按钮
    - 点击build按钮；
    - 登录ops系统 进入 [工单导航-上线更新-自主上线](https://ops.weizhipin.com/html/work_order/oa_create?wtemp_id=79)填写工单， 服务名称选择fe-noah-web-release，版本号选择jenkins的版本号，点击提交
    - 工单审批后 选择上线 下载部署包 上线
    - 上线完成 进行验证 保证项目正常显示 再通知测试及产品进行线上验证

# 注意事项
"pdfjs-dist": "^2.9.359",
    

    