const postsSection = document.querySelector('section#posts');

// Function to create a card for a recipe
function createRecipeCardDOM(recipe) {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create and append the image
    const img = document.createElement('img');
    img.src = recipe.image;
    img.alt = recipe.title;
    card.appendChild(img);

    // Create and append the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    // Create and append the title
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = recipe.title;
    cardBody.appendChild(title);

    // Create and append the cook time
    const cookTime = document.createElement('p');
    cookTime.className = 'card-text';
    cookTime.textContent = `Cook Time: ${recipe.cook_time}`;
    cardBody.appendChild(cookTime);

    // Create and append the difficulty level
    const difficulty = document.createElement('p');
    difficulty.className = 'card-text';
    difficulty.textContent = `Difficulty: ${recipe.difficult_level}`;
    cardBody.appendChild(difficulty);

    // Create and append the view recipe link
    const viewRecipeLink = document.createElement('a');
    viewRecipeLink.href = `${apiUrl}/recipe/${recipe.recipe_id}`;
    viewRecipeLink.className = 'btn btn-primary';
    viewRecipeLink.textContent = 'View Recipe';
    cardBody.appendChild(viewRecipeLink);

    return card;
}

// Function to load recipes and display them in a specified element
function loadRecipesAndDisplay(apiEndpoint, targetElement) {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Clear the target element first to avoid duplicating content
            targetElement.innerHTML = '';
            data.forEach(recipe => {
                console.log("recipe", recipe);
                const cardElement = createRecipeCardDOM(recipe);
                targetElement.appendChild(cardElement); // Append the card element to the target element
            });
        });
}

// Load recipes and display them in main
loadRecipesAndDisplay(apiUrl + '/recipe/list', postsSection);
