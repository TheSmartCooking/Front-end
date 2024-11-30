const modalContainer = document.getElementById('modal-container');
const modalBox = document.getElementById('modal-box');
const closeButton = document.getElementById('modal-close');


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
    resetModal();
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
}
