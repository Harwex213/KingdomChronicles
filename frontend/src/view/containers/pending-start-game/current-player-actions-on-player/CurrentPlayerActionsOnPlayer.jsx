import { pendingStartGameModel } from "../../../../services/start-game";
import { StartGameAction, ChangeReadyStatusAction, LeaveGameAction } from "./PlayersActions";

const selfOwnerActions = [<StartGameAction key={1} />, <LeaveGameAction key={2} />];
const selfPlayerActions = [<ChangeReadyStatusAction key={1} />, <LeaveGameAction key={2} />];

const CurrentPlayerActionsOnPlayer = ({ consideringPlayerId }) => {
    if (pendingStartGameModel.currentPlayer.isOwner) {
        if (pendingStartGameModel.currentPlayer.userProfile.userId === consideringPlayerId) {
            return selfOwnerActions;
        }
        return <></>;
    }

    if (pendingStartGameModel.currentPlayer.userProfile.userId === consideringPlayerId) {
        return selfPlayerActions;
    }
};

export { CurrentPlayerActionsOnPlayer };
