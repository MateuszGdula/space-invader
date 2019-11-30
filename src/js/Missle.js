class Missle extends EventTarget {
    constructor(ctx, img, x, y, speed, config) {
        super();
        this.setVars(ctx, img, x, y, speed, config);
    }

    setVars(ctx, img, x, y, speed, config) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;
        this.cfg = config;
        this.x = x
        this.y = y
        this.w = 13;
        this.h = 5;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.img, this.x, this.y /* this.w, this.h */);
        this.ctx.closePath();
        return this.update();
    }

    update() {
        this.x += this.speed;
        if (
            this.x + this.w > this.cfg.w ||
            this.x < 0 ||
            this.y + this.h > this.cfg.h ||
            this.y < 0
            ) return true;
    }
}

export default Missle;