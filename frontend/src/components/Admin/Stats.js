import React, { useEffect, useState } from 'react';
import { getStats } from '../../api';

const Stats = ({ token }) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStats(token);
                setStats(response.data);
            } catch (error) {
                alert('Error fetching stats');
            }
        };

        fetchStats();
    }, [token]);

    return (
        <div className="stats">
            <h2>Stats</h2>
            <p>Thread Count: {stats.threadCount}</p>
            <p>User Count: {stats.userCount}</p>
            <h3>Active Users</h3>
            <ul>
                {stats.activeUsers && stats.activeUsers.map(user => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stats;