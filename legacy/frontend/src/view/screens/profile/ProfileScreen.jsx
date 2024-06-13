import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "../../containers/layout/Layout";
import { ProfileMenu } from "../../containers/profile-menu/ProfileMenu";
import { ProfileRoutes } from "../../routes/ProfileRoutes";
import { currentAuthorizedRoute } from "../../../services/states";
import { NOT_IN_GAME_ROUTES } from "../../../common/constants/routes";
import { UserProfilePreLoader } from "../../loaders/UserProfileLoader";
import styles from "./profileScreen.module.css";

const ProfileScreen = observer(() => {
    useLayoutEffect(() => {
        currentAuthorizedRoute.setState(NOT_IN_GAME_ROUTES.PROFILE);
    }, []);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <ProfileMenu />
                </div>
                <div className={styles.page}>
                    <UserProfilePreLoader>
                        <ProfileRoutes />
                    </UserProfilePreLoader>
                </div>
            </div>
        </Layout>
    );
});

export { ProfileScreen };
