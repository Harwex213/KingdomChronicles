import styles from "./gameScreen.module.css";
import { Map } from "./containers/map/Map";
import { GameCreator } from "./containers/gameCreator/GameCreator";

const GameScreen = () => {
    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.gameInfo}>There will be settings</div>
                <div className={styles.map}>
                    <Map />
                </div>
                <div className={styles.gameCreator}>
                    <GameCreator />
                </div>
            </div>
        </div>
    );
};

export { GameScreen };
