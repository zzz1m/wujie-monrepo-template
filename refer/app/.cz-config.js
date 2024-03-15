'use strict'
module.exports = {
  types: [
    { value: '✨新增', name: '新增:    新的内容' },
    { value: '🐛修复', name: '修复:    修复一个Bug' },
    { value: '📝文档', name: '文档:    变更的只有文档' },
    { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
    { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '⚡️性能', name: '性能:    提升性能' },
    { value: '✅测试', name: '测试:    添加一个测试' },
    { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: '⏪回滚', name: '回滚:    代码回退' }
  ],
  scopes: [
    { name: 'vue生态相关' },
    { name: 'js函数和工具' },
    { name: 'css等样式' },
    { name: 'image等静态资源' },
    { name: '组件库等三方资源' },
    { name: '分支协作管理' },
    { name: '工程化配置' },
    { name: '文档等辅助能力完善' }
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '提交说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '请输入 wiki/jira 地址(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)'
  },
  allowCustomScopes: true,
  skipQuestions: ['body', 'footer'],
  allowBreakingChanges: ['特性', '修复'],
  // limit subject length
  subjectLimit: 100
}
