<template>
  <ul class="menu-sort-list" :style="moveStyle">
    <p class="sort-title">
      导航自定义排序<i class="ui-icon-close" @click="exitSort"></i>
    </p>
    <draggable
      v-model="sortList"
      v-bind="dragOption"
      :filter="'.worktable'"
      :move="sortMove"
      @end="moveEnd"
      @start="moveStart"
    >
      <transition-group>
        <li
          v-for="(nav, navIndex) in sortList"
          :key="nav.id"
          :class="navIndex === 0 && 'worktable'"
          @mousedown="isMouseDown = true"
          @mousemove="handlerMove"
          @mouseup="isMouseDown = false"
        >
          <img :src="nav.icon" alt="" />
          <span class="menu-name">{{ nav.name }}</span>
          <p class="worktable-tooltip">不可拖动</p>
        </li>
      </transition-group>
    </draggable>
    <div class="submit-sort">
      <div class="btns">
        <button class="btn cancel-btn" @click="exitSort">取消</button>
        <button class="btn confirm-btn track-full-menu" @click="submit">
          确定
        </button>
      </div>
    </div>
  </ul>
</template>

<script setup lang="ts">
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { fetch } from '@/utils/fetch';
const props = defineProps<{
  navAllList: NavInfo[];
  sortCallBack: () => void;
  endSort: () => void;
}>();

const sortList = ref<Partial<NavInfo>[]>([]);
const moveStyle = ref('cursor: auto;');
const dragOption = {
  forceFallback: 'true',
  chosenClass: 'li-choose',
  ghostClass: 'li-ghost',
  animation: '500',
  class: 'sort-draggable clearfix',
};

const isMouseDown = ref(false);

// created
sortList.value = JSON.parse(JSON.stringify(props.navAllList)) || [];
sortList.value.unshift({
  id: 1234,
  code: 'link',
  icon: 'https://img.bosszhipin.com/static/file/2023/ycm45amehy1694413198581.png',
  name: '工作台',
});

// 工作台不允许替换
function sortMove(e: any) {
  if (e.relatedContext.index === 0) {
    return false;
  }
}
// 开始和结束拖动修改 ul cursor
function moveEnd() {
  moveStyle.value = 'cursor: auto;';
}
async function moveStart() {
  moveStyle.value = 'cursor: move;';
}
// 提交排序
async function submit() {
  let list: number[] = [];
  let data: NavInfo[] = JSON.parse(JSON.stringify(sortList.value));
  try {
    data.shift();
    data.forEach((item) => {
      list.push(item.id);
    });
    const res = await fetch('/api/homepage/v2/menu/sort.json', {
      method: 'post',
      body: JSON.stringify(list),
    });
    if (res.success) {
      sortMenuCallBack();
      exitSort();
      window.NOAH?.$toast('设置成功', 'success');
    }
  } catch (e) {
    console.error(e);
  }
}
// 拖动
function handlerMove() {
  if (isMouseDown.value) {
    document.documentElement.style.overflow = 'hidden';
  }
}
// 结束排序
function exitSort() {
  document.documentElement.removeAttribute('style');
  props.endSort();
}
// 排序回调
function sortMenuCallBack() {
  props.sortCallBack();
}
</script>

<style scoped>
.menu-sort-list {
  width: 644px;
  padding: 20px 20px 6px 20px;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  user-select: none;
  border-radius: 12px;

  .sort-title {
    font-size: 16px;
    font-weight: 500;
    color: #1d2129;
    line-height: 20px;
    text-align: left;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      color: #9ea0a5;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .menu-name {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sort-draggable {
    max-height: calc(100vh - 164px);
    overflow-y: overlay;
    margin-right: -20px;
    padding-right: 20px;
  }

  li {
    width: 140px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    padding: 0 6px;
    border: 1px dashed #c9cdd4;
    border-radius: 8px;
    color: #1d2129;
    margin: 0 12px 12px 0;
    font-weight: 400;
    float: left;
    cursor: move;

    &:hover {
      background: #f8f9fb;
    }

    & > img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .worktable-tooltip {
      display: none;
      width: 80px;
      text-align: center;
      height: 22px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      color: #ffffff;
      line-height: 22px;
      position: absolute;
      bottom: -28px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }

  li:nth-child(4n) {
    margin-right: 0;

    &:hover {
      background: #f8f9fb;
    }
  }

  .li-choose {
    background: #f8f9fb;
    opacity: 0.79;
    border: 1px solid #00bebd;
    cursor: move !important;
  }

  .li-ghost {
    background: #ffffff;
    border: 1px solid #ebebeb;

    img,
    span {
      display: none;
    }

    &:hover {
      background: #ffffff;
    }
  }

  .worktable {
    background: #f6f7fb;
    cursor: not-allowed;
    position: relative;
    border-style: solid;
    font-weight: 400;
    border-color: #e5e6eb;

    &:hover {
      .worktable-tooltip {
        display: block;
        animation: noSortAnim 0.3s 0.3s forwards;
      }
    }
  }

  .submit-sort {
    height: 59px;
    margin-left: -30px;
    margin-right: -30px;
    padding-right: 30px;
    padding-top: 13px;

    .btns {
      float: right;
    }

    .btn {
      height: 32px;
      line-height: 30px;
      border-radius: 4px;
      border: 1px solid #e5e6eb;
      font-size: 14px;
      cursor: pointer;
      padding: 0;
      min-width: 60px;
    }

    .cancel-btn:hover {
      border: 1px solid #e5e6eb;
      background: #f6f7fb;
    }

    .confirm-btn {
      background: #00bebd;
      border-color: #00bebd;
      color: #ffffff;
      margin-left: 10px;

      &:hover {
        background: #00a6a7;
        border-color: #00a6a7;
      }
    }
  }
}

.clearfix:after {
  content: '';
  display: block;
  overflow: hidden;
  visibility: hidden;
  clear: both;
}

@keyframes noSortAnim {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
