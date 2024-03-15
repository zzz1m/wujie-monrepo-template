<template>
    <!--  提示信息  -->
    <ui-tooltip
      class="source-msg-wrapper"
      effect="dark"
      :openDelay="500"
      placement="bottom"
      popper-class="source-msg-popper"
     >
     <span><i class="ui-icon-warning"></i> 渠道相关说明</span>
        <div slot="content">
            <p>部门推荐：指部门为自己所辖团队做的人才推荐。包含高管推荐、专业序列委员会组长成员的人才推荐。</p>
            <p>HR推荐：人力体系中有招聘相关职责的人员，为相关业务团队完成推荐和招聘。</p>
            <p>内推：除部门推荐和HR推荐之外的企业员工内部推荐。</p>
            <p>校招推荐：通过校园招聘渠道完成的人才推荐和招聘。</p>
            <p>猎头推荐：通过第三方猎头供应商做的人才推荐和招聘。</p>
            <p>RPO推荐：通过第三方RPO供应商做的人才推荐和招聘。</p>
        </div>
    </ui-tooltip>
</template>
