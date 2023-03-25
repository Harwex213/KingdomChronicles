const regexForRetrieving = /HubException: (?<msg>.*\\*)/gm;
const retrieveHubExceptionMessage = (error) => {
    return error.message.replaceAll(regexForRetrieving, (_, msg) => msg);
};

const catchError = (apiCall) => {
    return async (...params) => {
        try {
            return await apiCall(...params);
        } catch (e) {
            throw Error(retrieveHubExceptionMessage(e));
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
