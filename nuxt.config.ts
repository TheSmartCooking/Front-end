// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    css: ['@/assets/styles/variables.css'],
    devtools: { enabled: false },
    plugins: ['~/plugins/detect-language.js'],
    runtimeConfig: {
        public: {
            appTitle: `Smart Cooking ${String.fromCharCode(169)}`, // Smart Cooking &copy;
            apiBaseUrl: 'http://localhost:5000',
        },
    },
    ssr: false,
    vite: {
        plugins: [(await import('vite-svg-loader')).default()],
    },
})
