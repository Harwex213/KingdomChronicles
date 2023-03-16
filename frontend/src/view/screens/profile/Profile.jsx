import { observer } from "mobx-react-lite";
import { models } from "../../../store";

const userModel = models.user;

const ProfileScreen = observer(() => {
    return (
        <div>
            <h1>Hello, {userModel.username}</h1>
        </div>
    );
});

export { ProfileScreen };
