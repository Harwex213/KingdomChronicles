import { observer } from "mobx-react-lite";
import { Button, Container, Select } from "../../../components/controls";
import { gameService } from "../../gameService/gameService";

const getPlayerOptions = (amount) => {
    return [...Array(amount)].map((_, index) => ({ value: index, name: `${index + 1} player` }));
};

const GameProcessManager = observer(() => {
    return (
        <Container>
            <Select
                placeholder="Set point of view"
                options={getPlayerOptions(gameService.gameProcessConfig.playersAmount)}
                value={gameService.gameProcessConfig.pointOfViewPlayerIndex}
                onChange={(value) => gameService.changePlayerPointOfView(value)}
            />
            <Button placeholder="Next tick" onClick={() => gameService.handleNextTick()} />
        </Container>
    );
});

export { GameProcessManager };
