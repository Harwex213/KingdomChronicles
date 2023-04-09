import styles from "./Button.module.css";

const Button = ({ children, textSize = "small", className = "", variant = "normal", ...rest }) => {
    let finaleClassName = styles.button + " " + className;
    if (variant === "positive") {
        finaleClassName += " " + styles.positive;
    }
    if (variant === "negative") {
        finaleClassName += " " + styles.negative;
    }
    return (
        <button className={finaleClassName} data-textsize={textSize} {...rest}>
            {children}
        </button>
    );
};

export { Button };
