class Ship extends EventTarget {
    constructor(ctx, shipData) {
        super();
        this.setVars(ctx, shipData);
        this.addWeapon(SI_GAME.weapons[0]);
        this.setListeners();
    }

    setVars(ctx, { asset, speed, health}) {
        this.ctx = ctx;
        this.asset = asset;
        this.speed = speed;
        this.health = health;
        this.w = 100;
        this.h = 33;
        this.x = 10;
        this.y = SI_GAME.data.h / 2;
        this.alpha = 1;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.reload = false;
        this.weapons = [];
        this.eqWeapon = null;
    }
    
    setListeners() {
        this.keyDownHandler = this.keyDownHandler.bind(this);
        document.addEventListener('keydown', this.keyDownHandler);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        document.addEventListener('keyup', this.keyUpHandler);
    }

    keyDownHandler(e) {
        (e.key == 'Right' || e.key == 'ArrowRight') && (this.rightPressed = true);
        (e.key == 'Left' || e.key == 'ArrowLeft') && (this.leftPressed = true);
        (e.key == 'Up' || e.key == 'ArrowUp') && (this.upPressed = true);
        (e.key == 'Down' || e.key == 'ArrowDown') && (this.downPressed = true);
        e.key === " " && this.shot();
    }

    keyUpHandler(e) {
        (e.key == 'Right' || e.key == 'ArrowRight') && (this.rightPressed = false);
        (e.key == 'Left' || e.key == 'ArrowLeft') && (this.leftPressed = false);
        (e.key == 'Up' || e.key == 'ArrowUp') && (this.upPressed = false);
        (e.key == 'Down' || e.key == 'ArrowDown') && (this.downPressed = false);
    }

    addWeapon(weapon) {
        const newWeapon = {...weapon}
        this.weapons.push(newWeapon);
        this.eqWeapon = newWeapon;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = this.alpha
        this.ctx.drawImage(this.asset, this.x, this.y, this.w, this.h);
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        this.update();
    }

    update() {
        this.health <= 0 && this.shipExplosion();
        (this.rightPressed && (this.x + this.w < SI_GAME.data.w)) && (this.x += this.speed);
        (this.leftPressed && ( this.x > 0)) && (this.x -= this.speed);
        (this.downPressed && (this.y + this.h < SI_GAME.data.h)) && (this.y += this.speed);
        (this.upPressed && (this.y > 0)) && (this.y -= this.speed);
    }

    shipExplosion() {
        this.asset = SI_GAME.assets.explosion;
        this.w += 2.4;
        this.h += 0.8;
        this.alpha -= 0.03;
        this.alpha <= 0 && this.dispatchEvent(new Event('explosion'));
    }

    shot() {
        if(this.reload) return
        let e  = new Event('shot');
        e.x = this.x + this.w;
        e.y = this.y + Math.round(this.h / 2);
        e.asset = this.eqWeapon.asset;
        e.speed = this.eqWeapon.speed;
        e.dmg = this.eqWeapon.damage;
        e.owner = 'p1';
        this.dispatchEvent(e);
        this.reload = true;
        console.log(e.x, e.y);
        setTimeout(() => this.reload = false, this.eqWeapon.reloadTime);
    }
}

export default Ship;