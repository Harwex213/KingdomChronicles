import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { userProfileLoader, errorMessage } from "../../services/loaders/userProfileLoader";
import { Loader } from "../components/loader/Loader";

const UserProfilePreLoader = observer(({ children }) => {
    useLayoutEffect(() => {
        userProfileLoader.load();
    }, []);

    if (userProfileLoader.isLoading) {
        return <Loader />;
    }
    if (userProfileLoader.isError) {
        return <div>{errorMessage}</div>;
    }
    if (userProfileLoader.isSuccess) {
        return children;
    }
});

export { UserProfilePreLoader };
