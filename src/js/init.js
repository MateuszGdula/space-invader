import '../scss/main.scss';
import { getGameData, assets, gameObjects, weapons } from "./config";
import SpaceInvader from './engine/GameEngine';

function assetsLoader(assets) {
    return new Promise((resolve, reject) => {
        let assetsNum = Object.keys(assets).length;
        const loadedAssets = {};
        for (let key in assets) {
            loadedAssets[key] = new Image();
            loadedAssets[key].onload = () => {
                assetsNum--;
                assetsNum === 0 && resolve(loadedAssets);
            };
            loadedAssets[key].src = assets[key];
        }
    });    
}

assetsLoader(assets).then(loadedAssets => {
    window.SI_GAME = {};
    SI_GAME.assets = loadedAssets;
    SI_GAME.data = getGameData();
    SI_GAME.objects = gameObjects(loadedAssets);
    SI_GAME.weapons = weapons(loadedAssets);
    SI_GAME.gameInstance = new SpaceInvader();
});

document.querySelector('main').requestFullscreen();
screen.orientation.lock('landscape');
