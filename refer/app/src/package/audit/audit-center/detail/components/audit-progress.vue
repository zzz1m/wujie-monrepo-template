<template>
<ul class="audit-progress__container">
    <li v-for="(item, index) in list" :key="index" class="audit-progress__item">
        <svg-icon v-if="item.currentAudit === 2" icon-class="audit-status-preview" />
        <!-- 存在未审批的人，则是流程未结束 -->
        <svg-icon v-else-if="(item.unAutiedUser || []).length" icon-class="audit-status-wait" />
        <svg-icon v-else icon-class="audit-status-success" />{{ item.nodeName }}：
        <!-- 已审批 -->
        <ui-tooltip v-for="(autied, autiedIndex) in item.autiedUser" :key="`autied-${autiedIndex}`" :open-delay="200"
            placement="bottom" effect="dark"
        >
            <div slot="content">
                <ul class="audit-result">
                    <li>
                        <span class="audit-result__label">审批结果：</span>
                        <span class="audit-result__content">{{ autied.statusName || '-' }}</span>
                    </li>
                    <li>
                        <span class="audit-result__label">审批意见：</span>
                        <span class="audit-result__content">{{ autied.auditComment || '-' }}</span>
                    </li>
                </ul>
            </div>
            <span>{{ autied.auditUserName }}</span>
        </ui-tooltip>
        <!-- 未审批 -->
        <ui-tooltip v-for="(unAutied, unAutiedIndex) in item.unAutiedUser" :key="`unAutied-${unAutiedIndex}`" :open-delay="200"
            placement="bottom" effect="dark"
        >
            <div slot="content">
                <ul class="audit-result">
                    <li>
                        <span class="audit-result__label">审批结果：</span>
                        <span class="audit-result__content">{{ unAutied.statusName || '-' }}</span>
                    </li>
                </ul>
            </div>
            <span class="wait-name">{{ unAutied.auditUserName }}</span>
        </ui-tooltip>
    </li>
</ul>
</template> 
<script>
export default {
    name: 'AuditProgress',
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    }
};
</script>