import { actions } from "./actions";

class ActionManager {
    #gameState;

    constructor(gameState) {
        this.#gameState = gameState;
    }

    handleAction(name, params) {
        const action = actions[name];
        if (action) {
            action(params);
        }
    }
}

export { ActionManager };
