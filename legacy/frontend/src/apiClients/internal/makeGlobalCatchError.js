import locale from "../../common/internalization/api-clients.json";

const catchError = (apiCall) => {
    return async (...params) => {
        try {
            return await apiCall(...params);
        } catch (e) {
            if (e.response) {
                if (e.response.payload?.message) {
                    throw Error(e.response.payload.message);
                }
                throw Error(locale.errors.undefinedError);
            }

            throw Error(locale.errors.serviceUnavailable);
        }
    };
};

const makeGlobalCatchError = (service) => {
    for (const methodName in service) {
        if (typeof service[methodName] === "function") {
            service[methodName] = catchError(service[methodName]);
        }
    }
};

export { makeGlobalCatchError };
