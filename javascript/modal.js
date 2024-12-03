const modalContainer = document.getElementById('modal-container');
const modalBox = document.getElementById('modal-box');
const closeButton = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDetailsAuthor = document.getElementById('modal-details-author');
const modalDetailsDate = document.getElementById('modal-details-date');
const modalImageAuthor = document.getElementById('modal-image-author');
const modalRecipe = document.getElementById('modal-recipe');
const modalIngredients = document.getElementById('modal-ingredients');

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
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('modal-box').style.display = 'none';
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
            document.getElementById('loading-spinner').style.display = 'none';
            document.getElementById('modal-box').style.display = 'grid';
        })
        .catch(error => {
            console.error('Error loading modal content:', error);
            document.getElementById('loading-spinner').textContent = 'Failed to load content.';
        });
}
