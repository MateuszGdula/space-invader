class AlienShip extends EventTarget {
    constructor(ctx, asset, speed, health, playerShip) {
        super();
        this.setVars(ctx, asset, speed, health, playerShip);
    }

    setVars(ctx, asset, speed, health, playerShip) {
        this.ctx = ctx;
        this.asset = asset;
        this.speed = speed;
        this.health = health;
        this.x = SI_GAME.data.w;
        this.y = SI_GAME.data.h / 2;
        this.w = 100;
        this.h = 33;
        this.reload = false;
        this.playerShip = playerShip;
        this.weapon = {
            asset: SI_GAME.assets.missle_a1, 
            damage: 20,
            speed: 3
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.health <=0 && this.shipExplosion();
        this.x -= this.speed;
        this.playerShip.y + this.playerShip.h / 2 > this.y + this.h / 2 ? this.y += this.speed / 2 : this.y -= this.speed / 2;

        (
            (this.playerShip.y < this.y + this.h / 2) &&
            (this.playerShip.y + this.playerShip.h > this.y + this.h / 2) &&
            (this.playerShip.x + this.playerShip.w < this.x)
        ) && this.shot(); 
    }

    shipExplosion() {
        let e = new Event('explosion')
        this.dispatchEvent(e);
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
        setTimeout(() => this.reload = false, 1000);
    }
}

export default AlienShip