import styles from "./ResourceInfo.module.css";
import { Block, Text } from "../../../components";

const ResourceInfo = ({ className = "", selectedResource }) => {
    return (
        <Block className={className + " " + styles.container}>
            {selectedResource === null ? <Text centered>Select resource to overview</Text> : <div></div>}
        </Block>
    );
};

export { ResourceInfo };
