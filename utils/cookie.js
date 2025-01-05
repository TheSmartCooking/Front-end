export function setCookie(name, value, expiresDays) {
    let cookie = `${name}=${value}; path=/;`;
    if (expiresDays) {
        const expires = new Date();
        expires.setDate(expires.getDate() + expiresDays);
        cookie += ` expires=${expires.toUTCString()};`;
    }
    document.cookie = cookie;
}

export function getCookie(name) {
    const foundRow = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
    return foundRow ? decodeURIComponent(foundRow.split('=')[1]) : null;
}

export function deleteCookie(name) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
