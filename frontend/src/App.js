import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPasswordRequest from './components/Auth/ResetPasswordRequest';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Profile/Profile';
import AvatarUpload from './components/Profile/AvatarUpload';
import CreateThread from './components/Threads/CreateThread';
import ThreadList from './components/Threads/ThreadList';
import Notifications from './components/Notifications/Notifications';
import Search from './components/Threads/Search';
import Stats from './components/Admin/Stats';
import Messages from './components/Messages/Messages';
import AdminPanel from './components/Admin/AdminPanel';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const openRegisterModal = () => setIsRegisterOpen(true);
    const closeRegisterModal = () => setIsRegisterOpen(false);

    const openResetPasswordModal = () => setIsResetPasswordOpen(true);
    const closeResetPasswordModal = () => setIsResetPasswordOpen(false);

    return (
        <Router>
            <div className="app">
                <nav>
                    <Link to="/">Threads</Link>
                    {token ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <Link to="/create-thread">Create Thread</Link>
                            <Link to="/notifications">Notifications</Link>
                            <Link to="/messages">Messages</Link>
                            <Link to="/search">Search</Link>
                            <Link to="/admin/stats">Stats</Link>
                            <Link to="/admin/panel">Admin Panel</Link>
                            <button onClick={() => setToken('')}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <button onClick={openRegisterModal}>Register</button>
                            <button onClick={openResetPasswordModal}>Reset Password</button>
                        </>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<ThreadList token={token} />} />
                    <Route path="/login" element={<Login setUser={setToken} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile token={token} />} />
                    <Route path="/profile/avatar" element={<AvatarUpload token={token} />} />
                    <Route path="/create-thread" element={<CreateThread token={token} onCreate={() => {}} />} />
                    <Route path="/notifications" element={<Notifications token={token} />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/messages" element={<Messages token={token} />} />
                    <Route path="/admin/stats" element={<Stats token={token} />} />
                    <Route path="/admin/panel" element={<AdminPanel />} />
                </Routes>
                {isRegisterOpen && <Register closeModal={closeRegisterModal} />}
                {isResetPasswordOpen && <ResetPasswordRequest closeModal={closeResetPasswordModal} />}
            </div>
        </Router>
    );
};

export default App;
