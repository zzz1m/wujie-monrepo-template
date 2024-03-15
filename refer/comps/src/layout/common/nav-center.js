import Vue from 'vue';
import SessionStorage from '@noah/tools/src/utils/sessionstorage';
import { createNavMap, createNavLinks, findUrl, jumpUrl, getPath, WHITE_CODE_LIST } from './nav-tools';

let $ctx = null;
// 用于缓存路由的link信息，避免重复计算
const cacheUrlLinks = {};

// 以下负责处理所有的导航相关逻辑
const NavCenter = new Vue({
  data() {
    return {
      navMap: {}, // 当前导航的map信息
      navLinks: [], // 记录当前路由的导航关系
      childMenus: [], // 左侧菜单
      subSystem: null, // 子系统相关配置
      updateUrl: false, // 是否需要更新当前地址栏路由信息
      navlength: 4 // 头部导航展示的
    };
  },
  methods: {
    // 初始化一些信息
    init(ctx) {
      $ctx = ctx;
    },
    // 生成菜单映射文件
    createNavMap(list) {
      this.navMap = Object.freeze(createNavMap(list));
    },
    // 生成路由的菜单依赖信息，从前向后逐级递减
    createNavLinks(url, target, cb) {
      url = getPath(url);
      let urlLinks = null;
      let cacheUrlInfo = cacheUrlLinks[url]; // { links, target } 记录关联的路由路径 和 目标来源
      // 没有缓存记录 && 当前目标来源从来没有被匹配过
      if (!cacheUrlInfo || target != cacheUrlInfo.target) {
        const links = createNavLinks(url, this.navMap, target);
        cacheUrlLinks[url] = {
          target,
          links
        };
        urlLinks = links;
      } else {
        urlLinks = cacheUrlInfo.links || [];
      }
      // let urlLinks = cacheUrlLinks[url];
      // if( !urlLinks ){
      //     urlLinks = cacheUrlLinks[url] = createNavLinks(url, this.navMap, target);
      // }
      this.navLinks = urlLinks;
      cb && cb(this);
    },
    // 导航切换后，页面渲染策略
    renderPageview(navInfo, showSubSystem, targetUrl = '', hasTargetUrl) {
      const code = navInfo.code;
      if (!code || !WHITE_CODE_LIST.includes(code)) {
        this.$toast({
          type: 'warning',
          duration: 2000,
          content: `当前菜单【${navInfo.name}】未配置code或者code无效`
        });
        return;
      }
      if (this.updateUrl) {
        this.childMenus = [];
      }
      // 需要特殊保留子系统的时候
      if (!showSubSystem) this.subSystem = null;

      this[`loadPage${code}`](navInfo, targetUrl, hasTargetUrl);
    },
    // 加载link视图
    loadPagelink(navInfo = {}, targetUrl, hasTargetUrl) {
      let { url, target } = navInfo;
      url = targetUrl || url;
      // 如果不需要更新路由 或者 路由不存在
      if (!url) {
        this.$toast({
          type: 'warning',
          duration: 2000,
          content: '缺少必要的跳转地址信息！'
        });
        return;
      }
      jumpUrl(url, target, () => {
        if (!hasTargetUrl) {
          // 当配置有targeturl的时候，不需要再更新navlink信息
          this.createNavLinks(url);
        }
        $ctx.$router.push(url);
      });
    },
    // 加载子菜单视图
    loadPagemodule(navInfo = {}) {
      let { childMenus, url } = navInfo;
      let newUrl = null;
      this.childMenus = childMenus || [];
      if (this.updateUrl) {
        // 如果需要更新当前路由信息
        const urlResult = findUrl(navInfo);
        url = urlResult?.url;
        if (!url) {
          this.$toast({
            type: 'warning',
            duration: 2000,
            content: `当前菜单【${navInfo.name}】或者子菜单未配置有效的路径信息`
          });
          return;
        }

        jumpUrl(
          url,
          urlResult.target,
          () => {
            newUrl = url;
          },
          () => {
            // 处理点击导航新窗口打开 匹配不到的情况
            newUrl = navInfo?.url;
          }
        );
        $ctx.$router.push(newUrl);
        this.createNavLinks(newUrl);
      }
    },
    // 加载子系统视图
    loadPagesystem(navInfo = {}) {
      let { url, childMenus } = navInfo;
      let newUrl = null;
      this.subSystem = navInfo;
      if (this.updateUrl) {
        const urlResult = findUrl(navInfo);
        url = urlResult?.url;
        if (!url) {
          this.$toast({
            type: 'warning',
            duration: 2000,
            content: `当前菜单【${navInfo.name}】或者子菜单未配置有效的路径信息`
          });
          return;
        }

        jumpUrl(
          url,
          urlResult.target,
          () => {
            newUrl = url;
          },
          () => {
            // 处理点击导航子菜单新窗口打开 匹配不到的情况
            newUrl = navInfo?.url;
          }
        );
        $ctx.$router.push(newUrl);
        this.createNavLinks(newUrl);
        this.updateUrl = false;
      }
      const targetNav = childMenus.find((item) => this.navLinks.includes(item.id + ''));
      this.loadPagemodule(targetNav);
    },
    forceUpdateUrl(cb) {
      this.updateUrl = true;
      cb && cb();
    },
    stopUpdateUrl(cb) {
      this.updateUrl = false;
      cb && cb();
    },
    linkviewReset() {
      this.navLinks = [];
      this.subSystem = null;
    },
    clearSubSystem() {
      this.subSystem = null;
      this.navLinks = [];
      this.childMenus = [];
    },
    // 获取当前路径的
    getActiveLink(url) {
      const obj = this.navMap;
      const result = Object.keys(obj)
        .filter((key) => getPath(obj[key]?.url) == url)
        .sort((pre, next) => obj[next].level - obj[pre].level);
      return result;
    },
    // 当页面处于正在编辑的时候，阻断跳转 这里只限制了点击头部导航和左侧菜单的事情，其余的通过路由拦截器来统一拦截
    stopGoNext(cb) {
      const { meta } = $ctx?.$route || {};
      const IS_EDITING = SessionStorage.get('IS_EDITING');
      if (meta?.stopGoNext && IS_EDITING == 1) {
        new Vue().$dialog({
          title: '温馨提示',
          type: 'warning',
          content: '离开会丢失未保存的修改，确定离开吗？',
          onConfirm() {
            SessionStorage.set('IS_EDITING', 0);
            cb && cb();
          }
        });
      } else {
        cb && cb();
      }
    },
    // 重置 nav name 长度
    resetNavNameLength(navlength) {
      this.navlength = navlength || 4;
    }
  }
});

export default NavCenter;
