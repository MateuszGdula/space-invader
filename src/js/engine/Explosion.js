class Explosion extends EventTarget {
    constructor(ctx, explosionData) {
        super();
        this.setVars(ctx, explosionData);
    }

    setVars(ctx, {x, y, w, h, speedX, speedY, time}) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = speedX;
        this.speedY = speedY;
        this.asset = SI_GAME.assets.explosion;
        this.framesCounter = time;
        console.log(this);
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
        this.x += this.speedX;
        this.y += this.speedY;
        this.framesCounter === 0 ? this.dispatchEvent(new Event('remove')) : this.framesCounter--;
    }
}

export default Explosion