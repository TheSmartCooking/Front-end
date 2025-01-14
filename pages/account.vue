<template>
    <main>
        <button id="logout" @click="logout">Logout</button>
    </main>
</template>

<script>
import { useRouter } from 'vue-router';
import { useCookie } from '#app';

export default {
    setup() {
        const router = useRouter();

        const logout = () => {
            // Remove session cookies
            const accessToken = useCookie('access_token');
            const refreshToken = useCookie('refresh_token');
            accessToken.value = null;
            refreshToken.value = null;

            // Redirect to home
            router.push('/');
        };

        return { logout };
    },
};
</script>

<style scoped>
#logout {
    color: var(--color-primary);
    font-weight: bold;
    width: 100%;
}
</style>
