<template>
<!-- 待发offer【审批】弹出该页面
            1.每部分信息分别保存
            2.统一提交审批
    -->
<div class="edit-offer-dialog">
    <ui-dialog :key="timestamp" v-model="editDialog" :lock="true" prevent-hide wrap-class="dialog-resume-full dialog-offer-approve" @on-cancel="onCloseDialog" @on-close="onCloseDialog">
        <template slot="header">
            <h3 class="offer-dialog-title">新建<span>申请OFFER前，请确认：1、符合公司现行HC规则；2、符合公司及部门对岗位的录用条件；3、确认候选人及OFFER信息准确无误</span></h3>
        </template>
        <template slot="content">
            <div class="resume-content approve-resume-content">
                <!-- 候选人信息 -->
                <div id="user" class="item-group">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer/base.png" />
                            <span>候选人信息</span>
                        </div>
                        <!-- <span class="edit-btn">
                                <a href="javascript:;" @click="isEditCfg.user=true"><i class="ui-icon-edit-outline"></i>编辑</a>
                            </span>-->
                    </div>
                    <!-- 编辑区域 -->
                    <div v-show="isEditCfg.user">
                        <ui-form ref="form_user" :model="formData" :rules="ruleData">
                            <ui-row class="flex-warp" class-name="item-with-bottom">
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="name">
                                        <div class="label red-asterisk">姓名</div>
                                        <ui-input v-model.trim="formData.name" :maxlength="40" placeholder="请输入内容" @on-blur="getNameBopomofo(formData.name)" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="nameBopomofo">
                                        <div class="label red-asterisk">姓名拼音</div>
                                        <!--<ui-input v-model.trim="formData.nameBopomofo" placeholder="请输入内容"/>-->
                                        <ui-select v-model="formData.nameBopomofo">
                                            <ui-option v-for="item in nameBopomofoOptions" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="sex">
                                        <div class="label red-asterisk">性别</div>
                                        <ui-select v-model="formData.sex">
                                            <ui-option v-for="item in dictTypes.sex" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="nationality">
                                        <div class="label red-asterisk">国籍</div>
                                        <ui-select v-model="formData.nationality" filterable @on-change="handleNation">
                                            <ui-option v-for="item in dictTypes.nationality" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="credentialType">
                                        <div class="label red-asterisk">证件类型</div>
                                        <ui-select v-model="formData.credentialType" @on-change="handleCredentialTypeChange">
                                            <ui-option v-for="item in dictTypes.credentials_type" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col key="credentialNumber" class="item item-edit" :span="8">
                                    <form-item label="" prop="credentialNumber">
                                        <div class="label red-asterisk">证件号码</div>
                                        <ui-input v-model.trim="formData.credentialNumber" placeholder="请输入内容" @on-blur="doEmploy" />
                                    </form-item>
                                </ui-col>

                                <!-- 日期范围 -->
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="credentialStartDate">
                                        <div class="label" :class="(formData.credentialType === '01') && 'red-asterisk'">证件有效开始日期</div>
                                        <ui-date-picker
                                            v-model="formData.credentialStartDate"
                                            placeholder="请选择日期"
                                            value-format="yyyy-MM-dd"
                                        />
                                    </form-item>
                                </ui-col>
                                <ui-col key="credentialEndDate" class="item item-edit" :span="8">
                                    <form-item label="" prop="credentialEndDate">
                                        <div class="label" :class="(formData.credentialType === '01') && 'red-asterisk'">证件有效截止日期</div>
                                        <ui-date-picker
                                            v-model="formData.credentialEndDate"
                                            placeholder="请选择日期"
                                            value-format="yyyy-MM-dd"
                                        />
                                    </form-item>
                                </ui-col>
                                <!--  -->
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="countryCode">
                                        <div class="label red-asterisk">手机号码区号</div>
                                        <ui-select v-model="formData.countryCode">
                                            <ui-option v-for="item in dictTypes.country_code" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="phoneNumber">
                                        <div class="label red-asterisk">手机号码</div>
                                        <ui-input v-model.trim="formData.phoneNumber" :maxlength="15" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="email">
                                        <div class="label red-asterisk">个人邮箱</div>
                                        <ui-input v-model.trim="formData.email" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="educationRequired">
                                        <div class="label red-asterisk">学历要求</div>
                                        <ui-select v-model="formData.educationRequired">
                                            <ui-option v-for="item in dictTypes.education_required" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="sourcePath">
                                        <div class="label red-asterisk">来源渠道 <source-msg /></div>
                                        <ui-select v-model="formData.sourcePath">
                                            <ui-option v-for="item in dictTypes.source" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit source-desc-item" :span="8">
                                    <form-item label="" prop="inviteUserId">
                                        <div class="label red-asterisk">推荐人</div>
                                        <ui-select
                                            v-model="formData.inviteUserId"
                                            clearable
                                            filterable
                                            placeholder="请选择"
                                            @on-change="
                                                (value) => {
                                                    handleQueryReportTo(value, {
                                                        valueKey: 'inviteUserId',
                                                        nameKey: 'sourceDesc',
                                                        listKey: 'inviteUserList',
                                                    });
                                                }
                                            "
                                            @on-query-change="
                                                (value) => {
                                                    this.throttlePeopleQueryNomal(value, 'inviteUserList', -1);
                                                }
                                            "
                                        >
                                            <ui-option v-for="item in inviteUserList" :key="item.value" :label="item.label" :value="item.value">{{
                                                item.name
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                        </ui-form>
                        <!--<div class="detail-item-footer">
                                <button type="button" class="btn btn-outline" @click="isEditCfg.user=false;">取消</button>
                                <button type="button" class="btn btn-primary" @click="doSetOfferDetail('user');">保存</button>
                            </div>-->
                    </div>
                </div>
                <!-- 任职信息 -->
                <div id="officeholding" class="item-group">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer//job.png" />
                            <span>任职信息</span>
                        </div>
                        <!--<span class="edit-btn">
                                <a href="javascript:;" @click="isEditCfg.officeholding=true"><i class="ui-icon-edit-outline"></i>编辑</a>
                            </span>-->
                    </div>
                    <!-- 编辑区域 -->
                    <div v-show="isEditCfg.officeholding">
                        <ui-form ref="form_officeholding" :model="formData" :rules="ruleData">
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="userNature">
                                        <div class="label red-asterisk">员工性质</div>
                                        <ui-select v-model="formData.userNature" @on-change="userNatureChange">
                                            <ui-option v-for="item in dictTypes.employee_nature" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <div class="label">入职类型</div>
                                    <div class="entry-type">{{ getSelectName(formData.entryType, dictTypes.entry_type) }}</div>
                                    <!--<ui-select v-model="formData.entryType">
                                            <ui-option v-for="item in entryOptions" :value="item.dictCode" :key="item.dictCode">{{ item.dictName }}</ui-option>
                                        </ui-select>-->
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="productLine">
                                        <div class="label red-asterisk">产品线</div>
                                        <ui-input v-model="formData.productLine" placeholder="请输入内容" readonly />
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="deptCode">
                                        <div class="label red-asterisk">部门</div>
                                        <!-- <ui-input v-model.trim="formData.deptName" placeholder="请输入内容" /> -->
                                        <ui-select
                                            v-model="formData.deptCode"
                                            clearable
                                            filterable
                                            placeholder="请选择"
                                            @on-change="handleSelectDept"
                                            @on-query-change="throttleHandleDeptQuery"
                                        >
                                            <ui-option v-for="item in deptList" :key="item.value" :value="item.value">{{ item.label }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="manageSeq">
                                        <div class="label red-asterisk">管理序列</div>
                                        <ui-select v-model="formData.manageSeq" clearable @on-change="changeMagSeq('manage_seq', formData.manageSeq)">
                                            <ui-option v-for="item in magSeqList" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="manageSeqLevel">
                                        <div class="label red-asterisk">管理职级</div>
                                        <ui-select v-model="formData.manageSeqLevel" clearable>
                                            <ui-option v-for="item in magSql_level" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="manageSeqSub">
                                        <div class="label red-asterisk">管理子序列</div>
                                        <ui-select v-model="formData.manageSeqSub" clearable @on-change="changeMagSeqsub(formData.manageSeqSub)">
                                            <ui-option v-for="item in magSeqSubList" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="manageStdPosition">
                                        <div class="label red-asterisk">管理标准岗位</div>
                                        <ui-select v-model="formData.manageStdPosition" clearable>
                                            <ui-option v-for="item in magStdPositionList" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="seq">
                                        <div class="label red-asterisk">专业序列</div>
                                        <ui-select v-model="formData.seq" @on-change="changeSeq('seq', formData.seq)">
                                            <ui-option v-for="item in seqList" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="seqLevel">
                                        <div class="label red-asterisk">专业职级</div>
                                        <ui-select v-model="formData.seqLevel" clearable>
                                            <ui-option v-for="item in sql_level" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="positionName">
                                        <div class="label red-asterisk">岗位</div>
                                        <ui-input v-model.trim="formData.positionName" :maxlength="100" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="seqSub">
                                        <div class="label red-asterisk">专业子序列</div>
                                        <ui-select v-model="formData.seqSub" clearable @on-change="changeSeqsub(formData.seqSub)">
                                            <ui-option v-for="item in seqSubList" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="stdPosition">
                                        <div class="label red-asterisk">专业标准岗位</div>
                                        <ui-select v-model="formData.stdPosition" clearable>
                                            <ui-option v-for="item in stdPositionList" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="reportToId">
                                        <div class="label">汇报人</div>
                                        <!-- <ui-input v-model.trim="formData.reportToId" placeholder="请输入内容" /> -->
                                        <ui-select
                                            v-model="formData.reportToId"
                                            clearable
                                            filterable
                                            placeholder="请选择"
                                            @on-change="
                                                (value) => {
                                                    handleQueryReportTo(value, {
                                                        valueKey: 'reportToId',
                                                        nameKey: 'reportTo',
                                                        listKey: 'reportToList',
                                                    });
                                                }
                                            "
                                            @on-query-change="
                                                (value) => {
                                                    throttlePeopleQueryNomal(value, 'reportToList');
                                                }
                                            "
                                        >
                                            <ui-option v-for="item in reportToList" :key="item.value" :label="item.label" :value="item.value">{{
                                                item.name
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="reportToId2">
                                        <div class="label">汇报人2</div>
                                        <!-- <ui-input v-model.trim="formData.reportTo" placeholder="请输入内容" /> -->
                                        <ui-select
                                            v-model="formData.reportToId2"
                                            clearable
                                            filterable
                                            placeholder="请选择"
                                            @on-change="
                                                (value) => {
                                                    handleQueryReportTo(value, {
                                                        valueKey: 'reportToId2',
                                                        nameKey: 'reportTo2',
                                                        listKey: 'reportTo2List',
                                                    });
                                                }
                                            "
                                            @on-query-change="
                                                (value) => {
                                                    throttlePeopleQueryNomal(value, 'reportTo2List');
                                                }
                                            "
                                        >
                                            <ui-option v-for="item in reportTo2List" :key="item.value" :label="item.label" :value="item.value">{{
                                                item.name
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row class="item-p-d-20">
                                <ui-col class="item item-edit padding-r-30" :span="8">
                                    <form-item label="" prop="workplace">
                                        <div class="label red-asterisk">工作地点</div>
                                        <!--<ui-input v-model.trim="formData.workplace" placeholder="请输入内容"/>-->
                                        <!-- <ui-select v-model="formData.workplace">
                                                <ui-option v-for="item in dictTypes.workplace" :value="item.dictCode" :key="item.dictCode">{{
                                                    item.dictName
                                                }}</ui-option>
                                            </ui-select> -->
                                        <ui-cascader-new
                                            ref="workplaceTree"
                                            v-model="workplaceArr"
                                            :allow-cross-level="false"
                                            class="queryWrap"
                                            clearable
                                            :data="workplaceList"
                                            dict-type="workplace"
                                            :filterable="true"
                                            :meta-data="workplaceDefaultValue"
                                            :multiple="false"
                                            node-key="dictCode"
                                            placeholder="请选择"
                                            :props="{ children: 'childrenList', label: 'dictName', isLeaf: 'isLeaf' }"
                                            @update-meta="getFloorList"
                                        >
                                        </ui-cascader-new>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="floorCode">
                                        <div class="label">楼层</div>
                                        <ui-select
                                            v-model="formData.floorCode"
                                            clearable
                                            placeholder="请选择"
                                        >
                                            <ui-option v-for="item in floorList" :key="item.dictCode" :value="item.dictCode">{{ item.dictName }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit padding-r-30" :span="8">
                                    <form-item label="" prop="contractSubject">
                                        <div class="label red-asterisk">合同主体</div>
                                        <ui-cascader-new
                                            ref="cascaderContractSubject"
                                            v-model="contractSubjectArr"
                                            class="query contract-subject"
                                            dict-type="contract_body"
                                            lazy
                                            :load="
                                                (node, resolve) => {
                                                    return loadData(node, resolve, 'contract_body');
                                                }
                                            "
                                            :meta-data="contractSubjectDefaultValue"
                                            :multiple="false"
                                            node-key="dictCode"
                                            placeholder="请选择"
                                            :props="{ children: 'children', label: 'dictName', isLeaf: 'isLeaf' }"
                                        >
                                        </ui-cascader-new>
                                    </form-item>
                                </ui-col>
                                <ui-col v-if="formData.userNature !== '03'" class="item item-edit" :span="8">
                                    <form-item label="" prop="contractTerm">
                                        <div class="label" :class="(formData.userNature !== '03') && 'red-asterisk'">合同期限（月）</div>
                                        <ui-input v-model.trim="formData.contractTerm" :maxlength="8" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <!-- </ui-row>
                            <ui-row> -->
                                <ui-col v-if="formData.userNature === '01'" class="item item-edit" :span="8">
                                    <form-item label="" prop="probationCode">
                                        <div class="label" :class="(formData.userNature !== '03') && 'red-asterisk'">试用期限</div>
                                        <ui-select v-model="formData.probationCode" @on-change="probationCodeChange">
                                            <ui-option
                                                v-for="item in dictTypes.trial_period"
                                                :key="item.dictCode"
                                                :value="item.dictCode"
                                            >{{ item.dictName }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>

                                <template v-if="formData.userNature === '03'">
                                    <ui-col class="item item-edit" :span="8">
                                        <form-item prop="internshipPeriod">
                                            <div class="label red-asterisk">实习期限（月）</div>
                                            <ui-input v-model.trim="formData.internshipPeriod" :maxlength="8" placeholder="请输入内容" />
                                        </form-item>
                                    </ui-col>
                                    <ui-col class="item item-edit" :span="8">
                                        <form-item prop="internshipPermanent">
                                            <div class="label red-asterisk">是否约定转正式</div>
                                            <ui-select v-model="formData.internshipPermanent" @on-change="handleInternshipPermanentChange">
                                                <ui-option v-for="item in dictTypes.whether_options" :key="item.dictCode" :value="item.dictCode">{{
                                                    item.dictName
                                                }}</ui-option>
                                            </ui-select>
                                        </form-item>
                                    </ui-col>
                                </template>
                                <!-- <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="bussiness">
                                        <div class="label red-asterisk">是否BOSS商业/店长商业</div>
                                        <ui-select v-model="formData.bussiness">
                                            <ui-option v-for="item in dictTypes.whether_options" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col> -->
                            </ui-row>
                            <!--<div class="detail-item-footer">
                                    <button type="button" class="btn btn-outline" @click="isEditCfg.officeholding=false;">取消</button>
                                    <button type="button" class="btn btn-primary" @click="doSetOfferDetail('officeholding');">保存</button>
                                </div>-->
                        </ui-form>
                    </div>
                </div>
                <!-- 实习信息 -->
                <!-- <div v-if="formData.userNature == 3" id="practice" class="item-group">
                    <div class="title">
                        <div>
                            <img src="@/assets/images/offer//practice.png" alt="" />
                            <span>实习信息</span>
                        </div>
                    </div>
                    <div v-show="isEditCfg.practice" :key="unature_timestamp">
                        <ui-form ref="form_practice" :model="formData" :rules="ruleData">
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="internshipAllowance">
                                        <div class="label red-asterisk">实习津贴</div>
                                        <ui-input v-model.trim="formData.internshipAllowance" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="internshipPeriod">
                                        <div class="label red-asterisk">实习期限（月）</div>
                                        <ui-input v-model.trim="formData.internshipPeriod" :maxlength="8" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="internshipPermanent">
                                        <div class="label red-asterisk">是否约定转正式</div>
                                        <ui-select v-model="formData.internshipPermanent">
                                            <ui-option v-for="item in dictTypes.whether_options" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                        </ui-form>
                    </div>
                </div> -->
                <!-- 薪资信息 -->
                <div id="salary" class="item-group entry-salary">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer//money.png" />
                            <span>薪资信息</span>
                        </div>
                        <!--<span class="edit-btn">
                                <a href="javascript:;" @click="isEditCfg.salary=true"><i class="ui-icon-edit-outline"></i>编辑</a>
                            </span>-->
                    </div>
                    <!-- 编辑区域 -->
                    <ui-row>
                        <ui-col class="item item-edit" :span="8">
                            <div class="label">结算币种</div>
                            <ui-select
                                v-model="formData.currency"
                                clearable
                                disabled
                                placeholder="请选择"
                            >
                                <ui-option v-for="item in dictTypes.currency" :key="item.dictCode" :value="item.dictCode">{{ item.dictName }}</ui-option>
                            </ui-select>
                        </ui-col>
                    </ui-row>
                    <ui-row>
                        <ui-form ref="form_salary" :model="formData.salaryDTO" :rules="ruleData">
                            <ui-row class="item item-edit">
                                <ui-col :span="24">
                                    <form-item label="" prop="salaryStructure">
                                        <div class="label red-asterisk">薪资结构</div>
                                        <ui-checkbox-group v-model="formData.salaryDTO.salaryStructure" @on-change="salaryStructureChange">
                                            <ui-checkbox v-for="item in SALARY_STRUCTURE_LIST" :key="item.code" :label="item.code">{{ item.name }}</ui-checkbox>
                                        </ui-checkbox-group>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <template v-if="['01','05'].includes(formData.probationCode)">
                                <ui-col v-if="formData.salaryDTO.salaryStructure.includes('month')" key="probationMonthStandard" class="item item-edit" :span="8">
                                    <form-item label="" prop="probationMonthStandard">
                                        <div class="label red-asterisk">试用期月固定工资标准（{{ unitName }}/月）</div>
                                        <ui-input-number
v-model="formData.salaryDTO.probationMonthStandard"
                                            :max="9999999" :min="1" placeholder="请输入试用期月固定工资标准" :step="1"
                                            @on-blur="handleToFixed('probationMonthStandard')"
                                        ></ui-input-number>
                                    </form-item>
                                </ui-col>
                                <ui-col v-if="formData.salaryDTO.salaryStructure.includes('monthKpi')" key="probationMonthKpiStandard" class="item item-edit" :span="8">
                                    <form-item label="" prop="probationMonthKpiStandard">
                                        <div class="label red-asterisk">试用期月度绩效工资标准（{{ unitName }}/月）</div>
                                        <ui-input-number
v-model="formData.salaryDTO.probationMonthKpiStandard"
                                            :max="9999999" :min="1" placeholder="请输入试用期月度绩效工资标准" :step="1"
                                            @on-blur="handleToFixed('probationMonthKpiStandard')"
                                        ></ui-input-number>
                                    </form-item>
                                </ui-col>
                                <ui-col v-if="formData.salaryDTO.salaryStructure.includes('quarterKpi')" key="probationQuarterKpiStandard" class="item item-edit" :span="8">
                                    <form-item label="" prop="probationQuarterKpiStandard">
                                        <div class="label red-asterisk">试用期季度绩效工资标准（{{ unitName }}/季度）</div>
                                        <ui-input-number
v-model="formData.salaryDTO.probationQuarterKpiStandard"
                                            :max="9999999" :min="1" placeholder="请输入试用期季度绩效工资标准" :step="1"
                                            @on-blur="handleToFixed('probationQuarterKpiStandard')"
                                        ></ui-input-number>
                                    </form-item>
                                </ui-col>
                            </template>

                            <ui-col v-if="formData.salaryDTO.salaryStructure.includes('day')" key="dayStandard" class="item item-edit" :span="8">
                                <form-item label="" prop="dayStandard">
                                    <div class="label red-asterisk">日固定工资标准（{{ unitName }}/天）</div>
                                    <ui-input-number
v-model="formData.salaryDTO.dayStandard"
                                        :max="9999999" :min="1" placeholder="请输入日固定工资标准" :step="1"
                                        @on-blur="handleToFixed('dayStandard')"
                                    ></ui-input-number>
                                </form-item>
                            </ui-col>
                            <ui-col v-if="formData.salaryDTO.salaryStructure.includes('month')" key="monthStandard" class="item item-edit" :span="8">
                                <form-item label="" prop="monthStandard">
                                    <div class="label red-asterisk">{{ ['01','05'].includes(formData.probationCode) ? '转正后' : '' }}月固定工资标准（{{ unitName }}/月）</div>
                                    <ui-input-number
v-model="formData.salaryDTO.monthStandard"
                                        :max="9999999" :min="1" :placeholder="`请输入${['01','05'].includes(formData.probationCode) ? '转正后' : ''}月固定工资标准`" :step="1"
                                        @on-blur="handleToFixed('monthStandard')"
                                    ></ui-input-number>
                                </form-item>
                            </ui-col>
                            <ui-col v-if="formData.salaryDTO.salaryStructure.includes('monthKpi')" key="monthKpiStandard" class="item item-edit" :span="8">
                                <form-item label="" prop="monthKpiStandard">
                                    <div class="label red-asterisk">{{ ['01','05'].includes(formData.probationCode) ? '转正后' : '' }}月度绩效工资标准（{{ unitName }}/月）</div>
                                    <ui-input-number
v-model="formData.salaryDTO.monthKpiStandard"
                                        :max="9999999" :min="1" :placeholder="`请输入${['01','05'].includes(formData.probationCode) ? '转正后' : ''}月度绩效工资标准`" :step="1"
                                        @on-blur="handleToFixed('monthKpiStandard')"
                                    ></ui-input-number>
                                </form-item>
                            </ui-col>
                            <ui-col v-if="formData.salaryDTO.salaryStructure.includes('quarterKpi')" key="quarterKpiStandard" class="item item-edit" :span="8">
                                <form-item label="" prop="quarterKpiStandard">
                                    <div class="label red-asterisk">{{ ['01','05'].includes(formData.probationCode) ? '转正后' : '' }}季度绩效工资标准（{{ unitName }}/季度）</div>
                                    <ui-input-number
v-model="formData.salaryDTO.quarterKpiStandard"
                                        :max="9999999" :min="1" :placeholder="`请输入${['01','05'].includes(formData.probationCode) ? '转正后' : ''}季度绩效工资标准`" :step="1"
                                        @on-blur="handleToFixed('quarterKpiStandard')"
                                    ></ui-input-number>
                                </form-item>
                            </ui-col>
                            <ui-col v-if="formData.salaryDTO.salaryStructure.includes('endYearBonus')" key="endYearBonus" class="item item-edit" :span="8">
                                <form-item label="" prop="endYearBonus">
                                    <div class="label red-asterisk">年终固定奖金（N个月）</div>
                                    <ui-input-number
v-model="formData.salaryDTO.endYearBonus"
                                        :max="999" :min="1" placeholder="请输入年终固定奖金基数" :step="1"
                                        @on-blur="handleToFixed('endYearBonus')"
                                    ></ui-input-number>
                                </form-item>
                            </ui-col>
                            <ui-col v-if="formData.salaryDTO.salaryStructure.includes('yearKpiBonus')" key="yearKpiBonus" class="item item-edit" :span="8">
                                <form-item label="" prop="yearKpiBonus">
                                    <div class="label red-asterisk">年度绩效奖金（0 ~ N个月）</div>
                                    <span class="year-kpi-bonus-left">0 ~ </span><ui-input-number
v-model="formData.salaryDTO.yearKpiBonus" class="year-kpi-bonus"
                                        :max="999" :min="1" placeholder="请输入年度绩效奖金基数" :step="1"
                                        @on-blur="handleToFixed('yearKpiBonus')"
                                    ></ui-input-number>
                                </form-item>
                            </ui-col>

                            <ui-col v-if="formData.internshipPermanent + '' === '1' && formData.userNature === '03' " key="agreedToFormalSalary" class="item item-edit" :span="8">
                                <form-item label="" prop="agreedToFormalSalary">
                                    <div class="label">转正式后标准薪资</div>
                                    <ui-input v-model.trim="formData.salaryDTO.agreedToFormalSalary" placeholder="请输入转正式后标准薪资" />
                                </form-item>
                            </ui-col>
                            <ui-col class="item item-edit" :span="8">
                                <div class="label">薪资相关批件</div>
                                <div class="value">
                                    <div v-for="(item, index) in formData.salaryDTO.salaryAttachments" :key="index" class="accessory">
                                        <span class="file-name">{{ item.split('||')[0] }}</span>
                                        <img
                                            alt=""
                                            class="btn-mini btn-close"
                                            :src="getImportUrl('btn-close.png')"
                                            @click.stop="delFile1(index)"
                                        />
                                    </div>
                                    <!--<ui-upload custom ref='uploadAnnexes' @uploadStart="annexesUploadStart" @uploadEnd="annexesUploadEnd" exname=".pdf,.jpg,.png,.jpeg,.doc,.docx" action="/api/common/file/upload.json"/>-->
                                    <div class="accessory accessory-add" @click="beforeUpload1">
                                        <ui-upload
                                            ref="uploadAnnexes1" action="/api/common/file/upload.json" custom
                                            exname=".pdf,.jpg,.png,.jpeg,.doc,.docx,.xls,.xlsx"
                                            :filesize="25"
                                            @uploadEnd="annexesUploadEnd1"
                                        />
                                        <span class="file-name">添加你的附件</span>
                                        <img alt="" class="btn-mini btn-add" :src="getImportUrl('btn-add.png')" />
                                    </div>
                                </div>
                            </ui-col>
                        </ui-form>
                    </ui-row>
                </div>
                <!-- RSU约定 -->
                <div id="rsu" class="item-group">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer/rsu.png" />
                            <span>RSU约定</span>
                        </div>
                    </div>
                    <!-- 编辑区域 -->
                    <div>
                        <ui-form ref="form_rsu" :model="formData" :rules="ruleData">
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="rsu">
                                        <div class="label red-asterisk">RSU约定</div>
                                        <ui-select v-model="formData.rsu" @on-change="handleRSUChange">
                                            <ui-option v-for="item in dictTypes.whether_options" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col v-if="formData.rsu === '1'" class="item item-edit" :span="8">
                                    <form-item label="" prop="rsuContent">
                                        <div class="label red-asterisk">RSU约定价值（{{ unitName }}）</div>
                                        <ui-input-number
v-model="formData.rsuContent" :max="99999999"
                                            :min="0" placeholder="请输入RSU约定价值" :step="1"
                                        ></ui-input-number>
                                    </form-item>
                                    <p class="gray educationRequired-tips">
                                        *此处填写金额应为：4年RSU总价值。即，候选人标准年薪中约定的RSU价值*4
                                    </p>
                                </ui-col>
                            </ui-row>
                        </ui-form>
                    </div>
                </div>

                <!-- 入职信息 -->
                <div id="entry" class="item-group">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer//work.png" />
                            <span>入职信息</span>
                        </div>
                        <!--<span class="edit-btn">
                                <a href="javascript:;" @click="isEditCfg.entry=true"><i class="ui-icon-edit-outline"></i>编辑</a>
                            </span>-->
                    </div>
                    <!-- 编辑区域 -->
                    <div v-show="isEditCfg.entry">
                        <ui-form ref="form_entry" :model="formData" :rules="ruleData">
                            <ui-row>
                                <ui-col class="item item-edit expect-entry-date" :span="8">
                                    <form-item label="" prop="expectEntryDate">
                                        <div class="label red-asterisk">预计入职日期</div>
                                        <ui-date-picker
                                            v-model="formData.expectEntryDate"
                                            clearable
                                            default-time="09:30:00"
                                            format="yyyy-MM-dd HH:mm"
                                            placeholder="选择日期"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></ui-date-picker>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="reportUser">
                                        <div class="label red-asterisk">报到联系人</div>
                                        <ui-input v-model.trim="formData.reportUser" :maxlength="64" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="reportUserPhone">
                                        <div class="label red-asterisk">报到联系人电话</div>
                                        <ui-input v-model.trim="formData.reportUserPhone" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="reportLocation">
                                        <div class="label red-asterisk">报到地点</div>
                                        <ui-input v-model.trim="formData.reportLocation" :maxlength="64" placeholder="请输入内容" />
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <!--<div class="detail-item-footer">
                                    <button type="button" class="btn btn-outline" @click="isEditCfg.entry=false;">取消</button>
                                    <button type="button" class="btn btn-primary" @click="doSetOfferDetail('entry');">保存</button>
                                </div>-->
                        </ui-form>
                    </div>
                </div>
                <!-- offer信息 -->
                <div id="offer" class="item-group">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer//offer.png" />
                            <span>offer信息</span>
                        </div>
                        <!--<span class="edit-btn">
                                <a href="javascript:;" @click="isEditCfg.offer=true"><i class="ui-icon-edit-outline"></i>编辑</a>
                            </span>-->
                    </div>
                    <!-- 编辑区域 -->
                    <div v-show="isEditCfg.offer">
                        <ui-form ref="form_offer" :model="formData" :rules="ruleData">
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item prop="offerEmailCc">
                                        <div class="label">offer邮件抄送人</div>
                                        <!-- <ui-input v-model.trim="formData.offerEmailCc" placeholder="请输入内容" /> -->
                                        <v-select
                                            v-model="offerEmailCcArray"
                                            class="entry-v-select"
                                            :filterable="true"
                                            label="name"
                                            multiple
                                            :options="showUsersData"
                                            placeholder="请选择"
                                            :searchable="true"
                                            :taggable="true"
                                            @search="filterEmails"
                                        >
                                        </v-select>
                                        <!-- <ui-select
                                                v-model="offerEmailCcArray"
                                                filterable clearable multiple
                                                placeholder="请选择"
                                                :formatLabelText="formatLabelText"
                                                @on-query-change="queryUser" transfer>
                                                <ui-option v-for="(item, key) in offUserList"
                                                    :value="item.value"
                                                    :key="key">{{ item.name }}</ui-option>
                                            </ui-select> -->
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="offerEmailModel">
                                        <div class="label red-asterisk">offer模版</div>
                                        <ui-select v-model="formData.offerEmailModel">
                                            <ui-option v-for="item in templateOptions" :key="item.dictCode" :value="item.dictCode">{{
                                                item.dictName
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <!--<div class="detail-item-footer">
                                    <button type="button" class="btn btn-outline" @click="isEditCfg.offer=false;">取消</button>
                                    <button type="button" class="btn btn-primary" @click="doSetOfferDetail('offer');">保存</button>
                                </div>-->
                        </ui-form>
                    </div>
                </div>
                <!-- 其他信息 -->
                <div id="other" class="item-group">
                    <div class="title">
                        <div>
                            <img alt="" src="@/assets/images/offer//other.png" />
                            <span>其他信息</span>
                        </div>
                        <!--<span class="edit-btn">
                                <a href="javascript:;" @click="isEditCfg.other=true"><i class="ui-icon-edit-outline"></i>编辑</a>
                            </span>-->
                    </div>
                    <!-- 编辑区域 -->
                    <div v-show="isEditCfg.other">
                        <ui-form ref="form_other" :model="formData" :rules="ruleData">
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="bpName">
                                        <div class="label red-asterisk">招聘者</div>
                                        <ui-input v-model="formData.bpName" placeholder="请输入内容" readonly />
                                    </form-item>
                                </ui-col>
                                <!-- <ui-col class="item item-edit" :span="8">
                                        <form-item label="" prop="bpEmail">
                                            <div class="label red-asterisk">招聘者邮箱</div>
                                            <ui-input v-model.trim="formData.bpEmail" placeholder="请输入内容" />
                                        </form-item>
                                    </ui-col> -->
                                <ui-col class="item item-edit" :span="8">
                                    <form-item label="" prop="bpEmail">
                                        <div class="label">负责BP</div>
                                        <ui-select
                                            v-model="formData.managerArray"
                                            filterable
                                            :format-label-text="formatLabelText"
                                            multiple
                                            placeholder="请选择"
                                            @on-query-change="peopleQuery"
                                        >
                                            <ui-option v-for="item in peopleList" :key="item.value" :value="item.value">{{
                                                item.label
                                            }}</ui-option>
                                        </ui-select>
                                    </form-item>
                                </ui-col>
                                <ui-col class="item item-edit item-comment" :span="8">
                                    <div class="label">备注说明</div>
                                    <ui-input v-model.trim="formData.description" :counter="true" :maxlength="256" placeholder="请输入内容" :rows="3" type="textarea" />
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <div class="label red-asterisk">面试评估表</div>
                                    <div class="value interview-evaluation">
                                        <!--formDataShow.other.interviewEvaluation-->
                                        <div
                                            v-if="
                                                this.formDataShow.other.interviewEvaluationList[0] &&
                                                    this.formDataShow.other.interviewEvaluationList[0].relativePath
                                            "
                                            class="icons-box-outer"
                                        >
                                            <div class="icons-box">
                                                <img alt="" class="icon-svg-evaluation" :src="getImportUrl('evaluation.png')" />
                                                <img
                                                    alt=""
                                                    class="btn-mini btn-close"
                                                    :src="getImportUrl('btn-close.png')"
                                                    @click.stop="delInterviewEvaluation()"
                                                />
                                            </div>
                                        </div>
                                        <div v-else class="upload-box" @click.stop="mockClick">
                                            <i class="ui-icon-plus" />
                                            <ui-upload
                                                ref="upload" action="/api/common/file/upload.json" custom
                                                exname=".pdf.jpg.png.jpeg.doc.docx"
                                                :filesize="25"
                                                @uploadEnd="uploadEnd"
                                            />
                                        </div>
                                    </div>
                                    <form-item label="" prop="interviewEvaluation">
                                        <ui-input v-model="formData.interviewEvaluation" style="display: none" />
                                    </form-item>
                                </ui-col>

                                <ui-col class="item item-edit" :span="8">
                                    <div class="label red-asterisk">个人简历</div>
                                    <div class="value interview-evaluation">
                                        <!--formDataShow.other.interviewEvaluation-->
                                        <div
                                            v-if="
                                                this.formDataShow.other.resumeAnnexeList &&
                                                    this.formDataShow.other.resumeAnnexeList[0] &&
                                                    this.formDataShow.other.resumeAnnexeList[0].relativePath
                                            "
                                            class="icons-box-outer"
                                        >
                                            <div class="icons-box">
                                                <img alt="" class="icon-svg-evaluation" :src="getImportUrl('evaluation.png')" />
                                                <img
                                                    alt=""
                                                    class="btn-mini btn-close"
                                                    :src="getImportUrl('btn-close.png')"
                                                    @click.stop="delResume()"
                                                />
                                            </div>
                                        </div>
                                        <div v-else class="upload-box" @click.stop="resumeMockClick">
                                            <i class="ui-icon-plus" />
                                            <ui-upload
                                                ref="resume" action="/api/common/file/upload.json" custom
                                                exname=".pdf.jpg.png.jpeg.doc.docx"
                                                :filesize="25"
                                                @uploadEnd="uploadResumeEnd"
                                            />
                                        </div>
                                    </div>
                                    <form-item label="" prop="resumeAnnexe">
                                        <ui-input v-model="formData.resumeAnnexe" style="display: none" />
                                    </form-item>
                                </ui-col>

                                <ui-col class="item item-edit" :span="8">
                                    <div class="label red-asterisk">学历认证</div>
                                    <div class="value">
                                        <div v-for="(item, index) in formDataShow.other.educationAnnexeList" :key="index" class="accessory">
                                            <span class="file-name">{{ item.fileName }}</span>
                                            <img
                                                alt=""
                                                class="btn-mini btn-close"
                                                :src="getImportUrl('btn-close.png')"
                                                @click.stop="delEducationFile(index)"
                                            />
                                        </div>
                                        <div class="accessory accessory-add" @click="beforeEducationUpload">
                                            <ui-upload
                                                ref="uploadEducation" action="/api/common/file/upload.json" custom
                                                exname=".pdf,.jpg,.png,.jpeg,.doc,.docx,.xls,.xlsx"
                                                :filesize="25"
                                                @uploadEnd="educationUploadEnd"
                                            />
                                            <span class="file-name">添加学历认证附件</span>
                                            <img alt="" class="btn-mini btn-add" :src="getImportUrl('btn-add.png')" />
                                        </div>
                                    </div>
                                    <form-item label="" prop="educationAnnexe">
                                        <ui-input v-model="formData.educationAnnexe" style="display: none" />
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <ui-row>
                                <ui-col class="item item-edit" :span="8">
                                    <div class="label">附件（多个）</div>
                                    <div class="value">
                                        <div v-for="(item, index) in formDataShow.other.annexesList" :key="index" class="accessory">
                                            <span class="file-name">{{ item.fileName }}</span>
                                            <img
                                                alt=""
                                                class="btn-mini btn-close"
                                                :src="getImportUrl('btn-close.png')"
                                                @click.stop="delFile(index)"
                                            />
                                        </div>
                                        <!--<ui-upload custom ref='uploadAnnexes' @uploadStart="annexesUploadStart" @uploadEnd="annexesUploadEnd" exname=".pdf,.jpg,.png,.jpeg,.doc,.docx" action="/api/common/file/upload.json"/>-->
                                        <div class="accessory accessory-add" @click="beforeUpload">
                                            <ui-upload
                                                ref="uploadAnnexes" action="/api/common/file/upload.json" custom
                                                exname=".pdf,.jpg,.png,.jpeg,.doc,.docx,.xls,.xlsx"
                                                :filesize="25"
                                                @uploadEnd="annexesUploadEnd"
                                            />
                                            <span class="file-name">添加你的附件</span>
                                            <img alt="" class="btn-mini btn-add" :src="getImportUrl('btn-add.png')" />
                                        </div>
                                    </div>
                                    <form-item label="" prop="annexes">
                                        <ui-input v-model="formData.annexes" style="display: none" />
                                    </form-item>
                                </ui-col>
                            </ui-row>
                            <!--<div class="detail-item-footer">
                                    <button type="button" class="btn btn-outline" @click="isEditCfg.other=false;">取消</button>
                                    <button type="button" class="btn btn-primary" @click="doSetOfferDetail('other');">保存</button>
                                </div>-->
                        </ui-form>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
            <div class="btns">
                <span class="btn btn-outline btn-cancel" ka="dialog_cancel" @click="onCloseDialog">取消</span>
                <span class="btn btn-outline btn-cancel" ka="dialog_cancel" @click="preview">审批流预览</span>
                <span class="btn btn-primary btn-sure" ka="dialog_sure" @click="submitApprove(0)">保存并预览</span>
            </div>
        </template>
    </ui-dialog>
    <ui-dialog
v-model="showEmail"
        lock :prevent-confirm="true" prevent-layer
        title="预览" width="1100" wrap-class="dialog-entry-email"
    >
        <template slot="content">
            <div v-html="emailStr"></div>
        </template>
        <template slot="footer">
            <div class="btns">
                <span class="btn btn-outline btn-cancel" ka="dialog_cancel" @click="preStep()">上一步</span>
                <span class="btn btn-primary btn-sure" ka="dialog_sure" @click="submitApprove">提交</span>
            </div>
        </template>
    </ui-dialog>
    <AuditPreviewDialoig ref="auditPreviewDialoig" />
</div>
</template>
<script>
import { commonConfig, util, browerCtrl, filters, sessionstorage as SessionStorage, API  } from '@noah/tools';

const {
  _getDictTypes,
  _commonUserSearch,
  _batchGetDictInfo,
  _getShowWorkplaceList,
  _findProductLineByDept
} = API.COMMON;
const {
  _previewProgressOffer,
  _getDetailByProcessInstanceId
} = API.AUDIT;

const {
  offerDetails_pendingOffer,
  setOfferDetail,
  changeApproveStatus,
  employ,
  pinyin,
  _findDeptByName,
  _offerEmail,
  _getFloorByWorkplace
} = API.ENTRY;


import { _searchInfo } from '@/services/dashboard/meeting';
import { _getSpecialDictTypes } from '@/services/dashboard/system/common';
import { _getDictDetail } from '@/services/dashboard/system/dictionary';



import vSelect from '../../components/vue-select/index';
const { formatTime, _newDate } = filters;
const { TEMPLATES: templateOptions, SALARY_STRUCTURE_LIST } = commonConfig.entrance;
const { isNull, scrollToFormError, debounce } = util;
import AuditPreviewDialoig from '../audit-preview-dialog/index.vue';
import SourceMsg from './sourceMsg.vue';


let offerEmailCcVerify = (rule, value, callback) => {
  // pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  // if (value.trim()) {
  //     let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     let emilsArr = value.split(',');
  //     for (let email of emilsArr) {
  //         if (!reg.test(email.trim())) {
  //             callback(new Error('请检查邮箱填写格式，多个邮箱时请用英文逗号隔开'));
  //             break;
  //         }
  //     }
  // }
  callback();
};
let validatePositiveNum = (rule, value, callback) => {
  if (value && /\S/.test(value)) {
    let val = value.trim();
    let reg = /^\d+$/;
    reg.test(val) ? callback() : callback(new Error('请输入非负整数'));
  }
  callback();
};

export default {
  components: {
    vSelect,
    SourceMsg,
    AuditPreviewDialoig
  },
  mixins: [ browerCtrl ],
  props: {
    dicData:{
      type:Object,
      default: () =>({})
    },
    hasFatherData:{
      type:Boolean,
      defualt:false
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      const notChina = !this.formData.countryCode || !this.formData.countryCode.match('86');
      const pattern1 = /^1[3-9]\d{9}$/;
      const pattern2 = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
      const patternIsNum = /^\d+$/;
      if (pattern1.test(value) || pattern2.test(value) || !value || (notChina && patternIsNum.test(value))) {
        callback();
      } else {
        callback(new Error('手机号格式不正确'));
      }
    };

    const getValidateByManageSeq = (errorMsg) => {
      return (rule, value, callback) => {
        if (!this.formData.manageSeq && !value) {
          callback(new Error(errorMsg));
        } else {
          callback();
        }
      };
    };

    const validateContractTerm = (rule, value, callback) => {
      if (this.formData.userNature !== '03' && !value) {
        callback(new Error('请输入合同期限'));
      } else {
        callback();
      }
    };

    const getValidateStandardManage = (errorMsg) => {
      return (rule, value, callback) => {
        if (!value) {
          let Str =  `请输入${ ['01','05'].includes(this.formData.probationCode) ? '转正后' : ''}${errorMsg}`;
          callback(new Error(Str));
        } else {
          callback();
        }
      };
    };

    const validateCredentialNumber = (rule, value, callback) => {
      if (this.formData.credentialType !== '01') {
        callback();
      } else {
        const pattern = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (pattern.test(value)) {
          callback();
        } else {
          callback(new Error('身份证格式不正确'));
        }
      }
    };

    // formData.manageSeq


    const ruleData = {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      nameBopomofo: [
        {
          required: true,
          message: '请输入姓名拼音',
          trigger: 'blur'
        } /*,
                {pattern: /^[a-z]+$/, message: '拼音格式不正确', trigger: 'blur'}*/
      ],
      sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
      nationality: [{ required: true, message: '请选择国籍', trigger: 'change' }],
      // bussiness: [{ required: true, message: '请选择是否BOSS商业/店长商业', trigger: 'change' }],
      credentialNumber: [
        { required: true, message: '请输入证件号码', trigger: 'blur' },
        { validator: validateCredentialNumber, message: '身份证格式不正确', trigger: 'blur' }
      ],
      phoneNumber: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: validatePhone, message: '手机号格式不正确', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
      ],
      countryCode: [{ required: true, message: '请选择手机号码区号', trigger: 'change' }],
      educationRequired: [{ required: true, message: '请选择学历要求', trigger: 'change' }],
      sourcePath: [{ required: true, message: '请选择来源渠道', trigger: 'change' }],
      inviteUserId: [{ required: true, message: '请输入推荐人', trigger: 'change' }],
      userNature: [{ required: true, message: '请选择员工性质', trigger: 'change' }],
      productLine: [{ required: true, message: '请选择产品线', trigger: 'change' }],
      manageSeq: [{ required: true, message: '请选择管理序列', trigger: 'change' }],
      manageSeqSub: [
        { required: true, message: '请选择管理子序列', trigger: 'change' }
      ],
      manageStdPosition: [
        { required: true, message: '请选择管理准岗岗位', trigger: 'change' }
      ],
      manageSeqLevel: [
        { required: true, message: '请选择管理职级', trigger: 'change' }
      ],
      seq: [{ required: true, message: '请选择专业序列', trigger: 'change' }],
      seqSub: [
        { required: true, message: '请选择专业子序列', trigger: 'change' }
      ],
      stdPosition: [
        { required: true, message: '请选择专业准岗岗位', trigger: 'change' }
      ],
      seqLevel: [
        { required: true, message: '请选择专业职级', trigger: 'change' }
      ],

      deptCode: [{ required: true, message: '请输入部门', trigger: 'change' }],
      positionName: [{ required: true, message: '请输入岗位', trigger: 'blur' }],
      // reportToId: [{ required: true, message: '请输入汇报人', trigger: 'change' }],
      workplace: [{ required: true, message: '请输入工作地点', trigger: 'change' }],
      internshipPeriod: [
        { required: true, message: '请输入实习期限', trigger: 'blur' },
        { validator: validatePositiveNum, message: '实习期限为非负整数', trigger: 'blur' }
      ],
      internshipPermanent: [{ required: true, message: '请选择是否约定转正式', trigger: 'change' }],
      expectEntryDate: [{ required: true, message: '请选择预计入职日期', trigger: 'change' }],
      reportUser: [{ required: true, message: '请输入报到联系人', trigger: 'blur' }],
      reportUserPhone: [
        { required: true, message: '请输入报到联系人电话', trigger: 'blur' },
        { pattern: /^\d{0,11}$/, message: '电话格式不正确', trigger: 'blur' }
      ],
      reportLocation: [{ required: true, message: '请输入报到地点', trigger: 'blur' }],
      offerEmailModel: [{ required: true, message: '请选择offer模版', trigger: 'change' }],
      bpName: [{ required: true, message: '请输入招聘者', trigger: 'blur' }],
      // bpEmail: [
      //     { required: true, message: '请输入招聘者邮箱', trigger: 'blur' },
      //     { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
      // ],
      interviewEvaluation: [{ required: true, message: '请上传面试评估表', trigger: 'change' }],
      resumeAnnexe: [{ required: true, message: '请上传个人简历', trigger: 'change' }],
      educationAnnexe: [{ required: true, message: '请上传学历认证', trigger: 'change' }],
      // annexes: [{ required: true, message: '请上传附件', trigger: 'change' }],
      // socialInsurancePlace: [{ required: true, message: '请选择社保缴纳地', trigger: 'change' }],
      contractTerm: [
        { validator: validateContractTerm, trigger: 'change' },
        { validator: validatePositiveNum, message: '合同期限为非负整数', trigger: 'blur' }
      ],
      salary: [{ required: true, message: '请输入薪资', trigger: 'blur' }],
      offerEmailCc: [{ validator: offerEmailCcVerify, message: '请检查邮箱填写格式，多个邮箱时请用英文逗号隔开', trigger: 'blur' }],
      contractSubject: [{ required: true, message: '请输入合同主体', trigger: 'change' }],
      credentialType: [{ required: true, message: '请输入证件类型', trigger: 'change' }],

      credentialStartDate: [{ validator: this.validateIdCardDate('credentialStartDate', '请选择证件有效开始日期'), trigger: 'change' }],
      credentialEndDate: [{  validator: this.validateIdCardDate('credentialEndDate', '请选择证件有效截止日期'), trigger: 'change' }],

      rsu: [{ required: true, message: '请选择RSU约定', trigger: 'blur' }],
      rsuContent: [{ required: true, type: 'number', message: '请输入RSU约定价值', trigger: 'blur' }],
      probationCode: [{ required: true, message: '请选择试用期限', trigger: 'change' }],
      salaryStructure: [{ required: true, type: 'array', message: '请选择薪资结构', trigger: 'change' }],
      dayStandard: [{ required: true, type: 'number', message: '请输入日固定工资标准', trigger: 'change' }],

      monthStandard: [
        { validator: getValidateStandardManage('月固定工资标准'), trigger: 'change' }
      ],
      monthKpiStandard: [
        { validator: getValidateStandardManage('月度绩效工资标准'), trigger: 'change' }
      ],
      quarterKpiStandard: [
        { validator: getValidateStandardManage('季度绩效工资标准'), trigger: 'change' }
      ],

      endYearBonus: [{ required: true, type: 'number', message: '请输入年终固定奖金基数', trigger: 'change' }],
      yearKpiBonus: [{ required: true, type: 'number', message: '请输入年度绩效奖金基数', trigger: 'change' }],
      probationMonthStandard: [{ required: true, type: 'number', message: '请输入试用期月固定工资标准', trigger: 'change' }],
      probationMonthKpiStandard: [{ required: true, type: 'number', message: '请输入试用期月度绩效工资标准', trigger: 'change' }],
      probationQuarterKpiStandard: [{ required: true, type: 'number', message: '请输入试用期季度绩效工资标准', trigger: 'change' }]
      // agreedToFormalSalary: [{ required: true, type: 'number', message: '请输入实习约定转正式后标准薪资', trigger: 'change' }],
    };
    return {
      showEmail: false,
      emailStr: '',
      showUsersData: [],
      searchLoading: false,
      searchTimer: null,
      deptQueryTimer: null,
      peopleQueryTimer: null,
      // allUserData: [],
      offerEmailCcArray: [],
      timeout: null,
      peopleList: [],
      // peopleNomalList: [],    // 普通用户下拉列表
      inviteUserList: [],
      reportToList: [],
      reportTo2List: [],
      timestamp: new Date().getTime(),
      unature_timestamp: new Date().getTime(),
      formData: {
        id: '', // id
        name: '', // 姓名 ====== 候选人信息 ======
        nameBopomofo: '', // 姓名拼音
        sex: '', // 性别, 1男, 2女

        seqSub: '', // 子序列
        credentialType: '01', // 证件类型

        credentialStartDate: '', // 证件有效开始日期
        credentialEndDate: '', // 证件有效截止日期
        countryCode: '86', // 手机号码区号
        stdPosition: '', // 标准岗位
        contractSubject: '', // 合同主体
        reportToId2: '', // 汇报人2Id
        reportTo2: '', // 汇报人2name
        reportToId: '', // 汇报人id
        reportTo: '', // 汇报人name
        deptCode: '', // 部门 Id

        credentialNumber: '', //证件号码
        phoneNumber: '', //手机号码
        email: '', //个人邮箱
        sourcePath: '', //来源渠道
        educationRequired: '', // 学历要求
        inviteUserId: '', //推荐人
        bussiness: '', //是否BOSS商业/店长商业
        userNature: '', // 员工性质 ====== 任职信息 ======
        productLine: '', // 产品线
        entryType: '', //入职类型
        seq: '', //序列
        deptName: '', //部门
        positionName: '', //岗位
        seqLevel: '', //职级
        workplace: '', //工作地点
        floorCode: '', // 楼层
        manageSeq: '',              // 管理序列
        manageSeqSub: '',           // 管理子序列
        manageStdPosition: '',      // 管理标准岗位
        manageSeqLevel: '',         // 管理职级
        workplaceRemarks: '',
        internshipPeriod: '', //实习期限（月）
        internshipPermanent: '', //是否约定转正式
        socialInsurancePlace: '', //申请社保缴纳地
        socialInsuranceBase: '', //社保基数
        contractTerm: '', //合同期限（月）
        expectEntryDate: '', //预计入职日期 ====== 入职信息 ======
        reportLocation: '', //报到地点
        reportUser: '', //报到联系人
        reportUserPhone: '', //报到联系人电话
        offerEmailCc: '', //Offer邮件抄送人 ====== offer信息 ======
        offerEmailModel: '', //Offer模板
        bpName: '', //招聘者 ====== 其他信息 ======
        bpEmail: '', //招聘者邮箱,
        manager: [], //负责BP
        interviewEvaluation: '', //面试评估表
        annexes: '', //附件（多个）
        description: '', //备注说明,
        comment: '', // 审批意见 //备注说明
        managerArray: [],
        resumeAnnexe: '', // 个人简历
        educationAnnexe: '', // 学历附件
        rsu: '2',                    // RSU约定
        rsuContent: null,               // RSU约定价值
        sourceType: '',             // 来源
        sourceDesc: '',
        sourceId: '',
        probationCode: '',  // 试用期限
        salaryDTO: {
          salaryStructure: [],
          dayStandard: null,       // 日固定工资标准
          monthStandard: null,      // 月固定工资标准：
          monthKpiStandard: null,        // 月度绩效工资标准：
          quarterKpiStandard: null,                       // 季度绩效工资标准：
          endYearBonus: null,                        // 年终固定奖金：endYearBonus
          yearKpiBonus: null,                        // 年度绩效奖金： yearKpiBonus
          probationMonthStandard: null,      // 试用期月固定工资标准
          probationMonthKpiStandard: null, // 试用期月度绩效工资标准：
          probationQuarterKpiStandard: null, // 试用期季度绩效工资标准：probationQuarterKpiStandard
          agreedToFormalSalary: null,                     // 实习约定转正式后标准薪资： agreedToFormalSalary
          salaryAttachments: []
        }

      },
      virtualValidate: {
        interviewEvaluation: '',
        accessory: ''
      },
      id: '',
      editDialog: false,
      isEditCfg: {
        user: true,
        officeholding: true,
        practice: true,
        salary: true,
        entry: true,
        offer: true,
        other: true
      },
      templateOptions,
      formDataShow: {
        user: {
          name: '',
          nameBopomofo: '',
          sex: '',
          credentialNumber: '',
          phoneNumber: '',
          email: '',
          sourcePath: '',
          sourceDesc: '',
          sourceUser: '',
          bussiness: '',
          educationRequired: '',
          credentialType: '', // 证件类型

          // 日期
          credentialStartDate: '', // 证件有效开始日期
          credentialEndDate: '' // 证件有效截止日期
        },
        officeholding: {
          userNature: '',
          productLine: '',
          entryType: '',
          seq: '',
          seqLevel: '',
          seqRemarks: '',
          deptName: '',
          positionName: '',
          seqLevelRemarks: '',
          reportToId: '',
          reportTo: '',
          workplace: '',
          workplaceRemarks: '',
          stdPosition: '',
          reportTo: '',
          reportTo2: '',
          contractTerm: '',
          seqSub: ''
        },
        practice: {
          internshipAllowance: '',
          internshipPeriod: '',
          internshipPermanent: ''
        },
        salary: {

        },
        rsu: {
          rsu: '',
          rsuContent: null
        },
        entry: {
          expectEntryDate: '',
          reportLocation: '',
          reportUser: '',
          reportUserPhone: ''
        },
        offer: {
          offerEmailCc: '',
          offerEmailModel: ''
        },
        other: {
          bpName: '',
          bpEmail: '',
          description: '',
          interviewEvaluationList: [],
          annexesList: [],
          manager: [],
          resumeAnnexeList: [],
          educationAnnexeList: []  // 学历认证
        }
      },
      ruleData,
      offerId: '',
      accessoryList: [
        {
          fileName: '',
          url: '',
          relativePath: ''
        }
      ],

      allUserData: [],
      dictTypes: {},
      sql_level: [], // 职级 与序列联动
      interviewEvaluationDialog: {
        show: false
      },
      nameBopomofoOptions: [],
      seqList: [],                        // 序列
      deptList: [], // 部门下拉列表
      seqSubList: [], // 子序列下拉列表
      stdPositionList: [], // 标准岗位下拉列表
      workplaceArr: [], // 工作地点选择器数组
      workplaceDefaultValue: [], // 工作地点选择器默认显示值
      contractSubjectArr: [], // 合同主体选择器数组
      contractSubjectDefaultValue: [], // 合同主体默认显示值
      fromPage: '', // 来源页面
      magSeqList: [],
      magSql_level: [],
      magSeqSubList: [],
      magStdPositionList: [],
      offUserList: [], // offer邮件抄送人列表
      workplaceList: [],  // 工作地点list
      floorList: []
    };
  },
  computed: {
    notForbid() {
      return !this.editDialog;
    },
    SALARY_STRUCTURE_LIST() {
      if (!this.formData?.salaryDTO?.salaryStructure) {
        return SALARY_STRUCTURE_LIST;
      }
      if (this.formData.userNature === '03' && this.formData.salaryDTO.salaryStructure.includes('month')) {
        return SALARY_STRUCTURE_LIST.filter(item => ['day', 'month', 'monthKpi', 'quarterKpi'].includes(item.code));
      } else if (this.formData.userNature === '03'){
        return SALARY_STRUCTURE_LIST.filter(item => ['day', 'month'].includes(item.code));
      } else if (this.formData.salaryDTO.salaryStructure.includes('month')) {
        return SALARY_STRUCTURE_LIST;
      } else {
        return SALARY_STRUCTURE_LIST.filter(item => ['day', 'month', 'endYearBonus', 'yearKpiBonus'].includes(item.code));
      }
    },
    unitName() {
      try {
        let currency = this.formData.currency;
        let temp = this.dictTypes.currency.find(v => v.dictCode === currency);
        if (temp) {
          let arr = temp.remark.split(',');
          let map = {};
          arr.map(v => {
            map[v.split('=')[0]] = v.split('=')[1];
          });
          return map.unit;
        }
      } catch(e){}
      return '元';
    }
  },
  watch: {

    editDialog(val) {
      if (!val) {
        this.setEditing(0);
      }
    },
    workplaceArr(value) {
      if (!value || value.length === 0) {
        this.formData.workplace = '';
      }
      this.formData.workplace = value[value.length - 1];
    },
    contractSubjectArr(value) {
      if (!value || value.length === 0) {
        this.formData.contractSubject = '';
      }
      this.formData.contractSubject = value[value.length - 1];
      let temp = this.dictTypes.contract_body.find(v => v.dictCode == this.formData.contractSubject);
      if (temp) {
        try {
          let remark = JSON.parse(temp.remark || '{}');
          this.formData.currency = remark.currency || '01';
        } catch {}
      }
    },
    dicData: {
      immediate:true,
      deep:true,
      handler:function(value) {

        if(value?.seqList?.length) {
          this.seqList = value.seqList;
        }
        if(value?.magSeqList?.length) {
          this.magSeqList = value.magSeqList;
        }
        if(value?.allUserData?.length) {
          this.allUserData = value.allUserData;
        }
        if(value?.dictTypes) {
          this.dictTypes = value.dictTypes;
        }
      }
    },
    formData: {
      handler (data) {
        if (this.editDialog) {
          this.setEditing(1);
        } else {
          this.setEditing(0);
        }
      },
      // immediate: true,
      deep: true
    },
    uploadCfg: {
      handler (data) {
        if (this.editDialog) {
          this.setEditing(1);
        } else {
          this.setEditing(0);
        }
      },
      // immediate: true,
      deep: true
    }
  },
  created() {
    this.getShowWorkplaceList();
    if(!this.hasFatherData) {
      this.getSeqList();
      this.getMagSeqList();
      this.dictTypes = {
        source: [],
        employee_nature: [],
        // product_line: [],
        workplace: [], // 工作地点
        social_security_area: [],
        credentials_type: [],   // 证件类型
        sex: [],                // 性别
        entry_type: [],         // 入职类型
        whether_options: [],    // 是与否选择
        education_required: [], // 学历是否符合
        country_code: [],        // 手机区间号
        nationality: [],
        trial_period: [],       // 使用期限
        currency: [],
        contract_body: []
      };
      this.getDictTypes();
    }
  },
  methods: {
    formatTime,
    _newDate,
    validateIdCardDate(key, msg) {
      return (rule, value, callback) => {
        if (this.formData.credentialType !== '01') {
          callback();
        } else {
          if (this.formData[key]) {
            callback();
          } else {
            callback(new Error(msg));
          }
        }
      };
    },
    openPreview(relativePath) {
      const path = relativePath.split('||')[1];
      window.open(`/api/common/file/preview.json?ossPath=${path}`);
    },
    handleToFixed(key) {
      if (!this.formData.salaryDTO[key]) {
        return;
      }
      let numStr = this.formData.salaryDTO[key] + '';
      if (numStr.indexOf('.') > -1) {
        this.formData.salaryDTO[key] = +numStr.substring(0, numStr.indexOf('.')+3);
      }
    },
    async open(data, type) {
      this.id = data.id;
      this.fromPage = type;
      await this.getOfferDetails(this.id, type);
      this.editDialog = true;
    },
    async getOfferDetails(id, type) {
      try {
        // 如果是审批中心调用的 走通过流程id获取详情的接口
        const res =
                    type === 'audit_center' ? await _getDetailByProcessInstanceId({ processInstanceId: id }) : await offerDetails_pendingOffer({ id });
        if (res.success && res.root) {
          let nData = type === 'audit_center' ? (res.root.detail || {}) : res.root;
          const numberKeyList = ['dayStandard', 'monthStandard', 'monthKpiStandard', 'quarterKpiStandard', 'endYearBonus', 'yearKpiBonus', 'probationMonthStandard', 'probationMonthKpiStandard', 'probationQuarterKpiStandard', 'agreedToFormalSalary'];
          // this.formData.id = id;
          this.offerId= nData.id || this.id;
          if (!nData.salaryDTO) {
            nData.salaryDTO = {
              salaryStructure: [],
              dayStandard: null,       // 日固定工资标准
              monthStandard: null,      // 月固定工资标准：
              monthKpiStandard: null,        // 月度绩效工资标准：
              quarterKpiStandard: null,                       // 季度绩效工资标准：
              endYearBonus: null,                        // 年终固定奖金：endYearBonus
              yearKpiBonus: null,                        // 年度绩效奖金： yearKpiBonus
              probationMonthStandard: null,      // 试用期月固定工资标准
              probationMonthKpiStandard: null, // 试用期月度绩效工资标准：
              probationQuarterKpiStandard: null, // 试用期季度绩效工资标准：probationQuarterKpiStandard
              agreedToFormalSalary: null,                        // 实习约定转正式后标准薪资： agreedToFormalSalary
              salaryAttachments: []
            };
          }

          numberKeyList.forEach(k => {
            nData.salaryDTO[k] = !isNull(nData.salaryDTO[k]) ? +(nData.salaryDTO[k]) : null;
          });
          let rootData = JSON.parse(JSON.stringify(nData));
          Object.keys(rootData).forEach(key => {
            this.$set(this.formData, key,  rootData[key]);  // 赋默认值
          });
          ['credentialStartDate','credentialEndDate'].map(v => {
            this.$set(this.formData, v,  rootData[v] || '');
          });
          this.$set(this.formData, 'currency',  rootData.currency || '01');
          this.$set(this.formData.salaryDTO, 'salaryAttachments', this.formData.salaryDTO.salaryAttachments || []);
          this.formData.expectEntryDate = this.formData.expectEntryDate ? this.$dayjs(this.formData.expectEntryDate).format('YYYY-MM-DD HH:mm:ss') : '';
          this.formData.credentialEndDate = this.formData.credentialEndDate && formatTime(this.formData.credentialEndDate,'YMD');
          this.formData.credentialStartDate= this.formData.credentialStartDate && formatTime(this.formData.credentialStartDate,'YMD');
          // 强制dialog重新渲染
          this.timestamp = new Date().getTime();
          let nameBopomofoOptions = [];
          for (let val of nData.nameBopomofoList) {
            nameBopomofoOptions.push({
              dictCode: val,
              dictName: val
            });
          }
          this.nameBopomofoOptions = nameBopomofoOptions;
          if (!nData.interviewEvaluationList) {
            nData.interviewEvaluationList = [];
          }
          this.formData['interviewEvaluation'] = nData.interviewEvaluationList[0] && nData.interviewEvaluationList[0].relativePath;

          if (!nData.resumeAnnexeList) {
            nData.resumeAnnexeList = [];
          }
          this.formData['resumeAnnexe'] = nData.resumeAnnexeList[0] && nData.resumeAnnexeList[0].relativePath;

          let relativePathArr = [];
          if (nData.annexesList) {
            for (let item of nData.annexesList) {
              relativePathArr.push(item.relativePath);
            }
            this.formData.annexes = relativePathArr.join(',');
          }

          let educationPathArr = [];
          if (nData.educationAnnexeList) {
            for (let item of nData.educationAnnexeList) {
              educationPathArr.push(item.relativePath);
            }
            this.formData.educationAnnexe = educationPathArr.join(',');
          }

          for (let k in this.formData) {
            if (typeof this.formData[k] === 'number') this.formData[k] = String(this.formData[k]);
          }
          this.$set(this.formData, 'rsu', this.formData.rsu || '2');  // rus赋默认值
          if (this.formData.rsuContent) {
            this.$set(this.formData, 'rsuContent', +this.formData.rsuContent);  // 赋默认值
          }
          if (this.formData.offerEmailCc) {
            this.offerEmailCcArray = this.formData.offerEmailCc.split(',');
            this.offUserList = this.offerEmailCcArray.map(v => {
              return {
                value: v,
                name: v
              };
            });
          } else {
            this.offerEmailCcArray = [];
            this.offUserList = [];
          }
          if (this.formData.manager && this.formData.manager.length) {
            this.formData.managerArray = this.formData.manager.map((n) => JSON.stringify(n));
            this.peopleList = this.formData.manager.map((n) => {
              return {
                label: `${n.name}-${n.email}`,
                value: JSON.stringify({ name: n.name, email: n.email })
              };
            });
          }
          // 人员选择 初始化 值和name塞入列表中
          const {
            reportToId,
            reportTo,
            reportToId2,
            reportTo2,
            inviteUserId,
            sourceDesc,
            workplace,
            contractSubject,
            deptName,
            deptCode
          } = this.formData;
          this.pushPeopleNomalList(reportToId, reportTo, 'reportToList');
          this.pushPeopleNomalList(reportToId2, reportTo2, 'reportTo2List');
          this.pushPeopleNomalList(inviteUserId, sourceDesc, 'inviteUserList');
          this.pushPeopleNomalList(deptCode, deptName, 'deptList');

          if (workplace) {
            this.getFloorList([{value: workplace}], true);
            const workplaceObj = await this.getNameByCode('workplace', workplace);
            this.workplaceDefaultValue = [{ label: workplaceObj?.dictNameFullPath || '' }];
          } else {
            this.workplaceDefaultValue = [];
          }

          if (contractSubject) {
            const contractSubjectObj = await this.getNameByCode('contract_body', contractSubject);
            this.contractSubjectDefaultValue = [{ label: contractSubjectObj?.dictNameFullPath || '' }];
            let remark = JSON.parse(contractSubjectObj.remark || '{}');
            this.formData.currency = remark.currency || '01';
          } else {
            this.contractSubjectDefaultValue = [];
          }
          this.changeSeq('seq', nData.seq, true);
          this.changeSeqsub(nData.seqSub, true);

          this.changeMagSeq('seq', nData.manageSeq, true);
          this.changeMagSeqsub(nData.manageSeqSub, true);

          this.handleInternshipPermanentChange();
          this.salaryStructureChange();

          if (nData.credentialType === '01') {
            this.doEmploy();
          }
          this.formatShowData(nData);
          setTimeout(() => {
            this.setEditing(0);
          }, 400);
        }
      } catch (err) {
        console.error(err);
      }
    },
    formatShowData(obj) {
      let formDataShow = this.formDataShow;
      let o = JSON.parse(JSON.stringify(obj));

      for (let k in formDataShow) {
        for (let filed in formDataShow[k]) {
          if (isNull(o[filed]) && Array.isArray(formDataShow[k][filed])) {
            formDataShow[k][filed] = [];
          } else {
            formDataShow[k][filed] = o[filed];
          }
        }
      }
    },
    getSelectName(value, options) {
      if(options) {
        for (let item of options) {
          if (String(item.dictCode) === String(value)) {
            return item.dictName;
          }
        }
      }
    },
    getNameBopomofo(userName) {
      if (!userName || !userName.trim()) {
        this.formData.nameBopomofo = '';
        this.nameBopomofoOptions = [];
        return;
      }
      pinyin({ userName }).then((res) => {
        if (res.success) {
          if (res.root?.length === 1) {
            this.formData.nameBopomofo = res.root[0];
          }
          let nameBopomofoOptions = [];
          for (let val of res.root) {
            nameBopomofoOptions.push({
              dictCode: val,
              dictName: val
            });
          }
          this.nameBopomofoOptions = nameBopomofoOptions;
        }
      });
    },
    async doSetOfferDetail(type) {

      if (!this.$refs[`form_${type}`]) {
        return true;
      }



      const valid = await this.$refs[`form_${type}`].validate();
      if (valid) {
        return await this.setOfferDetail(type);
      } else {
        // if(type === 'salary' && this.formData.userNature === '03' && this.formData.internshipPermanent === '1') {
        //     this.$toast('请输入薪资', 'warning');
        // }
        return false;
      }
      // }
    },
    async setOfferDetail(type) {
      if (Object.prototype.toString.call(this.formData.expectEntryDate) === '[object Date]')
        this.formData.expectEntryDate = this.formatTime(this.formData.expectEntryDate, 'YMDHMS');
      const { success } = await setOfferDetail(type, {
        ...this.formData,
        salary: JSON.stringify(this.formData.salaryDTO)
      });
      return success;
    },
    delFile(index) {
      this.formDataShow.other.annexesList.splice(index, 1);
      let annexesArr = [];
      for (let item of this.formDataShow.other.annexesList) {
        annexesArr.push(item.relativePath);
      }
      this.formData.annexes = annexesArr.join(',');
    },
    delFile1(index) {
      this.formData.salaryDTO.salaryAttachments.splice(index, 1);
    },
    delEducationFile(index) {
      this.formDataShow.other.educationAnnexeList.splice(index, 1);
      let educationArr = [];
      for (let item of this.formDataShow.other.educationAnnexeList) {
        educationArr.push(item.relativePath);
      }
      this.formData.educationAnnexe = educationArr.join(',');
    },
    preview() {
      this.submitApprove(0, true);
    },
    async submitApprove(type, isPreview = false) {
      if (type !== 0) {
        changeApproveStatus(
          {
            ...this.formData,
            salary: JSON.stringify(this.formData.salaryDTO),
            action: 'submit',
            processInstanceId: this.fromPage === 'audit_center' ? this.id : ''
          },
          'submit'
        ).then((res) => {
          if (res.success) {
            this.editDialog = false;
            this.preStep();
            this.$toast({
              type: 'success',
              content: res.message || '提交成功'
            });

            setTimeout(() => {
              this.$emit('on-confirm');
            }, 1000);
          }
        });
        return;
      }
      if (Object.prototype.toString.call(this.formData.expectEntryDate) === '[object Date]')
        this.formData.expectEntryDate = this.formatTime(this.formData.expectEntryDate, 'YMDHMS');

      if (this.offerEmailCcArray && this.offerEmailCcArray.length) {
        this.formData.offerEmailCc = this.offerEmailCcArray
          .map((item) => {
            if (typeof item === 'object' && item.name) {
              return item.name;
            } else {
              return item;
            }
          })
          .join(',');
      } else {
        this.formData.offerEmailCc = '';
      }

      if (this.formData.managerArray && this.formData.managerArray.length) {
        this.formData.manager = this.formData.managerArray.map((n) => JSON.parse(n));
      } else {
        this.formData.manager = [];
      }
      for (let k in this.formDataShow) {
        const validate = await this.doSetOfferDetail(k);
        if (!validate) {
          this.validator();
          return false;
        }
      }
      scrollToFormError(null, '.form-error-tip');
      if (!await this.validator()) return;
      if (this.formData.salaryDTO.dayStandard && this.formData.salaryDTO.monthStandard) {
        this.$toast({
          type: 'warning',
          content:'标准日薪和标准月薪二者有且只能勾选一项'
        });
        return;
      }
      if (!this.formData.salaryDTO.salaryStructure.includes('day') && !this.formData.salaryDTO.salaryStructure.includes('month')) {
        this.$toast({
          type: 'warning',
          content:'标准日薪和标准月薪必须勾选一项'
        });
        return;
      }
      if (type === 0) {
        if(isPreview) {
          this.$refs.auditPreviewDialoig.open('loading');
          const { success, root } = await _previewProgressOffer({
            offerId: this.offerId
          });
          if(success && root) {
            this.$refs.auditPreviewDialoig.open(root);
          } else {
            this.$refs.auditPreviewDialoig.open('empty');
          }
        } else {
          const root = await _offerEmail({ offerId: this.offerId });
          this.showEmail = true;
          this.emailStr = root;
          // /api/offer/preview/offerEmail?offerId=
        }
      }
    },
    delInterviewEvaluation() {
      this.formDataShow.other.interviewEvaluationList = [];
      this.formData.interviewEvaluation = '';
    },
    delResume() {
      this.formDataShow.other.resumeAnnexeList = [];
      this.formData.resumeAnnexe = '';
    },
    mockClick() {
      this.$refs.upload.mockClick();
    },
    resumeMockClick() {
      this.$refs.resume.mockClick();
    },
    uploadEnd(res) {
      let nData = res.data;
      if (nData?.success) {
        let d = nData.root;
        this.formDataShow.other.interviewEvaluationList = [{ ...d }];
        this.formData.interviewEvaluation = d.relativePath;
      } else {
        this.$toast({
          content: nData?.message || '上传失败',
          type: 'warning'
        });
      }
    },
    uploadResumeEnd(res) {
      let nData = res.data;
      if (nData?.success) {
        let d = nData.root;
        this.formDataShow.other.resumeAnnexeList = [{ ...d }];
        this.formData.resumeAnnexe = d.relativePath;
      } else {
        this.$toast({
          content: nData?.message || '上传失败',
          type: 'warning'
        });
      }
    },
    beforeUpload() {
      if (this.formDataShow.other.annexesList.length > 9) {
        this.$toast({
          content: '最多添加十个附件',
          type: 'warning'
        });
        return;
      }
      this.$refs['uploadAnnexes'].mockClick();
    },
    beforeUpload1() {
      if (this.formData.salaryDTO.salaryAttachments.length > 9) {
        this.$toast({
          content: '最多添加十个薪资相关批件',
          type: 'warning'
        });
        return;
      }
      this.$refs['uploadAnnexes1'].mockClick();
    },
    beforeEducationUpload() {
      // if (this.formDataShow.other.educationAnnexeList.length > 9) {
      //     this.$toast({
      //         content: '最多添加十个附件',
      //         type: 'warning',
      //     });
      //     return;
      // }
      this.$refs['uploadEducation'].mockClick();
    },
    annexesUploadEnd(res) {
      let nData = res.data;
      if (nData?.success) {
        this.formDataShow.other.annexesList.push(nData.root);
        let annexesArr = [];
        for (let item of this.formDataShow.other.annexesList) {
          annexesArr.push(item.relativePath);
        }
        this.formData.annexes = annexesArr.join(',');
      } else {
        this.$toast({
          content: nData?.message || '上传失败',
          type: 'warning'
        });
      }
    },
    annexesUploadEnd1(res) {
      let nData = res.data;
      if (nData?.success) {
        this.formData.salaryDTO.salaryAttachments.push(nData.root.relativePath);
      } else {
        this.$toast({
          content: nData?.message || '上传失败',
          type: 'warning'
        });
      }
    },
    educationUploadEnd(res) {
      let nData = res.data;
      if (nData?.success) {
        this.formDataShow.other.educationAnnexeList.push(nData.root);
        let educationArr = [];
        for (let item of this.formDataShow.other.educationAnnexeList) {
          educationArr.push(item.relativePath);
        }
        this.formData.educationAnnexe = educationArr.join(',');
      } else {
        this.$toast({
          content: nData?.message || '上传失败',
          type: 'warning'
        });
      }
    },
    async changeSeq(dictType, parentCode, init) {
      if (!init) {
        this.formData.seqLevel = '';
        this.formData.seqSub = '';
      }
      if (parentCode) {
        this.sql_level = await this.getSeqLevelList(parentCode);
        this.seqSubList = await this.getSeqSubList(parentCode);
      } else {
        this.sql_level = [];
        this.seqSubList = [];
      }

      if (parentCode === '00') {
        this.formData.seqLevel = '0000';
        this.formData.seqSub = '0000';
        this.formData.stdPosition = '000000';
        this.changeSeqsub(this.formData.seqSub, true);
      }
    },
    // 改变子序列的值 触发获取标准岗位下拉选项
    async changeSeqsub(parentCode, init) {
      if (!init) {
        this.formData.stdPosition = '';
      }
      if (parentCode) {
        this.stdPositionList = await this.getStdPositionList(parentCode);
      } else {
        this.stdPositionList = [];
      }
    },

    // 改变职级的值 触发获取其他下拉选项
    async changeMagSeq(dictType, parentCode, init) {
      if (!init) {
        this.formData.manageSeqLevel = '';
        this.formData.manageSeqSub = '';
      }
      if (parentCode) {
        this.magSql_level = await this.getMagSeqLevelList(parentCode);
        this.magSeqSubList = await this.getMagSeqSubList(parentCode);
        // this.doGetDictTypes(dictType, parentCode);
      } else {
        this.magSql_level = [];
      }

      if (parentCode === '00') {
        this.formData.manageSeqLevel = '0000';
        this.formData.manageSeqSub = '0000';
        this.formData.manageStdPosition = '000000';
        this.changeMagSeqsub(this.formData.manageSeqSub, true);
      }
    },
    // 改变子序列的值 触发获取标准岗位下拉选项
    async changeMagSeqsub(parentCode, init) {
      if (!init) {
        this.formData.manageStdPosition = '';
      }
      if (parentCode) {
        this.magStdPositionList = await this.getMagStdPositionList(parentCode);
      } else {
        this.magStdPositionList = [];
      }
    },

    async getDictTypes() {
      try {
        const { success, root } = await _batchGetDictInfo({
          typeList: Object.keys(this.dictTypes)
        });
        if (success) {
          Object.keys(this.dictTypes).forEach((deictCode) => {
            if (root[deictCode] && root[deictCode].length) {
              this.dictTypes[deictCode] = root[deictCode];
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async validator() {

      // 非实习生必填项
      const userNatureModel = ['contractTerm', 'salary'];
      // 实习生必填项
      const userNature3Model = ['internshipPeriod', 'internshipPermanent'];
      // 统一必填项 26个（包括id）
      const validModelHeader = [
        'id',
        'name',
        'nameBopomofo',
        'sex',
        'credentialNumber',
        'phoneNumber',
        'email',
        'sourcePath',
        'inviteUserId',
        'educationRequired',
        'countryCode',
        // 'sourceDesc',
        'userNature',
        'productLine',
        'manageSeq',
        'manageSeqLevel',
        'manageSeqSub',
        'manageStdPosition',

        'seq',
        'seqLevel',
        'seqSub',
        'stdPosition',

        'deptCode',
        'positionName',
        // 'reportToId',
        'workplace',
        // 'bussiness',
        'contractSubject',
        'rsu'          // RSU约定
      ];
      const validModelfooter = [
        'expectEntryDate',
        'reportLocation',
        'reportUser',
        'reportUserPhone',
        'offerEmailModel',
        'bpName',
        'bpEmail',
        'interviewEvaluation',
        // 'annexes',
        'resumeAnnexe',   // 个人简历
        'educationAnnexe' // 学历认证
      ];
      // 必填提示
      const validModelMsg = {
        id: '', // id
        name: '请输入姓名', // 姓名 ====== 候选人信息 ======
        nameBopomofo: '请选择姓名拼音', // 姓名拼音
        sex: '请选择性别', // 性别, 1男, 2女
        credentialNumber: '请输入证件号码', //证件号码
        phoneNumber: '请输入手机号', //手机号码
        email: '请输入个人邮箱', //个人邮箱
        sourcePath: '请选择来源渠道', //来源渠道
        educationRequired: '请选择学历要求', // 学历要求
        inviteUserId: '请输入推荐人', //推荐人
        userNature: '请选择员工性质', // 员工性质 ====== 任职信息 ======       todo 实习生userNature==3，特殊处理
        productLine: '请选择产品线', // 产品线
        manageSeq: '请选择管理序列',
        manageSeqSub: '请选择管理子序列',
        manageStdPosition: '请选择管理准岗岗位',
        manageSeqLevel: '请选择管理职级',
        seq: '请选择专业序列', //   专业序列
        seqSub: '请选择专业子序列',
        stdPosition: '请选择专业准岗岗位',
        seqLevel: '请选择专业职级',

        deptCode: '请输入部门', //部门
        positionName: '请输入岗位', //岗位
        reportToId: '请输入汇报人', //汇报对象
        workplace: '请选择工作地点', //工作地点
        probationCode: '请选择试用期限',  // 试用期限
        // bussiness: '请选择是否BOSS商业/店长商业', //是否BOSS商业/店长商业
        internshipPeriod: '请输入实习期限', //实习期限（月）                      todo 实习生userNature==3，必填
        internshipPermanent: '请选择是否约定转正式', //是否约定转正式                   todo 实习生userNature==3，必填
        salary: '请输入薪资', //薪资 ====== 薪资信息 ======  todo 实习生userNature==3，非必填
        rsu: '请选择RSU约定',                    // RSU约定
        rsuContent: '请输入RSU约定价值',               // RSU约定价值
        // socialInsurancePlace: '请选择社保缴纳地 ', //申请社保缴纳地 todo 实习生userNature==3，非必填
        contractTerm: '请输入合同期限', //合同期限（月）          todo 实习生userNature==3，非必填
        expectEntryDate: '请输入预计入职日期', //预计入职日期 ====== 入职信息 ======
        reportLocation: '请输入报到地点', //报到地点
        reportUser: '请输入报到联系人', //报到联系人
        reportUserPhone: '请输入报到联系人电话', //报到联系人电话
        offerEmailModel: '请选择offer模板', //Offer模板
        bpName: '请输入招聘者名称', //招聘者 ====== 其他信息 ======
        bpEmail: '请输入招聘者邮箱', //招聘者邮箱
        interviewEvaluation: '请上传面试评估表', //面试评估表
        // annexes: '请上传附件', //附件（多个）
        resumeAnnexe: '请上传个人简历',   // 个人简历
        educationAnnexe: '请上传学历认证', // 学历认证
        countryCode: '请选择手机号码区号',
        contractSubject: '请输入合同主体'
      };
      const reg = /\S/; // reg.test(value);
      let validator = [];
      if (reg.test(this.formData.userNature) && this.formData.userNature == 3) {
        // 实习生
        validator = [...validModelHeader, ...userNature3Model, ...validModelfooter];
      } else {
        // 非实习生
        validator = [...validModelHeader, ...userNatureModel, ...validModelfooter];
      }
      if (this.formData.rsu === '1') {
        validator.push('rsuContent');  // RSU约定===1 的时候 检验约定价值
      }
      if (this.formData.userNature === '01') {
        validator.push('probationCode');  // 员工性质是正式员工的时候的时候 合同期限（月）
      }
      for (let k of validator) {
        if (!reg.test(this.formData[k]) || isNull(this.formData[k])) {
          this.locationFn(k);
          console.log('kkkkkkkkkkkkkkkkkkkkkkkkkk', k);
          this.$toast({
            type: 'warning',
            content: validModelMsg[k]
          });
          return false;
        }
      }
      const valid = await this.$refs[`form_salary`].validate();
      if (!valid) {
        this.$toast({
          type: 'warning',
          content: '请填写薪酬信息'
        });
        return false;
      }
      scrollToFormError(null, '.form-error-tip');
      return true;
    },
    locationFn(field) {
      // 定位到当前的位置
      let validator = {
        user: [
          'name',
          'nameBopomofo',
          'sex',
          'credentialNumber',
          'phoneNumber',
          'email',
          'countryCode',
          'credentialStartDate',
          'credentialEndDate',
          'sourcePath',
          'inviteUserId',
          'educationRequired'
        ],
        officeholding: [
          'userNature',
          'productLine',
          'entryType',
          'manageSeq',
          'manageSeqSub',
          'manageStdPosition',
          'manageSeqLevel',
          'seq',
          'seqSub',
          'stdPosition',
          'seqLevel',
          'deptCode',
          'positionName',
          'workplace',
          'bussiness',
          'contractSubject'
        ],
        practice: ['internshipPeriod', 'internshipPermanent'],
        salary: ['contractTerm', 'salary'],
        rsu: ['rsu', 'rsuContent'],
        entry: ['expectEntryDate', 'reportUser', 'reportUserPhone', 'reportLocation'],
        offer: ['offerEmailCc', 'offerEmailModel'],
        other: ['bpName', 'bpEmail', 'interviewEvaluation', 'description', 'resumeAnnexe', 'educationAnnexe']
      };
      let id = '';
      for (let _id in validator) {
        if (validator[_id].includes(field)) {
          id = _id;
          break;
        }
      }

      // document.getElementById(id).scrollIntoView();
    },
    doEmploy() {
      let credentialNumber = this.formData.credentialNumber && this.formData.credentialNumber.trim();
      let offerId = this.formData.id;

      if (credentialNumber && (this.formData.credentialType === '01')) {
        employ({ idNumber: credentialNumber, offerId })
          .then((res) => {
            if (res.success) {

              let root = res.root;
              const entryTypeValue = Number(root);
              if (entryTypeValue) {
                this.formData.entryType = entryTypeValue;
                this.formDataShow.officeholding.entryType = entryTypeValue;
              } else {
                this.formData.entryType = 1;
                this.formDataShow.officeholding.entryType = 1;
              }
            } else {
              this.formData.entryType = '';
              this.formDataShow.officeholding.entryType = '';
            }
          })
          .catch((err) => {});
      }
    },
    userNatureChange() {
      // 非实习生时，清空实习信息
      if (this.formData.userNature !== '03') {
        this.formData.internshipPeriod = '';
        this.formData.internshipPermanent = '';

      } else {
        this.formData.salaryDTO.contractTerm = '';
        this.formData.salaryDTO.probationCode = '';
      }
      this.formData.probationCode = '';

      this.formData.salaryDTO = {
        salaryStructure: [],
        dayStandard: null,       // 日固定工资标准
        monthStandard: null,      // 月固定工资标准：
        monthKpiStandard: null,        // 月度绩效工资标准：
        quarterKpiStandard: null,                       // 季度绩效工资标准：
        endYearBonus: null,                        // 年终固定奖金：endYearBonus
        yearKpiBonus: null,                        // 年度绩效奖金： yearKpiBonus
        probationMonthStandard: null,      // 试用期月固定工资标准
        probationMonthKpiStandard: null, // 试用期月度绩效工资标准：
        probationQuarterKpiStandard: null, // 试用期季度绩效工资标准：probationQuarterKpiStandard
        agreedToFormalSalary: null,                        // 实习约定转正式后标准薪资： agreedToFormalSalary
        salaryAttachments: []
      };
    },
    // 是否约定转正式修改
    handleInternshipPermanentChange() {
      if (this.formData.internshipPermanent + '' !== '1') {
        this.formData.salaryDTO.agreedToFormalSalary = null;
      }
    },
    salaryStructureChange() {
      if (!this.formData?.salaryDTO?.salaryStructure) {
        return;
      }

      if (!this.formData.salaryDTO.salaryStructure.includes('day')) {
        this.formData.salaryDTO.dayStandard = null;
      }
      if (!this.formData.salaryDTO.salaryStructure.includes('month')) {
        this.formData.salaryDTO.salaryStructure = this.formData.salaryDTO.salaryStructure.filter(item => !['monthKpi','quarterKpi'].includes(item));

        this.formData.salaryDTO.monthStandard = null;
        this.formData.salaryDTO.probationMonthStandard = null;

        this.formData.salaryDTO.monthKpiStandard = null;
        this.formData.salaryDTO.probationMonthKpiStandard = null;
        this.formData.salaryDTO.quarterKpiStandard = null;
        this.formData.salaryDTO.probationQuarterKpiStandard = null;
      }
      if (!this.formData.salaryDTO.salaryStructure.includes('monthKpi')) {
        this.formData.salaryDTO.monthKpiStandard = null;
        this.formData.salaryDTO.probationMonthKpiStandard = null;
      }
      if (!this.formData.salaryDTO.salaryStructure.includes('quarterKpi')) {
        this.formData.salaryDTO.quarterKpiStandard = null;
        this.formData.salaryDTO.probationQuarterKpiStandard = null;
      }
      if (!this.formData.salaryDTO.salaryStructure.includes('endYearBonus')) {
        this.formData.salaryDTO.endYearBonus = null;
      }
      if (!this.formData.salaryDTO.salaryStructure.includes('yearKpiBonus')) {
        this.formData.salaryDTO.yearKpiBonus = null;
      }
    },
    probationCodeChange() {
      if(!['01','05'].includes(this.formData.salaryDTO.probationCode)) {
        this.formData.salaryDTO.probationMonthStandard = null;      // 试用期月固定工资标准
        this.formData.salaryDTO.probationMonthKpiStandard = null; // 试用期月度绩效工资标准：
        this.formData.salaryDTO.probationQuarterKpiStandard = null; // 试用期季度绩效工资标准：probationQuarterKp
      }
    },
    async filterEmails(query) {
      if (query !== '') {
        const { success, root } = await _commonUserSearch({ key: query });
        if (success) {
          this.showUsersData = (root || []).map(n => {
            return {
              ...n,
              name: `${n.name}<${n.email}>`
            };
          });
        }
        this.searchLoading = false;
      } else {
        this.showUsersData = [];
      }
    },
    queryUser: debounce(300, async function(key) {
      try {
        if (!key) { return; }
        const { success, root } = await _searchInfo({ key });
        if (success) {
          // offer邮件抄送人列表
          this.offUserList = (root || []).map(n => {
            return {
              value: `${n.name}<${n.email}>`,
              name: `${n.name}-${n.deptName}-${n.email}`
            };
          });
        }
      } catch(error) {
        console.log(error);
      }
    }),
    formatLabelText(text, item, label) {
      if (!text) {
        return '';
      }
      return text.split('-').splice(0,2).join('-');
    },
    // id设为value
    throttlePeopleQueryNomal(key, listKey, state) {
      if (!key) {
        return [];
      }
      clearTimeout(this.peopleQueryTimer);
      this.peopleQueryTimer = setTimeout(async () => {
        try {
          const res = await _searchInfo({ key, state });
          if (res.success && res.root) {
            this[listKey] = res.root.map((n) => {
              return {
                name: `${n.name}-${n.deptName}-${n.email}`,
                value: n.id,
                label: `${n.name}-${n.deptName}`
              };
            });
          }
        } catch (e) {
          console.log(e);
        }
      }, 300);
    },
    peopleQuery(key) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(async () => {
        try {
          const res = await _searchInfo({ key });
          if (res.success) {
            if (res.root) {
              this.peopleList = res.root.map((n) => {
                return {
                  label: `${n.name}-${n.deptName}-${n.email}`,
                  value: JSON.stringify({ name: n.name, email: n.email })
                };
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      }, 300);
    },
    /**
         * @description 部门suggest方法
         * @param {String} 输入的内容
         */
    async handleQuery(name) {
      try {
        const { success, root } = await _findDeptByName({ name });
        if (success && root) {
          this.deptList = root.map((item) => {
            return {
              value: item.code,
              label: item.deptNameFullPath
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleSelectDept(value) {
      this.formData.deptName = this.getTextBycode(value, this.deptList);

      try {
        if (!value) {
          this.formData.productLine = '';
          return;
        }
        const id = this.getTextBycode(value, this.deptList, '', {
          codeKey: 'value',
          labelKey: 'id'
        });
        const { success, root } = await _findProductLineByDept({ id });
        if (success && root) {
          this.formData.productLine = root.name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取序列下拉列表
    async getSeqList() {
      const { root } = await _getSpecialDictTypes({
        dictType: 'seq',
        url: '/api/sys/dict/seq/list.json'
      });
      this.seqList = root || [];
    },
    // 获取管理序列下拉列表
    async getMagSeqList() {
      const { root } = await _getSpecialDictTypes({
        dictType: 'manage_seq',
        url: '/api/sys/dict/manageSeq/list.json'
      });
      this.magSeqList = root || [];
    },
    // 获取下拉列表方法
    async getSpecialDict(parentCode, url, dictType = 'seq') {
      if (!parentCode) {
        return [];
      }
      const { root } = await _getSpecialDictTypes({
        dictType,
        url,
        parentCode
      });
      return root || [];
    },
    // 获取子序列下拉列表
    getSeqSubList(parentCode) {
      return this.getSpecialDict(parentCode, '/api/sys/dict/sub/list.json');
    },
    // 获取职级下拉列表
    getSeqLevelList(parentCode) {
      return this.getSpecialDict(parentCode, '/api/sys/dict/level/list.json');
    },
    // 获取标准岗位下拉列表
    getStdPositionList(parentCode) {
      return this.getSpecialDict(parentCode, '/api/sys/dict/position/list.json', 'seq_sub');
    },

    // 获取管理子序列下拉列表
    getMagSeqSubList(parentCode) {
      return this.getSpecialDict(parentCode, '/api/sys/dict/manageSub/list.json', 'manage_seq');
    },
    // 获取管理职级下拉列表
    getMagSeqLevelList(parentCode) {
      return this.getSpecialDict(parentCode, '/api/sys/dict/manageLevel/list.json', 'manage_seq');
    },
    // 获取管理标准岗位下拉列表
    getMagStdPositionList(parentCode) {
      return this.getSpecialDict(parentCode, '/api/sys/dict/managePosition/list.json', 'manage_seq_sub');
    },

    async leaveList(parentCode, dictType) {
      // 修改，也从dictTypes获取数据
      if (this.dictTypes?.hasOwnProperty(dictType)) {
        return this.dictTypes[dictType]?.map((node) => {
          node.isLeaf = node.childCount === 0;
          return node;
        });
      }
      let res = await _getDictTypes({ parentCode, dictType, canEnable: false });
      if (res.success && res.root && res.root.length) {
        return (res.root || []).map((node) => {
          node.isLeaf = node.childCount === 0;
          return node;
        });
      }
      return [];
    },

    /**
         * @description 对多层级select组件 获取下拉列表值
         * @param {String} dictType 字典对应的code值
         */
    async loadData(node, resolve, dictType) {
      // 判断是不是没有子节点
      if (node.isLeaf) {
        return resolve([]);
      }
      const parentCode = node.level === 0 ? null : node.data.dictCode;
      const result = await this.leaveList(parentCode, dictType);
      return resolve(result);
    },
    // 获取工作地点
    async getShowWorkplaceList() {
      try {
        const { success, root } = await _getShowWorkplaceList();
        if (!success) return;
        this.workplaceList = root;
      } catch (error) {
        console.log(error);
      }
    },
    // 通过code和list获取对应的label
    getTextBycode(code, options = [], defaultValue = '', { codeKey = 'value', labelKey = 'label' } = {}) {
      const selectItem = options.find((item) => {
        return String(item[codeKey]) === String(code);
      });
      return selectItem ? selectItem[labelKey] : defaultValue;
    },
    handleQueryReportTo(value, { valueKey, nameKey, listKey }) {
      // if (valueKey) {
      //     this.formData[valueKey] = this.getTextBycode(value, this[listKey], '', 'value');
      // }
      if (nameKey) {
        this.formData[nameKey] = this.getTextBycode(value, this[listKey]);
      }
    },
    pushPeopleNomalList(value, label, list) {
      if (value && label) {
        this[list] = [
          {
            value,
            label,
            name: label
          }
        ];
      }
    },
    /**
         * @description 通过code获取字典name
         * @param {String} dictType 字典类型
         * @param {String} dictCode 字典
         */
    async getNameByCode(dictType, dictCode) {
      try {
        const { success, root } = await _getDictDetail({
          dictType,
          dictCode,
          param: 'Code'
        });
        return root;
      } catch (e) {
        console.log(e);
      }
    },
    /**
         * @description 部门suggest方法
         * @param {String} 输入的内容
         */
    async throttleHandleDeptQuery(name) {
      try {
        if (!name) {
          return [];
        }
        if (this.deptQueryTimer) {
          clearTimeout(this.deptQueryTimer);
        }
        this.deptQueryTimer = setTimeout(async () => {
          const { success, root } = await _findDeptByName({ name });
          if (success && root) {
            this.deptList = root.map((item) => {
              return {
                value: item.code,
                label: item.deptNameFullPath,
                id: item.id
              };
            });
          }
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
    handleNation() {
      const value = this.formData.nationality;
      switch (value) {
        case '156': // 中国
          this.formData.credentialType = '01';
          break;
        case '158': // 中国台湾
          this.formData.credentialType = '03';
          break;
        case '344': //中国香港
          this.formData.credentialType = '04';
          break;
        case '446': // 中国澳门
          this.formData.credentialType = '04';
          break;
        default: // 其他
          this.formData.credentialType = '02';
      }
      this.handleCredentialTypeChange();
    },
    handleCredentialTypeChange() {
      const value = this.formData.credentialType;
      if (value && value !== '01') {
        this.formData.entryType = 1;
      } else {
        this.formData.entryType = '';
      }
      this.formData.credentialNumber = '';
    },
    // 关闭弹窗
    onCloseDialog() {
      const IS_EDITING =  SessionStorage.get('IS_EDITING');
      if (!IS_EDITING) {
        this.editDialog = false;
        return;
      }
      this.$dialog({
        title: '温馨提示',
        content: '您有数据未保存，确认关闭弹窗吗？',
        type: 'warning',
        onConfirm: () => {
          this.editDialog = false;
        }
      });
    },
    forbidCallback() {
      this.editDialog = false;
      window.history.pushState(null, null, this.pageUrl);
    },
    handleRSUChange(val) {
      this.formData.rsuContent = null;
    },
    preStep() {
      this.showEmail = false;
      this.emailStr = '';
    },
    // 获取楼层list
    getFloorList: debounce(300, async function(value, init) {
      try {
        let workplaceCodeObj = value ? value[value.length - 1] : {};
        let val = '';
        if (workplaceCodeObj?.value) {
          val = workplaceCodeObj.value.split('/').reverse()[0];
        }
        if (!init) {
          this.formData.floorCode = '';
          this.floorList = [];
        }
        if (!val) {
          return;
        }
        const { success, root } = await _getFloorByWorkplace({workplaceCode: val});
        if (!success) {
          return;
        }
        this.floorList = root;
      } catch (error) {
        console.log(error);
      }
    })
  },
  filters: {}
};
</script>
<style lang="less" scoped>
.offer-dialog-title {
    font-size: 18px;
    font-weight: 500;
    color: #151B26;
    padding: 0 0px;
    margin-top: -6px;
    span {
        display: inline-block;
        margin-left: 12px;
        font-size: 13px;
        color: #ed3f14;
    }
}
.v-select {
    ::v-deep .vs__search::placeholder {
        color: #c9c9c9;
    }
}
</style>
<style lang="less">

.dialog-entry-email {
    z-index: 1999;
    .dialog-body {
        margin-right: -30px;
        padding-right: 30px;
        overflow: overlay;
        overflow: auto;
        max-height:  calc(~'100vh - 148px')!important;
    }
    .dialog-footer {
        margin-top: 10px;
    }
}
.dialog-offer-approve {
    .dialog-body {
        margin-right: -30px;
        padding-right: 30px;
    }

    .inputnumber-wrap {
        width: 100%;
    }
    .item-group .ui-row .inputnumber-wrap.input-wrap.year-kpi-bonus {
        width: calc(~'100% - 28px');
        float: left;
    }
    .year-kpi-bonus-left {
        float: left;
        line-height: 40px;
        margin-right: 3px;
    }
    .entry-salary {
        .ui-form .form-item {
            margin-bottom: 20px;
        }
    }
}
.dialog-resume-full {
    .dialog-body {
        .resume-content {
            .item-with-bottom {
                .form-item {
                    margin-bottom: 24px;
                }
            }
            .item-group .label.red-asterisk:before {
                font-size: 13px;
            }
        }

        .ui-suggest {
            width: calc(~'100% - 30px');
            min-width: 100px;
        }

        .ui-cascader-new.query.contract-subject {
            .input-wrap {
                width: 100%;
            }
        }
    }
    .dialog-footer {
        margin-top: 0;
        padding-top: 10px;
    }
}
.expect-entry-date {
    .el-date-editor {
        width: 100%;
        // height: 42px;

        input {
            // height: 42px;

            &:hover {
                border-color: #2cd7c8;
            }
        }
    }
}
.entry-v-select {
    width: 100%;
    // min-height: 42px;
    // .vs__dropdown-toggle {
    //     min-height: 42px;
    // }
}
.resume-content {
    .item-group .input-wrap-textarea .input {
        // min-height: 42px !important;
    }
    .ui-date-editor input {
        padding-left: 32px !important;
    }
}
.ui-select-multiple {
    .ui-select-selection,
    .ui-select-inner {
        min-height: 34px;
        height: auto !important;
        .ui-tag {
            white-space: normal;
            margin: 3px 18px 3px 3px;
        }
    }
}
</style>
