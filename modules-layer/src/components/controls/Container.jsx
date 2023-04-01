import styles from "./controls.module.css";

const Container = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export { Container };
