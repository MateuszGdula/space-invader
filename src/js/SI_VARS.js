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
    missle_a1: "./assets/missle_a1.png",
    explosion: "./assets/explo.png"
}

export const gameObjects = (loadedAssets) => {
    return {
        background: {
            asset: loadedAssets.bg,
            speed: 0.5
        },
        playerShip: {
            asset: loadedAssets.ship,
            speed: 2,
            health: 100
        },
        alienShips: [
            {
                asset: loadedAssets.alien1,
                speed: 1.2,
                health: 100
            }
        ],
        weapons: [
            {
                name: "Blaster WTF-40",
                asset: loadedAssets.missle1,
                damage: 20,
                speed: 4    
            }
        ]
    }
}
