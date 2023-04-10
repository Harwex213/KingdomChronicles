import { GAME_ACTIONS } from "shared/enums";
import { startBuildingPowerCenter } from "./build/startBuildingPowerCenter";

const actions = {
    [GAME_ACTIONS.START_BUILD_POWER_CENTER]: startBuildingPowerCenter,
};

export { actions };
