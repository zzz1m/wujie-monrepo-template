<template>
    <div>
        <input type="file" accept=""  class="upload-input" ref="upload" @change="upload($event)">
        <div class="custom-box" v-if="custom">
            <div @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)" @dragleave="dragleave($event)">
                <slot></slot>
            </div>
        </div>
        <div class="default-box" v-else>
             <button type="button" class="btn btn-primary" :class="btnClass" @click="mockClick">{{btnText}}</button>
            <!-- <button type="button" v-show="!filename" class="btn btn-primary" :class="btnClass" @click="mockClick">{{btnText}}</button>
            <div class="upload-file-info" v-show="filename">
                <span class="file-name">{{ filename }}</span>
                <span class="change-file" @click="mockClick">更改</span>
            </div>
            <div class="progress-box"  v-show="progressShow">
                <div class="progress" :style="'width:'+progress+'%'"></div>
            </div> -->
        </div>
        <div class="cropper-win" v-if="cropper" v-show="cropperShow">
            <div class="custom-cropper-box">
                <vueCropper
                        ref="cropper2"
                        :img="cropperProp.img"
                        :outputSize="cropperProp.size"
                        :outputType="cropperProp.outputType"
                        :info="cropperProp.info"
                        :canScale="cropperProp.canScale"
                        :autoCrop="cropperProp.autoCrop"
                        :autoCropWidth="cropperProp.autoCropWidth"
                        :autoCropHeight="cropperProp.autoCropHeight"
                        :fixed="cropperProp.fixed"
                        :fixedNumber="fixedNumber"
                ></vueCropper>
            </div>
            <div class="btns-box">
                <button type="button" class="btn btn-primary" @click="sureCropper">确定</button>
                <button type="button" class="btn btn-outline" @click="closeCropperWin">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
import vueCropper from '../../crpopper';
export default {
    name: 'uiUpload',
    components:{
        vueCropper
    },
    data() {
        return {
            progress:0,
            progressShow:false,
            filename:'',
            cropperProp: {
                img: '',
                info: true,
                size: 1,
                outputType: 'jpeg',
                canScale: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 300,
                autoCropHeight: 300,
                // 开启宽度和高度比例
                fixed: true
            },
            cropperShow:false
        };
    },
    props: {
        custom: {
            type: Boolean,
            default: false
        },
        isdrop: {
            type: Boolean,
            default: true
        },
        action: {
            type: String,
            default: ''
        },
        exname: {
            type: String,
            default: ''
        },
        filesize: {
            type: Number,
            default: 0
        },
        cropper:{
            type:Boolean,
            default:false
        },
        fixedNumber:{
            type: Array ,
            default: () => {
                return [1,1];
            }
        },
        uploadfileName: {
            type: String,
            default: ''
        },
        btnText: {
            type: String,
            default: '上传'
        },
        btnClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        sureCropper(){
            this.cropperShow = false;
            this.$refs.cropper2.getCropBlob((data) => {
                data.name = '裁剪后的名字';
                this.suerUpload(data);
            });
        },
        upload: function (e) {
            if(!this.checkFile(e.target.files[0])) return;
            if(this.$refs.upload.value === '') return;
            if(this.cropper){
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.cropperProp.img = window.URL.createObjectURL(new Blob([e.target.result]));
                };
                reader.readAsArrayBuffer(e.target.files[0]);
                this.cropperShow = true;
            }else{
                this.suerUpload(e.target.files[0]);
            }
        },
        checkFile(file){
            let returnVal = true;
            let fileArr = file.name.split('.');
            let fileexname = fileArr[fileArr.length - 1];
            let filesize = file.size;
            let filetype =  file.type;
            if(this.exname !== '' && this.exname.indexOf(fileexname) === -1){
                returnVal = false;
                this.$toast({
                    content: `请上传拓展名为${this.exname}的文件类型`,
                    type:'warning'
                });
            }
            if(returnVal  && this.filesize !== 0 && filesize/1024/1024 > this.filesize){
                returnVal = false;
                this.$toast({
                    content: `请上传小于${this.filesize}M的文件`,
                    type:'warning'
                });
            }
            return returnVal;
        },
        closeCropperWin(){
            this.cropperShow = false;
            this.cropperProp.img = '';
            this.$refs.upload.value = '';
        },
        suerUpload(file){
            this.$emit('uploadStart',file);
            this.progressShow = true;
            let fd = new FormData();
            fd.append(this.uploadfileName,file);
            let config = {
                onUploadProgress: progressEvent => {
                    var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    this.progress = complete;
                    if(complete === 100){
                        this.progressShow = false;
                        this.filename = file.name;
                    }
                    this.$emit('uploadProgress',complete);
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.$ajax.post(this.action, fd,config).then( res => {
                this.$emit('uploadEnd',res);
                this.$refs.upload.value = '';
            }).catch( res => {
                this.$emit('uploadEnd',res);
                this.progressShow = false;
                this.$refs.upload.value = '';
            });
        },
        mockClick:function () {
            if(this.progressShow) return;
            this.$refs.upload.click();
        },
        fileList(fileList) {
            if(this.progressShow) return;
            let files = fileList.files;
            for (let i = 0; i < files.length; i++) {
                //判断是否为文件夹
                if (files[i].type != '') {
                    if(this.cropper){
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            this.cropperProp.img = window.URL.createObjectURL(new Blob([e.target.result]));
                        };
                        reader.readAsArrayBuffer(files[i]);
                        this.cropperShow = true;
                    }else{
                        this.suerUpload(files[i]);
                    }

                } else {
                    //文件夹处理
                }
            }
        },
        dragenter(el) {
            el.stopPropagation();
            el.preventDefault();
            this.$emit('dragEnter');
        },
        dragover(el) {
            el.stopPropagation();
            el.preventDefault();
        },
        dragleave(el) {
            el.stopPropagation();
            el.preventDefault();
            this.$emit('dragLeave');
        },
        drop(el) {
            el.stopPropagation();
            el.preventDefault();
            if(!this.isdrop) return;
            this.fileList(el.dataTransfer);
        }
    },
    mounted (){
    }
};
</script>
<style type="text/css">
    .cropper-win{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
    }
    .custom-cropper-box{
        position: absolute;
        left:50%;
        top:50%;
        width: 80%;
        height: 80%;
        z-index: 999;
        transform: translateX(-50%) translateY(-50%);
        background: #fff;
    }
    .cropper-win .custom-cropper-box .vue-cropper{
        background-image:none
    }
    .cropper-win .custom-cropper-box  .cropper-modal{
        background:none
    }
    .cropper-win .btns-box{
        position: absolute;
        left: 0;
        top: calc( 90% + 10px );
        text-align: center;
        width: 100%;
    }
    .cropper-win .btns-box .btn{
        margin-right: 20px;
    }
    .drop_box{
        height: 500px;
        width: 500px;
        border:solid 1px #ededed;
    }
</style>