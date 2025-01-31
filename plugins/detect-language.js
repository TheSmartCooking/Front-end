export default defineNuxtPlugin({
    name: 'detect-language',
    mode: 'client',
    async setup({ }) {
        const browserLanguage = (navigator.language || navigator.userLanguage).split('-')[0];

        // Check if the cookie already exists
        const languageCookie = useCookie("language_code", {
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30 * 100 // 100 years
        });

        if (!languageCookie.value) {
            languageCookie.value = browserLanguage;
        }
    }
});
