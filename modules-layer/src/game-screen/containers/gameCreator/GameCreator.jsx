import { observer } from "mobx-react-lite";
import { Button, Container, Input, Select } from "../../../components/controls";
import { mapSizeTypes } from "models/map";
import { gameService } from "../../gameService";
import { useEffect } from "react";

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
                value={gameService.mapGenerationConfig.mapSizeType}
                onChange={(value) => gameService.setMapSizeType(value)}
            />
            <Input
                placeholder="Random seed"
                value={gameService.mapGenerationConfig.seedRandom}
                onChange={(value) => gameService.setSeedRandom(value)}
            />
        </Container>
    );
});

export { GameCreator };
