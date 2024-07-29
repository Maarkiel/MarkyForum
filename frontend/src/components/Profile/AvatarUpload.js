import React, { useState } from 'react';
import { uploadAvatar } from '../../api';

const AvatarUpload = ({ token }) => {
    const [avatar, setAvatar] = useState(null);

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            const response = await uploadAvatar(formData, token);
            alert('Avatar uploaded');
        } catch (error) {
            alert('Error uploading avatar');
        }
    };

    return (
        <form className="avatar-upload-form" onSubmit={handleSubmit}>
            <h2>Upload Avatar</h2>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default AvatarUpload;
