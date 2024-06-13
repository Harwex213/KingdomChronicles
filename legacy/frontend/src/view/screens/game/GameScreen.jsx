import styles from "./gameScreen.module.css";
import { observer } from "mobx-react-lite";
import { gameService, STATES } from "../../../services/game";
import { Game } from "game-hud";
import { Loader } from "../../components/loader/Loader";
import { PendingRun } from "./PendingRun";
import { GameChat } from "./GameChat";

const GameScreen = observer(() => {
    const gameState = gameService.state.current;
    const isRunning = gameState === STATES.GAME_RUNNING;

    if (gameService.state.current === STATES.IDLE) {
        return <Loader />;
    }

    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                {!isRunning && (
                    <div className={styles.pendingRunContainer}>
                        <PendingRun className={styles.pendingRun} />
                        <div className={styles.pendingRunBackground}></div>
                    </div>
                )}
                <Game currentPlayer={gameService.currentPlayer} />
                {isRunning && (
                    <div className={styles.chat}>
                        <GameChat />
                    </div>
                )}
            </div>
        </div>
    );
});

export { GameScreen };
