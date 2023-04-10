import styles from "./PowerCenterOuterBuildings.module.css";
import React, { useState } from "react";
import { Block, Button, Tab } from "../../../components-game";
import { observer } from "mobx-react-lite";
import { POWER_CENTER_TIERS } from "shared/enums";
import { gameService } from "../../gameService/gameService";

const POWER_CENTER_TIER_TO_TABS = {
    [POWER_CENTER_TIERS.FIRST]: [
        {
            label: "I Tier",
            component: <div></div>,
        },
    ],
    [POWER_CENTER_TIERS.SECOND]: [
        {
            label: "I Tier",
            component: <div></div>,
        },
        {
            label: "II Tier",
            component: <div></div>,
        },
    ],
};

const PowerCenterOuterBuildings = observer(() => {
    const [activeTab, setActiveTab] = useState(0);
    const selectedPowerCenter = gameService.currentPlayer.selectedPowerCenter;
    const tabs = POWER_CENTER_TIER_TO_TABS[selectedPowerCenter.tier];

    return (
        <div className={styles.container}>
            <Block className={styles.destroyActions}>
                <Button className={styles.destroy} textSize="semi-normal" variant="negative">
                    Destroy this power center
                </Button>
                <Button className={styles.destroy} textSize="semi-normal" variant="negative">
                    Destroy outer building
                </Button>
            </Block>
            <Block className={styles.outerBuildings}>
                <div className={styles.outerBuildingsList}>{tabs[activeTab].component}</div>
                <div className={styles.tabs}>
                    <div className={styles.tabs}>
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                isActive={activeTab === index}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab.label}
                            </Tab>
                        ))}
                    </div>
                </div>
            </Block>
        </div>
    );
});

export { PowerCenterOuterBuildings };
