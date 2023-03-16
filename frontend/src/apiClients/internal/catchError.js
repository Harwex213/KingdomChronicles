import { EVENT_NAMES, notify } from "./apiClientObserver";
import { ApiClientError, ConnectionError } from "../../common/errors";
import internalization from "../../common/internalization/errors.json";

const catchError = (apiCall) => {
    return async (...params) => {
        try {
            return await apiCall(...params);
        } catch (e) {
            if (e.response) {
                if (e.response.payload?.message) {
                    throw new ApiClientError(e.response.payload.message);
                }
                throw new ApiClientError(internalization.undefinedError);
            }

            notify(EVENT_NAMES.CONNECTION_ERROR);
            throw new ConnectionError();
        }
    };
};

export { catchError };
