<template>
    <div class="upload-item">
        <div class="upload-styl">
            <div>
                <ul v-if="uploadData.files && uploadData.files.length" class="show">
                    <li v-for="(item,i) in uploadData.files" :key="i">
                        <a :href="item.reviewUrl" target="_blank" class="ellipse">{{item.fileName}}</a>
                        <span v-if="!isDetail && !uploadData.disabled" class="text-primary mr-l-10 pointer" @click="onDelUpload(i)">删除</span>
                    </li>
                </ul>
                <template v-if="!isDetail && !uploadData.disabled">
                    <button type="button" class="btn" @click="onMockClick"><i class="ti-plus text-primary"></i>上传附件</button>
                    <span v-if="uploadData.files && uploadData.files.length" class="text-primary mr-l-10 total-size">已上传{{totalFileSize}}M</span>
                </template>
            </div>
            <p v-if="!isDetail && !uploadData.disabled" class="text-gray tip">支持{{exnameStr}}格式文件</p>
        </div>
        <div class="interview-temp-warning" v-if="showMessage && uploadData.required && !uploadData.files.length">
            <i class="ui-icon-warning"></i>
            <span>{{uploadData.warningtip}}</span>
        </div>

        <template>
            <ui-upload
                style="display:none;"
                ref="upload"
                :exname="uploadData.exname"
                action="/api/common/interview/upload.json"
                :customCheckTip="true"
                @checktip="onChecktip"
                :filesize="uploadData.filesize"
                @uploadStart="onStart"
                @uploadProgress="onProgress"
                @uploadEnd="onEnd"
            />
            <input style="display:none;" type="file" accept="" ref="selfUpload" @change="onUpload($event)"/>
        </template>
    </div>
</template>

<script>
import { zhLength } from '@/utils/util';

export default {
    name: 'interview-upload',
    components: {},
    props: {
        uploadData: {
            type: Object,
            default: {}
        }
    },
    inject:['elRoot'],
    data() {
        return {
            progressShow: false,
            fileSize: '', // 附件大小
        };
    },
    computed: {
        showMessage() {
            return this.elRoot.showMessage;
        },
        isDetail() {
            return this.elRoot.isDetail; 
        },
        /// 文件总大小
        totalFileSize() {
            let _size = 0;
            this.uploadData.files.length && this.uploadData.files.forEach(v => {
                _size += v.fileSize;
            });
            _size = Number((_size/(1024*1024)).toFixed(2));
            return _size;
        },
        exnameStr() {
            return this.uploadData.exname.split('.').join('、');
        }

    },
    watch: {},
    //方法集合
    methods: {
        // 自定义类型报错提示
        onChecktip() {
            this.$toast(this.uploadData.formatWarningtip,'warning');
            return;
        },
        /**上传 */
        onMockClick(type) {


            if (this.isDetail || this.uploadData.disabled) return;

            if (!this.uploadData.multiple) {
                if (this.uploadData.files.length){
                    this.$toast('请先删除后再进行上传', 'warning');
                    return;
                }
            }
            if (this.progressShow) return;
            this.$refs.selfUpload.click();
        },
        ////自定义上传
        onUpload(e) {
            // // console.log('==2222===file',e.target.files);
            
            /// 调用ui-upload的校验方法
            const hasError = ([]).some.call(e.target.files, item => !this.$refs.upload.checkFile(item));
            // // console.log('======hasError',hasError);
            if(hasError){
                this.$refs.selfUpload.value = '';
                return false;
            }
            if(this.$refs.selfUpload.value === '') return;

            // // console.log('==1111==size',this.totalFileSize);
            let files = e.target.files;
            // 校验文件名长度
            if (zhLength(files[0].name) > this.uploadData.filenameLength) {
                this.$refs.selfUpload.value = '';
                this.$toast(`文件名长度不得超过${this.uploadData.filenameLength}个字符`,'warning');
                return;
            }
            ////校验大小
            let _size = 0;
            _size += files[0].size;
            _size = Number((_size/(1024*1024)).toFixed(2));
            _size += this.totalFileSize;
            // // console.log('======_size',_size);
            if (_size > this.uploadData.totalFilesize) {
                this.$refs.selfUpload.value = '';
                this.$toast(`上传失败，文件总大小不可超过${this.uploadData.totalFilesize}M`, 'error');
                return;
            }

            //////上传 调ui-upload的上传接口
            this.$refs.upload.suerUpload(files[0]);  
            this.fileSize = files[0].size;       
        },
        
        // 上传开始
        onStart(file) {
            // // console.log('===file',file);
            this.progressShow = true;
            this.$toast({
                content:`正在上传...`,
                type: 'loading'
            });
        },
        // 上传进度
        onProgress(progress) {
        },
        // 上传结束
        onEnd(res) {
            // // console.log('===res',res);
            this.$refs.selfUpload.value = '';
            this.$toast.hide();
            let nData = res.data;
            if(nData.success) {
                let json = {
                    fileName: nData.root.fileName || '',
                    reviewUrl: nData.root.reviewUrl || '',
                    relativePath: nData.root.relativePath || '',
                    downLoadUrl: nData.root.downLoadUrl || '',
                    fileSize: this.fileSize || 0
                };
                this.uploadData.files.push(json);
            }
            this.progressShow = false;
            this.fileSize = '';
        },
        onDelUpload(i) {
            this.uploadData.files.splice(i,1);
        },
    },
    created() {
        console.log(this.uploadData);
    },
    mounted() {

    },
};
</script>
<style lang='less'>
//@import url();

</style>