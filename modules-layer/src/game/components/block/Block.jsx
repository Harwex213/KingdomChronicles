import styles from "./Block.module.css";

const Block = ({ children, isExternal = false, className = "", ...rest }) => {
    return (
        <div className={styles.block + " " + className} data-is-external={isExternal} {...rest}>
            {children}
        </div>
    );
};

export { Block };
