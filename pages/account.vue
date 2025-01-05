<template>
    <main>
        <button id="logout" @click="logout">Logout</button>
    </main>
</template>

<script>
import { deleteCookie } from '@/utils/cookie.js';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        const logout = () => {
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            router.push('/');
        };

        return { logout };
    }
}
</script>

<style scoped>
#logout {
    color: red;
    font-weight: bold;
    width: 100%;
}
</style>
