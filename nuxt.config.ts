// https://nuxt.com/docs/api/configuration/nuxt-config
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
