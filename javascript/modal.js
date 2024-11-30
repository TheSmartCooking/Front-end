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

function openModal(recipeId) {
    loadModal(recipeId);
    disableScroll();
    modalContainer.style.display = 'flex';
}

function loadModal(recipeId) {
    fetch(`${apiUrl}/recipe/${recipeId}`)
        .then(response => response.json())
        .then(recipe => {
            modalTitle.innerText = recipe.title;
            modalDetailsAuthor.innerText = recipe.author_name;
            modalDetailsDate.innerText = recipe.modification_date ? recipe.modification_date : recipe.publication_date;
            modalImageAuthor.innerText = 'TODO';
            modalRecipe.innerText = recipe.preparation;
            modalIngredients.innerText = 'TODO';
        });
}
