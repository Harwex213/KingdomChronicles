import styles from "./selectedObject.module.css";
import { observer } from "mobx-react-lite";
import { gameService } from "../../gameService/gameService";
import { CURRENT_PLAYER_SELECTED_OBJECT_STATES } from "shared/enums";
import { SelectedPowerCenter } from "../selected-power-center/SelectedPowerCenter";
import { SelectedNeutralRegion } from "../selected-neutral-region/SelectedNeutralRegion";
import { Block } from "../../../components-game";

const SELECTED_OBJECT_STATE_TO_COMPONENT = {
    [CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER]: <SelectedPowerCenter />,
    [CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION]: <SelectedNeutralRegion />,
};

const SelectedObject = observer(({ className = "" }) => {
    if (
        gameService.currentPlayer === null ||
        gameService.currentPlayer.selectedObject.state === CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE
    ) {
        return <></>;
    }

    const abortSelectingObject = () => {
        gameService.abortSelectingObject();
    };

    return (
        <Block className={styles.container + " " + className} isExternal>
            {SELECTED_OBJECT_STATE_TO_COMPONENT[gameService.currentPlayer.selectedObject.state]}
            <Block className={styles.close} onClick={abortSelectingObject}>
                ❌
            </Block>
        </Block>
    );
});

export { SelectedObject };
