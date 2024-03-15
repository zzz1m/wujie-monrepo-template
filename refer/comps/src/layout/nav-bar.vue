<template>
  <div id="app-nav-bar" class="header">
    <div class="content">
      <div class="nav">
        <!-- 以下为主导航 -->
        <template v-if="!subSystem">
          <span class="logo" title="BZL Noah" @click="gotoHomePage">
            <img
              :src="
                !isSkinDuration
                  ? 'https://img.bosszhipin.com/static/file/2022/kbn4u4wqhk1665391382662.png'
                  : 'https://img.bosszhipin.com/static/file/2022/kbn4u4wqhk1665391382662.png'
              "
            />
          </span>
          <ul v-if="mainNavList.length > 0" class="nav-list">
            <li :class="['nav-item', isHomePage ? 'active' : '']" @click="gotoHomePage">工作台</li>
            <li v-for="(nav, idx) in mainNavList" :key="nav.id">
              <a
                :class="['nav-item', navLinks.includes(nav.id + '') ? 'active' : '', isLargeScreen ? 'large' : '']"
                :href="findUrl(nav)"
                @click="onclickNav(nav, idx, $event)"
              >
                <ui-tooltip v-if="nav.name.length > navlength" :content="nav.name" effect="dark" placement="bottom">
                  <span :class="['nav-text', nav.isNew ? 'new' : '']">{{ nav.name.slice(0, navlength) + '...' }}</span>
                </ui-tooltip>
                <span v-else :class="['nav-text', nav.isNew ? 'new' : '']">{{ nav.name }}</span>
              </a>
            </li>
            <!-- 更多导航 -->
            <NavMore
              v-if="showNavMore"
              :more-nav="navMoreList"
              :sort-all-list="sortAllList"
              :total-nav="getTotalNavList"
              @click-nav-more="onclickNav"
              @update-sort="resortNavlist"
            />
          </ul>
        </template>

        <!-- 以下为子系统 -->
        <SubSystem v-else :is-large-screen="isLargeScreen" />
      </div>
      <HeaderTools :transform-width="true" />
    </div>
  </div>
</template>

<script>
import NavMore from './components/nav-more.vue';
import SubSystem from './components/sub-system.vue';
import HeaderTools from './components/header-tools.vue';

import { commonServices } from '@noah/tools';
import { mapState, mapActions, mapGetters } from 'vuex';

import {
  getMainNavList,
  getMoreNavList,
  refreshTitle,
  updatePageTitle,
  MAX_NAV_NUM,
  resetNavLength,
  getPath,
  formatNumber,
  findUrl,
  preventDefaultAction
} from './common/nav-tools';
import NAV from './common/nav-center';
import watermark from '@noah/tools/src/utils/watermark.min.js';

import navList from './common/mock';
const { _getNavlist, _updateNew, _getModulePoster } = commonServices;
const calcNavlist = function (arr) {
  return arr.map((item, idx) => {
    item._idx = idx;
    return item;
  });
};
let cacheNavInfo = {}; // 缓存上一次点击的导航信息
let timer = null;

/* todo: 是否是无权限菜单
 * 需要同时满足5种情况：按优先级排序
 * 1、非*路由
 * 2、当前路由是有权限限制的访问路由：路由配置信息
 * 3、当前路由不在白名单路由之内：路由前缀白名单
 * 4、有当前路由对应菜单权限，但是没有当前路由的访问权限
 * 5、无当前路由对应菜单权限
 */
const isNoPermission = function (pathPre, routeObj) {
  const routePreWhiteList = ['/dashboard/pages'];
  if (pathPre.includes('*')) return false; // *路由
  if (routeObj.meta.public) return false; // 当前路由是没有权限限制的访问路由
  if (routePreWhiteList.includes(pathPre)) return false; // 当前路由在白名单路由之内
  return true;
};

export default {
  name: 'NavBar',
  components: {
    NavMore,
    SubSystem,
    HeaderTools
  },
  computed: {
    ...mapState(['commerGuide', 'userInfo']),
    ...mapGetters('skin', ['isSkinDuration']),
    mainNavList() {
      return getMainNavList(this.navList);
    },
    navMoreList() {
      return getMoreNavList(this.navList);
    },
    showNavMore() {
      return this.navMoreList.length > 0;
    },
    navLinks() {
      return NAV.navLinks;
    },
    navlength() {
      return NAV.navlength;
    },
    subSystem() {
      return NAV.subSystem;
    },
    isHomePage() {
      return this.$route.path === '/dashboard/pages/home';
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(newval, oldval) {
        if (!this.loadedMenu) return; // 如果没有加载完成菜单
        const { path, meta, query } = newval;
        const fromPath = query.target ? decodeURIComponent(query.target) : meta.target || path;
        const targetNavLinks = NAV.getActiveLink(fromPath);

        // this.configWatermark( newval );

        // 如果当前路由已经处于激活之中
        if (NAV.navLinks.includes(targetNavLinks[0] + '')) {
          // 更新地址栏title
          this.$emit('on-route-change', newval);
          refreshTitle(NAV.navLinks, NAV.navMap, newval);
          return;
        }
        this.$nextTick(() => {
          this.gotoTargetUrl(newval);
        });
      }
    }
  },
  data() {
    return {
      loadedMenu: false,
      isLargeScreen: true,
      navList: [],
      sortAllList: []
    };
  },

  async created() {
    if (window.__POWERED_BY_WUJIE__) {
      window.$wujie?.bus.$on('nav-bar.gotoHomePage', this.gotoHomePage);
    }
    this.getNavlist(() => {
      NAV.init(this);
      NAV.createNavMap(this.navList);
      this.gotoTargetUrl(this.$route);
      this.configWatermark(this.$route);
      this.loadedMenu = true;
    });
  },
  mounted() {
    this.init();
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeDestroy() {
    clearTimeout(timer);
    window.removeEventListener('resize', this.onWindowResize);
  },

  methods: {
    ...mapActions(['updateNewGuide']),
    findUrl(navInfo = {}) {
      const result = findUrl(navInfo);
      return result.url;
    },
    async init() {
      await this.updateNewGuide();
      this.onWindowResize();
    },
    async getNavlist(cb) {
      const { success, root } = await _getNavlist();
      if (success && root) {
        this.navList = calcNavlist(root || []);
        this.sortAllList = JSON.parse(JSON.stringify(root));
        cb && cb();
      }
    },
    // 水印
    configWatermark(routeObj) {
      this.setWatermark({
        watermark_alpha: '0.04',
        color: '#000024'
      });
      // if ( routeObj.path.startsWith('/dashboard/pages/article/') ) {
      //     this.setWatermark({
      //         watermark_alpha: '0.02',
      //         color: '#000'
      //     });
      // } else {
      //     this.setWatermark({
      //         watermark_alpha: '0.005'
      //     });
      // }
    },
    setWatermark(params = {}) {
      const { userId, name } = this.userInfo || {};
      const today = this.$dayjs().format('YYYY-MM-DD');
      if (!userId) {
        return;
      }
      const dateObj = new Date();

      let month = formatNumber(dateObj.getMonth() + 1);
      let day = formatNumber(dateObj.getDate());
      let subStamp = month + day + userId;
      let alpha = params.watermark_alpha || '0.005';
      let textColor = params.color || '#f4f4f5';
      let options = {
        watermark_txt: '<span>' + today + ' ' + name + ' ' + userId + '</span>',
        watermark_alpha: alpha,
        watermark_width: 270,
        watermark_height: 80,
        watermark_y: 50,
        watermark_fontsize: '14px', // 默认 80
        watermark_subhead_fontsize: '25px', // 默认 25
        watermark_color: textColor,
        watermark_angle: -13, // -26
        watermark_even_distance_left: 120
      };
      try {
        watermark.init(options);
        watermark.load(options);
      } catch (e) {
        console.log(e);
      }
    },
    async resortNavlist() {
      await this.getNavlist();
      const { navLinks, navMap } = NAV;
      if (navLinks && navLinks.length > 0) {
        const navId = navLinks[0];
        const curNavObj = navMap[`${navId}`];
        this.updateNavSort(curNavObj);
      }
    },
    gotoTargetUrl(routerInfo) {
      this.$emit('on-route-change', routerInfo);
      NAV.stopUpdateUrl(() => {
        this.initNavBar(routerInfo);
      });
    },
    initNavBar(routeObj) {
      const self = this;
      const { path, meta, fullPath, query, name } = routeObj;
      const fromPath = query.target ? decodeURIComponent(query.target) : meta.target || '';
      const target = fromPath.split('?')[0] || '';
      // 处理浏览器前进后退无法保留历史导航状态 & 页面初始化
      NAV.createNavLinks(path, target, function (ctx) {
        const { navLinks, navMap } = ctx;
        if (navLinks.length > 0) {
          const navInfo = navMap[navLinks[0]];
          const isSubsystem = navInfo.code === 'system';
          const hasTargetUrl = Boolean(target);

          // 只要在当前一级对象里匹配不到任何一个子菜单，就把左侧菜单清空
          const isTargetMenus = ctx?.childMenus?.find((item) => navLinks.includes(item.id + ''));
          if (!isTargetMenus) ctx.childMenus = null;

          // 处理菜单排序 - 子系统不参与排序
          if (navInfo.code !== 'system') {
            self.updateNavSort(navInfo);
          }
          // 执行导航切换后，页面渲染策略
          ctx.renderPageview(navInfo, isSubsystem, fullPath, hasTargetUrl);

          // 更新地址栏title
          refreshTitle(navLinks, navMap, routeObj);
        } else {
          // 工作台
          const pathPre = (routeObj.matched && (routeObj.matched[0] || {}).path) || '';
          // 无权限访问当前路由
          // if( pathPre && isNoPermission( pathPre, routeObj ) ){
          //     self.$toast({
          //         type: 'warning',
          //         duration: 2000,
          //         content: '暂无访问权限，即将跳转到工作台'
          //     });
          //     timer = setTimeout(() => {
          //         self.$router.replace( '/dashboard/pages/home' );
          //     }, 2000);
          //     return;
          // }
          let title = meta.title || name;
          NAV.clearSubSystem();
          updatePageTitle(title, 'BZL Noah - ' + title);
        }
      });
    },
    getTotalNavList() {
      return this.navList || [];
    },
    // 更新new信息
    async updateNavNew(id, sortOrder) {
      const { success, root } = await _updateNew({ id: id, sortOrder: sortOrder });
    },
    // 更新菜单排序
    updateNavSort(navInfo) {
      const { id, _idx } = navInfo;
      const curIndex = this.navList.findIndex((nav) => nav.id == id);
      if (curIndex < MAX_NAV_NUM) return;
      if (Object.keys(cacheNavInfo).length > 0) {
        this.navList.splice(curIndex, 1);
        const oldNavInfo = this.navList.splice(MAX_NAV_NUM - 1, 1, navInfo)[0];
        const targetIdx = navInfo._idx > cacheNavInfo._idx ? cacheNavInfo._idx + 1 : cacheNavInfo._idx;
        this.navList.splice(targetIdx, 0, oldNavInfo);
      } else {
        this.navList.splice(curIndex, 1);
        this.navList.splice(MAX_NAV_NUM - 1, 0, navInfo);
      }
      cacheNavInfo._idx = _idx;
    },
    // 点击导航菜单
    onclickNav(navInfo, idx, ev) {
      if (ev && ev.metaKey) return; // 新tab打开, 阻止js逻辑执行
      preventDefaultAction(ev); // 如果没有按 meta 键

      NAV.stopGoNext(async () => {
        if (navInfo.isNew) {
          navInfo.isNew = false;
          await this.updateNavNew(navInfo.id, navInfo.sortOrder);
        }
        // 子系统，新窗口打开，少于8个的不参与排序
        if (navInfo.code != 'system' && navInfo.target != 'blank' && idx >= MAX_NAV_NUM) {
          this.updateNavSort(navInfo);
        }
        if (navInfo.target == 'blank') {
          NAV.loadPagelink(navInfo);
        } else {
          NAV.forceUpdateUrl(function () {
            NAV.renderPageview(navInfo);
          });
        }
      });
    },
    // 去工作台
    gotoHomePage() {
      NAV.stopGoNext(() => {
        this.$router.push('/dashboard/pages/home');
        NAV.clearSubSystem();
      });
    },
    onWindowResize() {
      const showGuide = this.commerGuide.showGuide;
      const navLength = resetNavLength();
      NAV.resetNavNameLength(navLength);
      // 这里要加上新手引导的判断
      this.isLargeScreen = !showGuide && window.innerWidth > 2000;
    }
  }
};
</script>
