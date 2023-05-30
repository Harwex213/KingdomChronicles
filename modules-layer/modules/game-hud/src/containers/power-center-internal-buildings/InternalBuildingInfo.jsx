import styles from "./internalBuildingInfo.module.css";
import { BuildCost, BuildingIcon, Button, Text, Tooltip } from "../../components";
import { INTERNAL_BUILDING_TYPE_NAMES } from "shared/enums";

const INTERNAL_BUILDING_TYPE_DESCRIPTIONS = {
    [INTERNAL_BUILDING_TYPE_NAMES.TAX_OFFICE]: "Increases income from one civilian on 50%",
    [INTERNAL_BUILDING_TYPE_NAMES.WAREHOUSE]: "Increases storage capacity by 100",
    [INTERNAL_BUILDING_TYPE_NAMES.GUILD]:
        "Opens ability to create trade routes to power centers in another regions",
    [INTERNAL_BUILDING_TYPE_NAMES.COLONIZATION_CENTER]:
        "Provides one colonist, which can be send to expand your kingdom",
};

const InternalBuildingInfo = ({ className = "", internalBuildingType, canBuild }) => {
    return (
        <div className={styles.container + " " + className}>
            <div className={styles.additional}>
                <Text>{internalBuildingType.typeName}</Text>
                <BuildingIcon buildingName={internalBuildingType.typeName} />
                <Button variant="positive" disabled={!canBuild}>
                    Build
                </Button>
            </div>
            <div className={styles.main}>
                <Text>{INTERNAL_BUILDING_TYPE_DESCRIPTIONS[internalBuildingType.typeName]}</Text>
                <div className={styles.mainContainer}>
                    <Text>Cost: </Text>
                    <BuildCost buildCost={internalBuildingType.buildCost} />
                </div>
                <Text>Build time: {internalBuildingType.ticksAmountToBuild} ticks</Text>
            </div>
        </div>
    );
};

export { InternalBuildingInfo };
