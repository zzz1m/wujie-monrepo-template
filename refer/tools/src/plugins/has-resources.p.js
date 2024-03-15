/**
 * 角色权限
 *  1、控制是否可以编辑
 */
import store from '../store';

const ResourcesPlugin = {
  name: 'resources'
};

ResourcesPlugin.install = function (Vue, options = {}) {
  // 向vue原型扩展方法
  Vue.prototype.hasResources = function (resources) {
    let permissions = store.state.permissions || [];
    const superAdministrator = permissions.includes('/*'); // 超级管理员权限
    return permissions.includes(resources) || superAdministrator;
  };
};

export default ResourcesPlugin;
