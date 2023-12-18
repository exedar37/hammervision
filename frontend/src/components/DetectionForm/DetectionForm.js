import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetectionForm = () => {
    const [detectionData, setDetectionData] = useState({ name: '', description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // TODO: Fetch detection data for editing
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // TODO: Update detection
        } else {
            // TODO: Create new detection
        }
        navigate('/reports');
    };

    const handleChange = (event) => {
        setDetectionData({ ...detectionData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>{id ? 'Edit Detection' : 'Add Detection'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={detectionData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={detectionData.description} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => navigate('/detections')}>Cancel</button>
            </form>
        </div>
    );
};

export default DetectionForm;

