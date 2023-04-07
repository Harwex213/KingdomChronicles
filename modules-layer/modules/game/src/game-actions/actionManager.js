import { actions } from "./actions";
import { Validator } from "../game-validations/validator";

class ActionManager {
    #gameState;
    #gameValidator;

    constructor(gameState) {
        this.#gameState = gameState;
        this.#gameValidator = new Validator(gameState);
    }

    handleAction(name, params) {
        const action = actions[name];
        if (action) {
            action({
                gameState: this.#gameState,
                gameValidator: this.#gameValidator,
                ...params,
            });
        }
    }
}

export { ActionManager };
