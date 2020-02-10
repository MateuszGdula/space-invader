class ScreenMessage extends EventTarget {
    constructor(ctx, text, displayTime, config, callback ) {
        this.setVars(ctx, text, displayTime, config, callback);
    }

    setVars(ctx, text, displayTime, config, callback) {
        this.ctx = ctx;
        this.text = text;
        this.displayTime = displayTime;
        this.w = config.w;
        this.h = config.h;
        this.x = config.x;
        this.y = config.y;
        this.font = config.font;
        this.fillStyle = config.fillStyle;
        this.textAlign = config.textAlign;
        this.callback = callback;
        this.alpha = 0;
        this.removeMessage = false;
    }

    draw() {

    }
}

export default ScreenMessage;