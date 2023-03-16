import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import internalization from "../../../common/internalization/forms.json";
import { AUTH_SERVICE_ACTIONS, authService } from "../../../services/auth";
import { TextField } from "../../components/form/Input";
import styles from "./login.module.css";

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
            <Formik
                initialValues={form.initialValues}
                validationSchema={form.validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <TextField name={form.fields.username} formik={formik}>
                            {locale.username.placeholder}
                        </TextField>
                        <TextField name={form.fields.password} formik={formik} type="password" autoFocus>
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
