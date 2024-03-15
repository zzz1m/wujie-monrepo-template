<template>
<div class="offer-approval__module">
    <div class="approval-component__container">
        <h2 class="title">
            <img alt="" :src="getImportUrl('offer/base.png')" />候选人信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'name')]">
                <span>姓名</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.name" />
                </div>
            </li>
            <li v-if="!['backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'nameBopomofo')]">
                <span>姓名拼音</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.nameBopomofo" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'sexName')]">
                <span>性别</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.sexName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'nationalityName')]">
                <span>国籍</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.nationalityName || '-'" />
                </div>
            </li>
            <!-- <li :class="[highlightClass(progressInfo, 'othePermanentResidentList')]">
                    <span>其他永居身份</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="(progressInfo.otherPermanentResidentList || []).map(t => t.dictName).join('、') || '-'" />
                    </div>
                </li> -->
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'credentialTypeName')]">
                <span>证件类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.credentialTypeName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'credentialNumber')]">
                <span>证件号码</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.credentialNumber" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'countryCodeName')]">
                <span>手机号码区号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.countryCodeName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi'].includes(operateNode)" :class="[highlightClass(progressInfo, 'phoneNumber')]">
                <span>手机号码</span>
                <div>{{ progressInfo.phoneNumber || '-' }}</div>
            </li>
            <li v-if="!['businessOD', 'bianzhi'].includes(operateNode)" :class="[highlightClass(progressInfo, 'email')]">
                <span>个人邮箱</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.email" />
                </div>
            </li>
            <li v-if="!['backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'sourcePathName')]">
                <span>来源渠道</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.sourcePathName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'sourceDesc')]">
                <span>推荐人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.sourceDesc" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'educationRequiredName')]">
                <span>学历要求</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.educationRequiredName" />
                </div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">
            任职信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userNatureName')]">
                <span>员工性质</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.userNatureName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'entryTypeName')]">
                <span>入职类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.entryTypeName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'productLine')]">
                <span>产品线</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.productLine" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'deptName')]">
                <span>部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.deptName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'positionName')]">
                <span>岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.positionName" />
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

            <li v-if="!['businessOD', 'bianzhi'].includes(operateNode)" :class="[highlightClass(progressInfo, 'reportTo')]">
                <span>汇报人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.reportTo" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'reportTo2')]">
                <span>汇报人2</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.reportTo2" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'workplaceName')]">
                <span>工作地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.workplaceName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'contractSubjectName')]">
                <span>合同主体</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.contractSubjectName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'backTone'].includes(operateNode) && progressInfo.userNature === '01'" :class="[highlightClass(progressInfo, 'probationName')]">
                <span>试用期限（月）</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.probationName" />
                </div>
            </li>
            <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode) && progressInfo.userNature !== '03'" :class="[highlightClass(progressInfo, 'contractTerm')]">
                <span>合同期限（月）</span>
                <div>{{ progressInfo.contractTerm || '-' }}</div>
            </li>
            <template v-if="progressInfo.userNature == '03'">
                <li v-if="!['businessOD', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'internshipPeriod')]">
                    <span>实习期限（月）</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.internshipPeriod" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'internshipPermanent')]">
                    <span>是否约定转正式</span>
                    <div>{{ translateBoolLabel(progressInfo.internshipPermanent) }}</div>
                </li>
            </template>
            <!-- <li v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="[highlightClass(progressInfo, 'bussiness')]">
                <span>是否BOSS商业/店长商业</span>
                <div>{{ translateBoolLabel(progressInfo.bussiness) }}</div>
            </li> -->
        </ul>
    </div>
    <div v-if="dataPrivilege.operatePrivilege && ['backTone'].includes(operateNode)" class="approval-component__container">
        <h2 class="title">
            背调信息
        </h2>
        <div>
            <ui-form ref="backToneForm" :label-width="100" :model="backToneFormData" :rules="backToneRules">
                <form-item label="背调情况：" prop="backCheckSituation">
                    <ui-select
v-model="backToneFormData.backCheckSituation"
                        clearable
                        placeholder="请选择背调情况"
                    >
                        <ui-option
v-for="item in backToneStatus"
                            :key="item.value" :value="item.value"
                            @click.native="backCheckSituationChange"
                        >{{ item.label }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item v-if="['1', '2'].includes(this.backToneFormData.backCheckSituation + '')" label="背调结果：" prop="backCheckResult" :required="['1', '2'].includes(this.backToneFormData.backCheckSituation + '')">
                    <ui-select
v-model="backToneFormData.backCheckResult"
                        clearable
                        placeholder="请选择背调结果"
                    >
                        <ui-option
v-for="item in lightList"
                            :key="item.value" :value="item.value"
                        >{{ item.label }}</ui-option>
                    </ui-select>
                </form-item>
                <form-item label="详细说明：" prop="backCheckDetail">
                    <ui-input v-model.trim="backToneFormData.backCheckDetail" :counter="true" :maxlength="500" :rows="4" type="textarea"></ui-input>
                </form-item>
            </ui-form>
        </div>
    </div>
    <div
v-if="((!dataPrivilege.operatePrivilege && ['backTone'].includes(operateNode)) || isBusinessUnit)
             && progressInfo.backCheckSituationName"
        class="approval-component__container"
    >
        <h2 class="title">
            背调信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'backCheckSituationName')]">
                <span>背调情况</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.backCheckSituationName" />
                </div>
            </li>
            <li v-if="progressInfo.backCheckResultName" :class="[highlightClass(progressInfo, 'backCheckResultName')]">
                <span>背调结果</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.backCheckResultName" />
                </div>
            </li>
            <li :class="['full-row', 'margin-top-40', highlightClass(progressInfo, 'backCheckDetail')]">
                <span>详细说明</span>
                <div>{{ progressInfo.backCheckDetail || '-' }}</div>
            </li>
        </ul>
    </div>
    <div v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" :class="['approval-component__container', { 'can-edit': salaryEdit }]">
        <span v-if="salaryEdit" class="operate-btn-edit" @click="editAction">
            <i class="ui-icon-edit-outline"></i>编辑
        </span>
        <h2 class="title">
            <img alt="" src="@/assets/images/offer/money.png" />薪资信息
        </h2>
        <ul v-if="!isEdit" class="approval-component__list">
            <!-- <li :class="[highlightClass(progressInfo, 'contractSubjectName')]">
                        <span>社保公积金缴纳城市</span>
                        <div>
                            <nari-tooltip :showTip="false"  :value="progressInfo.socialInsurancePlaceName" />
                        </div>
                    </li> -->


            <template v-if="progressInfo.salaryVersion === 'V1'">
                <li :class="[highlightClass(progressInfo, 'salary')]">
                    <span>薪资</span>
                    <div class="pre-warp">{{ progressInfo.salary || '-' }}</div>
                </li>
                <li v-if="progressInfo.internshipAllowance && progressInfo.userNature == '03'" :class="[highlightClass(progressInfo, 'internshipAllowance')]">
                    <span>实习津贴</span>
                    <div class="pre-warp">{{ progressInfo.internshipAllowance || '-' }}</div>
                </li>
            </template>


            <template v-else-if="progressInfo.salaryDTO">
                <template v-for="salaryItem in salaryInfoV2">
                    <li v-if="salaryItem[2]"  :key="salaryItem[1]" :class="[highlightClass(progressInfo, salaryItem[1])]">
                        <span>{{ salaryItem[0] }}</span>
                        <div v-if="salaryItem[1] === 'salaryStructure'" class="pre-warp">{{ structureTypeList }}</div>
                        <div v-else class="pre-warp">{{ progressInfo.salaryDTO[salaryItem[1]] || '-' }}</div>
                    </li>
                </template>
            </template>

            <li v-if="salaryShow" :class="[highlightClass(progressInfo, 'socialInsuranceCeil')]">
                <span>是否超过社保缴纳上限</span>
                <div>{{ translateBoolLabel(progressInfo.socialInsuranceCeil) }}</div>
            </li>
            <li v-if="salaryShow" :class="[highlightClass(progressInfo, 'socialInsuranceBase')]">
                <span>社保缴纳基数</span>
                <div>{{ progressInfo.socialInsuranceBase || '-' }}</div>
            </li>
            <li :class="['full-row', 'margin-top-40', 'margin-bottom-20', highlightClass(progressInfo, 'salaryAttachments')]">
                <span>薪资相关批件</span>
                <div>
                    <ul v-if="salaryAttachments.length" class="download-list">
                        <li v-for="(item, index) in salaryAttachments" :key="index" :class="[{ 'can-download': canDownload }]">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                            <i
v-if="canDownload" class="ui-icon-download btn-download"
                                @click.stop="downloadAction(item)"
                            ></i>
                        </li>
                    </ul>
                    <span v-else>-</span>
                </div>
            </li>
        </ul>
        <template v-else>
            <ui-form ref="form" class="approval-component__form" :model="formData" :rules="ruleData">
                <form-item label="是否超过社保缴纳上限" prop="socialInsuranceCeil">
                    <ui-radio-group v-model="formData.socialInsuranceCeil">
                        <ui-radio label="1">是</ui-radio>
                        <ui-radio label="0">否</ui-radio>
                    </ui-radio-group>
                </form-item>
                <form-item label="社保缴纳基数" prop="socialInsuranceBase">
                    <ui-input v-model.trim="formData.socialInsuranceBase" placeholder="请输入社保缴纳基数" type="text"></ui-input>
                </form-item>
            </ui-form>
            <div class="operate-btn-list">
                <button class="btn btn-primary btn-outline" type="button" @click="isEdit = false">取消</button>
                <button class="btn btn-primary" type="button" @click="saveAction">保存</button>
            </div>
        </template>
    </div>
    <!-- RSU约定 -->
    <div v-if="progressInfo.rsu == 1 && !['backTone'].includes(operateNode)" class="approval-component__container">
        <h2 class="title">
            RSU约定
        </h2>
        <ul class="approval-component__list">
            <li v-if="progressInfo.rsuName" :class="[highlightClass(progressInfo, 'rsuName')]">
                <span>RSU约定</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.rsuName" />
                </div>
            </li>
            <li v-if="progressInfo.rsuContent" :class="[highlightClass(progressInfo, 'rsuContent')]">
                <span>RSU约定价值（{{ currencyDict.unit }}）</span>
                <div>
                    <div class="pre-warp">{{ progressInfo.rsuContent || '-' }}</div>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" class="approval-component__container">
        <h2 class="title">
            入职信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'expectEntryDate')]">
                <span>预计入职日期</span>
                <div>{{ progressInfo.expectEntryDate ? $dayjs(progressInfo.expectEntryDate).format('YYYY-MM-DD HH:mm') : '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'reportUser')]">
                <span>报到联系人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.reportUser" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'reportUserPhone')]">
                <span>报到联系人电话</span>
                <div>{{ progressInfo.reportUserPhone || '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'reportLocation')]">
                <span>报到地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.reportLocation" />
                </div>
            </li>
        </ul>
    </div>
    <div v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" class="approval-component__container">
        <h2 class="title">
            offer信息
        </h2>
        <ul class="approval-component__list">
            <li :class="['row-40', highlightClass(progressInfo, 'offerEmailCc')]">
                <span>offer邮件抄送人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.offerEmailCc" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'offerEmailModel')]">
                <span>offer模板</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="(templateOptions.find(ele => ele.dictCode == progressInfo.offerEmailModel) || {}).dictName || '-'" />
                </div>
            </li>
        </ul>
    </div>
    <div v-if="!['businessOD', 'bianzhi', 'backTone'].includes(operateNode)" class="approval-component__container">
        <h2 class="title">
            <img alt="" src="@/assets/images/offer/other.png" />其它信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'bpName')]">
                <span>招聘者</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.bpName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'manager')]">
                <span>负责BP</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="(progressInfo.manager || []).map(ele => `${ele.name || ''}-${ele.email || ''}`).join(',')" />
                </div>
            </li>
            <li :class="['full-row', 'margin-top-40', highlightClass(progressInfo, 'description')]">
                <span>备注说明</span>
                <div>{{ progressInfo.description || '-' }}</div>
            </li>
            <li :class="['full-row', 'margin-top-40', highlightClass(progressInfo, 'interviewEvaluation')]">
                <span>面试评估表</span>
                <div>
                    <ul class="download-list">
                        <li v-for="(item, index) in interviewEvaluationList" :key="index" :class="[{ 'can-download': canDownload }]">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                            <i
v-if="canDownload" class="ui-icon-download btn-download"
                                @click.stop="downloadAction(item)"
                            ></i>
                        </li>
                    </ul>
                </div>
            </li>
            <li :class="['full-row', 'margin-top-40', highlightClass(progressInfo, 'resumeAnnexe')]">
                <span>个人简历</span>
                <div>
                    <ul class="download-list">
                        <li v-for="(item, index) in resumeAnnexeList" :key="index" :class="[{ 'can-download': canDownload }]">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                            <i
v-if="canDownload" class="ui-icon-download btn-download"
                                @click.stop="downloadAction(item)"
                            ></i>
                        </li>
                    </ul>
                </div>
            </li>
            <li :class="['full-row', 'margin-top-40', highlightClass(progressInfo, 'educationAnnexe')]">
                <span>学历认证</span>
                <div>
                    <ul class="download-list">
                        <li v-for="(item, index) in educationAnnexeList" :key="index" :class="[{ 'can-download': canDownload }]">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                            <i
v-if="canDownload" class="ui-icon-download btn-download"
                                @click.stop="downloadAction(item)"
                            ></i>
                        </li>
                    </ul>
                </div>
            </li>

            <li :class="['full-row', 'margin-top-40', 'margin-bottom-20', highlightClass(progressInfo, 'annexes')]">
                <span>附件</span>
                <div>
                    <ul v-if="annexesList.length" class="download-list">
                        <li v-for="(item, index) in annexesList" :key="index" :class="[{ 'can-download': canDownload }]">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                            <i
v-if="canDownload" class="ui-icon-download btn-download"
                                @click.stop="downloadAction(item)"
                            ></i>
                        </li>
                    </ul>
                    <span v-else>-</span>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import { _updateOfferSalary, _getAuditNodeStatusByProcessInstanceId, _updateOfferBackCheckInfo } from '@/services/dashboard/audit';
import commonMixin from './mixins';
import { commonConfig } from '@noah/tools';
const { TEMPLATES: templateOptions } = commonConfig.entrance;
const { approvalLightList, BACK_TONE_STATUS } = commonConfig.recruit;
import { scrollToFormError } from '@/utils/util.js';
// 处理附件信息
const dealFile = (listStr = '') => {
    return (listStr || '').split(',').filter(item => item).map(ele => {
        const infoArr = (ele || '').split('||');
        return {
            fileName: infoArr[0],
            url: infoArr[1] ? `${window.location.origin}/api/common/file/download${infoArr[1]}` : ''
        };
    });
};
import { mapState } from 'vuex';
export default {
    name: 'OfferApproval',
    mixins: [commonMixin],
    computed: {
        ...mapState(['userInfo']),
        lightList() {
            return approvalLightList;
        },
        backToneStatus() {
            return BACK_TONE_STATUS;
        },
        processId() {
            return this.$route.query.processId;
        },
        // 办理入职节点可以下载
        canDownload() {
            return this.currentNode.some(node => node.nodeName == '入职办理');
        },
        // 是否可以看到薪资字段信息(当前登录人有节点审批的权限)
        salaryShow() {
            const currentUserEmail = this.userInfo ? this.userInfo.email : '';
            const processList = this.processList || [];
            return processList.some(node => (node.approveUserVOList || []).some(ele => ele.approveEmail == currentUserEmail) && ['商业薪酬', '非商业薪酬', '薪酬审批人', '薪酬审批'].indexOf(node.nodeName) > -1);
        },
        // 是否可以编辑薪资字段信息(当前登录人有节点审批的权限且未审过)
        salaryEdit() {
            const currentUserEmail = this.userInfo ? this.userInfo.email : '';
            const currentNode = this.currentNode || [];
            return currentNode.some(node => (node.unAutiedUser || []).some(user => user.auditUserEmail == currentUserEmail) && ['商业薪酬', '非商业薪酬', '薪酬审批人', '薪酬审批'].indexOf(node.nodeName) > -1);
        },
        interviewEvaluationList() {
            const { interviewEvaluation } = this.progressInfo;
            return dealFile(interviewEvaluation);
        },
        annexesList() {
            const { annexes } = this.progressInfo;
            return dealFile(annexes);
        },
        salaryAttachments() {
            let { salaryAttachments } = this.progressInfo.salaryDTO || {};
            if (salaryAttachments && salaryAttachments.length) {
                return salaryAttachments.map(v => {
                    const infoArr = (v || '').split('||');
                    return {
                        fileName: infoArr[0],
                        url: infoArr[1] ? `${window.location.origin}/api/common/file/download${infoArr[1]}` : ''
                    };
                });
            }
            return [];
        },
        resumeAnnexeList() {
            const { resumeAnnexe } = this.progressInfo;
            return dealFile(resumeAnnexe || '');
        },
        educationAnnexeList() {
            const { educationAnnexe } = this.progressInfo;
            return dealFile(educationAnnexe || '');
        },
        isBusinessUnit() {
            return !['商业OD', '非商业OD', '薪酬审批人', '商业薪酬审批', '非商业薪酬审批', '发起表单', '填写表单', '薪酬审批', '编制审批', '背调审批'].includes(this.judgeNodeName);
        },
        judgeNodeName() {
            let name = this.currentNodeName;
            if(name === '征询') {
                const myNode = this.processList.find(t => {
                    const list = t.approveUserVOList?.map(e => e.approveName);
                    return list.includes(this.$store.state.userInfo.name);
                });
                const nodeCode = myNode?.node || '';
                const srcNode = this.processList.find(t => {
                    return t !== myNode && nodeCode.indexOf(t.node) > -1;
                });

                name = srcNode?.nodeName || name;
            }

            return name;
        },
        // 据BPM传给Noah的审批节点名称，判断字段是否可见
        operateNode() {
            let role = '';
            const name = this.judgeNodeName;

            // 判断是不是商业OD节点  商业od字段权限 https://wiki.kanzhun-inc.com/pages/viewpage.action?pageId=133873608
            if (['商业OD', '非商业OD'].indexOf(name) > -1) {
                role = 'businessOD';
            }
            else if (['背调审批'].indexOf(name) > -1) {
                role = 'backTone';
            }
            else if  (['编制审批'].indexOf(name) > -1) {
                role = 'bianzhi';
            }
            else {
                role = 'default';
            }

            return role;
        },
        salaryInfoV2() {
            if(!this.progressInfo.salaryDTO) return [];
            const detail = this.progressInfo;
            const { salaryStructure } = this.progressInfo.salaryDTO;
            const hasProbation = this.progressInfo.probationCode && this.progressInfo.probationName && this.progressInfo.probationName !== '无';
            const isShixi = this.progressInfo.userNature === '03';
            const list = [
                // ['薪资结构', 'salaryStructure', true],
                [`试用期月固定工资标准(${this.currencyDict.unit}/月)`, 'probationMonthStandard', hasProbation && salaryStructure.includes('month')],
                [
                    `试用期月度绩效工资标准(${this.currencyDict.unit}/月)`,
                    'probationMonthKpiStandard',
                    hasProbation && salaryStructure.includes('monthKpi')
                ],
                [
                    `试用期季度绩效工资标准(${this.currencyDict.unit}/季度)`,
                    'probationQuarterKpiStandard',
                    hasProbation && salaryStructure.includes('quarterKpi')
                ],
                [`日固定工资标准(${this.currencyDict.unit}/天)`, 'dayStandard', salaryStructure.includes('day')],
                [`${hasProbation ? '转正后' : ''}月固定工资标准(${this.currencyDict.unit}/月)`, 'monthStandard', salaryStructure.includes('month')],
                [
                    `${hasProbation ? '转正后' : ''}月度绩效工资标准(${this.currencyDict.unit}/月)`,
                    'monthKpiStandard',
                    salaryStructure.includes('monthKpi')
                ],
                [
                    `${hasProbation ? '转正后' : ''}季度绩效工资标准(${this.currencyDict.unit}/季度)`,
                    'quarterKpiStandard',
                    salaryStructure.includes('quarterKpi')
                ],
                ['年终固定奖金(N个月)', 'endYearBonus', !isShixi && salaryStructure.includes('endYearBonus')],
                ['年度绩效奖金(0～N个月)', 'yearKpiBonus', !isShixi && salaryStructure.includes('yearKpiBonus')],
                // 仅“员工性质”为「实习（03）」且“是否约定转正式”为「是」时，显示该字段
                ['转正式后标准薪资', 'agreedToFormalSalary', isShixi && detail.internshipPermanent == 1]
            ];
            return list;
        },
        structureTypeList() {
            const StructureTypeMap ={
                day: '标准日薪',
                month: '标准月薪',
                monthKpi: '月度绩效',
                quarterKpi: '季度绩效',
                endYearBonus: '年终固定奖金',
                yearKpiBonus: '年终绩效奖金'
            };
            const str = (this.progressInfo?.salaryDTO?.salaryStructure || [])
                .map((t) => StructureTypeMap[t] || '')
                .filter(Boolean)
                .join('、') || '';

            return str;
        },
        currencyDict() {
            if (this.progressInfo.currencyDict) {
                const remark = this.progressInfo.currencyDict?.remark || '';
                const filedArr = remark.split(',');
                const fileMap = filedArr.reduce((a, b) => {
                    return {
                        ...a,
                        [b.split('=')[0]]: b.split('=')[1] || ''
                    };
                }, {});
                return {
                    ...this.progressInfo.currencyDict,
                    unit: fileMap['unit'] || '元'
                };
            }
            return {      // 币种字典
                dictName: '人民币',
                unit: '元'
            };
        }
    },
    data() {
        // 校验社保基数
        const socialInsuranceBaseValidate = (rule, value, callback) => {
            if(!value) {
                callback();
            } else if(!(/^[0-9]\d*$/.test(value))) {
                callback(new Error('请输入整数'));
            } else if(!new RegExp('^\\d{1,10}$').test(value)) {
                callback(new Error('最多可输入10位整数'));
            } else {
                callback();
            }
        };
        // 校验背调结果
        const backCheckResultValidate = (rule, value, callback) => {
            if(!value && ['1', '2'].includes(this.backToneFormData.backCheckSituation + '')) {
                callback(new Error('请选择背调结果'));
                return;
            } else {
                callback();
            }
        };

        return {
            progressInfo: {},
            templateOptions,
            formData: {
                socialInsuranceCeil: '',
                socialInsuranceBase: ''
            },
            ruleData: {
                socialInsuranceBase: [
                    { validator: socialInsuranceBaseValidate, trigger: 'blur' }
                ]
            },
            isEdit: false,
            submitIng: false,
            currentNodeName: '',       // 当前节点名称
            backToneFormData: {
                backCheckSituation: '',         // 背调情况
                backCheckResult: '',            // 背调结果
                backCheckDetail: ''            // 背调详细说明
            },
            backToneRules: {
                backCheckSituation: [
                    { required: true, message: '请选择背调情况', trigger: 'change' }
                ],
                backCheckResult: [
                    { validator: backCheckResultValidate, trigger: 'change' }
                ]
            }

        };
    },
    created() {
        this.getProgressInfo();
        this.getAuditNodeStatusByProcessInstanceId();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};

            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
            Object.keys(this.backToneFormData).forEach(key => {
                this.backToneFormData[key] = this.progressInfo[key] || '';
            });
        },
        // 在线预览
        previewAction(info) {
            window.open(`/api/common/file/preview.json?ossPath=${info.url.replace(/http.*(review|download)\//, '')}`);
        },
        // 下载
        downloadAction(info) {
            window.open(info.url);
        },
        async getAuditNodeStatusByProcessInstanceId() {
            const { success, root } = await _getAuditNodeStatusByProcessInstanceId({
                processInstanceId: this.processId
            });
            if(!(success && root && root.length)) return;
            const current = root.find(item => item.last === 1);
            this.currentNodeName = current ? current.nodeName : '';
        },
        editAction() {
            const { progressInfo } = this;
            Object.keys(this.formData).forEach(key => {
                if(key == 'socialInsuranceCeil') {
                    this.formData[key] = progressInfo[key] === null ? '' :  (progressInfo[key] ? '1' : '0');
                } else {
                    this.formData[key] = progressInfo[key] || '';
                }
            });
            this.isEdit = true;
        },
        saveAction() {
            this.$refs.form.validate(async valid => {
                if(!valid) return;
                if(this.submitIng) return;
                this.submitIng = true;
                try {
                    const params = {
                        id: this.progressInfo.id,
                        socialInsuranceCeil: Number(this.formData.socialInsuranceCeil),
                        socialInsuranceBase: Number(this.formData.socialInsuranceBase)
                    };
                    const { success } = await _updateOfferSalary(params);
                    if(!success) return;
                    this.isEdit = false;
                    this.getProgressInfo();
                } finally {
                    this.submitIng = false;
                }
            });
        },
        // 确定之前 先保存密码
        async beforeSubmit() {
            if (!(this.dataPrivilege.operatePrivilege && ['backTone'].includes(this.operateNode) && this.$parent.currentOperateType === 'agree')) {
                return true;
            }
            // 如果是同意操作 进行必填判断
            if (this.$refs.backToneForm) {
                const valid = await this.$refs.backToneForm.validate();
                if(!valid) {
                    scrollToFormError();
                    return false;
                };
            }
            return true;
        },
        async beforeAgree() {
            try {
                // 如果不是背调节点 或者 不是可操作 或者 不是同意操作 不校验
                if (!(this.dataPrivilege.operatePrivilege && ['backTone'].includes(this.operateNode) && this.$parent.currentOperateType === 'agree')) {
                    return {
                        postData: {
                        }
                    };
                }
                const { success, root } = await _updateOfferBackCheckInfo({
                    id: this.progressInfo.id,
                    ...this.backToneFormData
                });
                if (success) {
                    return {
                        postData: {
                        }
                    };
                }
                return false;
            } catch(error) {
                console.log(error);
            }
        },
        backCheckSituationChange() {
            this.backToneFormData.backCheckResult = '';
        }
    }
};
</script>
