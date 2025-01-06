<template>
    <form id="register-form" @submit.prevent="register">
        <input type="text" id="register-username" name="username" v-model="username" placeholder="Username" required>
        <input type="email" id="register-email" name="email" v-model="email" placeholder="Email" required>

        <div id="password-container">
            <div class="password-container">
                <input type="password" id="register-password" name="password" v-model="password" placeholder="Password" required>
                <input class="show-password-check" id="show-password-input" type="checkbox" tabindex="-1">
                <label class="show-password" for="show-password-input" title="Show Password"><IconEye /></label>
            </div>
            <progress id="password-strength" class="hidden"></progress>
        </div>

        <div class="password-container">
            <input type="password" id="register-password-confirm" name="password-confirm" v-model="passwordConfirm" placeholder="Confirm password" required>
            <input class="show-password-check" id="show-password-confirm-input" type="checkbox" tabindex="-1">
            <label class="show-password" for="show-password-confirm-input" title="Show Password"><IconEye /></label>
        </div>

        <button type="submit">Register</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import IconEye from '@/assets/icons/eye.svg';

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const props = defineProps({
    goToLogin: {
        type: Function,
    },
});

const register = async () => {
    if (password.value !== passwordConfirm.value) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        props.goToLogin();
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>


<style scoped>
input[type="checkbox"] {
    display: none;
}

svg {
    height: var(--icon-size);
    stroke: var(--color-primary);
    width: var(--icon-size);
}

.password-container {
    display: flex;
    flex-direction: row;
}

.password-container label {
    display: flex;
    align-items: center;
}

.password-container input[type="password"] {
    flex: 1;
}

#password-strength {
    appearance: none;
    height: 0.5rem;
    width: 100%;
}
</style>
