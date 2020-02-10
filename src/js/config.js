export const assets = {
    bg: "./assets/bg.png",
    ship: "./assets/ship.png",
    missle1: "./assets/missle1.png",
    missle2: "./assets/missle2.png",
    alien1: "./assets/ship_a1.png",
    alien2: "./assets/ship_a2.png",
    alien3: "./assets/ship_a3.png",
    missleA1: "./assets/missle_a1.png",
    missleA2: "./assets/missle_a2.png",
    missleA3: "./assets/missle_a3.png",
    explosion: "./assets/explo.png",
    shield: "./assets/shieldbox.png",
    weapon: "./assets/weaponbox.png",
    scoreIcon: "./assets/score-icon.png",
    shieldIcon: "./assets/shield-icon.png",
    weaponIcon: "./assets/weapon-icon.png",
}

export const getGameData = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const canvas = document.querySelector('.game');
    let gameHeight = isMobile ? Math.max(screen.width, screen.height) : Math.min(innerWidth, innerHeight);
    canvas.width = Math.round(gameHeight * 1.77);
    canvas.height = gameHeight;

    return {
        ctx: canvas.getContext('2d'),
        canvas,
        w: canvas.width,
        h: canvas.height - 60,
        statusBarHeight: 60,
        isMobile
    }
}

export const getGameObjects = (loadedAssets) => {
    return {
        background: {
            asset: loadedAssets.bg,
            speed: 0.5
        },
        playerShip: {
            asset: loadedAssets.ship,
            speed: 2,
            shield: 100
        },
        alienShips: [
            {
                asset: loadedAssets.alien1,
                speed: 1.2,
                shield: 100,
                weapon: {
                    name: "Blaster WTF-30",
                    asset: loadedAssets.missleA1,
                    w: 0.02,
                    h: 0.01,
                    damage: 10,
                    speedX: 3,
                    speedY: 0,
                    reloadTime: 1000
                },
                reward: 100
            },
            {
                asset: loadedAssets.alien2,
                speed: 1,
                shield: 200,
                weapon: {
                    name: "Rocket Launcher WTF-30",
                    asset: loadedAssets.missleA2,
                    w: 0.02,
                    h: 0.02,
                    damage: 20,
                    speedX: 1.8,
                    speedY: 0,
                    reloadTime: 4000
                },
                reward: 300
            },
            {
                asset: loadedAssets.alien3,
                speed: 1.5,
                shield: 40,
                weapon: {
                    name: "Laser Blaster XYZ123",
                    asset: loadedAssets.missleA3,
                    w: 0.06,
                    h: 0.06,
                    damage: 5,
                    speedX: 4,
                    speedY: 0,
                    reloadTime: 4000
                },
                reward: 150
            }
        ],
        shield: {
            asset: loadedAssets.shield,
            speed: 4,
            type: 'shield'
        },
        weapon: {
            asset: loadedAssets.weapon,
            speed: 3,
            type: 'weapon'
        },
        defaultMessage: {
            x: SI_GAME.data.w / 2,
            y: SI_GAME.data.h / 10,
            font: '18px Ultra',
            fillStyle: '#FFFFFF',
            textAlign: 'center'
        }
    }
}

export const getWeapons = (loadedAssets) => {
    return [
        {
            name: "Blaster WTF-40",
            asset: loadedAssets.missle1,
            w: 0.02,
            h: 0.01,
            damage: 20,
            speedX: 4,
            speedY: 0,
            reloadTime: 100,
            charges: 'UNLIMITED' 
        },
        {
            name: "Plasma Blaster BB1k",
            asset: loadedAssets.missle2,
            w: 0.07,
            h: 0.07,
            damage: 35,
            speedX: 9,
            speedY: 0,
            reloadTime: 180,
            charges: 100
        }
    ]
}
