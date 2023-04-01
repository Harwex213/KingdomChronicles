import styles from "./gameScreen.module.css";
import { observer } from "mobx-react-lite";
import { Map } from "./containers/map/Map";
import { GameCreator } from "./containers/gameCreator/GameCreator";
import { gameService } from "./gameService";

const GameScreen = observer(() => {
    return (
        <div className={styles.screen}>
            <div style={{ display: "none" }}>{gameService.lastGameCreated.getTime()}</div>
            <div className={styles.container}>
                <div className={styles.gameCreator}>
                    <GameCreator />
                </div>
                <Map />
            </div>
        </div>
    );
});

export { GameScreen };
