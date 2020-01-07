class WeaponBox extends EventTarget {
    constructor(ctx, { asset, speed }) {
        super();
        this.ctx = ctx;
        this.asset = asset
        this.speed = speed;
        this.w = SI_GAME.data.w * 0.04;
        this.h = SI_GAME.data.h * 0.04;
        this.x = SI_GAME.data.w;
        this.y = 1 + Math.floor(Math.random() * (SI_GAME.data.h - this.h));
        this.content = {
            //weapon: SI_GAME.weapons[Math.floor(Math.random() * SI_GAME.weapons.length)]
            weapon: SI_GAME.weapons[1]
        }
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.w < 0) {
                let e = new Event('remove');
                this.dispatchEvent(e);
            }
    }
}

export default WeaponBox;