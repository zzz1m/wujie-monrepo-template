import SessionStorage from '../utils/sessionstorage';
import Vue from 'vue';
import store from '../store';

const vm = new Vue();

// 存储名
const STORAGE_NAME = '_forbid_pushState';
const EDITING_NAME = 'IS_EDITING';

export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.setEditing();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      // 解决刷新页面时重复push，导致回退时重复confirm
      let forbidPush = SessionStorage.get(STORAGE_NAME);
      if (!forbidPush) {
        // null
        window.history.pushState(null, null, document.URL);
        SessionStorage.set(STORAGE_NAME, 1);
      }
      window.addEventListener('popstate', this.forbidBack);
    }

    window.addEventListener('beforeunload', this.forbidClose);
  },
  beforeDestroy() {
    SessionStorage.del(EDITING_NAME);
    SessionStorage.del(STORAGE_NAME);
    window.removeEventListener('popstate', this.forbidBack);
    window.removeEventListener('beforeunload', this.forbidClose);
  },
  methods: {
    forbidBack() {
      const that = this;
      if (this.validateDataChange) {
        // 有过变化 并且没有回退过
        this.setEditing(this.validateDataChange() && SessionStorage.get(EDITING_NAME) !== null ? 1 : 0);
      }
      const IS_EDITING = SessionStorage.get(EDITING_NAME);
      store.commit('updatePageIsLoading', false);
      if (IS_EDITING == 1) {
        this.$dialog({
          title: '温馨提示',
          type: 'warning',
          content: '离开会丢失未保存的修改，确定离开吗？',
          onConfirm() {
            // 触发返回上一页的回调
            if (that.forbidCallback) {
              that.forbidCallback('confirm');
            }
            SessionStorage.del(EDITING_NAME);
            SessionStorage.del(STORAGE_NAME);
            that.validateDataChange = () => {
              return false;
            };
            if (window.history && window.history.pushState) {
              history.pushState(null, null, this.pageUrl);
            }
            setTimeout(() => {
              window.history && window.history.back();
            }, 300);
          },
          onCancel() {
            if (window.history && window.history.pushState) {
              history.pushState(null, null, document.URL);
            }
            if (that.forbidCallback) {
              that.forbidCallback('cancel');
            }
          },
          onClose: () => {
            if (window.history && window.history.pushState) {
              history.pushState(null, null, this.pageUrl);
            }
            if (that.forbidCallback) {
              that.forbidCallback('close');
            }
          }
        });
      } else {
        window.history && window.history.back();
      }
    },
    forbidClose(e) {
      if (this.validateDataChange) {
        // 有过变化 并且没有回退过
        this.setEditing(this.validateDataChange() && SessionStorage.get(EDITING_NAME) !== null ? 1 : 0);
      }
      const IS_EDITING = SessionStorage.get(EDITING_NAME);
      if (IS_EDITING == 1) {
        const message = '离开会丢失未保存的修改，确定离开吗？';
        (e || window.event).returnValue = message;
        return message;
      }
    },
    setEditing(status = 0) {
      SessionStorage.set(EDITING_NAME, status);
    },
    getForbidStatus() {
      return SessionStorage.get(EDITING_NAME);
    },
    dialogCtrlPrompt() {
      return new Promise((resolve) => {
        this.$dialog({
          title: '温馨提示',
          type: 'warning',
          content: '离开会丢失未保存的修改，确定离开吗？',
          onConfirm() {
            SessionStorage.del(EDITING_NAME);
            SessionStorage.del(STORAGE_NAME);
            resolve(true);
          },
          onCancel() {
            resolve(false);
          }
        });
      });
    }
  }
};
