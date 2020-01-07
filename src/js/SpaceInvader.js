/*
To do:
1. 
2. 
3. 
4. 
6. 
9  Add health booster and weapon boxes
10. Remove event driven clearing, add clearing function
5. Add a passibility to switch weapons
8. New Ships, missles, more levels
7. Add manifest and sw
*/

import Background from "./Background";
import Ship from "./Ship";
import Missle from './Missle';
import AlienShip from './AlienShip';
import Explosion from './Explosion';
import ShieldBox from "./ShieldBox";
import levels from './levels';
import WeaponBox from "./WeaponBox";

class SpaceInvader {
    constructor() {
        this.setVars();
        this.setListeners();
    }
    
    setVars() {
        this.ctx = SI_GAME.data.ctx;
        this.bg = new Background(this.ctx, SI_GAME.objects.background);
        this.ship = new Ship(this.ctx, SI_GAME.objects.playerShip);

        this.aliens = [];
        this.explosions = [];
        this.missles = [];
        this.boxes = [];

        this.menu = document.querySelector('.menu');
        this.newGameBtn = document.querySelector('.menu__new-game');
        this.resumeBtn = document.querySelector('.menu__resume');
        this.optionsBtn = document.querySelector('.menu__options');
        this.exitBtn = document.querySelector('.menu__exit');
        
        this.timerInterval = null;
        this.playState = false;
        this.timer = 0;
        this.score = 0;

        this.textWeaponX = 20;
        this.textWeaponY = SI_GAME.data.h - 20;
        this.textShieldX = 20;
        this.textShieldY = SI_GAME.data.h - 40;
        this.textScoreX = 20;
        this.textScoreY = SI_GAME.data.h - 60;
    }

    setListeners() {
        this.handleShot = this.handleShot.bind(this);
        this.ship.addEventListener('shot', this.handleShot);
        this.handlePlayerExplosion = this.handlePlayerExplosion.bind(this);
        this.ship.addEventListener('explosion', this.handlePlayerExplosion)
        this.newGameBtn.addEventListener('click', e => {
            this.timerInterval && this.reset();
            if (SI_GAME.data.isMobile) {
                document.querySelector('main').requestFullscreen();
                screen.orientation.lock('landscape');
            }
            this.play(levels.level1);
            this.menu.classList.toggle('open');
        });
        this.resumeBtn.addEventListener('click', e => {
            this.resume();
            this.menu.classList.toggle('open');
        });
        this.toggleMenuHandler = this.toggleMenuHandler.bind(this);
        document.addEventListener('keydown', this.toggleMenuHandler);
    }

    toggleMenuHandler(e) {
        if(e.keyCode !== 27) return;
        this.playState ? this.pause() : this.resume();
        this.menu.classList.toggle('open');
    }

    play(level) {
        this.playState = true;
        this.timerInterval = setInterval(() => {
            if(!this.playState) return;

            if(level[this.timer]) {
                switch (level[this.timer].type) {
                    case 'enemy':
                        const { index, number, chaser } = level[this.timer];
                        for(let i = 0; i < number; i++) {
                            let alien = new AlienShip(this.ctx, SI_GAME.objects.alienShips[index], this.ship, chaser);
                            alien.addEventListener('shot', this.handleShot.bind(this));
                            alien.addEventListener('explosion', this.handleAlienExplosion.bind(this));
                            this.aliens.push(alien);
                        }
                        break;
                    case 'shieldbox':
                        let shieldBox = new ShieldBox(this.ctx, SI_GAME.objects.shieldBox);
                        shieldBox.addEventListener('remove', e => this.boxes.splice(this.boxes.indexOf(e.target), 1));
                        this.boxes.push(shieldBox);
                        break;
                    case 'weaponbox':
                        let weaponBox = new WeaponBox(this.ctx, SI_GAME.objects.weaponBox);
                        weaponBox.addEventListener('remove', e => this.boxes.splice(this.boxes.indexOf(e.target), 1));
                        this.boxes.push(weaponBox);
                        break;
                }
            }

            this.timer ++;
        }, 1000);

        this.drawFrame();
    }

    pause() {
        this.playState = false;
    }

    resume() {
        this.playState = true
        this.drawFrame();
    }

    reset() {
        location.reload();
    }

    drawFrame() {
        this.ctx.clearRect(0, 0, SI_GAME.data.w, SI_GAME.data.h);
        this.bg.draw();
        this.ship.draw();
        this.missles.forEach(missle => missle.draw());
        this.aliens.forEach(alien => alien.draw());
        this.explosions.forEach(explosion => explosion.draw());
        this.boxes.forEach(box => box.draw());
        this.drawStatus();

        this.detectColisions();
        
        this.playState && requestAnimationFrame(() => this.drawFrame());
    }

    drawStatus() {
        this.ctx.beginPath();
        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillText(`Shield: ${Math.max(0, this.ship.shield)}%`, this.textShieldX, this.textShieldY);
        this.ctx.fillText(`Weapon: ${this.ship.eqWeapon.name}`, this.textWeaponX, this.textWeaponY);
        this.ctx.fillText(`Score: ${this.score}`, this.textScoreX, this.textScoreY);
        this.ctx.closePath();
    }

    handleShot(e) {
        let missle = new Missle(this.ctx, e.asset, e.x, e.y, e.speed, e.dmg, e.owner);
        this.missles.push(missle);

        let removeHandler = e => {
            this.missles.splice(this.missles.indexOf(missle), 1);
            missle.removeEventListener('remove', removeHandler);
        }
        missle.addEventListener('remove', removeHandler);
    }

    handlePlayerExplosion(e) {
        console.log('game over');
    }

    handleAlienExplosion(e) {
        let explosion = new Explosion(this.ctx, e.x, e.y, e.w, e.h);
        explosion.addEventListener('remove', e => this.explosions.splice(this.explosions.indexOf(e.target), 1));
        this.explosions.push(explosion);
        console.log(this.explosions);
        this.aliens.splice(this.aliens.indexOf(e.target), 1);
        this.score += e.target.reward;
    }

    detectColisions() {
        //missles collisions
        this.missles.forEach((missle, i) => {
            if(
                (missle.owner === 'npc') &&
                (missle.x < this.ship.x + this.ship.w) &&
                (missle.x > this.ship.x) &&
                (missle.y < this.ship.y + this.ship.h) &&
                (missle.y > this.ship.y)
            ) {
                this.ship.shield -= missle.dmg;
                this.missles.splice(i, 1);
            } else if (missle.owner === 'p1') {
                this.aliens.forEach((alien, j) => {
                    if(
                        (missle.x + missle.w > alien.x) &&
                        (missle.x < alien.x + alien.w) &&
                        (missle.y + missle.h > alien.y) &&
                        (missle.y < alien.y + alien.h) 
                    ) {
                        alien.shield -= missle.dmg;
                        this.missles.splice(i, 1);
                    }
                })
            }
        });
        //boxes collisions
        this.boxes.forEach((box, i) => {
            if(
                (box.x < this.ship.x + this.ship.w) &&
                (box.x > this.ship.x) &&
                (box.y < this.ship.y + this.ship.h) &&
                (box.y > this.ship.y)
            ) {
                box.content.shield && (this.ship.shield = Math.min(this.ship.shield + box.content.shield, 100));
                box.content.weapon && this.ship.addWeapon(box.content.weapon);
                this.boxes.splice(i, 1);
            }
        });
    }
}

export default SpaceInvader;
   