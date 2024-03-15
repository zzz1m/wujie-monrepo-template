export const RELEASE_STATUS_LIST = [{
  code: '0',
  label: '未发布'
},{
  code: '1',
  label: '已发布'
},{
  code: '2',
  label: '已下线'
}];

export const APPROVE_STATUS_LIST = [{
  code: '1',
  label: '发布审批中'
},{
  code: '2',
  label: '发布退回'
},{
  code: '3',
  label: '发布审批通过'
},{
  code: '4',
  label: '下线审批中'
},{
  code: '5',
  label: '下线退回'
},{
  code: '6',
  label: '下线审批通过'
},{
  code: '7',
  label: '编辑审批中'
},{
  code: '8',
  label: '编辑退回'
},{
  code: '9',
  label: '编辑审批通过'
},{
  code: '10',
  label: '异常结束'
}];

export const PERMISSION_MAP = {
  EDIT: '/menu/learning/train/edit',            // 编辑
  RELEASE: '/menu/learning/train/online',        // 发布
  OFFLINE: '/menu/learning/train/offline',         // 下线
  DEL: '/menu/learning/train/delete',             // 删除
  SIGN_DETAIL: '/menu/learning/train/sign-detail',     // 签到详情
  REG_MANAGE: '/menu/learning/train/enroll',      // 报名管理
  QR_CODE: '/menu/learning/train/sign-qrcode'         // 签到码
};

export const COURSE_PERMISSION_MAP = {
  EDIT: '/menu/learning/course/edit',            // 编辑
  RELEASE: '/menu/learning/course/publish',        // 发布
  OFFLINE: '/menu/learning/course/offline',         // 下线
  DEL: '/menu/learning/course/delete',             // 删除
  LEARN_DETAIL: '/menu/learning/course/detail'     // 学习详情
};

export const STATUS_LIST = [{
  code: '1',
  label: '启用'
},{
  code: '0',
  label: '停用'
}];

export const COURSE_SCOPE_TYPE = [{
  code: '0',
  label: '公开'
},{
  code: '1',
  label: '指定序列'
},{
  code: '3',
  label: '指定员工'
}];

// 课程类型
export const COURSE_TYPE_LIST = [{
  code: '1',
  label: '视频'
},{
  code: '2',
  label: '文档'
},{
  code: '3',
  label: '系列课'
},{
  code: '4',
  label: '线下培训'
}];

// 课程类型
export const COURSE_TYPE_LIST_NO_TRAIN = [{
  code: '1',
  label: '视频'
},{
  code: '2',
  label: '文档'
},{
  code: '3',
  label: '系列课'
}];

// 课程类型
export const COURSE_TYPE_LIST_ONLY_SINGLE_COURSE = [{
  code: '1',
  label: '视频'
},{
  code: '2',
  label: '文档'
}];

export const SCOPE_TYPE_LIST = [{
  code: '1',
  label: '仅自己'
},{
  code: '2',
  label: '全部讲师'
},{
  code: '3',
  label: '部分讲师'
}];

export const VIEW_SCOPE_TYPE_LIST = [{
  code: '0',
  label: '公开'
},{
  code: '1',
  label: '仅用于培训'
},{
  code: '2',
  label: '部分可见'
}];
