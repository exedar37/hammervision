import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThreatStagesPage = () => {
    const [threatstages, setDetectons] = useState([]);

    useEffect(() => {
        // TODO: Fetch ThreatStages from the backend
    }, []);

    return (
        <div>
            <h1>ThreatStages</h1>
            <Link to="/threatstages/add">Add New ThreatStage</Link>
            <ul>
                {threatstages.map(threatstage => (
                    <li key={threatstage.id}>
                        {threatstage.name} - <Link to={`/threat-stages/edit/${threatstage.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThreatStagesPage;


