import "./form-styles.css";

const TextField = ({ containerClassName, name, formik, disableErrors = false, children, ...props }) => {
    return (
        <div className={containerClassName}>
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
