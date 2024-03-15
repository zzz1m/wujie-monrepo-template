<script lang="ts" setup>
import { useNav, findUrl } from '@/composables/nav';

const {
  navInited,
  navLinks,
  navList,
  navTextLength,
  isLargeScreen,
  gotoHomePage,
  isHomePage,
  onClickNav,
  onClickNavSub,
  mainNavList,
  navMoreList,
  subSystem,
  stopGoNext,
  clearSubSystem,
  sortAllList,
  resortNavlist,
} = useNav();

const getTotalNavList = () => navList.value;
</script>

<template>
  <div id="app-nav">
    <template v-if="!subSystem">
      <span title="BZL Noah" class="app-logo" @click="gotoHomePage">
        <img
          class="mt-[10px] h-6"
          src="https://img.bosszhipin.com/static/file/2022/kbn4u4wqhk1665391382662.png"
        />
      </span>
      <ul class="app-nav-list" v-if="navInited && navList.length">
        <li
          :class="['nav-item', isHomePage ? 'active' : '']"
          @click="gotoHomePage"
        >
          工作台
        </li>
        <li v-for="(nav, idx) in mainNavList" :key="nav.id">
          <a
            :class="[
              'nav-item',
              navLinks.includes(nav.id + '') ? 'active' : '',
              isLargeScreen ? 'large' : '',
            ]"
            :href="findUrl(nav).url"
            @click="onClickNav(nav, $event, idx)"
          >
            <b-tooltip
              v-if="nav.name.length > navTextLength"
              :content="nav.name"
              :popup-offset="16"
              position="bottom"
            >
              <span :class="['nav-text', nav.isNew ? 'new' : '']">{{
                nav.name.slice(0, navTextLength) + '...'
              }}</span>
            </b-tooltip>
            <span v-else :class="['nav-text', nav.isNew ? 'new' : '']">{{
              nav.name
            }}</span>
          </a>
        </li>

        <app-nav-more
          v-if="navMoreList.length"
          v-bind="{
            moreNav: navMoreList,
            sortAllList,
            totalNav: getTotalNavList,
          }"
          @click-nav-more="onClickNav"
          @update-sort="resortNavlist"
        />
      </ul>
    </template>
    <app-nav-subsystem
      v-bind="{
        subSystem,
        navLinks,
        onClickNav: onClickNavSub,
        navTextLength,
        stopGoNext,
        clearSubSystem,
      }"
    />
  </div>
</template>
