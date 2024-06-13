import styles from "./userProfileRow.module.css";
import internalization from "../../../../common/internalization/components.json";
import { observer } from "mobx-react-lite";
import { UserProfileFlag } from "../../../components/user-profile-flag/UserProfileFlag";
import { titles } from "../../../../services/loaders/titlesLoader";
import { pendingStartGameModel } from "../../../../services/start-game";
import { EmptyUserProfileRow } from "./EmptyUserProfileRow";
import { CurrentPlayerActionsOnPlayer } from "../current-player-actions-on-player/CurrentPlayerActionsOnPlayer";

const locale = internalization.userProfileRow;

const UserProfileRow = observer(({ className, userProfile, isEmpty = false }) => {
    if (isEmpty) {
        return <EmptyUserProfileRow className={className} />;
    }

    const isOwner = pendingStartGameModel.isOwner(userProfile.userId);
    const isReady = pendingStartGameModel.playersReadyStatus[userProfile.userId];

    return (
        <div className={styles.row + " " + className}>
            <div className={styles.flag}>
                <UserProfileFlag flag={userProfile.flag} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoHeader}>
                    <p className={styles.name}>
                        {titles.getTitleName(userProfile.titleId)} {userProfile.name}
                    </p>
                    <div className={styles.gameStatus}>
                        {isOwner && <p className={styles.owner}>{locale.owner}</p>}
                        {!isOwner && (
                            <p className={styles.readyStatus} data-is-ready={isReady}>
                                {isReady ? locale.ready : locale.notReady}
                            </p>
                        )}
                    </div>
                </div>
                <p className={styles.motto}>{userProfile.motto}</p>
                <div className={styles.actions}>
                    <CurrentPlayerActionsOnPlayer consideringPlayerId={userProfile.userId} />
                </div>
            </div>
        </div>
    );
});

export { UserProfileRow };
