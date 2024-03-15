<template>
  <ul class="menu-list">
    <template v-if="menuList.length > 0">
      <li v-for="menu in menuList" :key="menu.id" :class="{ 'menu-item': true, active: navLinks.includes(menu.id + '') }">
        <!-- 菜单组 -->
        <div v-if="menu.childMenus && menu.childMenus.length > 0" class="menu-group" @click.stop="toggleMenu($event, navLinks.includes(menu.id + ''))">
          <img
            v-if="menu.icon && menu.icon.trim()"
            v-loading="{
              src: menu.icon,
              err_img: errorImg
            }"
            class="menu-group-icon"
          />
          <span class="menu-group-name">{{ menu.name }}</span>
          <svg-icon
            :key="navLinks.includes(menu.id + '') ? 'outline-arrow-left-active' : 'outline-arrow-down'"
            class="menu-icon-tools"
            :class="{ abcrotate: navLinks.includes(menu.id + '') }"
            :icon-class="navLinks.includes(menu.id + '') ? 'outline-arrow-left-active' : 'outline-arrow-down'"
            :style="{ color: navLinks.includes(menu.id + '') ? '#00BEBD' : 'rgb(138, 142, 154)' }"
            @click.native="() => {}"
          ></svg-icon>
        </div>
        <!-- 菜单项 -->
        <a v-else class="menu-name" :href="menu.url" @click="onclickMenu(menu, $event)">
          <div>
            <img
              v-if="menu.icon && menu.icon.trim()"
              v-loading="{
                src: menu.icon,
                err_img: errorImg
              }"
              class="menu-item-icon"
            />{{ menu.name }}
          </div>
        </a>

        <template v-if="menu.childMenus && menu.childMenus.length > 0">
          <div class="submenu-list" :style="{ 'max-height': navLinks.includes(menu.id + '') ? '1000px' : '0' }">
            <menulist :menu-list="menu.childMenus" />
          </div>
        </template>
      </li>
    </template>
  </ul>
</template>

<script>
const getMenulistHeight = function (total) {
  const menuItem = document.querySelector('.submenu-list .menu-item');
  const cellHeight = menuItem.offsetHeight;
  return `${total * cellHeight}px`;
};
const errorImg = import('@/assets/images/common/img-error-gray.png');

import NAV from './common/nav-center';
import { preventDefaultAction } from './common/nav-tools';
export default {
  name: 'Menulist',
  props: {
    menuList: {
      type: Array,
      validator(value) {
        return Array.isArray(value);
      },
      default: () => []
    },
    accordion: {
      // 是否开启手风琴
      type: Boolean,
      default: true
    }
  },
  computed: {
    navLinks() {
      return NAV.navLinks || [];
    }
  },
  data() {
    return {
      errorImg
    };
  },
  methods: {
    onclickMenu(menuinfo, ev) {
      if (ev && ev.metaKey) return; // 新tab打开, 阻止js逻辑执行
      preventDefaultAction(ev); // 如果没有按 meta 键
      NAV.stopGoNext(() => {
        NAV.loadPagelink(menuinfo);
      });
    },
    getPath(e) {
      return (
        e.path ||
        (e.composedPath && e.composedPath()) ||
        (function () {
          try {
            let t = e.target,
              r = [t];
            if (null === t || null === t.parentElement) return [];
            for (; null !== t.parentElement; ) (t = t.parentElement), r.unshift(t);
            return r;
          } catch (e) {
            return [];
          }
        })()
      );
    },
    toggleMenu(ev, isActive) {
      const MENU_TOOLS_CLASS = 'abcdtoggle';
      const $icons = document.querySelectorAll('.menu-icon-tools');
      [].forEach.call($icons, function (item, idx) {
        item.classList.remove(MENU_TOOLS_CLASS);
      });
      const domList = ev.path || this.getPath(ev); // 处理兼容性问题
      const $menuGroup = [].find.call(domList, function (dom) {
        return dom.classList.contains('menu-group');
      });
      const $menuItem = [].find.call(domList, function (dom) {
        return dom.classList.contains('menu-item');
      });
      const $submenu = $menuItem.querySelector('.submenu-list');
      const submenuHeight = $submenu.offsetHeight;
      const $menutools = $menuGroup.querySelector('.menu-icon-tools');
      // 处理箭头
      if (submenuHeight == 0) {
        $menutools.classList.add(MENU_TOOLS_CLASS);
        $menutools.classList.remove('noabcrotate');
      } else {
        $menutools.classList.remove(MENU_TOOLS_CLASS);
        $menutools.classList.add('noabcrotate');
      }
      // 处理子菜单
      $submenu.style.maxHeight = submenuHeight > 0 ? 0 : '1000px';

      if (this.accordion) {
        const $allSubmenulist = document.querySelectorAll('.submenu-list');
        [].forEach.call($allSubmenulist, function (item, idx) {
          if (item !== $submenu) {
            const $parentNode = item.parentNode;
            item.style.maxHeight = 0;
            if ($parentNode.classList.contains('active')) {
              $parentNode.querySelector('.menu-icon-tools').classList.add(MENU_TOOLS_CLASS);
              $parentNode.querySelector('.menu-icon-tools').classList.add('noabcrotate');
            } else {
              $parentNode.querySelector('.menu-icon-tools').classList.remove(MENU_TOOLS_CLASS);
              $parentNode.querySelector('.menu-icon-tools').classList.add('noabcrotate');
            }
          }
        });
      }
    }
  }
};
</script>
<style>
.abcrotate {
  transform: rotateZ(180deg) !important;
}
.abcdtoggle {
  transform: rotateZ(180deg) !important;
}
.abcrotate.noabcrotate {
  transform: rotateZ(270deg) !important;
}
</style>
