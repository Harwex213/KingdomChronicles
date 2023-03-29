import styles from "./controls.module.css";

const Button = ({ className = "", placeholder, onClick }) => {
    return (
        <button className={styles.button + " " + className} onClick={onClick}>
            {placeholder}
        </button>
    );
};
export { Button };
