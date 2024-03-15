/**
 * 高级查询过滤器
 */

// 字段类型枚举值说明
/**
 * 1001 单行文本    1002 多行文本    1003 下拉单选    1004 下拉多选
 * 1005 数字       1006 金额        1007 手机号     1008  身份证
 * 1009 图片       1010 附件        1011 邮箱       1012 布尔值
 * 1013 部门选择    1015 员工选择
 * 1017 地区定位    1018 日期
 */

// 字段规则
export const FIELDRULES = [
  { value: '1', label: '包含', dependencies: [1001, 1002] },
  { value: '2', label: '不包含', dependencies: [1001, 1002] },
  { value: '3', label: '属于', dependencies: [1003, 1004, 1013, 1015] },
  { value: '4', label: '不属于', dependencies: [1003, 1004, 1013, 1015] },
  { value: '5', label: '=', dependencies: [1001, 1002, 1005, 1006, 1007, 1008, 1011, 1012, 1013, 1015, 1018] },
  { value: '6', label: '≠', dependencies: [1001, 1002, 1005, 1006, 1007, 1008, 1011, 1012, 1013, 1015, 1018] },
  { value: '7', label: '>', dependencies: [1005, 1006, 1018] },
  { value: '8', label: '≥', dependencies: [1005, 1006, 1018] },
  { value: '9', label: '<', dependencies: [1005, 1006, 1018] },
  { value: '10', label: '≤', dependencies: [1005, 1006, 1018] },
  { value: '11', label: '介于', dependencies: [1018] },

  // 注意：以下为特殊定制： 包含/不包含 =/≠
  { value: '16', label: '包含', dependencies: [1003, 1004] },
  { value: '17', label: '不包含', dependencies: [1003, 1004] },
  { value: '16', label: '=', dependencies: [1017] },
  { value: '17', label: '≠', dependencies: [1017] },

  // 注意：以下为全局共用
  { value: '12', label: '为空', global: true },
  { value: '13', label: '不为空', global: true }
];

// 错误提示信息
export const ERRORMSG = {
  code_0: '',
  code_1: '内容不能为空',
  code_2: '格式不正确',
  code_3: '精度不正确'
};

// 日期变量
export const DATEVAR = [
  {
    value: '$curr_day',
    name: '当日',
    rules: [{ regulation: ['yyyy-MM-dd'] }]
  },
  {
    value: '$last_day',
    name: '昨日',
    rules: [{ regulation: ['yyyy-MM-dd'] }]
  },
  {
    value: '$curr_month',
    name: '当月',
    rules: [{ regulation: ['yyyy-MM'] }, { regulation: ['yyyy-MM-dd'], ruleids: [11] }]
  },
  {
    value: '$last_month',
    name: '上月',
    rules: [{ regulation: ['yyyy-MM'] }, { regulation: ['yyyy-MM-dd'], ruleids: [11] }]
  },
  {
    value: '$last3_month',
    name: '近3个月',
    rules: [
      { regulation: ['yyyy-MM', 'yyyy-MM-dd'], ruleids: [11] } // 范围
    ]
  }
];

// 生成一条条件（且）
export const createFilterByAnd = function () {
  // 基本配置
  return {
    // 对象
    fieldGroupId: '',
    fieldGroupName: '',
    fieldGroupStatus: 0, // 0 正常  1 异常
    // 字段
    fieldId: '',
    fieldName: '',
    fieldStatus: 0, // 0 正常  1 异常
    filedConfig: {
      // 字段的配置信息
      fieldType: '', // 字段类型
      maxLength: '', // 字符长度
      dictType: '', // 枚举值编号
      defaultValue: '', // 默认值
      regulation: '', // 精度
      remark: '', // 备注
      limit: '5 * 1024', // 图片大小，默认：5M
      staffRecordAllowed: false // 员工个人档案权限 0无权限  1可见  2可编辑 ......
    },
    // 规则
    ruleId: '',
    ruleName: '',
    ruleStatus: 0, // 0 正常  1 异常
    // 关联值
    value: '',
    metaValue: '',
    addedValue: '', // 附加值
    metaAddedValue: '',
    status: 0, // 错误码
    addedStatus: 0 // 附加信息错误码
  };
};
// 生成一组条件（或）
export const createGroupFilterByOr = function () {
  const item = createFilterByAnd();
  return [item];
};

// 字段类型规则
export const fieldRulesByType = function (fieldType = '') {
  return FIELDRULES.filter((item) => {
    return item.global || item.dependencies.find((item) => item == fieldType);
  });
};
