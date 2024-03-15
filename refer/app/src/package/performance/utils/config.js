export const SCORE_LIST = [
    { label: '5档', value: 5 },
    { label: '4档', value: 4 },
    { label: '3档', value: 3 },
    { label: '2档', value: 2 },
    { label: '1档', value: 1 }
];
export const CLASS_LIST = [
    {
        code: 'A',
        name: 'A'
    },
    {
        code: 'A-',
        name: 'A-'
    },
    {
        code: 'B+',
        name: 'B+'
    },
    {
        code: 'B',
        name: 'B'
    },
    {
        code: 'C+',
        name: 'C+'
    },
    {
        code: 'C',
        name: 'C'
    }
]
const EVALUATION_TYPES = {
    'SELF': '本人自评',
    'SUBORDINATE': '下级评价',
    'COOPERATE': '协作方评价',
    'COOPERATE2': '协作方评价'
};
export const HEADER_DESCRIPTION_MAP = {
    'COOPERATE': '您好，基于被评价人与您工作中的协作/专业汇报关系，请您根据实际情况和您了解的真实信息，对被评价人今年工作表现进行客观、全面的评价。此内容仅被评价人的直接上级可见，被评价人不可见。您的评价内容对被评价人的个人发展、我厂人才管理都有重要意义，感谢您的参与和支持！',
    'COOPERATE2': '您好，基于被评价人与您工作中的协作/专业汇报关系，请您根据实际情况和您了解的真实信息，对被评价人今年工作表现进行客观、全面的评价。此内容仅被评价人的直接上级可见，被评价人不可见。您的评价内容对被评价人的个人发展、我厂人才管理都有重要意义，感谢您的参与和支持！'
};

export const INIT_FILL_LIST = [
    {
        commentId: '',
        type: 'workSummary',
        item: '工作总结',
        comment: '',
        twType: ''
    },
    {
        commentId: '',
        type: 'advantage',
        item: '优点：',
        comment: '',
        twType: ''
    },
    {
        commentId: '',
        type: 'shortage',
        item: '不足：',
        comment: '',
        twType: ''
    },
    {
        commentId: '',
        type: 'proposal',
        item: '发展规划/建议：',
        comment: '',
        twType: ''
    }
];

export const tabs2022 = [
    {
        label: '全部',
        value: ''
    },
    {
        label: '类型一',
        value: 'role_one'
    },
    {
        label: '类型二',
        value: 'role_two'
    }
];
export const STANDARD_LIST_TWO = [
    {
        value: '【A】卓越',
        label: '价值观优秀且业绩超出预期'
    },
    {
        value: '【A-】优秀',
        label: '价值观良好且业绩超出预期'
    },
    {
        value: '【B+】部分超预期',
        label: '价值观良好且业绩部分超出预期，或符合价值观且业绩超出预期'
    },
    {
        value: '【B】符合预期',
        label: '符合价值观且业绩符合预期'
    },
    {
        value: '【C+】部分不符合预期',
        label: '符合价值观但业绩需要改进'
    },
    {
        value: '【C】不符合预期',
        label: '符合价值观但业绩不符合预期，或不符合价值观'
    }
];
export const STANDARD_LIST_ONE = [
    {
        value: '【A】卓越',
        label: '解决问题显著超出目标期望/岗位要求，有重大突破或创新，规则意识强，工作投入高，是团队杰出代表'
    },
    {
        value: '【A-】优秀',
        label: '解决问题显著超出目标期望/岗位要求，规则意识良好，工作投入高，是团队学习标杆'
    },
    {
        value: '【B+】部分超预期',
        label: '解决问题部分超出目标期望/岗位要求，规则意识良好，工作投入良好，超出团队成员的平均水平'
    },
    {
        value: '【B】符合预期',
        label: '解决问题符合目标期望/岗位要求，规则意识良好，工作投入良好，团队成员的应有水平'
    },
    {
        value: '【C+】部分不符合预期',
        label: '解决问题部分不符合目标期望/岗位要求，或规则意识不足，或工作投入不足，存在一定差距'
    },
    {
        value: '【C】不符合预期',
        label: '解决问题不符合目标期望/岗位要求，或规则意识与工作投入度均不足'
    }
];