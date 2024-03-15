import type { Plugin } from 'vue';

import { Tooltip, Dropdown, DropdownOption, Input } from '@boss/design';
import '@boss/design/es/style.css';
// import '@boss/design/es/trigger/trigger.css'
// import '@boss/design/es/tooltip/tooltip.css'

export default {
  install(app) {
    app.use(Tooltip);
    app.use(Dropdown);
    app.use(DropdownOption);
    app.use(Input);
  },
} satisfies Plugin;
