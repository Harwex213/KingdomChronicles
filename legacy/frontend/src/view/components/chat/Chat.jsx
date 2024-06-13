import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import styles from "./chat.module.css";

const Chat = ({ handleSubmit, chatMessages }) => {
    return (
        <div className={styles.container}>
            <div className={styles.messageList}>
                <MessageList chatMessages={chatMessages} />
            </div>
            <div className={styles.messageInput}>
                <MessageInput handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export { Chat };
