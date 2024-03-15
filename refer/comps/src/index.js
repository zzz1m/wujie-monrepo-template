/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-11-15 15:07:22
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-11-15 15:27:11
 * @FilePath: /bzl-noah-web/packages/components/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 基础布局组件
export { default as Page404 } from './layout/404.vue';
export { default as BadgeDialog } from './layout/badge-dialog.vue';
export { default as Menulist } from './layout/menu-list.vue';
export { default as NavBar } from './layout/nav-bar.vue';
export { default as PageFooter } from './layout/page-footer.vue';
export { default as PageContainer } from './layout/page-container.vue';
export { default as NAV } from './layout/common/nav-center';

export { default as AppMicro } from './layout/app-micro.vue';

// 通用功能组件
export { default as AuditPreviewDialog } from './widget/audit-preview-dialog';
export { default as AuditProgress } from './widget/audit-preview-dialog/progress';
export { default as BatchImportDialog } from './widget/batch-import-dialog';
export { default as UploadAvatar } from './widget/avatar-upload';
export { default as ExportRangeDialog } from './widget/export-range-dialog';
export { default as RuleInput } from './widget/ruleInput';
export { default as VueCropper } from './widget/crpopper';
export { default as OrgTree } from './widget/org-tree';
export { default as PartmentTree } from './widget/partment-tree';
export { default as Schedule } from './widget/schedule';
export { default as ScheduleList } from './widget/schedule/list.vue';
export { default as TableEmptyTip } from './widget/table-empty-tip/index.vue';
export { default as AttendanceDialog } from './widget/attendance-dialog/index.vue';
export { default as SeniorFilter } from './widget/senior-filter/index.vue';
export { default as ItOrderDialog } from './widget/it-order-dialog/index.vue';
export { default as CourseOfflineDialog } from './widget/train/course-offline.vue';
export { default as TrainOfflineDialog } from './widget/train/train-offline.vue';


export { default as vSelect } from './components/vue-select/index';

export { default as Dept } from './widget/dept.vue';
export { default as FindBug } from './widget/find-bug.vue';
export { default as History } from './widget/history.vue';
export { default as PosterDialog } from './widget/poster-dialog.vue';
export { default as PageLoading } from './widget/page-loading.vue';
export { default as RouterLoading } from './widget/router-loading.vue';
export { default as SkinDialog } from './widget/skin-dialog.vue';
export { default as CommonTable } from './widget/common-table';
export { default as ApproveOffer } from './widget/approve-offer/index.vue';
export { default as EntranceInformationRegist } from './widget/entrance-information-regist/index.vue';
// 导入样式
import './styles/index.less';
import './components/index.less';
