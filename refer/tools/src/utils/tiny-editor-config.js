import axios from 'axios';
import Vue   from 'vue';
import BossJSUpload from '@boss/boss-js-upload';
/**
 *  工具栏支持
 *      bold italic underline strikethrough ｜
 *      formatselect ｜ fontsizeselect fontselect | forecolor backcolor |
 *      bullist numlist | alignleft aligncenter alignright alignjustify |
 *      superscript subscript | table | image link unlink |
 *      indent outdent |  | removeformat |
 *      undo redo | paste | fullscreen |
 *      autolink charmap preview hr anchor pagebreak help
 * 
 *  插件支持
 *      ‘autolink link image lists charmap preview hr anchor pagebreak quickbars',
 *      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media',
 *      'table template paste help imagetools
 * 
 * */ 

const { protocol, host} = window.location;
const urlPre = protocol + '//' + host;

// 校验图片
const justifyImg = (file, failure) => {
  const { name, size } = file;
  const limit = 2 * 1000 * 1000;
  const whiteList = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
  const type = name.split('.')[1];
  if( size > limit ){
    failure('请上传小于2M的图片');
    return;
  }
  if( !whiteList.includes(type) ){
    failure('请上传格式为jpg,jpeg, png, bmp, gif的图片');
    return;
  }
  return true;
};
 
const publicPath = (
  location.href.includes('.weizhipin.com') || location.href.includes('.kanzhun-inc.com')
) ? import.meta.env.VITE_PATHPREFIX + '/static': '/src'; // 本地开发配置成 /
const imgUpload = {
  url: '/api/ueditor/call.json' 
};

export const configUpload = function( url ){
  imgUpload.url = url || imgUpload.url;
};

const errorPng = 'https://img.bosszhipin.com/static/file/2023/a5mz8eoq7x1689227983242.png';

function addLink(href) {
  const links = [...document.getElementsByTagName('style'),...document.getElementsByTagName('link')];
  if ([...links].some(v => v?.href && v?.href.includes('skin.min.css'))) return;
  console.log('add link', href);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  const head = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(link);
  }
}

export function getDefaultConfig(config = {}) {
  const { disableUrlPre, newTool=false, media=false, isCourse=false } = config;
  let urlPreStr = disableUrlPre ? '' : urlPre;
  addLink(publicPath + '/tinymce/skins/ui/oxide/skin.min.css');
  return {
    skin_url: publicPath + '/tinymce/skins/ui/oxide',
    language_url: publicPath + '/tinymce/langs/zh_CN.js',
    icons_url: publicPath + '/tinymce/icons/custom/icons.js',
    icons: 'custom',
    content_css: publicPath + '/tinymce/skins/content/default/content.css',
    language: 'zh_CN',
    placeholder: 'Insert text here ...',
    plugins: [
      'autolink link image lists table autoresize toc fullscreen formatpainter indent2em media colorline borderradius' 
    ],
    media_alt_source: true,
    // toolbar_sticky: true,
        
    toolbar_mode: 'sliding',
    toolbar: newTool ? `
            bold italic underline strikethrough formatselect fontsizeselect fontselect forecolor backcolor 
            bullist numlist alignleft aligncenter alignright superscript subscript table image indent2em outdent indent lineheight formatpainter colorline borderradius ${media ? 'media': ''} anchor hr blockquote removeformat fullscreen 
        ` : isCourse ? `
            bold italic underline strikethrough formatselect fontsizeselect fontselect forecolor backcolor 
            bullist numlist alignleft aligncenter alignright 
            superscript subscript table image fullscreen lineheight formatpainter
        ` : `
        bold italic underline strikethrough formatselect fontsizeselect fontselect forecolor backcolor 
        bullist numlist alignleft aligncenter alignright 
        superscript subscript table image fullscreen
    `,

    image_prepend_url: urlPreStr,
    media_dimensions: false,
    media_alt_source: false,
    convert_urls: false,
    // media link unlink autolink alignjustify
    file_picker_types: 'media image',
    extended_valid_elements: 'video[*] img[*]',
    content_style: `img { max-width:100% !important; height: auto } a[data-color] { position:relative } a[data-color]::after{ content:'';width:100%;height:8px;position:absolute;bottom:0px;left:0px;background:var(--datacolor);z-index:-1  }`,
    // imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
    object_resizing: true, //为false会禁用图片大小快捷调整
    paste_data_images: true, // 设置为“true”将允许粘贴图像，而将其设置为“false”将不允许粘贴图像。
    paste_block_drop: false, // 设置为“true”将允许拖动图像，而将其设置为“false”将不允许拖动图像。
    paste_enable_default_filters: false, // 是否开启默认过滤器
    branding: false, // 是否禁用“Powered by TinyMCE”
    menubar: false, //顶部菜单栏显示
    statusbar: false, // 隐藏底部状态栏


    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',

    toc_depth: 1,
    toc_header: 'li',
    toc_class: 'toc-list',

    min_height: 220,
    autoresize_bottom_margin: 0,  
    autoresize_max_height: 1000,  
    autoresize_min_height: 206,
    autoresize_on_init: true,  
    autoresize_overflow_padding: 0,

    // 添加文本缩进功能
    setup: function(ed) {
      // 
      ed.on('init', () => {
        const btns = document.querySelectorAll('.tox-tbtn');
        [...btns].map(v => v.setAttribute('title', ''));
      });
      ed.on('drop', function(e) {
        if (e.dataTransfer.items) {
          const ele = (e.dataTransfer || e.originalEvent.dataTransfer).items;
          if (ele[0].kind == 'file' && ele[0].type.indexOf('image/') !== -1) {
            e.preventDefault();
            e.stopPropagation();
            const blob = ele[0].getAsFile();
            let formdata = new FormData();
            formdata.append('upfile', blob);
            formdata.append('action', 'uploadimage');
            axios.post(imgUpload.url, formdata).then(res => {
              if( res.data.state === 'SUCCESS' ){
                ed.insertContent(`<img src="${urlPreStr + res.data.url}" />`);
              }else {
                const mes = res.data.message || res.data.msg || '上传失败';
                Vue.prototype.$toast({
                  content: mes,
                  type: 'error'
                });
              }
            }).catch(error => {
              Vue.prototype.$toast({
                content: '上传失败',
                type: 'error'
              });
            });
          }
        }
      });
      ed.on('paste', function(e) {
        // 来自word/excel
        if (e.clipboardData.getData('text/html') && e.clipboardData.getData('text/html').includes('</html>')) {
          setTimeout(() => {
            let str = ed.getContent();
            const regExp = /<img[^>]+src=['"]([^'"]+)['"]+/g;
            const result = [];
            let temp;
            while ((temp = regExp.exec(str)) != null) {
              result.push(temp[1]);
            }
            if (!result.some(v => (v.startsWith('file://') || v.startsWith('https://zhishu.zhipin.com/')))) return;
            result.map(v => {
              if (v.startsWith('file://') || v.startsWith('https://zhishu.zhipin.com/')) {
                str = str.replace(`src="${v}"`, `src="https://img.bosszhipin.com/static/file/2023/iotgb36faz1692105698719.png" style="width:auto !important;height:auto !important;"`);
              }
            });
            ed.setContent(str);
          },1000);
          return;
        }
        if (e.clipboardData.items) {
          const ele = [...(e.clipboardData || e.originalEvent.clipboardData).items];
          if (ele.some(v=> v.kind == 'file' && v.type.indexOf('image/') !== -1)) {
            e.preventDefault();
            e.stopPropagation();
            ele.map(v => {
              if (v.kind == 'file' && v.type.indexOf('image/') !== -1) {
                const blob = v.getAsFile();
                let formdata = new FormData();
                formdata.append('upfile', blob);
                formdata.append('action', 'uploadimage');
                axios.post(imgUpload.url, formdata).then(res => {
                  if( res.data.state === 'SUCCESS' ){
                    ed.insertContent(`<img src="${urlPreStr + res.data.url}" />`);
                  }else {
                    const mes = res.data.message || res.data.msg || '上传失败';
                    Vue.prototype.$toast({
                      content: mes,
                      type: 'error'
                    });
                  }
                }).catch(error => {
                  Vue.prototype.$toast({
                    content: '上传失败',
                    type: 'error'
                  });
                });
              }
            });
          } else {
            setTimeout(() => {
              let str = ed.getContent();
              const regExp = /<img[^>]+src=['"]([^'"]+)['"]+/g;
              const result = [];
              let temp;
              while ((temp = regExp.exec(str)) != null) {
                result.push(temp[1]);
              }
              if (!result.some(v => (v.startsWith('file://') || v.startsWith('https://zhishu.zhipin.com/')))) return;
              result.map(v => {
                if (v.startsWith('file://') || v.startsWith('https://zhishu.zhipin.com/')) {
                  str = str.replace(`src="${v}"`, `src="https://img.bosszhipin.com/static/file/2023/iotgb36faz1692105698719.png" style="width:auto !important;height:auto !important;"`);
                }
              });
              ed.setContent(str);
            },1000);
          }
        }
      });
      ed.on('keydown', function(event) {
        if (event.keyCode == 9) { // tab pressed
          if (event.shiftKey) {
            ed.execCommand('Outdent');
          }
          else {
            ed.execCommand('Indent');
          }
        
          event.preventDefault();
          return false;
        }
      });
    },

    // 控制粘贴进度的，可以对个别数据进行过滤处理，如base64等
    // paste_preprocess : function(pl, o) {
    //     console.log(222,o.content);

    // },

    // 图片上传参考链接 https://blog.csdn.net/ouxiaoyang5/article/details/81295579
    images_upload_handler (blobInfo, success, failure) {
      const file = blobInfo.blob();
      // const result = justifyImg( file, failure );
      // if( !result ) return;
      let formdata = new FormData();
      formdata.append('upfile', file);
      formdata.append('action', 'uploadimage');
      axios.post(imgUpload.url, formdata).then(res => {
        if( res.data.state === 'SUCCESS' ){
          Vue.prototype.$toast({
            content: '上传成功',
            type: 'success'
          });
          success(urlPreStr + res.data.url);
        }else {
          const mes = res.data.message || res.data.msg || '上传失败';
          // Vue.prototype.$toast({
          //     content: res.data.state || '上传失败',
          //     type: 'warning'
          // });
          failure(mes);
        }
      }).catch(error => {
        failure(error);
      });
    },
    file_picker_callback: function (callback, value, meta) {

      if (meta.filetype === 'media') {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'mp4');
        input.click();
        input.onchange = function() {
          const file = this.files[0];
          const exp = file.name.split('.').pop().toLowerCase();
          if (exp !== 'mp4') {
            Vue.prototype.$toast({
              content: '请上传mp4视频格式',
              type: 'warning'
            });
            return;
          }
          if (file.size > 10 * 1024 * 1024 * 1024) {
            Vue.prototype.$toast({
              content: '视频大小不能超过10GB',
              type: 'warning'
            });
            return;
          }
          const env = (() => {
            if (location.href.includes('localhost')) {
              return BossJSUpload.Env.QA;
            }
            return location.href.includes('.weizhipin') ? BossJSUpload.Env.QA : (location.href.includes('noah-pre') ? BossJSUpload.Env.PRE : BossJSUpload.Env.PRO);
          })();
          try {
            const dom = document.querySelector('#tinymce-loading');
            if (dom) {
              dom.innerHTML = `上传初始化中`;
            } else {
              const div = document.createElement('div');
              div.id = 'tinymce-loading';
              div.innerHTML = `上传初始化中`;
              document.body.appendChild(div);
            }
            BossJSUpload.uploadVideo(file, {
              env,
              appName: 'zhipin-noah',
              clientType: 'noah-web',
              fileName: file.name,
              onProgress: (data) => {
                const percent = parseInt(data.percent * 100);
                const dom = document.querySelector('#tinymce-loading');
                if (dom) {
                  dom.innerHTML = `上传进度：${percent}%`;
                } else {
                  const div = document.createElement('div');
                  div.id = 'tinymce-loading';
                  div.innerHTML = `上传进度：${percent}%`;
                  document.body.appendChild(div);
                }
              },
              onFileFinish: async (data) => {
                removeLoading();
                const res = await axios.get(`/api/public/file/video/info.json?fileId=${data.FileId}`);
                if (res.data.success) {
                  Vue.prototype.$toast({
                    content: '上传成功',
                    type: 'success'
                  });
                  callback(`${res.data.root}&fileId=${data.FileId}`);
                } else {
                  Vue.prototype.$toast({
                    content: '上传失败',
                    type: 'error'
                  });
                }
              },
              onError: (err) => {
                removeLoading();
                Vue.prototype.$toast({
                  content: '上传失败',
                  type: 'error'
                });
              }
            });
          } catch(e) {
            removeLoading();
          }
        };
      }
      else if (meta.filetype === 'image') {
        console.log('🚀🚀🚀🚀🚀🚀🚀🚀');
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        input.onchange = function() {
          const file = this.files[0];
          const toast = Vue.prototype.$toast({
            content: '上传中...',
            type: 'loading'
          });
          let formdata = new FormData();
          formdata.append('upfile', file);
          formdata.append('action', 'uploadimage');
          axios.post(imgUpload.url, formdata).then(res => {
            if(res.data.state === 'SUCCESS'){
              Vue.prototype.$toast({
                content: '上传成功',
                type: 'success'
              });
              callback(urlPreStr + res.data.url);
            }else {
              const mes = res.data.message || '上传失败';
              Vue.prototype.$toast({
                content: mes,
                type: 'error'
              });
            }
          }).catch(error => {
            Vue.prototype.$toast({
              content: '上传失败',
              type: 'error'
            });
          });
        };
      }
    }
  };
};

function removeLoading() {
  const dom = document.querySelector('#tinymce-loading');
  if (dom) {
    dom.parentElement.removeChild(dom);
  }
}
