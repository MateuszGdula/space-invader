import AlienShip from './AlienShip';
import Background from "./Background";
import Box from "./Box";
import Explosion from './Explosion';
import stages from './stages';
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
        this.ship = new Ship(this.ctx, this, SI_GAME.objects.playerShip);
        this.statusBar = new StatusBar(this.ctx);

        this.aliens = [];
        this.explosions = [];
        this.missles = [];
        this.boxes = [];
        
        this.playState = false;
        this.timerInterval = null;
        this.timer = 0;
        this.score = 0;
        this.stage = 0;
    }

    setListeners() {
        this.handleShot = this.handleShot.bind(this);
        this.ship.addEventListener('shot', this.handleShot);
        this.handlePlayerExplosion = this.handlePlayerExplosion.bind(this);
        this.ship.addEventListener('explosion', this.handlePlayerExplosion);
    }

    newGame() {
        this.timerInterval && this.reset();
        this.play(stages[this.stage]);
        this.drawFrame();
    }

    play(stage) {
        this.playState = true;
        this.timerInterval = setInterval(() => {
            if(!this.playState) return;

            if(stage[this.timer]) {
                switch (stage[this.timer].type) {
                    case 'enemy':
                        const { index, number, chaser } = stage[this.timer];
                        for(let i = 0; i < number; i++) {
                            let alien = new AlienShip(this.ctx, SI_GAME.objects.alienShips[index], this.ship, chaser);
                            alien.addEventListener('shot', this.handleShot.bind(this));
                            alien.addEventListener('explosion', this.handleAlienExplosion.bind(this));
                            alien.addEventListener('remove', e => this.aliens.splice(this.aliens.indexOf(e.target), 1));
                            this.aliens.push(alien);
                        }
                        break;
                    case 'box':
                        const { content } = stage[this.timer];
                        let box = new Box(this.ctx, SI_GAME.objects[content]);
                        box.addEventListener('remove', e => this.boxes.splice(this.boxes.indexOf(e.target), 1));
                        this.boxes.push(box);
                        break;
                    case 'endStage':
                        this.setNextStage();
                }
            }
            this.timer ++;
        }, 1000);
    }

    pause() {
        this.playState = false;
    }

    resume() {
        this.playState = true
        this.drawFrame();
    }

    reset() {
        clearInterval(this.timerInterval);
        this.ship.removeListeners();
        this.setVars();
        this.setListeners();
    }

    setNextStage() {
        this.stage ++;
        clearInterval(this.timerInterval);
        this.timer = 0;
        this.play(stages[this.stage]);
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

        this.detectCollisions();
        
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
        console.log("go");
        this.addExplosion(e.explosionData);
    }

    handleAlienExplosion(e) {
        this.addExplosion(e.explosionData);
        this.aliens.splice(this.aliens.indexOf(e.target), 1);
        this.score += e.target.reward;
    }

    handleMissleExplosion(missle, ship) {
        const explosionData = {};
        explosionData.x = missle.owner === 'npc' ? missle.x :  missle.x + missle.w;
        explosionData.y = Math.min(ship.y + ship.h - (missle.h / 2), Math.max(missle.y, ship.y - (missle.h / 2)));
        explosionData.w = missle.h;
        explosionData.h = missle.h;
        explosionData.speedX = missle.speedX / 5;
        explosionData.speedY = missle.speedY / 5;
        explosionData.time = 10;
        this.addExplosion(explosionData);
    }

    addExplosion(explosionData) {
        let explosion = new Explosion(this.ctx, explosionData);
        explosion.addEventListener('remove', e => this.explosions.splice(this.explosions.indexOf(e.target), 1));
        this.explosions.push(explosion);
    }

    detectCollisions() {
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
                this.handleMissleExplosion(missle, this.ship);
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
                        this.handleMissleExplosion(missle, alien);
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
   