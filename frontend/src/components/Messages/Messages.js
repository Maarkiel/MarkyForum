import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../../api';

const Messages = ({ token }) => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [receiver, setReceiver] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(token);
                setMessages(response.data);
            } catch (error) {
                alert('Error fetching messages');
            }
        };

        fetchMessages();
    }, [token]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await sendMessage({ receiverId: receiver, content }, token);
            setMessages([...messages, response.data]);
            setContent('');
            setReceiver('');
        } catch (error) {
            alert('Error sending message');
        }
    };

    return (
        <div className="messages">
            <h2>Messages</h2>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Receiver ID"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message) => (
                    <li key={message._id}>
                        From: {message.sender.username}, To: {message.receiver.username}
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;
