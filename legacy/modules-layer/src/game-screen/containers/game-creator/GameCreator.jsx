import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MAP_SIZE_TYPES } from "shared/enums";
import { Button, Container, Input, Select } from "../../../components/controls";
import { devGameService } from "../../devGameService/devGameService";

const PLAYERS_OPTIONS = [...Array(4)].map((_, index) => index + 1);

const GameCreator = observer(({ className }) => {
    useEffect(() => {
        devGameService.startNewGame();
    }, []);

    return (
        <Container className={className}>
            <Button placeholder="Start new" onClick={() => devGameService.startNewGame()} />
            <Select
                placeholder="Map size"
                options={Object.values(MAP_SIZE_TYPES)}
                value={devGameService.gameCreationConfig.mapSizeType}
                onChange={(value) => devGameService.updateGameCreationConfig("mapSizeType", value)}
            />
            <Input
                placeholder="Random seed"
                value={devGameService.gameCreationConfig.seedRandom}
                onChange={(value) => devGameService.updateGameCreationConfig("seedRandom", value)}
            />
            <Select
                placeholder="Players amount"
                options={PLAYERS_OPTIONS}
                value={devGameService.gameCreationConfig.playersAmount}
                onChange={(value) => devGameService.updateGameCreationConfig("playersAmount", value)}
            />
        </Container>
    );
});

export { GameCreator };
