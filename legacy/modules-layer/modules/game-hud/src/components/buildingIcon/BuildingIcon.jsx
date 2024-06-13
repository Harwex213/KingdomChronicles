import styles from "./BuildingIcon.module.css";
import {
    EXTERNAL_BUILDING_TYPE_NAMES,
    GLOBAL_BUILDING_TYPES,
    INTERNAL_BUILDING_TYPE_NAMES,
} from "shared/enums";

import road from "./icons/road.png";
import powerCenter from "./icons/power center.png";

import woodcutter from "./icons/woodcutter.png";
import farm from "./icons/farm.png";
import stoneQuarry from "./icons/stone quarry.png";
import sawmill from "./icons/sawmill.png";

import workshop from "./icons/workshop.png";
import taxOffice from "./icons/tax office.png";
import guild from "./icons/guild.png";
import market from "./icons/market.png";
import warehouse from "./icons/warehouse.png";
import colonizationCenter from "./icons/colonization center.png";

import { Text } from "../text/Text";

const BUILDING_NAME_TO_SRC = {
    [GLOBAL_BUILDING_TYPES.ROAD]: road,
    [GLOBAL_BUILDING_TYPES.POWER_CENTER]: powerCenter,

    [EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER]: woodcutter,
    [EXTERNAL_BUILDING_TYPE_NAMES.FARM]: farm,
    [EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY]: stoneQuarry,
    [EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL]: sawmill,

    [INTERNAL_BUILDING_TYPE_NAMES.WORKSHOP]: workshop,
    [INTERNAL_BUILDING_TYPE_NAMES.TAX_OFFICE]: taxOffice,
    [INTERNAL_BUILDING_TYPE_NAMES.GUILD]: guild,
    [INTERNAL_BUILDING_TYPE_NAMES.MARKET]: market,
    [INTERNAL_BUILDING_TYPE_NAMES.WAREHOUSE]: warehouse,
    [INTERNAL_BUILDING_TYPE_NAMES.COLONIZATION_CENTER]: colonizationCenter,
};

const BuildingIcon = ({ className = "", buildingName = null, isSelected, ...rest }) => {
    const selectedClassName = isSelected ? styles.icon__selected : "";
    const finaleClassName = styles.icon + " " + className + selectedClassName;

    if (buildingName === null) {
        return (
            <div className={styles.icon + " " + className + selectedClassName}>
                <Text size="big">?</Text>
            </div>
        );
    }

    return (
        <img className={finaleClassName} src={BUILDING_NAME_TO_SRC[buildingName]} alt="building" {...rest} />
    );
};

export { BuildingIcon };
