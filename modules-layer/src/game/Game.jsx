import styles from "./Game.module.css";
import { observer } from "mobx-react-lite";
import { CurrentPlayerContext } from "./CurrentPlayerContext";
import { Map } from "./containers/map/Map";
import { PlayerInfo } from "./containers/player-info/PlayerInfo";
import { PlayerActions } from "./containers/player-actions/PlayerActions";

const Game = observer(({ currentPlayer }) => {
    return (
        <CurrentPlayerContext.Provider value={currentPlayer}>
            <div className={styles.container}>
                <Map className={styles.map} />
                <PlayerInfo className={styles.playerInfo} />
                <PlayerActions />
            </div>
        </CurrentPlayerContext.Provider>
    );
});

export { Game };
