/*
To do:
13. Block show menu on back btn (mobiles)
14. Refactor the menu
8. New Ships, missles, more levels
7. Add manifest and sw
*/
import { getGameData, getGameObjects, getWeapons } from "./config";
import GameEngine from './engine/GameEngine';

class SpaceInvader {
    constructor(assets) {
        this.setVars(assets)
        this.setListeners();
        this.runGame();
    }
    
    setVars(assets) {
        this.gameContainer = document.querySelector('main');
        this.overlay = document.querySelector('.init-overlay');
        this.overlayText = document.querySelector('.init-overlay__text');
        this.menu = document.querySelector('.menu');
        this.newGameBtn = document.querySelector('.menu__new-game');
        this.resumeBtn = document.querySelector('.menu__resume');
        //this.optionsBtn = document.querySelector('.menu__options');
        //this.exitBtn = document.querySelector('.menu__exit');
        
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.assets = assets;
        this.game = null;
    }
    
    setListeners() {
        this.newGameBtn.addEventListener('click', this.newGameHandler.bind(this));
        this.resumeBtn.addEventListener('click', this.resumeHandler.bind(this));
        document.addEventListener('keydown', this.pauseHandler.bind(this));
        
        const removeOverlayEvent = this.isMobile ? 'click' : 'keydown';
        this.removeOverlay = this.removeOverlay.bind(this);
        document.addEventListener(removeOverlayEvent, this.removeOverlay);

        this.gameContainer.addEventListener('fullscreenchange', this.fullScreenHandler.bind(this));
    }
    
    runGame() {
        window.SI_GAME = {};
        SI_GAME.isMobile = this.isMobile;
        SI_GAME.assets = this.assets;
        SI_GAME.data = getGameData();
        SI_GAME.objects = getGameObjects(this.assets);
        SI_GAME.weapons = getWeapons(this.assets);
        
        this.game = new GameEngine();

        this.overlayText.textContent = this.isMobile ? 'Touch the screen to continue' : 'Press any key to continue';
    }

    removeOverlay(e) {
        const removeOverlayEvent = this.isMobile ? 'click' : 'keydown';
        this.isMobile && this.gameContainer.requestFullscreen();
        this.overlay.style.display = 'none';
        document.removeEventListener(removeOverlayEvent, this.rmoveOverlay);
    }

    newGameHandler() {
        this.game.newGame();
        this.menu.classList.toggle('open');
    }

    resumeHandler() {
        this.isMobile && this.gameContainer.requestFullscreen();
        this.game.resume();
        this.menu.classList.toggle('open');
    }

    pauseHandler(e) {
        if(e.keyCode !== 27) return;
        this.game.playState ? this.game.pause() : this.game.resume();
        this.menu.classList.toggle('open');
    }

    async fullScreenHandler(e) {
        if (document.fullscreenElement !== null) {
            try {
                await screen.orientation.lock('landscape');
            } catch(e) {
                console.log(e);
            }
        } else {
            this.game.pause();
            this.menu.classList.add('open');
        }
    }
}

export default SpaceInvader;