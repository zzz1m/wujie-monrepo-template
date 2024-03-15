const AuditCenterList = () => import(/* webpackChunkName: "audit" */'../package/audit/audit-center/index.vue');
const ApprovalProcessList = () => import(/* webpackChunkName: "audit" */'../package/audit/approval-process/index.vue');
const AuditCenterDetail = () => import(/* webpackChunkName: "audit" */'../package/audit/audit-center/detail/index.vue');
// const Transaction = () => import(/* webpackChunkName: "audit" */'../package/staff/staff-manage/transaction');
// const Departure = () => import(/* webpackChunkName: "audit" */'../package/staff/staff-manage/departure');
// const BatchRank = () => import(/* webpackChunkName: "audit" */'../package/staff/staff-manage/batch-rank');
// const BatchTransaction = () => import(/* webpackChunkName: "audit" */'../package/staff/staff-manage/batch-transaction');
// const TrainManageEdit = () => import(/* webpackChunkName: "audit" */'../package/train/train-manage/edit.vue');
// const CourseManageEdit = () => import(/* webpackChunkName: "audit" */'../package/train/course-manage/edit.vue');

export default {
    name: 'auditCenter',
    path: '/dashboard/audit/audit-center',
    redirect: '/dashboard/audit/audit-center/list',
    meta: {
        title: '审批管理'
    },
    component: { render: h => h('router-view', '') },
    children: [
        {
            name: 'auditCenterList',
            path: 'list',
            meta: {
                title: '审批中心',
                uiCover: true,
                wrapClass: 'common-content-bg'
            },
            component: AuditCenterList
        },
        {
            name: 'auditCenterProcessList',
            path: 'process-list',
            meta: {
                title: '审批流程管理',
                uiCover: true,
                keepAlive: true
            },
            component: ApprovalProcessList
        },
        {
            name: 'auditCenterDetail',
            path: 'detail',
            meta: {
                title: '审批详情',
                uiCover: true,
                showBack: true,
                customBackClass: 'customBackClass-seat',
                wrapClass: 'common-content-bg',
                target: '/dashboard/audit/audit-center/list'
            },
            component: AuditCenterDetail
        },
        {
            name: 'auditCenterProcessDetailAdmin',
            path: 'process-detail-admin',
            meta: {
                title: '审批流程管理',
                showBack: true,
                uiCover: true,
                customBackClass: 'customBackClass-seat',
                wrapClass: 'common-content-bg',
                target: '/dashboard/audit/audit-center/process-list'
            },
            component: AuditCenterDetail
        },
        // {
        //     name: 'auditCenterTransaction',
        //     path: 'transaction',
        //     meta: {
        //         title: '异动申请',
        //         showBack: true,
        //         uiCover: true,
        //         target: '/dashboard/audit/audit-center/list'
        //     },
        //     component: Transaction
        // },
        // {
        //     name: 'auditCenterDeparture',
        //     path: 'departure',
        //     meta: {
        //         title: '离职申请',
        //         showBack: true,
        //         uiCover: true,
        //         target: '/dashboard/audit/audit-center/list'
        //     },
        //     component: Departure
        // },
        // {
        //     name: 'auditCenterBatchRank',
        //     path: 'batch-rank',
        //     meta: {
        //         title: '批量职级调整',
        //         showBack: true,
        //         uiCover: true,
        //         target: '/dashboard/audit/audit-center/list'
        //     },
        //     component: BatchRank
        // },
        // {
        //     name: 'auditCenterBatchTransaction',
        //     path: 'batch-transaction',
        //     meta: {
        //         title: '批量异动',
        //         showBack: true,
        //         uiCover: true,
        //         target: '/dashboard/audit/audit-center/list'
        //     },
        //     component: BatchTransaction
        // },
        // {
        //     name: 'auditCenterCourseManageEdit',
        //     path: 'course-manage-edit',
        //     meta: {
        //         title: '发布课程',
        //         showBack: true,
        //         target: '/dashboard/audit/audit-center/list'
        //     },
        //     component: CourseManageEdit
        // },
        // {
        //     name: 'auditCenterTrainManageEdit',
        //     path: 'train-manage-edit',
        //     meta: {
        //         title: '发布培训',
        //         showBack: true,
        //         target: '/dashboard/audit/audit-center/list'
        //     },
        //     component: TrainManageEdit
        // }
    ]
};
