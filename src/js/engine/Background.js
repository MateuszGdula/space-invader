class Background {
    constructor(ctx, {asset, speed}) {
        this.ctx = ctx;
        this.asset = asset;
        this.speed = speed;
        this.x = 0;
        this.w = SI_GAME.data.w;
        this.h = SI_GAME.data.h;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, 0, this.w, this.h);
        this.ctx.drawImage(this.asset, this.x + SI_GAME.data.w, 0, this.w, this.h);
        this.ctx.closePath();
        this.x > SI_GAME.data.w * -1 ? this.x -= this.speed : this.x = 0;
    }
}

export default Background;