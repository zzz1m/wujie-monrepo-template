
export default {
    name: 'equip',
    namespaced: true,
    state: {
        pageSizeObj: { // 页数全局设置
            'equipment': 15, // 资产管理列表
            'repair': 15, // 维修列表
            'agreement': 15, // 合同列表
            'apply': 15, // 申领归库
            'check': 15, //资产盘点
            'checkdetail': 15, //资产盘点详情 
            'error': 15, // 报错列表
        }
    },
    getters: {
    },
    mutations: {
        setPageSize (state, payload) {
            state.pageSizeObj[payload.key] = payload.value;
        }
    },
    actions: {
    }
};