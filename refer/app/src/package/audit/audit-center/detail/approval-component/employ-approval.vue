<template>
<div class="employ-approval__module">
    <div class="approval-component__container">
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-basic"></svg-icon>基本信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'name')]">
                    <span>姓名</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.name" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'nameBopomofo')]">
                    <span>姓名拼音</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.nameBopomofo" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userNatureName')]">
                    <span>员工性质</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.userNatureName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'entryTypeName')]">
                    <span>入职类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.entryTypeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'salaryDate')]">
                    <span>计薪日期</span>
                    <div>{{ progressInfo.salaryDate ? $dayjs(progressInfo.salaryDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'joinDate')]">
                    <span>入职日期</span>
                    <div>{{ progressInfo.joinDate ? $dayjs(progressInfo.joinDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'probationCodeName')]">
                    <span>试用期限</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.probationCodeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'shouldPositiveTime')]">
                    <span>应转正日期</span>
                    <div>{{ progressInfo.shouldPositiveTime ? $dayjs(progressInfo.shouldPositiveTime).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'noAttendanceFlag')]">
                    <span>是否参与考勤统计</span>
                    <div>{{ translateBoolLabel(progressInfo.noAttendanceFlag) }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'startWorkDate')]">
                    <span>首次参加工作日期</span>
                    <div>{{ progressInfo.startWorkDate ? $dayjs(progressInfo.startWorkDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'educationName')]">
                    <span>最高学历</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.educationName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'sourceName')]">
                    <span>来源渠道</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.sourceName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'inviteUserName')]">
                    <span>推荐人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.inviteUserName" />
                    </div>
                </li>
                <!-- <li :class="[highlightClass(progressInfo, 'companyEmail')]">
                    <span>企业邮箱</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.companyEmail" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'emailGroup')]">
                    <span>群组</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="(wifiGroupList.find(ele => ele.value == progressInfo.emailGroup) || {}).label" />
                    </div>
                </li> -->
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-entry"></svg-icon>入职信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'deptName')]">
                    <span>部门</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.deptName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'position')]">
                    <span>岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.position" />
                    </div>
                </li>
                    

                <li :class="[highlightClass(progressInfo, 'manageSeqName')]">
                    <span>管理序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.manageSeqName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'manageSeqLevelName')]">
                    <span>管理职级</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.manageSeqLevelName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'manageSeqSubName')]">
                    <span>管理子序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.manageSeqSubName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'manageStdPositionName')]">
                    <span>管理标准岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.manageStdPositionName" />
                    </div>
                </li>

                <li :class="[highlightClass(progressInfo, 'seqName')]">
                    <span>专业序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.seqName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'seqLevelName')]">
                    <span>专业职级</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.seqLevelName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'reporterTo')]">
                    <span>汇报人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.reporterTo" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'reporterTo2')]">
                    <span>汇报人2</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.reporterTo2" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'seqSubName')]">
                    <span>专业子序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.seqSubName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'stdPositionName')]">
                    <span>专业标准岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.stdPositionName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'workplaceName')]">
                    <span>工作地点</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.workplaceName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'leaderTypeName')]">
                    <span>组长名单</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.leaderTypeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'isHeadTl')]">
                    <span>总部TL名单</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.isHeadTl === true ? '是' : (progressInfo.isHeadTl === false ? '否' : '-')" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'lordsDistrictName')]">
                    <span>区总/城主名单</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.lordsDistrictName" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-contract"></svg-icon>合同信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'signTypeName')]">
                    <span>签订类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.signTypeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'contractTypeName')]">
                    <span>合同类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.contractTypeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'contractSubjectName')]">
                    <span>合同主体</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.contractSubjectName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'contractStartDate')]">
                    <span>合同开始时期</span>
                    <div>{{ progressInfo.contractStartDate ? $dayjs(progressInfo.contractStartDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'contractDuration')]">
                    <span>合同期限</span>
                    <div>{{ calcCascaderPlaceholder(progressInfo, 'contractDuration', '-') }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'contractEndDate')]">
                    <span>合同结束日期</span>
                    <div>{{ progressInfo.contractEndDate ? $dayjs(progressInfo.contractEndDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li class="full-row" :class="[highlightClass(progressInfo, 'contractDescription')]">
                    <span>合同签订说明</span>
                    <div>{{ progressInfo.contractDescription || '-' }}</div>
                </li>
            </ul>
        </div>
        <!-- <div class="approval-component__inner">
                <h2 class="title">
                    <svg-icon icon-class="info-insurance"></svg-icon>社保公积金
                </h2>
                <ul class="approval-component__list">
                    <li :class="[highlightClass(progressInfo, 'payCity')]">
                        <span>社保公积金缴纳城市</span>
                        <div>
                            <nari-tooltip :showTip="false"  :value="showDicName(progressInfo, 'payCity', 'social_security_area', '-')" />
                        </div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'isOverflow')]">
                        <span>是否超过社保缴纳上限</span>
                        <div>{{ translateBoolLabel(progressInfo.isOverflow) }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'payBase')]">
                        <span>社保缴纳基数</span>
                        <div>{{ progressInfo.payBase || '-' }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'isFirstJob')]">
                        <span>本年首次参加工作</span>
                        <div>{{ translateBoolLabel(progressInfo.isFirstJob) }}</div>
                    </li>
                </ul>
            </div> -->
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-certificate"></svg-icon>证件信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.hometown')]">
                    <span>籍贯</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="calcCascaderPlaceholder(userDetailInfo, 'hometown', '-')" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.nationName')]">
                    <span>民族</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.nationName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.censusRegisterLocation')]">
                    <span>户口所在地</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="calcCascaderPlaceholder(userDetailInfo, 'censusRegisterLocation', '-')" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.censusAddress')]">
                    <span>户口所在精确地址</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="calcCascaderPlaceholder(userDetailInfo, 'censusAddress', '-')" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.censusRegisterTypeName')]">
                    <span>户口性质</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.censusRegisterTypeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.idTypeName')]">
                    <span>证件类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.idTypeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.credentialNumber')]">
                    <span>证件号码</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.credentialNumber" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.nationalityName')]">
                    <span>国籍</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.nationalityName || '-'" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.othePermanentResidentList')]">
                    <span>其他永居身份</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="(userDetailInfo.otherPermanentResidentList || []).map(t => t.dictName).join('、') || '-'" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-phone"></svg-icon>联系方式
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.countryCodeName')]">
                    <span>手机号码国家码</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.countryCodeName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.phone')]">
                    <span>手机号码</span>
                    <div>{{ userDetailInfo.phone || '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.wechat')]">
                    <span>微信号</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.wechat" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.email')]">
                    <span>个人邮箱</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.email" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.currentProvince')]">
                    <span>现住省市区</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="calcCascaderPlaceholder(userDetailInfo, 'currentProvince', '-')" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.address')]">
                    <span>现住精确地址</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.address" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-bank"></svg-icon>银行卡信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.openBankName')]">
                    <span>开户行</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.openBankName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.branch')]">
                    <span>开户网点</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.branch" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.bankCard')]">
                    <span>账号</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userDetailInfo.bankCard" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-work"></svg-icon>工作经历
            </h2>
            <ui-table-pro :data="progressInfo.workingExpList || []" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="400px"
            >
                <ui-table-column label="工作单位" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.companyName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="岗位" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.position || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="工作经历开始时间" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.entryDate ? $dayjs(row.entryDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="工作经历结束时间" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.leaveDate ? $dayjs(row.leaveDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="工作时长（月）" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.workingMonths === null ? '-' : row.workingMonths }}
                    </template>
                </ui-table-column>
                <ui-table-column label="证明人" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.proName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="证明人联系方式" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.proPhone || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="是否人力资源行业" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ translateBoolLabel(row.sameBusiness) }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-education"></svg-icon>教育经历
            </h2>
            <ui-table-pro :data="progressInfo.educationExp || []" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="400px"
            >
                <ui-table-column label="毕业院校" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.schoolName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="教育经历开始时间" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.entryDate ? $dayjs(row.entryDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="教育经历结束时间" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.gradDate ? $dayjs(row.gradDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="获得学历" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.recordName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="专业名称" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.major || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="学习形式" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.schoolTypeName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="学位" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.degreeNameName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="是否国外及港澳台院校" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ translateBoolLabel(row.isAbroad) }}
                    </template>
                </ui-table-column>
                <ui-table-column label="留学首次回国时间" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.backHomecountryDate ? $dayjs(row.backHomecountryDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="是否985高校" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ translateBoolLabel(row.is985) }}
                    </template>
                </ui-table-column>
                <ui-table-column label="是否211高校" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ translateBoolLabel(row.is211) }}
                    </template>
                </ui-table-column>
                <ui-table-column label="是否最高学历" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ translateBoolLabel(row.isMaxDegree) }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-family"></svg-icon>家庭成员
            </h2>
            <ui-table-pro :data="progressInfo.familyNumber || []" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="400px"
            >
                <ui-table-column label="家庭成员姓名" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.numberName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="家庭成员性别" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.sexName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="与本人关系" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.numberRelationName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="家庭成员出生日期" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.numberBirth ? $dayjs(row.numberBirth).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="家庭成员通讯地址" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.numberAddr || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="家庭成员联系方式" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.numberPhone || '-' }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-contact"></svg-icon>紧急联系人
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'emergencyPerson.numberName')]">
                    <span>紧急联系人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="emergencyPerson.numberName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'emergencyPerson.numberRelationName')]">
                    <span>与紧急联系人关系</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="emergencyPerson.numberRelationName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'emergencyPerson.numberPhone')]">
                    <span>紧急联系人联系方式</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="emergencyPerson.numberPhone" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'emergencyPerson.numberAddr')]">
                    <span>紧急联系人通讯地址</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="emergencyPerson.numberAddr" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-political"></svg-icon>政治面貌
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'politicsForm.politicsStatusName')]">
                    <span>政治面貌</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="politicsForm.politicsStatusName" />
                    </div>
                </li>
                <li v-if="politicsForm.politicsStatus == '01'" :class="[highlightClass(progressInfo, 'politicsForm.joinPartyTime')]">
                    <span>入党日期</span>
                    <div>{{ politicsForm.joinPartyTime ? $dayjs(politicsForm.joinPartyTime).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'politicsForm.veterans')]">
                    <span>退役军人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="politicsForm.veterans == '01' ? '是' : '否'" />
                    </div>
                </li>
                <li v-if="politicsForm.veterans == '01'" :class="[highlightClass(progressInfo, 'politicsForm.retiredNumber')]">
                    <span>退役证编号</span>
                    <div>{{ politicsForm.retiredNumber }}</div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-marriage"></svg-icon>婚育状况
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.maritalStatusName')]">
                    <span>婚姻状况</span>
                    <div>{{ userDetailInfo.maritalStatusName || '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userDetailInfo.fertilityStatusName')]">
                    <span>生育状况</span>
                    <div>{{ userDetailInfo.fertilityStatusName || '-' }}</div>
                </li>
            </ul>
        </div>
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="info-results"></svg-icon>资格证书信息
            </h2>
            <ui-table-pro :data="progressInfo.certificateInfoVOList || []" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="400px"
            >
                <ui-table-column label="证书类型" :min-width="100" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.certificateType || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="证书名称" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.certificateName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="级别/类别" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.certificateLevel || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="证书编号" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.certificateNumber || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="发证机关" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.certificateAgency || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="发证时间" :min-width="200" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.certificateTime ? $dayjs(row.certificateTime).format('YYYY-MM') : '-' }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import dictMixin from '@/mixins/dictionary';
import seqMixin from '@/mixins/seq';
import DictCascader from '@/mixins/dict-cascader';
import { _getDictListByType, dictList } from '@/services/dashboard/common';
// 字典类型
const typeList = [
    'employee_nature', 'user_entry_type', 'trial_period', 'user_education', 'source', 'email_group_type',
    'workplace',
    'contract_sign_type', 'contract_type', 'contract_body', 'contract_deadline',
    'social_security_area',
    'nation', 'household_registration_type', 'credentials_type', 'country_code', 'open_bank', 'user_education', 'learning_style',
    'degree', 'sex', 'staff_relation', 'politics_status', 'marriage_state', 'give_birth_to_state', 'lords_district', 'leader_type'
];
export default {
    name: 'EmployApproval',
    mixins: [commonMixin, DictCascader],
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        userDetailInfo() {
            return this.progressInfo.userDetailInfo || {};
        },
        emergencyPerson() {
            return this.progressInfo.emergencyPerson || {};
        },
        politicsForm() {
            return this.progressInfo.politicsForm || {};
        }
    },
    data() {
        return {
            progressInfo: {},
            // WiFi群组字典
            wifiGroupList: []
        };
    },
    created() {
        this.getWiFiList();
        this.getProgressInfo();
    },
    methods: {
        // 获取wifi群组列表
        async getWiFiList() {
            try {
                const res = await dictList('wifiGroup');
                if (res.success && res.root) {
                    this.wifiGroupList = res.root.map(v => {
                        return {
                            label: v.dictName,
                            value: v.dictCode
                        };
                    });
                }
            } catch (e) {}
        },
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        }
    }
};
</script>