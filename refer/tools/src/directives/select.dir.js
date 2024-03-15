import Vue from 'vue';
/**
 * v-select
 * @desc contenteditable为true,点击输入框自动选中内容
 * @example
 * <div v-select>
 */
function handleChange(e, binding) {
  const { limit } = binding.value || {};
  if (limit && e.target.innerText.length > limit) {
    e.target.innerText = String(e.target.innerText).slice(0, limit);
    switchCursorToEnd(e);
  }
}
function switchCursorToEnd(e) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(e.target);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
// focus选中输入框内容
function fucusChange(e) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(e.target);
    range.select();
  } else if (window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(e.target);
    window.getSelection().removeAllRanges(); // 清楚其他的选中状态
    window.getSelection().addRange(range); // 添加元素选中住那个改
  }
}
export default {
  name: 'select',
  handler: {
    bind(el, binding, vnode) {
      let lock = true;
      el.addEventListener('compositionstart', () => {
        lock = false;
      });
      el.addEventListener('compositionend', () => {
        lock = true;
      });
      el.addEventListener('input', (e) => {
        setTimeout(() => {
          if (lock) {
            handleChange(e, binding);
          }
        }, 0);
      });
      el.addEventListener('focus', fucusChange, false);
    },
    inserted(el, binding, vnode) {},
    unbind(el, binding, vnode) {
      el.removeEventListener('focus', fucusChange);
    }
  }
};
