/*
To do:
1. 
2. 
3. 
4. 
6. 
9 
11.
12.
10.
5. Add a passibility to switch weapons
13. Block show menu on back btn (mobiles)
14. Refactor the menu
8. New Ships, missles, more levels
7. Add manifest and sw
*/

import GameEngine from './engine/GameEngine';

class SpaceInvader {
    constructor() {
        this.setVars()
        this.setListeners();
    }

    setVars() {
        this.menu = document.querySelector('.menu');
        this.newGameBtn = document.querySelector('.menu__new-game');
        this.resumeBtn = document.querySelector('.menu__resume');
        this.optionsBtn = document.querySelector('.menu__options');
        this.exitBtn = document.querySelector('.menu__exit');
        this.game = new GameEngine();
    }

    setListeners() {
        this.newGameBtn.addEventListener('click', this.newGameHandler.bind(this));
        this.resumeBtn.addEventListener('click', this.resumeHandler.bind(this));
        document.addEventListener('keydown', this.pauseHandler.bind(this));
    }

    newGameHandler() {
        this.game.newGame();
        this.menu.classList.toggle('open');
    }

    resumeHandler() {
        this.game.resume();
        this.menu.classList.toggle('open');
    }

    pauseHandler(e) {
        if(e.keyCode !== 27) return;
        this.playState ? this.game.pause() : this.game.resume();
        this.menu.classList.toggle('open');
    }
}

export default SpaceInvader;