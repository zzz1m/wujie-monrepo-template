<template>
  <li
    class="nav-item nav-more subnav-more nav-more-btn"
    :class="showMoreWindow && 'show-more-window'"
    @mouseenter="handlerMouseEnter()"
    @mouseleave="closeGuide"
  >
    更多<i class="ui-icon-menu"></i>
    <!-- 更多菜单 -->
    <ul
      v-show="showMoreWindow"
      class="menu-more-list"
      :class="showMoreWindow && 'more-list-anim'"
    >
      <li v-for="nav in moreNav" :key="nav.id">
        <a :href="findUrl(nav).url" @click="onclickNav(nav, $event)">
          <b-tooltip
            v-if="nav.name.length > 10"
            :content="nav.name"
            placement="bottom"
            popper-class="menu-more-list-tooltip"
          >
            <span>{{ nav.name.slice(0, 10) + '...' }}</span>
          </b-tooltip>
          <span v-else>{{ nav.name }}</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { findUrl } from '@/composables/nav';

defineProps<{
  moreNav: NavInfo[];
}>();

const emits = defineEmits(['clickNavMore']);

const showMoreWindow = ref(false);

let appearTimer: number;
let disappearTimer: number;

function handlerMouseEnter() {
  clearTimeout(appearTimer);
  clearTimeout(disappearTimer);
  disappearTimer = setTimeout(() => {
    showMoreWindow.value = true;
  }, 300);
}
function closeGuide() {
  clearTimeout(disappearTimer);
  disappearTimer = setTimeout(() => {
    showMoreWindow.value = false;
  }, 500);
}
function onclickNav(navInfo: NavInfo, ev: MouseEvent) {
  showMoreWindow.value = false;
  emits('clickNavMore', navInfo, ev);
}
</script>

<style scoped>
.nav-more {
  > i {
    border-radius: 2px;
    margin-left: 3px;
  }
}

.menu-more-list-tooltip {
  z-index: 10000 !important;
}
</style>
<style>
.menu-more-list-tooltip {
  z-index: 10000 !important;
}
</style>
