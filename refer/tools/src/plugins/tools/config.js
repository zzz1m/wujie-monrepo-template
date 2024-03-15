import SessionStorage from '../../utils/sessionstorage';

// 获取所有角色
const roles = () => SessionStorage.get('roles') || [];

export default {
  role: {
    // 角色插件配置相关
    roles
  }
};
