<template>
    <form id="login-form" @submit.prevent="login">
        <input
            type="email"
            id="login-email"
            name="email"
            v-model="email"
            placeholder="Email"
            required
        />
        <input
            type="password"
            id="login-password"
            name="password"
            v-model="password"
            placeholder="Password"
            required
        />
        <button type="submit">Login</button>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const {
    public: { apiBaseUrl },
} = useRuntimeConfig();
const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
    try {
        const data = await fetch(`${apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                return response.json();
            })
            .then((data) => data.data);

        // Use cookies to store tokens
        const accessToken = useCookie("access_token", {
            maxAge: 60 * 60 * 1, // 1 hour
            path: "/",
        });

        const refreshToken = useCookie("refresh_token", {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });

        accessToken.value = data.access_token;
        refreshToken.value = data.refresh_token;

        // Navigate to home page
        router.push("/");
    } catch (error) {
        console.error("Error:", error);
    }
};
</script>
