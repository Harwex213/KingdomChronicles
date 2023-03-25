import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { startGameConnector } from "../../services/start-game";
import { StartGameStateCheck } from "../state-checks/StartGameStateCheck";
import { Loader } from "../components/loader/Loader";
import { Aborted } from "../components/aborted/Aborted";

const StartGameConnector = observer(() => {
    useLayoutEffect(() => {
        startGameConnector.connect();

        return () => {
            startGameConnector.disconnect();
        };
    }, []);

    if (startGameConnector.isConnecting) {
        return <Loader />;
    }

    if (startGameConnector.isError) {
        return <div>{startGameConnector.errorMessage}</div>;
    }

    if (startGameConnector.isAborted) {
        return <Aborted />;
    }

    if (startGameConnector.isSuccess) {
        return <StartGameStateCheck />;
    }
});

export { StartGameConnector };
