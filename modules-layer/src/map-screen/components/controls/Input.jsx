import styles from "./controls.module.css";
import { observer } from "mobx-react-lite";

const Input = observer(({ placeholder, value, onChange }) => {
    return (
        <div className={styles.field}>
            <p className={styles.placeholder}>{placeholder}</p>
            <input
                className={styles.control}
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
});

export { Input };
