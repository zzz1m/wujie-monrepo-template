import * as path from 'path';

import { loadEnv, defineConfig } from 'vite';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
import Compression from 'vite-plugin-compression';
import CopyPlugin from 'vite-plugin-files-copy';
import usePluginImport from 'vite-plugin-importer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';
import { createVuePlugin } from 'vite-plugin-vue2';
import { staticImportedByEntry } from './build/split-vendor';
import { modules as cdnModules } from './build/cdn-modules';
import { createHtmlPlugin } from 'vite-plugin-html';
const getPublicPath = function() {
    let url = process.env.NODE_ENV === 'development' ? '' : 'apps/approval';
    if (url) {
        if (/^\/|http/.test(url)) {
            url = url;
        } else {
            url = '/' + url;
        }
    } else {
        url = '/';
    }
    return url;
};
// @see https://cn.vitejs.dev/config/

export default ({
    command,
    mode
}) => {
    const env = loadEnv(mode, __dirname);
    console.table(env);
    let rollupOptions = {
        output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            // manualChunks:{
            //   lodash: ['lodash']
            // },
            // manualChunks(id, { getModuleInfo }) {
            //     const cssLangs = `\\.(css|less|sass|scss)($|\\?)`;
            //     const cssLangRE = new RegExp(cssLangs);
            //     const isCSSRequest = (request) => cssLangRE.test(request);
            //     // 分vendor包
            //     if (
            //         id.includes('node_modules') &&
            //         !isCSSRequest(id) &&
            //         staticImportedByEntry(id, getModuleInfo)
            //     ) {
            //         return 'vendor';
            //     } else if (
            //         // 某模块被静态引入次数 + 动态引入次数
            //         ((getModuleInfo(id).importers.length + getModuleInfo(id).dynamicImporters.length) > 1) &&
            //         id.includes('src')
            //     ) {
            //         return 'manifest';
            //     }else if(  id.includes('src/comps') || id.includes('src/components') ){
            //         return 'global-components';
            //     }
            // }
        }
    };
    let optimizeDeps = {};

    let alias = {
        '@': path.resolve(__dirname, './src'),
        '~@': path.resolve(__dirname, './src'),
        'vue': 'vue/dist/vue.esm.js'
    };

    const proxyObj = {
        target: 'https://noah-qa.weizhipin.com/', // qa
        // target: 'https://noah-dev.weizhipin.com/', // dev
        // target: 'http://api.kanzhun-inc.com/mock/156',
        secure: false,
        changeOrigin: true
    };

    let proxy = {
        '/api': proxyObj,
        '/mapi': proxyObj,
        '/preview': proxyObj
    };

    // todo 替换为原有变量
    let define = {
        'process.env.NODE_ENV': JSON.stringify(`${process.env.NODE_ENV}`),
        'process.env.PUBLIC_PATH': '""',
        'process.env.PATH_PREFIX': '""'
    };

    let esbuild = {
    // loader: { '.js': 'jsx' }
    };

    return {
        base: getPublicPath(), // index.html文件所在位置
        root: './', // js导入的资源路径，src
        resolve: {
            extensions: ['.js', '.vue', '.json', '.scss', '.css', '.less'],
            alias
        },
        define: define,
        server: {
            port: '5131',
            proxy // 代理
        },
        publicDir: 'static',
        build: {
            target: 'es2015',
            minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
            manifest: false, // 是否产出maifest.json
            sourcemap: false, // 是否产出soucemap.json
            outDir: 'dist', // 产出目录
            assetsDir: 'static',
            rollupOptions,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            reportCompressedSize: false
        },
        esbuild,
        optimizeDeps,
        plugins: [
            createHtmlPlugin({
                minify: true,
                /**
                 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
                 * @default src/main.ts
                 */
                // entry: 'src/main.js',
                /**
                 * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
                 * @default index.html
                 */
                template: './index.html',
                /**
                 * 需要注入 index.html ejs 模版的数据
                 */
                inject: {
                    data: {
                        title: 'BZL Noah',
                        // injectScript: env.VITE_INJECT_SCRIPT
                    }
                }
            }),
            CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './src/tinymce'),
                        to: path.resolve(__dirname, './dist/static/tinymce')
                    },
                    {
                        from: path.resolve(__dirname, './src/resources'),
                        to: path.resolve(__dirname, './dist/resources')
                    }
                ]
            }),
            createVuePlugin({
                jsx: true,
                jsxOptions: {
                    injectH: false,
                    compositionAPI: true
                },
                babel: {
                    babelrc: true
                }
            }),
            // usePluginImport({
            //     libraryName: 'vxe-table',
            //     style: (name) => {
            //         return`${name}/style/style.css`;
            //     }
            // }),
            usePluginImport({
                libraryName: 'umy-ui',
                libraryDirectory: 'lib/theme-chalk',
                style: (name) => {
                    return`${name}.css`;
                }
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                symbolId: 'svg-[name]',
                customDomId: 'noah-svg-root'
            }),
            Compression({
                verbose: true,
                disable: false,
                threshold: 1024 * 100,
                algorithm: 'gzip',
                ext: '.gz'
            }),
            visualizer(),
            importToCDN({
                /**
                *  name: 对应下面modules的name，
                *  version: 自动读取本地package.json中dependencies依赖中对应包的版本号，
                *  path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
                */
                prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
                modules: cdnModules
            })
        ],
        css: {
            preprocessorOptions: {
                less: {
                    // 支持内联 JavaScript
                    javascriptEnabled: true
                }
            }
        }
    };
};
