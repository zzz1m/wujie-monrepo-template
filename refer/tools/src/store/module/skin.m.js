import dayjs from 'dayjs';
import API from '../../meta/api';
const { _getModulePoster } = API.COMMON;
import storage from '../../utils/localstorage';
import { SKIN_START_DATE, SKIN_END_DATE, EFFECTIVE_DATE, SKIN_IMG_LIST, SKIN_KEY } from './skin-config';
export default {
  name: 'skin',
  namespaced: true,
  state: {
    effectiveDate: EFFECTIVE_DATE, // 日历显示图标日期
    skinStartDate: SKIN_START_DATE, // 开始时间  包括当天
    skinEndDate: SKIN_END_DATE, // 结束时间  包括当天
    envelopesNum: 0, // 改变红包状态
    skinHomePagePlayDate: '', // 首页执行动画名称 （没执行 进入首页执行一次）
    skinDialogInfo: {},
    showSkinDialog: false, // 显示弹窗
    skinImgList: SKIN_IMG_LIST, // 下雨图片list
    starNum: 0,
    skinKey: SKIN_KEY, // 换肤key
    initSkinPoster: false
  },
  getters: {
    isSkinDuration(state) {
      if (!state.skinEndDate || !state.skinStartDate) {
        return false;
      }
      return dayjs().isBefore(dayjs(state.skinEndDate).add(1, 'day')) && dayjs().isAfter(dayjs(state.skinStartDate));
    }
  },
  mutations: {
    updateEnvelopesNum(state, payload) {
      state.envelopesNum = payload;
    },
    updateShowSkinDialog(state, type) {
      state.showSkinDialog = type;
    },
    updateSkinDialogInfo(state, info) {
      state.skinDialogInfo = info;
    },
    updateStarNum(state, info) {
      state.starNum = info;
    },
    updateInitSkinPoster(state, status) {
      state.initSkinPoster = status;
    }
  },
  actions: {
    showEnvelopeRain({ commit, state, getters }) {
      if (!getters.isSkinDuration) {
        return;
      }
      const storageEffectiveDate = storage.get('NOAH_SKIN_HOME_PAGE_PLAY_DATE');
      if (storageEffectiveDate === state.effectiveDate) {
        return;
      }
      const num = state.envelopesNum + 1;
      commit('updateEnvelopesNum', num);
    },
    // 处理是否显示海报信息
    async getSkinDialogType({ commit, state, getters, dispatch }, payload = {}) {
      try {
        if (!getters.isSkinDuration) {
          commit('updateInitSkinPoster', true);
          return;
        }
        const isHomePage = payload.path === '/dashboard/pages/home';
        const { success, root } = await _getModulePoster({
          module: 'changeSkin'
        });
        if (success && root && root.viewStatus === 0) {
          commit('updateShowSkinDialog', true);
          commit('updateSkinDialogInfo', root);
        } else if (success && isHomePage) {
          dispatch('showEnvelopeRain');
        }
        commit('updateInitSkinPoster', true);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
