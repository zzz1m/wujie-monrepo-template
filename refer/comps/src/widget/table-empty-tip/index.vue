<script lang="jsx">
export default {
  name: 'TableEmptyTip',
  props: {
    tipType: String,
    noDataText: String,
    errorText: String
  },
  render(h) {
    if (this.$slots.default) return this.$slots.default;
    let content = null;
    switch (this.tipType) {
      case 'loading':
        content = <ui-pageloading></ui-pageloading>;
        break;
      case 'error':
        content = <ui-table-tip type="error" showText={this.errorText}></ui-table-tip>;
        break;
      case 'noData':
        content = <ui-table-tip type="nodata" showText={this.noDataText}></ui-table-tip>;
        break;
      case 'noTodo':
        content = <ui-table-tip type="notodo" showText={this.noDataText}></ui-table-tip>;
        break;
      case 'noSearch':
        content = <ui-table-tip type="nosearch" showText={this.noDataText}></ui-table-tip>;
        break;
    }
    return content && <div class="page-tip-container">{content}</div>;
  }
};
</script>
