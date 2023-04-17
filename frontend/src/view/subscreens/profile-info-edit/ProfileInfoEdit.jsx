import { useLayoutEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { TextField, Select } from "../../components/formik-form";
import styles from "./profileInfoEdit.module.css";
import internalization from "../../../common/internalization/profile-screen.json";
import { currentProfileRoute } from "../../../services/states";
import { PROFILE_SCREEN_ROUTES } from "../../../common/constants/routes";
import { titles } from "../../../services/loaders/titlesLoader";
import { userProfile } from "../../../services/loaders/userProfileLoader";

const locale = internalization.infoEdit;

const form = {
    fields: {
        name: "name",
        motto: "motto",
        titleId: "titleId",
    },
    validationSchema: yup.object({
        name: yup
            .string()
            .required(locale.name.errors.required)
            .max(25, locale.name.errors.maxLengthExceeded),
        motto: yup.string().nullable().max(50, locale.motto.errors.maxLengthExceeded),
        titleId: yup.number().nullable(),
    }),
};

const ProfileInfoEditSubScreen = () => {
    useLayoutEffect(() => {
        currentProfileRoute.setState(PROFILE_SCREEN_ROUTES.EDIT_INFO);
    }, []);

    const handleSubmit = async (values) => {
        const newUserProfileInfo = { ...values };
        newUserProfileInfo.titleId = values.titleId === "" ? null : Number(values.titleId);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    name: userProfile.name,
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
