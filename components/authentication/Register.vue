<template>
    <form id="register-form" @submit.prevent="register">
        <input type="text" id="register-username" name="username" v-model="username" placeholder="Username" required>
        <input type="email" id="register-email" name="email" v-model="email" placeholder="Email" required>

        <div>
            <input type="password" id="register-password" name="password" v-model="password" placeholder="Password" required>
            <input class="show-password-check" id="show-password-input" type="checkbox" tabindex="-1">
            <label class="show-password" for="show-password-input" title="Show Password"></label>
            <progress id="password-strength" class="hidden"></progress>
        </div>

        <div>
            <input type="password" id="register-password-confirm" name="password-confirm" v-model="passwordConfirm" placeholder="Confirm password" required>
            <input class="show-password-check" id="show-password-confirm-input" type="checkbox" tabindex="-1">
            <label class="show-password" for="show-password-confirm-input" title="Show Password"></label>
        </div>

        <button type="submit">Register</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };
    },
    methods: {
        register() {
            if (this.password !== this.passwordConfirm) {
                console.error('Passwords do not match');
                return;
            }

            fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password: this.password
                }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Registration failed');
                }
            })
            .then(data => {
                console.log('Registration successful:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    },
}
</script>

<style scoped>
#password-strength {
    appearance: none;
    height: 0.5rem;
    width: 100%;
}
</style>
