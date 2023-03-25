import { observer } from "mobx-react-lite";
import styles from "./currentPlayerActionsOnPlayer.module.css";
import internalization from "../../../../common/internalization/containers.json";
import { pendingStartGameModel, startGameService } from "../../../../services/start-game";
import { useState } from "react";

const locale = internalization.pendingStartGame.playerActions;

const StartGameAction = observer(() => {
    const [isFetching, setIsFetching] = useState(false);
    const isDisabled = pendingStartGameModel.canOwnerStartGame === false;
    const handleStart = async () => {
        try {
            setIsFetching(true);
            await startGameService.startGame();
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <button className={styles.actionBtn} disabled={isDisabled || isFetching} onClick={handleStart}>
            {locale.start}
        </button>
    );
});

const LeaveGameAction = observer(() => {
    const [isFetching, setIsFetching] = useState(false);
    const handleLeave = async () => {
        try {
            setIsFetching(true);
            await startGameService.leaveFromGame();
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <button className={styles.actionBtn} disabled={isFetching} onClick={handleLeave}>
            {locale.leave}
        </button>
    );
});

const ChangeReadyStatusAction = observer(() => {
    const [isFetching, setIsFetching] = useState(false);
    const isReady = pendingStartGameModel.currentPlayer.isReady;
    const handleReady = async () => {
        try {
            setIsFetching(true);
            if (isReady) {
                await startGameService.notReadyForGame();
            } else {
                await startGameService.readyForGame();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <>
            <button className={styles.actionBtn} disabled={isFetching} onClick={handleReady}>
                {isReady ? locale.notReady : locale.ready}
            </button>
        </>
    );
});

export { StartGameAction, LeaveGameAction, ChangeReadyStatusAction };
