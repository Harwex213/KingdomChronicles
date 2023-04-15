import styles from "./PowerCenterInfo.module.css";
import { useContext } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { observer } from "mobx-react-lite";
import { Block, Button, Range, Text, Container, Switch } from "../../components";
import { ResourceInfo } from "./ResourceInfo";

const PowerCenterInfo = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);
    const selectedPowerCenter = currentPlayer.selectedPowerCenter;

    const handleSwitchCanGrow = () => {
        currentPlayer.switchCanGrow();
    };

    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <Block className={styles.level}>
                    <Text size="big" family="dumbledor" centered>
                        Level {selectedPowerCenter.currentLevel}
                    </Text>
                    <Button className={styles.increaseLevelBtn} textSize="normal">
                        Increase
                    </Button>
                </Block>
                <Block className={styles.economic}>
                    <Container>
                        <Text>Income:</Text>
                        <Text>Outcome:</Text>
                        <Text>People growth:</Text>
                        <Text>Can grow:</Text>
                    </Container>
                    <Container centered="vertical">
                        <Text variant="positive" centered>
                            + {selectedPowerCenter.economic.income}
                        </Text>
                        <Text variant="negative" centered>
                            - {selectedPowerCenter.economic.outcome}
                        </Text>
                        <Text centered>+ {selectedPowerCenter.people.growth}</Text>
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
            </div>
            <Block className={styles.armyCreate}></Block>
            <ResourceInfo className={styles.resourceInfo} selectedPowerCenter={selectedPowerCenter} />
        </div>
    );
});

export { PowerCenterInfo };
