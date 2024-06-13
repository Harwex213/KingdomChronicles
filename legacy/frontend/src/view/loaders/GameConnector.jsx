import { observer } from "mobx-react-lite";
import { useLayoutEffect } from "react";
import { Loader } from "../components/loader/Loader";
import { Aborted } from "../components/aborted/Aborted";
import { gameConnector } from "../../services/game";
import { StartedGameRoutes } from "../routes/StartedGameRoutes";
import { LoaderFailed } from "../components/loaderFailed/LoaderFailed";

const GameConnector = observer(() => {
    useLayoutEffect(() => {
        gameConnector.connect();

        return () => {
            gameConnector.disconnect();
        };
    }, []);

    if (gameConnector.isConnecting) {
        return <Loader />;
    }

    if (gameConnector.isError) {
        return <LoaderFailed>{gameConnector.errorMessage}</LoaderFailed>;
    }

    if (gameConnector.isAborted) {
        return <Aborted />;
    }

    if (gameConnector.isSuccess) {
        return <StartedGameRoutes />;
    }
});

export { GameConnector };
