import React, { useEffect, useState } from 'react';
import { getNotifications, markAsRead } from '../../api';

const Notifications = ({ token }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotifications(token);
                setNotifications(response.data);
            } catch (error) {
                alert('Error fetching notifications');
            }
        };

        fetchNotifications();
    }, [token]);

    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id, token);
            setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (error) {
            alert('Error marking notification as read');
        }
    };

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id} style={{ textDecoration: notification.read ? 'line-through' : 'none' }}>
                        {notification.message}
                        <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
