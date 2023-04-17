import styles from "./SelectedObject.module.css";
import { observer } from "mobx-react-lite";
import { Block } from "../../components";
import { CURRENT_PLAYER_SELECTED_OBJECT_STATES } from "shared/enums";
import { SelectedPowerCenter } from "../selected-power-center/SelectedPowerCenter";
import { SelectedNeutralRegion } from "../selected-neutral-region/SelectedNeutralRegion";
import { useContext } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";

const SELECTED_OBJECT_STATE_TO_COMPONENT = {
    [CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER]: <SelectedPowerCenter />,
    [CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION]: <SelectedNeutralRegion />,
};

const SelectedObject = observer(({ className = "" }) => {
    const currentPlayer = useContext(CurrentPlayerContext);

    if (currentPlayer.selectedObject.state === CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE) {
        return <></>;
    }

    const abortSelectingObject = () => {
        currentPlayer.abortSelectingObject();
    };

    return (
        <Block className={styles.container + " " + className} isExternal>
            {SELECTED_OBJECT_STATE_TO_COMPONENT[currentPlayer.selectedObject.state]}
            <Block className={styles.close} onClick={abortSelectingObject}>
                ❌
            </Block>
        </Block>
    );
});

export { SelectedObject };
