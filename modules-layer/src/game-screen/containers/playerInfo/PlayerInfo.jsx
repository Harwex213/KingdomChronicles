import styles from "./playerInfo.module.css";
import { observer } from "mobx-react-lite";
import { gameService } from "../../gameService/gameService";

const PlayerInfo = observer(() => {
    if (gameService.currentPlayer === null) {
        return <></>;
    }

    const playerInfo = gameService.currentPlayer.info;
    const playerEconomic = gameService.currentPlayer.economic;

    return (
        <div className={styles.container}>
            <div className={styles.flag} style={{ backgroundColor: playerInfo?.colorStr }}></div>
            <div className={styles.info}>
                <p className={styles.kingdomName}>{playerInfo?.kingdomName}</p>
                <p className={styles.motto}>{playerInfo?.motto}</p>
                <p className={styles.tick}>Current tick {gameService.gameState.currentTick}</p>
                <div className={styles.economic}>
                    <p>BABLO: {playerEconomic.treasure}</p>
                    <p className={styles.income}> + {playerEconomic.income}</p>
                    <p className={styles.outcome}> - {playerEconomic.outcome}</p>
                </div>
            </div>
        </div>
    );
});

export { PlayerInfo };
