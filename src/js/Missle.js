class Missle extends EventTarget {
    constructor(ctx, img, x, y, speed) {
        super();
        this.setVars(ctx, img, x, y, speed);
    }

    setVars(ctx, img, x, y, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;
        this.x = x
        this.y = y
        this.w = 13;
        this.h = 5;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.img, this.x, this.y /* this.w, this.h */);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.x += this.speed;
        if (
            this.x + this.w > SI_GAME.data.w ||
            this.x < 0 ||
            this.y + this.h > SI_GAME.data.h ||
            this.y < 0
            ) {
                let e = new Event('remove');
                this.dispatchEvent(e);
            }
    }
}

export default Missle;