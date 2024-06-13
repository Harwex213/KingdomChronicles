import styles from "./Range.module.css";

const Range = ({ className = "", onChange, ...rest }) => {
    return (
        <input
            type="range"
            className={styles.range + " " + className}
            onChange={(e) => e.target.value}
            {...rest}
        />
    );
};

export { Range };
