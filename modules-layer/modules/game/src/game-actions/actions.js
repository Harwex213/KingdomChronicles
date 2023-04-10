import { GAME_ACTIONS } from "shared/enums";
import { startBuildPowerCenter } from "./build/startBuildPowerCenter";
import { startDestroyPowerCenter } from "./destroy/startDestroyPowerCenter";

import { startBuildExternalBuilding } from "./build/startBuildExternalBuilding";
import { startDestroyExternalBuilding } from "./destroy/startDestroyExternalBuilding";

import { startBuildInternalBuilding } from "./build/startBuildInternalBuilding";

const actions = {
    [GAME_ACTIONS.START_BUILD_POWER_CENTER]: startBuildPowerCenter,
    [GAME_ACTIONS.START_DESTROY_POWER_CENTER]: startDestroyPowerCenter,

    [GAME_ACTIONS.START_BUILD_EXTERNAL_BUILDING]: startBuildExternalBuilding,
    [GAME_ACTIONS.START_DESTROY_EXTERNAL_BUILDING]: startDestroyExternalBuilding,

    [GAME_ACTIONS.START_BUILD_INTERNAL_BUILDING]: startBuildInternalBuilding,
};

export { actions };
