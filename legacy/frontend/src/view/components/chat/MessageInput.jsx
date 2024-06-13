import { Formik } from "formik";
import * as yup from "yup";
import { TextField } from "../formik-form";
import internalization from "../../../common/internalization/containers.json";
import styles from "./messageInput.module.css";

const locale = internalization.chat;

const form = {
    fields: {
        message: "message",
    },
    initialValues: {
        message: "",
    },
    validationSchema: yup.object({
        message: yup.string().required(),
    }),
};

const MessageInput = ({ handleSubmit }) => {
    return (
        <Formik
            initialValues={form.initialValues}
            validationSchema={form.validationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <form className={styles.container} onSubmit={formik.handleSubmit}>
                    <TextField
                        containerClassName={styles.input}
                        className={styles.input}
                        name={form.fields.message}
                        formik={formik}
                        disableErrors
                        autoComplete="off"
                    />
                    <div className={styles.sendButton}>
                        <button type="submit" disabled={formik.isSubmitting}>
                            {locale.sendButton}
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export { MessageInput };
