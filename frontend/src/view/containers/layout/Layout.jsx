import styles from "./layout.module.css";
import { HeaderMenu } from "../header-menu/HeaderMenu";

const Layout = ({ children }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <HeaderMenu />
                </div>
                <div className={styles.page}>{children}</div>
            </div>
        </div>
    );
};

export { Layout };
