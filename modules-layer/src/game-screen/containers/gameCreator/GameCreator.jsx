import { observer } from "mobx-react-lite";
import { Button, Container, Input, Select } from "../../../components/controls";
import { mapSizeTypes } from "models/map";
import { gameService } from "../../gameService";
import { useEffect } from "react";

const PLAYERS_OPTIONS = [...Array(4)].map((_, index) => index + 1);

const GameCreator = observer(() => {
    useEffect(() => {
        gameService.startNewGame();
    }, []);

    return (
        <Container>
            <Button placeholder="Start new" onClick={() => gameService.startNewGame()} />
            <Select
                placeholder="Map size"
                options={Object.values(mapSizeTypes)}
                value={gameService.gameCreationConfig.mapSizeType}
                onChange={(value) => gameService.setMapSizeType(value)}
            />
            <Input
                placeholder="Random seed"
                value={gameService.gameCreationConfig.seedRandom}
                onChange={(value) => gameService.setSeedRandom(value)}
            />
            <Select
                placeholder="Players amount"
                options={PLAYERS_OPTIONS}
                value={gameService.gameCreationConfig.playersAmount}
                onChange={(value) => gameService.setPlayersAmount(value)}
            />
        </Container>
    );
});

export { GameCreator };
