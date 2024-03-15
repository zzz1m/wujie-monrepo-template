
import SessionStorage from '@/utils/sessionstorage';
import Vue from 'vue';
import store from '@/store/index';

const vm = new Vue();

// 存储名
const STORAGE_NAME = '_forbid_pushState';
const EDITING_NAME = 'IS_EDITING';

export default {
    data() {
        return {
            pageUrl: document.URL,
            checkNotForbid: true       // 默认开启不拦截校验    如果是弹窗的时候 改成false
        };
    },
    created() {
        this.setEditing();
    },
    mounted () {
        this.initForbid();
    },
    beforeDestroy () {
        this.destroyForbid();
    },
    methods: {
        setEditing(status = 0) {
            SessionStorage.set(EDITING_NAME, status);
        },
        isCurrentRoute(){
            const { path } = this.$route;
            return location.href.includes( path );
        },
        
        initForbid() {
            if (window.history && window.history.pushState) {
                // 解决刷新页面时重复push，导致回退时重复confirm
                let forbidPush = SessionStorage.get(STORAGE_NAME); 
                if (!forbidPush) {  // null
                    // window.history.pushState(null, null, document.URL);
                    SessionStorage.set(STORAGE_NAME, 1);
                }
                window.addEventListener('popstate', this.forbidBack);
            }
            window.addEventListener('beforeunload', this.forbidClose);
        },
        destroyForbid() {
            SessionStorage.del(EDITING_NAME);
            SessionStorage.del(STORAGE_NAME);
            window.removeEventListener('popstate', this.forbidBack);
            window.removeEventListener('beforeunload', this.forbidClose);
        },

        async forbidClose(e) {
            // 增加不拦截扩展
            if (this.notForbid) return;

            const IS_EDITING =  SessionStorage.get(EDITING_NAME);
            let isChange = false;
            isChange = (IS_EDITING == 1);
            // 支持自定义校验
            if (this.validateValueChange) {
                isChange = await this.validateValueChange();
            }
            if( isChange ) {
                const message = '离开会丢失未保存的修改，确定离开吗？';
                (e || window.event).returnValue = message;
                return message;
            };
        },
        async forbidBack (e) {
            try {
                // 如果有hash，默认为需要拦截
                if ((this.notForbid || this.isCurrentRoute()) && this.checkNotForbid ) return;
                const IS_EDITING =  SessionStorage.get(EDITING_NAME);
                let isChange = false;
                isChange = (IS_EDITING == 1);
                store.commit('updatePageIsLoading', false);
                // 支持自定义校验
                if (this.validateValueChange) {
                    isChange = await this.validateValueChange();
                };
                if( isChange ) {
                    vm.$dialog({
                        title: '温馨提示',
                        type: 'warning',
                        content: '离开会丢失未保存的修改，确定离开吗？',
                        preventLayer: true,
                        onConfirm: () => {
                            SessionStorage.del(EDITING_NAME);
                            SessionStorage.del(STORAGE_NAME);
                            this.checkNotForbid = true;
                            // 触发返回上一页的回调
                            if (this.forbidCallback) {
                                this.forbidCallback();
                            }
                            if (window.history && window.history.pushState) {
                                history.pushState(null, null, this.pageUrl);
                            }
                            setTimeout(() => {
                                window.history && window.history.back();
                            }, 300);
                            this.$refs.uploadChunk && this.$refs.uploadChunk.abortFetch();
                            return false;
                        },
                        onCancel: () => {
                            if (window.history && window.history.pushState) {
                                history.pushState(null, null, this.pageUrl);
                            }
                        },
                        onClose: () =>{
                            if (window.history && window.history.pushState) {
                                history.pushState(null, null, this.pageUrl);
                            }
                        }
                    });
                }else {
                    // 触发返回上一页的回调
                    if (this.forbidCallback) {
                        this.forbidCallback();
                    }
                    window.history && window.history.back();
                    return false;
                }
            } catch (error) {
                console.log(error);
            }
            
        }
    }
};