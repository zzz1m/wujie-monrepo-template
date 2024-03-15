<template>
  <li
    class="nav-item nav-more"
    :class="showMoreWindow && 'active'"
    @mouseenter="handlerMouseEnter()"
    @mouseleave="closeGuide"
  >
    <span class="nave-more-text" :class="checkMenuNew && 'new'"
      >更多<i class="ui-icon-menu"></i
    ></span>
    <!-- 更多菜单 -->
    <ul
      v-if="!needSort"
      id="nav-menu-more-list"
      :class="['menu-more-list', 'more-list-anim']"
      :style="{
        display: !showMoreWindow ? 'none' : 'block',
      }"
    >
      <h2 class="nav-more-title">更多导航</h2>
      <b-tooltip
        content="排序"
        effect="dark"
        placement="top"
        popper-class="top-common-tooltip"
      >
        <p class="sort-btn homepage-icon-btn" @click="startSort">
          <svg width="16px" height="16px" viewBox="0 0 16 16">
            <path
              d="M7.96666667,5.3 L7.024,6.24266667 L5.33333333,4.552 L5.33333333,13.3333333 L4,13.3333333 L4,4.552 L2.31,6.24266667 L1.36666667,5.3 L3.95955989,2.70710678 C4.35008418,2.31658249 4.98324916,2.31658249 5.37377345,2.70710678 L7.96666667,5.3 L7.96666667,5.3 Z M10.6262266,13.2928932 L8.03333333,10.7 L8.03333333,10.7 L8.976,9.75733333 L10.6673333,11.448 L10.6666667,2.66666667 L12,2.66666667 L12,11.448 L13.6906667,9.75733333 L14.6333333,10.7 L12.0404401,13.2928932 C11.6499158,13.6834175 11.0167508,13.6834175 10.6262266,13.2928932 Z"
              fill="currentColor"
              fill-rule="nonzero"
            ></path>
          </svg>
        </p>
      </b-tooltip>
      <li v-for="nav in moreNav" :key="nav.id" :click-report="nav.code">
        <a
          class="boss-track"
          :href="findUrl(nav).url"
          @click="onclickNav(nav, $event)"
        >
          <img :src="nav.icon" alt="" />
          <p v-if="nav.isNew" class="new-menu">
            <img alt="" :src="newIconPng" />
          </p>
          <b-tooltip
            v-if="nav.name.length > 8"
            :content="nav.name"
            effect="dark"
            placement="bottom"
            popper-class="menu-more-list-tooltip"
          >
            <span>{{ nav.name }}</span>
          </b-tooltip>
          <span v-else>{{ nav.name }}</span>
        </a>
      </li>
    </ul>
    <app-nav-sort
      v-else
      v-show="showMoreWindow"
      v-bind="{
        endSort,
        navAllList: sortAllList,
        sortCallBack,
      }"
    />
  </li>
</template>

<script setup lang="ts">
import { findUrl, MAX_NAV_NUM } from '@/composables/nav';
import newIconPng from '@/assets/images/homepage/new-icon.png';

const props = defineProps<{
  moreNav: NavInfo[];
  sortAllList: NavInfo[];
}>();

const showMoreWindow = ref(false);
const checkMenuNew = computed(() => props.moreNav.some((item) => item.isNew));

let appearTimer: number;
let disappearTimer: number;
// 鼠标移入
function handlerMouseEnter() {
  clearTimeout(appearTimer);
  clearTimeout(disappearTimer);
  disappearTimer = setTimeout(() => {
    const el = document.getElementById('nav-menu-more-list');
    el && (el.style.display = 'block');
    showMoreWindow.value = true;
  }, 300);
}

const needSort = ref(false);
// 关闭 更多
function closeGuide() {
  clearTimeout(disappearTimer);
  if (needSort.value) return;
  disappearTimer = setTimeout(() => {
    endSort();
  }, 500);
}

// 排序
function startSort() {
  needSort.value = true;
}

// 关闭排序
function endSort() {
  needSort.value = false;
  showMoreWindow.value = false;
}

const emits = defineEmits(['click-nav-more', 'update-sort']);
function onclickNav(navInfo: NavInfo, evt: MouseEvent) {
  showMoreWindow.value = false;
  const el = document.getElementById('nav-menu-more-list');
  el && (el.style.display = 'none');
  emits('click-nav-more', navInfo, evt, MAX_NAV_NUM);
}

function sortCallBack() {
  emits('update-sort');
}

onBeforeUnmount(() => {
  clearTimeout(appearTimer);
  clearTimeout(disappearTimer);
});
</script>
