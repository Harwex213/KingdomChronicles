import { useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./messageList.module.css";

const MessageList = observer(({ chatMessages }) => {
    const messagesEndRef = useRef(null);

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollTo(0, messagesEndRef.current?.scrollHeight);
    }, [chatMessages.length]);

    return (
        <div ref={messagesEndRef} className={styles.container}>
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.sendingTime} className={styles.message}>
                    <div className={styles.messageHeader}>
                        <p>{chatMessage.author}</p>
                        <p>{new Date(chatMessage.sendingTime).toLocaleString()}</p>
                    </div>
                    <p>{chatMessage.message}</p>
                </div>
            ))}
        </div>
    );
});

export { MessageList };
