import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { AUTHORIZED_ROUTES } from "../../../common/constants/routes";
import { currentAuthorizedRoute } from "../../../services/states";
import { Layout } from "../../containers/layout/Layout";
import styles from "./newGameScreen.module.css";

const NewGameScreen = observer(() => {
    useLayoutEffect(() => {
        currentAuthorizedRoute.setState(AUTHORIZED_ROUTES.NEW_GAME);
    });

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.main}></div>
                <div className={styles.addition}></div>
            </div>
        </Layout>
    );
});

export { NewGameScreen };
