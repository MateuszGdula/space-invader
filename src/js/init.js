import '../scss/main.scss';
import {data, assets, gameObjects, weapons } from "./SI_VARS";
import SpaceInvader from './SpaceInvader';

function assetsLoader(assets) {
    return new Promise((resolve, reject) => {
        let assetsNum = Object.keys(assets).length;
        const loadedAssets = {};
        for (let key in assets) {
            loadedAssets[key] = new Image();
            loadedAssets[key].onload = () => {
                assetsNum--;
                if (assetsNum === 0) resolve(loadedAssets);
            };
            loadedAssets[key].src = assets[key];
        }
    });    
}

assetsLoader(assets).then(loadedAssets => {
    window.SI_GAME = {};
    SI_GAME.assets = loadedAssets;
    SI_GAME.data = data;
    SI_GAME.objects = gameObjects(loadedAssets);
    SI_GAME.weapons = weapons(loadedAssets);

    data.isMobile && screen.orientation.lock('landscape');

    SI_GAME.gameInstance = new SpaceInvader();
});