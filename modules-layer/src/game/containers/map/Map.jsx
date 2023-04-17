import styles from "./map.module.css";
import { useContext, useEffect } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";

const Map = ({ className = "" }) => {
    const currentPlayer = useContext(CurrentPlayerContext);

    useEffect(() => {
        currentPlayer.mountMapRendererView(`.${styles.container}`);
    }, [currentPlayer]);

    return <div className={styles.container + " " + className}></div>;
};

export { Map };
