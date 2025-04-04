<template>
    <div id="app">
        <Header />
        <div class="layout">
            <NuxtPage />
        </div>
        <Footer />
        <LoadingSpinner class="hidden" />
    </div>
</template>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    height: 100svh;
    width: 100%;
}

.layout {
    display: flex;
    flex: 1;
    justify-content: center;
    overflow: auto;
}

@media screen and (width<=850px) {
    .layout {
        gap: var(--spacing-small);
    }
}
</style>
