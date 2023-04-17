import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { Loader } from "../components/loader/Loader";
import { mapRendererService } from "../../services/mapRenderer";

const GameSpritesheetPreLoader = observer(({ children }) => {
    useLayoutEffect(() => {
        mapRendererService.loadSpritesheet();
    }, []);

    if (mapRendererService.isLoading || mapRendererService.isIdle) {
        return <Loader />;
    }
    if (mapRendererService.isError) {
        return <div>Cannot load game spritesheet</div>;
    }
    if (mapRendererService.isLoaded) {
        return children;
    }
});

export { GameSpritesheetPreLoader };
