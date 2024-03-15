<script setup lang="ts">
import vLoading from '@/directives/loading';
import { useNav } from '@/composables/nav';
import errorImg from '@/assets/images/img-error-light.png';

const { navLinks, stopGoNext, loadPagelink } = useNav();
const accordion = true;

const onclickMenu = (menuinfo: NavInfo, evt: MouseEvent) => {
  if (evt && evt.metaKey) return; // 新tab打开, 阻止js逻辑执行
  evt.preventDefault();

  stopGoNext(() => {
    loadPagelink(menuinfo);
  });
};

defineProps<{
  list: NavInfo[];
}>();

// eslint-disabled
const toggleMenu = (ev: MouseEvent) => {
  const MENU_TOOLS_CLASS = 'abcdtoggle';
  const $icons = document.querySelectorAll('.menu-icon-tools');
  [].forEach.call($icons, function (item) {
    // @ts-ignore
    item.classList.remove(MENU_TOOLS_CLASS);
  });
  // @ts-ignore
  const domList = ev.path || getPath(ev); // 处理兼容性问题
  const $menuGroup = [].find.call(domList, function (dom) {
    // @ts-ignore
    return dom.classList.contains('menu-group');
  });
  const $menuItem = [].find.call(domList, function (dom) {
    // @ts-ignore
    return dom.classList.contains('menu-item');
  });
  // @ts-ignore
  const $submenu = $menuItem.querySelector('.submenu-list');
  const submenuHeight = $submenu.offsetHeight;
  // @ts-ignore
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

  if (accordion) {
    const $allSubmenulist = document.querySelectorAll('.submenu-list');
    [].forEach.call($allSubmenulist, function (item) {
      if (item !== $submenu) {
        // @ts-ignore
        const $parentNode = item.parentNode;
        // @ts-ignore
        item.style.maxHeight = 0;
        if ($parentNode.classList.contains('active')) {
          $parentNode
            .querySelector('.menu-icon-tools')
            .classList.add(MENU_TOOLS_CLASS);
          $parentNode
            .querySelector('.menu-icon-tools')
            .classList.add('noabcrotate');
        } else {
          $parentNode
            .querySelector('.menu-icon-tools')
            .classList.remove(MENU_TOOLS_CLASS);
          $parentNode
            .querySelector('.menu-icon-tools')
            .classList.add('noabcrotate');
        }
      }
    });
  }
};

function getPath(e: MouseEvent) {
  return (
    // @ts-ignore
    e.path ||
    (e.composedPath && e.composedPath()) ||
    (function () {
      try {
        let t = e.target,
          r = [t];
        // @ts-ignore
        if (null === t || null === t.parentElement) return [];
        // @ts-ignore
        for (; null !== t.parentElement; ) (t = t.parentElement), r.unshift(t);
        return r;
      } catch (e) {
        return [];
      }
    })()
  );
}
</script>

<template>
  <ul class="menu-list">
    <li
      class="menu-item"
      v-for="menu in list"
      :key="menu.id"
      :class="{ active: navLinks.includes(menu.id + '') }"
    >
      <div
        v-if="menu.childMenus && menu.childMenus.length > 0"
        class="menu-group"
        @click.stop="toggleMenu($event)"
      >
        <img
          v-if="menu.icon && menu.icon.trim()"
          v-loading="{
            src: menu.icon,
            err_img: errorImg,
          }"
          class="menu-group-icon"
        />
        <span class="menu-group-name">{{ menu.name }}</span>

        <icon-outline-arrow-left
          class="menu-icon-tools abcdtoggle"
          v-if="navLinks.includes(menu.id + '')"
        />
        <icon-outline-arrow-down class="menu-icon-tools" v-else />
      </div>

      <a
        v-else
        class="menu-name"
        :href="menu.url"
        @click="onclickMenu(menu, $event)"
      >
        <div>
          {{ menu.name }}
        </div>
      </a>
      <template v-if="menu.childMenus && menu.childMenus.length > 0">
        <div
          class="submenu-list"
          :style="{
            'max-height': navLinks.includes(menu.id + '') ? '1000px' : '0',
          }"
        >
          <menu-list :list="menu.childMenus" />
        </div>
      </template>
    </li>
  </ul>
</template>
