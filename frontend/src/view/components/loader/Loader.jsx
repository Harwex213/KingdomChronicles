import styles from "./loader.module.css";

const Loader = ({ className = "", isFull = true, ...rest }) => {
    const fullClassName = isFull ? styles.full : "";

    return (
        <div className={styles.loader + " " + className + " " + fullClassName} {...rest}>
            Loading...
        </div>
    );
};

export { Loader };
