import './styles/index.css';
import App from './App.vue';
import store from './store';
import wujie from './wujie';
import router from './router';
import bossDesign from './plugins/boss-design';

import { useAppStoreOut } from './store/app';

function initApp() {
  const app = createApp(App).use(store).use(wujie).use(bossDesign).use(router);

  app.config.errorHandler = (err, instance, info) => {
    // 处理错误，例如：报告给一个服务
    console.log(err, instance, info);
    // debugger
  };

  app.mount('#noah-root');
}

async function startApp() {
  try {
    const { updateUserInfo } = useAppStoreOut();
    await updateUserInfo();
  } finally {
    initApp();
  }
}

startApp();
