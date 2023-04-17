import styles from "./Container.module.css";

const Container = ({ children, direction = "column", centered = "none", className = "", ...rest }) => {
    let finaleClassName = styles.container + " " + className;
    if (centered === "vertical") {
        finaleClassName += " " + styles.verticalCenter;
    }
    return (
        <div className={finaleClassName} data-direction={direction} {...rest}>
            {children}
        </div>
    );
};

export { Container };
