import { _getKpiDateList } from '@/services/dashboard/performance/index.js';
export default {
    name: 'performance',
    namespaced: true,
    state: {
        // 绩效阶段信息
        kpiNodeList: []
    },
    mutations: {
        // 更新绩效信息
        setKpiNodeList(state, data = []) {
            state.kpiNodeList = data;
        }
    },
    actions: {
        // 获取绩效信息
        async getRecordInfo({ commit }) {
            const { success, root } = await _getKpiDateList();
            if(!success) {
                return;
            }
            commit('setKpiNodeList', root);
        }
    }
};