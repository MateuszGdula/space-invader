class Missle extends EventTarget {
    constructor(ctx, missleData) {
        super();
        this.setVars(ctx, missleData);
    }

    setVars(ctx, { asset, w, h, x, y, speed, dmg, owner }) {
        this.ctx = ctx;
        this.asset = asset;
        this.w = SI_GAME.data.w * w;
        this.h = SI_GAME.data.h * h;
        this.x = x
        this.y = y
        this.speed = speed;
        this.dmg = dmg;
        this.owner = owner;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, this.y /* this.w, this.h */);
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.x += this.speed;
        
        if (
            this.x > SI_GAME.data.w ||
            this.x + this.w < 0 ||
            this.y > SI_GAME.data.h ||
            this.y + this.h < 0
        ) {
            let e = new Event('remove');
            this.dispatchEvent(e);
        }
    }
}

export default Missle;