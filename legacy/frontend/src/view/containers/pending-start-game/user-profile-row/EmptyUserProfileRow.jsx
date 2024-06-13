import styles from "./userProfileRow.module.css";

const EmptyUserProfileRow = ({ className = "" }) => {
    return (
        <div className={styles.row + " " + className} data-is-empty={true}>
            Waiting for player...
        </div>
    );
};

export { EmptyUserProfileRow };
