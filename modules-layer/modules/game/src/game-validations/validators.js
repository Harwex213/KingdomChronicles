import { GAME_VALIDATIONS } from "shared/enums";

import { isPlayerOwnPowerCenter } from "./validations/isPlayerOwnPowerCenter";

import { canBuildPowerCenter } from "./validations/canBuildPowerCenter";
import { canPlacePowerCenter } from "./validations/canPlacePowerCenter";

import { canBuildRoad } from "./validations/canBuildRoad";
import { canPlaceRoad } from "./validations/canPlaceRoad";
import { canDestroyPlacedRoad } from "./validations/canDestroyPlacedRoad";

import { canBuildExternalBuilding } from "./validations/canBuildExternalBuilding";
import { canPlaceExternalBuilding } from "./validations/canPlaceExternalBuilding";
import { canDestroyPlacedExternalBuilding } from "./validations/canDestroyPlacedExternalBuilding";

import { canBuildInternalBuilding } from "./validations/canBuildInternalBuilding";
import { canIncreasePowerCenterLevel } from "./validations/canIncreasePowerCenterLevel";

import { canCreateTradeRoute } from "./validations/canCreateTradeRoute";
import { canSendTradeRoute } from "./validations/canSendTradeRoute";

import { canSendColonist } from "./validations/canSendColonist";
import { canRevokeColonist } from "./validations/canRevokeColonist";

const validators = {
    [GAME_VALIDATIONS.IS_PLAYER_OWN_POWER_CENTER]: isPlayerOwnPowerCenter,

    [GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER]: canBuildPowerCenter,
    [GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER]: canPlacePowerCenter,

    [GAME_VALIDATIONS.CAN_BUILD_ROAD]: canBuildRoad,
    [GAME_VALIDATIONS.CAN_PLACE_ROAD]: canPlaceRoad,
    [GAME_VALIDATIONS.CAN_DESTROY_PLACED_ROAD]: canDestroyPlacedRoad,

    [GAME_VALIDATIONS.CAN_BUILD_EXTERNAL_BUILDING]: canBuildExternalBuilding,
    [GAME_VALIDATIONS.CAN_PLACE_EXTERNAL_BUILDING]: canPlaceExternalBuilding,
    [GAME_VALIDATIONS.CAN_DESTROY_PLACED_EXTERNAL_BUILDING]: canDestroyPlacedExternalBuilding,

    [GAME_VALIDATIONS.CAN_BUILD_INTERNAL_BUILDING]: canBuildInternalBuilding,
    [GAME_VALIDATIONS.CAN_INCREASE_POWER_CENTER_LEVEL]: canIncreasePowerCenterLevel,

    [GAME_VALIDATIONS.CAN_CREATE_TRADE_ROUTE]: canCreateTradeRoute,
    [GAME_VALIDATIONS.CAN_SEND_TRADE_ROUTE]: canSendTradeRoute,

    [GAME_VALIDATIONS.CAN_SEND_COLONIST]: canSendColonist,
    [GAME_VALIDATIONS.CAN_REVOKE_COLONIST]: canRevokeColonist,
};

export { validators };
