import Vue from 'vue';
import VueRouter from 'vue-router';
import { Page404 } from '@noah/components';


// Avoided redundant navigation to current location
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = (() => {
    const arr = [];
    const routeCtx = import.meta.globEager('./*.r.js');
    Object.values(routeCtx).forEach(filename => {
        arr.push(filename.default);
    });
    return arr;
})();

export default new VueRouter({
    mode: 'history',
    base: import.meta.env.VITE_PATHPREFIX,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    },
    routes: [
        ...routes,
        {
            name: '',
            path: '*',
            component: Page404
        }
    ]
});
