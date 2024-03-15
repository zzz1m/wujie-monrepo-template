<template>
  <div class="scheduleWarp" :class="{ fixed, showAbove }">
    <div class="schedule" :style="scheduleStyle">
      <div v-for="(item, index) in schedule" :key="index" class="schedule-item">
        <div>
          <div class="schedule-item-taskname">{{ item.taskName }}</div>
          <div>{{ item.assignee }}</div>
          <div>{{ item.approveStatus }}</div>
          <div>{{ item.approveTime && item.approveTime.substring(0, 10) }}</div>
          <div>{{ item.approveTime && item.approveTime.substring(10, 19) }}</div>
          <!-- <div style="word-break:break-all">{{item.comment}}</div> -->
        </div>
        <i class="ti-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    showAbove: {
      type: Boolean,
      default: false
    },
    schedule: Array,
    defalut: {
      type: Array,
      default: (_) => []
    }
  },
  computed: {
    scheduleStyle() {
      const cLengh = (this.schedule || []).length;
      if (!this.fixed || cLengh < 4) {
        return '';
      }
      return `margin-left: -${(cLengh - 3) * 120}px`;
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.schedule {
  position: relative;
  display: flex !important;
  align-items: flex-start;
  padding: 20px;
  z-index: 999;
  border-color: #c7c7c7;
  background: #fff;
  color: #c7c7c7;
  font-size: 14px;
}
.schedule-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 156px;
  &:last-of-type {
    min-width: 90px;
    color: #151b26;
    i {
      display: none;
    }
  }
  &-taskname {
    white-space: nowrap;
  }
}
.schedule-item > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ti-arrow-right {
  margin: 31px 20px;
}

.scheduleWarp {
  z-index: 10000;
  overflow: visible;
  &.fixed {
    width: 0;
    height: 0;
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    .schedule {
      border-radius: 4px;
      box-shadow:
        2px 2px 4px rgba(0, 0, 0, 0.1),
        -2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    &.showAbove {
      align-items: flex-end;
    }
  }
}
</style>
