import { Navigate, Route, Routes } from "react-router-dom";
import { ProfileScreen } from "./profile/Profile";

const AuthorizedRoutes = () => {
    return (
        <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/" element={<Navigate to="/profile" replace={true} />} />
            <Route path="*" element={<Navigate to="/profile" replace={true} />} />
        </Routes>
    );
};

export { AuthorizedRoutes };
