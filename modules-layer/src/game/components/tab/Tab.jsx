import styles from "./Tab.module.css";

const Tab = ({ children, isExternal = false, isActive = false, className = "", ...rest }) => {
    return (
        <div
            className={styles.tab + " " + className}
            data-is-active={isActive}
            data-is-external={isExternal}
            {...rest}
        >
            {children}
        </div>
    );
};

export { Tab };
