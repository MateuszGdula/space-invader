class Background {
    constructor(ctx, asset, speed) {
        this.ctx = ctx;
        this.asset = asset;
        this.speed = speed;
        this.x = 0;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, 0)
        this.ctx.drawImage(this.asset, this.x + SI_GAME.data.w, 0)
        this.ctx.closePath();
        this.x > SI_GAME.data.w * -1 ? this.x -= this.speed : this.x = 0;
    }
}

export default Background;