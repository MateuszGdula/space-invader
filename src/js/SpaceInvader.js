import { config } from "./SI_VARS";
import Background from "./Background";

class SpaceInvader {
    constructor({bg, ship}) {
        this.ctx = SI_CTX;
        this.cfg = config;
        this.bg = new Background(this.ctx, bg, 0.5, this.cfg);
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
       // drawShip();
        requestAnimationFrame(() => this.drawFrame());
    }
}

export default SpaceInvader;