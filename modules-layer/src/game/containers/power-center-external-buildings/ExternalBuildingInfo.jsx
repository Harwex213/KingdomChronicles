import styles from "./ExternalBuildingInfo.module.css";
import { observer } from "mobx-react-lite";
import { BuildCost, BuildingIcon, Button, Cost, Text } from "../../components";
import { RESOURCE_NAMES } from "shared/enums";

const ExternalBuildingInfo = observer(({ className = "", externalBuildingType, canBuild, currentAmount }) => {
    return (
        <div className={styles.container + " " + className}>
            <div className={styles.additional}>
                <Text>{externalBuildingType.typeName}</Text>
                <BuildingIcon buildingName={externalBuildingType.typeName} />
                <Text>Already builded: {currentAmount}</Text>
                <Button variant="positive" disabled={!canBuild}>
                    Build
                </Button>
            </div>
            <div className={styles.main}>
                <Text>Acceptable bioms: {externalBuildingType.acceptableBioms.join(", ")}</Text>
                <Text>Acceptable areas: {externalBuildingType.acceptableAreas.join(", ")}</Text>
                <div className={styles.mainContainer}>
                    <Text>Cost: </Text>
                    <BuildCost buildCost={externalBuildingType.buildCost} />
                </div>
                <Text>Build time: {externalBuildingType.ticksAmountToBuild} ticks</Text>
                <Text>Destroy time: {externalBuildingType.ticksAmountToDestroy} ticks</Text>
                <div className={styles.mainContainer}>
                    <Text>Cost per tick: {}</Text>
                    <Cost
                        iconClassName={styles.iconCost}
                        resourceName={RESOURCE_NAMES.MONEY}
                        value={externalBuildingType.costPerTick}
                    />
                </div>
                <div className={styles.mainContainer}>
                    <Text>Production: </Text>
                    {externalBuildingType.production.requiredResource && (
                        <div className={styles.mainContainer}>
                            <Cost
                                iconClassName={styles.iconCost}
                                resourceName={externalBuildingType.production.requiredResource}
                                value={externalBuildingType.production.requiredAmountPerTick}
                            />
                            <Text>-></Text>
                        </div>
                    )}
                    <Cost
                        iconClassName={styles.iconCost}
                        resourceName={externalBuildingType.production.producedResource}
                        value={externalBuildingType.production.producedAmountPerTick}
                    />
                </div>
            </div>
        </div>
    );
});

export { ExternalBuildingInfo };
