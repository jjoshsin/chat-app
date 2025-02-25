import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "../styles/Chat.css";

export default function Chat(props) {
    const { room } = props;

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");


    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")); // want to get messages where the room name equals the room name
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        });

        setNewMessage("");
    }

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room}</h1>
            </div>
            <div className="messages">
                {messages.map((message) =>
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                        {message.text}
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    )
}