import { Container } from "../container/Container";
import { Text } from "../text/Text";
import { ResourceIcon } from "../resourceIcon/ResourceIcon";

const Cost = ({ className, iconClassName, resourceName, value }) => {
    return (
        <Container className={className} direction="row" centered="vertical">
            <Text>{value}</Text>
            <ResourceIcon className={iconClassName} type={resourceName} selectable={false} />
        </Container>
    );
};

export { Cost };
