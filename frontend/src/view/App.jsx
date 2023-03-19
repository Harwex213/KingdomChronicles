import { TitlesPreLoader } from "./loaders/TitlesPreLoader";
import { UserPreLoader } from "./loaders/UserPreLoader";
import "./reset.css";

const App = () => {
    return (
        <TitlesPreLoader>
            <UserPreLoader />
        </TitlesPreLoader>
    );
};

export { App };
