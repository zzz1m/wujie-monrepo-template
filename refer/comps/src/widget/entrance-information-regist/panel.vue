<template>
<div class="information-regist-panel">
    <!-- 头部面包屑 -->
    <div class="regist-head">
        <ui-tab v-model="activeTab" show-bar
            @tab-click="scrollToView"
        >
            <ui-tab-pane v-for="tab in tabs" :key="tab.name"
                :label="tab.label" :name="tab.name"
            ></ui-tab-pane>
        </ui-tab>
    </div>
    <!-- 中间主题内容 -->
    <div ref="content" class="regist-content">
        <ui-form ref="form" :model="param" :rules="ruleData"
            @submit.native.prevent="validForm(false)"
        >
            <!-- 基本信息 -->
            <h4 id="basic">
                <svg-icon icon-class="info-basic"></svg-icon>
                <span>基本信息</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="姓名" prop="name">
                    <ui-input v-model.trim="param.name"
                        clearable :maxlength="40" placeholder="请输入"
                    ></ui-input>
                </form-item>
                <form-item label="姓名拼音" prop="nameBopomofo">
                    <ui-input v-model.trim="param.nameBopomofo"
                        clearable placeholder="请输入"
                    ></ui-input>
                    <!-- <ui-select v-model="param.nameBopomofo">
                        <ui-option v-for="item in nameBopomofoOptions" :key="item.dictCode" :value="item.dictCode">{{
                            item.dictName
                        }}</ui-option>
                    </ui-select> -->
                </form-item>
                <form-item label="员工性质" prop="userNature">
                    <ui-select v-model="param.userNature">
                        <ui-option v-for="item in dicInfo.employee_nature"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="入职类型" prop="entryType">
                    <ui-select v-model="param.entryType">
                        <ui-option v-for="item in dicInfo.user_entry_type"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="计薪日期" prop="salaryDate">
                    <ui-date-picker v-model="param.salaryDate"
                        placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                    ></ui-date-picker>
                </form-item>
                <form-item label="入职日期" prop="joinDate">
                    <ui-date-picker v-model="param.joinDate"
                        placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                        @on-change="calcShouldPositiveTime()"
                    ></ui-date-picker>
                </form-item>
                <!-- 正式员工才展示 -->
                <template v-if="param.userNature == '01'">
                    <form-item label="试用期限" prop="probationCode">
                        <ui-select v-model="param.probationCode"
                            @on-change="calcShouldPositiveTime()"
                        >
                            <ui-option v-for="item in dicInfo.trial_period"
                                :key="item.dictCode" :value="item.dictCode"
                            >{{ item.dictName }}</ui-option>
                        </ui-select>
                    </form-item>
                    <form-item label="应转正日期" prop="shouldPositiveTime">
                        <ui-date-picker v-model="param.shouldPositiveTime"
                            placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                        ></ui-date-picker>
                    </form-item>
                </template>

                <form-item label="是否参与考勤统计" prop="noAttendanceFlag">
                    <ui-select v-model="param.noAttendanceFlag">
                        <ui-option v-for="item in dicInfo.whether_options"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="首次参加工作日期" prop="startWorkDate">
                    <ui-date-picker v-model="param.startWorkDate"
                        placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                    ></ui-date-picker>
                </form-item>
                <form-item label="最高学历" prop="education">
                    <ui-select v-model="param.education">
                        <ui-option v-for="item in dicInfo.user_education"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="来源渠道" prop="source">
                    <ui-select v-model="param.source">
                        <ui-option v-for="item in dicInfo.source"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="推荐人" prop="inviteUserId">
                    <ui-select v-model="param.inviteUserId"
                        clearable filterable remote
                        :remote-method="name => queryMember(name, 'inviteUserList')"
                    >
                        <template v-for="(item,idx) in inviteUserList">
                            <ui-option :key="idx" :label="item.label" :value="item.value">{{ item.fulllabel }}</ui-option>
                        </template>
                    </ui-select>
                </form-item>
                <!-- <form-item label="企业邮箱">
                    <span class="form-item-value">{{ formData.companyEmail | placeholder }}</span>
                </form-item>
                <form-item label="群组" prop="emailGroup">
                    <ui-select v-model="param.emailGroup">
                        <ui-option v-for="item in wifiGroupList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item> -->
            </div>
            <!-- 入职信息 -->
            <h4 id="entry">
                <svg-icon icon-class="info-entry"></svg-icon>
                <span>入职信息</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="部门" prop="deptId">
                    <ui-select v-model="param.deptId"
                        clearable filterable remote
                        :remote-method="queryDept"
                    >
                        <template v-for="(item,idx) in deptList">
                            <ui-option :key="idx" :value="item.value">{{ item.label }}</ui-option>
                        </template>
                    </ui-select>
                </form-item>
                <form-item label="汇报人" prop="reporterId">
                    <ui-select v-model="param.reporterId"
                        clearable filterable label-in-value remote
                        :remote-method="name => queryMember(name, 'reporterList')"
                        @on-change="selectReporter"
                    >
                        <template v-for="(item,idx) in reporterList">
                            <ui-option :key="idx" :label="item.label" :value="+item.value">{{ item.fulllabel }}</ui-option>
                        </template>
                    </ui-select>
                </form-item>
                <form-item label="汇报人2">
                    <ui-select v-model="param.reporterId2"
                        clearable filterable label-in-value remote
                        :remote-method="name => queryMember(name, 'reporter2List')"
                        @on-change="selectReporter2"
                    >
                        <template v-for="(item,idx) in reporter2List">
                            <ui-option :key="idx" :label="item.label" :value="+item.value">{{ item.fulllabel }}</ui-option>
                        </template>
                    </ui-select>
                </form-item>
                <form-item label="岗位" prop="position">
                    <ui-input v-model.trim="param.position"
                        clearable :maxlength="100" placeholder="请输入"
                    ></ui-input>
                </form-item>

                <form-item label="管理序列" prop="manageSeq">
                    <ui-select v-model="param.manageSeq" @on-change="changeManageSeqFormData">
                        <ui-option v-for="item in manageSeqList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="管理职级" prop="manageSeqLevel">
                    <ui-select v-model="param.manageSeqLevel">
                        <ui-option v-for="item in manageSeqLevelList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="管理子序列" prop="manageSeqSub">
                    <ui-select v-model="param.manageSeqSub">
                        <ui-option v-for="item in manageSeqSubList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>

                <form-item label="管理标准岗位" prop="manageStdPosition">
                    <ui-select v-model="param.manageStdPosition">
                        <ui-option v-for="item in manageStdPositionList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>

                <form-item label="专业序列" prop="seq">
                    <ui-select v-model="param.seq" @on-change="changeSeqFormData">
                        <ui-option v-for="item in seqList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="专业职级" prop="seqLevel">
                    <ui-select v-model="param.seqLevel">
                        <ui-option v-for="item in seqLevelList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="专业子序列" prop="seqSub">
                    <ui-select v-model="param.seqSub">
                        <ui-option v-for="item in seqSubList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>

                <form-item label="专业标准岗位" prop="stdPosition">
                    <ui-select v-model="param.stdPosition">
                        <ui-option v-for="item in stdPositionList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="工作地点" prop="workplace">
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
                <form-item label="" prop="floorCode">
                    <div class="label">楼层</div>
                    <ui-select
                        v-model="param.floorCode"
                        clearable
                        placeholder="请选择"
                    >
                        <ui-option v-for="item in floorList" :key="item.dictCode" :value="item.dictCode">{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="组长名单" prop="leaderType">
                    <ui-select v-model="param.leaderType">
                        <ui-option v-for="item in dicInfo.leader_type"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="总部TL名单" prop="isHeadTl">
                    <ui-select v-model="param.isHeadTl">
                        <ui-option v-for="item in headTlList"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="区总/城主名单" prop="lordsDistrict">
                    <ui-select v-model="param.lordsDistrict">
                        <ui-option v-for="item in dicInfo.lords_district"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
            </div>
            <!-- 合同社保 - 合同 -->
            <h4 id="contract">
                <svg-icon icon-class="info-contract"></svg-icon>
                <span>合同信息</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="签订类型" prop="signType">
                    <ui-select v-model="param.signType">
                        <ui-option v-for="item in dicInfo.contract_sign_type"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="合同类型" prop="contractType">
                    <ui-select v-model="param.contractType"
                        @on-change="changeContractType"
                    >
                        <ui-option v-for="item in dicInfo.contract_type"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="合同主体" prop="contractSubject">
                    <ui-select v-model="param.contractSubject">
                        <ui-option v-for="item in dicInfo.contract_body"
                            :key="item.dictCode" :value="item.dictCode"
                        >{{ item.dictName }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="合同期限" prop="contractDuration" :required="param.contractType !== '--'">
                    <label slot="label">合同期限：</label>
                    <div class="duration-content">
                        <ui-select
                            v-model="formData.duration"
                            :disabled="param.contractType === '--'"
                            @on-change="changeContractDeadline"
                        >
                            <ui-option
                                v-for="item in durationList[formData.unit]" :key="item.dictCode"
                                :value="item.dictCode"
                            >{{ item.dictName }}
                            </ui-option>
                        </ui-select>
                        <ui-select
                            v-model="formData.unit"
                            :disabled="param.contractType === '--'"
                            @on-change="changeUnit"
                        >
                            <template v-for="item in dicInfo.contract_deadline">
                                <ui-option
                                    v-if="!item.parentCode"
                                    :key="item.dictCode"
                                    :value="item.dictCode"
                                >{{ item.dictName }}</ui-option>
                            </template>
                        </ui-select>
                    </div>
                </form-item>
                <form-item label="合同开始日期" prop="contractStartDate">
                    <ui-date-picker v-model="param.contractStartDate"
                        placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                        @on-change="calcContractDeadDate"
                    >
                    </ui-date-picker>
                </form-item>

                <form-item v-if="param.contractType !== '--'" key="contractEndDate"
                    label="合同结束日期" prop="contractEndDate"
                >
                    <ui-date-picker v-model="param.contractEndDate"
                        placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                    >
                    </ui-date-picker>
                </form-item>
                <form-item v-else key="contractEndDate-disabled" label="合同结束日期">
                    <ui-date-picker disabled placeholder="请选择" type="date">
                    </ui-date-picker>
                </form-item>

                <form-item class="large" label="合同签订说明">
                    <ui-input v-model.trim="param.contractDescription"
                        clearable :maxlength="500" placeholder="请输入"
                    ></ui-input>
                </form-item>
            </div>
            <!-- 合同社保 - 社保公积金 -->
            <!-- <h4>
                    <svg-icon icon-class="info-insurance"></svg-icon>
                    <span>社保公积金</span>
                </h4>
                <div class="form-item-viewer">
                    <form-item label="社保公积金缴纳城市" prop="payCity">
                        <ui-select v-model="param.payCity">
                            <ui-option v-for="item in dicInfo.social_security_area"
                                :value="item.dictCode" :key="item.dictCode">{{ item.dictName }}</ui-option>
                        </ui-select>
                    </form-item>
                    <form-item label="是否超过社保缴纳上限"  prop="isOverflow">
                        <ui-select v-model="param.isOverflow">
                            <ui-option v-for="item in dicInfo.whether_options"
                                :value="item.dictCode" :key="item.dictCode">{{ item.dictName }}</ui-option>
                        </ui-select>
                    </form-item>
                    <form-item label="社保缴纳基数" prop="payBase">
                        <ui-input v-model.trim="param.payBase"
                            clearable placeholder="请输入" :maxlength="10"
                            @on-change="changePayBase"></ui-input>
                    </form-item>
                    <form-item label="本年度首次参加工作" prop="isFirstJob">
                        <ui-select v-model="param.isFirstJob">
                            <ui-option v-for="item in dicInfo.whether_options"
                                :value="item.dictCode" :key="item.dictCode">{{ item.dictName }}</ui-option>
                        </ui-select>
                    </form-item>
                </div> -->
            <!-- 个人档案 -->
            <!-- 个人档案 - 证件信息-->
            <h4 id="archives">
                <svg-icon icon-class="info-certificate"></svg-icon>
                <span>证件信息</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="国籍">
                    <span class="form-item-value">{{ calcCascaderPlaceholder(formData.userDetailInfo, 'nationalityName') }}</span>
                </form-item>
                <form-item label="其他永居身份">
                    <span class="form-item-value">{{ calcCascaderPlaceholder(formData.userDetailInfo, 'otherPermanentResidentName') }}</span>
                </form-item>
                <form-item label="籍贯">
                    <span class="form-item-value">{{ calcCascaderPlaceholder(formData.userDetailInfo, 'hometown') }}</span>
                </form-item>
                <form-item label="民族">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'nation', 'nation') }}</span>
                </form-item>
                <form-item label="户口所在地">
                    <span class="form-item-value">{{ calcCascaderPlaceholder(formData.userDetailInfo, 'censusRegisterLocation') }}</span>
                </form-item>
                <form-item label="户口所在精确地址">
                    <!-- todo -->
                    <span class="form-item-value">{{ calcCascaderPlaceholder(formData.userDetailInfo, 'censusAddress') }}</span>
                </form-item>
                <form-item label="户口性质">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'censusRegisterType', 'household_registration_type') }}</span>
                </form-item>
                <form-item label="证件类型">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'idType', 'credentials_type') }}</span>
                </form-item>
                <!-- 证证件 -->
                <form-item v-if="formData.userDetailInfo"
                    label="证件号码"
                >
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'credentialNumber') }}</span>
                </form-item>
                <template v-if="formData.userDetailInfo">
                    <form-item label="证件有效期起始日">
                        <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'credentialStartDate') }}</span>
                    </form-item>
                    <form-item label="证件有效期终止日">
                        <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'credentialEndDate') }}</span>
                    </form-item>
                </template>
            </div>
            <!-- 个人档案 - 联系方式 -->
            <h4>
                <svg-icon icon-class="info-phone"></svg-icon>
                <span>联系方式</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="手机号码国家码">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'countryCode', 'country_code') }}</span>
                </form-item>
                <form-item label="手机号码">
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'phone') }}</span>
                </form-item>
                <form-item label="微信号">
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'wechat') }}</span>
                </form-item>
                <form-item label="个人邮箱">
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'email') }}</span>
                </form-item>
                <form-item label="现住省市区">
                    <span class="form-item-value">{{ calcCascaderPlaceholder(formData.userDetailInfo, 'currentProvince') }}</span>
                </form-item>
                <form-item label="现住精确地址">
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'address') }}</span>
                </form-item>
            </div>
            <!-- 个人档案 - 银行卡信息 -->
            <h4>
                <svg-icon icon-class="info-bank"></svg-icon>
                <span>银行卡信息</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="开户行">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'openBank', 'open_bank') }}</span>
                </form-item>
                <form-item label="开户网点">
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'branch') }}</span>
                </form-item>
                <form-item label="账号">
                    <span class="form-item-value">{{ calcPlaceholder(formData.userDetailInfo, 'bankCard') }}</span>
                </form-item>
            </div>
            <!-- 个人档案 - 工作经历 -->
            <h4>
                <svg-icon icon-class="info-work"></svg-icon>
                <span>工作经历</span>
            </h4>
            <data-table :config="config.work" :data="formData.workingExpList"></data-table>

            <!-- 个人档案 - 教育经历 -->
            <div class="flex-education">
                <h4 class="edu-left">
                    <svg-icon icon-class="info-education"></svg-icon>
                    <span>教育经历</span>
                </h4>
                <button v-if="formData.educationExp && formData.educationExp.length" class="btn btn-primary" @click="addEducation">新增</button>
            </div>
            <!-- <data-table :data="formData.educationExp" :config="config.edu" :meta-value="dicInfo"></data-table> -->
            <data-edit-table
                ref="editEdu"
                :config="config.edu"
                :data="formData.educationExp"
                :detail-id="detailId || String(formData.detailId)"
                :meta-value="dicInfo"
            ></data-edit-table>
            <!-- 个人档案 - 家庭成员 -->
            <h4>
                <svg-icon icon-class="info-family"></svg-icon>
                <span>家庭成员</span>
            </h4>
            <data-table :config="config.family" :data="formData.familyNumber" :meta-value="dicInfo"></data-table>

            <!-- 个人档案 - 紧急联系人 -->
            <h4>
                <svg-icon icon-class="info-contact"></svg-icon>
                <span>紧急联系人</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="紧急联系人">
                    <span class="form-item-value">{{ calcPlaceholder(formData.emergencyPerson, 'numberName') }}</span>
                </form-item>
                <form-item label="与紧急联系人关系">
                    <span class="form-item-value">{{ showDicName(formData.emergencyPerson, 'numberRelation', 'staff_relation') }}</span>
                </form-item>
                <form-item label="紧急联系人联系方式">
                    <span class="form-item-value">{{ calcPlaceholder(formData.emergencyPerson, 'numberPhone') }}</span>
                </form-item>
                <form-item label="紧急联系人通讯地址">
                    <span class="form-item-value">{{ calcPlaceholder(formData.emergencyPerson, 'numberAddr') }}</span>
                </form-item>
            </div>
            <!-- 个人档案 - 政治面貌 -->
            <h4>
                <svg-icon icon-class="info-political"></svg-icon>
                <span>政治面貌</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="政治面貌">
                    <span class="form-item-value">{{ showDicName(formData.politicsForm, 'politicsStatus', 'politics_status') }}</span>
                </form-item>
                <form-item v-show="formData.politicsForm && formData.politicsForm.politicsStatus == '01' "
                    label="入党日期"
                >
                    <span class="form-item-value">{{ calcPlaceholder(formData.politicsForm, 'joinPartyTime') }}</span>
                </form-item>
                <form-item label="退役军人">
                    <span class="form-item-value">{{ showDicName(formData.politicsForm, 'veterans', 'veterans') }}</span>
                </form-item>
                <form-item v-show="formData.politicsForm && formData.politicsForm.veterans == '01' "
                    label="退役证编号"
                >
                    <span class="form-item-value">{{ calcPlaceholder(formData.politicsForm, 'retiredNumber') }}</span>
                </form-item>
            </div>
            <!-- 个人档案 - 婚育状况 -->
            <h4>
                <svg-icon icon-class="info-marriage"></svg-icon>
                <span>婚育状况</span>
            </h4>
            <div class="form-item-viewer">
                <form-item label="婚姻状况">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'maritalStatus', 'marriage_state') }}</span>
                </form-item>
                <form-item label="生育状况">
                    <span class="form-item-value">{{ showDicName(formData.userDetailInfo, 'fertilityStatus', 'give_birth_to_state') }}</span>
                </form-item>
            </div>
            <!-- 个人档案 - 资格证书信息 -->
            <h4>
                <svg-icon icon-class="info-results"></svg-icon>
                <span>资格证书信息</span>
            </h4>
            <data-table :config="config.cert" :data="formData.certificateInfoVOList"></data-table>


            <!-- 这个按钮是为了输入框点击回车触发校验用的 -->
            <button style="display:none;" type="submit"></button>
        </ui-form>
    </div>
</div>
</template>

<script>
import { API, util } from '@noah/tools';
const {
  pinyin,
  _findDeptByName,
  _getFloorByWorkplace,
  _getUserRegisterMsg
} = API.ENTRY;
const {
  _getDetailByProcessInstanceId
} = API.AUDIT;
const {
  dictList, _getShowWorkplaceList,
  _searchInfo, _getDictTypes
} = API.COMMON;
const { isNull, debounce } = util;

import DataTable from './data-table';
import DataEditTable from './data-edit-table';

import { Seq, Dictionary, DictCascader } from '@noah/tools';

const YEAR = '01';
const MONTH = '02';

// 锚点位置记录
const anchorPosition = [];
// 生成校验
const ruleKeys = [
  { key: 'name', label: '姓名', action: 'input' },
  { key: 'nameBopomofo', label: '姓名拼音', action: 'input' },
  { key: 'userNature', label: '员工性质', action: 'select' },
  { key: 'entryType', label: '入职类型', action: 'select' },
  { key: 'salaryDate', label: '计薪日期', action: 'select' },
  { key: 'joinDate', label: '入职日期', action: 'select' },
  { key: 'probationCode', label: '试用期限', action: 'select' },
  { key: 'shouldPositiveTime', label: '应转正日期', action: 'select' },
  { key: 'noAttendanceFlag', label: '是否参与考勤统计', action: 'select' },
  { key: 'startWorkDate', label: '首次参加工作日期', action: 'select' },
  { key: 'education', label: '最高学历', action: 'select' },
  { key: 'source', label: '来源渠道', action: 'select' },
  { key: 'inviteUserId', label: '推荐人', action: 'select' },
  { key: 'emailGroup', label: '群组', action: 'select' },
  { key: 'deptId', label: '部门', action: 'select' },
  { key: 'position', label: '岗位', action: 'select' },

  { key: 'manageSeq', label: '管理序列', action: 'select' },
  { key: 'manageSeqSub', label: '管理子序列', action: 'select' },
  { key: 'manageStdPosition', label: '管理准岗岗位', action: 'select' },
  { key: 'manageSeqLevel', label: '管理职级', action: 'select' },
  { key: 'seq', label: '专业序列', action: 'select' },
  { key: 'seqSub', label: '专业子序列', action: 'select' },
  { key: 'stdPosition', label: '专业准岗岗位', action: 'select' },
  { key: 'seqLevel', label: '专业职级', action: 'select' },

  { key: 'reporterId', label: '汇报人', action: 'select' },
  { key: 'workplace', label: '工作地点', action: 'select' },
  { key: 'signType', label: '签订类型', action: 'select' },
  { key: 'contractType', label: '合同类型', action: 'select' },
  { key: 'contractSubject', label: '合同主体', action: 'select' },
  // { key: 'contractDuration', label: '合同期限', action: 'select' },
  { key: 'contractStartDate', label: '合同开始日期', action: 'select' },
  { key: 'contractEndDate', label: '合同结束日期', action: 'select' }
  // { key: 'payCity', label: '社保公积金缴纳城市', action: 'select' },
  // { key: 'isOverflow', label: '是否超过社保缴纳上限', action: 'select' },
  // { key: 'payBase', label: '社保缴纳基数', action: 'input' },
  // { key: 'isFirstJob', label: '本年度首次参加工作', action: 'select' }
];
// 面包屑
const tabs = [
  { label: '基本信息', name: 'basic' },
  { label: '入职信息', name: 'entry' },
  { label: '合同/社保', name: 'contract' },
  { label: '个人档案', name: 'archives' }
];
// 表格展示配置
const columnConfig = {
  work: {
    columns: [
      { key: 'entryDate', label: '工作经历开始时间' },
      { key: 'leaveDate', label: '工作经历结束时间' },
      { key: 'workingMonths', label: '工作时长（月）' },
      { key: 'companyName', label: '工作单位' },
      { key: 'position', label: '岗位' },
      { key: 'sameBusiness', label: '是否人力资源行业', isBoolean: true },
      { key: 'proName', label: '证明人' },
      { key: 'proPhone', label: '证明人联系方式' }
    ]
  },
  edu: {
    columns: [
      {key: 'entryDate', label: '教育经历开始时间', action: 'date'},
      {key: 'gradDate', label: '教育经历结束时间', action: 'date'},
      {key: 'schoolName', label: '毕业院校', action: 'input'},
      {key: 'schoolType', label: '学习形式', dicType: 'learning_style', action: 'select'},
      {key: 'major', label: '专业名称', action: 'input'},
      {key: 'record', label: '获得学历', dicType: 'user_education', action: 'select'},
      {key: 'degreeName', label: '学位', dicType: 'degree', action: 'select'},
      {key: 'isMaxDegree', label: '是否最高学历', dicType: 'whether_options', isBoolean: true, action: 'select'},
      {key: 'is985', label: '是否985高校', dicType: 'whether_options', isBoolean: true, action: 'select'},
      {key: 'is211', label: '是否211高校', dicType: 'whether_options', isBoolean: true, action: 'select'},
      {key: 'isAbroad', label: '是否国外及港澳台院校', dicType: 'whether_options', isBoolean: true, action: 'select'},
      {key: 'backHomecountryDate', label: '留学首次回国时间', action: 'date'}
    ]
  },
  cert: {
    columns: [
      {key: 'certificateType', label: '证书类型'},
      {key: 'certificateName', label: '证书名称'},
      {key: 'certificateLevel', label: '级别/类别'},
      {key: 'certificateNumber', label: '证书编号'},
      {key: 'certificateAgency', label: '发证机关'},
      {key: 'certificateTime', label: '发证时间'}
    ]
  },
  family: {
    columns: [
      {key: 'numberName', label: '家庭成员姓名'},
      {key: 'numberRelation', label: '与本人关系', dicType: 'staff_relation'},
      {key: 'sex', label: '家庭成员性别', dicType: 'sex'},
      {key: 'numberBirth', label: '家庭成员出生日期'},
      {key: 'numberPhone', label: '家庭成员联系方式'},
      {key: 'numberAddr', label: '家庭成员通讯地址'}
    ]
  }
};
// 生成校验规则
const createRules = function(){
  const rules = {};
  ruleKeys.forEach(item => {
    const { key, label, action, type } = item;
    const message = `请${action === 'select'?'选择':'输入'}${label}`;
    rules[key] = [
      { required: true, trigger: 'change', message, type: type || 'string' }
    ];
  });
  return rules;
};
// 计算参数
const calcParam = function(data, param) {
  const result = {};
  Object.keys(param).forEach(key => {
    result[key] = data[key] === null ? '' : data[key];
  });
  return result;
};
// 显示拖底
const calcPlaceholder = function(obj, key, placeholder = '--'){
  return !obj || obj[key] === '' || obj[key] === null || obj[key] === undefined ? placeholder : obj[key];
};

// 字典类型
const typeList = [
  'employee_nature', 'user_entry_type', 'trial_period', 'user_education', 'source',
  'workplace','whether_options',
  'contract_sign_type', 'contract_type', 'contract_body',
  'social_security_area',
  'nation', 'household_registration_type', 'credentials_type', 'country_code', 'open_bank', 'user_education', 'learning_style',
  'degree', 'sex', 'staff_relation', 'politics_status', 'marriage_state', 'give_birth_to_state', 'contract_deadline',
  'lords_district', 'leader_type', 'veterans'
];
// 试用期限映射
const probationCodeMap = {
  '02': 0, // 0个月
  '01': 3, // 3个月
  '05': 6  // 6个月
};
let timeout = null;
let detTimeout = null;

let cacheSeq = null;
let cacheSubSeq = null;
let cacheManageSeq = null;
let cacheManageSubSeq = null;

export default {
  name: 'InformationRegistPanel',
  mixins: [Seq, Dictionary, DictCascader],
  components: { DataTable, DataEditTable },
  data () {
    return {
      activeTab: 'basic',
      wifiGroupList: [], //群组
      inviteUserList: [],
      reporterList: [],
      reporter2List: [],
      deptList: [],
      durationList: {         // 合同期限下拉
        [YEAR]: [],
        [MONTH]: []
      },
      headTlList:[
        { dictCode: '01', dictName: '是' },
        { dictCode: '02', dictName: '否' }
      ],
      // 表单填写相关
      formData: {
        contractDuration: [],
        duration: '',
        unit: YEAR,
        detailId: ''
      },
      // 接口请求相关
      param: {
        name: '',
        nameBopomofo:'',
        userNature: '',
        salaryDate: '',
        joinDate: '',
        probationCode: '',
        shouldPositiveTime: '',
        noAttendanceFlag: '',
        startWorkDate: '',
        education: '',
        source: '',
        inviteUserId: '',
        emailGroup: '',
        deptId: '',
        position: '',
        seq: '',
        seqLevel: '',
        reporterId: '',
        reporterId2: '',
        seqSub: '',
        stdPosition: '',
        manageSeq: '',
        manageSeqLevel: '',
        manageSeqSub: '',
        manageStdPosition: '',
        workplace: '',
        signType: '',
        contractType: '',
        contractSubject: '',
        contractDuration: [],
        contractStartDate: '',
        contractEndDate: '',
        contractDescription: '',
        payCity: '',
        isOverflow: '',
        payBase: '',
        isFirstJob: '',
        leaderType: '',
        isHeadTl: '',
        lordsDistrict: '',
        floorCode: ''
      },
      nameBopomofoOptions: [],
      workplaceList: [],          // 工作地点list
      workplaceArr: [],           // 工作地点选择器数组
      workplaceDefaultValue: [],  // 工作地点选择器默认显示值
      floorList: []               // 楼层列表
    };
  },
  props: {
    entryId: [String, Number],
    processInstanceId: [String, Number],
    date: String,
    wifiGroup: String,
    detailId: String
  },
  watch: {
    workplaceArr(value) {
      if (!value || value.length === 0) {
        this.param.workplace = '';
      }
      this.param.workplace = value[value.length - 1];
    },
    'formData.duration': {
      immediate: true,
      handler(newval){
        this.setContractDuration();
      }
    },
    'param.seq': {
      immediate: true,
      handler(newval){
        if( cacheSeq && newval && newval != cacheSeq ){ // 如果有历史选择值
          this.changeSeq(newval);
        }else if( !cacheSeq && newval ){ // 旧值为空， 只获取数据不清空已选条件
          this.getSeqSubList(newval);
          this.getSeqLevelList(newval);
        }
        cacheSeq = newval;
      }
    },
    'param.seqSub': {
      immediate: true,
      handler(newval){
        if( cacheSubSeq && newval && newval != cacheSubSeq ){ // 如果有历史选择值
          this.changeSeqSub(newval);
        }else if( !cacheSubSeq && newval ){ // 旧值为空， 只获取数据不清空已选条件
          this.getStdPositionList(newval);
        }
        cacheSubSeq = newval;
      }
    },
    'param.manageSeq': {
      immediate: true,
      handler(newval){
        if( cacheManageSeq && newval && newval != cacheManageSeq ){ // 如果有历史选择值
          this.changeManageSeq(newval);
        }else if( !cacheManageSeq && newval ){ // 旧值为空， 只获取数据不清空已选条件
          this.getManageSeqSubList(newval);
          this.getManageSeqLevelList(newval);
        }
        cacheManageSeq = newval;
      }
    },
    'param.manageSeqSub': {
      immediate: true,
      handler(newval){
        if( cacheManageSubSeq && newval && newval != cacheManageSubSeq ){ // 如果有历史选择值
          this.changeManageSeqSub(newval);
        }else if( !cacheManageSubSeq && newval ){ // 旧值为空， 只获取数据不清空已选条件
          this.getManageStdPositionList(newval);
        }
        cacheManageSubSeq = newval;
      }
    }
  },

  computed: {
    tabs() {
      return tabs;
    },
    ruleData() {
      let rules = createRules();
      rules.contractDuration = [{ validator: this.durationRules, trigger: 'change' }];
      // rules.seqSub = [{ validator: this.getValidateByManageSeq('请选择专业子序列'), trigger: 'change' }];
      // rules.stdPosition = [{ validator: this.getValidateByManageSeq('请选择专业准岗岗位'), trigger: 'change' }];
      // rules.seqLevel = [{ validator: this.getValidateByManageSeq('请选择专业职级'), trigger: 'change' }];

      return rules;
    },
    config() {
      return columnConfig;
    }
  },
  async created() {
    this.getShowWorkplaceList();
    await this.getWiFiList();
    await this.batchGetDictInfo(typeList);
    await this.getUserRegisterMsg();
  },

  mounted () {
    this.init();
    this.$refs.content.addEventListener('scroll', this.changeTabByScroll, false);
  },

  beforeDestroy() {
    this.$refs.content.removeEventListener('scroll', this.changeTabByScroll, false);
  },

  methods: {
    getNameBopomofo(userName) {
      if (!userName || !userName.trim()) {
        this.param.nameBopomofo = '';
        this.nameBopomofoOptions = [];
        return;
      }
      pinyin({ userName }).then((res) => {
        if (res.success) {
          if (res.root?.length === 1) {
            this.param.nameBopomofo = res.root[0];
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
    calcPlaceholder,
    init() {
      this.$nextTick(() => {
        this.calcAnchorPosition();
        this.$refs.form.resetFields();
        this.getDurationList();
      });
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
    getValidateByManageSeq(errorMsg) {
      return (rule, value, callback) => {
        if (!this.param.manageSeq && !value) {
          callback(new Error(errorMsg));
        } else {
          callback();
        }
      };
    },
    // 获取时间列表字典
    getDurationList() {
      Object.keys(this.durationList).forEach(key => {
        _getDictTypes({
          dictType: 'contract_deadline',
          parentCode: key
        }).then(res => {
          if (res.success && res.root) {
            this.durationList[key] = res.root;
          }
        }).catch(error => {
          console.log(error);
        });
      });
    },
    // 查找人员
    queryMember(key, datakey) {
      clearTimeout( timeout );
      timeout = setTimeout(async () => {
        try {
          const {success,root } = await _searchInfo({ key });
          if (success && root && root.length ) {
            this[datakey] = root.map(n => {
              return {
                fulllabel: `${n.name || '-'}<${n.email || '-'}>`,
                label: n.name,
                value: n.id
              };
            });
          }
        } catch (err) {
          console.error(err);
        }
      }, 500);
    },
    // 查找部门
    queryDept(name) {
      clearTimeout( detTimeout );
      detTimeout = setTimeout(async () => {
        try {
          const {success,root } = await _findDeptByName({ name });
          if (success && root && root.length ) {
            this.deptList = root.map(n => {
              return {
                label: n.deptNameFullPath,
                value: n.id
              };
            });
          }
        } catch (err) {
          console.error(err);
        }
      }, 500);
    },
    // 获取入职登记详情
    async getUserRegisterMsg() {
      const id = this.entryId;
      const { date, processInstanceId } = this;
      const param = {};
      if( !id && !processInstanceId ){
        console.error('缺少有效的id或者processInstanceId');
        return;
      }
      if( id ) param.id = id;
      if( date ) param.date = date;
      if( processInstanceId ) param.processInstanceId = processInstanceId;

      const { success, root } = processInstanceId ? await _getDetailByProcessInstanceId(param) : await _getUserRegisterMsg(param);
      if( success && root ){
        let rootData = processInstanceId ? (root.detail || {}) : root;
        this.formData = {
          duration: this.formData.duration,
          unit: this.formData.unit,
          ...{
            ...rootData,
            userDetailInfo: {
              ...rootData.userDetailInfo,
              otherPermanentResidentName: (rootData.userDetailInfo?.otherPermanentResidentList || []).map(v => v.dictName).join(',')
            }
          }
        };
        const { reporterTo, reporterTo2 } = this.formData;
        const calcParamResult = calcParam(rootData || {}, this.param);
        const emailGroup = calcParamResult.emailGroup || this.wifiGroup;
        let isHeadTl = '';
        if (calcParamResult.isHeadTl === true) {
          isHeadTl = '01';
        } else if (calcParamResult.isHeadTl === false) {
          isHeadTl = '02';
        }
        this.param = {
          ...calcParamResult,
          isHeadTl,
          emailGroup,
          reporterTo,
          reporterTo2
        };
        // this.getNameBopomofo(this.param.name);
        if (rootData.workplace) {
          this.getFloorList([{value: rootData.workplace}], true);
        }

        if (rootData.workplaceName) {
          this.workplaceDefaultValue = [{ label: rootData.workplaceName || '' }];
        } else {
          this.workplaceDefaultValue = [];
        }
        this.recalcFormDataVal();
        this.calcRemoteSelectLabel();
        this.calcShouldPositiveTime(true);
      }
    },
    // 计算部门，推荐人，汇报人，汇报人2
    calcRemoteSelectLabel() {
      const {
        deptId, inviteUserId, reporterId, reporterId2,
        deptName, inviteUserName, reporterTo, reporterTo2
      } = this.formData;
      this.deptList = deptId ? [{value: deptId,label: deptName}] : [];
      this.inviteUserList = inviteUserId ? [{value: inviteUserId,label: inviteUserName, fulllabel: inviteUserName}] : [];
      this.reporterList = reporterId ? [{value: reporterId,label: reporterTo, fulllabel: reporterTo}] : [];
      this.reporter2List = reporterId2 ? [{value: reporterId2,label: reporterTo2, fulllabel: reporterTo2}] : [];
    },
    // 计算特殊的param
    recalcFormDataVal() {
      const { contractDuration } = this.formData;
      // 计算合同期限
      let durationObj = contractDuration ? JSON.parse(contractDuration) : [];
      this.formData.contractDuration = durationObj;
      if (durationObj.length) {
        let durationData = durationObj[0].value.split('/');
        this.formData.unit = durationData[0];
        this.formData.duration = durationData[1];
      }

    },
    // 获取wifi群组列表
    async getWiFiList() {
      try {
        const { success, root } = await dictList('wifiGroup');
        if (success && root) {
          this.wifiGroupList = root || [];
        }
      } catch (e) {}
    },
    // 选择汇报人
    selectReporter(item) {
      const {value, label} = item || {};
      this.param.reporterId = value || '';
      this.param.reporterTo = label || '';
    },
    // 选择汇报2
    selectReporter2(item) {
      const {value, label} = item || {};
      this.param.reporterId2 = value || '';
      this.param.reporterTo2 = label || '';
    },
    // 切换序列
    changeSeq(code) {
      this.getSeqSubList(code);
      this.getSeqLevelList(code);
      this.param.seqLevel = '';
      this.param.seqSub = '';
      this.stdPositionList = [];
      this.param.stdPosition = '';
    },
    // 切换子序列
    changeSeqSub(code, init) {
      this.getStdPositionList(code);
      if (init) {return;}
      this.param.stdPosition = '';
    },
    // 切换管理序列
    changeManageSeq(code) {
      this.getManageSeqSubList(code);
      this.getManageSeqLevelList(code);
      this.param.manageSeqLevel = '';
      this.param.manageSeqSub = '';
      this.manageStdPositionList = [];
      this.param.manageStdPosition = '';
    },
    // 切换管理子序列
    changeManageSeqSub(code, init) {
      this.getManageStdPositionList(code);
      if (init) {return;}
      this.param.manageStdPosition = '';
    },
    changeManageSeqFormData(code) {
      if (code !== '00') {
        return;
      }
      setTimeout(() => {
        this.param.manageSeqLevel = '0000';
        this.param.manageSeqSub = '0000';
        this.param.manageStdPosition = '000000';
        this.changeManageSeqSub(this.param.manageSeqSub, true);
      }, 500);
    },
    changeSeqFormData(code) {
      if (code !== '00') {
        return;
      }
      setTimeout(() => {
        this.param.seqLevel = '0000';
        this.param.seqSub = '0000';
        this.param.stdPosition = '000000';
        this.changeSeqSub(this.param.seqSub, true);
      }, 500);
    },
    // 改变合同类型
    changeContractType(val) {
      const required = val !== '--';
      if( !required ){
        this.param.contractEndDate = '';
        this.formData.duration = '';
        // this.checkedDict.contractDeadline = [];
        // this.formData.contractDuration = [];
      }
    },
    // 改变社保基数
    async changePayBase(e) {
      const rule = /[^0-9]/g;
      this.param.payBase = await e.target.value.replace(rule, '');
    },
    // 改变合同期限
    changeContractDeadline(val) {
      this.setContractDuration();
      if (!this.formData.contractDuration || this.formData.contractDuration.length === 0) {
        this.param.contractDuration = '';
      } else {
        this.param.contractDuration =  JSON.stringify(this.formData.contractDuration);
      }
      this.calcContractDeadDate();
    },
    // 计算合同结束时间
    calcContractDeadDate() {
      if( this.param.contractType === '--' ) return;
      // const date = this.checkedDict.contractDeadline[1];
      const {unit, duration} = this.formData;
      if( this.param.contractStartDate && unit && duration ){
        const durationName = this.getTextBycode(duration, this.dicInfo.contract_deadline, '', {
          codeKey: 'dictCode',
          labelKey: 'dictName'
        });
        let start = this.$dayjs(this.param.contractStartDate);
        start = start.add(durationName, unit == YEAR ? 'year' : 'month').subtract(1, 'day');
        this.param.contractEndDate = start.format('YYYY-MM-DD');
      }
    },
    // 计算应转正日期
    calcShouldPositiveTime(init) {
      const {joinDate, probationCode } = this.param;
      const monthCount = probationCode ? probationCodeMap[probationCode] : '';
      if( joinDate && !isNull(monthCount) ){
        let start = this.$dayjs(joinDate);
        start = start.add(monthCount, 'month');
        if (init && this.param.shouldPositiveTime) {
          return;
        }
        this.param.shouldPositiveTime = start.format('YYYY-MM-DD');
      }
    },
    getResult() {
      const { id, processInstanceId, recordId } = this.formData;
      let isHeadTlBoolean = null;
      if (this.param.isHeadTl === '01') {
        isHeadTlBoolean = true;
      } else if (this.param.isHeadTl === '02') {
        isHeadTlBoolean = false;
      }
      const result = {
        ...this.param,
        isHeadTl: isHeadTlBoolean,
        id, recordId, processInstanceId
      };
      // 如果是审批中心打开添加isResubmit标识
      if (this.processInstanceId) {
        result.isResubmit = 1;
      }
      Object.keys(result).forEach(key => {
        if( isNull(result[key]) ){
          result[key] = '';
        }
      });
      return result;
    },
    // 表单校验
    validForm( scrollToError = true) {
      let result = null;
      this.$refs.form.validate((valid) => {
        if (valid) {
          result = this.getResult();
        }else{
          result = false;
          if( scrollToError ){
            this.$nextTick(() => {
              this.scrollToFirsrErr();
            });
          }
        }
      });
      return result;
    },
    // 保存
    handleSave() {
      const result = this.validForm();
      if( result ){
        this.$emit('on-save');
      }
    },
    // 提交
    handleSubmit() {
      const result = this.validForm();
      if( result ){
        this.$emit('on-submit');
      }
    },
    // 滚动到页面第一个出现错误的地方
    scrollToFirsrErr() {
      const error = this.$refs.content.querySelectorAll('.form-item-error')[0];
      if( error ){
        this.$refs.content.scrollTop = error.offsetTop - 100;
      }
    },
    // 计算各个锚点的位置
    calcAnchorPosition() {
      this.tabs.forEach(({name}, idx) => {
        const min = document.querySelector(`#${name}`).offsetTop;
        const nextEle = this.tabs[idx+1];
        const max = nextEle ? document.querySelector(`#${nextEle.name}`).offsetTop : 100000;
        anchorPosition.push({
          name, min, max
        });
      });
    },
    // 滚动页面，tab跟着改变
    changeTabByScroll() {
      const scrollTop = this.$refs.content.scrollTop;
      const result = anchorPosition.find(item =>
        scrollTop >= item.min && scrollTop < item.max
      );
      if( result ){
        this.activeTab = result.name;
      }
    },
    // 滚动到指定位置
    scrollToView({name}) {
      // 锚点会产生历史记录问题
      const aEle = document.createElement('a');
      aEle.href = `#${name}`;
      aEle.click();
      window.history.back();
    },
    // 通过code和list获取对应的label
    getTextBycode(code, options = [], defaultValue = '', {
      codeKey = 'value',
      labelKey = 'label'
    } = {}) {
      const selectItem = options.find(item => {
        return String(item[codeKey]) === String(code);
      });
      return selectItem ? selectItem[labelKey] : defaultValue;
    },
    // 给formData.contractDuration赋值
    setContractDuration() {
      const {unit, duration} = this.formData;
      const unitName = this.getTextBycode(unit, this.dicInfo.contract_deadline, '', {
        codeKey: 'dictCode',
        labelKey: 'dictName'
      });
      const durationName = this.getTextBycode(duration, this.dicInfo.contract_deadline, '', {
        codeKey: 'dictCode',
        labelKey: 'dictName'
      });
      if (unit && duration) {
        this.formData.contractDuration = [{
          value: [unit, duration].join('/'),
          label: [unitName, durationName].join('/')
        }];
      } else {
        this.formData.contractDuration = [];
      }
    },
    // 修改合同期限年月
    changeUnit() {
      this.formData.duration = '';
    },
    // 合同期限校验规则
    durationRules(rule, value, callback) {
      if (['', undefined, null].includes(value) && this.param.contractType !== '--') {
        callback(new Error('请选择合同期限'));
      } else {
        callback();
      }
    },
    // 教育经历可编辑
    addEducation() {
      this.$refs.editEdu.addEducation();
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
          this.param.floorCode = '';
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
  }
};
</script>

<style lang="less" scoped>
.contract-deadline ::v-deep .ui-cascader-new .ctrl-input .input-disabled[readonly] {
    background-color: #f7f7f7;
}
</style>
