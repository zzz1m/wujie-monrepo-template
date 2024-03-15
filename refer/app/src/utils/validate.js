import Vue from 'vue';

const Validate = {
    checkData: {
        item: null,
        trigger: '',
        callback: null
    },
    checkFormDomData: {// DOM方式验证传入的数据
        formData: {},
        ruleData: []
    },
    getPatterns(type) {
        if (!type) {
            return;
        }
        const regs = {
            phone: /^(1[3456789][0-9]{9})$/, // 国内手机号
            overseaPhone: /^(\d{6,11})$/, //海外手机号6-11位数字
            email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            password: /^[a-zA-Z0-9]{6,20}$/, // 6-20位数字和字母组合
            number: /^[0-9]*$/, // 数字
            positiveInteger: /^[1-9]\d*$/, // 正整数
            positiveIntegerPlus: /^([1-9]\d+)|[2-9]$/, // 大于1正整数
            cooperation:/^[0-9][0-9]?$|^100$/ //0-100
        };
        return regs[type];
    },
    /*dom 的方式进行验证*/
    checkForm(form, formData, ruleData, callback) {
        const formEl = $(form);
        const elements = form.elements;

        formEl.find('input[prop], textarea[prop], select[prop]').each((index, element) => {
            let prop = element.getAttribute('prop');
            let item = {
                form: form,
                value: formData[prop],
                rules: ruleData[prop],
                element: element,
                prop: prop
            };
            if (this.check(item, 'submit', callback) === false) {
                return false;
            }
        });
        /*for (let key in data) {
            let item = {
                value: data[key].value,
                label: data[key].label || '',
                rules: data[key].rules,
                prop: key,
                form: form,
                isSubmit: true
            }
			if (Validate.check(item) === false) {
				return false
			}
		}*/
    },
    check(item, trigger, callback) {
        if (trigger == 'submit') {
            this.isSubmit = true;
        } else {
            this.isSubmit = null;
        }
        //const rules = item.uiForm.rules[item.prop];

        /*if (!rules || !rules.length) {
			if (callback) {
				callback();
			}
			return;
		}
		if (this.checkRules(item) === false) {
			if (callback) {
				callback(false);
			}
			return false;
		} else {
			if (callback) {
				callback(true);
			}
		}*/
        return this.checkRules(item);
    },

    checkRules(item) {
        //let rules = item.nodeType ? : item.uiForm.rules[item.prop];
        const rules = item.uiForm && item.uiForm.rules[item.prop] || item.rules;
        let flag;
        let rule;

        if (rules && rules.length) {
            for (let i = 0; i < rules.length; i++) { //只要验证失败就跳出循环并返回false
                rule = rules[i];
                if (rule.required && this.checkRequired(rule, item) === false) {
                    flag = false;
                    return false;
                }
                if (rule.range && this.checkRange(rule, item) === false) {
                    flag = false;
                    return false;
                }
                if (rule.type && this.chekPattern(rule, item) === false) {
                    flag = false;
                    return false;
                }
                if (rule.equal && this.chekEqual(rule, item) === false) {
                    flag = false;
                    return false;
                }
            }
        }
        return flag;
    },
    checkRequired(rule, item) {
        const text = rule.message || '必填';
        let value = typeof item.modelValue != 'undefined' ? item.modelValue : item.value; // 优先获取 modelValue

        if (Array.isArray(value) && !value.length) {
            if (this.isSubmit) {
                this.showError(text, item);
            } else {
                this.hideError(item);
            }
            return false;
        } else if (typeof value == 'undefined' || value == null || value === false || (typeof value === 'string' && value.replace(/(\s*$)/g, '') == '')) {


            if (this.isSubmit) {
                this.showError(text, item); //输入框为空并且只在提交表单的时候才显示错误
            } else {
                this.hideError(item); // 其他情况比如blur时不显示错误
            }

            return false;
        } else {
            this.hideError(item);
            return true;
        }
    },

    checkRange(rule, item) {
        const range = rule.range;
        const curLen = this.getLength(item.value);
        let text = rule.message;
        if (item.value.replace(/(\s*$)/g, '') == '') {
            this.hideError(item);
            $(item.$refs.input).val('').trigger('input');
            return;
        }
        if (range) {
            if (curLen > range.max) {
                text = '不能多于' + range.max + '个字';
                this.showError(text, item);
                return false;
            } else if (curLen < range.min) {
                text = '不少于' + range.min + '个字';
                this.showError(text, item);
                return false;
            } else {
                this.hideError(item);
                return true;
            }

        }
    },
    chekPattern(rule, item) {
        const type = rule.type;
        const reg = rule.format || this.getPatterns(type);
        const text = rule.message || '格式不正确';
        const el = item.$refs && item.$refs.input || item.element;
        const number = Number(item.value);
        const min = rule.min;
        const max = rule.max;
        if (item.value.toString().replace(/(\s*$)/g, '') == '') {
            $(el).val('').trigger('input');
        }

        if (reg) {
            if (!reg.test(item.value)) {
                this.showError(text, item);
                return false;
            } else {
                if (type === 'number') {
                    if (min !== 'undefined' && max === 'undefined') {
                        if (item.value < min) {
                            this.showError(text, item);
                            return false;
                        } else {
                            this.hideError(item);
                            return true;
                        }
                    } else if (max !== 'undefined' && min === 'undefined') {
                        if (item.value > max) {
                            this.showError(text, item);
                            return false;
                        } else {
                            this.hideError(item);
                            return true;
                        }
                    } else if (min !== 'undefined' && max !== 'undefined') {
                        if (item.value < min || item.value > max) {
                            this.showError(text, item);
                            return false;
                        } else {
                            this.hideError(item);
                            return true;
                        }
                    } else {
                        this.hideError(item);
                        return true;
                    }
                    return false;
                } else {
                    this.hideError(item);
                    return true;
                }
            }
        }

    },
    chekEqual(rule, item) {
        const compareProp = rule.equal;
        const text = rule.message || '两次输入不一致';
        const compareValue = item.uiForm && item.uiForm.model[rule.equal] || $(item.form).find('input[prop="' + rule.equal + '"]').val();
        const el = item.$refs && item.$refs.input || item.element;

        if (item.value.replace(/(\s*$)/g, '') == '') {
            $(el).val('').trigger('input');
            this.hideError(item);
            return;
        }
        if (compareValue) {
            if (item.value !== compareValue) {
                this.showError(text, item);
                return false;
            } else {
                this.hideError(item);
                return true;
            }
        }
    },

    showError(text, item) {
        /*let wrapEl = el.parent();
		if (el.attr('type') == 'checkbox' || el.attr('type') == 'radio') {
			wrapEl = el.parent().parent();
		}
		wrapEl.find('.tip-error').remove();
		wrapEl.append('<span class="tip-error"><i class="ui-icon-warning"></i>'+ text +'</span>');
		el.addClass('ipt-error');
		*/
        const el = item.$refs && item.$refs.input || item.element;
        const form = item.uiForm;

        if (item.element) {
            $(item.element).parent().find('.tip-error').remove();
            $(item.element).parent().append('<p class="tip-error"><i class="ui-icon-warning"></i>' + text + '</p>');
        } else {
            item.validateState = 'error';
            item.validateMessage = text;
        }

        if (this.isSubmit && (!form || !form.validateAll)) {
            if (el) {
                el.focus();
                window.scrollTo($(el).offset().top, 0);
            }
        }
    },
    hideError(item) {
        /*const wrapEl = el.parent();
		wrapEl.find('.tip-error').remove();
		el.removeClass('ipt-error');*/
        if (item.element) {
            $(item.element).parent().find('.tip-error').remove();
        } else {
            item.validateState = '';
            item.validateMessage = '';
        }
    },
    /*获取文本的长度，2个英文算一个长度*/
    getLength(str) {
        var realLength = 0,
            str = str,
            len = str.length,
            charCode = -1,
            i;
        for (i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            /*12288为全角空格，12289为全角句号，12290为全角句号，另外65248到65373区间的为中文全角符号*/
            if ((charCode >= 0 && charCode <= 128) || (charCode >= 65248 && charCode <= 65373) || charCode == 12288 || charCode == 12289 || charCode == 12290) {
                realLength += 0.5;
            } else {
                realLength += 1;
            }
        }
        return Math.round(realLength);
    },
};

export default {
    install(Vue, options) {
        Vue.prototype.$validate = Validate;
    }
};
