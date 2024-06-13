import { GuiElement } from "./base.js";

export class Input extends GuiElement {
    #element
    #elementContainer
    #elementPlaceholder
    #onChangeHandler
    
    constructor({ id, placeholder }) {
        super(id);
        
        this.#elementContainer = GuiElement.createControlContainer();
        this.#element = GuiElement.createControl(this.id);
        this.#elementPlaceholder = GuiElement.createPlaceholder(placeholder);

        this.#elementContainer.appendChild(this.#element);
        this.#elementContainer.appendChild(this.#elementPlaceholder);

        this.#element.addEventListener("change", async () => {
            await this.#onChangeHandler(this.#element.value);
        });
    }
    
    get element() {
        return this.#elementContainer;
    }

    onChange(handler) {
        this.#onChangeHandler = handler;
    }
}
