import { GAME_VALIDATIONS } from "shared/enums";
import { canBuildPowerCenter } from "./validations/canBuildPowerCenter";
import { canPlacePowerCenter } from "./validations/canPlacePowerCenter";
import { canRemovePlacedRoad } from "./validations/canRemovePlacedRoad";
import { canBuildRoad } from "./validations/canBuildRoad";
import { canPlaceRoad } from "./validations/canPlaceRoad";

const validators = {
    [GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER]: canBuildPowerCenter,
    [GAME_VALIDATIONS.CAN_BUILD_ROAD]: canBuildRoad,
    [GAME_VALIDATIONS.CAN_PLACE_ROAD]: canPlaceRoad,
    [GAME_VALIDATIONS.CAN_REMOVE_PLACED_ROAD]: canRemovePlacedRoad,
    [GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER]: canPlacePowerCenter,
};

export { validators };
