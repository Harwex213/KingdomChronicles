import styles from "./selectedPowerCenter.module.css";
import React, { useState } from "react";
import { PowerCenterInfo } from "../power-center-info/PowerCenterInfo";
import { Tab, Text } from "../../../components-game";
import { observer } from "mobx-react-lite";
import { gameService } from "../../gameService/gameService";
import { PowerCenterOuterBuildings } from "../power-center-outer-buildings/PowerCenterOuterBuildings";

const tabs = [
    {
        label: "Info",
        component: <PowerCenterInfo />,
    },
    {
        label: "Outer buildings",
        component: <PowerCenterOuterBuildings />,
    },
    {
        label: "Inner buildings",
        component: <div></div>,
    },
    {
        label: "Trade",
        component: <div></div>,
    },
];

const SelectedPowerCenter = observer(() => {
    const [activeTab, setActiveTab] = useState(0);
    const selectedPowerCenter = gameService.currentPlayer.selectedPowerCenter;

    return (
        <div className={styles.container}>
            <Text className={styles.header} size="big" family="dumbledor" centered>
                Power Center. {selectedPowerCenter.tier} Tier
            </Text>
            <div className={styles.content}>
                <div className={styles.tabs}>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            className={styles.tab}
                            isExternal
                            isActive={activeTab === index}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </div>
                {tabs[activeTab].component}
            </div>
        </div>
    );
});

export { SelectedPowerCenter };
