import styles from "./pendingStartGameScreen.module.css";
import { PendingStartGameChat } from "./PendingStartGameChat";
import { PlayerList } from "./PlayerList";

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
                <div className={styles.mapPreview}>There will be map preview</div>
            </div>
        </div>
    );
};

export { PendingStartGameScreen };
