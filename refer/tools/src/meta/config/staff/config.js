// import Status from './leave-abutment/components/status.vue';
// import InterfaceConfig from './leave-abutment/components/interface-config.vue';

export const LEAVE_MANAGEMENT_LIST = [
  {
    prop: 'userName',
    label: '姓名',
    minWidth: 110
  },
  {
    prop: 'userNumber',
    label: '工号',
    minWidth: 120
  },
  {
    prop: 'userNatureName',
    label: '员工性质',
    minWidth: 100
  },
  {
    prop: 'deptName',
    label: '部门',
    minWidth: 200
  },
  {
    prop: 'position',
    label: '岗位',
    minWidth: 220
  },
  {
    prop: 'lastDay',
    label: '最后工作日期',
    minWidth: 140
  },
  {
    prop: 'releaseDate',
    label: '结薪日期/解除日期',
    minWidth: 160
  }
  // {
  //     prop: 'approveState',
  //     label: '审批状态',
  //     minWidth: 120
  // }
];
// export const LEAVE_ABUTMENT = [
//   {
//     prop: 'systemName',
//     label: '接入系统名称',
//     minWidth: 140
//   },
//   {
//     prop: 'handoverListUrl',
//     label: '接口配置',
//     minWidth: 340,
//     showTooltip: false,
//     customEl: InterfaceConfig      // 支持使用组件
//   },
//   {
//     prop: 'manager',
//     label: '系统负责人',
//     minWidth: 110
//   },
//   {
//     prop: 'status',
//     label: '状态',
//     minWidth: 110,
//     customEl: Status      // 支持使用组件
//   }
// ];


export const RESOURCES_MAP = {
  RESIGNATION: '/api/user/leave/docList.json'
};
