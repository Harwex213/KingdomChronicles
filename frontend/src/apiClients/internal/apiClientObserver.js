const EVENT_NAMES = {
    BEFORE_REQUEST: "BEFORE_REQUEST",
    AFTER_RESPONSE: "AFTER_RESPONSE",
    NOT_AUTHORIZED: "NOT_AUTHORIZED",
    CONNECTION_ERROR: "CONNECTION_ERROR",
};

const subscribers = {
    [EVENT_NAMES.BEFORE_REQUEST]: [],
    [EVENT_NAMES.AFTER_RESPONSE]: [],
    [EVENT_NAMES.NOT_AUTHORIZED]: [],
    [EVENT_NAMES.CONNECTION_ERROR]: [],
};

const subscribe = (eventName, callback) => {
    if (typeof EVENT_NAMES[eventName] === "undefined") {
        throw Error("apiClient.subscribe received not existed event name");
    }

    subscribers[eventName].push(callback);
};

const notify = (eventName) => {
    subscribers[eventName].forEach((callback) => {
        callback();
    });
};

export { EVENT_NAMES, subscribe, notify };
