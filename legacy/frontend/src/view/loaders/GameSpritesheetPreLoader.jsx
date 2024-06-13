import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { Loader } from "../components/loader/Loader";
import { mapRendererService } from "../../services/mapRenderer";
import { LoaderFailed } from "../components/loaderFailed/LoaderFailed";

const GameSpritesheetPreLoader = observer(({ children }) => {
    useLayoutEffect(() => {
        mapRendererService.loadSpritesheet();
    }, []);

    if (mapRendererService.isLoading || mapRendererService.isIdle) {
        return <Loader />;
    }
    if (mapRendererService.isError) {
        return <LoaderFailed>Cannot load game spritesheet</LoaderFailed>;
    }
    if (mapRendererService.isLoaded) {
        return children;
    }
});

export { GameSpritesheetPreLoader };
