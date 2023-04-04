class Player {
    constructor() {
        this.index = -1;

        this.economic = {
            income: 0,
            outcome: 0,
            treasure: 0,
        };

        this.info = {
            name: "",
            kingdomName: "",
            motto: "",
            color: "#000",
        };

        this.domain = {
            regions: [],
            powerCenters: [],
        };

        this.currentBuildingsCost = {
            powerCenter: 0,
            road: 0,
        };
    }
}

export { Player };
