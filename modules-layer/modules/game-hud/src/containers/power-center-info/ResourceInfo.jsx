import styles from "./ResourceInfo.module.css";
import { observer } from "mobx-react-lite";
import { POWER_CENTER_TIERS } from "shared/enums";
import { RESOURCE_LAYERS } from "shared/models";
import { Block, Container, Text, ResourceIcon } from "../../components";

const POWER_CENTER_TIER_LABELS = {
    [POWER_CENTER_TIERS.FIRST]: "I",
    [POWER_CENTER_TIERS.SECOND]: "II",
};

const ResourceInfo = observer(({ className = "", selectedPowerCenter }) => {
    return (
        <Block className={styles.container + " " + className}>
            {RESOURCE_LAYERS.map((resourceLayer, index) => (
                <div className={styles.layer} key={index}>
                    <Container direction="row">
                        {resourceLayer.map((resource) => (
                            <div key={resource.name} className={styles.resourceContainer}>
                                <ResourceIcon type={resource.name} />
                                <Text>{selectedPowerCenter.storage[resource.name].toFixed(2)}</Text>
                            </div>
                        ))}
                    </Container>
                    <div className={styles.layerTitle}>
                        <Text>{POWER_CENTER_TIER_LABELS[index + 1]}</Text>
                        <Text family="dumbledor">Layer</Text>
                    </div>
                </div>
            ))}
        </Block>
    );
});

export { ResourceInfo };
