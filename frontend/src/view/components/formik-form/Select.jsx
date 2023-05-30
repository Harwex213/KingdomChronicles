import "./form-styles.css";

const Select = ({ name, formik, disableErrors = false, addEmpty = false, children, options, ...props }) => {
    return (
        <div>
            <p>{children}</p>
            <select
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                {...props}
            >
                {addEmpty && <option value={""}></option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            {!disableErrors && formik.touched[name] && Boolean(formik.errors[name]) && (
                <p className="inputError">{formik.errors[name]}</p>
            )}
        </div>
    );
};

export { Select };
