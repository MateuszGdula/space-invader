class AlienShip extends EventTarget {
    constructor(ctx, alienShipData, target, chaser) {
        super();
        this.setVars(ctx, alienShipData, target, chaser);
    }

    setVars(ctx, { asset, speed, shield, weapon, reward }, target, chaser) {
        this.ctx = ctx;
        this.asset = asset;
        this.speed = speed - Math.random() / 2;
        this.shield = shield;
        this.w = SI_GAME.data.w * 0.08;
        this.h = SI_GAME.data.h * 0.05;
        this.x = SI_GAME.data.w;
        this.y = 1 + Math.floor(Math.random() * (SI_GAME.data.h - this.h))
        this.target = target;
        this.chaser = chaser;
        this.reload = false;
        this.weapon = weapon;
        this.reward = reward;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.shield <=0 && this.shipExplosion();
        this.x -= this.speed;
        
        (
            this.chaser &&
            (this.target.y + this.target.h / 2) > (this.y + this.h / 2)
        ) ? 
        this.y += this.speed / 2 :
        this.chaser && (this.y -= this.speed / 2);

        (
            (this.target.y < this.y + this.h / 2) &&
            (this.target.y + this.target.h > this.y + this.h / 2) &&
            (this.target.x + this.target.w < this.x)
        ) && this.shot(); 
    }

    shipExplosion() {
        let e = new Event('explosion');
        e.x = this.x;
        e.y = this.y;
        e.w = this.w;
        e.h = this.h;
        this.dispatchEvent(e);
    }

    shot() {
        if(this.reload) return;
        let e  = new Event('shot');
        let missleData = {};
        missleData.asset = this.weapon.asset;
        missleData.w = this.weapon.w;
        missleData.h = this.weapon.h;
        missleData.x = this.x;
        missleData.y = this.y + Math.round(this.h / 2);
        missleData.speed = this.weapon.speed * -1;
        missleData.dmg = this.weapon.damage;
        missleData.owner = 'npc';
        e.missleData = missleData;
        this.dispatchEvent(e);
        this.reload = true;
        setTimeout(() => this.reload = false, this.weapon.reloadTime);
    }
}

export default AlienShip