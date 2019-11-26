class Ship {
    constructor(ctx, img, speed, config) {
        this.setVars(ctx, img, speed, config);
        this.setListeners();
    }

    setVars() {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;
        this.cfg = config;
        this.x = 10;
        this.y = this.cfg.h / 2;
        this.w = 100;
        this.h = 33;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }

    setListeners() {
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
    }
}


function keyDownHandler(e) {
    (e.key == 'Right' || e.key == 'ArrowRight') && (rightPressed = true);
    (e.key == 'Left' || e.key == 'ArrowLeft') && (leftPressed = true);
    (e.key == 'Up' || e.key == 'ArrowUp') && (upPressed = true);
    (e.key == 'Down' || e.key == 'ArrowDown') && (downPressed = true);
}

function keyUpHandler(e) {
    (e.key == 'Right' || e.key == 'ArrowRight') && (rightPressed = false);
    (e.key == 'Left' || e.key == 'ArrowLeft') && (leftPressed = false);
    (e.key == 'Up' || e.key == 'ArrowUp') && (upPressed = false);
    (e.key == 'Down' || e.key == 'ArrowDown') && (downPressed = false);
}

function drawShip() {
    ctx.beginPath();
    ctx.drawImage(ship, shipx, shipy, 100, 33);
    ctx.closePath();
    rightPressed &&  (shipx += 2);
    leftPressed &&  (shipx -= 2);
    upPressed &&  (shipy -= 2);
    downPressed &&  (shipy += 2);
   
}
