import Vue from 'vue';

const compsCtx = import.meta.globEager('./**/*.g.vue');
Object.values(compsCtx).forEach(filename => {
    const comp = filename.default;
    Vue.component(comp.name, comp);
});