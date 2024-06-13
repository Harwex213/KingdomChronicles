import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { userProfileLoader, errorMessage } from "../../services/loaders/userProfileLoader";
import { Loader } from "../components/loader/Loader";
import { LoaderFailed } from "../components/loaderFailed/LoaderFailed";

const UserProfilePreLoader = observer(({ children }) => {
    useLayoutEffect(() => {
        userProfileLoader.load();
    }, []);

    if (userProfileLoader.isLoading) {
        return <div>Loading...</div>;
    }
    if (userProfileLoader.isError) {
        return <div>{errorMessage}</div>;
    }
    if (userProfileLoader.isSuccess) {
        return children;
    }
});

export { UserProfilePreLoader };
