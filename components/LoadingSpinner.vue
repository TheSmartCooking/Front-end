<template>
    <aside id="loading-spinner">
        <span id="spinner"></span>
    </aside>
</template>

<style scoped>
aside {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0 0 0 / 50%);
    z-index: 1000;
}

span {
    width: 7rem;
    height: 7rem;
    border: 1rem solid #888;
    border-top: 1rem solid var(--polaroid-background-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
