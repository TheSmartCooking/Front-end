<template>
    <form id="register-form" @submit.prevent="register">
        <input type="text" id="register-username" name="username" v-model="username" placeholder="Username" required>
        <input type="email" id="register-email" name="email" v-model="email" placeholder="Email" required>

        <div id="password-container">
            <div class="password-container">
                <input :type="passwordVisible ? 'text' : 'password'" v-model="password" placeholder="Password" required>
                <label @click="togglePasswordVisibility" title="Show Password">
                    <IconShow v-if="!passwordVisible" />
                    <IconHide v-else />
                </label>
            </div>
            <progress id="password-strength" class="hidden"></progress>
        </div>

        <div class="password-container">
            <input :type="passwordVisible ? 'text' : 'password'" v-model="passwordConfirm" placeholder="Confirm password" required>
            <label @click="togglePasswordVisibility" title="Show Password">
                <IconShow v-if="!passwordVisible" />
                <IconHide v-else />
            </label>
        </div>

        <button type="submit">Register</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import IconShow from '@/assets/icons/eye.svg';
import IconHide from '@/assets/icons/eye-off.svg';

const { public: { apiBaseUrl  } } = useRuntimeConfig();

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

// Single state to control visibility of both password inputs
const passwordVisible = ref(false);

const props = defineProps({ goToLogin: { type: Function } });

// Toggle visibility for both password inputs
const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

const register = async () => {
    if (password.value !== passwordConfirm.value) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/auth/register`, {
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
    cursor: pointer;
}

.password-container {
    display: flex;
    flex-direction: row;
}

.password-container label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.password-container input[type="password"] {
    flex: 1;
    transition-duration: 0s;
}

#password-strength {
    appearance: none;
    height: 0.5rem;
    width: 100%;
}
</style>
