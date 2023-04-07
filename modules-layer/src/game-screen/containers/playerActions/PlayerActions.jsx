import styles from "./playerActions.module.css";
import { PlayerAction } from "./PlayerAction";
import { GAME_ACTIONS } from "models/game/enums/actions";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { gameService } from "../../gameService/gameService";
import { POWER_CENTER_VALUES, ROAD_VALUES } from "models/game-variables";

const PlayerActions = observer(() => {
    useEffect(() => {
        const handleKeyDown = (logKey) => {
            if (logKey.code === "Escape") {
                gameService.handleActionAbort();
            }
            if (logKey.code === "Digit1") {
                gameService.handlePlacingGlobalBuilding(GAME_ACTIONS.START_BUILD_POWER_CENTER);
            }
            if (logKey.code === "Digit2") {
                gameService.handlePlacingGlobalBuilding(GAME_ACTIONS.START_BUILD_ROAD);
            }
            if (logKey.code === "Digit3") {
                // TODO
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handlePlaceGlobalBuilding = (action) => {
        gameService.handlePlacingGlobalBuilding(action);
    };

    const handleDestroyGlobalBuilding = () => {
        // TODO
    };

    return (
        <div className={styles.container}>
            <PlayerAction
                name="+PC"
                description="Build power center"
                value={GAME_ACTIONS.START_BUILD_POWER_CENTER}
                cost={POWER_CENTER_VALUES.COST}
                onClick={handlePlaceGlobalBuilding}
            />
            <PlayerAction
                name="+Road"
                description="Build road"
                value={GAME_ACTIONS.START_BUILD_ROAD}
                cost={ROAD_VALUES.COST}
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
