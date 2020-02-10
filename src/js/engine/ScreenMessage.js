class ScreenMessage extends EventTarget {
    constructor(ctx, message, displayTime, config, callback ) {
        super();
        console.log('message');
        this.setVars(ctx, message, displayTime, config, callback);
    }

    setVars(ctx, message, displayTime, config, callback) {
        this.ctx = ctx;
        this.message = message;
        this.displayTime = displayTime;
        this.x = config.x;
        this.y = config.y;
        console.log(this.x)
        console.log(this.y);
        this.font = config.font;
        this.fillStyle = config.fillStyle;
        this.textAlign = config.textAlign;
        this.callback = callback;
        this.alpha = 0;
        this.removeMessage = false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.textAlign = this.textAlign;
        //this.ctx.globalAlpha = this.alpha;
        this.ctx.fillText(this.message, this.x, this.y);
        this.ctx.closePath();
        this.update();
    }

    update() {

    }
}

export default ScreenMessage;