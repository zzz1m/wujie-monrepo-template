// 以下路由为配合新窗口打开时默认占位用
const blackRouteList = [];

// 头部最多展示几个导航
export const MAX_NAV_NUM = 7; // 加上工作台最多展示8个，加上更多是9个
// 展示多少个子导航
export const MAX_SUB_NAV_NUM = 6; // 加上系统名称是7个，加更多是8个

// 白名单code
export const WHITE_CODE_LIST = ['link', 'module', 'system'];

// 生成主导航list
export const getMainNavList = (list = []) => {
  return list.slice(0, MAX_NAV_NUM);
};

export const getPath = (path) => {
  if (typeof path !== 'string') return '';
  return path ? path.split('?')[0] : '';
};

export const formatNumber = (val) => {
  return val < 10 ? `0${val}` : `${val}`;
};

// 导航名字长度重置
export const resetNavLength = () => {
  let length = 2;
  const innerWidth = window.innerWidth;
  switch (true) {
    case innerWidth < 2000:
      length = 7;
      break;
    case innerWidth >= 2000:
      length = 10;
      break;
  }
  return length;
};

// 生成更多导航list
export const getMoreNavList = (list = []) => {
  return list.slice(MAX_NAV_NUM);
};

// 生成菜单map对象
export const createNavMap = (list = [], target) => {
  const result = target || {};
  if (!list || list.length == 0) return {};
  list.forEach((item) => {
    const navId = `${item.id}`;
    if (result[navId]) {
      console.log(`存在重复的菜单id～～${item.id}`);
    } else {
      result[navId] = item;
    }
    if (item.childMenus && item.childMenus.length > 0) createNavMap(item.childMenus, result);
  });
  return result;
};

// 生成路由菜单调用链
export const createNavLinks = (url, navmap, target) => {
  const links = [];
  const matchedNavIds = Object.keys(navmap).filter((key) => getPath(navmap[key]?.url) === url);
  const findLinks = function (navId) {
    links.unshift(navId + '');
    const { parentId } = navmap[navId] || {};
    if (parentId) findLinks(parentId);
  };
  // 当前路径匹配不到任何导航来源信息
  if (matchedNavIds.length < 1) {
    if (target) {
      // 从当前页面的meta信息捕获导航来源
      return createNavLinks(target, navmap);
    }
    return [];
  }
  if (matchedNavIds.length > 1) console.log(`当前路径【${url}】存在于多个菜单中，请确定具体原因`);
  // 从匹配到的目标中，只获取最后一级的nav作为落地路由
  const tartgetKey = matchedNavIds.reduce(function (cur, next) {
    return navmap[cur].level > navmap[next].level ? cur : next;
  });
  if (tartgetKey) {
    findLinks(tartgetKey);
  }
  return links;
};

// 定位默认跳转的路径信息
/*
 * 1、优先找自己配置的路由
 * 2、第一个模块配置的路由
 * 3、以此递归上述过程
 */
export const findUrl = (navInfo = {}) => {
  const { childMenus, url, target } = navInfo;
  if ((!url || blackRouteList.includes(url)) && childMenus && childMenus.length > 0) {
    return findUrl(childMenus[0]);
  }
  return {
    url,
    target
  };
};

// 定位跳转地址
export const jumpUrl = (url, target, cb, blankFn) => {
  if (target === 'blank') {
    // 新窗口打开
    url = url.startsWith('/dashboard') ? `${window.location.origin}${url}` : url;
    window.open(url);
    blankFn && blankFn();
  } else {
    // 当前窗口打开 之前是这个 if( target === 'self' )
    url.startsWith('/dashboard') ? cb && cb() : (window.location.href = url);
  }
};

export const updatePageTitle = (pageTitle, documentTitle) => {
  const $Title = document.querySelector('.page-history-title');
  document.title = documentTitle;
  $Title && ($Title.textContent = pageTitle);
};

// 更新地址栏title
export const refreshTitle = (navlinks, navmap, route) => {
  let titleArr = ['BZL Noah'];
  if (navlinks.length > 0) {
    navlinks.forEach((navid) => {
      titleArr.push(navmap[navid].name);
    });
  }
  if (route?.meta?.target) titleArr.push(route.meta.title || route.name);
  const title = titleArr.join('-');
  updatePageTitle(route?.meta?.title || route.name, title);
};

// 组织a标签的默认行为
export const preventDefaultAction = (ev) => {
  if (!ev) return;
  if (ev.preventDefault) {
    ev.preventDefault();
  } else {
    window.event.returnValue == false;
  }
};
