import { useEffect } from "react";
import styles from "./controlBar.module.css";
import { mapSizeTypes, waterBalanceTypes } from "models/map";
import { Button, Select, Input, Checkbox, Container } from "../../components/controls";
import { mapScreenModel } from "../mapScreenModel.js";
import { observer } from "mobx-react-lite";

const ControlBar = observer(() => {
    useEffect(() => {
        const handleKeyDown = (logKey) => {
            if (logKey.code === "KeyR") {
                mapScreenModel.action();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Container>
                <Button
                    className={styles.regenerateBtn}
                    placeholder="Regenerate (R)"
                    onClick={() => mapScreenModel.action()}
                />
                <Select
                    placeholder="Map size"
                    options={Object.values(mapSizeTypes)}
                    value={mapScreenModel.mapSizesType}
                    onChange={(value) => mapScreenModel.setMapSizesType(value)}
                />
                <Select
                    placeholder="Water balance"
                    options={Object.values(waterBalanceTypes)}
                    value={mapScreenModel.waterBalanceType}
                    onChange={(value) => mapScreenModel.setWaterBalanceType(value)}
                />
                <Input
                    placeholder="Random seed"
                    value={mapScreenModel.seedRandom}
                    onChange={(value) => mapScreenModel.setSeedRandom(value)}
                />
                <Checkbox
                    placeholder="Develop bioms render"
                    value={mapScreenModel.devBiomsRender}
                    onChange={() => mapScreenModel.markDevBiomsRender()}
                />
                <Checkbox
                    placeholder="Develop regions render"
                    value={mapScreenModel.devRegionsRender}
                    onChange={() => mapScreenModel.markDevRegionsRender()}
                />
            </Container>
        </div>
    );
});

export { ControlBar };
