<template>
    <aside id="loading-spinner">
        <span id="spinner"></span>
    </aside>
</template>

<style scoped>
aside {
    align-items: center;
    background-color: rgba(0 0 0 / 50%);
    display: flex;
    justify-content: center;
    inset: 0;
    position: fixed;
    z-index: 1000;
}

span {
    animation: spin 1s linear infinite;
    border: 1rem solid light-dark(var(--color-primary), var(--color-quinary));
    border-radius: 50%;
    border-top: 1rem solid transparent;
    height: 7rem;
    width: 7rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
