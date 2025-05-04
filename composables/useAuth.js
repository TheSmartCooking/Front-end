import { ref, watchEffect } from 'vue'
import { useCookie } from '#app'

export function useAuth() {
    const isLoggedIn = ref(false)
    const userCookie = useCookie('refresh_token')

    // Update isLoggedIn when the cookie changes
    watchEffect(() => {
        isLoggedIn.value = !!userCookie.value
    })

    return { isLoggedIn }
}
