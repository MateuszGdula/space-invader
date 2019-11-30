import {assets} from "./SI_VARS";
import SpaceInvader from './SpaceInvader';

async function assetsLoader(assets) {
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
    const game = new SpaceInvader(loadedAssets);
});