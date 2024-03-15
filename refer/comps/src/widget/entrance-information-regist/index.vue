<template>
<ui-dialog v-model="show"
    class="information-regist-dialog"
    lock prevent-layer :title="title" :width="width"
>
    <template slot="content">
        <information-regist-panel v-if="show"
            ref="register"  v-bind="$attrs"
        ></information-regist-panel>
        <AuditPreviewDialoig ref="auditPreviewDialoig" />
    </template>

    <div slot="footer" class="btns">
        <button class="btn btn-primary btn-outline" type="button" @click="preview">审批流预览</button>
        <button class="btn btn-primary" type="button" @click="onSave()">保存</button>
        <button class="btn btn-primary btn-submit" type="button" @click="onSubmit()">提交</button>
    </div>
</ui-dialog>
</template>

<script>
import InformationRegistPanel from './panel';
import AuditPreviewDialoig from '../audit-preview-dialog/index.vue';
import { API } from '@noah/tools';
const { _saveRegisterMsg } = API.ENTRY;
const { _previewProgressEntry } = API.AUDIT;

export default {
  name: 'InformationRegist',
  components: { InformationRegistPanel, AuditPreviewDialoig },
  props: {
    title: String,
    width: {
      type: [String, Number],
      default: 1000
    },
    value: [Boolean, String, Number]
  },
  watch: {
    value: {
      immediate: true,
      handler(newval) {
        this.show = Boolean(newval);
      }
    },
    show(newval) {
      this.$emit('input', newval);
    }
  },
  data () {
    return {
      show: false
    };
  },

  methods: {
    close() {
      this.show = false;
    },
    // 保存
    async onSave() {
      const param = this.$refs.register.getResult();
      if( param ){
        param.isSave = 0;
        const { success } = await _saveRegisterMsg(param);
        if( success ){
          this.$toast({
            content: '保存成功',
            type: 'success'
          });
          this.$emit('on-confirm', {
            type: 'save', from: 'induction'
          });
          this.close();
        }
      }
    },
    async preview() {
      const param = this.$refs.register.validForm();
      if(param) {
        this.$refs.auditPreviewDialoig.open('loading');
        const { success, root } = await _previewProgressEntry(param);
        if(success && root) {
          this.$refs.auditPreviewDialoig.open(root);
        } else {
          this.$refs.auditPreviewDialoig.open('empty');
        }
      }
    },
    // 提交
    async onSubmit() {
      const param = this.$refs.register.validForm();
      if( param ){
        param.isSave = 1;
        const { success } = await _saveRegisterMsg(param);
        if( success ){
          this.$toast({
            content: '确认入职成功',
            type: 'success'
          });
          this.$emit('on-confirm', {
            type: 'submit', from: 'induction'
          });
          this.close();
        }
      }
    }
  }
};
</script>
