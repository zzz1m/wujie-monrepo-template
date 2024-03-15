import SessionStorage from '../utils/sessionstorage';
import roleMap from '../plugins/tools/roleMap';

const handleNoRole = function (el, role = '', modifiers) {
  const currentRole = SessionStorage.get('roles') || [];
  const valueArr = Array.isArray(role) ? role : !role ? [] : role.split(',');

  if (valueArr.length === 0) return;

  const isIn = currentRole.some((item) => {
    return valueArr.includes(item) || (roleMap[item] && valueArr.includes(roleMap[item]));
  });

  let blackStatus = false; // true 无权限   false 有权限
  let whiteStatus = true; // true 有权限   false 无权限

  modifiers.black ? (blackStatus = isIn) : (whiteStatus = isIn);

  // 如果没有权限 ** 需要评估是否对布局有影响，如果有可以考虑透明度方案
  if (blackStatus || !whiteStatus) {
    modifiers.opacity ? (el.style.opacity = 0) : el.remove();
  }
};

export default {
  name: 'role',
  handler: {
    inserted(el, binding) {
      const { value, modifiers } = binding;
      handleNoRole(el, value, modifiers);
    }
  }
};
