import { GAME_ACTIONS } from "shared/enums";
import { startBuildPowerCenter } from "./build/startBuildPowerCenter";
import { startDestroyPowerCenter } from "./destroy/startDestroyPowerCenter";

import { startBuildRoad } from "./build/startBuildRoad";
import { startDestroyRoad } from "./destroy/startDestroyRoad";

import { startBuildExternalBuilding } from "./build/startBuildExternalBuilding";
import { startDestroyExternalBuilding } from "./destroy/startDestroyExternalBuilding";

import { startBuildInternalBuilding } from "./build/startBuildInternalBuilding";

import { createTradeRoute } from "./trade/createTradeRoute";
import { raiseTradeRouteOrder } from "./trade/raiseTradeRouteOrder";
import { lowerTradeRouteOrder } from "./trade/lowerTradeRouteOrder";
import { destroyTradeRoute } from "./trade/destroyTradeRoute";

import { sendColonist } from "./colonization/sendColonist";
import { revokeColonist } from "./colonization/revokeColonist";

import { increasePowerCenterLevel } from "./powerCenter/increasePowerCenterLevel";
import { switchPowerCenterGrow } from "./powerCenter/switchPowerCenterGrow";

const actions = {
    [GAME_ACTIONS.START_BUILD_POWER_CENTER]: startBuildPowerCenter,
    [GAME_ACTIONS.START_DESTROY_POWER_CENTER]: startDestroyPowerCenter,

    [GAME_ACTIONS.START_BUILD_ROAD]: startBuildRoad,
    [GAME_ACTIONS.START_DESTROY_ROAD]: startDestroyRoad,

    [GAME_ACTIONS.START_BUILD_EXTERNAL_BUILDING]: startBuildExternalBuilding,
    [GAME_ACTIONS.START_DESTROY_EXTERNAL_BUILDING]: startDestroyExternalBuilding,

    [GAME_ACTIONS.START_BUILD_INTERNAL_BUILDING]: startBuildInternalBuilding,

    [GAME_ACTIONS.CREATE_TRADE_ROUTE]: createTradeRoute,
    [GAME_ACTIONS.INCREASE_TRADE_ROUTE_PRIORITY]: raiseTradeRouteOrder,
    [GAME_ACTIONS.DECREASE_TRADE_ROUTER_PRIORITY]: lowerTradeRouteOrder,
    [GAME_ACTIONS.DESTROY_TRADE_ROUTE]: destroyTradeRoute,

    [GAME_ACTIONS.SEND_COLONIST]: sendColonist,
    [GAME_ACTIONS.REVOKE_COLONIST]: revokeColonist,

    [GAME_ACTIONS.INCREASE_POWER_CENTER_LEVEL]: increasePowerCenterLevel,
    [GAME_ACTIONS.SWITCH_POWER_CENTER_GROW]: switchPowerCenterGrow,
};

export { actions };
