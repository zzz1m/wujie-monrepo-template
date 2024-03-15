import type { Plugin } from 'vue';
import WujieVue from 'wujie-vue3';
import { setup } from './setup';

export default {
  install(app) {
    app.use(WujieVue);

    console.groupCollapsed('子系统注册');
    setup();
    console.groupEnd();
  },
} satisfies Plugin;
