import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  

  const env = loadEnv(mode, __dirname);
  console.table(env)

  return {
    logLevel: 'silent',
    base: env.VITE_PUBLICPATH, // index.html文件所在位置
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue',  'pinia', 'vue-router', '@vueuse/core'],
        dts: './types/auto-imports.d.ts',
      }),
      Components({
        directoryAsNamespace: true, // error/no-match.vue =>
        dts: './types/components.d.ts'
      })
    ],
    server: {
      port: 5130,
      proxy: createProxy({
        env: 'qa',
        prefix: ['api', 'mapi', 'preview'],
        envCfg: {
          qa: 'https://noah-qa.weizhipin.com/',
          dev: 'https://noah-dev.weizhipin.com'
        }
      })
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

type Env = 'qa' | 'dev'
interface ProxyCfg {
  env: Env
  prefix: string[]
  envCfg: Record<Env, string>
}
const createProxy = ({ env, prefix, envCfg }: ProxyCfg) =>
  prefix.reduce(
    (res, key) => ({
      ...res,
      [`/${key}`]: {
        target: envCfg[env],
        secure: false,
        changeOrigin: true
      }
    }),
    {}
  )
