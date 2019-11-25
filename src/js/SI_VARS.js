window.SI_CANVAS = document.querySelector('.game');
window.SI_CTX = SI_CANVAS.getContext('2d');

export const config = {
    w: SI_CANVAS.width,
    h: SI_CANVAS.height,
}

export const assets = {
    bg: "./assets/bg.png",
    ship: "./assets/ship.png"
}