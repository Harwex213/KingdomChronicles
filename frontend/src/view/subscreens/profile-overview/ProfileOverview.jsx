import { useLayoutEffect } from "react";
import styles from "./profileOverview.module.css";
import internalization from "../../../common/internalization/profile-screen.json";
import { currentProfileRoute } from "../../../services/states";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";
import { titles } from "../../../services/loaders/titlesLoader";
import { userProfile } from "../../../services/loaders/userProfileLoader";

const locale = internalization.overview;

const ProfileOverviewSubScreen = () => {
    useLayoutEffect(() => {
        currentProfileRoute.setState(PROFILE_SCREEN_ROUTES.OVERVIEW);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>
                    {titles.getTitleName(userProfile.titleId)} {userProfile.name}
                </h1>
                <h4>{userProfile.motto}</h4>
            </div>
            <div className={styles.flag}>
                <div
                    className={styles.flagImage}
                    style={{
                        backgroundColor: userProfile.flag.backgroundColor,
                    }}
                ></div>
                <p className={styles.flagDescription}>{locale.flagDescription}</p>
            </div>
        </div>
    );
};

export { ProfileOverviewSubScreen };
