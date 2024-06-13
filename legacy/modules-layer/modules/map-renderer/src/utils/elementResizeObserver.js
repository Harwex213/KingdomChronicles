export class ElementResizeObserver {
    constructor(element) {
        this._subscribers = [];
        const boundingRect = element.getBoundingClientRect();
        this.width = boundingRect.width;
        this.height = boundingRect.height;

        const resizeObserver = new ResizeObserver((entries) => {
            const updatedElement = entries[0];
            const contentBoxSize = updatedElement.contentBoxSize[0];
            const newSizes = { width: contentBoxSize.inlineSize, height: contentBoxSize.blockSize };
            this.width = newSizes.width;
            this.height = newSizes.height;

            this._notify(newSizes);
        });

        resizeObserver.observe(element);
    }

    subscribe(subscriber) {
        this._subscribers.push(subscriber);
    }

    _notify(newSizes) {
        for (const subscriber of this._subscribers) {
            subscriber.update(newSizes);
        }
    }
}
