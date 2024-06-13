import { Chat } from "../../components/chat/Chat";
import { startGameService, searchGameModel } from "../../../services/start-game";

const NewGameChat = () => {
    const handleSubmit = async (values, formikBag) => {
        try {
            await startGameService.sendChatMessage(values.message);
            formikBag.resetForm();
        } catch (e) {
            console.error(e.message);
        }
    };

    return <Chat handleSubmit={handleSubmit} chatMessages={searchGameModel.chatMessages} />;
};

export { NewGameChat };
