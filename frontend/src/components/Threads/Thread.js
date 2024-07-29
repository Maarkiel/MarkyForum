import React, { useState } from 'react';
import { likeThread, dislikeThread, addComment, likeComment, dislikeComment, updateThread, deleteThread, updateComment, deleteComment } from '../../api';

const Thread = ({ thread, token, onThreadUpdate, onThreadDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(thread.title);
    const [editedContent, setEditedContent] = useState(thread.content);
    const [comment, setComment] = useState('');

    const handleThreadUpdate = async () => {
        try {
            await updateThread(thread._id, { title: editedTitle, content: editedContent }, token);
            setEditMode(false);
            onThreadUpdate();
        } catch (error) {
            alert('Error updating thread');
        }
    };

    const handleThreadDelete = async () => {
        try {
            await deleteThread(thread._id, token);
            onThreadDelete();
        } catch (error) {
            alert('Error deleting thread');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComment(thread._id, { comment }, token);
            setComment('');
        } catch (error) {
            alert('Error adding comment');
        }
    };

    const handleCommentUpdate = async (commentId, newComment) => {
        try {
            await updateComment(thread._id, commentId, { comment: newComment }, token);
            onThreadUpdate();
        } catch (error) {
            alert('Error updating comment');
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(thread._id, commentId, token);
            onThreadUpdate();
        } catch (error) {
            alert('Error deleting comment');
        }
    };

    return (
        <div className="thread">
            {editMode ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>
                    <button onClick={handleThreadUpdate}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{thread.title}</h3>
                    <p>{thread.content}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={handleThreadDelete}>Delete</button>
                </div>
            )}
            <p>By: {thread.author.username}</p>
            <button onClick={() => likeThread(thread._id, token)}>Like</button>
            <button onClick={() => dislikeThread(thread._id, token)}>Dislike</button>
            <p>Likes: {thread.likes || 0}, Dislikes: {thread.dislikes || 0}</p>
            <h4>Comments</h4>
            {thread.comments.map((c) => (
                <div key={c._id}>
                    <p>{c.comment}</p>
                    <button onClick={() => handleCommentUpdate(c._id, prompt('Edit Comment', c.comment))}>Edit</button>
                    <button onClick={() => handleCommentDelete(c._id)}>Delete</button>
                </div>
            ))}
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Thread;
