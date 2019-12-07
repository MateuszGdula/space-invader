import Background from "./Background";
import Ship from "./Ship";
import Missle from './Missle';
import AlienShip from './AlienShip';

class SpaceInvader {
    constructor() {
        this.setVars();
        this.setListeners();
        this.start();
    }

    setVars() {
        this.ctx = SI_GAME.data.ctx;
        this.bg = new Background(this.ctx, SI_GAME.objects.background);
        this.ship = new Ship(this.ctx, SI_GAME.objects.playerShip);
        this.aliens = [];
        this.missles = [];
    }

    setListeners() {
        this.handleShot = this.handleShot.bind(this);
        this.ship.addEventListener('shot', this.handleShot);
    }

    start() {
        this.drawFrame();
        let alien = new AlienShip(this.ctx, SI_GAME.objects.alienShips[0], this.ship);
        this.aliens.push(alien);
        alien.addEventListener('shot', this.handleShot.bind(this));
        alien.addEventListener('explosion', this.handleAlienExplosion.bind(this));
    }

    pause() {

    }

    stop() {

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
        
        requestAnimationFrame(() => this.drawFrame());
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
   