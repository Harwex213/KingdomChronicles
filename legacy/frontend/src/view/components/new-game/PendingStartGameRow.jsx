import styles from "./pendingStartGameRow.module.css";

const PendingStartGameRow = ({ className = "", isSelected, game, onClick }) => {
    const containerClassName = styles.container + " " + className;
    const isGameFull = game.players.length === game.maxPlayersAmount;

    return (
        <div className={containerClassName} onClick={() => onClick(game)} data-is-selected={isSelected}>
            <div className={styles.row}>
                <p className={styles.name}>{game.name}</p>
                <p className={styles.playersAmount} data-is-full={isGameFull}>
                    {game.players.length} / {game.maxPlayersAmount}
                </p>
            </div>
        </div>
    );
};

export { PendingStartGameRow };
