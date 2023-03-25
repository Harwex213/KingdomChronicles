import { observer } from "mobx-react-lite";
import internalization from "../../../common/internalization/new-game-screen.json";
import styles from "./newGameSearch.module.css";
import { PendingStartGameRow } from "../../components/new-game/PendingStartGameRow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NEW_GAME_SCREEN_ROUTES } from "../../../common/constants/routes";
import { searchGameModel, startGameService } from "../../../services/start-game";

const locale = internalization.search;
const navigateToCreate = `../${NEW_GAME_SCREEN_ROUTES.CREATE}`;

const NewGameSearchSubScreen = observer(() => {
    const navigate = useNavigate();
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [isTryingJoin, setIsTryingJoin] = useState(false);

    const handleJoin = async () => {
        try {
            setIsTryingJoin(true);
            await startGameService.joinGame(selectedGameId);
        } catch (e) {
            console.error(e.message);
        } finally {
            setIsTryingJoin(false);
        }
    };

    const handleCreate = () => {
        navigate(navigateToCreate);
    };

    const handleGameClick = (selectedGame) => {
        if (selectedGame.currentPlayersAmount === selectedGame.maxPlayersAmount) {
            return;
        }

        if (selectedGame.id === selectedGameId) {
            setSelectedGameId(null);
        } else {
            setSelectedGameId(selectedGame.id);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <h1 className={styles.header}>{locale.header}</h1>
                <button className={styles.actionBtn} disabled={selectedGameId === null} onClick={handleJoin}>
                    {locale.actions.joinGame}
                </button>
                <button className={styles.actionBtn} disabled={isTryingJoin} onClick={handleCreate}>
                    {locale.actions.createGame}
                </button>
            </div>
            <div className={styles.gameList}>
                {searchGameModel.pendingStartGames.map((game) => (
                    <PendingStartGameRow
                        key={game.id}
                        className={styles.gameRow}
                        isSelected={game.id === selectedGameId}
                        game={game}
                        onClick={handleGameClick}
                    />
                ))}
            </div>
        </div>
    );
});

export { NewGameSearchSubScreen };
