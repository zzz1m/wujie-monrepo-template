import uiSelect from './select/index.js';
import uiUpload from './upload/index.js';
import uiUpload1 from './upload1/index.js';
import uiInput from './input/index.js';


const components = [
    uiInput,
    uiSelect,
    uiUpload,
    uiUpload1,
];

const install = Vue => {
    if (install.installed) {
        return;
    }

    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

export default {
    install
};
