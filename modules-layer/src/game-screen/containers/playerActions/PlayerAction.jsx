import styles from "./playerActions.module.css";
import { observer } from "mobx-react-lite";
import { Tooltip } from "../../../components/tooltip/Tooltip";
import { gameService } from "../../gameService/gameService";

const PlayerAction = observer(({ name, cost, value, description, onClick }) => {
    const isActive = gameService.currentPlayer?.currentActionThatRequiresConfirmationOnMap === value;

    return (
        <Tooltip text={description}>
            <div
                className={styles.action}
                data-is-active={isActive}
                data-is-disabled={!gameService.canPlayerDoActionBoolMap[value]}
                onClick={() => onClick(value)}
            >
                <p>{name}</p>
                {cost && <p>{cost}</p>}
            </div>
        </Tooltip>
    );
});

export { PlayerAction };
