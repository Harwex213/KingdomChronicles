import styles from "./Switch.module.css";
import { useRef } from "react";

const Switch = ({ className = "", onChange, children, ...rest }) => {
    const switchRef = useRef();

    return (
        <>
            <input
                ref={switchRef}
                type="checkbox"
                className={styles.switch + " " + className}
                onChange={() => {}}
                {...rest}
            />
            <label onClick={() => onChange(switchRef.current?.checked)}>{children}</label>
        </>
    );
};

export { Switch };
