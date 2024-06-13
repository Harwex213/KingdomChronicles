import styles from "./pendingRun.module.css";
import { observer } from "mobx-react-lite";
import { GameChat } from "./GameChat";
import { gameService, startedGameModel, STATES } from "../../../services/game";

const PendingRun = observer(({ className = "" }) => {
    const gameState = gameService.state.current;
    const isPendingRun = gameState === STATES.ALL_PLAYERS_CONNECTED;

    console.log(gameState);

    const handleLeave = () => {
        gameService.leave();
    };

    const handleRun = () => {
        gameService.run();
    };

    return (
        <div className={styles.container + " " + className}>
            <h1 className={styles.header}>Pending all players connect</h1>
            <GameChat />
            <button onClick={handleLeave}>Leave</button>
            {startedGameModel.currentPlayer.isOwner && (
                <button onClick={handleRun} disabled={isPendingRun !== true}>
                    Run
                </button>
            )}
        </div>
    );
});

export { PendingRun };
