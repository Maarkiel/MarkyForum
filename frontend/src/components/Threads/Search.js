import React, { useState } from 'react';
import { getThreads } from '../../api';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await getThreads(`/search?q=${query}`);
            setResults(response.data);
        } catch (error) {
            alert('Error searching threads');
        }
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((thread) => (
                    <li key={thread._id}>{thread.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
