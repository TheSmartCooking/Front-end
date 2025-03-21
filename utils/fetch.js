import { showSpinner, hideSpinner } from './spinner'

export async function fetchJSON(url) {
    showSpinner()

    try {
        let response = await fetch(url)
        let data = await response.json()
        hideSpinner()
        return data
    } catch (error) {
        hideSpinner()
        throw error
    }
}
