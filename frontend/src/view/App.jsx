import { ApiStatusStateRouter } from "./stateRouters/ApiStatus";
import { UserStateRouter } from "./stateRouters/User";
import "./reset.css";

const App = () => {
    return (
        <ApiStatusStateRouter>
            <UserStateRouter />
        </ApiStatusStateRouter>
    );
};

export { App };
