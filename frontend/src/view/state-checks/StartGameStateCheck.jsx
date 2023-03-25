import { observer } from "mobx-react-lite";
import { searchGameState } from "../../services/states";
import { SEARCH_GAME_STATES } from "../../common/constants/states";
import { NotInGameRoutes } from "../routes/NotInGameRoutes";
import { PendingStartGame } from "../routes/PendingStartGameRoutes";

const StartGameStateCheck = observer(() => {
    if (searchGameState.current === SEARCH_GAME_STATES.IDLE) {
        return <NotInGameRoutes />;
    }
    if (searchGameState.current === SEARCH_GAME_STATES.IN_PENDING_START_GAME) {
        return <PendingStartGame />;
    }
});

export { StartGameStateCheck };
