import { Chat } from "../../components/chat/Chat";
import { gameService, startedGameModel } from "../../../services/game";

const GameChat = () => {
    const handleSubmit = async (values, formikBag) => {
        try {
            await gameService.sendChatMessage(values.message);
            formikBag.resetForm();
        } catch (e) {
            console.error(e.message);
        }
    };

    return <Chat handleSubmit={handleSubmit} chatMessages={startedGameModel.chatMessages} />;
};

export { GameChat };
