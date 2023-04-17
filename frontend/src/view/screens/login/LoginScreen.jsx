import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { TextField } from "../../components/formik-form";
import { AUTH_SERVICE_ACTIONS, authService } from "../../../services/auth";
import internalization from "../../../common/internalization/auth-forms.json";
import styles from "./loginScreen.module.css";

const locale = internalization.login;

const form = {
    fields: {
        username: "username",
        password: "password",
    },
    initialValues: {
        username: "",
        password: "",
    },
    validationSchema: yup.object({
        username: yup.string().required(locale.username.errors.required),
        password: yup.string().required(locale.password.errors.required),
    }),
};

const LoginScreen = () => {
    const handleSubmit = async (values, formikHelpers) => {
        try {
            await authService.dispatch(AUTH_SERVICE_ACTIONS.LOGIN, values);
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
                        <div className={styles.submitButton}>
                            <button type="submit" disabled={formik.isSubmitting}>
                                {locale.submit}
                            </button>
                        </div>
                        <div className={styles.registrationProposal}>
                            <Link to="/register">{locale.registrationProposal}</Link>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export { LoginScreen };
