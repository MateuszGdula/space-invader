class StatusBar {
    constructor(ctx) {
        this.setVars(ctx);
    }

    setVars(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = SI_GAME.data.h - SI_GAME.data.statusBarHeight
        this.w = SI_GAME.data.w;
        this.h = SI_GAME.data.statusBarHeight;

        this.scoreX = 30;
        this.scoreY = SI_GAME.data.h - 35;
        this.shieldX = 30;
        this.shieldY = SI_GAME.data.h - 15;
        this.weaponX = 240;
        this.weaponY = SI_GAME.data.h - 20;

        this.scoreIcon = SI_GAME.assets.scoreIcon;
        this.scoreIconX = this.scoreX - 15;
        this.scoreIconY = this.scoreY- 10;
        this.scoreIconSize = 10;

        this.shieldIcon = SI_GAME.assets.shieldIcon;
        this.shieldIconX = this.shieldX - 15;
        this.shieldIconY = this.shieldY- 10;
        this.shieldIconSize = 10;

        this.weaponIcon = SI_GAME.assets.weaponIcon;
        this.weaponIconX = this.weaponX - 25;
        this.weaponIconY = this.weaponY- 18;
        this.weaponIconSize = 20;
    }

    draw(score, shield, weapon) {
        this.ctx.beginPath();

        this.ctx.fillStyle ='#773819';
        this.ctx.fillRect(this.x, this.y, this.w, this.h);

        this.ctx.strokeStyle ='#21636c';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(this.x, this.y, this.w, this.h);

        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillText(`Score: ${score}`, this.scoreX, this.scoreY);
        this.ctx.fillText(`Shield: ${Math.max(0, shield)}%`, this.shieldX, this.shieldY);

        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Weapon: ${weapon}`, this.weaponX, this.weaponY);

        this.ctx.drawImage(this.scoreIcon, this.scoreIconX, this.scoreIconY, this.scoreIconSize, this.scoreIconSize);
        this.ctx.drawImage(this.shieldIcon, this.shieldIconX, this.shieldIconY, this.shieldIconSize, this.shieldIconSize);
        this.ctx.drawImage(this.weaponIcon, this.weaponIconX, this.weaponIconY, this.weaponIconSize, this.weaponIconSize);
        this.ctx.closePath();
    }
}

export default StatusBar;