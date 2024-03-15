import SessionStorage from '../utils/sessionstorage';
import Vue from 'vue';

const vm = new Vue();

// 存储名
const STORAGE_NAME = '_forbid_pushState';
const EDITING_NAME = 'IS_EDITING';

// 阻止历史记录回退或者前进
const forbidBack = function () {
  const IS_EDITING = SessionStorage.get(EDITING_NAME);
  if (IS_EDITING == 1) {
    vm.$dialog({
      title: '温馨提示',
      type: 'warning',
      content: '离开会丢失未保存的修改，确定离开吗？',
      onConfirm() {
        SessionStorage.del(EDITING_NAME);
        SessionStorage.del(STORAGE_NAME);
        setTimeout(() => {
          window.history && window.history.back();
        }, 300);
      },
      onCancel() {
        if (window.history && window.history.pushState) {
          history.pushState(null, null, document.URL);
        }
      }
    });
  } else {
    window.history && window.history.back();
  }
};

// 阻止刷新或者关闭窗口
const forbidClose = function (e) {
  const IS_EDITING = SessionStorage.get(EDITING_NAME);
  if (IS_EDITING == 1) {
    const message = '离开会丢失未保存的修改，确定离开吗？';
    (e || window.event).returnValue = message;
    return message;
  }
};

export default {
  data() {
    return {
      isShowCloseTip: false,
      formData: {},
      isSaveAndPublish: false
    };
  },
  computed: {
    formDataChange() {
      return JSON.parse(JSON.stringify(this.formData));
    }
  },
  watch: {
    formDataChange: {
      handler(newVal, oldVal) {
        if (newVal != oldVal && oldVal.id && newVal.id) {
          // 编辑
          this.isShowCloseTip = true;
          this.setEditing(1);
        } else if (newVal != oldVal && this.openType == 1) {
          // 添加
          this.isShowCloseTip = true;
          this.setEditing(1);
        }
      },
      deep: true
    },
    isSaveAndPublish(newVal, oldVal) {
      if (newVal != oldVal && newVal != undefined && oldVal != undefined) {
        this.isShowCloseTip = true;
        this.setEditing(1);
      }
    }
  },
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
      window.addEventListener('popstate', forbidBack);
    }

    window.addEventListener('beforeunload', forbidClose);
  },
  beforeDestroy() {
    SessionStorage.del(EDITING_NAME);
    SessionStorage.del(STORAGE_NAME);
    window.removeEventListener('popstate', forbidBack);
    window.removeEventListener('beforeunload', forbidClose);
  },
  methods: {
    setEditing(status = 0) {
      console.log('xxx', status);
      SessionStorage.set(EDITING_NAME, status);
    },
    getForbidStatus() {
      return SessionStorage.get(EDITING_NAME);
    }
  }
};
