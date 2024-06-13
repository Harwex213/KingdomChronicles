import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { TextField } from "../../components/formik-form";
import { AUTH_SERVICE_ACTIONS, authService } from "../../../services/auth";
import internalization from "../../../common/internalization/auth-forms.json";
import styles from "./registrationScreen.module.css";

const locale = internalization.registration;

const form = {
    fields: {
        username: "username",
        password: "password",
        repeatedPassword: "repeatedPassword",
    },
    initialValues: {
        username: "",
        password: "",
        repeatedPassword: "",
    },
    validationSchema: yup.object({
        username: yup.string().required(locale.username.errors.required),
        password: yup.string().required(locale.password.errors.required),
        repeatedPassword: yup
            .string()
            .required(locale.repeatedPassword.errors.required)
            .oneOf([yup.ref("password")], locale.repeatedPassword.errors.notEquals),
    }),
};

const RegistrationScreen = () => {
    const handleSubmit = async (values, formikHelpers) => {
        try {
            await authService.dispatch(AUTH_SERVICE_ACTIONS.REGISTER, values);
            formikHelpers.resetForm();
        } catch (e) {
            formikHelpers.setFieldError(form.fields.username, e.message);
        }
    };

    return (
        <div className={styles.screen}>
            <h1>{locale.header}</h1>
            <Formik
                initialValues={form.initialValues}
                validationSchema={form.validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <TextField name={form.fields.username} formik={formik} autoFocus>
                            {locale.username.placeholder}
                        </TextField>
                        <TextField name={form.fields.password} formik={formik} type="password">
                            {locale.password.placeholder}
                        </TextField>
                        <TextField name={form.fields.repeatedPassword} formik={formik} type="password">
                            {locale.repeatedPassword.placeholder}
                        </TextField>
                        <div className={styles.submitButton}>
                            <button type="submit" disabled={formik.isSubmitting}>
                                {locale.submit}
                            </button>
                        </div>
                        <div className={styles.loginProposal}>
                            <Link to="/login">{locale.loginProposal}</Link>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export { RegistrationScreen };
