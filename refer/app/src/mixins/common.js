import { upload } from '@/services/dashboard/phcc';
import { _tagListAll } from '@/services/dashboard/homepage';
import { editorCommonOption } from '@/mixins/config.js';
export default {
    data(){
        return{
            pasteFlag: true,
            current: {
                model: '',
                quill: {}
            },
            allTagList: [],
        };
    },
    directives: {
        paste: { // 粘贴
            // 指令的定义
            bind(el,binding,vnode) {
                el.addEventListener('paste',function(event){ //这里直接监听元素的粘贴事件
                    binding.value(event);
                });
            }
        }
    },
    created() {
        const _this = this;
        this.editorOption = {
            modules: {
                toolbar: {
                    container: [
                        ...editorCommonOption,
                        ['image']
                    ],
                    handlers: {
                        image() {
                            $('#upload').val('');
                            document.getElementById('upload').click();
                            _this.current.quill = this.quill;
                            _this.current.model = 'image';
                        }
                    }
                }
            },
            placeholder: '请填写内容'
        };
    },
    methods:{
        onPaste(el) {
            // setTimeout(() => {
            //     let dialogDom = document.querySelector('.dialog-homepage-small .dialog-body');
            //     dialogDom.scrollTop = dialogDom.scrollHeight - dialogDom.clientHeight; // 自动滚至底部
            // },0);
        },
        async upload() {
            try {
                this.$toast({
                    content: '上传中...',
                    type: 'loading'
                });

                const file = document.getElementById('upload').files[0];
                var formData = new FormData();
                formData.append('upfile', file);
                formData.append('action', 'upload' + this.current.model);
                const res = await upload(formData);
                if (res.state === 'SUCCESS') {
                    this.$toast({
                        content: '上传成功',
                        type: 'success'
                    });
                    const range = this.current.quill.getSelection() || {};

                    //上传图片
                    if (this.current.model === 'image') {
                        this.current.quill.insertEmbed(
                            range.index,
                            this.current.model,
                            location.protocol + '//' + location.host +  res.url
                            // Quill.sources.USER
                        );
                    } else {
                        //上传视频
                        this.current.quill.insertEmbed(range.index, 'simpleVideo', {
                            url: res.url,
                            controls: 'controls',
                            preload:'none'
                        });
                    }
                } else {
                    this.$toast({
                        content: res.state,
                        type: 'error'
                    });
                }
            } catch (e) {
                this.$toast({
                    content: '上传失败',
                    type: 'error'
                });
                console.log(e);
            }
        },


        async getAllTagList() {
            try {
                const res = await _tagListAll();
                if (res.success) {
                    if (res.root) {
                        this.allTagList = res.root.list || [];
                    }
                }
            } catch (error) {}
        },
    }
};