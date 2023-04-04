import { POSSIBLE_ACTIONS } from "../../constants/possibleActions";
import { buildPowerCenter } from "./build/buildPowerCenter";

const actions = {
    [POSSIBLE_ACTIONS.BUILD_ACTIONS.POWER_CENTER]: buildPowerCenter,
};

export { actions };
