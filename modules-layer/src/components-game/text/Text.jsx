import styles from "./Text.module.css";

const Text = ({
    children,
    size = "small",
    variant = "neutral",
    family = "morris roman",
    centered = false,
    className = "",
    ...rest
}) => {
    return (
        <p
            className={styles.text + " " + className}
            data-size={size}
            data-variant={variant}
            data-family={family}
            style={{
                textAlign: centered ? "center" : "left",
            }}
            {...rest}
        >
            {children}
        </p>
    );
};

export { Text };
