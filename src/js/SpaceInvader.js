import { config } from "./SI_VARS";
import Background from "./Background";
import Ship from "./Ship";

class SpaceInvader {
    constructor({bg, ship}) {
        this.ctx = SI_CTX;
        this.cfg = config;
        this.bg = new Background(this.ctx, bg, 0.5, this.cfg);
        this.ship = new Ship(this.ctx, ship, 2, this.cfg);
        this.start();
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
        requestAnimationFrame(() => this.drawFrame());
    }
}

export default SpaceInvader;
   