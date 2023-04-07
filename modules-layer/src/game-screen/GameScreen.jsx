import styles from "./gameScreen.module.css";
import { Map } from "./containers/map/Map";
import { GameCreator } from "./containers/gameCreator/GameCreator";
import { GameProcessManager } from "./containers/gameProcessManager/GameProcessManager";
import { PlayerInfo } from "./containers/playerInfo/PlayerInfo";
import { PlayerActions } from "./containers/playerActions/PlayerActions";

const GameScreen = () => {
    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.map}>
                    <Map />
                </div>
                <div className={styles.playerInfo}>
                    <PlayerInfo />
                </div>
                <div className={styles.gameCreator}>
                    <GameCreator />
                </div>
                <div className={styles.gameProcessManager}>
                    <GameProcessManager />
                </div>
                <div className={styles.playerActions}>
                    <PlayerActions />
                </div>
            </div>
        </div>
    );
};

export { GameScreen };
