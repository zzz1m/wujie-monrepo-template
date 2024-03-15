# vite-plugin-wujie

简化wujie微前端方案配置的vite插件

## 使用方法

### vue3基座 + vite

```typescript
// 基座：vite.config.ts
import { defineConfig } from 'vite'
import PluginVue from '@vitejs/plugin-vue'
import PluginWujie from 'vite-plugin-wujie'

export default defineConfig({
    plugins: [
        PluginVue(),
        PluginWujie({
            // 注册子应用
            subapps: [
                /**
                 * 方案：同一域名，子系统加前缀部署
                 * 例如：https://base.com/app/system
                 * 需要配置 /app/system/ 前缀打向子应用资源
                 */
                {
                    // 应用名称，唯一标识
                    name: 'system',
                    /**
                     * 应用的路由匹配规则
                     * type MatchRule = string | { pattern: string; rewrite: string }
                     * match: MatchRule[]
                     */
                    match: [
                        /**
                         * 不重写路径
                         * 访问 https://base.com/system/test => https://base.com/app/system/system/test
                         */
                        '/system/*', 
                        // 访问 https://base.com/system-external/test => https://base.com/app/system/external/test
                        {
                            pattern: '/system-external/*',
                            rewrite: '/external'
                        }
                    ],
                    // 应用的本地开发地址 or 部署地址
                    url: process.env.dev? 'localhost:3000': 'https://base.com/app/system'
                },
                // 也可以不同域名访问，注意资源/接口请求跨域问题
                {
                    name: 'audit',
                    match: [
                        // 访问 https://base.com/audit/test => https://audit.com/audit/test
                        '/audit/*', 
                        '/audit-admin/*'
                    ],
                    url: process.env.dev? 'localhost:4000': 'https://audit.com/'
                }
            ]
        })
    ]
})
```

在程序入口 `main.ts` 中，加入以下配置

```typescript
import App from './App.vue';
import router from './router';
import { wujie } from '~wujie'

// 需要放到 router 后面
const app = createApp(App).use(router).use(wujie)
app.mount('#app');
```

在你希望作为基座容器的页面，将 `<router-view />` 替换为提供的 `<SubApp />`

```vue
<!-- src/App.vue  -->
<script setup lang="ts">
import { SubApp } from '~wujie'
</script>

<template>
    <AppLayout>
        <!-- <router-view /> -->
        <SubApp />
    </AppLayout>
<template>
```

或者某个入口页面 `src/views/dashborad/index.vue`，对应

```vue
<!-- {
    name: 'dashboard',
    match: ['/dashboard/*']
} -->
<template>
    <DashboradLayout>
        <!-- 通过 /dashboard/ 前缀访问 -->
        <SubApp />
    </DashboradLayout>
<template>
```

## 注意事项

1. 基座请求子应用资源/接口不能跨域
2. xxx
3. ...
