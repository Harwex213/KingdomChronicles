import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { startGameConnector } from "../../services/start-game";
import { StartGameStateCheck } from "../state-checks/StartGameStateCheck";
import { Loader } from "../components/loader/Loader";
import { Aborted } from "../components/aborted/Aborted";
import { LoaderFailed } from "../components/loaderFailed/LoaderFailed";

const StartGameConnector = observer(() => {
    useLayoutEffect(() => {
        if (startGameConnector.isIdle) {
            startGameConnector.connect();
        }

        return () => {
            startGameConnector.disconnect();
        };
    }, []);

    if (startGameConnector.isConnecting) {
        return <Loader />;
    }

    if (startGameConnector.isError) {
        return <LoaderFailed>{startGameConnector.errorMessage}</LoaderFailed>;
    }

    if (startGameConnector.isAborted) {
        return <Aborted />;
    }

    if (startGameConnector.isSuccess) {
        return <StartGameStateCheck />;
    }
});

export { StartGameConnector };
