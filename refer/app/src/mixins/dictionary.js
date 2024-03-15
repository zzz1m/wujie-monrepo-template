// 反显字典值
import { _batchGetDictInfo } from '@/services/dashboard/common';

export default {
    data() {
        return {
            dicInfo: {}
        };
    },
    methods: {
        // 批量获取字典列表
        async batchGetDictInfo(typeList) {
            const { success, root } = await _batchGetDictInfo({typeList});
            if( success && root ){
                this.dicInfo = root || {};
            }
        },
        // 反显字典值
        showDicName(obj, key, type, placeholder = '--') {
            if(!obj || obj[key] === '' || obj[key] === null || obj[key] === undefined )  return placeholder;
            const code = obj[key];
            const list = this.dicInfo[type];
            if( !list ) return placeholder;
            const item = list.find(item => item.dictCode == code) || {};
            return item.dictName || placeholder;
        }
    }
};