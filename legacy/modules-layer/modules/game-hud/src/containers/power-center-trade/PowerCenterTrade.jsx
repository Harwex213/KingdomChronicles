import styles from "./powerCenterTrade.module.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Block } from "../../components";
import { CreateNewTradeRoute } from "./CreateNewTradeRoute";
import { CurrentTradeRoutes } from "./CurrentTradeRoutes";

const SCREENS = {
    TRADE_ROUTES: "TRADE_ROUTES",
    CREATE_TRADE_ROUTE: "CREATE_TRADE_ROUTE",
};

const PowerCenterTrade = observer(() => {
    const [screen, setScreen] = useState(SCREENS.TRADE_ROUTES);

    const handleGoToCreateTradeRoute = () => {
        setScreen(SCREENS.CREATE_TRADE_ROUTE);
    };

    const handleBackToTradeRoutes = () => {
        setScreen(SCREENS.TRADE_ROUTES);
    };

    return (
        <Block className={styles.container}>
            {screen === SCREENS.TRADE_ROUTES && (
                <CurrentTradeRoutes
                    className={styles.screen}
                    onCreateTradeRoute={handleGoToCreateTradeRoute}
                />
            )}
            {screen === SCREENS.CREATE_TRADE_ROUTE && (
                <CreateNewTradeRoute className={styles.screen} onBack={handleBackToTradeRoutes} />
            )}
        </Block>
    );
});

export { PowerCenterTrade };
