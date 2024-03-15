import { 
    PARAM_COMMON_VALUE_CODE,
    PARAM_SELECT_OPTION_CODE,
    PARAM_SELECT_OPTION_INFORMATION_CODE
} from '@/package/template-center/model/const';

export default {
    props: {
        viewConfig: {           // 视图对象
            type: Object,
            default: () => {}
        },
        valueConfig: {          // 值对象
            type: Object,
            default: () => {}
        },
        viewItem: {             // 视图对象
            type: Object,
            default: () => {}
        }
    },
    inject: ['pageData'],
    data() {
        return {
            PARAM_COMMON_VALUE_CODE: PARAM_COMMON_VALUE_CODE,
            PARAM_SELECT_OPTION_CODE: PARAM_SELECT_OPTION_CODE,
            PARAM_SELECT_OPTION_INFORMATION_CODE: PARAM_SELECT_OPTION_INFORMATION_CODE
        };
    },
    computed: {
        // 真实id
        viewId() {
            return this.viewItem.id;
        },
        readonly() {
            return this.pageData.readonly;
        }
    }
};