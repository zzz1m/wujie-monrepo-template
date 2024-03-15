import { defineStore } from 'pinia';
import { fetch } from '@/utils/fetch';
import store from './index';
import { matchSubSystemRoute } from '@/wujie/setup';

export const useAppStore = defineStore('app', () => {
  const userInfo = ref<NoahUserInfo>();
  async function updateUserInfo() {
    const { success, root } = await fetch('/api/user/info.json');
    if (success) {
      userInfo.value = root;
    }
  }

  const matchSubSystem = ref<SubSystemMatch>();
  const matchErrMsg = ref('');
  const setMatchErrMsg = (msg: string) => (matchErrMsg.value = msg);
  const matchActived = ref(false);
  const setMatchActived = (val: boolean) => (matchActived.value = val);

  const handleMatchSubSystem = matchSubSystemRoute({
    callback: (val) => {
      /**
       * 只有切换应用的时候才从主应用同步url到子应用，避免重新激活
       * 激活后路由同步：
       * 1. 子应用 => 主应用
       * 2. 主应用 bus.$emit => 子应用 $on => router.push
       */
      if (val && val.name !== matchSubSystem.value?.name) {
        matchSubSystem.value && console.groupEnd();
        console.group(val.name);
        matchSubSystem.value = val;
        console.log(val.url);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
      setMatchErrMsg(error.message);
    },
  });

  // 审批上面的红点
  const auditCount = ref(0);
  async function getAuditCount() {
    try {
      const { success, root } = await fetch('/api/process/center/count.json');
      if (success) {
        auditCount.value = root;
      }
    } catch (error) {
      //
    }
  }
  const updateAuditCount = (val: number) => (auditCount.value = val);

  const updatePageTitle = (title: string) => {
    title && (document.title = `BZL Noah - ${title}`);
  };

  return {
    userInfo,
    updateUserInfo,
    // 激活的子系统
    matchSubSystem,
    matchActived,
    setMatchActived,
    matchErrMsg,
    setMatchErrMsg,
    handleMatchSubSystem,
    // 审批上面的红点
    auditCount,
    getAuditCount,
    updateAuditCount,
    updatePageTitle,
  };
});

// 在应用挂载前使用
export const useAppStoreOut = () => {
  return useAppStore(store);
};
