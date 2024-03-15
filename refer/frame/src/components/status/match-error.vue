<template>
  <div class="page-tip flex-col">
    <i class="tip-nodata"></i>
    {{ matchErrMsg }}
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';

const { matchErrMsg } = useAppStore();
</script>
