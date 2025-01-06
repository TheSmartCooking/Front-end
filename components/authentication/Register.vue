<template>
    <form id="register-form">
        <input type="text" id="register-username" name="username" placeholder="Username" required>
        <input type="email" id="register-email" name="email" placeholder="Email" required>

        <div>
            <input type="password" id="register-password" name="password" placeholder="Password" required>
            <input class="show-password-check" id="show-password-input" type="checkbox" tabindex="-1">
            <label class="show-password" for="show-password-input" title="Show Password"></label>
            <progress id="password-strength" class="hidden"></progress>
        </div>

        <div>
            <input type="password" id="register-password-confirm" name="password-confirm"
                placeholder="Confirm password" required>
            <input class="show-password-check" id="show-password-confirm-input" type="checkbox" tabindex="-1">
            <label class="show-password" for="show-password-confirm-input" title="Show Password"></label>
        </div>

        <button type="submit">Register</button>
    </form>
</template>

<style scoped>
#password-strength {
    appearance: none;
    height: 0.5rem;
    width: 100%;
}
</style>
