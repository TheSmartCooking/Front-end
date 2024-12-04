const closeButton = document.getElementById('modal-close');
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
    modalContainer.classList.add('hidden');
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

function openModal() {
    disableScroll();
    showSpinner();
    modalContainer.classList.remove('hidden');
    modalBox.classList.add('hidden');
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
        })
        .catch(error => { console.error('Error loading modal content:', error); })
        .finally(() => {
            hideSpinner();
            modalBox.classList.remove('hidden');
        });
}
