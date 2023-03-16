import internalization from "../../common/internalization/internalization.json";
import { observer } from "mobx-react-lite";
import { states } from "../../store";
import "../../services/apiStatus";

const apiStatus = states.apiStatus;

const ApiStatusStateRouter = observer(({ children }) => {
    if (apiStatus.state === apiStatus.API_STATUS_STATES.AVAILABLE) {
        return children;
    }
    if (apiStatus.state === apiStatus.API_STATUS_STATES.NOT_AVAILABLE) {
        return (
            <div>
                <h1>{internalization.stateRouters.apiStatus.header}</h1>
            </div>
        );
    }
});

export { ApiStatusStateRouter };
