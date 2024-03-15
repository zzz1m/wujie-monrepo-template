/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * type 元数据来维护，禁止硬编码 * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*/

// 角色定义
export const ROLE_LAYOUT = 'basic-layout';
export const ROLE_CHOOSE = 'basic-choose';
export const ROLE_WRITE = 'basic-write';
export const ROLE_SCORE = 'basic-score';
export const ROLE_DATE = 'basic-date';
export const ROLE_UNCLASSIFIED = 'basic-unclassified';
export const ROLE_GROUP_INTERVIEW = 'group-interview';
export const ROLE_GROUP_PROMOTION = 'group-promotion';
export const ROLE_RELATION_INTERVIEW_BASIC_SINGLE = 'relation-interview-basicinfo-single';
export const ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE = 'relation-interview-basicinfo-multiple';
export const ROLE_RELATION_INTERVIEW_ORDER = 'relation-interview-order';
export const ROLE_RELATION_INTERVIEW_APPROVAL = 'relation-interview-approval';

export const ROLE_RELATION_PROMOTION_INFO = 'relation-promotion-info';
export const ROLE_RELATION_PROMOTION_BASIC_SINGLE = 'relation-promotion-basicinfo-single';
export const ROLE_RELATION_PROMOTION_BASIC_MULTIPLE  = 'relation-promotion-basicinfo-multiple';

// 基础控件类型
export const TYPE_BASIC_COLUMNS = 'columns';
export const TYPE_BASIC_RADIO = 'radio';
export const TYPE_BASIC_CHECKBOX = 'checkbox';
export const TYPE_BASIC_FILL = 'fill';
export const TYPE_BASIC_SCORE = 'score';
export const TYPE_BASIC_DATE = 'date';
export const TYPE_BASIC_DATE_RANGE = 'date-range';
export const TYPE_BASIC_REMARK = 'remark';
export const TYPE_BASIC_ATTACHMENT = 'attachment';

// 套件 - 访谈
export const TYPE_GROUP_INTERVIEW_ONESELF = 'oneself';
export const TYPE_GROUP_INTERVIEW_SUPERIOR = 'superior';
export const TYPE_GROUP_INTERVIEW_JUNIOR = 'junior';
export const TYPE_GROUP_INTERVIEW_COLLABORATION = 'collaboration';
export const TYPE_GROUP_INTERVIEW_ASSESSMENT = 'assessment';
export const TYPE_GROUP_INTERVIEW_CUSTOM = 'custom';
export const TYPE_GROUP_INTERVIEW_TARGET = 'target';  // 目标信息

// 套件 - 晋升
export const TYPE_GROUP_PROMOTION_ESTIMATE = 'estimate';

// 其它
export const TYPE_ELSE_EVALUATION = 'evaluation'; // 评估建议


// 模块
export const MODULE_INTERVIEW = 'interview';
export const MODULE_PROMOTION = 'promotion';

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 配置相关元数据，禁止硬编码 * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*/
export const STRATEGY_SERIAL_CONTINUOUS = 1; // 连续序号
export const STRATEGY_SERIAL_RESTART = 2; // 从1开始
export const STRATEGY_SERIAL_LIST = [
    { label: '连续序号', value: STRATEGY_SERIAL_CONTINUOUS },
    { label: '从1开始', value: STRATEGY_SERIAL_RESTART }
];

export const SIZE_SMALL = 'S'; // 小
export const SIZE_NORMAL = 'M'; // 正常
export const SIZE_LARGE = 'L'; // 大
export const SIZE_LIST = [
    { label: '小', value: SIZE_SMALL },
    { label: '大', value: SIZE_LARGE }
];

export const RULE_NO_LIMIT = -1;// 不限
export const RULE_NUMBER = 'number'; // '^\\d+$';// 数字
export const RULE_LETTER = '^[a-zA-Z]+$';// 字母
export const RULE_CHINESE = '^[\u4e00-\u9fa5\n\u3000-\u303f\uff01-\uff0f\uff1a-\uff20\uff3b-\uff40\uff5b-\uff65]+$';// 中文 （汉字，标点符号、中文）
// export const RULE_CHINESE = '^[^\\x00-\\xff]+$';// 双字节字符
export const RULE_EMAIL = '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*';// 邮件
export const RULE_PHONE = '^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$';// 手机号
export const RULE_WEBSITE = '^https?:\\/\\/(([a-zA-Z0-9_-])+(\\.)?)*(:\\d+)?(\\/((\\.)?(\\?)?=?&?[a-zA-Z0-9_-](\\?)?)*)*$';// 网址 - 使用时注意忽略大小写
export const RULE_IDCARD = '^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$';// 身份证
export const RULE_FILL_LIST = [
    { label: '不限', value: RULE_NO_LIMIT },
    { label: '数字', value: RULE_NUMBER },
    { label: '字母', value: RULE_LETTER },
    { label: '中文', value: RULE_CHINESE },
    { label: '邮件', value: RULE_EMAIL },
    { label: '手机号', value: RULE_PHONE },
    { label: '网址', value: RULE_WEBSITE },
    { label: '身份证', value: RULE_IDCARD }
];
//文件后缀
export const RULE_FILE_SUFFIX = function(){
    return ['.png', '.jpg', '.jpeg', '.doc', '.docx', '.pdf', '.xls', '.xlsx'];
};

export const STYLE_FILL_TABLE = 1;// 填写样式-表格
export const STYLE_FILL_LIST = 2;// 填写样式 - 列表
// export const STYLE_FILL_LIST = [
//     { label: '表格', value: STYLE_FILL_TABLE },
//     { label: '列表', value: STYLE_FILL_LIST },
// ];

export const STYLE_PRINT_HORIZONTAL = 1;// 打印-水平
export const STYLE_PRINT_VERTICAL = 2;// 打印-垂直
export const STYLE_PRINT_LIST = [
    { label: '水平', value: STYLE_PRINT_HORIZONTAL },
    { label: '垂直', value: STYLE_PRINT_VERTICAL }
];

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 关联相关元数据，禁止硬编码 * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*/
export const STRATEGY_RELATION_ANY = 1; // 匹配任何
export const STRATEGY_RELATION_ALL = 2; //  匹配全部
export const STRATEGY_RELATION_OPTIONS = [
    { label: '匹配任何', value: STRATEGY_RELATION_ANY },
    { label: '匹配全部', value: STRATEGY_RELATION_ALL }
];

export const STRATEGY_CONDITION_SELECT = 1; // 选择
export const STRATEGY_CONDITION_UNSELECT = 2; //  未选择
// export const STRATEGY_CONDITION_SHOW = 3; //  显示
// export const STRATEGY_CONDITION_UNSHOW = 4; //  未显示
export const SELECT_TYPE_LIST = [TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX];
export const STRATEGY_CONDITION_SELECT_LIST = [STRATEGY_CONDITION_SELECT, STRATEGY_CONDITION_UNSELECT];
export const STRATEGY_CONDITION_OPTIONS = [
    { label: '选择', value: STRATEGY_CONDITION_SELECT, types: SELECT_TYPE_LIST },
    { label: '未选择', value: STRATEGY_CONDITION_UNSELECT, types: SELECT_TYPE_LIST }
    // { label: '显示', value: STRATEGY_CONDITION_SHOW },
    // { label: '未显示', value: STRATEGY_CONDITION_UNSHOW }
];

export const STRATEGY_SHOW_VISIBLE = 1; //  显示
export const STRATEGY_SHOW_JUMP = 2; //  跳转
export const STRATEGY_SHOW_OPTIONS = [
    { label: '显示', value: STRATEGY_SHOW_VISIBLE, tip: '，否则不显示' }
    // { label: '跳转', value: STRATEGY_SHOW_JUMP, tip: '，否则进入下一题' }
];


export const STRATEGY_WIDTH_PERCENT = [
    { label: '25%', value: 25 },
    { label: '50%', value: 50 },
    { label: '75%', value: 75 },
    { label: '100%', value: 100 }
];

export const STRATEGY_DATE_FORMAT = [
    { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd'},
    { label: 'yyyy-MM-dd HH:mm', value: 'yyyy-MM-dd HH:mm'}
];

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 参数字段说明 * * * * * * * * * * * * * * * * * * * * * * *  
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
 */

export const PARAM_COMMON_VALUE_CODE = 'value'; // 共用用于存储值的字段
export const PARAM_SELECT_OPTION_CODE = 'optionId'; // 选项
export const PARAM_SELECT_OPTION_INFORMATION_CODE = 'extra'; // 补充信息

export const PARAM_GROUP_INTERVIEW_STAFF_CODE = 'userId'; // 用户id
export const PARAM_GROUP_INTERVIEW_TIME_CODE = 'interviewTime'; // 访谈时间
export const PARAM_GROUP_INTERVIEW_ADVICE_CODE = 'advice'; // 评估建议
export const PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE = 'adviceList'; // 评估建议list
export const PARAM_GROUP_INTERVIEW_SUGGEST_CODE = 'suggest'; // 评估意见
export const PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE = 'evaluateDate'; // 访谈结果日期


// 基本控件列表 
export const BASIC_COMP = [
    {
        name: '布局控件',
        role: ROLE_LAYOUT,
        comps: [
            { type: TYPE_BASIC_COLUMNS, name: '分栏' }
        ]
    },
    {
        name: '选择控件',
        role: ROLE_CHOOSE,
        comps: [
            { type: TYPE_BASIC_RADIO, name: '单选框' },
            { type: TYPE_BASIC_CHECKBOX, name: '多选框' }
        ]
    },
    {
        name: '填空',
        role: ROLE_WRITE,
        comps: [
            { type: TYPE_BASIC_FILL, name: '填空' }
        ]
    },
    {
        name: '打分',
        role: ROLE_SCORE,
        comps: [
            { type: TYPE_BASIC_SCORE, name: '打分' }
        ]
    },
    {
        name: '日期时间',
        role: ROLE_DATE,
        comps: [
            { type: TYPE_BASIC_DATE, name: '日期' },
            { type: TYPE_BASIC_DATE_RANGE, name: '日期范围' }
        ]
    },
    {
        name: '其他',
        role: ROLE_UNCLASSIFIED,
        comps: [
            { type: TYPE_BASIC_REMARK, name: '标题/备注' },
            { type: TYPE_BASIC_ATTACHMENT, name: '附件' }
        ]
    }
];

export const RELATION_ROLE_MAP = {
    single: ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
    multi: ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE,
    interview: ROLE_RELATION_INTERVIEW_ORDER,
    approve: ROLE_RELATION_INTERVIEW_APPROVAL,
    promotion: ROLE_RELATION_PROMOTION_INFO
};

export const RELATION_ROLE_MAP_ID = {
    interview: {
        single: ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
        multi: ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE,
        interview: ROLE_RELATION_INTERVIEW_ORDER,
        approve: ROLE_RELATION_INTERVIEW_APPROVAL
    },
    promotion: {
        single: ROLE_RELATION_PROMOTION_BASIC_SINGLE,
        multi: ROLE_RELATION_PROMOTION_BASIC_MULTIPLE,
        promotion: ROLE_RELATION_PROMOTION_INFO
    }
};

export const RELATION_CODE_MAP = {
    single: 'single',
    multi: 'multiple',
    interview: 'order',
    approve: 'approval'
};

// export const GROUP_COMP = [
//     {
//         name: '访谈',
//         role: ROLE_GROUP_INTERVIEW,
//         comps: [
//             { type: TYPE_GROUP_INTERVIEW_ONESELF, name: '本人角色' },
//             { type: TYPE_GROUP_INTERVIEW_SUPERIOR, name: '直属上级' },
//             { type: TYPE_GROUP_INTERVIEW_JUNIOR, name: '下级角色' },
//             { type: TYPE_GROUP_INTERVIEW_COLLABORATION , name: '协作方角色' },
//             { type: TYPE_GROUP_INTERVIEW_CUSTOM, name: '自定义角色' },
//             { type: TYPE_GROUP_INTERVIEW_ASSESSMENT, name: '评估意见' }
//         ]
//     }
// ];

// export const RELATION_COMP = [
//     {
//         name: '员工基本信息-单子集',
//         role: ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
//         comps: [
//             { name: '姓名', type: 'name'},
//             { name: '员工编号', type: 'userno' }
//         ]
//     },
//     {
//         name: '员工基本信息-多子集',
//         role: ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE,
//         comps: [
//             { name: '异动信息', type: 'errorinfo' },
//             { name: '教育经历', type: 'eduinfo'}
//         ]
//     },
//     {
//         name: '访谈信息',
//         role: ROLE_RELATION_INTERVIEW_ORDER,
//         comps: [
//             { name: '拟晋岗位', type: 'jobinfo'},
//             { name: '评估启动日期', type: 'startdate' }
//         ]
//     },
//     {
//         name: '审核单',
//         role: ROLE_RELATION_INTERVIEW_APPROVAL,
//         comps: [
//             { name: '最后工作日期', type: 'lastdate' },
//             { name: '真实离职类型', type: 'typeoff' }
//         ]
//     }
// ];


export const TOOL_BAR = [
    { label: '控件', name: 'basic' },
    { label: '套件', name: 'group' },
    { label: '关联数据', name: 'relation' }
];

export const MODULE_NAME = {
    interview: '访谈',
    promotion: '晋级'
};

export const INTERVIEW_NAME_MAP = {
    [TYPE_GROUP_INTERVIEW_ONESELF]: '本人角色',
    [TYPE_GROUP_INTERVIEW_SUPERIOR]: '直属上级',
    [TYPE_GROUP_INTERVIEW_JUNIOR]: '下级角色',
    [TYPE_GROUP_INTERVIEW_COLLABORATION]: '协作方角色',
    [TYPE_GROUP_INTERVIEW_CUSTOM]: '自定义角色',
    [TYPE_GROUP_INTERVIEW_ASSESSMENT]: '评估意见',
    [TYPE_GROUP_INTERVIEW_TARGET]: '目标信息'
};

export const MODULE_ITEM_NAME = {
    interview: INTERVIEW_NAME_MAP
};

export const INTERVIEW_TYPE_LIST = [
    { label: '首月访谈', value: 1 },
    { label: '转正访谈(3月)', value: 2 },
    { label: '转正访谈(6月)', value: 3 },
    { label: '见习访谈(3月)', value: 4 },
    { label: '见习访谈(6月)', value: 5 },
    { label: '离职访谈', value: 6 },
    { label: '离职回访', value: 7 },
    { label: '晋升访谈', value: 8 }
];

export const allowSameTypes = [
    TYPE_GROUP_INTERVIEW_CUSTOM
];