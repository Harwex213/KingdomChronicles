import styles from "./controls.module.css";

const Container = ({ className = "", children }) => {
    return <div className={styles.container + " " + className}>{children}</div>;
};

export { Container };
