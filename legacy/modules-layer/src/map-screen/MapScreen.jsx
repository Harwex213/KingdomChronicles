import { useEffect } from "react";
import { mapScreenModel } from "./mapScreenModel.js";
import styles from "./mapScreen.module.css";
import { ControlBar } from "./controlBar/ControlBar.jsx";

const MapScreen = () => {
    useEffect(() => {
        mapScreenModel.init({ rendererContainerSelector: `.${styles.container}` });
        mapScreenModel.action();
    }, []);

    return (
        <div className={styles.screen}>
            <div className={styles.container}></div>
            <div className={styles.controlBar}>
                <ControlBar />
            </div>
        </div>
    );
};

export { MapScreen };
