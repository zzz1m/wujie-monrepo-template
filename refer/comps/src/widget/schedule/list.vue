<template>
  <div class="scheduleWarp" :class="{ fixed, showAbove }">
    <div class="schedule" :style="scheduleStyle">
      <div
        v-for="(item, index) in schedule"
        :key="index"
        class="schedule-item"
        :class="{
          preview: isAudit ? item.currentAudit === 2 : !item.processInstanceId,
          isCurrent: isAudit ? item.currentAudit === 1 : item.isCurrent === 1 && !isOver,
          isAudited: isAudit ? item.currentAudit === 0 : (item.isCurrent === 0 && item.processInstanceId) || isOver
        }"
      >
        <div class="node">
          <div class="deco"></div>
          <div class="name">{{ item.taskName }}</div>
          <div class="time">{{ item.approveTime }}</div>
        </div>
        <div class="name-info">
          <span>{{ item.assignee }}</span>
          <span v-if="item.approveStatus"> · {{ item.approveStatus }}</span>
        </div>
      </div>
      <div v-if="schedule && schedule.length > 1" class="indicator-line"></div>
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
    isOver: {
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
    isAudit() {
      return this.schedule?.[0].hasOwnProperty('currentAudit');
    },
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
  flex-direction: column;
  align-items: flex-start;
  z-index: 999;
  color: #1d2129;
  font-size: 14px;
  line-height: 22px;
  .indicator-line {
    position: absolute;
    top: 10px;
    left: 6px;
    bottom: 50px;
    width: 1px;
    background: #f2f3f5;
    z-index: 0;
  }
}

.schedule-item {
  width: 100%;
  padding-left: 28px;
  position: relative;
  z-index: 1;

  &.preview {
    opacity: 0.6;
    .deco {
      background: #4c4f4f3f !important;
      &::before {
        background: #363838 !important;
      }
    }
  }

  &.isCurrent {
    .deco {
      background: #ffa33a42 !important;
      &::before {
        background: #ffa43a !important;
      }
    }
  }

  &.isAudited {
    .deco {
      background: #41b3ff4b !important;
      &::before {
        background: #41b4ff !important;
      }
    }
  }

  & + .schedule-item {
    .node {
      margin-top: 20px;
    }
  }
  .node {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 6px;
    .time {
      font-size: 13px;
      font-weight: 400;
      color: #86909c;
      line-height: 18px;
      margin-left: auto;
      padding-left: 12px;
    }
    .deco {
      position: absolute;
      width: 13px;
      height: 13px;
      background: #00bebe3f;
      border-radius: 50%;
      left: -28px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 4px #ffffff;
      &::before {
        content: '';
        width: 7px;
        height: 7px;
        background: #00bebd;
        border-radius: 50%;
      }
    }
  }
}
</style>
