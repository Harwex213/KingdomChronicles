import ky from "ky";
import { API_URL } from "./config";
import { EVENT_NAMES, notify } from "./apiClientObserver";

const apiClient = ky.create({
    prefixUrl: API_URL,
    credentials: "include",
    hooks: {
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401 || response.status === 403) {
                    notify(EVENT_NAMES.NOT_AUTHORIZED);
                }
                const responseError = await response.text();
                response.payload = responseError === "" ? {} : JSON.parse(responseError);
                return response;
            },
        ],
    },
});

export { apiClient };
