import { observer } from "mobx-react-lite";
import { playerState } from "../../services/states";
import { PLAYER_STATES } from "../../common/constants/states";
import { StartGameConnector } from "../loaders/StartGameConnector";
import { GameConnector } from "../loaders/GameConnector";

const PlayerStateCheck = observer(() => {
    if (playerState.current === PLAYER_STATES.NOT_STARTED_GAME) {
        return <StartGameConnector />;
    }
    if (playerState.current === PLAYER_STATES.IN_GAME) {
        return <GameConnector />;
    }
});

export { PlayerStateCheck };
