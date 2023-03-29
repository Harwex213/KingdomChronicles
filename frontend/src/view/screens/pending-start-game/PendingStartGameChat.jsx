import { Chat } from "../../components/chat/Chat";
import { startGameService, pendingStartGameModel } from "../../../services/start-game";

const PendingStartGameChat = () => {
    const handleSubmit = async (values, formikBag) => {
        try {
            await startGameService.sendChatMessage(values.message);
            formikBag.resetForm();
        } catch (e) {
            console.error(e.message);
        }
    };

    return <Chat handleSubmit={handleSubmit} chatMessages={pendingStartGameModel.chatMessages} />;
};

export { PendingStartGameChat };
