import styles from "./ResourceSelection.module.css";
import { Block, Container, Text } from "../../../components-game";
import { FIRST_LAYER_RESOURCES, SECOND_LAYER_RESOURCES } from "models/game";
import { ResourceIcon } from "../../../components-game/resourceIcon/ResourceIcon";

const ResourceSelection = ({ className = "", selectedResource, onResourceSelect }) => {
    return (
        <Block className={styles.container + " " + className}>
            <div className={styles.layer}>
                <Container direction="row">
                    {FIRST_LAYER_RESOURCES.map((resource) => (
                        <ResourceIcon
                            key={resource.name}
                            type={resource.name}
                            onClick={() => onResourceSelect(resource.name)}
                        />
                    ))}
                </Container>
                <div className={styles.layerTitle}>
                    <Text>I</Text>
                    <Text family="dumbledor">Layer</Text>
                </div>
            </div>
            <div className={styles.layer}>
                <Container direction="row">
                    {SECOND_LAYER_RESOURCES.map((resource) => (
                        <ResourceIcon
                            key={resource.name}
                            type={resource.name}
                            onClick={() => onResourceSelect(resource.name)}
                        />
                    ))}
                </Container>
                <div className={styles.layerTitle}>
                    <Text>II</Text>
                    <Text family="dumbledor">Layer</Text>
                </div>
            </div>
        </Block>
    );
};

export { ResourceSelection };
