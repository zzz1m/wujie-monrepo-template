
<template>
<div class="new-select">
    <ui-select ref="select" v-model="showText" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1" transfer>
        <ui-input slot="input" v-model="realText" :placeholder="placeholder || '请输入'" @on-change="query"></ui-input>
        <ui-option v-for="item in list" :key="item.name" :value="item.name" @click.native="setText(item)">{{ item.name }}</ui-option>
    </ui-select>
</div>
</template>
<script>
import { util, httpUtils } from '@noah/tools';
const { debounce } = util;
const { get, post } = httpUtils;


export default {
  props: ['text', 'placeholder', 'url'],
  data() {
    return {
      showSearch: false,
      list: [],
      realText: '',
      showText: ''
    };
  },
  watch: {
    text: {
      handler() {
        this.realText = this.text;
      },
      immediate: true
    }
  },
  methods: {
    query: debounce(300, async function() {
      this.$emit('update:text', this.realText);
      if (this.realText == '') {
        this.list = [];
        return;
      }
      try {
        const { success, root } = await get(this.url, { keyword: this.realText });
        if (success) {
          this.list = root;
        }
      } catch(error) {}
    }),
    setText(item) {
      this.$emit('update:text', item.name);
      this.$emit('change', item);
    }
  }

};
</script>
<style lang="less" scoped>
.new-select {
    ::v-deep .ui-select-selection {
        border: none;
    }
}
.new-select {
    width: 100%;
    position: relative;
    display: inline-block;
    height: 32px;
    .new-select-box {
        position: absolute;
        z-index: 1066;
        top: 100%;
        padding: 2px 0;
        margin: 4px 0 0;
        box-shadow: 0px 4px 10px 0px rgba(0,0,0,.1);
        border-radius: 2px;
        border: 1px solid #E5E6EB;
        width: 100%;
        max-height: 150px;
        overflow: auto;
        background: #fff;
        .new-select-box-list {
            line-height: 20px;
            font-size: 13px;
            background-color: #fff;
            color: #151b26;
            padding: 8px 15px;
            cursor: pointer;
            &:hover {
                background-color: #f3f3f3;
            }
        }
        p {
            margin: 0;
            line-height: 1.5;
            padding: 2px 15px;
            color: #c9c9c9;
            clear: both;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            font-size: 12px;
            text-align: center;
        }
    }
}
</style>
