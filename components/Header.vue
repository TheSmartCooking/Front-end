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
                <nuxt-link to="/login" title="Login">
                    <IconAccount />
                </nuxt-link>
            </li>
            <li v-if="isLoggedIn">
                <nuxt-link to="/new-recipe" title="New Recipe">
                    <IconNewRecipe />
                </nuxt-link>
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
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import ButtonHome from './ButtonHome.vue'
import IconAccount from '@/assets/icons/user.svg'
import IconContact from '@/assets/icons/mail-question.svg'
import IconNewRecipe from '@/assets/icons/new-section.svg'
import IconPrivacy from '@/assets/icons/privacy-policy.svg'

const {
    public: { appTitle },
} = useRuntimeConfig()

// Use the composable for logged-in state
const { isLoggedIn } = useAuth()

// Ensure the header reacts to route changes
const router = useRouter()
router.afterEach(() => {
    isLoggedIn.value = !!useCookie('refresh_token').value
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

    header > span {
        margin: 0;
        text-align: center;
    }

    ul {
        justify-content: space-around;
        margin: 0;
    }
}
</style>
