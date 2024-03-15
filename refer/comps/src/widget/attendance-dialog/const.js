export const types = {
  vacation: {
    name: '休假',
    title: '休假申请'
  },
  publicout: {
    name: '公出',
    title: '公出申请'
  },
  'stay-home': {
    name: '防疫-居家',
    title: '防疫-居家申请',
    typeName: '公出'
  },
  special: {
    name: '特殊考勤',
    title: '特殊考勤申请'
  },
  appeal: {
    name: '补卡',
    title: '补卡申请'
  }
};

export const TableCols = [
  {
    code: 'addTime',
    name: '申请时间',
    width: 120
  },
  {
    code: 'appealType',
    name: '申请类型',
    width: 100
  },
  {
    code: 'applyContent',
    name: '申请内容',
    width: 220
  },
  {
    code: 'totalTimeStr',
    name: '时长',
    hideTip: true,
    width: 100
  },
  {
    code: 'progressCell',
    name: '目前进度',
    hideTip: true,
    width: 100
  },
  {
    code: 'operation',
    name: '操作',
    hideTip: true,
    width: 120
  }
];

export const SpTableCols = [
  {
    code: 'launchTime',
    name: '申请时间',
    width: 120
  },
  {
    code: 'processTypeName',
    name: '申请类型',
    width: 100
  },
  {
    code: 'processName',
    name: '申请内容',
    width: 220
  },
  {
    code: 'currentNodeName',
    name: '目前进度',
    hideTip: true,
    width: 100
  },
  {
    code: 'operation',
    name: '操作',
    hideTip: true,
    width: 120
  }
];

// 假期余额
export const vacationMap = {
  1: {
    key: '1',
    title: '法定年休假',
    unit: '天',
    icon: 'attendance-aircraft',
    hicon: 'attendance-aircraft-old-white',
    bgColor: '#F4F5FF',
    borderColor: '#6D7EFF',
    g1: '#9CACFF',
    g2: '#6374FF'
  },
  10: {
    key: '10',
    title: '奖励假',
    unit: '天',
    icon: 'attendance-jiangli',
    hicon: 'attendance-jiangli-white',
    bgColor: '#FFF9F4',
    borderColor: '#FF9868',
    g1: '#FFA775',
    g2: '#FF6E41'
  },
  18: {
    key: '18',
    title: '女性带薪 (姨妈) 假',
    unit: '天',
    icon: 'attendance-yima',
    hicon: 'attendance-yima-white',
    bgColor: '#FDF8FF',
    borderColor: '#A76EFF',
    g1: '#BF87FF',
    g2: '#8A4FFE'
  },
  21: {
    key: '21',
    title: '育儿假',
    unit: '天',
    icon: 'attendance-yue',
    hicon: 'attendance-yue-white',
    bgColor: '#FFF7F6',
    borderColor: '#FC6570',
    g1: '#FE8B97',
    g2: '#FC525E'
  },
  11: {
    key: '11',
    title: '调休假',
    unit: '天',
    icon: 'attendance-compensatory-leave',
    hicon: 'attendance-compensatory-leave-white',
    bgColor: '#EFFBF1',
    borderColor: '#55C664',
    g1: '#67D979',
    g2: '#47B853'
  },
  20: {
    key: '22',
    title: '防疫-居家',
    unit: '天',
    icon: 'attendance-protect-green',
    hicon: 'attendance-protect-green-white',
    bgColor: '#EFFCF8',
    borderColor: '#3CD19E',
    g1: '#4BDDB3',
    g2: '#2DC588'
  }
};
