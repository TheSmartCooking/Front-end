fetch(apiUrl + '/recipe/list')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

// Load the header and footer
loadHTML('resources/html/header.html', 'header');
loadHTML('resources/html/footer.html', 'footer');
