import styles from "./select.module.css";

const Select = ({ className = "", children, options, value, onChange, ...rest }) => {
    return (
        <div className={styles.select + " " + className}>
            <select value={value} onChange={(event) => onChange(event.target.value)} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <div className={styles.select_arrow}></div>
        </div>
    );
};

export { Select };
