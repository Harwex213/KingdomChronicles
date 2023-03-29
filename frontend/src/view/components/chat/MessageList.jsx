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
                    {chatMessage.author} | {chatMessage.message} | {chatMessage.sendingTime}
                </div>
            ))}
        </div>
    );
});

export { MessageList };
