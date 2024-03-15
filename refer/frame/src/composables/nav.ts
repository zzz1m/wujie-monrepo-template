import { fetch } from '@/utils/fetch';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

// 头部最多展示几个导航
export const MAX_NAV_NUM = 7; // 加上工作台最多展示8个，加上更多是9个
// 展示多少个子导航
export const MAX_SUB_NAV_NUM = 6; // 加上系统名称是7个，加更多是8个

// 白名单code
const WHITE_CODE_LIST = ['link', 'module', 'system'];

const navList = ref<NavInfo[]>([]);
const sortAllList = ref<NavInfo[]>([]);
// 左侧菜单
const childMenus = ref<NavInfo[] | null>([]);
const subSystem = ref<NavInfo | null>(); // 子系统

const getPath = (path: string | null) => (path ? path.split('?')[0] : '');

async function updateNavNew(nav: NavInfo) {
  const { id, sortOrder } = nav;
  await fetch('/api/homepage/v2/menu/updateNew.json', {
    method: 'post',
    body: JSON.stringify({ id, sortOrder }),
  });
}

/*
 * 1、优先找自己配置的路由
 * 2、第一个模块配置的路由
 * 3、以此递归上述过程
 */
const blackRouteList: string[] = [];
type UrlResult = Pick<NavInfo, 'url' | 'target'>;

export const findUrl = (navInfo: NavInfo): UrlResult => {
  const { childMenus, url, target } = navInfo;
  if (
    (!url || blackRouteList.includes(url)) &&
    childMenus &&
    childMenus.length > 0
  ) {
    return findUrl(childMenus[0]);
  }
  return {
    url,
    target,
  };
};

const calcNavlist = function (arr: NavInfo[]) {
  return arr.map((item, idx) => {
    item._idx = idx;
    return item;
  });
};

const navLinks = ref<string[]>([]);
/**
 * 生成菜单映射
 */
const navMap = ref<NavMap>({});

function NAV() {
  const route = useRoute();
  const router = useRouter();

  const updateUrl = ref(false);
  function forceUpdateUrl(cb: VoidCallBack) {
    updateUrl.value = true;
    cb && cb();
  }
  function stopUpdateUrl(cb: VoidCallBack) {
    updateUrl.value = false;
    cb && cb();
  }

  function createNavMap(list: NavInfo[]) {
    navMap.value = Object.freeze(_createNavMap(list));
  }
  /**
   * 生成路由的菜单依赖信息，从前向后逐级递减
   */
  // 用于缓存路由的link信息，避免重复计算
  const cacheUrlLinks: Record<
    string,
    { target?: LinkTarget | string; links: string[] }
  > = {};

  function createNavLinks(
    url: string,
    target?: LinkTarget | string,
    cb?: () => void,
  ) {
    url = getPath(url);
    let urlLinks = null;
    const cacheUrlInfo = cacheUrlLinks[url]; // { links, target } 记录关联的路由路径 和 目标来源
    // 没有缓存记录 && 当前目标来源从来没有被匹配过
    if (!cacheUrlInfo || target != cacheUrlInfo.target) {
      const links = _createNavLinks(url, navMap.value, target);
      cacheUrlLinks[url] = {
        target,
        links,
      };
      urlLinks = links;
    } else {
      urlLinks = cacheUrlInfo.links || [];
    }
    navLinks.value = urlLinks;
    cb && cb();
  }

  function clearSubSystem() {
    navLinks.value = [];
    childMenus.value = [];
    subSystem.value = null;
  }

  // 当页面处于正在编辑的时候，阻断跳转 这里只限制了点击头部导航和左侧菜单的事情，其余的通过路由拦截器来统一拦截
  function stopGoNext(cb: VoidCallBack) {
    // const { meta } = route;
    // const IS_EDITING = SessionStorage.get('IS_EDITING');
    // if (meta?.stopGoNext && IS_EDITING == 1) {
    //     new Vue().$dialog({
    //         title: '温馨提示',
    //         type: 'warning',
    //         content: '离开会丢失未保存的修改，确定离开吗？',
    //         onConfirm() {
    //             SessionStorage.set('IS_EDITING', 0);
    //             cb && cb();
    //         }
    //     });
    // } else {
    //     cb && cb();
    // }

    cb && cb();
  }

  const loadPage = {
    link: loadPagelink,
    module: loadPagemodule,
    system: loadPagesystem,
  };
  // 加载子系统视图
  function loadPagemodule(
    nav: NavInfo,
    targetUrl?: string,
    hasTargetUrl?: boolean,
  ) {
    let { url } = nav;
    const { childMenus: _childMenus } = nav;

    childMenus.value = _childMenus || [];
    if (updateUrl.value) {
      // 如果需要更新当前路由信息
      const urlResult = findUrl(nav);
      url = urlResult?.url;
      if (!url) {
        // this.$toast({
        //     type: 'warning',
        //     duration: 2000,
        //     content: `当前菜单【${nav.name}】或者子菜单未配置有效的路径信息`
        // });
        console.error(`当前菜单【${nav.name}】或者子菜单未配置有效的路径信息`);
        return;
      }

      let newUrl = '';
      jumpUrl(
        url,
        urlResult.target,
        () => {
          newUrl = url;
        },
        () => {
          // 处理点击导航新窗口打开 匹配不到的情况
          newUrl = nav?.url;
        },
      );
      router.push(newUrl);
      createNavLinks(newUrl);
    }
  }
  // 加载子菜单视图
  function loadPagesystem(
    nav: NavInfo,
    targetUrl?: string,
    hasTargetUrl?: boolean,
  ) {
    let { url } = nav;
    const { childMenus } = nav;
    let newUrl = '';
    subSystem.value = nav;
    if (updateUrl.value) {
      const urlResult = findUrl(nav);
      url = urlResult?.url;
      if (!url) {
        // this.$toast({
        //     type: 'warning',
        //     duration: 2000,
        //     content: `当前菜单【${nav.name}】或者子菜单未配置有效的路径信息`
        // });
        console.error(`当前菜单【${nav.name}】或者子菜单未配置有效的路径信息`);
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
          newUrl = nav?.url;
        },
      );
      router.push(newUrl);
      createNavLinks(newUrl);
      updateUrl.value = false;
    }
    if (childMenus) {
      const targetNav = childMenus.find((item) =>
        navLinks.value.includes(item.id + ''),
      );
      targetNav && loadPagemodule(targetNav);
    }
  }
  // 加载link视图
  function loadPagelink(
    nav: NavInfo,
    targetUrl?: string,
    hasTargetUrl?: boolean,
  ) {
    let { url } = nav;
    const { target } = nav;
    url = targetUrl || url;
    // 如果不需要更新路由 或者 路由不存在
    if (!url) {
      // this.$toast({
      //     type: 'warning',
      //     duration: 2000,
      //     content: '缺少必要的跳转地址信息！'
      // });
      console.error('缺少必要的跳转地址信息');
      return;
    }
    jumpUrl(url, target, () => {
      if (!hasTargetUrl) {
        // 当配置有targeturl的时候，不需要再更新navlink信息
        createNavLinks(url);
      }
      router.push(url);
    });
  }

  /**
   * 导航切换后，页面渲染策略
   */
  function renderPageview(
    navInfo: NavInfo,
    showSubSystem?: boolean,
    targetUrl?: string,
    hasTargetUrl?: boolean,
  ) {
    const code = navInfo.code;
    if (!code || !WHITE_CODE_LIST.includes(code)) {
      // this.$toast({
      //     type: 'warning',
      //     duration: 2000,
      //     content: `当前菜单【${navInfo.name}】未配置code或者code无效`
      // });
      console.error(`当前菜单【${navInfo.name}】未配置code或者code无效`);
      return;
    }
    if (updateUrl.value) {
      childMenus.value = [];
    }
    // 需要特殊保留子系统的时候
    if (!showSubSystem) subSystem.value = null;

    loadPage[code](navInfo, targetUrl, hasTargetUrl);
  }

  function getActiveLink(url: string) {
    const obj = navMap.value;
    const result = Object.keys(obj)
      .filter((key) => getPath(obj[key]?.url) == url)
      .sort((pre, next) => obj[next].level - obj[pre].level);
    return result;
  }

  return {
    subSystem,
    updateUrl,
    navLinks,
    navMap,
    childMenus,
    forceUpdateUrl,
    stopUpdateUrl,
    createNavMap,
    createNavLinks,
    renderPageview,
    clearSubSystem,
    stopGoNext,
    loadPagelink,
    getActiveLink,
  };
}

const navInited = ref(false);
export function useNav() {
  const route = useRoute();
  const router = useRouter();

  const {
    subSystem,
    // navLinks,
    navMap,
    // childMenus,
    forceUpdateUrl,
    renderPageview,
    stopUpdateUrl,
    createNavMap,
    createNavLinks,
    clearSubSystem,
    stopGoNext,
    loadPagelink,
    getActiveLink,
  } = NAV();

  /**
   * 获取数据
   */
  const getNavList = async (cb?: () => void) => {
    const { success, root } = await fetch('/api/homepage/v2/menu/my.json');
    if (success && root) {
      const list = (root as NavInfo[]) || [];
      navList.value = calcNavlist(list);
      sortAllList.value = JSON.parse(JSON.stringify(list));
      cb && cb();
    }
  };
  const init = () => {
    getNavList(() => {
      createNavMap(navList.value);
      gotoTargetUrl(route);
      navInited.value = true;
    });
  };

  /**
   * 跳转
   */

  function gotoTargetUrl(routerInfo: typeof route) {
    /**
     * this.$emit('on-route-change', routerInfo);
     * TODO 看是否需要调用子应用的对应方法
     */
    stopUpdateUrl(() => {
      initNavBar(routerInfo);
    });
  }

  /**
   * 初始化导航栏
   */
  function initNavBar(routeObj: typeof route) {
    const { path, meta, fullPath, query, name } = routeObj;
    const fromPath = query.target
      ? decodeURIComponent(query.target as string)
      : (meta.target as string) || '';
    const target = fromPath.split('?')[0] || '';

    createNavLinks(path, target, () => {
      if (navLinks.value.length > 0) {
        const navInfo = navMap.value[navLinks.value[0]];
        const isSubsystem = navInfo.code === 'system';
        const hasTargetUrl = Boolean(target);

        // 只要在当前一级对象里匹配不到任何一个子菜单，就把左侧菜单清空
        const isTargetMenus = childMenus.value?.find((item) =>
          navLinks.value.includes(item.id + ''),
        );
        if (!isTargetMenus) childMenus.value = null;

        // 处理菜单排序 - 子系统不参与排序
        if (navInfo.code !== 'system') {
          updateNavSort(navInfo);
        }

        renderPageview(navInfo, isSubsystem, fullPath, hasTargetUrl);

        refreshTitle(navLinks.value, navMap.value, routeObj);
      } else {
        const title = (meta.title || name || '工作台') as string;
        clearSubSystem();
        title && updatePageTitle(title, 'BZL Noah - ' + title);
      }
    });
  }

  /**
   * 更新菜单排序
   */
  const cacheNavInfo: {
    [key: string]: number;
  } = {
    // _idx: -1,
  }; // 缓存上一次点击的导航信息
  function updateNavSort(navInfo: NavInfo) {
    const { id, _idx } = navInfo;
    const curIndex = navList.value.findIndex((nav) => nav.id == id);
    if (curIndex < MAX_NAV_NUM) return;
    if (Object.keys(cacheNavInfo).length > 0) {
      navList.value.splice(curIndex, 1);
      const oldNavInfo = navList.value.splice(MAX_NAV_NUM - 1, 1, navInfo)[0];
      const targetIdx =
        navInfo._idx > cacheNavInfo._idx
          ? cacheNavInfo._idx + 1
          : cacheNavInfo._idx;
      navList.value.splice(targetIdx, 0, oldNavInfo);
    } else {
      navList.value.splice(curIndex, 1);
      navList.value.splice(MAX_NAV_NUM - 1, 0, navInfo);
    }
    cacheNavInfo._idx = _idx;
  }

  /**
   * homepage
   */
  const isHomePage = computed(() => route.path === '/dashboard/pages/home');
  function gotoHomePage() {
    stopGoNext(() => {
      router.push('/dashboard/pages/home');
      clearSubSystem();
    });
  }

  // 点击导航菜单
  const onClickNav = async (nav: NavInfo, evt: MouseEvent, idx: number) => {
    if (evt && evt.metaKey) return;
    evt.preventDefault();

    stopGoNext(async () => {
      if (nav.isNew) {
        nav.isNew = false;
        await updateNavNew(nav);
      }

      // 子系统，新窗口打开，少于8个的不参与排序
      if (nav.code != 'system' && nav.target != 'blank' && idx >= MAX_NAV_NUM) {
        updateNavSort(nav);
      }

      if (nav.target == 'blank') {
        loadPagelink(nav);
      } else {
        forceUpdateUrl(function () {
          renderPageview(nav);
        });
      }
    });
  };

  const onClickNavSub = async (nav: NavInfo, evt: MouseEvent) => {
    if (evt && evt.metaKey) return;
    evt.preventDefault();

    updateSubNavSort(nav);
    stopGoNext(() => {
      forceUpdateUrl(function () {
        renderPageview(nav, true);
      });
    });
  };

  function updateSubNavSort(nav: NavInfo) {
    const { id } = nav;
    const curIndex = subSystem.value?.childMenus?.findIndex(
      (nav) => nav.id == id,
    );
    if (!curIndex || curIndex < MAX_SUB_NAV_NUM) return;
    if (subSystem.value?.childMenus) {
      subSystem.value.childMenus.splice(curIndex, 1);
      subSystem.value.childMenus.splice(MAX_SUB_NAV_NUM - 1, 0, nav);
    }
  }

  async function resortNavlist() {
    await getNavList();
    if (navLinks.value?.length > 0) {
      const navId = navLinks.value[0];
      const curNavObj = navMap.value[`${navId}`];
      updateNavSort(curNavObj);
    }
  }

  watch(
    () => route,
    (newval) => {
      if (!navInited.value) return;
      const { path, meta, query } = newval;
      const fromPath = query.target
        ? decodeURIComponent(query.target as string)
        : ((meta.target || path) as string);
      const targetNavLinks = getActiveLink(fromPath);

      // 如果当前路由已经处于激活之中
      if (navLinks.value.includes(targetNavLinks[0] + '')) {
        // 更新地址栏title
        // this.$emit('on-route-change', newval);
        refreshTitle(navLinks.value, navMap.value, newval);
        return;
      }
      nextTick(() => {
        gotoTargetUrl(newval);
      });
    },
    { deep: true },
  );

  return {
    init,
    navInited,
    navLinks,
    navList,
    sortAllList,
    onClickNav,
    onClickNavSub,
    childMenus,
    isHomePage,
    gotoHomePage,
    mainNavList: computed(() => navList.value.slice(0, MAX_NAV_NUM)),
    navMoreList: computed(() => navList.value.slice(MAX_NAV_NUM)),
    subSystem,
    loadPagelink,
    stopGoNext,
    clearSubSystem,
    resortNavlist,
    ...useNavLayout(),
  };
}

export function useNavLayout() {
  /**
   * 导航栏按钮，文本长度
   */
  const { width } = useWindowSize();
  const navTextLength = computed(() => {
    let length = 2;
    const innerWidth = width.value;
    switch (true) {
      case innerWidth < 2000:
        length = 7;
        break;
      case innerWidth >= 2000:
        length = 10;
        break;
    }
    return length;
  });

  /**
   * 是否为大屏
   */
  const isLargeScreen = computed(() => width.value > 2000);
  return {
    navTextLength,
    isLargeScreen,
  };
}

function _createNavMap(list: NavInfo[], target?: NavMap) {
  const result = target || {};
  if (!list || list.length == 0) return {};
  list.forEach((item) => {
    const navId = `${item.id}`;
    if (result[navId]) {
      console.log(`存在重复的菜单id～～${item.id}`);
    } else {
      result[navId] = item;
    }
    if (item.childMenus && item.childMenus.length > 0)
      _createNavMap(item.childMenus, result);
  });
  return result;
}

// 生成路由菜单调用链
function _createNavLinks(
  url: string,
  navmap: NavMap,
  target?: LinkTarget | string,
): string[] {
  const links: string[] = [];
  const matchedNavIds = Object.keys(navmap).filter(
    (key) => getPath(navmap[key]?.url) === url,
  );
  const findLinks = function (navId: number) {
    links.unshift(navId + '');
    const { parentId } = navmap[navId] || {};
    if (parentId) findLinks(parentId);
  };
  // 当前路径匹配不到任何导航来源信息
  if (matchedNavIds.length < 1) {
    if (target) {
      // 从当前页面的meta信息捕获导航来源
      return _createNavLinks(target, navmap);
    }
    return [];
  }
  if (matchedNavIds.length > 1)
    console.log(`当前路径【${url}】存在于多个菜单中，请确定具体原因`);
  // 从匹配到的目标中，只获取最后一级的nav作为落地路由
  const tartgetKey = matchedNavIds.reduce(function (cur, next) {
    return navmap[cur].level > navmap[next].level ? cur : next;
  });
  if (tartgetKey) {
    findLinks(Number(tartgetKey));
  }
  return links;
}

// 更新地址栏title
function refreshTitle(
  navlinks: string[],
  navmap: NavMap,
  route: RouteLocationNormalizedLoaded,
) {
  const titleArr = ['BZL Noah'];
  if (navlinks.length > 0) {
    navlinks.forEach((navid) => {
      navmap[navid].name && titleArr.push(navmap[navid].name);
    });
  }
  const name = (route?.meta?.title || route.name) as string;
  if (route?.meta?.target) titleArr.push(name);
  const title = titleArr.filter(Boolean).join('-');
  updatePageTitle(name, title);
}

function updatePageTitle(pageTitle: string, documentTitle: string) {
  const $Title = document.querySelector('.page-history-title');
  documentTitle && (document.title = documentTitle);
  pageTitle && $Title && ($Title.textContent = pageTitle);
}

// 定位跳转地址
function jumpUrl(
  url: string,
  target?: LinkTarget,
  cb?: VoidCallBack,
  blankFn?: VoidCallBack,
) {
  if (target === 'blank') {
    // 新窗口打开
    url = url.startsWith('/dashboard')
      ? `${window.location.origin}${url}`
      : url;
    window.open(url);
    blankFn && blankFn();
  } else {
    // 当前窗口打开 之前是这个 if( target === 'self' )
    url.startsWith('/dashboard') ? cb && cb() : (window.location.href = url);
  }
}
