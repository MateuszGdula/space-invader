import { config } from "./SI_VARS";
import Background from "./Background";
import Ship from "./Ship";
import Missle from './Missle';

class SpaceInvader {
    constructor(assets) {
        this.setVars(assets);
        this.setListeners();
        this.start();
    }

    setVars(assets) {
        this.assets = assets;
        this.ctx = SI_CTX;
        this.cfg = config;
        this.bg = new Background(this.ctx, this.assets.bg, 0.5, this.cfg);
        this.ship = new Ship(this.ctx, this.assets.ship, 2, this.cfg);
        this.missles = [];
    }

    setListeners() {
        this.ship.addEventListener('shot', e => this.missles.push(new Missle(this.ctx, this.assets.missle1, e.x, e.y, 4, this.cfg)));
    }

    start() {
        this.drawFrame();
    }

    pause() {

    }

    stop() {

    }

    reset() {

    }

    drawFrame() {
        this.ctx.clearRect(0, 0, this.cfg.w, this.cfg.h);
        this.bg.draw();
        this.ship.draw();
        this.missles.forEach((missle, i) => {
            let rmStatus = missle.draw();
            if(rmStatus) {
                this.missles.splice(i, 1);
            };
        });
        
        requestAnimationFrame(() => this.drawFrame());
    }
}

export default SpaceInvader;
   