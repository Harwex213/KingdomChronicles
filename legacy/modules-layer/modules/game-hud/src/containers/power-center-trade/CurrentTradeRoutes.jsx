import styles from "./currentTradeRoutes.module.css";
import { observer } from "mobx-react-lite";
import { Button, Text } from "../../components";

const TradeRoute = ({ index, tradeRoute }) => {
    return <div></div>;
};

const CurrentTradeRoutes = observer(({ className = "", onCreateTradeRoute }) => {
    return (
        <div className={styles.container + " " + className}>
            <div className={styles.createNew}>
                <Button className={styles.createNewBtn} variant="positive" onClick={onCreateTradeRoute}>
                    Create new trade route
                </Button>
                <Text className={styles.leftThroughput}>Left throughput: 40</Text>
            </div>
            <div></div>
        </div>
    );
});

export { CurrentTradeRoutes };
