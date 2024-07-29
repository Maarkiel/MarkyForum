import React, { useState, useEffect } from 'react';
import { createThread, getCategories, getTags } from '../../api';

const CreateThread = ({ token, onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            const categoriesResponse = await getCategories();
            const tagsResponse = await getTags();
            setCategories(categoriesResponse.data);
            setTags(tagsResponse.data);
        };

        fetchCategoriesAndTags();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createThread({ title, content, category: selectedCategory, tags: selectedTags }, token);
            onCreate(response.data);
        } catch (error) {
            alert('Error creating thread');
        }
    };

    return (
        <form className="create-thread-form" onSubmit={handleSubmit}>
            <h2>Create Thread</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <div>
                {tags.map(tag => (
                    <label key={tag._id}>
                        <input
                            type="checkbox"
                            value={tag._id}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedTags([...selectedTags, tag._id]);
                                } else {
                                    setSelectedTags(selectedTags.filter(t => t !== tag._id));
                                }
                            }}
                        />
                        {tag.name}
                    </label>
                ))}
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateThread;
