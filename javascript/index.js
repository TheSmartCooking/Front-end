const postsSection = document.querySelector('section#posts');
const postsLoadingSpinner = document.getElementById('posts-loading-spinner');

// Function to create a card for a recipe
function createRecipeCardDOM(recipe) {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create and append the image
    const img = document.createElement('img');
    // img.src = recipe.image;
    img.src = 'https://picsum.photos/300/300';
    img.alt = recipe.title;
    card.appendChild(img);

    // Create and append the title
    const titleSpan = document.createElement('figcaption');
    const title = document.createElement('h1');
    title.textContent = recipe.title ? recipe.title : 'Unknown';
    titleSpan.appendChild(title);
    card.appendChild(titleSpan);

    // Create and append the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    // Create and append the cook time
    const cookTime = document.createElement('p');
    cookTime.className = 'card-text cook-time';
    cookTime.textContent = recipe.cook_time ? recipe.cook_time : 'Unknown';
    cardBody.appendChild(cookTime);

    // Create and append the difficulty level
    const difficulty = document.createElement('p');
    difficulty.className = 'card-text difficulty';
    difficulty.textContent = recipe.difficult_level ? recipe.difficult_level : 'Unknown';
    cardBody.appendChild(difficulty);

    // Create and append the difficulty level
    const author = document.createElement('a');
    author.className = 'card-text author';
    author.textContent = recipe.author ? `@${recipe.author}` : 'Unknown';
    cardBody.appendChild(author);

    card.addEventListener('click', () => {
        loadModalContent(recipe.recipe_id);
    });

    return card;
}

// Function to load recipes and display them in a specified element
function loadRecipesAndDisplay(apiEndpoint, targetElement) {
    // Display the loading spinner
    postsLoadingSpinner.style.display = 'block';

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Clear the target element first to avoid duplicating content
            targetElement.innerHTML = '';
            data.forEach(recipe => {
                const cardElement = createRecipeCardDOM(recipe);
                targetElement.appendChild(cardElement);
            });

            postsLoadingSpinner.style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
            postsLoadingSpinner.textContent = 'Failed to load recipes.';
        })
}

// Load recipes and display them in main
loadRecipesAndDisplay(apiUrl + `/recipe/list?locale_code=${getCookie('locale')}`, postsSection);
