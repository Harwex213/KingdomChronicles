import styles from "./loaderFailed.module.css";

const LoaderFailed = ({ className = "", isFull = true, children, ...rest }) => {
    const fullClassName = isFull ? styles.full : "";

    return (
        <div className={styles.loaderFailed + " " + className + " " + fullClassName} {...rest}>
            {children}
        </div>
    );
};

export { LoaderFailed };
