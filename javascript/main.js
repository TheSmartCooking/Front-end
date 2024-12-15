// API URL
const API_BASE_URL = 'http://localhost:5000';

// Function to execute scripts in the loaded HTML
function executeScripts(elementId) {
    const element = document.getElementById(elementId);
    const scripts = element.getElementsByTagName('script');
    for (let script of scripts) {
        const newScript = document.createElement('script');
        newScript.text = script.innerText;
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
    }
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
}

function getCookie(name) {
    const foundRow = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
    return foundRow ? decodeURIComponent(foundRow.split('=')[1]) : null;
}


// Save the current locale to a cookie
if (!getCookie('locale')) {
    const userLanguageCode = (navigator.language || navigator.userLanguage).split('-')[0];
    setCookie('locale', userLanguageCode, 365);
}

// Function to show the loading spinner
function showSpinner() {
    document.getElementById("loading-spinner").classList.remove("hidden");
}

// Function to hide the loading spinner
function hideSpinner() {
    document.getElementById("loading-spinner").classList.add("hidden");
}
