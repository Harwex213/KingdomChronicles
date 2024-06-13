import { API_ROUTES } from "../internal/config";
import { apiClient } from "../internal/apiClient";
import { makeGlobalCatchError } from "../internal/makeGlobalCatchError";

const authenticationClient = {};

authenticationClient.login = async (values) => {
    return apiClient.post(API_ROUTES.AUTHENTICATION.LOGIN, {
        json: values,
    });
};

authenticationClient.register = async (values) => {
    return apiClient.post(API_ROUTES.AUTHENTICATION.REGISTER, {
        json: values,
    });
};

authenticationClient.describe = async () => {
    return apiClient.get(API_ROUTES.AUTHENTICATION.DESCRIBE, {
        retry: {
            limit: 0,
        },
    });
};

authenticationClient.logout = async () => {
    return apiClient.delete(API_ROUTES.AUTHENTICATION.LOGOUT);
};

makeGlobalCatchError(authenticationClient);

export { authenticationClient };
