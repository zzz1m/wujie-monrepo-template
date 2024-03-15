<template>
  <div id="wrap">
    <div id="main" class="page-main">
      <div id="container">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
