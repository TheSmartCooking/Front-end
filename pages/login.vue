<template>
    <div id="authentication">
        <section id="login">
            <Login />
            <a id="go-to-login" @click="goToRegister">Don't have an account? <span class="link-color">Register</span></a>
        </section>
        <section id="register" class="hidden">
            <Register :goToLogin="goToLogin" />
            <a id="go-to-register" @click="goToLogin">Already have an account? <span class="link-color">Login</span></a>
        </section>
    </div>
</template>

<script setup>
import Login from '@/components/authentication/Login.vue';
import Register from '@/components/authentication/Register.vue';

const goToLogin = () => {
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('register').classList.add('hidden');
};

const goToRegister = () => {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.remove('hidden');
};
</script>

<style scoped>
a {
    cursor: pointer;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.link-color {
    color: var(--color-primary);
}

#authentication {
    display: flex;
    align-items: center;
}

:deep(button[type="submit"]) {
    margin-top: 1rem;
}

:deep(input[type="checkbox"]) {
    display: none;
}

:deep(form) {
    display: flex;
    width: clamp(300px, 80%, 600px);
    flex-direction: column;
    border: 1px solid var(--color-primary);
    padding: 2rem;
    border-radius: var(--border-radius-small);
    gap: var(--spacing-medium);
}

:deep(form>div) {
    display: flex;
    flex-direction: column;
}

:deep(input) {
    padding: 0.5rem;
    border: none;
    border-radius: var(--border-radius);
    width: calc(100% - 0.5rem * 2);
}

:deep(.password-input>label) {
    background-image: "url(../images/tabler--eye.svg)";
    height: 2rem;
    width: 2rem;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
}

:deep(.show-password-check:checked+label.show-password) {
    background-image: "url(../images/tabler--eye-off.svg)";
}

/* Pseudo-elements */

:deep(input:placeholder-shown) {
    border-bottom: 1px solid light-dark(black, white);
}

:deep(
    input:user-valid,
    input.valid
) {
    background-color: rgb(0 255 0 / 5%);
    border: 1px solid var(--color-success);
    box-sizing: border-box;
    width: 100%;
}

:deep(
    input:user-invalid,
    input.invalid
) {
    background-color: rgb(255 0 0 / 5%);
    border: 1px solid var(--color-error);
    box-sizing: border-box;
    width: 100%;
}
</style>
