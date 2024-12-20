// Constant to remember if the user is logged in
const isLoggedIn = getCookie('access_token') ? true : false;

const postsSection = document.querySelector('section#posts');
const account = document.getElementById('account');

// Function to create a card for a recipe
function createRecipeCardDOM(recipe) {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create and append the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.style.backgroundImage = 'url(' + 'https://picsum.photos/300/300' + ')';
    card.appendChild(cardBody);

    // Create and append the title
    const titleSpan = document.createElement('figcaption');
    const title = document.createElement('h1');
    title.textContent = recipe.title ? recipe.title : 'Unknown';
    titleSpan.appendChild(title);
    card.appendChild(titleSpan);

    // Create top and bottom divs for the card body
    const cardTop = document.createElement('div');
    cardTop.className = 'card-top';
    cardBody.appendChild(cardTop);

    const cardBottom = document.createElement('div');
    cardBottom.className = 'card-bottom';
    cardBody.appendChild(cardBottom);

    // Create and append the cook time in the top div
    const cookTime = document.createElement('p');
    cookTime.className = 'card-text cook-time';
    cookTime.textContent = recipe.cook_time ? recipe.cook_time : 'Unknown';
    cardTop.appendChild(cookTime);

    // Create and append the difficulty level in the top div
    const difficulty = document.createElement('p');
    difficulty.className = 'card-text difficulty';
    difficulty.textContent = recipe.difficult_level ? recipe.difficult_level : 'Unknown';
    cardTop.appendChild(difficulty);

    // Create and append the author in the bottom div
    const author = document.createElement('a');
    author.className = 'card-text author';
    author.textContent = recipe.author_name ? `@${recipe.author_name}` : 'Unknown';
    cardBottom.appendChild(author);

    // Create and append the status in the bottom div
    const status = document.createElement('p');
    status.className = 'card-text status';
    status.textContent = recipe.status ? recipe.status : 'Unknown';
    cardBottom.appendChild(status);

    card.addEventListener('click', () => {
        loadModalContent(recipe.recipe_id);
    });

    return card;
}

// Function to load recipes and display them in a specified element
function loadRecipesAndDisplay(apiEndpoint, targetElement) {
    showSpinner();

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Clear the target element first to avoid duplicating content
            targetElement.innerHTML = '';
            data.data.forEach(recipe => {
                const cardElement = createRecipeCardDOM(recipe);
                targetElement.appendChild(cardElement);
            });
        })
        .catch(error => { console.error('Error loading recipes:', error); })
        .finally(() => { hideSpinner(); });
}

// Load recipes and display them in main once the DOM is loaded
loadRecipesAndDisplay(API_BASE_URL + `/recipe/all?locale=${getCookie('locale')}`, postsSection);

account.addEventListener('click', () => {
    if (isLoggedIn) {
        // Refresh the token to extend the session
        fetch(API_BASE_URL + '/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('refresh_token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCookie('access_token', data.data.access_token);
            })
            .catch(error => { console.error('Error refreshing token:', error); })
            .finally(() => { window.location.href = 'account.html'; });

    } else {
        window.location.href = 'authentication.html';
    }
});

if (isLoggedIn) {
    const token = JSON.parse(atob(getCookie('access_token').split('.')[1]));
    const personId = token.person_id;

    fetch(API_BASE_URL + `/person/${personId}`)
        .then(response => response.json())
        .then(data => {
            const person = data.data;
            account.title = person.person_name;
        })
        .catch(error => { console.error('Error loading person:', error); });
}
