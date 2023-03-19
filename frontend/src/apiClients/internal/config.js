const API_URL = process.env.REACT_APP_API_URL;

const API_CONTROLLERS = {
    AUTHENTICATION: "auth",
    USER_PROFILE: "profile",
    TITLE: "title",
    FLAG: "flag",
};

const API_ROUTES = {
    AUTHENTICATION: {
        LOGIN: `${API_CONTROLLERS.AUTHENTICATION}/login`,
        LOGOUT: `${API_CONTROLLERS.AUTHENTICATION}/logout`,
        REGISTER: `${API_CONTROLLERS.AUTHENTICATION}/register`,
        DESCRIBE: `${API_CONTROLLERS.AUTHENTICATION}/describe`,
    },
    USER_PROFILE: {
        GET: `${API_CONTROLLERS.USER_PROFILE}`,
        EDIT_INFO: `${API_CONTROLLERS.USER_PROFILE}/info`,
        EDIT_FLAG: `${API_CONTROLLERS.USER_PROFILE}/flag`,
    },
    TITLE: {
        GET_CURRENT_TITLES: `${API_CONTROLLERS.TITLE}/current`,
    },
};

export { API_URL, API_ROUTES };
