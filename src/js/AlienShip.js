class AlienShip extends EventTarget {
    constructor(ctx, alienShipData, target) {
        super();
        this.setVars(ctx, alienShipData, target);
    }

    setVars(ctx, { asset, speed, health, weapon }, target) {
        this.ctx = ctx;
        this.asset = asset;
        this.speed = speed;
        this.health = health;
        this.x = SI_GAME.data.w;
        this.y = SI_GAME.data.h / 2;
        this.w = 100;
        this.h = 33;
        this.reload = false;
        this.target = target;
        this.alpha = 1;
        this.weapon = weapon;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = this.alpha
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.ctx.globalAlpha = 1;
        this.update();
    }

    update() {
        this.health <=0 && this.shipExplosion();
        this.x -= this.speed;
        
        (
            (this.target.y + this.target.h / 2) >
            (this.y + this.h / 2)
        ) ? 
        this.y += this.speed / 2 :
        this.y -= this.speed / 2;

        (
            (this.target.y < this.y + this.h / 2) &&
            (this.target.y + this.target.h > this.y + this.h / 2) &&
            (this.target.x + this.target.w < this.x)
        ) && this.shot(); 
    }

    shipExplosion() {
        this.asset = SI_GAME.assets.explosion;
        this.w += 2.4;
        this.h += 0.8;
        this.alpha -= 0.03;
        this.alpha <= 0 && this.dispatchEvent(new Event('explosion'));
    }

    shot() {
        if(this.reload) return;
        let e  = new Event('shot');
        e.x = this.x;
        e.y = this.y + Math.round(this.h / 2);
        e.asset = this.weapon.asset;
        e.speed = this.weapon.speed * -1;
        e.dmg = this.weapon.damage;
        e.owner = 'npc';
        this.dispatchEvent(e);
        this.reload = true;
        setTimeout(() => this.reload = false, this.weapon.reloadTime);
    }
}

export default AlienShip