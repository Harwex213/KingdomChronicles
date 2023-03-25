import { State } from "../../models/states/state";
import { SEARCH_GAME_STATES } from "../../common/constants/states";

export const currentAuthorizedRoute = new State("");
export const currentProfileRoute = new State("");
export const playerState = new State("");
export const searchGameState = new State(SEARCH_GAME_STATES.IDLE);
