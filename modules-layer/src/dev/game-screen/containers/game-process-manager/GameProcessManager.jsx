import { observer } from "mobx-react-lite";
import { Button, Container, Select } from "../../../components/controls";
import { devGameService } from "../../devGameService/devGameService";
import { useEffect } from "react";

const getPlayerOptions = (amount) => {
    return [...Array(amount)].map((_, index) => ({ value: index, name: `${index + 1} player` }));
};

const GameProcessManager = observer(({ className }) => {
    useEffect(() => {
        const handleKeyDown = (logKey) => {
            if (logKey.code === "Enter" || logKey.code === "NumpadEnter") {
                devGameService.handleNextTick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Container className={className}>
            <Select
                placeholder="Set point of view"
                options={getPlayerOptions(devGameService.gameProcessConfig.playersAmount)}
                value={devGameService.gameProcessConfig.pointOfViewPlayerIndex}
                onChange={(value) => devGameService.changePlayerPointOfView(value)}
            />
            <Button placeholder="Next tick" onClick={() => devGameService.handleNextTick()} />
        </Container>
    );
});

export { GameProcessManager };
