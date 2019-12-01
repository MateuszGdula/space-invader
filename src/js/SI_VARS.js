let canvas = document.querySelector('.game');

export const data = {
    ctx: canvas.getContext('2d'),
    w: canvas.width,
    h: canvas.height,
}

export const assets = {
    bg: "./assets/bg.png",
    ship: "./assets/ship.png",
    missle1: "./assets/missle1.png",
    alien1: "./assets/ship_a1.png",
    missle_a1: "./assets/missle_a1.png"
}