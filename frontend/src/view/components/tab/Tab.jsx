import { useState } from "react";
import styles from "./tab.module.css";

const Tab = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className={styles.tab}>
            <div className={styles.tabButtons}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${index === activeTab ? styles.active : ""}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={styles.tabContent}>{tabs[activeTab].component}</div>
        </div>
    );
};

export { Tab };
