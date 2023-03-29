import { Navigate, Route, Routes } from "react-router-dom";
import { PROFILE_SCREEN_ROUTES } from "../../common/constants/routes";
import { ProfileOverviewSubScreen } from "../subscreens/profile-overview/ProfileOverview";
import { ProfileInfoEditSubScreen } from "../subscreens/profile-info-edit/ProfileInfoEdit";
import { ProfileFlagEditSubScreen } from "../subscreens/profile-flag-edit/ProfileFlagEdit";

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route path={PROFILE_SCREEN_ROUTES.OVERVIEW} element={<ProfileOverviewSubScreen />} />
            <Route path={PROFILE_SCREEN_ROUTES.EDIT_INFO} element={<ProfileInfoEditSubScreen />} />
            <Route path={PROFILE_SCREEN_ROUTES.EDIT_FLAG} element={<ProfileFlagEditSubScreen />} />
            <Route path="/" element={<Navigate to={PROFILE_SCREEN_ROUTES.OVERVIEW} replace={true} />} />
            <Route path="*" element={<Navigate to={PROFILE_SCREEN_ROUTES.OVERVIEW} replace={true} />} />
        </Routes>
    );
};

export { ProfileRoutes };
