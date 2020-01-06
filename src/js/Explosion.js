class Explosion extends EventTarget {
    constructor(ctx, x, y, w ,h) {
        super();
        this.ctx = ctx;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.asset = SI_GAME.assets.explosion;
        this.updateCouter = 0;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.w *= 1.015;
        this.h *= 1.015;
        this.updateCouter === 30 ? this.dispatchEvent(new Event('remove')) : this.updateCouter++;
    }


}

export default Explosion