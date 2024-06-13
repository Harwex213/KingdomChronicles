import { useLayoutEffect } from "react";
import styles from "./profileOverview.module.css";
import internalization from "../../../common/internalization/profile-screen.json";
import { currentProfileRoute } from "../../../services/states";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";
import { titles } from "../../../services/loaders/titlesLoader";
import { userProfile } from "../../../services/loaders/userProfileLoader";
import { AUTH_SERVICE_ACTIONS, authService } from "../../../services/auth";

const locale = internalization.overview;

const ProfileOverviewSubScreen = () => {
    useLayoutEffect(() => {
        currentProfileRoute.setState(PROFILE_SCREEN_ROUTES.OVERVIEW);
    }, []);

    const logout = async () => {
        await authService.dispatch(AUTH_SERVICE_ACTIONS.LOGOUT);
    };

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>
                    {titles.getTitleName(userProfile.titleId)} {userProfile.name}
                </h1>
                <div className={styles.flag}>
                    <div
                        className={styles.flagImage}
                        style={{
                            backgroundColor: userProfile.flag.backgroundColor,
                        }}
                    ></div>
                </div>
                <div className={styles.infoRow}>
                    <h4>State name: </h4>
                    <p>{userProfile.kingdomName}</p>
                </div>
                <div className={styles.infoRow}>
                    <h4>Motto: </h4>
                    <p>{userProfile.motto}</p>
                </div>
                <button className={styles.logout} onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export { ProfileOverviewSubScreen };
