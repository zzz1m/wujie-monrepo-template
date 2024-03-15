<script setup lang="ts">
import { useNav } from '@/composables/nav';
import { useLayoutStore } from '@/store/layout';

const layoutStore = useLayoutStore();
const { showSide, isSideOpen, updateSideOpenState } = toRefs(layoutStore);

const { init, childMenus } = useNav();
init();
</script>

<template>
  <app-header />
  <main id="app-main">
    <div
      v-if="showSide && childMenus && childMenus.length > 0"
      class="app-side"
      :class="{
        collapsed: !isSideOpen,
      }"
    >
      <div class="side-scrollbar">
        <div class="side-scrollbar-wrap">
          <div class="side-scrollbar-view">
            <app-menu-list :list="childMenus" />
          </div>
        </div>
      </div>
      <div
        class="btn-toggle"
        :class="{ expanded: !isSideOpen }"
        @click="updateSideOpenState()"
      >
        <i class="ui-icon-arrow-left"></i>
      </div>
    </div>

    <slot />
  </main>
</template>
