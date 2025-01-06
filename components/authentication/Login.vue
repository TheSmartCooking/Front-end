<template>
    <form id="login-form" @submit.prevent="login()">
        <input type="email" id="login-email" name="email" v-model="email" placeholder="Email" required>
        <input type="password" id="login-password" name="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
</template>

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
                method: 'GET',
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    },
}
</script>
