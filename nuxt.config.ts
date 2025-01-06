// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    css: [
        '@/assets/styles/variables.css'
    ],
    devtools: { enabled: false },
    runtimeConfig: {
        public: { appTitle: 'Smart Cooking &copy;' }
    },
    ssr: false,
    vite: {
        plugins: [
            require('vite-svg-loader')(),
        ],
    },
})
