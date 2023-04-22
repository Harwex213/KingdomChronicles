import styles from "./aborted.module.css";

const Aborted = ({ className = "", isFull = true, ...rest }) => {
    const fullClassName = isFull ? styles.full : "";

    return (
        <div className={styles.aborted + " " + className + " " + fullClassName} {...rest}>
            You opened the game within another page
        </div>
    );
};

export { Aborted };
