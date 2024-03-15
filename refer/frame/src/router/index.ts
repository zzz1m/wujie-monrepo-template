import { createRouter, createWebHistory } from 'vue-router';
import setupRouterGuard from './guard';

const pathPrefix = import.meta.env.VITE_PATHPREFIX as string;

const router = createRouter({
  history: createWebHistory(pathPrefix),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/AppSub.vue'),
    },
  ],
});

setupRouterGuard(router);

export default router;
