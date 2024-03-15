/**
 * key值 为接口返回的table_name字段，即为关联的表名 这里用来作为模块的枚举值
 * name 模块名称
 * icon 模块对用的icon
 * tip 模块名称旁提示信息
 * isMulti 改模块是否为多子集 false为单子集
 * accessory 改模块是否需要上传附件 （个人档案里校验使用）
 * group 该模块所属分组（基础信息(base-info)、任职信息(offer-info)、个人档案(single-record)、在职信息(job-info)）
 */
export const moduleConfigMap = {
  'user_info': { name: '基础信息', icon: 'base.png', tip: '', isMulti: false, group: 'base-info' },
  'user_info_job': { name: '任职信息', icon: 'offer.png', tip: '', isMulti: false, group: 'offer-info' },
  'user_info_credential': { name: '证件信息', icon: 'id-card.png', tip: '（需上传户口页首页+个人页或护照信息页）', accessory: true, isMulti: false, group: 'single-record' },
  'user_info_contact': { name: '联系方式', icon: 'contract.png', tip: '', isMulti: false, group: 'single-record' },
  'user_info_bankcard': { name: '银行卡信息', icon: 'card.png', tip: '（需上传银行卡卡面号）', accessory: true, isMulti: false, group: 'single-record' },
  'user_info_marriage': { name: '婚育状况', icon: 'marital.png', tip: '', isMulti: false, group: 'single-record' },
  'user_info_security': { name: '社保公积金', icon: 'money.png', tip: '', isMulti: false, group: 'single-record' },
  'user_info_edu_exp': { name: '教育经历', icon: 'school.png', tip: '（需上传毕业证书）', accessory: true, isMulti: true, group: 'single-record' },
  'user_info_work_exp': { name: '工作经历', icon: 'work.png', tip: '', isMulti: true, group: 'single-record' },
  'user_info_party': { name: '政治面貌', icon: 'politics.png', tip: '', isMulti: false, group: 'single-record' },
  'user_info_family': { name: '家庭成员', icon: 'family.png', tip: '', isMulti: true, group: 'single-record' },
  'user_info_cert': { name: '资格证书信息', icon: 'certificate.png', tip: '（需上传证书）', accessory: true, isMulti: true, group: 'single-record' },
  'user_info_change': { name: '异动信息', icon: 'change.png', tip: '', isMulti: true , group: 'job-info' },
  'user_info_kpi': { name: '绩效信息', icon: 'kpi.png', tip: '', isMulti: true , group: 'job-info'},
  'user_info_reward': { name: '奖惩信息', icon: 'reward.png', tip: '', isMulti: true , group: 'job-info'},
  'user_info_council': { name: '委员会信息', icon: 'council.png', tip: '', isMulti: true , group: 'job-info'},
  'user_info_special_phase': { name: '三期档案', icon: 'special-phase.png', tip: '', isMulti: true , group: 'job-info'},
  'user_info_learning_train': { name: '培训信息', icon: 'train.png', tip: '', isMulti: true, group: 'job-info' },
  'user_info_service': { name: '服务期限', icon: 'service.png', tip: '', isMulti: true, group: 'job-info' },
  'user_info_injury': { name: '工伤记录', icon: 'hurt.png', tip: '', isMulti: true, group: 'job-info' },
  'user_info_contract': { name: '合同信息', icon: 'agree.png', tip: '', isMulti: true, group: 'job-info' },
  'user_info_entry_job': { name: '入职记录', icon: 'entry.png', tip: '', isMulti: true, group: 'job-info' },
  'user_info_leave_job': { name: '离职信息', icon: 'dimission.png', tip: '', isMulti: true, group: 'job-info' },
  'department': { name: '部门信息', icon: 'dept.png', tip: '', isMulti: false },
  'user_info_interviewer': { name: '面试官信息', icon: 'interviewer.png', tip: '', isMulti: false },
  'user_info_trainer': { name: '内训师信息', icon: 'trainer.png', tip: '', isMulti: false },
  'user_info_guide': { name: '直厂新员工教练信息', icon: 'business-coach.png', tip: '', isMulti: false },
  'user_info_rsu': { name: 'RSU约定', icon: 'user-rsu.png', tip: '', isMulti: false },
  'user_info_interview': { name: '访谈信息', icon: 'interview.png', tip: '', isMulti: false },
  'user_info_recommend': { name: '内推信息', icon: 'recommend.png', tip: '', isMulti: false },
  'user_info_attachment': { name: '附件信息', icon: 'attachment.png', tip: '', isMulti: false },
  'user_info_talent_review': { name: '人才盘点信息', icon: 'talent-review.png', tip: '', isMulti: false },
  'user_info_position_competence': { name: '岗位胜任力信息', icon: 'position-competence.png', tip: '', isMulti: false },
  'user_info_internship': { name: '实习信息', icon: 'internship.png', tip: '', isMulti: true},
  'user_info_nature_change': { name: '员工性质变更信息', icon: 'nature-change.png', tip: '', isMulti: true},
  'user_info_doc': { name: '附件信息', icon: 'attachment.png', tip: '', isMulti: false, group: 'doc-info' }
};
// 人员选择 需要选择包括离职人员的字段key列表
export const memberIncludeDeparturesKeys = ['invite_user_id'];
