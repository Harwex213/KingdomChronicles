import { GAME_ACTIONS } from "models/game";
import { powerCenterBuilded } from "../handleNextTick/powerCenterBuilded";
import { startBuildingPowerCenter } from "./build/startBuildingPowerCenter";

const actions = {
    [GAME_ACTIONS.POWER_CENTER_BUILDED]: powerCenterBuilded,
    [GAME_ACTIONS.START_BUILD_POWER_CENTER]: startBuildingPowerCenter,
};

export { actions };
