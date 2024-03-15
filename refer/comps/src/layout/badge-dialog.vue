<template>
  <ui-dialog v-model="showDialog" lock :prevent-confirm="true" prevent-layer :show-footer="false" width="540" wrap-class="page-badge-header-dialog">
    <template v-if="showDialog" slot="content">
      <div class="dialog-badge-img">
        <img v-if="showBadgeObj.source" :draggable="false" :src="require(`@/assets/images/recommend/${showBadgeObj.source}_${showBadgeObj.type}_light.png`)" />
      </div>
      <div class="page-badge-name">
        <h4><svg-icon icon-class="badge-star-left"></svg-icon>恭喜您，您有新的成就已达成<svg-icon icon-class="badge-star-right"></svg-icon></h4>
        <p>CONGRATULATIONS</p>
      </div>
      <div class="badge-btn-new" @click="handleLight">去点亮</div>
    </template>
  </ui-dialog>
</template>

<script>
export default {
  name: 'BadgeDialog',
  data() {
    return {
      showDialog: false,
      showBadgeObj: {}
    };
  },

  created() {},

  methods: {
    handleLight() {
      this.showDialog = false;
      this.$router.push('/dashboard/staff/badge');
    },
    open(showBadgeObj) {
      this.showDialog = true;
      this.showBadgeObj = showBadgeObj;
    }
  }
};
</script>
