<template>
<div class="renew-container common-renew">
    <div class="content-waper">
        <h4 class="content-title detail-title">待续签员工</h4>
        <div class="detail-warp">
            <div class="detail-item">
                <div class="title">员工编号：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.number', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">员工姓名：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.name', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">员工性质：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.userNatureName', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">入职日期：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.joinDate', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">部门：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.deptNameFullPath', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">岗位：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.positionName', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">部门负责人：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.reporterName', '') }}</div>
            </div>
            <div class="detail-item">
                <div class="title">工作地点：</div>
                <div class="content">{{ _get(contractRenewInfo, 'userInfoVO.workplace', '') }}</div>
            </div>
        </div>
        <h4 class="content-title">待续签合同</h4>
        <ui-form ref="form"
            :model="formData" :rules="ruleData"
            :label-width="120" :show-message="showMessage"
        >
            <form-item label="合同主体：" prop="contractSubject" required>
                <ui-cascader-new
                    ref="cascaderContractSubject"
                    v-model="formData.contractSubject"
                    class="module query"
                    placeholder="请选择"
                    node-key="dictCode"
                    dict-type="contract_body"
                    :load="(node, resolve) => {
                        return loadData(node, resolve, 'contract_body')
                    }" lazy
                    :meta-data="contractSubjectDefaultValue"
                    :multiple="false"
                    :props="{children: 'children', label: 'dictName',isLeaf:'isLeaf'}"
                >
                </ui-cascader-new>
            </form-item>
            <form-item label="合同类型：" prop="contractType" required>
                <ui-cascader-new
                    ref="cascaderContractType"
                    v-model="formData.contractType"
                    class="module query"
                    placeholder="请选择"
                    node-key="dictCode"
                    dict-type="contract_type"
                    :load="(node, resolve) => {
                        return loadData(node, resolve, 'contract_type')
                    }" lazy
                    :meta-data="contractTypeDefaultValue"
                    :multiple="false"
                    :props="{children: 'children', label: 'dictName',isLeaf:'isLeaf'}"
                >
                </ui-cascader-new>
            </form-item>
            <form-item label="合同起始日期：" prop="startDate">
                <ui-date-picker
                    v-model="formData.startDate" type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                >
                </ui-date-picker>
            </form-item>
            <form-item class="timeLimit" prop="duration" :required="!isInfiniteContract">
                <label slot="label">合同期限：</label>
                <ui-select v-model="formData.duration" :disabled="isInfiniteContract">
                    <ui-option
                        v-for="item in durationList[formData.unit]" :key="item.value"
                        :value="item.value"
                    >{{ item.label }}
                    </ui-option>
                </ui-select>
            </form-item>
            <form-item class="unit" prop="unit">
                <ui-select v-model="formData.unit" :disabled="isInfiniteContract">
                    <ui-option
                        v-for="item in dictionaryList.contract_deadline" :key="item.value"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </ui-option>
                </ui-select>
            </form-item>
            <form-item label="合同截止日期：" prop="endDate" :required="!isInfiniteContract">
                <ui-date-picker
                    v-model="formData.endDate" type="date"
                    :disabled="isInfiniteContract"
                    value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                >
                </ui-date-picker>
            </form-item>
            <form-item label="合同签订说明：" prop="description">
                <ui-input v-model.trim="formData.description"
                    type="textarea" placeholder="500字符以内"
                    :maxlength="500" resize="none" :autosize="{minRows: 5, maxRows: 10}" counter
                />
            </form-item>
        </ui-form>
    </div>
    <div class="footer-waper">
        <button class="btn btn-primary btn-outline" @click="onRenewDialogClose">取消</button>
        <button class="btn btn-primary" @click="onRenewDialogConfirm">确定</button>
    </div>
</div>
</template>
<script>
import { renewContract } from '@/services/dashboard/contract/index.js';
import { _getDetailByProcessInstanceId } from '@/services/dashboard/audit';
import { _getDictTypes } from '@/services/dashboard/system/common.js';
import { _getDictDetail } from '@/services/dashboard/system/dictionary';
import { util } from '@noah/tools';
const { _getValue, _last } = util;

const YEAR = '01';
const MONTH = '02';

// 合同主体校验规则
function contractSubjectRules(rule, value, callback) {
    if (['', undefined, null].includes(value) || value.length === 0) {
        callback(new Error('请选择合同主体'));
    } else {
        callback();
    }
}
// 合同类型校验规则
function contractTypeRules(rule, value, callback) {
    if (['', undefined, null].includes(value) || value.length === 0) {
        callback(new Error('请选择合同类型'));
    } else {
        callback();
    }
}
export default {
    name: 'CommonRenew',
    props: {
        'auditData': {
            type: Object,
            default: () => ({})
        },
        'onConfirm': {
            type: Function,
            default: function () {}
        }
    },
    data() {
        const isEmpt = (message) => {
            return (rule, value, callback) => {
                if (['', undefined, null].includes(value) && !this.isInfiniteContract) {
                    callback(new Error(message));
                } else {
                    callback();
                }
            };
        };
        // 合同类型校验规则
        const endRules = isEmpt('请填写合同截止日期');
        // 合同期限校验规则
        const durationRules = isEmpt('请选择合同期限');

        return {
            formData: {
                startDate: '',
                duration: '',
                unit: YEAR,
                endDate: '',
                description: '',
                contractSubject: [],
                contractType: []
            },
            contractRenewInfo: {},          // 续签基本信息
            showMessage: false,
            contractSubjectDefaultValue: [],
            contractTypeDefaultValue: [],
            durationList: {
                [YEAR]: [],
                [MONTH]: []
            },
            ruleData: {
                contractSubject: [
                    { validator: contractSubjectRules, trigger: 'change' }
                ],
                contractType: [
                    { validator: contractTypeRules, trigger: 'change' }
                ],
                startDate: [
                    { required: true, message: '请填写合同起始日期', trigger: 'change' }
                ],
                duration: { validator: durationRules, trigger: 'change' },
                unit: { validator: durationRules, trigger: 'change' },
                endDate: { validator: endRules, trigger: 'change' }
            },
            dictionaryList: {               // select下拉选项列表
                // 'employee_nature': [],      // 合同属性列表
                // 'contract_body': [],        // 合同主体列表
                // 'contract_type': [],        // 合同类型列表
                'contract_deadline': []    // 合同期限列表
                // 'contract_sign_type': []    // 签订类型
            }
        };
    },
    created() {
        this.init();
        this._getValue = _getValue;
    },
    watch: {
        // 合同类型等于不限期清空合同期限
        'formData.contractType': function(value) {
            if (this.isInfiniteContract) {
                this.formData.duration = '';
                this.formData.unit = '';
                this.formData.endDate = '';
                this.$refs['form'].validate();
            } else {
                // 如果年限没有值 自动赋值年
                if (!this.formData.unit) {
                    this.formData.unit = YEAR;
                }
            }
        },
        'myEndDate': function(val){
            this.formData.endDate = val;
        },
        'formData.unit': function(value) {
            this.formData.duration = '';
        }
    },
    computed: {
        // 是否是无限期合同
        isInfiniteContract() {
            return this.getCascaderValue(this.formData.contractType) === '--';
        },
        /**
         * @description 动态计算结束日期
         * 合同起始日期 + 合同期限 - 1自然天
         */
        myEndDate() {
            const { startDate, duration, unit } = this.formData;
            let date = '';
            if (startDate && duration && unit && !this.isInfiniteContract) {
                // 因为列表的code不是数字 所以要获取到对应的label
                const num =  this.getTextBycode(duration, this.durationList[unit]);
                if (!num) {
                    return date;
                }
                let month = unit === YEAR ? num * 12 : num;
                date = this.$dayjs(startDate).add(month, 'M').subtract(1, 'day').format('YYYY-MM-DD');
            }
            return date;
        }
    },
    methods: {
        async init() {
            try {
                const renewInfo = await this.getContractRenewInfo();
                const { contractSubject, contractType, contractSubjectName, contractTypeName, startDate, endDate, duration = '', description} = renewInfo;
                this.contractRenewInfo = renewInfo;
                const subject = await this.getNameByCode('contract_body', contractSubject);
                const type = await this.getNameByCode('contract_type', contractType);
                if (subject && subject.enable === '1') {
                    this.formData.contractSubject = [ contractSubject ];
                    this.contractSubjectDefaultValue = [{ label: contractSubjectName }];
                }

                if (type && type.enable === '1') {
                    this.formData.contractType = [ contractType ];
                    this.contractTypeDefaultValue = [{ label: contractTypeName }];
                }
                // 合同起始日期默认为合同截止日期+1
                // endDate && (this.formData.startDate = this.$dayjs(endDate).add(1, 'day').format('YYYY-MM-DD'));

                // 重新发起合同续签 回填所有数据
                this.formData.unit = duration.substr(0,2) === MONTH ? MONTH : YEAR;
                this.formData.startDate = this.$dayjs(startDate).format('YYYY-MM-DD');
                this.formData.description = description;
                // 防止watch监听影响 对endDate后赋值
                setTimeout(() => {
                    this.formData.duration = duration;
                    this.formData.endDate = this.$dayjs(endDate).format('YYYY-MM-DD');
                }, 100);
            } catch (error) {
                console.log(error);
            }
            this.getDictionaryList();
            this.getDurationList();
        },
        // 获取续签基本信息
        async getContractRenewInfo() {
            try {
                const { root, success } = await _getDetailByProcessInstanceId({
                    processInstanceId: this.auditData.processInstanceId
                });
                if (success && root && root.detail) {
                    return root.detail;
                } else {
                    return {};
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * @description 获取多层级select最后选中的code值
         * @param {Array} valueList 多层级select组件的值
         */
        getCascaderValue(valueList) {
            return _last(valueList) || '';
        },
        // 获取时间列表字典
        getDurationList() {
            Object.keys(this.durationList).forEach(key => {
                _getDictTypes({
                    dictType: 'contract_deadline',
                    parentCode: key
                }).then(res => {
                    if (res.success && res.root) {
                        this.durationList[key] = res.root.map(item => {
                            return {
                                label: item.dictName,
                                value: item.dictCode
                            };
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        // 续签弹窗提交
        onRenewDialogConfirm() {
            this.$refs['form'].validate(async (valid) => {
                this.showMessage = true;
                if (!valid) { return; }
                try {
                    const { contractWarningId, contractId } = this.contractRenewInfo;
                    const { contractType, contractSubject, endDate } = this.formData;
                    const { processInstanceId } = this.auditData;
                    // contractType contractSubject 针对多层级select值进行处理 只取数据的最后一项的值
                    let data = {
                        ...this.formData,
                        processInstanceId,
                        contractType: this.getCascaderValue(contractType),
                        contractSubject: this.getCascaderValue(contractSubject),
                        contractWarningId,
                        contractId,
                        startDate: this.$dayjs(this.formData.startDate).valueOf(),
                        endDate: this.$dayjs(endDate).valueOf()
                    };
                    delete data.unit;
                    let res = await renewContract(data);
                    if (res.success && res.root) {
                        this.onRenewDialogClose();
                        this.$emit('on-confirm');
                        this.$toast({
                            content: '提交成功，合同续签审批已发起！',
                            type: 'success'
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        },
        // 关闭续签弹窗
        onRenewDialogClose() {
            this.$emit('update:showModal', false);
        },

        /**
         * @description 对多层级select列表数据进行处理
         * @param {String} parentCode 父级id
         * @param {String} dictType 字典类型
         */
        async leaveList(parentCode, dictType){
            let res = await _getDictTypes({parentCode, dictType});
            if(res.success && res.root && res.root.length){
                return (res.root || []).map(node => {
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
            return resolve( result );
        },
        // 初始化字典值
        getDictionaryList() {
            Object.keys(this.dictionaryList).forEach((key, index) => {
                _getDictTypes({
                    dictType: key
                }).then(res => {
                    if (res.success && res.root && res.root.length) {
                        this.dictionaryList[key] = res.root.map(item => {
                            return {
                                label: item.dictName,
                                value: item.dictCode
                            };
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        // 通过code和list获取对应的label
        getTextBycode(code, list = [], defaultValue = '') {
            return _getValue(list.find(item => item.value === code), 'label', defaultValue);
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
            } catch(e) {
                console.log(e);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.common-renew {
    width: 606px;
}
</style>
