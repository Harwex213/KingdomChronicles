import { apiClientObserver } from "../../apiClients";
import { states } from "../../store";

const apiStatusState = states.apiStatus;

apiClientObserver.subscribe(apiClientObserver.EVENT_NAMES.CONNECTION_ERROR, () => {
    apiStatusState.setState(apiStatusState.API_STATUS_STATES.NOT_AVAILABLE);
});
