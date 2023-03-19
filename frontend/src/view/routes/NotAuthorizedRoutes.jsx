import { Navigate, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../screens/login/Login";
import { RegistrationScreen } from "../screens/registration/Registration";

const NotAuthorizedRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
    );
};

export { NotAuthorizedRoutes };
