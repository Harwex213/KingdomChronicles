import { useLayoutEffect } from "react";
import { currentProfileRoute } from "../../../services/states";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";

const ProfileFlagEditSubScreen = () => {
    useLayoutEffect(() => {
        currentProfileRoute.setState(PROFILE_SCREEN_ROUTES.EDIT_FLAG);
    }, []);

    return <div>TODO: Edit flag</div>;
};

export { ProfileFlagEditSubScreen };
