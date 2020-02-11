class ScreenMessage extends EventTarget {
    constructor(ctx, message, displayTime, config, callback ) {
        super();
        this.setVars(ctx, message, displayTime, config, callback);
    }

    setVars(ctx, message, displayTime, config, callback) {
        this.ctx = ctx;
        this.message = message;
        this.displayTime = displayTime;
        this.x = config.x;
        this.y = config.y;
        this.font = config.font;
        this.fillStyle = config.fillStyle;
        this.textAlign = config.textAlign;
        this.callback = callback;
        this.alpha = 0;
        this.fadeIn = true;
        this.fadeOut = false;

        setTimeout(() => {
            console.log("ok");
            this.fadeIn = false;
            this.fadeOut = true;
        }, this.displayTime);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.textAlign = this.textAlign;
        this.ctx.globalAlpha = this.alpha;
        this.ctx.fillText(this.message, this.x, this.y);
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        this.update();
    }

    update() {
        if(this.fadeIn) {
            this.alpha < 1 ? this.alpha += 0.04 : this.fadeIn = false; 
        } else if (this.fadeOut) {
            this.alpha > 0 ? this.alpha -= 0.04 : this.dispatchEvent(new Event('remove'));
        }
    }
}

export default ScreenMessage;