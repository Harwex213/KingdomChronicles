import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { titlesLoader, errorMessage } from "../../services/loaders/titlesLoader";
import { Loader } from "../components/loader/Loader";
import { LoaderFailed } from "../components/loaderFailed/LoaderFailed";

const TitlesPreLoader = observer(({ children }) => {
    useLayoutEffect(() => {
        titlesLoader.load();
    }, []);

    if (titlesLoader.isLoading) {
        return <Loader />;
    }
    if (titlesLoader.isError) {
        return <LoaderFailed>{errorMessage}</LoaderFailed>;
    }
    if (titlesLoader.isSuccess) {
        return children;
    }
});

export { TitlesPreLoader };
