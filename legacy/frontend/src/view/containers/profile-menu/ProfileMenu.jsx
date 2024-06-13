import styles from "./profileMenu.module.css";
import internalization from "../../../common/internalization/profile-screen.json";
import { ProfileMenuItem } from "./ProfileMenuItem";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";

const locale = internalization.menu;

const ProfileMenu = () => {
    return (
        <div className={styles.container}>
            <ProfileMenuItem route={PROFILE_SCREEN_ROUTES.OVERVIEW}>{locale.overview}</ProfileMenuItem>
            <ProfileMenuItem route={PROFILE_SCREEN_ROUTES.EDIT_INFO}>{locale.editInfo}</ProfileMenuItem>
            {/*<ProfileMenuItem route={PROFILE_SCREEN_ROUTES.EDIT_FLAG}>{locale.editFlag}</ProfileMenuItem>*/}
        </div>
    );
};

export { ProfileMenu };
