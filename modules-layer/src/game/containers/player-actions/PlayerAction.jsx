import styles from "./playerActions.module.css";
import { observer } from "mobx-react-lite";
import { Tooltip } from "../../components";
import { useContext } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";

const PlayerAction = observer(({ name, cost, value, description, onClick }) => {
    const currentPlayer = useContext(CurrentPlayerContext);

    return (
        <Tooltip text={description}>
            <div
                className={styles.action}
                data-is-active={currentPlayer.tryingPlaceGlobalBuildingActionName === value}
                data-is-disabled={!currentPlayer.globalActionPossibilities[value]}
                onClick={() => onClick(value)}
            >
                <p>{name}</p>
                {cost && <p>{cost}</p>}
            </div>
        </Tooltip>
    );
});

export { PlayerAction };
