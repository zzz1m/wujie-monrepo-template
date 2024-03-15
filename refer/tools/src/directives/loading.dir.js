import { isEqual } from '../utils/util.js';
let handleLazyFns = {}; // 懒加载，图片滚动到可视区域再加载
// 默认的加载中
const _loading = 'https://img.bosszhipin.com/static/file/2021/5avahha8xo1638175251285.gif';
const errImg = 'https://img.bosszhipin.com/static/file/2021/1wgkhwata61639388719175.jpg';
// 将html文本设置为img的src
function setImgErrHtml(el, err_html) {
  let data = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${el.clientWidth}" height="${el.clientHeight}">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:14px; height:100%; width:100%;">
        ${err_html}
        </div>
    </foreignObject>
    </svg>
    `;
  let DOMURL = window.URL || window.webkitURL || window;
  let svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  let url = DOMURL.createObjectURL(svg);
  el.setAttribute('src', url);
}

// 加载
async function handleLoad(el, binding, vnode, _eid) {
  if (!binding.value) {
    return;
  }
  const {
    src, // 要加载的图片的src
    err_html, // 错误展示inner_html，优先级高于占位图
    err_img, // 错误的占位图
    loading_img, // 加载中的占位图
    // 绑定的不是图片
    state, // 传入的加载状态，取值为 loading / error / success
    zIndex, // 占位图的z-index
    loadingCliper // 用canvas绘制加载动画，切割绘制区域的方法
  } = binding.value;

  if (vnode.tag === 'img') {
    // 处理加载中和失败的占位图
    el.setAttribute('src', loading_img || _loading);
    const img = new Image();
    img.onload = () => {
      Object.assign(el.style, {
        objectFit: ''
      });
      el.setAttribute('src', src);
    };
    img.onerror = () => {
      Object.assign(el.style, {
        objectFit: 'contain' // 设置图片的object-fit
      });
      if (err_html) {
        setImgErrHtml(el, err_html);
      } else {
        el.setAttribute('src', err_img || errImg);
      }
    };
    img.src = src;

    return;
  }

  const isCanvas = typeof loadingCliper === 'function';
  let tagName = isCanvas ? 'canvas' : 'img';

  el.setAttribute(_eid, state);

  // 如果是其他类型的节点，需要将该节点position设置为relative或者absolute, 内部加一个覆盖内容占位的图片
  let placeholder = el.querySelector('.load_placeholder');
  if (tagName === 'canvas') {
    placeholder && el.removeChild(placeholder);
    placeholder = null;
    tagName = state === 'loading' ? 'canvas' : 'img';
  }
  if (['loading', 'error'].includes(state)) {
    if (!placeholder) {
      if (el.style.position !== 'absolute') {
        el.style.position = 'relative';
      }
      placeholder = document.createElement(tagName);
      placeholder.classList.add('load_placeholder');
      Object.assign(placeholder.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'contain', // 设置图片的object-fit
        zIndex: zIndex || 10 // 这个zIndex要注意能覆盖里面内容，同时不会副作用覆盖到页面别的地方
      });
      el.appendChild(placeholder);
    }

    if (state === 'loading') {
      if (isCanvas) {
        setCanvasLoading(el, placeholder, loadingCliper, _eid);
      } else {
        placeholder.setAttribute('src', loading_img || _loading);
      }
    } else if (state === 'error') {
      placeholder.setAttribute('src', err_img || errImg);
    }
  } else if (state === 'success' && placeholder) {
    el.removeChild(placeholder);
  }
}

// canvas动画的加载
// 一个绘制圆角矩形的方法
function drawRoundRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x, y + radius);
  ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2);
  ctx.lineTo(width - radius + x, y);
  ctx.arc(width - radius + x, radius + y, radius, (Math.PI * 3) / 2, Math.PI * 2);
  ctx.lineTo(width + x, height + y - radius);
  ctx.arc(width - radius + x, height - radius + y, radius, 0, (Math.PI * 1) / 2);
  ctx.lineTo(radius + x, height + y);
  ctx.arc(radius + x, height - radius + y, radius, (Math.PI * 1) / 2, Math.PI);
  ctx.lineTo(x, y + radius);
}
function setCanvasLoading(el, canvas, cliper, _eid) {
  const { clientHeight, clientWidth } = canvas;
  const fin = 1; // 可以设置一定缩放比例避免结果变糊
  canvas.width = clientWidth * fin;
  canvas.height = clientHeight * fin;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(fin, 0, 0, fin, 0, 0);

  ctx.beginPath();
  cliper(ctx, { drawRoundRect });
  ctx.closePath();
  ctx.clip();

  const step = 2;
  const draw = (prev) => {
    // 如果该节点已不在页面，停止动画
    const { width, height } = canvas.getBoundingClientRect();
    if (!(width && height) || el.attributes[_eid].value !== 'loading') {
      ctx.clearRect(0, 0, width, height);
      return;
    }
    const rate = Math.round(prev > 99 ? 0 : prev + step);
    const grad = ctx.createLinearGradient(-3 * clientWidth, 0, clientWidth * 3, 0);
    grad.addColorStop(0, '#FDFEFF');
    grad.addColorStop(rate / 100, '#D0D3D4');
    grad.addColorStop(1, '#FDFEFF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, clientWidth, clientHeight);
    requestAnimationFrame(() => draw(rate));
  };
  requestAnimationFrame(() => draw(50));
}

function handleChange(el, binding, vnode) {
  if (!binding.value) {
    return;
  }
  if (binding.oldValue && isEqual(binding.value, binding.oldValue)) {
    return;
  }
  const { lazy } = binding.value;

  // 给节点一个唯一标识
  let ekey = Object.keys(el.attributes).find((e) => el.attributes[e].name.indexOf('vload_') === 0);
  let _eid = (el.attributes[ekey] && el.attributes[ekey].name) || '';
  if (!_eid) {
    _eid = 'vload_' + new Date().getTime();
    el.setAttribute(_eid, '');
  }
  if (lazy) {
    // 处理懒加载，当节点滚动到可视区域再加载
    handleLazyFns[_eid] && document.removeEventListener('scroll', handleLazyFns[_eid], true);
    handleLazyFns[_eid] = function () {
      const { top, left, bottom, right } = el.getBoundingClientRect();
      const { clientHeight, clientWidth } = document.documentElement;
      if (bottom > 0 && top < clientHeight && right > 0 && left < clientWidth) {
        // 可见后移除scroll监听
        handleLazyFns[_eid] && document.removeEventListener('scroll', handleLazyFns[_eid], true);
        handleLoad(el, binding, vnode, _eid);
      }
    };
    document.addEventListener('scroll', handleLazyFns[_eid], true);
    handleLazyFns[_eid]();
  } else {
    handleLoad(el, binding, vnode, _eid);
  }
}

export default {
  name: 'loading',
  handler: {
    inserted: handleChange,
    update: handleChange,
    unbind(el, binding, vnode) {
      let ekey = Object.keys(el.attributes).find((e) => el.attributes[e].name.indexOf('vload_') === 0);
      let _eid = (el.attributes[ekey] && el.attributes[ekey].name) || '';
      handleLazyFns[_eid] && document.removeEventListener('scroll', handleLazyFns[_eid], true);
      delete handleLazyFns[_eid];
    }
  }
};
