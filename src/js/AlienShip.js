class AlienShip extends EventTarget {
    constructor(ctx, img, speed, health, playerShip) {
        super();
        this.setVars(ctx, img, speed, health, playerShip);
        this.setListeners();
    }

    setVars(ctx, img, speed, health, playerShip) {
        this.ctx = ctx;
        this.img = img;
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

    setListeners() {

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.x -= this.speed;
        this.playerShip.y + this.playerShip.h / 2 > this.y + this.h / 2 ? this.y += this.speed / 2 : this.y -= this.speed / 2;
/*         if(
            (this.playerShip.y < this.y + this.h / 2) &&
            (this.playerShip.y + this.playerShip.h > this.y + this.h / 2)
            ) this.shot(); */
        ((this.playerShip.y < this.y + this.h / 2) && (this.playerShip.y + this.playerShip.h > this.y + this.h / 2)) && this.shot(); 
    }

    shot() {
        console.log("shot")
        if(this.reload) return
        let e  = new Event('shot');
        e.asset = this.weapon.asset;
        e.x = this.x;
        e.y = this.y + Math.round(this.h / 2);
        e.speed = this.weapon.speed * -1;
        this.dispatchEvent(e);
        this.reload = true;
        setTimeout(() => this.reload = false, 1000);
    }
}

export default AlienShip