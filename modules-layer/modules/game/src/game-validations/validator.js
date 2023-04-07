import { validators } from "./validators";

class Validator {
    #gameState;

    constructor(gameState) {
        this.#gameState = gameState;
    }

    validate(name, params) {
        const action = validators[name];
        if (action) {
            return action({
                gameState: this.#gameState,
                ...params,
            });
        }
    }
}

export { Validator };
