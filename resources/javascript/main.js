// API URL
const apiUrl = 'http://greenland.myddns.me:58000';

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

// Function to dynamically load HTML content
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            executeScripts(elementId);
        })
        .catch(error => console.error('Error loading HTML:', error));
}
