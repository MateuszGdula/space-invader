/*
To do:
1. 
2. 
3. Add a passibility to play/pause the game 
4. Add UI elements: heath bar, weapons, score
5. Add a passibility to switch weapons
6. Add responsiveness
7. Add manifest and sw
8. New Ships, missles, more levels
*/

import Background from "./Background";
import Ship from "./Ship";
import Missle from './Missle';
import AlienShip from './AlienShip';
import levels from './levels';

class SpaceInvader {
    constructor() {
        this.setVars();
        this.setListeners();
        this.start(levels.level1);
    }

    setVars() {
        this.ctx = SI_GAME.data.ctx;
        this.bg = new Background(this.ctx, SI_GAME.objects.background);
        this.ship = new Ship(this.ctx, SI_GAME.objects.playerShip);
        this.aliens = [];
        this.missles = [];
        this.score = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.playState = false;
    }

    setListeners() {
        this.handleShot = this.handleShot.bind(this);
        this.ship.addEventListener('shot', this.handleShot);
        this.handlePlayerExplosion = this.handlePlayerExplosion.bind(this);
        this.ship.addEventListener('explosion', this.handlePlayerExplosion)
        document.addEventListener('keydown', e => {
            e.keyCode === 27 && this.pause();
            e.keyCode === 13 && this.resume();
        });
    }

    start(level) {
        this.playState = true;
        this.timerInterval = setInterval(() => {
            if(!this.playState) return;

            if(level[this.timer]) {
                const { type, index, number, chaser } = level[this.timer];
                switch (type) {
                    case 'enemy':
                        for(let i = 0; i < number; i++) {
                            let alien = new AlienShip(this.ctx, SI_GAME.objects.alienShips[index], this.ship, chaser);
                            alien.addEventListener('shot', this.handleShot.bind(this));
                            alien.addEventListener('explosion', this.handleAlienExplosion.bind(this));
                            this.aliens.push(alien);
                        }
                        break;
                    case 'weapon':
                        //spawn weapon box
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

    }

    drawFrame() {
        this.ctx.clearRect(0, 0, SI_GAME.data.w, SI_GAME.data.h);
        this.bg.draw();
        this.ship.draw();
        this.missles.forEach(missle => missle.draw());
        this.aliens.forEach(alien => alien.draw());

        this.detectColisions();
        
        this.playState && requestAnimationFrame(() => this.drawFrame());
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
        this.aliens.splice(this.aliens.indexOf(e.target), 1);
    }

    detectColisions() {
        
        this.missles.forEach((missle, i) => {
            if(
                (missle.owner === 'npc') &&
                (missle.x < this.ship.x + this.ship.w) &&
                (missle.x > this.ship.x) &&
                (missle.y < this.ship.y + this.ship.h) &&
                (missle.y > this.ship.y)
            ) {
                this.ship.health -= missle.dmg;
                this.missles.splice(i, 1);
            } else if (missle.owner === 'p1') {
                this.aliens.forEach((alien, j) => {
                    if(
                        (missle.x + missle.w > alien.x) &&
                        (missle.x < alien.x + alien.w) &&
                        (missle.y + missle.h > alien.y) &&
                        (missle.y < alien.y + alien.h) 
                    ) {
                        alien.health -= missle.dmg;
                        this.missles.splice(i, 1);
                    }
                })
            }
        });
    }
}

export default SpaceInvader;
   