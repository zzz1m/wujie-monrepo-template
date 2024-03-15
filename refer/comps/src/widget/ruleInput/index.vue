<template>
  <div class="ruleinput">
    <template v-for="(item, mindex) in arr">
      <div v-for="(rule, index) in item" :key="index + 'parent'" class="ruleinputcondition">
        <template>
          <div :key="index + 'child1'" class="name">{{ rule.fieldName }}</div>
          <div :key="index + 'child2'" class="split">{{ rule.ruleName }}</div>
          <div :key="index + 'child3'" class="name">
            {{ getContent(rule) }}
          </div>
          <div v-if="index !== item.length - 1" :key="index + 'child4'" class="name" style="padding: 0px 8px">且</div>
        </template>
      </div>
      <div v-if="mindex !== arr.length - 1" :key="mindex + 'split'" class="rulesplit">或</div>
    </template>
  </div>
</template>
<script>
/**
 * 规则显示输入框
 */

export default {
  props: {
    arr: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getContent(rule) {
      if (Array.isArray(rule.metaValue)) {
        return rule.metaValue.map((r) => (r.label ? r.label : r)).join(',');
      }
      try {
        const temp = JSON.parse(rule.metaValue);
        if (Array.isArray(temp)) {
          return temp.map((r) => (r.label ? r.label : r)).join(',');
        }
      } catch (e) {}
      return rule.metaValue;
    }
  }
};
</script>
<style lang="less" scoped>
.ruleinput {
  width: 100%;
  min-height: 34px;
  line-height: 1.5;
  padding: 5px 15px;
  font-size: 14px;
  border: 1px solid #f6f7fb;
  border-radius: 4px;
  color: #151b26;
  background-image: none;
  position: relative;
  background-color: #f6f7fb;
  color: #c9cdd4;

  &:hover {
    background-color: #fff;
    border-color: #2cd7c8;
  }

  .ruleinputcondition {
    padding: 2px 8px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #e5e6eb;
    display: inline-block;
    margin: 2px 0px;
    .name {
      font-size: 12px;
      font-weight: 400;
      color: #1d2129;
      line-height: 20px;
      display: inline-block;
    }
    .split {
      font-size: 12px;
      font-weight: 400;
      color: #86909c;
      line-height: 20px;
      display: inline-block;
      padding: 0px 4px;
    }
  }
  .rulesplit {
    font-size: 12px;
    font-weight: 400;
    color: #1d2129;
    line-height: 20px;
    display: inline-block;
    margin: 0px 8px;
  }
}
</style>
