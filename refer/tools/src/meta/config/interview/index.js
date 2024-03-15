export const EVALUATE_DATE_MAP = {
  1: [
    // 首月访谈
    { code: 2, label: '转正日期', value: '' } // 提前转正
  ],
  2: [
    // 转正3月
    { code: 2, label: '转正日期', value: '' }, // 提前转正
    { code: 3, label: '延期至', value: '' }, // 延长试用
    { code: 5, label: '转正日期', value: '', hasDefault: true } // 同意转正
  ],
  3: [
    // 转正6月
    { code: 2, label: '转正日期', value: '' }, // 提前转正
    { code: 3, label: '延期至', value: '' }, // 延长试用
    { code: 5, label: '转正日期', value: '', hasDefault: true } // 同意转正
  ],
  4: [
    // 见习3月
    { code: 2, label: '见习结束日期', value: '' }, // 提前转正
    { code: 7, label: '延期至', value: '' }, // 延长见习
    { code: 8, label: '见习结束日期', value: '', hasDefault: true } // 同意见习转正
  ],
  5: [
    // 见习6月
    { code: 2, label: '见习结束日期', value: '' }, // 提前转正
    { code: 7, label: '延期至', value: '' }, // 延长见习
    { code: 8, label: '见习结束日期', value: '', hasDefault: true } // 同意见习转正
  ]
};

export const EVALUATE_DATE_LABEL_MAP = {
  2: { code: 2, label: '转正日期', value: '' },                           // 提前转正
  3: { code: 3, label: '延期至', value: '' },                             // 延长试用
  5: { code: 5, label: '转正日期', value: '', hasDefault: true },         // 同意转正
  7: { code: 7, label: '延期至', value: '' },                             // 延长见习
  8: { code: 8, label: '见习结束日期', value: '',  hasDefault: true }         // 同意见习转正
};

export const INTERVIEW_RESULT_LIST = {
  1: [
    // 首月访谈
    { label: '继续试用', value: 1 },
    { label: '提前转正', value: 2 },
    { label: '结束试用，办理离职', value: 4 }
    // {label: '终止', value: 15}
  ],
  2: [
    // 转正访谈 3月
    { label: '继续试用', value: 1 },
    { label: '提前转正', value: 2 },
    { label: '延长试用', value: 3 },
    { label: '同意转正', value: 5 },
    { label: '结束试用，办理离职', value: 4 }
    // {label: '终止', value: 15}
  ],
  3: [
    // 转正 6月
    { label: '提前转正', value: 2 },
    { label: '延长试用', value: 3 },
    { label: '同意转正', value: 5 },
    { label: '结束试用，办理离职', value: 4 }
    // {label: '终止', value: 15}
  ],
  4: [
    // 见习 3月
    { label: '提前转正', value: 2 },
    {label: '继续见习',value: 6},
    { label: '延长见习', value: 7 },
    { label: '同意见习转正', value: 8 },
    { label: '结束见习', value: 9 }
    // {label: '终止', value: 15}
  ],
  5: [
    // 见习 6月
    { label: '提前转正', value: 2 },
    // {label: '继续见习',value: 6},
    { label: '延长见习', value: 7 },
    { label: '同意见习转正', value: 8 },
    { label: '结束见习', value: 9 }
    // {label: '终止', value: 15}
  ],
  6: [
    // 离职访谈
    { label: '完成', value: 10 }
    // {label: '终止', value: 15}
  ],
  7: [
    // 离职回访
    { label: '有回归意愿', value: 11 },
    { label: '无回归意愿', value: 12 }
    // {label: '终止', value: 15}
  ],
  8: [
    // 晋升访谈
    { label: '同意晋升', value: 13 },
    { label: '不予晋升', value: 14 }
    // {label: '终止', value: 15}
  ]
};

export const INTERVIEW_TYPE_LIST = [
  {label: '首月访谈',value: '1'},
  {label: '转正访谈(3月)',value: '2'},
  {label: '转正访谈(6月)',value: '3'},
  {label: '见习访谈(3月)',value: '4'},
  {label: '见习访谈(6月)',value: '5'},
  {label: '离职访谈',value: '6'},
  {label: '离职回访',value: '7'},
  {label: '晋升访谈',value: '8'}
];
