import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { addLog } from './api';

const LogEntryForm = ({ location, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            data.rating = parseInt(data.rating);
            await addLog(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            { error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="title">Title</label>
            <input name="title" required ref={register} />
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register}/>
            <label htmlFor="rating">Rating</label>
            <input name="rating" required ref={register}/>
            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        </form>
    );
};

export default LogEntryForm;