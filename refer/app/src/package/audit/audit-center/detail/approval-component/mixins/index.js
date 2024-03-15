
import { _getDetailByProcessInstanceId, _getAdminDetailByProcessInstanceId } from '@/services/dashboard/audit';
import { _getValue, isNull } from '@/utils/util.js';
import { getIconName } from '@noah/tools/src/utils/icon.js';
import { _canSeeUser } from '@/services/dashboard/talent-map';

export default {
    inheritAttrs: false,
    props: {
        // 审批流程
        processList: {
            type: Array,
            default: () => []
        },
        // 当前节点信息
        currentNode: {
            type: Array,
            default: () => []
        },
        dataPrivilege: {
            type: Object,
            default: () => {
                return {
                    userEmail: '', //操作人（点击查看详情页的人）
                    viewPrivilege: false, //是否有查看权限
                    operatePrivilege: false //是否有操作权限
                };
            }
        }
    },
    computed: {
        isAdminDetail() {
            return this.$route.path.match('process-detail-admin');
        }
    },
    created() {
        this.getDetailApi = this.isAdminDetail ? _getAdminDetailByProcessInstanceId : _getDetailByProcessInstanceId;
        this.getIconName = getIconName;
        this._getValue = _getValue;
        if(this.checkCanSeeUser) {
            this.checkCanSeeUserFn();
        }
    },
    data() {
        return {
            highlightFieldList: [],
            canSeeUser: false
        };
    },
    methods: {
        async checkCanSeeUserFn() {

        },
        translateBoolLabel(value) {
            return [1, '1', true].indexOf(value) > -1 ? '是' : ([null, ''].indexOf(value) > -1 ? '-' : '否');
        },
        /**
         * @description 返回高亮class
         * @param {Object} fieldObjOrValue 所有字段对象
         * @param {String} code 字段code
         * @param {Boolean} isValue 是否使用传入的值直接用作值来使用
         * @returns {string} 高亮的className
         */
        highlightClass(fieldObjOrValue, code, isValue) {
            // 如果isValue为真, 则直接用fieldObjOrValue作为value;
            try {
                let value = isValue ? fieldObjOrValue : _getValue(fieldObjOrValue, code);
                // 没有值 不做高亮处理
                if (isNull(value) || !this.highlightFieldList.includes(code)) {
                    return '';
                }
                if (Array.isArray(value)) {
                    if (!value.length) {
                        return '';
                    }
                }
                return 'audit-detail-highlight';
            } catch (error) {
                console.log(error);
                return '';
            }

        }
    }
};
