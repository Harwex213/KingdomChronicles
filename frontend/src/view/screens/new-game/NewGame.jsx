import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { AUTHORIZED_ROUTES } from "../../../common/constants/routes";
import { currentAuthorizedRoute } from "../../../services/states";
import { Layout } from "../../containers/layout/Layout";

const NewGameScreen = observer(() => {
    useLayoutEffect(() => {
        currentAuthorizedRoute.setState(AUTHORIZED_ROUTES.NEW_GAME);
    });

    return (
        <Layout>
            <h1>TODO: start new game</h1>
        </Layout>
    );
});

export { NewGameScreen };
