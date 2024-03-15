import Vue from 'vue';

import config from './config';

const directivesCtx = import.meta.globEager('./*.p.js');;

Object.values(directivesCtx).forEach(file => {
    const plugin = file.default;
    Vue.use(plugin, config[plugin.name] || {});
});
