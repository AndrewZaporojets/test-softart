// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
    app: {
        head: {
            title: 'Testovoe'
        }
    },

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_API_SECRET,
            apiPrefix: '/api/'
        }
    },

    css: [
        'normalize.css',
        '~/assets/scss/main.scss'
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/core.scss" as *;'
                }
            }
        },
        plugins: [
            createSvgIconsPlugin({
                iconDirs: [
                    path.resolve(process.cwd(), 'assets/icon')
                ],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',

                /**
                 * custom dom snippets
                 * @default: __svg__icons__dom__
                 */

                customDomId: '__svg__icons__dom__'
            })
        ],
        optimizeDeps: {
            exclude: ['lodash-es']
        }
    },

    proxy: {
        enableProxy: true,
        proxies: {
            '/api/v1': {
                target: process.env.NUXT_API_SECRET,
                changeOrigin: true
            }
        }
    },

    modules: [
        '@nuxt-alt/proxy',
        '@nuxt-alt/http',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@vueuse/nuxt'
    ],

    http: {
        interceptorPlugin: false
    },

    pinia: {
        autoImports: [
            ['defineStore', 'definePiniaStore']
        ]
    },

    devtools: {
        enabled: false
    }
})
