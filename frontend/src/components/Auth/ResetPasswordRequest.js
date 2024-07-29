import React, { useState } from 'react';
import { resetPasswordRequest } from '../../api';

const ResetPasswordRequest = ({ closeModal }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPasswordRequest({ email });
            alert('Password reset email sent');
            closeModal();
        } catch (error) {
            alert('Email not found');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Reset Password</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordRequest;
