import { useLayoutEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { TextField, Select } from "../../components/formik-form";
import styles from "./profileInfoEdit.module.css";
import internalization from "../../../common/internalization/profile-screen.json";
import { currentProfileRoute } from "../../../services/states";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";
import { titles } from "../../../services/loaders/titlesLoader";
import { userProfile } from "../../../services/loaders/userProfileLoader";
import { ColorPicker } from "../../components/color-picker/ColorPicker";
import { AUTH_SERVICE_ACTIONS, authService } from "../../../services/auth";
import { startGameService } from "../../../services/start-game";
import { useNavigate } from "react-router-dom";

const locale = internalization.infoEdit;

const form = {
    fields: {
        name: "name",
        kingdomName: "kingdomName",
        motto: "motto",
        titleId: "titleId",
    },
    validationSchema: yup.object({
        name: yup
            .string()
            .required(locale.name.errors.required)
            .max(25, locale.name.errors.maxLengthExceeded),
        kingdomName: yup
            .string()
            .required(locale.name.errors.required)
            .max(35, locale.name.errors.maxLengthExceeded),
        motto: yup.string().nullable().max(50, locale.motto.errors.maxLengthExceeded),
        titleId: yup.number().nullable(),
    }),
};

const ProfileInfoEditSubScreen = () => {
    const navigate = useNavigate();
    const [backgroundColor, setBackgroundColor] = useState(userProfile.flag.backgroundColor);

    useLayoutEffect(() => {
        currentProfileRoute.setState(PROFILE_SCREEN_ROUTES.EDIT_INFO);
    }, []);

    const handleSubmit = async (values, formikHelpers) => {
        try {
            const newUserProfileInfo = { ...values };
            newUserProfileInfo.titleId = values.titleId === "" ? null : Number(values.titleId);
            newUserProfileInfo.backgroundColor = backgroundColor;
            // console.log(newUserProfileInfo);
            await startGameService.editUserProfile(newUserProfileInfo);
            formikHelpers.resetForm();
            navigate("..");
        } catch (e) {
            formikHelpers.setFieldError(form.fields.username, e.message);
        }
    };

    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    name: userProfile.name,
                    kingdomName: userProfile.kingdomName,
                    motto: userProfile.motto,
                    titleId: userProfile.titleId,
                }}
                validationSchema={form.validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <TextField name={form.fields.name} formik={formik}>
                            {locale.name.placeholder}
                        </TextField>
                        <TextField name={form.fields.kingdomName} formik={formik}>
                            {locale.name.placeholder}
                        </TextField>
                        <TextField name={form.fields.motto} formik={formik}>
                            {locale.motto.placeholder}
                        </TextField>
                        <Select
                            name={form.fields.titleId}
                            formik={formik}
                            options={titles.getAsOptions()}
                            addEmpty
                        >
                            {locale.title.placeholder}
                        </Select>
                        <div>
                            <p>Flag color</p>
                            <ColorPicker
                                value={backgroundColor}
                                onChange={(color) => setBackgroundColor(color)}
                            />
                        </div>
                        <div>
                            <button className={styles.submit} type="submit" disabled={formik.isSubmitting}>
                                {locale.submit}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export { ProfileInfoEditSubScreen };
