import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, rateUser } from '../../api';

const Profile = ({ token, userId }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile(token);
                setUser(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (error) {
                alert('Error fetching profile');
            }
        };

        fetchProfile();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile({ username, email }, token);
            setUser(response.data);
            alert('Profile updated');
        } catch (error) {
            alert('Error updating profile');
        }
    };

    const handleRateUser = async () => {
        try {
            const response = await rateUser(userId, { rating }, token);
            setUser(response.data);
            alert('User rated');
        } catch (error) {
            alert('Error rating user');
        }
    };

    return user ? (
        <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Profile</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Update Profile</button>
            <div>
                <h3>Rate User</h3>
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button type="button" onClick={handleRateUser}>Rate</button>
                <p>Average Rating: {user.ratingAverage || 0}</p>
            </div>
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default Profile;
