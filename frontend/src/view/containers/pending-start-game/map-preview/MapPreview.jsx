import styles from "./mapPreview.module.css";
import internalization from "../../../../common/internalization/new-game-screen.json";
import { observer } from "mobx-react-lite";
import { pendingStartGameModel, startGameService } from "../../../../services/start-game";
import { useEffect, useState } from "react";
import { mapRendererService } from "../../../../services/mapRenderer";
import { generateRandomString } from "../../../../common/utils";
import { NativeSelect, NativeTextField } from "../../../components/native-form";
import { generateMap } from "map-generator";
import { MAP_SIZE_TYPES } from "shared/enums";
import { Randomizer } from "shared/models";

const locale = internalization.pendingStartGame.mapGenerationConfig;

const MapPreview = observer(({ className = "" }) => {
    const [secondsToCanRegenerate, setSecondsToCanRegenerate] = useState(0);
    const [randomSeed, setRandomSeed] = useState("");
    const [mapSizeType, setMapSizeType] = useState("");
    const mapGenerationConfig = pendingStartGameModel.mapGenerationConfig;

    useEffect(() => {
        mapRendererService.mountView(`.${styles.map}`);
        return () => {
            mapRendererService.clean();
        };
    }, []);

    useEffect(() => {
        setRandomSeed(mapGenerationConfig.randomSeed);
        setMapSizeType(mapGenerationConfig.mapSizeType);
        const map = generateMap({
            mapSizeType: mapGenerationConfig.mapSizeType,
            randomizer: new Randomizer(mapGenerationConfig.randomSeed),
        });
        mapRendererService.renderMap(map);
    }, [mapGenerationConfig]);

    const handleRegenerate = async () => {
        if (secondsToCanRegenerate > 0) {
            return;
        }

        setSecondsToCanRegenerate(5);

        await startGameService.updateMapGenerationConfig({
            mapSizeType,
            randomSeed,
        });

        const intervalId = setInterval(() => {
            setSecondsToCanRegenerate((previous) => {
                const newSeconds = previous - 1;
                if (newSeconds === 0) {
                    clearInterval(intervalId);
                }
                return newSeconds;
            });
        }, 1000);
    };

    const handleChangeSeed = (newSeed) => {
        setRandomSeed(newSeed);
    };

    const handleRollSeed = () => {
        setRandomSeed(generateRandomString(7));
    };

    let regenerateBtnText = locale.regenerate;
    if (secondsToCanRegenerate !== 0) {
        regenerateBtnText += ` (${secondsToCanRegenerate})`;
    }

    const handleChangeMapSizeType = (newMapSizeType) => {
        setMapSizeType(newMapSizeType);
    };

    return (
        <div className={styles.map + " " + className}>
            <div className={styles.generationConfig}>
                <button
                    disabled={
                        secondsToCanRegenerate !== 0 || pendingStartGameModel.currentPlayer.isOwner === false
                    }
                    onClick={handleRegenerate}
                >
                    {regenerateBtnText}
                </button>
                <div className={styles.seed}>
                    <p>{locale.randomSeed}</p>
                    <div className={styles.seedInputContainer}>
                        <NativeTextField
                            className={styles.seedInput}
                            value={randomSeed}
                            onChange={handleChangeSeed}
                        ></NativeTextField>
                        <button onClick={handleRollSeed}>{locale.roll}</button>
                    </div>
                </div>
                <NativeSelect
                    className={styles.mapSizeType}
                    options={Object.values(MAP_SIZE_TYPES).map((type) => ({
                        name: type,
                        value: type,
                    }))}
                    value={mapSizeType}
                    onChange={handleChangeMapSizeType}
                >
                    {locale.mapSizeType}
                </NativeSelect>
            </div>
        </div>
    );
});

export { MapPreview };
