<template>
  <template v-if="appStore.matchSubSystem">
    <WujieVue
      v-bind="{
        ...WujieVueAttrs,
        ...appStore.matchSubSystem,
      }"
    ></WujieVue>
    <status-match-error v-if="appStore.matchErrMsg" />
    <status-loading v-else-if="!appStore.matchActived"></status-loading>
  </template>
  <status-match-error v-else />
</template>

<script setup lang="ts">
import { WujieVueAttrs } from './wujie/settings';
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
</script>
