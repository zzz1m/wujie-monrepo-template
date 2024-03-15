<script setup lang="ts">
import { useNavLayout, MAX_SUB_NAV_NUM, findUrl } from '@/composables/nav';
import errorImg from '@/assets/images/img-error-light.png';
const { isLargeScreen } = useNavLayout();

const props = defineProps<{
  subSystem: NavInfo | undefined | null;
  navLinks: string[];
  onClickNav: (nav: NavInfo, evt: MouseEvent) => Promise<void>;
  navTextLength: number;
  stopGoNext: (cb: VoidCallBack) => void;
  clearSubSystem: () => void;
}>();

const subMenus = computed(() => props.subSystem?.childMenus || []);
const subnavMoreList = computed(() => subMenus.value.slice(MAX_SUB_NAV_NUM));
const subNavList = computed(() => subMenus.value.slice(0, MAX_SUB_NAV_NUM));

const router = useRouter();
function handleBack() {
  props.stopGoNext(() => {
    router.push('/dashboard/pages/home');
    props.clearSubSystem();
  });
}
</script>

<template>
  <div class="flex items-center">
    <!-- 子系统名 -->
    <div class="system-name" v-if="subSystem">
      <span class="btn-backhome" @click="handleBack">
        <svg width="20px" height="20px" viewBox="0 0 20 20">
          <path
            d="M11.8577744,14.824391 L7.25450344,10.4245273 C7.00928171,10.1904966 7.00928171,9.81047476 7.25450344,9.57608878 L11.8577744,5.17578949 C12.1030681,4.9414035 12.5002149,4.9414035 12.7454966,5.17578949 C12.9907183,5.40982016 12.9907183,5.78984205 12.7454966,6.02422803 L8.58624852,10.0001361 L12.7454966,13.9755169 C12.9907183,14.2099717 12.9907183,14.5895695 12.7454966,14.8240242 C12.6232754,14.9415783 12.4625244,15 12.3018573,15 C12.1411303,15 11.9804513,14.9415783 11.8577744,14.824391 Z"
            id="路径"
            fill="#FFFFFF"
          ></path>
        </svg>
      </span>
      <!-- <img v-loading="{ src: subSystem.icon, err_img: errorImg }" class="subsystem-thumb" /> -->
      <img :src="subSystem.icon" class="subsystem-thumb" />
      <b-tooltip
        v-if="subSystem.name.length > 10"
        :content="subSystem.name"
        :popup-offset="16"
        placement="bottom"
      >
        <span>{{ subSystem.name.slice(0, 10) + '...' }}</span>
      </b-tooltip>
      <span v-else>{{ subSystem.name }}</span>
    </div>
    <!-- 子系统导航 -->
    <ul v-if="subNavList.length > 0" class="app-nav-list">
      <li v-for="nav in subNavList" :key="nav.id">
        <a
          :href="findUrl(nav).url"
          :class="[
            'nav-item',
            navLinks.includes(nav.id + '') ? 'active' : '',
            isLargeScreen ? 'large' : '',
          ]"
          @click="onClickNav(nav, $event)"
        >
          <b-tooltip
            v-if="nav.name.length > navTextLength"
            :content="nav.name"
            :popup-offset="16"
            position="bottom"
          >
            <span class="nav-text">{{
              nav.name.slice(0, navTextLength) + '...'
            }}</span>
          </b-tooltip>
          <span v-else class="nav-text">{{ nav.name }}</span>
        </a>
      </li>
      <app-nav-submore
        v-if="subnavMoreList.length > 0"
        v-bind="{
          moreNav: subnavMoreList,
        }"
        @clickNavMore="onClickNav"
      />
    </ul>
  </div>
</template>
