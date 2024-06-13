import { classNames } from "../constants.js";

export class GuiElement {
    constructor(id) {
        this.id = id ?? Math.random().toString(16).slice(2);
    }
    
    static createPlaceholder(content) {
        const placeholder = document.createElement("p");
        placeholder.classList.add(classNames.placeholder);
        placeholder.innerText = content;
        return placeholder;
    }

    static createControlContainer(isInline = false) {
        const elementContainer = document.createElement("div");
        elementContainer.classList.add(classNames.container);
        if (isInline) {
            elementContainer.classList.add(classNames.inlineContainer);
        }
        return elementContainer;
    }

    static createControl(id, tagName = "input") {
        const element = document.createElement(tagName);
        element.id = id;
        element.classList.add(classNames.control);
        return element;
    }
}
