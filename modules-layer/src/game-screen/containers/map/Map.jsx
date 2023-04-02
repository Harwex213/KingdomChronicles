import styles from "./map.module.css";
import { useEffect } from "react";
import { gameService } from "../../gameService";

const Map = () => {
    useEffect(() => {
        gameService.mountMapRenderer(`.${styles.container}`);
    }, []);

    return <div className={styles.container}></div>;
};

export { Map };
