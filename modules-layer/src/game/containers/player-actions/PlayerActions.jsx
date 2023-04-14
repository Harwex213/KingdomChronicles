import styles from "./playerActions.module.css";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { PlayerAction } from "./PlayerAction";
import { GAME_ACTIONS } from "shared/enums";
import { POWER_CENTER_VALUES, ROAD_VALUES } from "shared/constants";

const PlayerActions = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);

    useEffect(() => {
        const handleKeyDown = (logKey) => {
            if (logKey.code === "Escape") {
                currentPlayer.abortAction();
            }
            if (logKey.code === "Digit1") {
                currentPlayer.startPlacingGlobalBuilding(GAME_ACTIONS.START_BUILD_POWER_CENTER);
            }
            if (logKey.code === "Digit2") {
                currentPlayer.startPlacingGlobalBuilding(GAME_ACTIONS.START_BUILD_ROAD);
            }
            if (logKey.code === "Digit3") {
                currentPlayer.startRemovingPlacedGlobalBuilding(GAME_ACTIONS.START_DESTROY_ROAD);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentPlayer]);

    const handlePlaceGlobalBuilding = (action) => {
        currentPlayer.startPlacingGlobalBuilding(action);
    };

    const handleDestroyGlobalBuilding = (action) => {
        currentPlayer.startRemovingPlacedGlobalBuilding(action);
    };

    return (
        <div className={styles.container}>
            <PlayerAction
                name="+PC"
                description="Build power center"
                value={GAME_ACTIONS.START_BUILD_POWER_CENTER}
                cost={POWER_CENTER_VALUES.BUILD_COST}
                onClick={handlePlaceGlobalBuilding}
            />
            <PlayerAction
                name="+Road"
                description="Build road"
                value={GAME_ACTIONS.START_BUILD_ROAD}
                cost={ROAD_VALUES.BUILD_COST}
                onClick={handlePlaceGlobalBuilding}
            />
            <PlayerAction
                name="-Road"
                description="Destroy road"
                value={GAME_ACTIONS.START_DESTROY_ROAD}
                onClick={handleDestroyGlobalBuilding}
            />
        </div>
    );
});

export { PlayerActions };
