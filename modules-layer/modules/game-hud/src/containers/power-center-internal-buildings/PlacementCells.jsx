import styles from "./placementCells.module.css";
import React from "react";
import { observer } from "mobx-react-lite";
import { Block, BuildingIcon, Text } from "../../components";

const PlacementCell = ({ internalBuildingTypeName = null, pos, isSelected, onSelect }) => {
    return (
        <div className={styles.placementCell} onClick={() => onSelect(pos)}>
            <BuildingIcon buildingName={internalBuildingTypeName} isSelected={isSelected} />
        </div>
    );
};

const PlacementCells = observer(({ className = "", selectedPowerCenter, selectedPos, onSelect }) => {
    if (selectedPowerCenter.placementCellsMaxAmount === 0) {
        return (
            <Block className={styles.noPlacementCellsContainer}>
                <Text className={styles.noPlacementCells}>
                    Increase power center tier to build internal buildings
                </Text>
            </Block>
        );
    }

    return (
        <Block className={styles.container}>
            {[...Array(selectedPowerCenter.placementCellsMaxAmount)].map((_, index) => (
                <PlacementCell
                    key={index}
                    internalBuildingTypeName={selectedPowerCenter.internalBuildings[index]}
                    pos={index}
                    isSelected={selectedPos === index}
                    onSelect={onSelect}
                />
            ))}
        </Block>
    );
});

export { PlacementCells };
