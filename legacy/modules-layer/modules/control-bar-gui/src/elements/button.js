import { GuiElement } from "./base.js";
import { classNames } from "../constants.js";

export class Button extends GuiElement {
    #element;
    #onClickHandler;
    
    constructor({ id, placeholder }) {
        super(id);

        this.#element = document.createElement("button");
        this.#element.id = this.id;
        this.#element.classList.add(classNames.button);
        this.#element.innerText = placeholder;

        this.#element.addEventListener("click", async () => {
            await this.#onClickHandler();
        });
    }

    get element() {
        return this.#element;
    }

    onClick(handler) {
        this.#onClickHandler = handler;
    }
}
