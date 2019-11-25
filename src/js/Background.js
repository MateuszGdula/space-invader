class Background {
    constructor(ctx, img, speed, config) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;
        this.cfg = config;
        this.x = 0;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.img, this.x, 0)
        this.ctx.drawImage(this.img, this.x + this.cfg.w, 0)
        this.ctx.closePath();
        this.x > this.cfg.w * -1 ? this.x -= this.speed : this.x = 0;
    }
}

export default Background;