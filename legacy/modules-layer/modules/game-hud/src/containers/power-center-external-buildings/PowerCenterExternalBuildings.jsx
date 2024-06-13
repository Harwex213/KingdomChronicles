import styles from "./PowerCenterExternalBuildings.module.css";
import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Block, Button, Tab } from "../../components";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { ExternalBuildingList } from "./ExternalBuildingList";
import { GAME_ACTIONS } from "shared/enums";

const PowerCenterExternalBuildings = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);
    const selectedPowerCenter = currentPlayer.selectedPowerCenter;
    const [activeTab, setActiveTab] = useState(0);

    const handleDestroyPowerCenter = () => {
        currentPlayer.destroySelectedPowerCenter();
    };

    const handleDestroyExternalBuilding = () => {
        currentPlayer.startRemovingPlacedGlobalBuilding(GAME_ACTIONS.START_DESTROY_EXTERNAL_BUILDING);
    };

    return (
        <div className={styles.container}>
            <Block className={styles.destroyActions}>
                <Button
                    className={styles.destroy}
                    textSize="semi-normal"
                    variant="negative"
                    onClick={handleDestroyPowerCenter}
                >
                    Destroy this power center
                </Button>
                <Button
                    className={styles.destroy}
                    textSize="semi-normal"
                    variant="negative"
                    onClick={handleDestroyExternalBuilding}
                >
                    Destroy outer building
                </Button>
            </Block>
            <Block className={styles.externalBuildings}>
                <ExternalBuildingList
                    className={styles.externalBuildingsList}
                    tier={activeTab + 1}
                    currentPlayer={currentPlayer}
                />
                <div className={styles.tabs}>
                    <div className={styles.tabs}>
                        {[...Array(selectedPowerCenter.tier)].map((_, index) => (
                            <Tab
                                key={index}
                                isActive={activeTab === index}
                                onClick={() => setActiveTab(index)}
                            >
                                {index + 1} Tier
                            </Tab>
                        ))}
                    </div>
                </div>
            </Block>
        </div>
    );
});

export { PowerCenterExternalBuildings };
