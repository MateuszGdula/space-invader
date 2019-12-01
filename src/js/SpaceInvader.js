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
        this.bg = new Background(this.ctx, SI_GAME.assets.bg, 0.5);
        this.ship = new Ship(this.ctx, SI_GAME.assets.ship, 2, 100);
        this.aliens = [];
        this.missles = [];
    }

    setListeners() {
        this.handleShot = this.handleShot.bind(this);
        this.ship.addEventListener('shot', this.handleShot);
    }

    start() {
        this.drawFrame();
        let alien = new AlienShip(this.ctx, SI_GAME.assets.alien1, 1.2, 100, this.ship);
        console.log(alien);
        this.aliens.push(alien);
        alien.addEventListener('shot', this.handleShot.bind(this));
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
        
        requestAnimationFrame(() => this.drawFrame());
    }

    handleShot(e) {
        let missle = new Missle(this.ctx, e.asset, e.x, e.y, e.speed, SI_GAME.data);
        this.missles.push(missle);

        let removeHandler = e => {
            this.missles.splice(this.missles.indexOf(missle), 1);
            missle.removeEventListener('remove', removeHandler);
        }
        missle.addEventListener('remove', removeHandler);
    }
}

export default SpaceInvader;
   