import { getUserRecordInfo } from '@/services/dashboard/staff';
export default {
    name: 'staff-record',
    namespaced: true,
    state: {
        // 员工档案信息
        recordInfo: {},
        defaultHeadImage: '' // 默认的头像
    },
    getters: {
        staffInfo(state) {
            return state.recordInfo['userInfoVO'] || {};
        },
        staffConfig(state) {
            return state.recordInfo['groupVOList'] || [];
        },
        staffFieldInfo(state) {
            return state.recordInfo['groupFieldValueMap'] || {};
        },
        userRecordTempVO(state) {
            return state.recordInfo['userRecordTempVO'] || {};
        }
    },
    mutations: {
        setRecordInfo(state, info) {
            state.recordInfo = info || {};
        },
        setDefaultHeadImage(state, url) {
            state.defaultHeadImage = url || '';
        },
        // 更新头像
        setHeadImage(state, headImage) {
            state.recordInfo.userInfoVO.headImage = headImage;
        }
    },
    actions: {
        // 获取档案信息
        async getRecordInfo({ commit }) {
            const { success, root } = await getUserRecordInfo();
            if(!success) {
                return;
            }
            commit('setRecordInfo', root);
            // 赋值默认进来的头像
            commit('setDefaultHeadImage', root && root.userInfoVO && root.userInfoVO.headImage);
        }
    }
};