import { GuiElement } from "./base.js";

export class Range extends GuiElement {
    #element
    #elementContainer
    #elementPlaceholder
    #elementValueLabel
    #onChangeHandler

    constructor({ id, placeholder, rangeOptions = {} }) {
        super(id);

        this.#elementContainer = GuiElement.createControlContainer();
        this.#element = GuiElement.createControl(this.id);
        this.#configureRange(rangeOptions);
        this.#elementPlaceholder = GuiElement.createPlaceholder(placeholder);
        this.#elementValueLabel = GuiElement.createPlaceholder();
        this.#setValueLabel();

        this.#elementContainer.appendChild(this.#element);
        this.#elementContainer.appendChild(this.#elementValueLabel);
        this.#elementContainer.appendChild(this.#elementPlaceholder);

        this.#element.addEventListener("input", async () => {
            await this.#onChangeHandler(this.#element.value);
            this.#setValueLabel();
        });
    }
    
    #configureRange(rangeOptions) {
        const { min = 0, max = 1, step = 0.1 } = rangeOptions;
        
        this.#element.setAttribute("type", "range");
        this.#element.setAttribute("min", min);
        this.#element.setAttribute("max", max);
        this.#element.setAttribute("step", step);
    }

    get element() {
        return this.#elementContainer;
    }

    setValue(value) {
        this.#element.value = value;
        this.#setValueLabel();
    }
    
    #setValueLabel() {
        this.#elementValueLabel.innerText = "Value = " + this.#element.value;
    }

    onChange(handler) {
        this.#onChangeHandler = handler;
    }
}
