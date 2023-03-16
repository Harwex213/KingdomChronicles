import { ApiStatusState } from "./states/apiStatus";

import { User } from "./models/user";

const states = {
    apiStatus: new ApiStatusState(),
};

const models = {
    user: new User(),
};

export { states, models };
