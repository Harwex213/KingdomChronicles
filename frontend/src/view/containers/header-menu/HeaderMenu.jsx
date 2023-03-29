import { HeaderMenuItem } from "./HeaderMenuItem";
import { NOT_IN_GAME_ROUTES } from "../../../common/constants/routes";
import styles from "./headerMenu.module.css";
import internalization from "../../../common/internalization/containers.json";

const locale = internalization.headerMenu;

const HeaderMenu = () => {
    return (
        <div className={styles.container}>
            <HeaderMenuItem route={NOT_IN_GAME_ROUTES.NEW_GAME}>{locale.newGame}</HeaderMenuItem>
            <HeaderMenuItem route={NOT_IN_GAME_ROUTES.PROFILE}>{locale.userProfile}</HeaderMenuItem>
        </div>
    );
};

export { HeaderMenu };
