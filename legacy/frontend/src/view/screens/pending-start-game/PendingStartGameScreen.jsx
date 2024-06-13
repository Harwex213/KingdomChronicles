import styles from "./pendingStartGameScreen.module.css";
import { PendingStartGameChat } from "./PendingStartGameChat";
import { PlayerList } from "./PlayerList";
import { MapPreview } from "../../containers/pending-start-game/map-preview/MapPreview";

const PendingStartGameScreen = () => {
    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.settings}>
                    <div className={styles.gameInfo}>
                        <div className={styles.playerListContainer}>
                            <div className={styles.playerList}>
                                <PlayerList rowClassName={styles.playerRow} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.chat}>
                        <PendingStartGameChat />
                    </div>
                </div>
                <MapPreview className={styles.mapPreview} />
            </div>
        </div>
    );
};

export { PendingStartGameScreen };
