<template>
    <header>
        <span v-html="appTitle"></span>
        <ul>
            <li><nuxt-link to="/">
                Home
            </nuxt-link></li>
            <li><nuxt-link to="/account">
                Account
            </nuxt-link></li>
            <li><nuxt-link to="/contact">
                Contact
            </nuxt-link></li>
        </ul>
    </header>
</template>

<script setup>
const { public: { appTitle } } = useRuntimeConfig();
</script>

<style scoped>
header {
    background-color: rgb(0 0 0 / 30%);
    display: flex;
    justify-content: space-between;
    width: 100%;
}

span {
    font-size: var(--font-size-heading);
}

ul {
    align-items: center;
    display: flex;
    gap: var(--spacing-medium);
    justify-content: center;
    list-style-type: none;
    padding: 0;
}
</style>
