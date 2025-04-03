<template>
    <header>
        <span>{{ appTitle }}</span>
        <ul>
            <li><ButtonHome /></li>
            <li v-if="isLoggedIn">
                <nuxt-link to="/account" title="Account">
                    <IconAccount />
                </nuxt-link>
            </li>
            <li v-else>
                <nuxt-link to="/login" title="Login"><IconAccount /></nuxt-link>
            </li>
            <li>
                <nuxt-link to="/contact" title="Contact Us">
                    <IconContact />
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/privacy" title="Privacy Policy">
                    <IconPrivacy />
                </nuxt-link>
            </li>
        </ul>
    </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import ButtonHome from './ButtonHome.vue'
import IconAccount from '@/assets/icons/user.svg'
import IconContact from '@/assets/icons/mail-question.svg'
import IconPrivacy from '@/assets/icons/privacy-policy.svg'

const {
    public: { appTitle },
} = useRuntimeConfig()
const isLoggedIn = ref(false)

// Monitor the refresh_token cookie
const userCookie = useCookie('refresh_token')

// Update isLoggedIn when the cookie changes
watchEffect(() => {
    isLoggedIn.value = !!userCookie.value
})

// Ensure the header reacts to route changes
const router = useRouter()
router.afterEach(() => {
    isLoggedIn.value = !!userCookie.value
})
</script>

<style scoped>
header {
    background-color: var(--color-secondary);
    display: flex;
    justify-content: space-between;
    width: 100%;
}

span {
    color: light-dark(#fff, #000);
    font-size: var(--font-size-heading);
    font-weight: bold;
    margin-left: var(--spacing-medium);
}

ul {
    align-items: center;
    display: flex;
    gap: var(--spacing-medium);
    list-style-type: none;
    margin-right: var(--spacing-medium);
}
@media screen and (width<=850px) {
    header {
        flex-direction: column;
    }

    ul {
        justify-content: space-around;
    }
}
</style>
