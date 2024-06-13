import { observer } from "mobx-react-lite";
import { Game } from "game-hud";
import { devGameService } from "../../devGameService/devGameService";

const GameWrapper = observer(() => {
    if (devGameService.currentPlayer === null) {
        return <></>;
    }

    return <Game currentPlayer={devGameService.currentPlayer} />;
});

export { GameWrapper };
