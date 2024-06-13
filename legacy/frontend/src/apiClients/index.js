import { EVENT_NAMES, subscribe } from "./internal/apiClientObserver";
import { authenticationClient } from "./clients/authentication";
import { userProfileClient } from "./clients/userProfile";
import { titleClient } from "./clients/title";

const apiClientObserver = {
    EVENT_NAMES,
    subscribe,
};

const apiClients = {
    authenticationClient,
    userProfileClient,
    titleClient,
};

export { apiClients, apiClientObserver };
