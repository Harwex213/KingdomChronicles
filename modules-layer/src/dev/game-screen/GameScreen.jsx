import styles from "./gameScreen.module.css";
import { GameCreator } from "./containers/game-creator/GameCreator";
import { GameProcessManager } from "./containers/game-process-manager/GameProcessManager";
import { GameWrapper } from "./containers/game-wrapper/GameWrapper";
import { useEffect, useState } from "react";

const getIsShowDev = () => {
    const value = localStorage.getItem("isShowDev");
    return value === "true";
};

const GameScreen = () => {
    const [isShowDev, setIsShowDev] = useState(getIsShowDev);

    useEffect(() => {
        localStorage.setItem("isShowDev", isShowDev.toString());
    }, [isShowDev]);

    return (
        <div className={styles.screen}>
            <div className={styles.container} data-is-show={isShowDev}>
                <div className={styles.show}>
                    <button onClick={() => setIsShowDev(!isShowDev)}>{isShowDev ? "Hide" : "Show"}</button>
                </div>
                <GameCreator className={styles.gameCreator} />
                <GameProcessManager className={styles.gameProcessManager} />
                <GameWrapper />
            </div>
        </div>
    );
};

export { GameScreen };
