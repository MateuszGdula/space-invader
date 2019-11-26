class Ship extends EventTarget {
    constructor(ctx, img, speed, config) {
        super();
        this.setVars(ctx, img, speed, config);
        this.setListeners();
    }

    setVars(ctx, img, speed, config) {
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
        this.keyDownHandler = this.keyDownHandler.bind(this);
        document.addEventListener('keydown', this.keyDownHandler);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        document.addEventListener('keyup', this.keyUpHandler);
    }

    keyDownHandler(e) {
        (e.key == 'Right' || e.key == 'ArrowRight') && (this.rightPressed = true);
        (e.key == 'Left' || e.key == 'ArrowLeft') && (this.leftPressed = true);
        (e.key == 'Up' || e.key == 'ArrowUp') && (this.upPressed = true);
        (e.key == 'Down' || e.key == 'ArrowDown') && (this.downPressed = true);
        e.key === " " && this.shot();
    }

    keyUpHandler(e) {
        (e.key == 'Right' || e.key == 'ArrowRight') && (this.rightPressed = false);
        (e.key == 'Left' || e.key == 'ArrowLeft') && (this.leftPressed = false);
        (e.key == 'Up' || e.key == 'ArrowUp') && (this.upPressed = false);
        (e.key == 'Down' || e.key == 'ArrowDown') && (this.downPressed = false);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        (this.rightPressed && (this.x + this.w < this.cfg.w)) && (this.x += this.speed);
        (this.leftPressed && ( this.x > 0)) && (this.x -= this.speed);
        (this.downPressed && (this.y + this.h < this.cfg.h)) && (this.y += this.speed);
        (this.upPressed && (this.y > 0)) && (this.y -= this.speed);
    }

    shot(e) {
        console.log('bang bang bang');
        this.dispatchEvent(new Event('shot'))
    }
}

export default Ship;