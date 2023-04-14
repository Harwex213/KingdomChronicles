import styles from "./gameScreen.module.css";
import { GameCreator } from "./containers/game-creator/GameCreator";
import { GameProcessManager } from "./containers/game-process-manager/GameProcessManager";
import { GameWrapper } from "./containers/game-wrapper/GameWrapper";
import { useState } from "react";

const GameScreen = () => {
    const [isShowDev, setIsShowDev] = useState(true);

    return (
        <div className={styles.screen}>
            <div className={styles.container} data-is-show={isShowDev}>
                <div className={styles.show}>
                    <button onClick={() => setIsShowDev(!isShowDev)}>{isShowDev ? "Hide" : "Show"}</button>
                </div>
                <GameCreator className={styles.gameCreator} />
                <GameProcessManager className={styles.gameProcessManager} />
                <GameWrapper />
                {/*<div className={styles.map}>*/}
                {/*    <Map />*/}
                {/*</div>*/}
                {/*<div className={styles.playerInfo}>*/}
                {/*    <PlayerInfo />*/}
                {/*</div>*/}
                {/*<div className={styles.playerActions}>*/}
                {/*    <PlayerActions />*/}
                {/*</div>*/}
                {/*<SelectedObject className={styles.selectedObject} />*/}
            </div>
        </div>
    );
};

export { GameScreen };
