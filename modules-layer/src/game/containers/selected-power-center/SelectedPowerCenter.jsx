import styles from "./SelectedPowerCenter.module.css";
import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Text } from "../../components";
import { PowerCenterInfo } from "../power-center-info/PowerCenterInfo";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";

const tabs = [
    {
        label: "Info",
        component: <PowerCenterInfo />,
    },
    {
        label: "External buildings",
        component: <div></div>,
    },
    {
        label: "Internal buildings",
        component: <div></div>,
    },
    {
        label: "Trade",
        component: <div></div>,
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
