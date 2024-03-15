export { default as store } from './store';
export { default as directiveInit } from './directives';
export { default as pluginsInit } from './plugins';
export { default as routerBefore } from './intercept/router-before';
export { default as dialogCtrl } from './mixins/dialog-ctrl';
export { default as browerCtrl } from './mixins/brower-ctrl';
export { default as emitter } from './mixins/emitter';
export { default as Seq } from './mixins/seq';
export { default as Dictionary } from './mixins/dictionary';
export { default as DictCascader } from './mixins/dict-cascader';

export { default as magpie } from 'magpie-monitor';
import apiConfig from './meta/api';
export { default as API } from './meta/api';
export const commonServices = apiConfig.COMMON;
export const attendanceServices = apiConfig.ATTENDANCE;
export const auditServices = apiConfig.AUDIT;
export * as httpUtils from './intercept/http.js';
export * as tinyEditorConfig from './utils/tiny-editor-config';

export * as commonConfig from './meta/config';

// 工具类
// 通用业务工具
export * as util from './utils/util';
export * as filters from './utils/filters';
export { default as sessionstorage} from './utils/sessionstorage';
export * as common from './utils/util'; // common 和 util 内容已一致  common 以后废弃 只用util

// 埋点工具
export * as magpieUtil from './utils/monitor';
export * as bossAnalytics from './utils/bossAnalytics';
