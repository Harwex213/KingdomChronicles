import styles from "./BuildCost.module.css";
import { Container } from "../container/Container";
import { Cost } from "../cost/Cost";

const BuildCost = ({ className = "", buildCost }) => {
    return (
        <Container className={className} direction="row" centered="vertical">
            {Object.entries(buildCost).map(([resourceName, value]) => (
                <Cost
                    key={resourceName}
                    iconClassName={styles.costIcon}
                    resourceName={resourceName}
                    value={value}
                />
            ))}
        </Container>
    );
};

export { BuildCost };
