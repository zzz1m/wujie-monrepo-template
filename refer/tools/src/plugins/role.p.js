/**
 * 角色权限
 *  1、控制是否可以编辑
 */
import roleMap from './tools/roleMap';
const RolePlugin = {
  name: 'role'
};

RolePlugin.install = function (Vue, options = {}) {
  // 向vue原型扩展方法
  Vue.prototype.editable = function (role) {
    const valueArr = Array.isArray(role) ? role : role === '' ? [] : role.split(',');
    return options.roles().some((item) => {
      return valueArr.includes(item) || (roleMap[item] && valueArr.includes(roleMap[item]));
    });
  };
};

export default RolePlugin;
