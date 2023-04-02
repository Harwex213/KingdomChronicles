import { observer } from "mobx-react-lite";
import styles from "./controls.module.css";

const Select = observer(({ placeholder, options, value, onChange }) => {
    return (
        <div className={styles.field}>
            <p className={styles.placeholder}>{placeholder}</p>
            <select
                className={styles.control}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export { Select };
