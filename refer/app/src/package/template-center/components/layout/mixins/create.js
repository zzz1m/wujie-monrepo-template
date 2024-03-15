import { 
    TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX
} from '@/package/template-center/model/const';

export default {
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {};
    },
    computed: {
        options: {
            set(v) {},
            get() {
                if(![ TYPE_BASIC_RADIO, TYPE_BASIC_CHECKBOX ].includes(this.config.type)) return;
                return this.config.options;
            }
        }
    },
    methods: {
        // 点击选项设置
        onChoose(item) {
            this.options.forEach(item => {
                this.$set(item, 'chooseClick' , false);
            });
            item.chooseClick = true;
            item.chooseFocus = false;
            this.$emit('choose', {
                activeId: this.config.id, // 选中的控件id
                activeCode: item.code // 选中的控件的选项code
            });
        },
        // 点击输入框
        onClick(item) {
            this.options.forEach(item => {
                this.$set(item, 'chooseFocus' , false);
                this.$set(item, 'chooseClick' , false);
            });
            item.chooseFocus = true;
        },
        // 输入框失焦
        onBlur(e, key, val) {
            const innerText = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
            if(!innerText) return;
            e.target.innerHTML = innerText;
            this.$set(this.options[key], val , innerText);
        },
        // 选项删除
        optionDelete(index) {
            this.options.splice(index, 1);
        }
    }
};