import styles from "./powerCenterInternalBuildings.module.css";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { Block, Tab } from "../../components";
import { InternalBuildingsList } from "./InternalBuildingsList";
import { PlacementCells } from "./PlacementCells";

const PowerCenterInternalBuildings = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);
    const selectedPowerCenter = currentPlayer.selectedPowerCenter;
    const [activeTab, setActiveTab] = useState(0);
    const [selectedPos, setSelectedPos] = useState(null);

    return (
        <div className={styles.container}>
            <PlacementCells
                selectedPowerCenter={selectedPowerCenter}
                selectedPos={selectedPos}
                onSelect={(newPos) => setSelectedPos(newPos)}
            />
            <Block className={styles.internalBuildings}>
                <InternalBuildingsList
                    className={styles.internalBuildingsList}
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

export { PowerCenterInternalBuildings };
