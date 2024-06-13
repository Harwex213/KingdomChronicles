import styles from "./SelectedPowerCenter.module.css";
import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Text } from "../../components";
import { PowerCenterInfo } from "../power-center-info/PowerCenterInfo";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { PowerCenterExternalBuildings } from "../power-center-external-buildings/PowerCenterExternalBuildings";
import { PowerCenterInternalBuildings } from "../power-center-internal-buildings/PowerCenterInternalBuildings";
import { PowerCenterTrade } from "../power-center-trade/PowerCenterTrade";

const tabs = [
    {
        label: "Info",
        component: <PowerCenterInfo />,
    },
    {
        label: "External buildings",
        component: <PowerCenterExternalBuildings />,
    },
    {
        label: "Internal buildings",
        component: <PowerCenterInternalBuildings />,
    },
    {
        label: "Trade",
        component: <PowerCenterTrade />,
    },
];

const SelectedPowerCenter = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={styles.container}>
            <Text size="big" family="dumbledor" centered>
                Power Center. {currentPlayer.selectedPowerCenter.tier} Tier
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
