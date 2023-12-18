import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ThreatStageForm = () => {
    const [threatstageData, setThreatStageData] = useState({ name: '', description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // TODO: Fetch threatstage data for editing
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // TODO: Update threatstage
        } else {
            // TODO: Create new threatstage
        }
    };

    const handleChange = (event) => {
        setThreatStageData({ ...threatstageData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>{id ? 'Edit ThreatStage' : 'Add ThreatStage'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={threatstageData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={threatstageData.description} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => navigate('/threatstages')}>Cancel</button>
            </form>
        </div>
    );
};

export default ThreatStageForm;


