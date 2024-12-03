const closeButton = document.getElementById('modal-close');
const loadingSpinner = document.getElementById('loading-spinner');
const modalBox = document.getElementById('modal-box');
const modalContainer = document.getElementById('modal-container');
const modalDetailsAuthor = document.getElementById('modal-details-author');
const modalDetailsDate = document.getElementById('modal-details-date');
const modalImageAuthor = document.getElementById('modal-image-author');
const modalIngredients = document.getElementById('modal-ingredients');
const modalRecipe = document.getElementById('modal-recipe');
const modalTitle = document.getElementById('modal-title');

closeButton.addEventListener('click', () => {
    closeModal();
});

window.addEventListener('click', function (e) {
    if (!modalBox.contains(e.target) && modalContainer.contains(e.target)) {
        closeModal();
    }
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function closeModal() {
    enableScroll();
    modalContainer.style.display = 'none';
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

function openModal() {
    disableScroll();
    modalContainer.style.display = 'flex';
    loadingSpinner.style.display = 'block';
    modalBox.style.display = 'none';
}

function loadModalContent(recipeId) {
    openModal();
    fetch(`${apiUrl}/recipe/${recipeId}`)
        .then(response => response.json())
        .then(recipe => {
            modalTitle.innerText = recipe.title;
            modalDetailsAuthor.innerText = recipe.author_name;
            modalDetailsDate.innerText = recipe.modification_date ? recipe.modification_date : recipe.publication_date;
            modalImageAuthor.innerText = 'TODO';
            modalRecipe.innerText = recipe.preparation;
            modalIngredients.innerText = 'TODO';

            // Hide the spinner and show the content
            loadingSpinner.style.display = 'none';
            modalBox.style.display = 'grid';
        })
        .catch(error => {
            console.error('Error loading modal content:', error);
            loadingSpinner.textContent = 'Failed to load content.';
        });
}
