import "./form-styles.css";

const TextField = ({ name, formik, disableErrors = false, children, ...props }) => {
    return (
        <div>
            <p>{children}</p>
            <input
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                {...props}
            />
            {!disableErrors && formik.touched[name] && Boolean(formik.errors[name]) && (
                <p className="inputError">{formik.errors[name]}</p>
            )}
        </div>
    );
};

export { TextField };
