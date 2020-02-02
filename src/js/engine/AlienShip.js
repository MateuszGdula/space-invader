class AlienShip extends EventTarget {
    constructor(ctx, alienShipData, target, isChaser) {
        super();
        this.setVars(ctx, alienShipData, target, isChaser);
    }

    setVars(ctx, { asset, speed, shield, weapon, reward }, target, isChaser) {
        this.ctx = ctx;
        this.asset = asset;
        this.speedX = speed - Math.random() / 2;
        this.speedY = this.speedX / 2;
        this.shield = shield;
        this.w = SI_GAME.data.w * 0.08;
        this.h = SI_GAME.data.h * 0.05;
        this.x = SI_GAME.data.w;
        this.y = 1 + Math.floor(Math.random() * (SI_GAME.data.h - this.h))
        this.target = target;
        this.isChaser = isChaser;
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
        this.x -= this.speedX;
        
        //follow players ship when isChaser flag is true
        if (
            this.isChaser &&
            (this.target.y + this.target.h / 2) > (this.y + this.h / 2)
        ) {
            this.y += this.speedY;
        } else if (
            this.isChaser &&
            (this.target.y + this.target.h / 2) < (this.y + this.h / 2)
        ) {
            this.y -= this.speedY;
        }

        //shot when players ship is in the range
        if (
            (this.target.y < this.y + this.h / 2) &&
            (this.target.y + this.target.h > this.y + this.h / 2) &&
            (this.target.x + this.target.w < this.x)
        ) {
            this.shot();
        } 

        //remove ship when it leaves the window
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

    shipExplosion() {
        const e = new Event('explosion');
        const explosionData = {};
        explosionData.x = this.x;
        explosionData.y = this.y;
        explosionData.w = this.w;
        explosionData.h = this.h;
        explosionData.speedX = this.speedX * -1.3;
        explosionData.speedY = 0;
        explosionData.time = 30;
        e.explosionData = explosionData;
        this.dispatchEvent(e);
    }

    shot() {
        if(this.reload) return;
        const e  = new Event('shot');
        const missleData = {};
        missleData.asset = this.weapon.asset;
        missleData.w = this.weapon.w;
        missleData.h = this.weapon.h;
        missleData.x = this.x;
        missleData.y = this.y + Math.round(this.h / 2) - Math.round(this.weapon.h * SI_GAME.data.h / 2);
        missleData.speedX = this.weapon.speedX * -1;
        missleData.speedY = this.weapon.speedY;
        missleData.dmg = this.weapon.damage;
        missleData.owner = 'npc';
        e.missleData = missleData;
        this.dispatchEvent(e);
        this.reload = true;
        setTimeout(() => this.reload = false, this.weapon.reloadTime);
    }
}

export default AlienShip