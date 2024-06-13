import { GuiElement } from "./base.js";

export class Checkbox extends GuiElement {
    #element
    #elementContainer
    #elementPlaceholder
    #onChangeHandler

    constructor({ id, placeholder }) {
        super(id);

        this.#elementContainer = GuiElement.createControlContainer(true);
        this.#element = GuiElement.createControl(this.id);
        this.#configureCheckbox();
        this.#elementPlaceholder = GuiElement.createPlaceholder(placeholder);
        this.#elementPlaceholder.style.width = "100%";

        this.#elementContainer.appendChild(this.#element);
        this.#elementContainer.appendChild(this.#elementPlaceholder);

        this.#element.addEventListener("change", async () => {
            await this.#onChangeHandler(this.#element.checked);
        });
    }

    #configureCheckbox() {
        this.#element.setAttribute("type", "checkbox");
    }

    get element() {
        return this.#elementContainer;
    }

    setValue(value) {
        this.#element.value = value;
    }

    setChecked(boolean) {
        this.#element.checked = boolean;
    }
    
    onChange(handler) {
        this.#onChangeHandler = handler;
    }
}
