import styles from "./controls.module.css";
import { observer } from "mobx-react-lite";

const Checkbox = observer(({ placeholder, value, onChange }) => {
    return (
        <div className={styles.fieldInline}>
            <p className={styles.placeholder}>{placeholder}</p>
            <input
                type="checkbox"
                className={styles.control}
                value={value}
                onChange={(event) => onChange(event.target.checked)}
            />
        </div>
    );
});

export { Checkbox };
