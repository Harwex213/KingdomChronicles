import styles from "./map.module.css";
import { useEffect } from "react";
import { gameService } from "../../gameService/gameService";

const Map = () => {
    useEffect(() => {
        gameService.mountMapRendererView(`.${styles.container}`);
    }, []);

    return <div className={styles.container}></div>;
};

export { Map };
