import React, { useEffect, useState } from 'react';
import { getThreads } from '../../api';
import Thread from './Thread';

const ThreadList = ({ token }) => {
    const [threads, setThreads] = useState([]);

    const fetchThreads = async () => {
        try {
            const response = await getThreads();
            setThreads(response.data);
        } catch (error) {
            alert('Error fetching threads');
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);

    return (
        <div className="thread-list">
            <h2>Threads</h2>
            {threads.map((thread) => (
                <Thread 
                    key={thread._id} 
                    thread={thread} 
                    token={token} 
                    onThreadUpdate={fetchThreads} 
                    onThreadDelete={fetchThreads} 
                />
            ))}
        </div>
    );
};

export default ThreadList;
