import styles from "./IncreaseLevel.module.css";
import { observer } from "mobx-react-lite";
import { Block, Button, Cost, Text, Tooltip } from "../../components";
import { GAME_ACTIONS } from "shared/enums";

const IncreaseLevel = observer(({ className = "", currentPlayer, selectedPowerCenter }) => {
    const levelIncreaseCost = selectedPowerCenter.levelIncreaseCost;
    const disabled =
        currentPlayer.selectedPowerCenterActionPossibilities[GAME_ACTIONS.INCREASE_POWER_CENTER_LEVEL] ===
        false;

    const handleIncrease = () => {
        currentPlayer.increasePowerCenterLevel();
    };

    return (
        <Block className={styles.container + " " + className}>
            <Text size="big" family="dumbledor" centered>
                Level {selectedPowerCenter.currentLevel}
            </Text>
            <Tooltip className={styles.cost} text={<Cost cost={levelIncreaseCost} />} position="bottom">
                <Button
                    className={styles.increaseLevelBtn}
                    textSize="normal"
                    disabled={disabled}
                    onClick={handleIncrease}
                >
                    Increase
                </Button>
            </Tooltip>
        </Block>
    );
});

export { IncreaseLevel };
