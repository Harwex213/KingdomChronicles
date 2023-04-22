import styles from "./createNewTradeRoute.module.css";
import { observer } from "mobx-react-lite";
import { Block, Button, Range, Select, Text } from "../../components";
import { RESOURCE_NAMES } from "shared/enums";

const SELECT_OPTIONS = Object.values(RESOURCE_NAMES)
    .filter((name) => name !== RESOURCE_NAMES.MONEY)
    .map((name) => ({
        name: name,
        value: name,
    }));

const CreateNewTradeRoute = observer(({ className = "", onBack }) => {
    return (
        <div className={styles.container + " " + className}>
            <div className={styles.back}>
                <Button className={styles.backBtn} onClick={onBack}>
                    Back
                </Button>
            </div>
            <div className={styles.main}>
                <div className={styles.selectTarget}>
                    <Button className={styles.selectTargetBtn}>Select target Power Center</Button>
                    <Text variant="positive">Selected!</Text>
                </div>
                <div className={styles.selectResource}>
                    <Select value={RESOURCE_NAMES.FOOD} options={SELECT_OPTIONS} onChange={() => {}} />
                    <Text centered>Select resource</Text>
                </div>
                <div>
                    <Range value={0} min={0} max={10} step={1} onChange={() => {}} />
                    <Text centered>Set amount: 0</Text>
                </div>
                <div className={styles.send}>
                    <Button className={styles.sendBtn} variant="positive">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
});

export { CreateNewTradeRoute };
