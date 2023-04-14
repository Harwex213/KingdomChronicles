import styles from "./ResourceSelection.module.css";
import { Block, Container, Text } from "../../../components";
import { ResourceIcon } from "../../../components/resourceIcon/ResourceIcon";
import { POWER_CENTER_TIERS } from "shared/enums";
import { RESOURCE_LAYERS } from "shared/models";

const POWER_CENTER_TIER_LABELS = {
    [POWER_CENTER_TIERS.FIRST]: "I",
    [POWER_CENTER_TIERS.SECOND]: "II",
};

const ResourceSelection = ({ className = "", onResourceSelect }) => {
    return (
        <Block className={styles.container + " " + className}>
            {RESOURCE_LAYERS.map((resourceLayer, index) => (
                <div className={styles.layer} key={index}>
                    <Container direction="row">
                        {resourceLayer.map((resource) => (
                            <ResourceIcon
                                key={resource.name}
                                type={resource.name}
                                onClick={() => onResourceSelect(resource.name)}
                            />
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
};

export { ResourceSelection };
