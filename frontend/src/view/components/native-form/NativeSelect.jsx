import "./form-styles.css";

const NativeSelect = ({ children, value, onChange, options, ...props }) => {
    return (
        <div>
            <p>{children}</p>
            <select value={value} onChange={(event) => onChange(event.target.value)} {...props}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { NativeSelect };
