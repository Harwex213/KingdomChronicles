import styles from "./ExternalBuildingList.module.css";
import React from "react";
import { observer } from "mobx-react-lite";
import { EXTERNAL_BUILDING_TYPES_PER_TIER } from "shared/models";
import { ExternalBuildingInfo } from "./ExternalBuildingInfo";
import { GAME_ACTIONS } from "shared/enums";

const ExternalBuildingList = observer(({ tier, currentPlayer, className = "" }) => {
    const externalBuildingTypes = EXTERNAL_BUILDING_TYPES_PER_TIER[tier - 1];
    const selectedPowerCenter = currentPlayer.selectedPowerCenter;
    const canBuild =
        currentPlayer.selectedPowerCenterActionPossibilities[GAME_ACTIONS.START_BUILD_EXTERNAL_BUILDING];

    return (
        <div className={styles.container + " " + className}>
            {externalBuildingTypes.map((externalBuildingType) => (
                <ExternalBuildingInfo
                    key={externalBuildingType.typeName}
                    externalBuildingType={externalBuildingType}
                    canBuild={canBuild[externalBuildingType.typeName]}
                    currentAmount={selectedPowerCenter.externalBuildingsAmount[externalBuildingType.typeName]}
                />
            ))}
        </div>
    );
});

export { ExternalBuildingList };
