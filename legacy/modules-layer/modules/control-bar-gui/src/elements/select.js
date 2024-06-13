import { GuiElement } from "./base.js";

export class Select extends GuiElement {
    #element
    #elementContainer
    #elementPlaceholder
    #onChangeHandler
    
    constructor({ id, placeholder }) {
        super(id);

        this.#elementContainer = GuiElement.createControlContainer();
        this.#element = GuiElement.createControl(this.id, "select");
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

    addOption(name, value) {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = name;
        this.#element.appendChild(option);
    }

    setValue(value) {
        this.#element.value = value;
    }

    onChange(handler) {
        this.#onChangeHandler = handler;
    }
}
