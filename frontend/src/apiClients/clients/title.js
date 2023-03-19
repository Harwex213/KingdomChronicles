import { API_ROUTES } from "../internal/config";
import { apiClient } from "../internal/apiClient";
import { makeGlobalCatchError } from "../internal/makeGlobalCatchError";

const titleClient = {};

titleClient.getCurrentTitles = async () => {
    return apiClient.get(API_ROUTES.TITLE.GET_CURRENT_TITLES);
};

makeGlobalCatchError(titleClient);

export { titleClient };
