/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 字段说明 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * 说明的内容只是方便理解，不可作为编码逻辑引用 * * * * * * * * * * * * * * *  
 */

const any = 1;
const id1 = 1;
const id2 = 2;
const code = 1;

const DATA_INSTRUCTIONS = {
    // 共有的逻辑
    parentId: '父级控件id', // 
    id: '控件唯一标识', // 控件的唯一标识别，【前端随机生成】
    code: 'basic_radio', // 控件编码，由【接口返回】=》 前端只有在【套件/关联数据】进行业务数据填充的时候使用
    role: [[ ROLE_LISTS ]], // 控件角色，由前端定义好后交给后端存储在数据库里
    roleName: '控件归属的角色名称',  
    type: [[ TYPE_LISTS ]], // 控件类型，由前端定义好后交给后端存储在数据库里
    title: '控件展示的标题',
    titleLimit: '标题限制字数', // 默认 1000
    hasInstructions: '是否开启题干说明', // 布尔型，=== 严格判断 默认false
    instructions: '题干说明',
    instructionsLimit: '题干说明限制字数', // 默认 1000
    showSerial: '是否展示序号', // 布尔型，=== 严格判断 默认false
    serialStrategy: '序号展示策略',// 数字 1 连续序号 / 2 从1开始
    serialNo: '控件序列号', // todo 迁移到viewmodel 里维护
    required: '是否必填', // 布尔型，=== 严格判断
    hidden: '是否隐藏', //  布尔型，=== 严格判断 默认 false

    width: '控件占比', // 数字型 25 / 50 / 75/ 100

    // 仅 type in [ 'fill' ] 有
    size: '输入框大小',// S L 默认：L
    ruleName: '格式的名称', // 数字/字母/中文/email/手机号/网址/身份证
    fillRule: '格式校验', // -1 不限 /数字/字母/中文/email/手机号/网址/身份证
    lengthMin: '最少填写数', 
    lengthMax: '最多填写数',
    placeholder: '默认输入框内提示文案',  
    placeholderLimit: '默认输入框内提示文案限制字数',  // 默认 1000

    numberFormat: '数字格式', // integer=整数/decimal=小数
    decimal: '小数点后几位', // 数字
    numberMax: '最大值', // 整数
    numberMin: '最小值', // 整数

    // 仅 type in [ 'radio', 'checkbox' ] 有
    options: /*选项*/[ 
        {
            code: '选项唯一编码', // 唯一标识别，【前端随机生成】
            label: '选项文案',
            hasExplain: '是否有选项说明', // 布尔型，=== 严格判断, 默认为false 
            explain: '选项说明', 
            explainLimit: '选项说明字数限制', // 默认 1000 不填为null
            hasExtra: '选项是否添加填空框', // 布尔型，=== 严格判断, 默认为false
            extra: '辅助填空信息',
            hasExtraLimit: '辅助填空信息是否有字数限制', // 布尔型，=== 严格判断, 默认为false
            extraRequired: '辅助填空信息是否必填', // 布尔型，=== 严格判断, 默认为false
            extraLimit: '辅助填空信息限制字数', // 最大 9999
            extraRule: '格式校验', // -1 不限 /数字/字母/中文/email/手机号/网址/身份证
            ruleName: '格式的名称' // 数字/字母/中文/email/手机号/网址/身份证	
        }
    ],

    // 仅 type in ['checkbox'] 有
    selectedMin: '最少选择的选项数', // 默认 不限 -1
    selectedMax: '最多选择的选项数', // 默认 不限 -1

    // 仅 type in ['score'] 有
    scoreMin: '起始分数', // 默认 0
    scoreMax: '结束分数', // 默认 5
    scoreTipsLimit: '提示文字限制字数', // 默认 10
    scoreTipsLeft: '左边提示文字', 
    scoreTipsCenter: '中间提示文字',
    scoreTipsRight: '右边提示文字',

    // 仅 type in ['date', 'date-range'] 有
    format: '日期格式', // yyyy-MM-dd(默认) yyyy-MM-dd HH:mm  

    // 仅 type in ['attachment'] 有
    suffix: '文件后缀', // 默认：['.png', '.jpg', '.jpeg', '.doc', '.docx', '.pdf', '.xls', '.xlsx']
    singleSizeLimit: '单个文件限制大小',// 默认：10 * 1024 * 1024
    totalLimit: '总文件个数限制', // 默认 10

    // 仅 type in ['columns'] 有
    children: /*分栏布局的分割策略*/[
        { splits: 5, id: '' },
        { splits: 5, id: '' }
    ],

    // 仅 type in ['oneself','superior','junior','collaboration', 'custom'] 有
    multiple: '是否允许添加多个', // 布尔型，=== 严格判断, 默认为false
    labelName: '姓名label', // 默认 员工姓名/直属上级/下级/协作人员 
    labelTime: '时间label', // 默认 访谈时间
    children: /*自定义控件*/[
        { id: '' }, // 信息与基本信息model一致
        { type: 'evaluation' } // 评估建议组件，不可删除！！
    ], 

    // 仅 role in ['relation-interview-basicinfo-multiple'] 有
    multiple: '展示数据条目',// 布尔型，=== 严格判断, 默认为true
    dataFilter: '数据过滤条件', // 高级查询组件
    fieldsList: /*关联字段列表*/[
        { code, label: '' }
    ],
    fillStyle: '填写样式',// 1 表格（默认） 2 列表
    printStyle: '打印样式' // 1 横向（默认）  2 纵向  注意：纵向的时候需要根据数据生成多条

};

/**
 * role类型说明
 */
const ROLE_LISTS = [
    // 基础控件
    'layout'/*布局*/, 'choose'/*选择*/,  'write'/*填写*/,  'score'/*打分*/,  
    'date'/*日期*/,  'unclassified'/*其它*/, 

    // 套件
    'group-interview'/*访谈*/, 

    // 关联数据
    'relation-interview-basicinfo-single'/*访谈-员工信息-单子集*/,
    'relation-interview-basicinfo-multiple'/*访谈-员工信息-多子集*/,
    'relation-interview-order'/*访谈-访谈信息*/,
    'relation-interview-approval'/*访谈-审批单*/
];

/**
 * type类型说明
 */
const TYPE_LISTS = [
    // 基础控件
    'columns'/*分栏*/, 'radio'/*单选*/,  'checkbox'/*多选*/,  'fill'/*填空*/,  'score'/*打分*/,  
    'date'/*日期*/, 'date-range'/*日期范围*/, 'remark'/*标题/备注*/,  'attachment'/*附件*/,

    /**
     * 套件
     */
    // 访谈
    'oneself'/*本人角色*/, 'superior'/*直属上级*/,  'junior'/*下级角色*/,  'collaboration'/*协作方角色*/,  
    'custom'/*自定义角色*/,  'assessment'/*评估意见*/, 

    /**
     * 关联数据
     */
    // 访谈


    /**
     * 未分类
     */
    'evaluation'/*评估建议*/
];


/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 相关模型 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
 */
const viewerModel = /*视图模型*/[
    { id: 'aaaaaa', serialNo: 1 },
    { 
        id: 'bbbbbb', 
        serialNo: '',
        children: [
            { id: '333333' },
            { id: '444444' }
        ]
    },
    {  // 套件
        id: 'cccccc', 
        serialNo: '',
        children: [
            { id: '555555' },
            { id: '666666' },
            { // 分栏
                id: '777777',
                children: [
                    { id: '888888' },
                    { id: '999999' }
                ] 
            }
        ]
    },
    { 
        id: 'copy_cccccc', 
        copyId: 'cccccc', // 复制的套件id
        serialNo: 1,
        children: [
            { id: 'copy_555555', copyId: '555555' },
            { id: 'copy_666666', copyId: '666666' },
            { // 复制的分栏控件
                id: 'copy_777777', copyId: '777777',
                children: [
                    { id: 'copy_888888', copyId: '888888' },
                    { id: 'copy_999999', copyId: '999999' }
                ]
            }
        ]
    }
];

const configModel = /*配置模型*/{
    '1111111': {}, // ...相关配置信息
    '2222222': {}, // ...相关配置信息
    '333333': {}, // ...相关配置信息
    '444444': {} // ...相关配置信息
};



const paramModel /*参数模型*/ = /*对象形式*/{
    '填空/打分/日期': {
        value: 'value-string'
    },
    '单选': {
        value: {
            optionId: '',
            extra: ''
        }
    },
    '多选': {
        value:[{
            optionId: '',
            extra: ''
        }]
    },
    '时间范围': {
        value: ['value-item1', 'value-item2'] // 如日期区间、多选
    },
    '套件': { // 套件
        value: {
            'key1': any,
            'key2': any
        }
        
    },
    '套件分栏的子控件': { // 套件 | 分栏 的子控件
        parentId: '',
        copyId: '', // 当前控件来源于那个被拷贝的控件
        value: any    // 根据子组件类型决定 比如单选 {value: {optionId: '',extra: ''}}、填空   { value: 'value-string' }
    },
    '套件': { // 套件(新增)
        copyId: '', //
        sort: 0, // 代表先后顺序 从0开始递增
        value: {
            'key1': any,
            'key2': any
        }
    },
    '单子集/访谈信息/审批单': {
        value: 'value-string'   // 单子集多子集值展示 显示的字符串
    },
    '多子集': {
        value:[{code: 'name'}]
    }
}; 

/*数组形式 不用此模型，只是设计时参考比较用*/ 
// [
//     { id: '1111111', value: '
//     ' },
//     { 
//         id: '2222222', value: '', 
//         children: [
//             { id: '', value: '' }
//         ] 
//     }
// ];


const relationGroupList /* 关联模型 - 存储/编辑 */ = [
    {
        id: 'relation_group_3b9d-6d84-4d32-a14a-c6fc', // 关联组id
        widgetType: 'group-interview_assessment_bc84-357e-4bef-8706-edfb', // 套件id -1 为通用控件
        strategy: '策略', // 1 匹配任何 2 匹配全部
        conditions: [
            {
                id: 'id',
                conditionId: '条件题目id',
                logic: '触发逻辑', // 1 选择 2 未选择
                optionId: '选项的id' /*多选题为数组*/
            }
        ],
        showlist: [
            {
                id: 'id',
                showItemId: '结果题目id',
                logic: '题目的逻辑'// 1 显示  2 跳转
            }
        ]
    }
];

// 所有参与关联的条件
const sortIdList = {
    '条件id1': {
        showList: ['控件id1', '控件id2'],
        optionIdList: ['选项id1', '选项id2'],
        relationGroupList: ['关联组id1', '关联组id2']
    }
};

// 所有结果所关联的关联组设置
const showItemMap = {
    '结果id3': ['关联组id1', '关联组id2'],
    '结果id4': ['关联组id3', '关联组id4']
};

// 无用可删除
// 关联模型实际在页面交互中的模型
// 假如：选项有abcdef
// 选中ad并且未选中bc -> 选项里有ad，且不能出现bc中的任意1个，如：ad,ade,adf,adef等都是可以的
// 未选中bc -> 选项里不能出现bc中的任意1个，即[adef]的任意非空组合
const relationModel = {
    // 任一、选中 uuduududu-any-checked-11,33,22
    'id1*any*checked*values': {
        resetConditions: null, sort: 101, showlist: [{id1},{id2}]
    },
    // 任一、未选中
    'id2*any*unchecked*values': {
        resetConditions: null, sort: 102, showlist: [{id1},{id2}]
    },
    // ...更多策略规则

    // 全部、选中
    'id3*all*checked*values': [
        { resetConditions: [/*其它条件选项*/], sort: 103, showlist: [{id1},{id2}] }
    ],
    // 全部、未选中
    'id4*all*unchecked*values': [
        { resetConditions: [/*其它条件选项*/], sort: 104, showlist: [{id1},{id2}] }
    ]
};

// 排序 & 关联条件
```
1、控件作为条件
    前移：是否在（m,n）间某一条件的结果
    后续：是否有（m,n）的结果依赖它

2、控件作为结果：
    迁移：是否在（m,n）间某一条件的结果
    后移：没影响

3、既没有作为条件 & 也不作为结果 - 自由移动

4、如果可以成功排序：
    - 更新 sortIdList 对应的条件 idx
        - 前移：(m，n)间的条件 idx+1
        - 后移：(m，n)间的条件 idx-1
5、子视图跳出组合1，进入主视图 ｜ 子视图跳出组合1，进入另外组合2 ｜  某一个控件从主视图进入组合1

```



```
分工如下：

基础数据维护 & 全局把控 @光
    - const.js
    - data-explain.js
    - tools.js

- 关联关系管理 @振举 
    - relation.js
    - watcher.js



- 表单填写 & 预览 @小龙
    - param.js
    - validator.js

- 模版创建 @马凯
    - model.js
    - viewer.js
    - template-create-validator.js

    
- 其它业务 @靳强

```;


