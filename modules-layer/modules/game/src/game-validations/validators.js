import { GAME_VALIDATIONS } from "shared/enums";

import { canBuildPowerCenter } from "./validations/canBuildPowerCenter";
import { canPlacePowerCenter } from "./validations/canPlacePowerCenter";

import { canBuildRoad } from "./validations/canBuildRoad";
import { canPlaceRoad } from "./validations/canPlaceRoad";
import { canDestroyPlacedRoad } from "./validations/canDestroyPlacedRoad";

import { canBuildExternalBuilding } from "./validations/canBuildExternalBuilding";
import { canPlaceExternalBuilding } from "./validations/canPlaceExternalBuilding";
import { canDestroyPlacedExternalBuilding } from "./validations/canDestroyPlacedExternalBuilding";
import { canBuildInternalBuilding } from "./validations/canBuildInternalBuilding";

const validators = {
    [GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER]: canBuildPowerCenter,
    [GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER]: canPlacePowerCenter,

    [GAME_VALIDATIONS.CAN_BUILD_ROAD]: canBuildRoad,
    [GAME_VALIDATIONS.CAN_PLACE_ROAD]: canPlaceRoad,
    [GAME_VALIDATIONS.CAN_DESTROY_PLACED_ROAD]: canDestroyPlacedRoad,

    [GAME_VALIDATIONS.CAN_BUILD_EXTERNAL_BUILDING]: canBuildExternalBuilding,
    [GAME_VALIDATIONS.CAN_PLACE_EXTERNAL_BUILDING]: canPlaceExternalBuilding,
    [GAME_VALIDATIONS.CAN_DESTROY_PLACED_EXTERNAL_BUILDING]: canDestroyPlacedExternalBuilding,

    [GAME_VALIDATIONS.CAN_BUILD_INTERNAL_BUILDING]: canBuildInternalBuilding,
};

export { validators };
