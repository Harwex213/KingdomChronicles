import styles from "./Cost.module.css";
import { Container } from "../container/Container";
import { Text } from "../text/Text";
import { ResourceIcon } from "../resourceIcon/ResourceIcon";

const Cost = ({ className, cost }) => {
    return (
        <Container className={className} direction="row" centered="vertical">
            {Object.entries(cost).map(([resourceName, value]) => (
                <Container key={resourceName} direction="row" centered="vertical">
                    <Text>{value}</Text>
                    <ResourceIcon className={styles.costIcon} type={resourceName} selectable={false} />
                </Container>
            ))}
        </Container>
    );
};

export { Cost };
