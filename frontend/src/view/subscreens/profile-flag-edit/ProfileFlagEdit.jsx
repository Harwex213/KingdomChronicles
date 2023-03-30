import styles from "./profileFlagEdit.module.css";
import internalization from "../../../common/internalization/profile-screen.json";
import { useLayoutEffect, useState } from "react";
import { currentProfileRoute } from "../../../services/states";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";
import { Tab } from "../../components/tab/Tab";
import { UserProfileFlag } from "../../components/user-profile-flag/UserProfileFlag";
import { observer } from "mobx-react-lite";
import { userProfile } from "../../../services/loaders/userProfileLoader";
import { EditBackground } from "./edit-background/EditBackground";

const locale = internalization.flagEdit;

const ProfileFlagEditSubScreen = observer(() => {
    useLayoutEffect(() => {
        currentProfileRoute.setState(PROFILE_SCREEN_ROUTES.EDIT_FLAG);
    }, []);

    const [flag, setFlag] = useState({
        backgroundColor: userProfile.flag.backgroundColor,
        foregroundColor: userProfile.flag.foregroundColor,
        foregroundSvg: userProfile.flag.foregroundSvg,
        emblemColor: userProfile.flag.emblemColor,
        emblemSvg: userProfile.flag.emblemSvg,
    });

    const handleBackgroundColorChange = (newValue) => {
        setFlag({
            ...flag,
            backgroundColor: newValue,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.editFlag}>
                <Tab
                    tabs={[
                        {
                            label: locale.tabLabels.background,
                            component: (
                                <EditBackground
                                    backgroundColor={flag.backgroundColor}
                                    onColorChange={handleBackgroundColorChange}
                                />
                            ),
                        },
                        {
                            label: locale.tabLabels.foreground,
                            component: <div>Foreground</div>,
                        },
                        {
                            label: locale.tabLabels.emblem,
                            component: <div>Emblem</div>,
                        },
                    ]}
                />
            </div>
            <div className={styles.flag}>
                <UserProfileFlag flag={flag} />
                <p className={styles.flagDescription}>Your flag</p>
            </div>
        </div>
    );
});

export { ProfileFlagEditSubScreen };
