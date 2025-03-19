<template>
    <form id="register-form" @submit.prevent="register">
        <input
            type="text"
            id="register-username"
            name="username"
            v-model="username"
            placeholder="Username"
            required
        />
        <input
            type="email"
            id="register-email"
            name="email"
            v-model="email"
            placeholder="Email"
            required
        />

        <div id="password-container">
            <div class="password-container">
                <input
                    :type="passwordVisible ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Password"
                    @input="evaluatePasswordStrength"
                    required
                />
                <label @click="togglePasswordVisibility" title="Show Password">
                    <IconShow v-if="!passwordVisible" />
                    <IconHide v-else />
                </label>
            </div>

            <progress
                id="password-strength"
                v-show="passwordStrengthBarVisible"
                :max="passwordStrengthMax"
                :value="passwordStrengthValue"
            ></progress>
        </div>

        <div class="password-container">
            <input
                :type="passwordVisible ? 'text' : 'password'"
                v-model="passwordConfirm"
                placeholder="Confirm password"
                required
            />
            <label @click="togglePasswordVisibility" title="Show Password">
                <IconShow v-if="!passwordVisible" />
                <IconHide v-else />
            </label>
        </div>

        <button type="submit">Register</button>
    </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import IconShow from '@/assets/icons/eye.svg';
import IconHide from '@/assets/icons/eye-off.svg';

const {
    public: { apiBaseUrl }
} = useRuntimeConfig();

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const passwordVisible = ref(false);
const passwordStrengthValue = ref(0); // Current strength value
const passwordStrengthMax = ref(5); // Maximum strength value
const passwordStrengthBarVisible = ref(false); // Controls visibility of strength bar

const props = defineProps({ goToLogin: { type: Function } });

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

// Evaluate password strength based on criteria
const evaluatePasswordStrength = () => {
    const criteria = {
        length: password.value.length >= 12,
        uppercase: /[A-Z]/.test(password.value),
        lowercase: /[a-z]/.test(password.value),
        digit: /[0-9]/.test(password.value),
        special: /[^A-Za-z0-9]/.test(password.value)
    };

    // Count met criteria
    const metCriteriaCount = Object.values(criteria).filter(Boolean).length;

    // Update strength bar
    passwordStrengthValue.value = metCriteriaCount;
    passwordStrengthBarVisible.value = metCriteriaCount > 0;
};

// Handle registration logic
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
                password: password.value
            })
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
input[type='checkbox'] {
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

.password-container input[type='password'] {
    flex: 1;
    transition-duration: 0s;
}

#password-strength {
    appearance: none;
    display: flex;
    flex-direction: column;
    height: 0.5rem;
    width: 100%;
}

/* Pseudo elements */

#password-strength::-webkit-progress-value {
    transition: width 0.5s ease-in-out;
}

#password-strength[value='1']::-webkit-progress-value {
    background-color: var(--color-error);
}

#password-strength[value='2']::-webkit-progress-value {
    background-color: light-dark(#ff9800, #ffb74d);
}

#password-strength[value='3']::-webkit-progress-value {
    background-color: light-dark(#ffeb3b, #ffee58);
}

#password-strength[value='4']::-webkit-progress-value {
    background-color: light-dark(#8bc34a, #aed581);
}

#password-strength[value='5']::-webkit-progress-value {
    background-color: var(--color-success);
}
</style>
