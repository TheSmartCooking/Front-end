import { showSpinner, hideSpinner } from "./spinner";

export async function fetchJSON(url) {
    console.log("fetching JSON data from", url);
    showSpinner();

    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
        let response = await fetch(url);
        let data = await response.json();
        hideSpinner();
        return data;
    } catch (error) {
        hideSpinner();
        throw error;
    }
}
