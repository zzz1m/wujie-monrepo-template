import { defineConfig } from 'vite'
import PluginVue from '@vitejs/plugin-vue'
import PluginWujie from 'vite-plugin-wujie'

console.log(PluginWujie)

export default defineConfig({
    plugins: [
        PluginVue()
    ]
})