import styles from "./ResourceIcon.module.css";
import { RESOURCE_NAMES } from "shared/enums";
import money from "./resourceIcons/money_86.png";
import wood from "./resourceIcons/wood_86.png";
import stone from "./resourceIcons/stone_86.png";
import food from "./resourceIcons/food_86.png";
import woodboards from "./resourceIcons/woodboards_86.png";

const RESOURCE_NAME_TO_SRC = {
    [RESOURCE_NAMES.MONEY]: money,
    [RESOURCE_NAMES.WOOD]: wood,
    [RESOURCE_NAMES.STONE]: stone,
    [RESOURCE_NAMES.FOOD]: food,
    [RESOURCE_NAMES.WOOD_BOARDS]: woodboards,
};

const ResourceIcon = ({ className, type, selectable = true, ...rest }) => {
    return (
        <img
            className={styles.icon + " " + className}
            src={RESOURCE_NAME_TO_SRC[type]}
            alt="resource"
            data-is-selectable={selectable}
            {...rest}
        />
    );
};

export { ResourceIcon };
