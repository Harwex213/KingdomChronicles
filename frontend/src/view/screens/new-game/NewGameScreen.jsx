import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { NOT_IN_GAME_ROUTES } from "../../../common/constants/routes";
import { currentAuthorizedRoute } from "../../../services/states";
import { Layout } from "../../containers/layout/Layout";
import styles from "./newGameScreen.module.css";
import { NewGameChat } from "./NewGameChat";
import { NewGameRoutes } from "../../routes/NewGameRoutes";

const NewGameScreen = observer(() => {
    useLayoutEffect(() => {
        currentAuthorizedRoute.setState(NOT_IN_GAME_ROUTES.NEW_GAME);
    });

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.main}>
                    <NewGameRoutes />
                </div>
                <div className={styles.addition}>
                    <NewGameChat />
                </div>
            </div>
        </Layout>
    );
});

export { NewGameScreen };
