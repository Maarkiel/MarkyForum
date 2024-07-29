import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../api';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ resetToken: token, newPassword });
            alert('Password reset successful');
        } catch (error) {
            alert('Invalid or expired token');
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
