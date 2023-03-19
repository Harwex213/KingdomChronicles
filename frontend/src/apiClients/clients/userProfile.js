import { API_ROUTES } from "../internal/config";
import { apiClient } from "../internal/apiClient";
import { makeGlobalCatchError } from "../internal/makeGlobalCatchError";

const userProfileClient = {};

userProfileClient.get = async () => {
    return apiClient.get(API_ROUTES.USER_PROFILE.GET);
};

userProfileClient.editInfo = async (values) => {
    return apiClient.put(API_ROUTES.USER_PROFILE.EDIT_INFO, {
        json: values,
    });
};

userProfileClient.editFlag = async (values) => {
    return apiClient.put(API_ROUTES.USER_PROFILE.EDIT_FLAG, {
        json: values,
    });
};

makeGlobalCatchError(userProfileClient);

export { userProfileClient };
