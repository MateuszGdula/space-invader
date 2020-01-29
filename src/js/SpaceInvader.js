/*
To do:
13. Show menu on back btn (mobiles)
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
        this.menuItems = document.querySelectorAll('.menu li');
        
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.assets = assets;
        this.game = null;
    }
    
    setListeners() {
        this.newGameBtn.addEventListener('click', this.newGameHandler.bind(this));
        this.resumeBtn.addEventListener('click', this.resumeHandler.bind(this));
        document.addEventListener('keydown', this.menuKeydownHandler.bind(this));
        
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
        if(!this.game.timerInterval) return;
        this.isMobile && this.gameContainer.requestFullscreen();
        this.game.resume();
        this.menu.classList.toggle('open');
    }

    menuKeydownHandler(e) {
        e.keyCode === 27 && this.pauseHandler();
        (e.keyCode === 38 || e.keyCode === 40) && this.menu.classList.contains('open') && this.switchMenuItem(e);
        e.keyCode === 13 && this.menu.classList.contains('open') && this.selectMenuItem();
    }

    pauseHandler() {
        this.game.playState ? this.game.pause() : this.game.resume();
        this.menu.classList.toggle('open');
        this.menuItems.forEach(item => item.classList.remove('selected'));
        this.resumeBtn.classList.add('selected');
    }

    switchMenuItem(e) {
        let itemIndex = Array.prototype.indexOf.call(this.menuItems, document.querySelector('.selected'));
        let newIndex;
        e.keyCode === 38 && itemIndex--;
        e.keyCode === 40 && itemIndex++;

        itemIndex < 0 ? newIndex = this.menuItems.length -1 : itemIndex > this.menuItems.length - 1 ? newIndex = 0 : newIndex = itemIndex;
        
        this.menuItems.forEach(item => item.classList.remove('selected'));
        this.menuItems[newIndex].classList.add('selected');
    }

    selectMenuItem() {
        document.querySelector('.selected').click();
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