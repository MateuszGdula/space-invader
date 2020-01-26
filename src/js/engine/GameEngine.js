import AlienShip from './AlienShip';
import Background from "./Background";
import Box from "./Box";
import Explosion from './Explosion';
import levels from './levels';
import Missle from './Missle';
import Ship from "./Ship";
import StatusBar from "./StatusBar";

class GameEngine {
    constructor() {
        this.setVars();
        this.setListeners();
    }
    
    setVars() {
        this.ctx = SI_GAME.data.ctx;
        this.bg = new Background(this.ctx, SI_GAME.objects.background);
        this.ship = new Ship(this.ctx, SI_GAME.objects.playerShip);
        this.statusBar = new StatusBar(this.ctx);

        this.aliens = [];
        this.explosions = [];
        this.missles = [];
        this.boxes = [];
        
        this.timerInterval = null;
        this.playState = false;
        this.timer = 0;
        this.score = 0;
    }

    setListeners() {
        this.handleShot = this.handleShot.bind(this);
        this.ship.addEventListener('shot', this.handleShot);
        this.handlePlayerExplosion = this.handlePlayerExplosion.bind(this);
        this.ship.addEventListener('explosion', this.handlePlayerExplosion);
    }

    newGame() {
        this.timerInterval && this.reset();
        this.play(levels.level1);
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
                            alien.addEventListener('remove', e => this.aliens.splice(this.aliens.indexOf(e.target), 1));
                            this.aliens.push(alien);
                        }
                        break;
                    case 'box':
                        const { content } = level[this.timer];
                        let box = new Box(this.ctx, SI_GAME.objects[content]);
                        box.addEventListener('remove', e => this.boxes.splice(this.boxes.indexOf(e.target), 1));
                        this.boxes.push(box);
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
        this.statusBar.draw(this.score, this.ship.shield, this.ship.eqWeapon);

        this.detectColisions();
        
        this.playState && requestAnimationFrame(() => this.drawFrame());
    }

    handleShot(e) {
        let missle = new Missle(this.ctx, e.missleData);
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
        let explosion = new Explosion(this.ctx, e.explosionData);
        explosion.addEventListener('remove', e => this.explosions.splice(this.explosions.indexOf(e.target), 1));
        this.explosions.push(explosion);
        this.aliens.splice(this.aliens.indexOf(e.target), 1);
        this.score += e.target.reward;
    }

    detectColisions() {
        //missles collisions
        this.missles.forEach((missle, i) => {
            if(
                (missle.owner === 'npc') &&
                (missle.x < this.ship.x + this.ship.w) &&
                (missle.x + missle.w > this.ship.x) &&
                (missle.y < this.ship.y + this.ship.h) &&
                (missle.y + missle.h > this.ship.y)
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
                (box.x + box.h > this.ship.x) &&
                (box.y < this.ship.y + this.ship.h) &&
                (box.y + box.h> this.ship.y)
            ) {
                box.type === 'shield' && (this.ship.shield = Math.min(this.ship.shield + box.content.shield, 100));
                box.type === 'weapon' && this.ship.addWeapon(box.content.weapon);
                this.boxes.splice(i, 1);
            }
        });
    }
}

export default GameEngine;
   