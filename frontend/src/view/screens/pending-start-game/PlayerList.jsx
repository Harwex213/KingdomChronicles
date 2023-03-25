import { observer } from "mobx-react-lite";
import { pendingStartGameModel } from "../../../services/start-game";
import { UserProfileRow } from "../../containers/pending-start-game/user-profile-row/UserProfileRow";

const PlayerList = observer(({ rowClassName }) => {
    const playerList = [...Array(pendingStartGameModel.maxPlayersAmount)].map((_, index) => (
        <UserProfileRow key={index} className={rowClassName} isEmpty />
    ));

    for (let i = 0; i < pendingStartGameModel.userProfiles.length; i++) {
        playerList[i] = (
            <UserProfileRow
                key={i}
                className={rowClassName}
                userProfile={pendingStartGameModel.userProfiles[i]}
            />
        );
    }

    return <>{playerList}</>;
});

export { PlayerList };
