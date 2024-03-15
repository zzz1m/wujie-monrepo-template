/**
 * 错误处理页面
 */

import { ERRORMSG } from './data';

const RULES = {
  onlyNumber: /^\d+$/,
  email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
  id: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  phone: /^1[34578]\d{9}$/
};

let errMsg = '';

export default {
  computed: {
    errmsg() {
      const { status } = this.dataSource;
      return errMsg || ERRORMSG[`code_${status}`];
    },
    addedErrmsg() {
      const { addedStatus } = this.dataSource;
      return ERRORMSG[`code_${addedStatus}`];
    }
  },
  methods: {
    // 校验通过
    isOk(added = false) {
      const key = added ? 'addedStatus' : 'status';
      errMsg = '';
      this.dataSource[key] = 0;
    },
    // 为空
    isEmpty(added = false) {
      const key = added ? 'addedStatus' : 'status';
      errMsg = '';
      this.dataSource[key] = 1;
    },
    // 格式不对
    isInvalidFormat(added = false) {
      const key = added ? 'addedStatus' : 'status';
      errMsg = '';
      this.dataSource[key] = 2;
    },
    // 精度不正确
    isInvalidRegulation(intLength, decimLength) {
      const intTil = intLength > 1 ? `1-${intLength}` : '1';
      const decimTil = decimLength > 0 ? `，0-${decimLength}位小数` : '';
      errMsg = `精度不正确。请输入${intTil}位整数${decimTil}`;
      this.dataSource.status = 3;
    },
    // 数字
    isNumber(value) {
      if (this.dataSource.filedConfig.regulation == '') return;
      const regulation = this.dataSource.filedConfig.regulation.split('.');
      const intLength = regulation[0] || 0;
      const decimLength = regulation[1] || 0;
      const decimRule = decimLength > 0 ? `(\\.\\d{1,${decimLength}})?` : '';
      const rule = intLength > 0 ? new RegExp(`^\\d{1,${intLength}}${decimRule}$`) : {};
      if (intLength > 0 && !rule.test(value)) {
        this.isInvalidRegulation(intLength, decimLength);
      }
    },
    // 身份证
    isIdCard(value) {
      if (!RULES.id.test(value)) {
        this.isInvalidFormat();
      }
    },
    // 邮箱
    isEmail(value) {
      if (!RULES.email.test(value)) {
        this.isInvalidFormat();
      }
    },
    // 校验中国手机号
    isChinaPhone(value) {
      if (!RULES.phone.test(value)) {
        this.isInvalidFormat();
      }
    },
    // 校验非中国手机号
    isNotChinaPhone(value) {
      if (!RULES.onlyNumber.test(value)) {
        this.isInvalidFormat();
      }
    }
  }
};
