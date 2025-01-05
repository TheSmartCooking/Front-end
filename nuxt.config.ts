// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    runtimeConfig: {
        public: { appTitle: 'Smart Cooking &copy;' }
    },
    css: [
        '@/assets/styles/variables.css'
    ]
})
