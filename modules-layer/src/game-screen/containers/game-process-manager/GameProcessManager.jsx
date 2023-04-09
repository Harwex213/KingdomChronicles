import { observer } from "mobx-react-lite";
import { Button, Container, Select } from "../../../components/controls";
import { gameService } from "../../gameService/gameService";
import { useEffect } from "react";

const getPlayerOptions = (amount) => {
    return [...Array(amount)].map((_, index) => ({ value: index, name: `${index + 1} player` }));
};

const GameProcessManager = observer(() => {
    useEffect(() => {
        const handleKeyDown = (logKey) => {
            if (logKey.code === "Enter" || logKey.code === "NumpadEnter") {
                gameService.handleNextTick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Container>
            <Select
                placeholder="Set point of view"
                options={getPlayerOptions(gameService.gameProcessConfig.playersAmount)}
                value={gameService.gameProcessConfig.pointOfViewPlayerIndex}
                onChange={(value) => gameService.changePlayerPointOfView(value)}
            />
            <Button placeholder="Next tick" onClick={() => gameService.handleNextTick()} />
            {gameService.currentPlayer !== null && (
                <p style={{ color: "#fff" }}>Current tick {gameService.gameState.currentTick}</p>
            )}
        </Container>
    );
});

export { GameProcessManager };
