import styles from "./gameScreen.module.css";
import { Map } from "./containers/map/Map";
import { GameCreator } from "./containers/game-creator/GameCreator";
import { GameProcessManager } from "./containers/game-process-manager/GameProcessManager";
import "../components-game/text/Text.module.css";
import { PlayerInfo } from "./containers/player-info/PlayerInfo";
import { PlayerActions } from "./containers/player-actions/PlayerActions";
import { SelectedObject } from "./containers/selected-object/SelectedObject";

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
                <SelectedObject className={styles.selectedObject} />
            </div>
        </div>
    );
};

export { GameScreen };
