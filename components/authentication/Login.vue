<template>
    <form id="login-form" @submit.prevent="login()">
        <input type="email" id="login-email" name="email" v-model="email" placeholder="Email" required>
        <input type="password" id="login-password" name="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed');
                }
            })
            .then(data => {
                console.log('Login successful:', data);

                // Create or update session cookies
                const accessToken = useCookie('access_token');
                const refreshToken = useCookie('refresh_token');
                accessToken.value = data.access_token;
                refreshToken.value = data.refresh_token;

                router.push('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    },
}
</script>
