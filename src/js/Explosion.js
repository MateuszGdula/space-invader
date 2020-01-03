class Explosion {
    constructor(ctx, x, y, w ,h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.asset = SI_GAME.assets.explosion;
    }

    draw() {
        console.log('draw');
        this.ctx.beginPath();
        //this.ctx.globalAlpha = this.alpha
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        //this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        //this.update();
    }

    update() {
        
    }
}

export default Explosion