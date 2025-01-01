const home = document.getElementById('home');
const logout = document.getElementById('logout');

home.addEventListener('click', () => {
    document.location.href = '/index.html';
});

logout.addEventListener('click', () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    window.location.href = '/index.html';
});
