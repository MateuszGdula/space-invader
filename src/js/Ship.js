document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    (e.key == 'Right' || e.key == 'ArrowRight') && (rightPressed = true);
    (e.key == 'Left' || e.key == 'ArrowLeft') && (leftPressed = true);
    (e.key == 'Up' || e.key == 'ArrowUp') && (upPressed = true);
    (e.key == 'Down' || e.key == 'ArrowDown') && (downPressed = true);
}

function keyUpHandler(e) {
    (e.key == 'Right' || e.key == 'ArrowRight') && (rightPressed = false);
    (e.key == 'Left' || e.key == 'ArrowLeft') && (leftPressed = false);
    (e.key == 'Up' || e.key == 'ArrowUp') && (upPressed = false);
    (e.key == 'Down' || e.key == 'ArrowDown') && (downPressed = false);
}

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function drawShip() {
    ctx.beginPath();
    ctx.drawImage(ship, shipx, shipy, 100, 33);
    ctx.closePath();
    rightPressed &&  (shipx += 2);
    leftPressed &&  (shipx -= 2);
    upPressed &&  (shipy -= 2);
    downPressed &&  (shipy += 2);
   
}

let shipx = 10;
//let shipy = canvas.height /2;
