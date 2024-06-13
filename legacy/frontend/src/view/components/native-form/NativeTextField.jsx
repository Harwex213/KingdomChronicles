import "./form-styles.css";

const NativeTextField = ({ containerClassName, value, onChange, children, ...props }) => {
    return (
        <div className={containerClassName}>
            <p>{children}</p>
            <input value={value} onChange={(event) => onChange(event.target.value)} {...props} />
        </div>
    );
};

export { NativeTextField };
