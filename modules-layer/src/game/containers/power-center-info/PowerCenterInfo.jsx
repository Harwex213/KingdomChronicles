import styles from "./PowerCenterInfo.module.css";
import { useContext, useState } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";
import { observer } from "mobx-react-lite";
import { Block, Button, Range, Text, Container } from "../../components";

const PowerCenterInfo = observer(() => {
    const currentPlayer = useContext(CurrentPlayerContext);
    const selectedPowerCenter = currentPlayer.selectedPowerCenter;
    const [selectedResource, setSelectedResource] = useState(null);

    const handleSelectResource = (name) => {
        setSelectedResource(name);
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
                    </Container>
                    <Container>
                        <Text variant="positive" centered>
                            + {selectedPowerCenter.economic.income}
                        </Text>
                        <Text variant="negative" centered>
                            - {selectedPowerCenter.economic.outcome}
                        </Text>
                        <Text centered>+ {selectedPowerCenter.people.growth}</Text>
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
            {/*<ResourceInfo className={styles.resourceInfo} selectedResource={selectedResource} />*/}
            {/*<ResourceSelection*/}
            {/*    className={styles.resourceSelection}*/}
            {/*    selectedResource={selectedResource}*/}
            {/*    onResourceSelect={handleSelectResource}*/}
            {/*/>*/}
        </div>
    );
});

export { PowerCenterInfo };
