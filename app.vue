<template>
    <div class="layout">
        <Header />
        <NuxtPage />
        <Footer />
        <LoadingSpinner class="hidden" />
    </div>
</template>

<style scoped>
.layout {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-large);
    height: 100svh;
    justify-content: center;
    width: 100%;
}

.layout > :nth-child(2) {
    flex: 1;
}
</style>
