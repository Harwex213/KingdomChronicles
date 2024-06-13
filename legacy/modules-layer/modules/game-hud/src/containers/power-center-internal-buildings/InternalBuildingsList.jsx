import styles from "./internalBuildingsList.module.css";
import React from "react";
import { observer } from "mobx-react-lite";
import { INTERNAL_BUILDING_TYPES_PER_TIER } from "shared/models";
import { InternalBuildingInfo } from "./InternalBuildingInfo";
import { GAME_ACTIONS } from "shared/enums";

const InternalBuildingsList = observer(({ tier, currentPlayer, className = "" }) => {
    const internalBuildingTypes = INTERNAL_BUILDING_TYPES_PER_TIER[tier - 1];
    const canBuild =
        currentPlayer.selectedPowerCenterActionPossibilities[GAME_ACTIONS.START_BUILD_INTERNAL_BUILDING];

    return (
        <div className={styles.container + " " + className}>
            {internalBuildingTypes.map((internalBuildingType) => (
                <InternalBuildingInfo
                    key={internalBuildingType.typeName}
                    internalBuildingType={internalBuildingType}
                    canBuild={canBuild[internalBuildingType.typeName]}
                />
            ))}
        </div>
    );
});

export { InternalBuildingsList };
