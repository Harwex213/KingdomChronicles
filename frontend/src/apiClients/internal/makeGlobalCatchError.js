import { catchError } from "./catchError";

const makeGlobalCatchError = (service) => {
    for (const methodName in service) {
        if (typeof service[methodName] === "function") {
            service[methodName] = catchError(service[methodName]);
        }
    }
};

export { makeGlobalCatchError };
