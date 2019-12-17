class Missle extends EventTarget {
    constructor(ctx, img, x, y, speed, dmg, owner) {
        super();
        this.setVars(ctx, img, x, y, speed, dmg, owner);
    }

    setVars(ctx, img, x, y, speed, dmg, owner) {
        this.ctx = ctx;
        this.img = img;
        this.x = x
        this.y = y
        this.speed = speed;
        this.dmg = dmg;
        this.owner = owner;
        this.w = SI_GAME.data.w * 0.02;
        this.h = SI_GAME.data.h * 0.01;
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