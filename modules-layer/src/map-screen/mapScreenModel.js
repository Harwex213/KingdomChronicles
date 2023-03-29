import { mapSizeTypes, waterBalanceTypes } from "models/map/index.js";
import { makeAutoObservable } from "mobx";
import { generateMap } from "./actions/generateMap.js";
import { renderMap, initRenderer, disposeRenderer } from "./actions/renderMap/renderMap.js";

class MapScreenModel {
    mapSizesType = mapSizeTypes.SMALL;
    waterBalanceType = waterBalanceTypes.BALANCE;
    seedRandom = undefined;
    devBiomsRender = false;
    devRegionsRender = false;

    _hadInit = false;
    _isExecuting = false;

    constructor() {
        makeAutoObservable(this, {
            init: false,
            dispose: false,
            action: false,
            _hadInit: false,
            _isExecuting: false,
        });
    }

    init({ rendererContainerSelector }) {
        if (this._hadInit) {
            return;
        }

        initRenderer({ containerSelector: rendererContainerSelector });

        this._hadInit = true;
    }

    dispose() {
        if (!this._hadInit) {
            return;
        }

        disposeRenderer();

        this._hadInit = false;
    }

    async action() {
        if (this._isExecuting || this._hadInit === false) {
            return;
        }
        this._isExecuting = true;

        const map = generateMap({
            seedRandom: this.seedRandom,
            mapSizesType: this.mapSizesType,
            waterBalanceType: this.waterBalanceType,
        });
        await renderMap(map, {
            devBiomsRender: this.devBiomsRender,
            devRegionsRender: this.devRegionsRender,
        });

        this._isExecuting = false;
    }

    setMapSizesType(newMapSizesType) {
        this.mapSizesType = newMapSizesType;
        this.action();
    }

    setWaterBalanceType(newWaterBalanceType) {
        this.waterBalanceType = newWaterBalanceType;
        this.action();
    }

    setSeedRandom(newSeedRandom) {
        if (this.seedRandom === "") {
            this.seedRandom = undefined;
        } else {
            this.seedRandom = newSeedRandom;
        }
        this.action();
    }

    markDevBiomsRender() {
        this.devBiomsRender = !this.devBiomsRender;
        this.action();
    }

    markDevRegionsRender() {
        this.devRegionsRender = !this.devRegionsRender;
        this.action();
    }
}

const mapScreenModel = new MapScreenModel();

export { mapScreenModel };
