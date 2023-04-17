import styles from "./PowerCenterInfo.module.css";
import { useContext } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { observer } from "mobx-react-lite";
import { Block, Range, Text, Container, Switch } from "../../components";
import { ResourceInfo } from "./ResourceInfo";
import { IncreaseLevel } from "./IncreaseLevel";

const PowerCenterInfo = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);
    const selectedPowerCenter = currentPlayer.selectedPowerCenter;

    const handleSwitchCanGrow = () => {
        currentPlayer.switchCanGrow();
    };

    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <Block className={styles.economic}>
                    <Container>
                        <Text>Income:</Text>
                        <Text>Outcome:</Text>
                        <Text>Growth:</Text>
                        <Text>Can grow:</Text>
                    </Container>
                    <Container centered="vertical">
                        <Text variant="positive" centered>
                            + {selectedPowerCenter.economic.income.toFixed(2)}
                        </Text>
                        <Text variant="negative" centered>
                            - {selectedPowerCenter.economic.outcome.toFixed(2)}
                        </Text>
                        <Text centered>{selectedPowerCenter.people.growth}</Text>
                        <Switch checked={selectedPowerCenter.people.canGrow} onChange={handleSwitchCanGrow} />
                    </Container>
                </Block>
                <Block className={styles.recruitTransform}>
                    <div className={styles.people}>
                        <Container>
                            <Text>Civilians:</Text>
                            <Text>Recruits:</Text>
                        </Container>
                        <Container>
                            <Text centered>{selectedPowerCenter.people.civilians}</Text>
                            <Text centered>{selectedPowerCenter.people.recruits}</Text>
                        </Container>
                    </div>
                    <div className={styles.recruitTransformRange}>
                        <Range value={0} min={0} max={1} step={0.01} onChange={() => {}} />
                        <Text centered>Recruits transform: 0</Text>
                    </div>
                </Block>
                <IncreaseLevel
                    className={styles.level}
                    currentPlayer={currentPlayer}
                    selectedPowerCenter={selectedPowerCenter}
                />
            </div>
            <Block className={styles.armyCreate}></Block>
            <ResourceInfo className={styles.resourceInfo} selectedPowerCenter={selectedPowerCenter} />
        </div>
    );
});

export { PowerCenterInfo };
