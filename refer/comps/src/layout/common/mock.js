// @todo  待删除
export default [
  {
    id: 10000,
    parentId: 0,
    name: '部门看板',
    url: '/dashboard/kanban/dept',
    icon: 'https://img.bosszhipin.com/static/file/2021/y7qdq1m5831638437122723.png',
    target: 'self',
    code: 'link',
    isNew: false,
    level: 1,
    childMenus: []
  },
  {
    id: 10001,
    parentId: 0,
    name: '日报周报',
    url: '/dashboard/report/daily/my',
    icon: 'https://img.bosszhipin.com/static/file/2021/ijg86lho8a1638437149625.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      // {
      //     "id": 10001001,
      //     "parentId": 10001,
      //     "name": "工作日常",
      //     "url": "",
      //     "icon": "a.jpg",
      //     "target": "self",
      //     "code":"module",
      //     "level": 2,
      //     "childMenus": [
      //         {
      //             "id": 10001001001,
      //             "parentId": 10001001,
      //             "name": "我的日报",
      //             "url": "/dashboard/report/daily/my",
      //             "icon": "",
      //             "target": "self",
      //             "code":"link",
      //             "level": 2,
      //             "childMenus": []
      //         },{
      //             "id": 10001001001002,
      //             "parentId": 10001001,
      //             "name": "团队日报",
      //             "url": "/dashboard/report/daily/team",
      //             "icon": "",
      //             "target": "self",
      //             "code":"link",
      //             "level": 2,
      //             "childMenus": []
      //         },{
      //             "id": 10001001003,
      //             "parentId": 10001001,
      //             "name": "我的周报",
      //             "url": "/dashboard/report/week/my",
      //             "icon": "",
      //             "target": "self",
      //             "code":"link",
      //             "level": 2,
      //             "childMenus": []
      //         },{
      //             "id": 10001001004,
      //             "parentId": 10001001,
      //             "name": "团队周报",
      //             "url": "/dashboard/report/week/team",
      //             "icon": "",
      //             "target": "self",
      //             "code":"link",
      //             "level": 2,
      //             "childMenus": []
      //         }
      //     ]
      // },{
      //     "id": 10001002,
      //     "parentId": 10001,
      //     "name": "汇报关系",
      //     "url": "",
      //     "icon": "b.jpg",
      //     "target": "self",
      //     "code":"module",
      //     "level": 2,
      //     "childMenus": [
      //         {
      //             "id": 10001002001,
      //             "parentId": 10001002,
      //             "name": "汇报关系日报",
      //             "url": "/dashboard/report/daily/directly",
      //             "icon": "",
      //             "target": "self",
      //             "code":"link",
      //             "level": 3,
      //             "childMenus": []
      //         },{
      //             "id": 10001002002,
      //             "parentId": 10001002,
      //             "name": "汇报关系周报",
      //             "url": "/dashboard/report/week/directly",
      //             "icon": "",
      //             "target": "self",
      //             "code":"link",
      //             "level": 3,
      //             "childMenus": []
      //         }
      //     ]
      // },
      {
        id: 10001001,
        parentId: 10001,
        name: '我的日报',
        url: '/dashboard/report/daily/my',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10001002,
        parentId: 10001,
        name: '团队日报',
        url: '/dashboard/report/daily/team',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10001003,
        parentId: 10001,
        name: '我的周报',
        url: '/dashboard/report/week/my',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10001004,
        parentId: 10001,
        name: '团队周报',
        url: '/dashboard/report/week/team',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10001005,
        parentId: 10001,
        name: '汇报关系日报',
        url: '/dashboard/report/daily/directly',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10001006,
        parentId: 10001,
        name: '汇报关系周报',
        url: '/dashboard/report/week/directly',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10003,
    parentId: 0,
    name: '审批中心',
    url: '/dashboard/audit/audit-center/list',
    icon: 'https://img.bosszhipin.com/static/file/2021/n67g7h0m391638437196803.png',
    target: 'self',
    code: 'link',
    isNew: false,
    level: 1,
    childMenus: []
  },
  {
    id: 10004,
    parentId: 0,
    name: '考勤',
    url: '/dashboard/attendance/calendar',
    icon: 'https://img.bosszhipin.com/static/file/2021/cc4q8a7jl81638437224299.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10004001,
        parentId: 10004,
        name: '我的考勤',
        url: '/dashboard/attendance/calendar',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004002,
        parentId: 10004,
        name: '团队考勤',
        url: '/dashboard/attendance/team',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004003,
        parentId: 10004,
        name: '区域考勤',
        url: '/dashboard/attendance/regional',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004004,
        parentId: 10004,
        name: '个人考勤',
        url: '/dashboard/attendance/personal',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004006,
        parentId: 10004,
        name: '我的审批',
        url: '/dashboard/attendance/approval',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004005,
        parentId: 10004,
        name: '休假公出',
        url: '/dashboard/attendance/application?hideBack=1',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004007,
        parentId: 10004,
        name: '假期余额',
        url: '/dashboard/attendance/holiday-balance',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004008,
        parentId: 10004,
        name: '在厂时间',
        url: '/dashboard/attendance/rank',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004009,
        parentId: 10004,
        name: '考勤设置',
        url: '/dashboard/attendance/setting',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004011,
        parentId: 10004,
        name: '排班设置',
        url: '/dashboard/attendance/scheduling',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004012,
        parentId: 10004,
        name: '考勤通知',
        url: '/dashboard/attendance/notice',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004013,
        parentId: 10004,
        name: '签到排名',
        url: '/dashboard/attendance/rank-sign',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004014,
        parentId: 10004,
        name: '导出明细',
        url: '/dashboard/attendance/export',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004015,
        parentId: 10004,
        name: '特殊考勤设置',
        url: '/dashboard/attendance/special-attendance',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004016,
        parentId: 10004,
        name: '审批进度',
        url: '/dashboard/attendance/approval-progress',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10004017,
        parentId: 10004,
        name: '申请明细',
        url: '/dashboard/attendance/approval-details',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10005,
    parentId: 0,
    name: '会议室预定',
    url: '/dashboard/meeting/reservation',
    icon: 'https://img.bosszhipin.com/static/file/2021/uv5yhndeys1638437246019.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10005001,
        parentId: 10005,
        name: '会议室预定',
        url: '/dashboard/meeting/reservation',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10005002,
        parentId: 10005,
        name: '我的预定',
        url: '/dashboard/meeting/mine',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10006,
    parentId: 0,
    name: '伯乐专区',
    url: '/dashboard/recommend/staff/job',
    icon: 'https://img.bosszhipin.com/static/file/2021/lphcuseopu1638437264902.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10006001,
        parentId: 10006,
        name: '开放职位',
        url: '/dashboard/recommend/staff/job',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10006002,
        parentId: 10006,
        name: '我的推荐',
        url: '/dashboard/recommend/staff/my',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10006003,
        parentId: 10006,
        name: '转发统计',
        url: '/dashboard/recommend/staff/my-promote',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10007,
    parentId: 0,
    name: '成长中心',
    url: '/dashboard/train/learning-platform',
    icon: 'https://img.bosszhipin.com/static/file/2021/z8oawwgp4p1638958544404.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10007001,
        parentId: 10007,
        name: '学习平台',
        url: '/dashboard/train/learning-platform',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10007002,
        parentId: 10007,
        name: '我的学习',
        url: '/dashboard/train/my-studies',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10008,
    parentId: 0,
    name: 'PHCC',
    url: '/dashboard/phcc/book',
    icon: 'https://img.bosszhipin.com/static/file/2021/rt9lyo8p1p1638437367587.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10008001,
        parentId: 10008,
        name: '预定',
        url: '/dashboard/phcc/book',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10008002,
        parentId: 10008,
        name: '我的预定',
        url: '/dashboard/phcc/my',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10008003,
        parentId: 10008,
        name: '通知',
        url: '/dashboard/phcc/health',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10009,
    parentId: 0,
    name: 'PSCC',
    url: 'https://noah.kanzhun-inc.com/pscc',
    icon: 'https://img.bosszhipin.com/static/file/2021/fubc5p3k8w1638437385853.png',
    target: 'blank',
    code: 'link',
    isNew: false,
    level: 1,
    childMenus: []
  },
  {
    id: 10010,
    parentId: 0,
    name: '绩效',
    url: '/dashboard/performance/cooperation',
    icon: 'https://img.bosszhipin.com/static/file/2021/mi9ciy2xcy1638437403753.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10010001,
        parentId: 10010,
        name: '我的绩效',
        url: '/dashboard/performance/myself',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10010002,
        parentId: 10010,
        name: '绩效评价',
        url: '/dashboard/performance/cooperation',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10010003,
        parentId: 10010,
        name: '协作管理',
        url: '/dashboard/performance/management',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10010004,
        parentId: 10010,
        name: '团队绩效',
        url: '/dashboard/performance/team',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10011,
    parentId: 0,
    name: '我的资产',
    url: '/dashboard/equipment/asset-list',
    icon: 'https://img.bosszhipin.com/static/file/2021/dapcaxf2zl1638437420101.png',
    target: 'self',
    code: 'link',
    isNew: false,
    level: 1,
    childMenus: []
  },
  {
    id: 10012,
    parentId: 0,
    name: '权限申请',
    url: '/dashboard/permissions/iuc-apply',
    icon: 'https://img.bosszhipin.com/static/file/2021/y8syucwxht1638437435683.png',
    target: 'self',
    code: 'link',
    isNew: false,
    level: 1,
    childMenus: []
  },
  {
    id: 10013,
    parentId: 0,
    name: 'IT服务中心',
    url: 'https://ops.weizhipin.com/html/techsupport/itorder_dashbord/',
    icon: 'https://img.bosszhipin.com/static/file/2021/p0rcdz1tgp1638437449753.png',
    target: 'blank',
    code: 'link',
    isNew: false,
    level: 1,
    childMenus: []
  },
  {
    id: 10014,
    parentId: 0,
    name: 'PSCC管理',
    url: '/dashboard/pscc/staff-order',
    icon: 'https://img.bosszhipin.com/static/file/2021/fubc5p3k8w1638437385853.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10014002,
        parentId: 10014,
        name: '在线问答',
        url: '/dashboard/pscc/anonymous-chat',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10014003,
        parentId: 10014,
        name: '时间配置',
        url: '/dashboard/pscc/set-time',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10014004,
        parentId: 10014,
        name: '员工签到',
        url: '/dashboard/pscc/staff-sign',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10014005,
        parentId: 10014,
        name: '员工预约',
        url: '/dashboard/pscc/staff-order',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10014006,
        parentId: 10014,
        name: '咨询室管理',
        url: '/dashboard/pscc/counselling-room',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10015,
    parentId: 0,
    name: '人事管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/r4bsyvbxpl1638437483855.png',
    target: 'self',
    code: 'system',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10015001,
        parentId: 10015,
        name: '入职管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10015001001,
            parentId: 10015001,
            name: '待发offer',
            url: '/dashboard/entry/offer/pending',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001002,
            parentId: 10015001,
            name: '已发offer',
            url: '/dashboard/entry/offer/issued',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001003,
            parentId: 10015001,
            name: '待入职',
            url: '/dashboard/entry/waiting',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001004,
            parentId: 10015001,
            name: '已入职',
            url: '/dashboard/entry/already',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001005,
            parentId: 10015001,
            name: '我的审批',
            url: '/dashboard/entry/approval',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001006,
            parentId: 10015001,
            name: '生成链接',
            url: '/dashboard/entry/link',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001007,
            parentId: 10015001,
            name: '操作记录',
            url: '/dashboard/entry/record',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001008,
            parentId: 10015001,
            name: '入职报表',
            url: '/dashboard/entry/sheet',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001009,
            parentId: 10015001,
            name: '待同步/归档',
            url: '/dashboard/entry/statistics',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015001010,
            parentId: 10015001,
            name: '放弃入职',
            url: '/dashboard/entry/talent',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      },
      {
        id: 10015002,
        parentId: 10015,
        name: '员工管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10015002001,
            parentId: 10015002,
            name: '员工管理',
            url: '/dashboard/staff/manage',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015002002,
            parentId: 10015002,
            name: '员工查询',
            url: '/dashboard/staff/search',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015002003,
            parentId: 10015002,
            name: '花名册',
            url: '/dashboard/staff/roster',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      },
      {
        id: 10015003,
        parentId: 10015,
        name: '访谈管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10015003001,
            parentId: 10015003,
            name: '我的工单',
            url: '/dashboard/interview/order/my',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015003002,
            parentId: 10015003,
            name: '访谈工单',
            url: '/dashboard/interview/order/main',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015003003,
            parentId: 10015003,
            name: '访谈报告模板',
            url: '/dashboard/interview/template',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015003004,
            parentId: 10015003,
            name: '邮件模板',
            url: '/dashboard/interview/email/notice',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      },
      {
        id: 10015004,
        parentId: 10015,
        name: '合同管理',
        url: '/dashboard/contract/warning',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link'
      },
      {
        id: 10015005,
        parentId: 10015,
        name: '绩效管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10015005002,
            parentId: 10015005,
            name: '绩效调整',
            url: '/dashboard/performance/adjust',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015005003,
            parentId: 10015005,
            name: '邮件提醒',
            url: '/dashboard/performance/email',
            icon: '',
            target: 'self',
            level: 3,
            code: 'link',
            childMenus: []
          },
          {
            id: 10015005004,
            parentId: 10015005,
            name: '评价关系管理',
            url: '/dashboard/performance/evaluation-relationship/list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10015005005,
            parentId: 10015005,
            name: '绩效阶段设置',
            url: '/dashboard/performance/performance-setting/list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      }
    ]
  },
  {
    id: 10016,
    parentId: 0,
    name: '行政管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/mbyjt9h0vt1638437498564.png',
    target: 'self',
    code: 'system',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10016001,
        parentId: 10016,
        name: '资产管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10016001001,
            parentId: 10016001,
            name: '资产列表',
            url: '/dashboard/equipment/equipment-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001002,
            parentId: 10016001,
            name: '申领&归库',
            url: '/dashboard/equipment/apply-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001003,
            parentId: 10016001,
            name: '维修记录',
            url: '/dashboard/equipment/repair-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001004,
            parentId: 10016001,
            name: '报错记录',
            url: '/dashboard/equipment/error-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001005,
            parentId: 10016001,
            name: '资产报表',
            url: '/dashboard/equipment/report-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001006,
            parentId: 10016001,
            name: '资产盘点',
            url: '/dashboard/equipment/check-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001007,
            parentId: 10016001,
            name: '合同信息',
            url: '/dashboard/equipment/agreement-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001008,
            parentId: 10016001,
            name: '设置',
            url: '/dashboard/equipment/configure',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016001009,
            parentId: 10016001,
            name: '财务推送',
            url: '/dashboard/equipment/financial-push',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      },
      {
        id: 10016002,
        parentId: 10016,
        name: '会议室管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10016002001,
            parentId: 10016002,
            name: '会议室管理',
            url: '/dashboard/meeting/manage',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016002002,
            parentId: 10016002,
            name: '会议室权限',
            url: '/dashboard/meeting/auth',
            icon: '',
            target: 'self',
            level: 3,
            code: 'link',
            childMenus: []
          }
        ]
      },
      {
        id: 10016003,
        parentId: 10016,
        name: '证照管理',
        url: '',
        icon: '',
        target: 'self',
        code: 'module',
        level: 2,
        childMenus: [
          {
            id: 10016003001,
            parentId: 10016003,
            name: '公司管理',
            url: '/dashboard/licence/company-management',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016003002,
            parentId: 10016003,
            name: '账户管理',
            url: '/dashboard/licence/account-management',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10016003003,
            parentId: 10016003,
            name: '证照借阅',
            url: '/dashboard/licence/licence-borrow-list',
            icon: '',
            target: 'self',
            level: 3,
            code: 'link',
            childMenus: []
          },
          {
            id: 10016003004,
            parentId: 10016003,
            name: '证照管理',
            url: '/dashboard/licence/licence-management-list',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      }
    ]
  },
  {
    id: 10017,
    parentId: 0,
    name: '成长中心管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/iia6i8x7af1638437529673.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10017001,
        parentId: 10017,
        name: '培训管理',
        url: '/dashboard/train/train-manage-list',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10017002,
        parentId: 10017,
        name: '讲师管理',
        url: '/dashboard/train/teacher-manage',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      },
      {
        id: 10017003,
        parentId: 10017,
        name: '讲师等级',
        url: '/dashboard/train/teacher-grade',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      },
      {
        id: 10017004,
        parentId: 10017,
        name: '课程管理',
        url: '/dashboard/train/course-manage',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10017005,
        parentId: 10017,
        name: '课程分类管理',
        url: '/dashboard/train/course-category',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10017006,
        parentId: 10017,
        name: '课程培训统计',
        url: '/dashboard/train/course-train-data',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10017007,
        parentId: 10017,
        name: 'banner配置',
        url: '/dashboard/train/banner-config',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10018001,
    parentId: 0,
    name: '招聘管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/bdsuc2xh2b1638437544109.png',
    target: 'self',
    code: 'module',
    level: 1,
    childMenus: [
      {
        id: 10018001001,
        parentId: 10018001,
        name: '招聘职位',
        url: '/dashboard/recruit/recruit-position',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10018001002,
        parentId: 10018001,
        name: '招聘中',
        url: '/dashboard/recruit/recruit-process',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10018001003,
        parentId: 10018001,
        name: '已入职',
        url: '/dashboard/recruit/recruit-employed',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10018001004,
        parentId: 10018001,
        name: '已淘汰',
        url: '/dashboard/recruit/recruit-eliminated',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018001005,
        parentId: 10018001,
        name: '面试管理',
        url: '/dashboard/recruit/interview-management',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018001006,
        parentId: 10018001,
        name: '同事推荐',
        url: '/dashboard/recruit/colleague-recommend',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018001007,
        parentId: 10018001,
        name: '人才库',
        url: '/dashboard/recruit/talent-pool',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018001008,
        parentId: 10018001,
        name: '我的面试',
        url: '/dashboard/recruit/my-interview',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018001009,
        parentId: 10018001,
        name: '我的评估',
        url: '/dashboard/recruit/my-assessment',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      }
    ]
  },
  {
    id: 10018002,
    parentId: 0,
    name: '内推管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/1k8tacq0vm1638958525521.png',
    target: 'self',
    code: 'module',
    level: 1,
    childMenus: [
      {
        id: 10018002002,
        parentId: 10018002,
        name: '推荐列表',
        url: '/dashboard/recommend/manager/rec-list',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10018002003,
        parentId: 10018002,
        name: '职位管理',
        url: '/dashboard/recommend/manager/jov-list',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10018002004,
        parentId: 10018002,
        name: '内推活动管理',
        url: '/dashboard/recommend/manager/rule-edit',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10018002005,
        parentId: 10018002,
        name: '工作城市管理',
        url: '/dashboard/recommend/manager/city-list',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018002006,
        parentId: 10018002,
        name: '邮件提醒管理',
        url: '/dashboard/recommend/manager/email-notice-list',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      },
      {
        id: 10018002007,
        parentId: 10018002,
        name: '数据统计',
        url: '/dashboard/recommend/manager/data-statistics',
        icon: '',
        level: 2,
        target: 'self',
        code: 'link',
        childMenus: []
      }
    ]
  },
  {
    id: 10019,
    parentId: 0,
    name: '组织管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/mj7pmwybdg1638437578747.png',
    target: 'self',
    code: 'module',
    level: 1,
    isNew: false,
    childMenus: [
      {
        id: 10019001,
        parentId: 10019,
        name: '组织管理',
        url: '/dashboard/organization/organization-manage',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10019002,
        parentId: 10019,
        name: '撤销部门查询',
        url: '/dashboard/organization/revoke-dept',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10019003,
        parentId: 10019,
        name: '专业序列管理',
        url: '/dashboard/organization/sequence-manage',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10019004,
        parentId: 10019,
        name: '专业子序列管理',
        url: '/dashboard/organization/subsequence-manage',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10019005,
        parentId: 10019,
        name: '管理序列管理',
        url: '/dashboard/organization/manage-sequence-manage',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10019006,
        parentId: 10019,
        name: '管理子序列管理',
        url: '/dashboard/organization/manage-subsequence-manage',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      }
    ]
  },
  {
    id: 10020,
    parentId: 0,
    name: '员工关怀管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/5z9hsofwf21638437592307.png',
    target: 'self',
    code: 'system',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10020001,
        parentId: 10020,
        name: 'PHCC管理',
        url: '',
        icon: '',
        level: 2,
        target: 'self',
        code: 'module',
        childMenus: [
          {
            id: 10020001001,
            parentId: 10020001,
            name: '预定明细',
            url: '/dashboard/phcc/detail',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10020001002,
            parentId: 10020001,
            name: '预定设置',
            url: '/dashboard/phcc/setting',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10020001003,
            parentId: 10020001,
            name: '签到签退',
            url: '/dashboard/phcc/sign',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10020001004,
            parentId: 10020001,
            name: '通知管理',
            url: '/dashboard/phcc/announcement',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          },
          {
            id: 10020001005,
            parentId: 10020001,
            name: '黑名单管理',
            url: '/dashboard/phcc/blacklist',
            icon: '',
            target: 'self',
            code: 'link',
            level: 3,
            childMenus: []
          }
        ]
      },
      {
        id: 10020002,
        parentId: 10020,
        name: 'ZHI得',
        url: '',
        icon: '',
        level: 2,
        target: 'self',
        code: 'module',
        childMenus: [
          {
            id: 10020002001,
            parentId: 10020002,
            name: '直关心',
            url: '/dashboard/staff-care/care-list',
            icon: '',
            target: 'self',
            level: 3,
            code: 'link',
            childMenus: []
          }
        ]
      }
    ]
  },
  {
    id: 10021,
    parentId: 0,
    name: '首页管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/200m0dylf21638437607627.png',
    target: 'self',
    code: 'module',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10021001,
        parentId: 10021,
        name: '广播管理',
        url: '/dashboard/homepage/manager/broadcast',
        icon: '',
        target: 'self',
        level: 2,
        code: 'module',
        childMenus: []
      },
      {
        id: 10021002,
        parentId: 10021,
        name: '规章制度管理',
        url: '/dashboard/homepage/manager/rule',
        icon: '',
        target: 'self',
        level: 2,
        code: 'module',
        childMenus: []
      },
      {
        id: 10021003,
        parentId: 10021,
        name: '公告管理',
        url: '/dashboard/homepage/manager/announcement',
        icon: '',
        target: 'self',
        level: 2,
        code: 'module',
        childMenus: []
      },
      {
        id: 10021004,
        parentId: 10021,
        name: '万花筒管理',
        url: '/dashboard/homepage/manager/companynews',
        icon: '',
        target: 'self',
        level: 2,
        code: 'module',
        childMenus: []
      },
      {
        id: 10021005,
        parentId: 10021,
        name: '常见问题管理',
        level: 2,
        url: '/dashboard/homepage/manager/question',
        icon: '',
        target: 'self',
        code: 'module',
        childMenus: []
      },
      {
        id: 10021006,
        parentId: 10021,
        name: '安全专区管理',
        level: 2,
        url: '/dashboard/homepage/manager/security',
        icon: '',
        target: 'self',
        code: 'module',
        childMenus: []
      },
      {
        id: 10021007,
        parentId: 10021,
        name: '常用系统入口配置',
        level: 2,
        url: '/dashboard/homepage/manager/entranceset',
        icon: '',
        target: 'self',
        code: 'module',
        childMenus: []
      },
      {
        id: 10021008,
        parentId: 10021,
        name: '内容权限配置',
        level: 2,
        url: '/dashboard/homepage/manager/authset',
        icon: '',
        target: 'self',
        code: 'module',
        childMenus: []
      },
      {
        id: 10021009,
        parentId: 10021,
        name: '标签管理',
        url: '/dashboard/homepage/manager/tag',
        icon: '',
        level: 2,
        target: 'self',
        code: 'module',
        childMenus: []
      }
    ]
  },
  {
    id: 10022,
    parentId: 0,
    name: '系统管理',
    url: '',
    icon: 'https://img.bosszhipin.com/static/file/2021/b0ik0a6azv1638437621916.png',
    target: 'self',
    code: 'system',
    isNew: false,
    level: 1,
    childMenus: [
      {
        id: 10022001,
        parentId: 10022,
        name: '用户管理',
        url: '/dashboard/system/user',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      },
      {
        id: 10022002,
        parentId: 10022,
        name: '角色管理',
        url: '/dashboard/system/role',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      },
      {
        id: 10022003,
        parentId: 10022,
        name: '日志管理',
        url: '/dashboard/system/logs',
        icon: '',
        target: 'self',
        code: 'link',
        level: 2,
        childMenus: []
      },
      {
        id: 10022004,
        parentId: 10022,
        name: '字典值设置',
        url: '/dashboard/system/dictionary',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      },
      {
        id: 10022005,
        parentId: 10022,
        name: '特殊管理范围设置',
        url: '/dashboard/base/rules',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      },
      {
        id: 10022006,
        parentId: 10022,
        name: '审批流程管理',
        url: '/dashboard/audit/audit-center/process-list',
        icon: '',
        target: 'self',
        level: 2,
        code: 'link',
        childMenus: []
      }
    ]
  }
];
