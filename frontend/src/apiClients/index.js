import { EVENT_NAMES, subscribe } from "./internal/apiClientObserver";
import { authenticationClient } from "./clients/authentication";

const apiClientObserver = {
    EVENT_NAMES,
    subscribe,
};

const apiClients = {
    authenticationClient,
};

export { apiClients, apiClientObserver };
